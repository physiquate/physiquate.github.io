
  // =========================================== Step 1: Questions Array (inline LaTeX fixed) =====================================================
window.questionSet = [

  { q: "A vector \\(\\vec{A} = (5x+3y)\\hat{i}+(3y-z)\\hat{j}+(2x-az)\\hat{k}\\) is a constant if the value of a has a value", 
    options: [
      "4",
      "-4",
      "8",
      "-8"
    ], 
    answer: 2
  },
  { 
    q: "The unit vector normal to the surface \\(3x^2+4y=z\\) at the point (1,1,7) is", 
    options: [
      "\\(\\frac{-6\\hat{i}+4\\hat{j}+\\hat{k}}{\\sqrt{53}}\\)",
      "\\(\\frac{4\\hat{i}+6\\hat{j}-\\hat{k}}{\\sqrt{53}}\\)",
      "\\(\\frac{6\\hat{i}+4\\hat{j}-\\hat{k}}{\\sqrt{53}}\\)",
      "\\(\\frac{4\\hat{i}+6\\hat{j}+\\hat{k}}{\\sqrt{53}}\\)"
    ],
    answer: 2
  },
    
  { 
    q: "The two vectors \\(\\vec{p}=\\hat{i}, \\; \\hat{i}+\\hat{j} = \\sqrt{2}\\)", 
    options: [
      "related by a rotation",
      "related by a reflection through xy plane",
      "related by inversion",
      "not linearly independent"
    ],
    answer: 0
  },
    
  { 
    q: "the curl of the vector \\(2\\hat{i} + x \\hat{j} + y\\hat{k}\\) is given by", 
    options: [
      "\\(\\hat{i}+\\hat{j}+\\hat{k}\\)",
      "\\(\\hat{i}-\\hat{j}+\\hat{k}\\)",
      "\\(\\hat{i}+\\hat{j}-\\hat{k}\\)",
      "\\(-\\hat{i}-\\hat{j}-\\hat{k}\\)"
    ],
    answer: 0
  },
    
    
  { 
    q: "Consider a vector \\(\\vec{V} = \\frac{\\vec{r}}{r^3}\\). The surface integral of this vector over the surface of a cube of size a and centred at the origin", 
    options: [
      "0",
      "\\(2\\pi\\)",
      "\\(2\\pi a^3\\)",
      "\\(4\\pi\\)"
    ],
    answer: 3
  },
    
  { 
    q: "which of the following is not correct for this vector \\(\\vec{V} = \\frac{\\vec{r}}{r^3}\\)", 
    options: [
      "value of line integral of this vector arround any closed curve is zero",
      "this vector can be written as the gradient of some scalar funtion",
      "the line integral of this vector from point P to Q is ibdipendent of path taken",
      "the vector can represent magnetic field represent some current distribusion"
    ],
    answer: 3
  },
  { 
    q: "For the function \\(x^2y \\; + \\; xy \\), the value of \\(|\\vec{\\nabla}\\phi|\\) at \\(x=y=1\\)", 
    options: [
      "5",
      "\\(\\sqrt{5}\\)",
      "13",
      "\\(\\sqrt{13}\\)"
    ], 
    answer: 2 
  },
  { 
    q: "The unit normal vector to the curve \\(x^3y^2+xy=17\\) at the point (2,0)", 
    options: [
      "\\(\\frac{\\hat{i}+\\hat{j}}{\\sqrt{2}}\\)",
      "\\(-\\hat{i}\\)",
      "\\(-\\hat{j}\\)",
      "\\(\\hat{j}\\)"
    ], 
    answer: 2 
  },
  { 
    q: "If the vector field \\(\\vec{F} = x \\hat{j}+2y\\hat{j}+3z\\hat{k}\\). Then \\(\\nabla\\times(\\nabla\\times\\vec{F})\\) is ", 
    options: [
      "0",
      "\\(\\hat{i}\\)",
      "\\(2\\hat{j}\\)",
      "\\(3\\hat{k}\\)"
    ], 
    answer: 0 
  },
  { 
    q: "Evaluate: \\(\\int_{-\\infty}^{\\infty}\\;e^{-x^2} \\delta'(x-1)dx\\)", 
    options: [
      "-2/e",
      "2/e",
      "e/2",
      "-e/2"
    ], 
    answer: 1
  },
  { 
    q: "Evaluate: \\(\\int_{-\\infty}^{\\infty}\\; x^{2} sinx \\; \\delta'(x-\\frac{\\pi}{2})dx\\)", 
    options: [
      "\\(-\\pi\\)",
      "\\(\\pi\\)",
      "\\(\\frac{\\pi}{2}\\)",
      "\\(\\frac{1}{\\pi}\\)"
    ], 
    answer: 0 
  },
  { 
    q: "Evaluate: \\(\\int_{-\\infty}^{\\infty}\\;(2x^{3}+5x-7)\\delta'(x)dx\\)", 
    options: [
      "5",
      "1/5",
      "-1/5",
      "-5"
    ], 
    answer: 3
  },
  { 
    q: "Evaluate: \\(\\int_{-\\infty}^{\\infty}\\;x^{4}\\delta'(x)dx\\)", 
    options: ["0",
      "-1",
      "4",
      "-4"
    ], 
    answer: 0
  },
  { 
    q: "Evaluate: \\(\\int_{-\\infty}^{\\infty}\\;\\delta'(x-1)dx\\)", 
    options: [
      "0",
      "-1",
      "1",
      "1/2"], 
    answer: 0 
  },
  { 
    q: "Evaluate: \\(\\int_{-\\infty}^{\\infty}\\;cos(\\frac{\\pi}{2}x)\\delta'(6x^{2}-x-1)dx\\)", 
    options: [
      "\\(\\frac{\\sqrt{10}}{3}+\\frac{1}{2\\sqrt{5}}\\)",
      "\\(\\frac{-\\sqrt{5}}{10}+\\frac{1}{5\\sqrt{2}}\\)",
      "\\(\\frac{\\sqrt{5}}{10}-\\frac{1}{5\\sqrt{2}}\\)",
      "\\(\\frac{\\sqrt{3}}{10}+\\frac{1}{5\\sqrt{2}}\\)"
    ], 
    answer: 3 
  },
  { 
    q: "Evaluate: \\(\\int_{0}^{\\infty}\\;\\delta(cosx)e^{-x}dx\\)", 
    options: [
      "\\(-\\frac{1}{2 sinh{\\pi/2}}\\)",
      "\\(\\frac{1}{2 sinh{\\pi/2}}\\)",
      "\\(\\frac{1}{2 cosh{\\pi/2}}\\)",
      "\\(-\\frac{1}{2 sinh{\\pi/2}}\\)"
    ], 
    answer: 1 
  },
  { 
    q: "Evaluate: \\(\\int_{0}^{\\infty}\\;\\delta(sinx)e^{-x}dx\\)", 
    options: [
      "\\(\\frac{1-e^{-1}}{1+e^{-1}}\\)",
      "\\(\\frac{e^{-1}+1}{e^{-1}-1}\\)",
      "\\(\\frac{1+e^{-1}}{1-e^{-1}}\\)",
      "\\(\\frac{e^{-1}-1}{e^{-1}+1}\\)"
    ], 
    answer: 2 
  },
  { 
    q: "Evaluate: \\(\\int_{-1}^{1}dy[\\int_{-\\pi/2}^{\\pi/2}dx\\; \\delta(sin2x)\\delta(x-y)]\\)", 
    options: [
      "1/2",
      "-1/2",
      "2",
      "-2"
    ], 
    answer: 2 
  },
  { 
    q: "Evaluate the integral \\(j=\\int_{v}(r^2+2)\\vec{\\nabla} \\cdot\\frac{\\hat{r}}{r^2}d\\tau\\) where v is a sphere of radius R centered at the origin", 
    options: [
      "\\(2\\pi\\)",
      "\\(4\\pi\\)",
      "\\(6\\pi\\)",
      "\\(8\\pi\\)"
    ], 
    answer: 3 
  },
  { 
    q: "Evaluate: \\(\\int_{0}^{1}\\;x^3\\delta(x-2)dx\\)", 
    options: [
      "0",
      "4",
      "6",
      "12"
    ], 
    answer: 3 
  }

];

  