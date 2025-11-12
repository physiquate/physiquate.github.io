
  // =========================================== Step 1: Questions Array (inline LaTeX fixed) =====================================================
window.questionSet = [
  { 
    q: "given the four vectors \\(u_1 =\\begin{bmatrix} 1 \\\\ 2 \\\\ 1 \\end{bmatrix},u_2= \\begin{bmatrix} 3 \\\\ -5 \\\\ 1 \\end{bmatrix},u_3=\\begin{bmatrix} 2 \\\\ 4 \\\\ -8 \\end{bmatrix}, u_4 = \\begin{bmatrix} 3 \\\\ 6 \\\\ -12 \\end{bmatrix} \\) the linearly dependent pair is", 
    options: [
      "\\(u_1\\cdot u_2\\)",
      "\\(u_1 \\cdot u_3\\)",
      "\\(u_4 \\cdot u_2\\)",
      "\\(u_3 \\cdot u_4\\)"
    ], 
    answer: 3 
  },
  { 
    q: "The value of\\( \\oint_{s} \\frac{\\vec{r} \\cdot \\vec{ds}}{r_3}\\), where \\(\\vec{r}\\) is the position vector and s is the closed surface enclosing the origin", 
    options: [
      "0",
      "\\(\\pi\\)",
      "3\\(\\pi\\)",
      "4\\(\\pi\\)"
    ], 
    answer: 3 
  },
  {   
    q: "If \\(\\vec{r} = x \\hat{i} + y \\hat{j}, then\\)", 
    options: [
      "\\(\\nabla \\cdot \\vec{r} =0\\) and \\(\\nabla |\\vec{r}| = \\vec{r} \\)",
      "\\(\\nabla \\cdot \\vec{r} =2\\) and \\(\\nabla |\\vec{r}| = \\vec{r} \\)",
      "\\(\\nabla \\cdot \\vec{r} =2\\) and \\(\\nabla |\\vec{r}| = \\frac{\\vec{r} }{r}\\)",
      "\\(\\nabla \\cdot \\vec{r} =3\\) and \\(\\nabla |\\vec{r}| = \\frac{\\vec{r} }{r}\\)"
    ], 
    answer: 2 
  },
  { 
    q: "The curl of the vector field \\(\\vec{F}\\) is \\(2 \\hat{x}\\). Identify the approximate vector field \\(\\vec{F}\\) from the choices given below", 
    options: [
      "\\(\\nabla \\cdot \\vec{r} =0\\) and \\(\\nabla |\\vec{r}| = \\vec{r} \\)",
      "\\(\\nabla \\cdot \\vec{r} =2\\) and \\(\\nabla |\\vec{r}| = \\vec{r} \\)",
      "\\(\\nabla \\cdot \\vec{r} =2\\) and \\(\\nabla |\\vec{r}| = \\frac{\\vec{r} }{r}\\)",
      "\\(\\nabla \\cdot \\vec{r} =3\\) and \\(\\nabla |\\vec{r}| = \\frac{\\vec{r} }{r}\\)"
    ], 
    answer: 2 
  }, 
  {   
    q: "The curl of the vector field \\(\\vec{F}\\) is \\(2 \\hat{x)\\). Identify the approximate vector field \\(\\vec{F}\\) from the choices given below", 
    options: [
      "\\(\\vec{F} = 2z \\hat{x} + 3 z \\hat{y} + 5 y \\hat{z}\\)",
      "\\(\\vec{F} = 3z \\hat{x} + 5 y \\hat{z}\\)",
      "\\(\\vec{F} =  3 x\\hat{y} + 5 y \\hat{z}\\)",
      "\\(\\vec{F} =  2 x\\hat{y} + 5 y \\hat{z}\\)"
    ], 
    answer: 0
  },
  { 
    q: "The value of contour integral \\(|\\int_c \\vec{r} \\times \\vec{d\\theta}|\\), for a circle c of radius r with centre at the origin is", 
    options: [
      "\\(2\\pi r\\)",
      "\\(\\frac{r^2}{2}\\)",
      "\\(\\pi r^2\\)",
      "r"
    ], 
    answer: 0 
  }, 
  { 
    q: "Consider the set of vectors in 3 dimensional real vector space \\(R^3\\) , \\(S=\\{(1,1,1), (1,-1,1), (1,1,-1)\\}\\) which of the following statement is true?", 
    options: [
      "S is not linearly independent set",
      "S is basis for \\(R^3\\)",
      "The vector in S are orthogonal",
      "An orthogonal set of vectors cannot be generated from S"
    ], 
    answer: 1 
  },
  {  
    q: "If a force \\(\\vec{F}\\) is derivable from a potential function V(r), where r is the distance form the origin of the coordinate system, it follows that, ", 
    options: [
      "\\(\\vec{\\nabla}\\times \\vec{F}=0\\)",
      "\\(\\vec{\\nabla}\\cdot \\vec{F}=0\\)",
      "\\(\\vec{\\nabla}V=0\\)",
      "\\(\\vec{\\nabla}^2V=0\\)"
    ], 
    answer: 0 
  },
  { 
    q: "The curl of vector normal to the surface \\(x^2+y^2z^2\\) at the potential (1,1,1) is", 
    options: [
      "\\(\\frac{\\hat{i}+\\hat{j}-\\hat{k}}{\\sqrt{3}} \\)",
      "\\(\\frac{2\\hat{i}+\\hat{j}-\\hat{k}}{\\sqrt{6}} \\)",
      "\\(\\frac{\\hat{i}+2\\hat{j}-\\hat{k}}{\\sqrt{6}} \\)",
      "\\(\\frac{2\\hat{i}+2\\hat{j}-\\hat{k}}{3} \\) "
    ], 
    answer: 3
  },
  { 
    q: "The directional derivative of \\(f (x, y, z) = x^2 yz + 4xz^2\\) at (1, -2, -1) along \\(2\\hat{i}-\\hat{j}-2\\hat{k}\\) is", 
    options: [
      "37",
      "37/5",
      "37/3",
      "None"
    ], 
    answer: 2 
  }, 
  { 
    q: "Find unit vector normal to the surface \\(x^{2}-y^{2}+z=2\\) at (1, -1, 2)", 
    options: [
      "\\(\\pm \\frac{(2\\hat{i}+2\\hat{j}+\\hat{k})}{3}\\)",
      "\\(\\frac{(2\\hat{i}+2\\hat{j}+\\hat{k})}{3}\\)",
      "\\(-\\frac{(2\\hat{i}+2\\hat{j}+\\hat{k})}{3}\\)",
      "None of the above"
    ], 
    answer: 1 
  }, 
  { 
    q: "If \\(\\vec{F}=(2xy+z^{3})\\hat{i}+x^{2}\\hat{j}+2xz\\hat{k}\\) is irrotational, then the scalar function \\(\\phi\\) such that \\(\\vec{F}=\\nabla\\phi\\)", 
    options: [
      "\\(\\phi = xy+xz^{3}\\)",
      "\\(\\phi = x^{2}y-xz^{3}\\)",
      "\\(\\phi = x^{2}y+xz^{3}\\)",
      "\\(\\phi = -x^{2}y-xz^{3}\\)"
    ], 
    answer: 2 
  },
  { 
    q: "The value of \\(\\int_{s}(x+z)dydz + (y+z)dxdz+(x+y)dxdy\\), where ‘s’ is the surface of the sphere \\(x^{2}+y^{2}+z^{2}=4\\), is  …………", 
    options: [
      "\\(128 \\pi/3\\)",
      "\\(64 \\pi/3\\)",
      "\\(32 \\pi/3\\)",
      "\\(256 \\pi/3\\)"
    ], 
    answer: 1    
  },
  { 
    q: "The value of \\(\\oint_{c}(x^{2} -xy^{3}) dx+(y^{2}-2xy)dy\\), where C is the square with vertices \\((0,0),(2,0),(0,2)\\) is ………….", 
    options: [
      "16",
      "14",
      "12",
      "8"
    ], 
    answer: 3  
  },
  { 
    q: "A necessary and sufficient condition that the line integral \\(\\int_{c}\\vec{A}\\cdot\\vec{dr}=0\\) for every closed curve ‘C’ is ………", 
    options: [
      "div\\(\\vec{A}\\) =0",
      "div\\(\\vec{A}\\) ≠0",
      "curl\\(\\vec{A}\\) =0",
      "curl\\(\\vec{A}\\) ≠0"
    ], 
    answer: 2 
  }, 
  { 
    q: "The value of \\(\\int_{c}ydx - xdy\\) where C is the ellipse \\(x=a cos t\\) and \\(y=b sint\\) is …………..", 
    options: [
      "\\(\\pi ab\\)",
      "\\(2\\pi ab\\)",
      "\\(-\\pi ab\\)",
      "\\(-2\\pi ab\\)"
    ], 
    answer:  3
  },
  { 
    q: "The angle between the tangents to the curve \\( \\vec{r} = t^{2}\\hat{i}+2t\\hat{j}-t^{3}\\hat{k}\\) at the point \\(t=\\pm1\\) is", 
    options: [
      "9/17",
      "\\(cos^{-1}(9/27)\\)",
      "\\(cos^{-1}(9/17)\\)",
      "\\(cos^{-1}(19/17)\\)"
    ], 
    answer: 2 
  },
  { 
    q: "The value of the integral \\(\\int\\vec{F}\\cdot\\vec{dr}\\), where \\(\\vec{F}=(2y+3)\\hat{i}+xz\\hat{j}+(yz-x)\\hat{k}\\) along the line joining the points (0,1,1) and (2,1,1) is ………..", 
    options: [
      "10",
      "5",
      "-10",
      "-5"
    ], 
    answer: 0 
  },
  { 
    q: "The value of \\(\\oint_{c}xydy-y^{2}dx\\) where c is the rectangle cut from the first quadrant by the lines x=1 and y=2 is ……………", 
    options: [
      "3/2",
      "3",
      "6",
      "12"
    ], 
    answer: 2  
  },
  { 
    q: "The unit normal vector to the surface \\(x^{2}+y^{2}+z^{2}-48=0\\) at the point (4,4,4) is", 
    options: [
      "\\(\\frac{1}{sqrt{3}}, \\frac{1}{sqrt{3}}, \\frac{1}{sqrt{3}}\\)",
      "\\(\\frac{2}{sqrt{2}}, \\frac{2}{sqrt{2}}, \\frac{2}{sqrt{2}}\\)",
      "\\(\\frac{1}{sqrt{5}}, \\frac{1}{sqrt{5}}, \\frac{1}{sqrt{5}}\\)",
      "\\(\\frac{1}{sqrt{2}}, \\frac{1}{sqrt{2}}, \\frac{1}{sqrt{2}}\\)"
    ], 
    answer: 0 
  } 

];





