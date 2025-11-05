document.addEventListener('DOMContentLoaded', function(){
let visitedQuestions = [];

// MathJax helper
function renderMath() {
  if (window.MathJax) MathJax.typesetPromise().catch(()=>{});
}

function shuffleArray(array){
  for(let i=array.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// === Settings ===
const numQuestionsToShow = 20;
const questionFiles = ['set1.html','set2.html','set3.html','set4.html'];
let questionsArray = [];

async function loadQuestionsFromFiles(){
  let all = [];
  for(const file of questionFiles){
    try{
      const res = await fetch(file);
      if(!res.ok) { console.warn('Failed to load', file); continue; }
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const qEls = doc.querySelectorAll('.question');
      qEls.forEach(qEl => {
        const qText = qEl.querySelector('.q') ? qEl.querySelector('.q').innerHTML.trim() : qEl.innerHTML.trim();
        const optionEls = qEl.querySelectorAll('.option');
        const options = Array.from(optionEls).map(o => o.innerHTML.trim());
        const answerAttr = qEl.getAttribute('data-answer');
        const answerIndex = (answerAttr !== null) ? parseInt(answerAttr,10) : -1;
        if(qText && options.length >= 2){
          all.push({ q: qText, options: options, answer: answerIndex });
        }
      });
    } catch(err){
      console.warn('Error loading file', file, err);
    }
  }
  return all;
}

// Initialize exam
(async function init(){
  questionsArray = await loadQuestionsFromFiles();
  document.getElementById("total-q").textContent = numQuestionsToShow;

  if(questionsArray.length === 0){
    console.error('No questions loaded');
    document.getElementById('left-card').innerHTML = '<p style="color:red">No questions loaded. Check console.</p>';
    return;
  }

  questionsArray = shuffleArray(questionsArray).slice(0, numQuestionsToShow);

  questionsArray = questionsArray.map(q => ({
    ...q,
    visited: false,
    answered: false,
    markedForReview: false,
    selected: null
  }));

  // shuffle options per question while preserving correct answer
  questionsArray.forEach(q => {
    if(typeof q.answer === 'number' && q.answer >=0 && q.answer < q.options.length){
      const correctValue = q.options[q.answer];
      q.options = shuffleArray(q.options.slice());
      q.answer = q.options.indexOf(correctValue);
    } else q.answer = -1;
  });

  createQuestionNodes();
  renderMath();
  updateTotalCount?.();
  updateProgress();
})();

// ========== DOM creation ==========
const questionsRoot = document.getElementById('questions-root');
const paletteRoot = document.getElementById('palette-root');

function createQuestionNodes(){
  questionsRoot.innerHTML = '';
  paletteRoot.innerHTML = '';
  questionsArray.forEach((item,index)=>{
    const qDiv = document.createElement('div');
    qDiv.classList.add('question');
    qDiv.id = `q${index+1}`;
    qDiv.style.display = 'none';

    const p = document.createElement('div');
    p.style.marginBottom = '10px';
    p.innerHTML = `<div style="font-weight:600; margin-bottom:6px;">${index+1}.</div><div>${item.q}</div>`;
    qDiv.appendChild(p);

    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'options';
    item.options.forEach((opt,i)=>{
      const label = document.createElement('label');
      label.htmlFor = `q${index+1}_opt${i}`;
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `q${index+1}`;
      input.id = `q${index+1}_opt${i}`;
      input.value = i;
      const span = document.createElement('span');
      span.className = 'opt-text';
      span.innerHTML = opt;
      label.appendChild(input);
      label.appendChild(span);
      optionsDiv.appendChild(label);

      // ✅ Update palette live when an option is clicked
      input.addEventListener('change', () => {
        const q = questionsArray[index];
        q.selected = parseInt(input.value, 10);
        q.answered = true;
        q.markedForReview = false;
        updatePalette();
        updateProgress();
      });
    });

    qDiv.appendChild(optionsDiv);
    questionsRoot.appendChild(qDiv);

    const pal = document.createElement('button');
    pal.className = 'pal-btn';
    pal.innerText = index+1;
    pal.dataset.index = index;
    pal.addEventListener('click', ()=> showQuestion(index));
    paletteRoot.appendChild(pal);
  });

  updatePalette();
}

// ========== Palette update ==========
function updatePalette() {
  const paletteButtons = document.querySelectorAll(".pal-btn");
  paletteButtons.forEach((btn, index) => {
    const q = questionsArray[index];

    btn.classList.remove("current", "answered", "review", "visited");

    if (index === current) btn.classList.add("current");
    if (q.selected !== null || q.answered) btn.classList.add("answered");
    if (q.markedForReview) btn.classList.add("review");
    if (q.visited && !q.answered && !q.markedForReview) btn.classList.add("visited");
  });
}

// ========== State & controls ==========
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

function showQuestion(index){
  const questions = document.querySelectorAll('#questions-root .question');
  if(questions.length===0) return;

  if(index < 0) index = 0;
  if(index >= questions.length) index = questions.length-1;
  current = index;
  questionsArray[current].visited = true;

  questions.forEach((q,i)=>{
    q.style.display = (i===index) ? 'block':'none';
    if(i===index){
      const sel = questionsArray[i].selected;
      if(sel!==null){
        const radio = q.querySelector(`#q${i+1}_opt${sel}`);
        if(radio) radio.checked = true;
      }
    }
  });

  updatePalette();
  updateProgress();
  document.getElementById('q-num').innerText = `Q${index+1}`;
  MathJax.typesetPromise().catch(()=>{});
  window.scrollTo({top:0, behavior:'smooth'});
}

// Progress bar
function updateProgress(){
  const questions = document.querySelectorAll('#questions-root .question');
  const answered = [...questions].filter((q)=> q.querySelector('input[type="radio"]:checked')).length;
  const total = questions.length;
  const percent = Math.round((answered/total)*100);
  progressBar.style.width = percent + '%';
  progressText.innerText = `${answered} / ${total}`;
}

// Navigation buttons
prevBtn.addEventListener('click', ()=> showQuestion(current-1));
nextBtn.addEventListener('click', ()=> showQuestion(current+1));

// ✅ Save & Next
saveNextBtn.addEventListener('click', ()=>{
  const q = questionsArray[current];
  const sel = document.querySelector(`#q${current+1} input[type="radio"]:checked`);
  q.selected = sel ? parseInt(sel.value,10) : null;
  q.visited = true;
  q.answered = q.selected !== null;
  updatePalette();
  updateProgress();
  if(current < questionsArray.length-1) showQuestion(current+1);
  else alert('This is the last question');
});

// ✅ Mark for Review
const markReviewBtn = document.getElementById('mark');
if(markReviewBtn){
  markReviewBtn.addEventListener('click', ()=>{
    const q = questionsArray[current];
    q.markedForReview = !q.markedForReview;
    q.answered = q.selected !== null; // keep answered green
    updatePalette();
    if(current < questionsArray.length-1) showQuestion(current+1);
  });
}

// Timer
let countdown;
function startTimer(seconds){
  let time = seconds;
  clearInterval(countdown);
  function tick(){
    if(time<0){ clearInterval(countdown); alert('Time finished. Submitting exam.'); submitExam(); return; }
    const m = Math.floor(time/60);
    const s = time%60;
    timerVal.innerText = `${m}:${s<10?'0'+s:s}`;
    timerSmall.innerText = `${m}:${s<10?'0'+s:s}`;
    time--;
  }
  tick();
  countdown = setInterval(tick,1000);
}

// Start exam
document.getElementById('start-exam').addEventListener('click', function(){
  const name = document.getElementById('student-name').value.trim();
  const email = document.getElementById('student-email').value.trim();
  const title = document.getElementById('exam-title').value.trim();
  if(!name){alert('Name required'); return;}
  const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!email || !emailPattern.test(email)){alert('Valid email required'); return;}
  if(!title){alert('Exam title required'); return;}

  headerExamTitle.innerText = title;
  studentInfoP.innerHTML = `<strong>Name:</strong> ${name} | <strong>Email:</strong> ${email} | <strong>Exam:</strong> ${title}`;

  document.getElementById('student-form').style.display='none';
  document.getElementById('exam').style.display='block';
  showQuestion(0);
  document.getElementById('total-q').textContent = numQuestionsToShow;
  document.getElementById('progress-text').textContent = `0 / ${numQuestionsToShow}`;
  document.getElementById('duration-text').innerText = '30 minutes';
  startTimer(30*60);
});

// Submit
submitBtn.addEventListener('click', submitExam);
function submitExam(){
  clearInterval(countdown);
  let score = 0;
  const tbody = document.querySelector('#result-table tbody');
  tbody.innerHTML='';
  questionsArray.forEach((item,index)=>{
    const qDiv=document.getElementById(`q${index+1}`);
    const selected=qDiv ? qDiv.querySelector('input[type="radio"]:checked'):null;
    const userIndex = selected ? parseInt(selected.value,10):-1;
    const status = (userIndex===item.answer)?'Correct':'Incorrect';
    if(status==='Correct') score++;
    const userText=(userIndex===-1)?'Not Answered':item.options[userIndex];
    const correctText=(item.answer>=0 && item.answer<item.options.length)?item.options[item.answer]:'N/A';
    tbody.innerHTML+=`<tr>
      <td style="max-width:300px; word-wrap:break-word;">${item.q}</td>
      <td>${userText}</td>
      <td>${correctText}</td>
      <td style="font-weight:700; color:${status==='Correct'?'#166534':'#b91c1c'}">${status}</td>
    </tr>`;
  });
  const pct=((score/questionsArray.length)*100).toFixed(2);
  let grade='';
  if(pct>=90) grade='A+'; else if(pct>=80) grade='A'; else if(pct>=70) grade='B'; else if(pct>=60) grade='C'; else grade='F';
  document.getElementById('score-summary').innerText=`Score: ${score}/${questionsArray.length} | Percentage: ${pct}% | Grade: ${grade}`;
  document.getElementById('result-table').style.display='table';
  document.getElementById('exam').style.display='none';
  document.getElementById('result').style.display='block';
  MathJax.typesetPromise().catch(()=>{});
  document.getElementById('result').scrollIntoView({behavior:'smooth'});
}

// Home & CSV
document.getElementById('home-btn').addEventListener('click', ()=>location.reload());
document.getElementById('download-csv').addEventListener('click', ()=>{
  let csv='Question,Your Answer,Correct Answer,Status\n';
  questionsArray.forEach((item,index)=>{
    const qDiv=document.getElementById(`q${index+1}`);
    const selected=qDiv ? qDiv.querySelector('input[type="radio"]:checked'):null;
    const userAnswer=selected ? item.options[parseInt(selected.value,10)]:'Not Answered';
    const correctText=item.answer>=0?item.options[item.answer]:'N/A';
    const status=(userAnswer===correctText)?'Correct':'Incorrect';
    csv+=`"${item.q.replace(/"/g,'""')}","${userAnswer.replace(/"/g,'""')}","${correctText.replace(/"/g,'""')}","${status}"\n`;
  });
  const blob=new Blob([csv],{type:'text/csv'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a'); a.href=url; a.download='exam_results.csv'; a.click();
  URL.revokeObjectURL(url);
});

updateProgress();
});
