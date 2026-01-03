document.addEventListener('DOMContentLoaded', function() {
  let visitedQuestions = [];

  // MathJax helper
  // ---------- MathJax helper (use this everywhere) ----------
  function renderMath() {
    if (window.MathJax && MathJax.typesetPromise) {
      MathJax.typesetPromise()
        .catch((err) => {
          // do not stop execution if MathJax fails, but log for debugging
          console.warn('MathJax render error:', err);
        });
    }
  }



  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // === Settings from HTML ===
  const settingsEl = document.getElementById('exam-settings');
  const settings = JSON.parse(settingsEl.textContent);
  // ✅ Read exam configuration from HTML <script id="exam-settings">
  const examTitle = settings.examTitle || "Untitled Exam";
  const duration = settings.durationMinutes || 30;

  // ---------- Time dropdown setup ----------
  const maxSelectableMinutes = settings.maxSelectableMinutes || duration;
  const durationSelect = document.getElementById("exam-duration");
  if (durationSelect) {
    for (let m = 1; m <= maxSelectableMinutes; m += 1) {
      const option = document.createElement("option");
      option.value = m;
      option.textContent = m + " minutes";

      if (m === duration) {
        option.selected = true;
      }

      durationSelect.appendChild(option);
    }
  }


  // ✅ Apply title and duration dynamically to page elements
  const headerTitle = document.getElementById("header-exam-title");
  if (headerTitle) headerTitle.textContent = examTitle;

  const examTitleInput = document.getElementById("exam-title");
  if (examTitleInput) examTitleInput.value = examTitle;

  const durationText = document.getElementById("duration-text");
  if (durationText) durationText.textContent = duration;

  const numQuestionsToShow = settings.numQuestionsToShow;
  const questionFiles = settings.questionFiles;
  let questionsArray = [];

  // === Load Questions ===
  async function loadQuestionsFromFiles() {
    let all = [];

    for (const item of questionFiles) {
      const file = typeof item === 'string' ? item : item.file;
      const count = (typeof item === 'object' && 'count' in item) ? item.count : null;


      try {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = file;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });

        if (window.questionSet && Array.isArray(window.questionSet)) {
          let qs = [...window.questionSet];
          if (typeof count === 'number') {
            if (count > 0 && count < qs.length) {
              qs = shuffleArray(qs).slice(0, count);
            } else if (count === 0) {
              qs = []; // explicitly take zero questions
            }
          }

          all.push(...qs);
          delete window.questionSet;
        } else {
          console.warn(`Questions array not found or invalid in ${file}`);
        }
      } catch (err) {
        console.warn(`Error loading file ${file}:`, err);
      }
    }


    return all;
  }

  // === Initialize exam ===
  (async function init() {
    questionsArray = await loadQuestionsFromFiles();

    // calculate total number of questions loaded
    const totalQuestions = questionsArray.length;

    // update sidebar display
    document.getElementById("total-q").textContent = totalQuestions;
    document.getElementById("progress-text").textContent = `0 / ${totalQuestions}`;


    if (questionsArray.length === 0) {
      console.error('No questions loaded');
      document.getElementById('left-card').innerHTML =
        '<p style="color:red">No questions loaded. Check console.</p>';
      return;
    }

    questionsArray = shuffleArray(questionsArray).slice(0, numQuestionsToShow);
    document.getElementById("total-q").textContent = questionsArray.length;
    document.getElementById("progress-text").textContent = `0 / ${questionsArray.length}`;


    questionsArray = questionsArray.map(q => ({
      ...q,
      visited: false,
      answered: false,
      markedForReview: false,
      selected: null
    }));

    // Shuffle options but keep correct answer consistent
    questionsArray.forEach(q => {
      if (typeof q.answer === 'number' && q.answer >= 0 && q.answer < q.options.length) {
        const correctValue = q.options[q.answer];
        q.options = shuffleArray(q.options.slice());
        q.answer = q.options.indexOf(correctValue);
      } else q.answer = -1;
    });

    createQuestionNodes();
    renderMath();
    MathJax.typesetPromise().catch(()=>{});
    updateProgress();

  })();

  // === DOM creation ===
  const questionsRoot = document.getElementById('questions-root');
  const paletteRoot = document.getElementById('palette-root');

  function createQuestionNodes() {
    questionsRoot.innerHTML = '';
    paletteRoot.innerHTML = '';

    questionsArray.forEach((item, index) => {
      const qDiv = document.createElement('div');
      qDiv.classList.add('question');
      qDiv.id = `q${index + 1}`;
      qDiv.style.display = 'none';

      const p = document.createElement('div');
      p.style.marginBottom = '10px';
      p.innerHTML = `<div style="font-weight:600; margin-bottom:6px;">${index + 1}.</div><div>${item.q}</div>`;
      qDiv.appendChild(p);

      const optionsDiv = document.createElement('div');
      optionsDiv.className = 'options';

      item.options.forEach((opt, i) => {
        const label = document.createElement('label');
        label.htmlFor = `q${index + 1}_opt${i}`;

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `q${index + 1}`;
        input.id = `q${index + 1}_opt${i}`;
        input.value = i;

        const span = document.createElement('span');
        span.className = 'opt-text';
        span.innerHTML = opt;

        label.appendChild(input);
        label.appendChild(span);
        optionsDiv.appendChild(label);

        // ✅ Live palette update
        input.addEventListener('change', () => {
          const q = questionsArray[index];
          q.selected = parseInt(input.value, 10);
          q.answered = true;
          q.markedForReview = false;
          // ✅ Render all MathJax inside questions and options once created
          renderMath();

          updatePalette();
          updateProgress();
        });
      });

      qDiv.appendChild(optionsDiv);
      questionsRoot.appendChild(qDiv);

      const pal = document.createElement('button');
      pal.className = 'pal-btn';
      pal.innerText = index + 1;
      pal.dataset.index = index;
      pal.id = `pal-btn-${index}`;
      pal.addEventListener('click', () => showQuestion(index));
      paletteRoot.appendChild(pal);
    });

    updatePalette();
  }

  // === Palette update ===
  function updatePalette() {
    questionsArray.forEach((q, index) => {
      const btn = document.getElementById(`pal-btn-${index}`);
      if (!btn) return;

      btn.classList.remove("current", "answered", "review", "visited");

      if (index === current) btn.classList.add("current");
      if (q.selected !== null) btn.classList.add("answered");
      if (q.markedForReview) btn.classList.add("review");
      if (q.visited && q.selected === null && !q.markedForReview) btn.classList.add("visited");

      let title = '';
      if (q.selected !== null) title += 'Answered ';
      if (q.visited && q.selected === null) title += 'Visited ';
      if (q.markedForReview) title += 'Marked for Review';
      btn.title = title.trim();
    });
  }

  // === State & controls ===
  let current = 0;
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const submitBtn = document.getElementById('submit-btn');
  const saveNextBtn = document.getElementById('save-next');
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const timerVal = document.getElementById('timer-val');
  const timerSmall = document.getElementById('timer-small');
  const headerExamTitle = document.getElementById('header-exam-title');
  const studentInfoP = document.getElementById('student-info');

  function showQuestion(index) {
    const questions = document.querySelectorAll('#questions-root .question');
    if (questions.length === 0) return;

    if (index < 0) index = 0;
    if (index >= questions.length) index = questions.length - 1;
    current = index;
    questionsArray[current].visited = true;

    questions.forEach((q, i) => {
      q.style.display = (i === index) ? 'block' : 'none';
      if (i === index) {
        const sel = questionsArray[i].selected;
        if (sel !== null) {
          const radio = q.querySelector(`#q${i + 1}_opt${sel}`);
          if (radio) radio.checked = true;
        }
      }
    });

    updatePalette();
    updateProgress();
    document.getElementById('q-num').innerText = `Q${index + 1}`;
    renderMath();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // === Progress bar ===
  function updateProgress() {
    const answered = questionsArray.filter(q => q.selected !== null).length;
    const total = questionsArray.length;
    const percent = Math.round((answered / total) * 100);
    progressBar.style.width = percent + '%';
    progressText.innerText = `${answered} / ${total}`;
  }

  // === Navigation ===
  prevBtn.addEventListener('click', () => { showQuestion(current - 1); renderMath(); });
  nextBtn.addEventListener('click', () => { showQuestion(current + 1); renderMath(); });


  // ✅ Save & Next
  saveNextBtn.addEventListener('click', () => {
    const q = questionsArray[current];
    const sel = document.querySelector(`#q${current + 1} input[type="radio"]:checked`);

    q.selected = sel ? parseInt(sel.value, 10) : null;
    q.visited = true;
    q.answered = q.selected !== null;

    updatePalette();
    updateProgress();

    if (current < questionsArray.length - 1) {
    showQuestion(current + 1);
    renderMath();   // ensure math renders on newly shown question
  } else {
    alert('This is the last question');
  }

  });

  // ✅ Mark for Review
  const markReviewBtn = document.getElementById('mark');
  if (markReviewBtn) {
    markReviewBtn.addEventListener('click', () => {
      const q = questionsArray[current];
      q.markedForReview = !q.markedForReview;
      updatePalette();
      if (current < questionsArray.length - 1) {
        showQuestion(current+1);
        renderMath();
      }

    });
  }

  // === Timer ===
  let countdown;
  function startTimer(seconds) {
    let time = seconds;
    clearInterval(countdown);
    function tick() {
      if (time < 0) {
        clearInterval(countdown);
        alert('Time finished. Submitting exam.');
        submitExam();
        return;
      }
      const m = Math.floor(time / 60);
      const s = time % 60;
      timerVal.innerText = `${m}:${s < 10 ? '0' + s : s}`;
      timerSmall.innerText = `${m}:${s < 10 ? '0' + s : s}`;
      time--;
    }
    tick();
    countdown = setInterval(tick, 1000);
  }

  // === Start Exam ===
  document.getElementById('start-exam').addEventListener('click', function() {
    const name = document.getElementById('student-name').value.trim();
    const email = document.getElementById('student-email').value.trim();
    const title = document.getElementById('exam-title').value.trim();
    if (!name) { alert('Name required'); return; }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) { alert('Valid email required'); return; }
    if (!title) { alert('Exam title required'); return; }

    headerExamTitle.innerText = title;
    studentInfoP.innerHTML = `<strong>Name:</strong> ${name} | <strong>Email:</strong> ${email} | <strong>Exam:</strong> ${title}`;

    document.getElementById('student-form').style.display = 'none';
    document.getElementById('exam').style.display = 'block';
    showQuestion(0);
    renderMath();   // render math for the first shown question
    document.getElementById("total-q").textContent = questionsArray.length;
    document.getElementById("progress-text").textContent = `0 / ${questionsArray.length}`;



    const selectedDuration =
      parseInt(document.getElementById("exam-duration").value, 10);

    document.getElementById('duration-text').innerText =
      selectedDuration + " minutes";

    startTimer(selectedDuration * 60);


  });

  // === Submit Exam ===
  submitBtn.addEventListener('click', submitExam);


  function submitExam() {
    clearInterval(countdown);

    let score = 0;
    const tbody = document.querySelector('#result-table tbody');
    tbody.innerHTML = '';

    questionsArray.forEach((item, index) => {
      let status = '';
      let statusColor = '#374151'; // gray default

      // ===== STATUS LOGIC =====
      if (item.selected === null) {
        status = 'Not Attended';
        statusColor = '#6b7280';
      } else if (item.selected === item.answer) {
        status = 'Correct';
        statusColor = '#166534';
        score++;
      } else {
        status = 'Incorrect';
        statusColor = '#b91c1c';
      }

      const userText =
        item.selected === null
          ? 'Not Attended'
          : item.options[item.selected];

      const correctText =
        item.answer >= 0 && item.answer < item.options.length
          ? item.options[item.answer]
          : 'N/A';

      tbody.innerHTML += `
        <tr>
          <td style="max-width:300px; word-wrap:break-word;">${item.q}</td>
          <td>${userText}</td>
          <td>${correctText}</td>
          <td style="font-weight:700; color:${statusColor}">
            ${status}
          </td>
        </tr>`;
    });

    const pct = ((score / questionsArray.length) * 100).toFixed(2);
    let grade = '';
    if (pct >= 90) grade = 'A+';
    else if (pct >= 80) grade = 'A';
    else if (pct >= 70) grade = 'B';
    else if (pct >= 60) grade = 'C';
    else grade = 'F';

    document.getElementById('score-summary').innerText =
      `Score: ${score}/${questionsArray.length} | Percentage: ${pct}% | Grade: ${grade}`;

    document.getElementById('result-table').style.display = 'table';
    document.getElementById('exam').style.display = 'none';
    document.getElementById('result').style.display = 'block';

    MathJax.typesetPromise().catch(()=>{});
  }

  // === Home & CSV ===
  document.getElementById('home-btn').addEventListener('click', ()=> location.reload());
  document.getElementById('download-csv').addEventListener('click', ()=> {
  let csv = 'Question,Your Answer,Correct Answer,Status\n';
    questionsArray.forEach(item => {
      const userAnswer =
        item.selected === null
          ? 'Not Attended'
          : item.options[item.selected];

      const correctText =
        item.answer >= 0 ? item.options[item.answer] : 'N/A';

      const status =
        item.selected === null
          ? 'Not Attended'
          : item.selected === item.answer
            ? 'Correct'
            : 'Incorrect';

      csv += `"${item.q.replace(/"/g,'""')}","${userAnswer.replace(/"/g,'""')}","${correctText.replace(/"/g,'""')}","${status}"\n`;
    });
  });

  updateProgress();
});
