
  // =========================================== Step 1: Questions Array (inline LaTeX fixed) =====================================================
window.questionSet = [
{ 
  q: "An electric dipole with dipole moment 5 × 10⁻6 C m is aligned with the direction of a uniform electric field of magnitude 4 × 10⁵ N/C. The dipole is then rotated through an angle of 60° with respect to the electric field. The change in the potential energy of the dipole is:",
  
  options: [
    "1.2 J",
    "1.5 J",
    "0.8 J",
    "1.0 J"
  ],
  
  answer: 3,
},
{
  q: "Two identical charged conducting spheres A and B have their centres separated by a certain distance. Charge on each sphere is q and the force of repulsion between them is F. A third identical uncharged conducting sphere is brought in contact with sphere A first and then with B and finally removed from both. The new force of repulsion between spheres A and B is best given as:",
  
  options: [
    "F/2",
    "3F/8",
    "3F/5",
    "2F/3"
  ],
  
  answer: 1,
},
{

  q: "A metal cube of side 5 cm is charged with 6 μC. The surface charge density on the cube is",
  
  options: [
    "0.125 × 10⁻3 C m⁻2",
    "0.25 × 10⁻3 C m⁻2",
    "4 × 10⁻3 C m⁻2",
    "0.4 × 10⁻3 C m⁻2"
  ],
  
  answer: 3,
},
{

  q: "The value of electric potential at a distance of 9 cm from the point charge 4 × 10⁻7 C is [Given \\( \\frac{1}{4\\pi\\varepsilon_0} = 9 × 10^9 \\text{ N m}^2\\text{C}^{-2} \\)]:",
  
  options: [
    "4 × 10² V",
    "44.4 V",
    "4.4 × 10⁵ V",
    "4 × 10⁴ V"
  ],
  
  answer: 3,

},
{

  q: "A thin spherical shell is charged by some source. The potential difference between the two points C and P (in V) shown in the figure is: (Take \\( \\frac{1}{4\\pi\\varepsilon_0} = 9 × 10^9 \\) SI units)",
  figure: "images/M1/Q5_1.png",
  options: [
    "3 × 10⁵",
    "1 × 10⁵",
    "0.5 × 10⁵",
    "Zero"
  ],
  
  answer: 3,
},
{

  q: "Given below are two statements: one is labelled as Assertion A and the other is labelled as Reason R. Assertion A: The potential (V) at any axial point, at 2 m distance (r) from the centre of the dipole of dipole moment vector \\( \\vec{P} \\) of magnitude \\(4 × 10^{-6} \\text{ C m}\\), is ±9 × 10³ V. (Take \\( \\frac{1}{4\\pi\\varepsilon_0} = 9 × 10^9 \\) SI units). Reason R: \\( V = \\pm \\frac{2P}{4\\pi\\varepsilon_0 r^2} \\), where r is the distance of any axial point situated at 2 m from the centre of the dipole.",
  
  options: [
    "Both A and R are true and R is the correct explanation of A.",
    "Both A and R are true and R is NOT the correct explanation of A.",
    "A is true but R is false.",
    "A is false but R is true."
  ],
  
  answer: 0,

},
{

  q: "According to Gauss law of electrostatics, electric flux through a closed surface depends on:",
  
  options: [
    "the area of the surface",
    "the quantity of charges enclosed by the surface",
    "the shape of the surface",
    "the volume enclosed by the surface"
  ],
  
  answer: 1,
},
{

  q: "A charge Q μC is placed at the centre of a cube. The flux coming out from any one of its faces will be (in SI unit):",
  
  options: [
    "Q/ε₀ × 10⁻⁶",
    "2Q/(3ε₀) × 10⁻³",
    "Q/(6ε₀) × 10⁻³",
    "Q/(6ε₀) × 10⁻⁶"
  ],
  
  answer: 3,
},
{

  q: "If a conducting sphere of radius R is charged, then the electric field at a distance r (r > R) from the centre of the sphere would be (V = potential on the surface of the sphere):",
  
  options: [
    "rV / R²",
    "R²V / r³",
    "RV / r²",
    "V / r"
  ],
  
  answer: 2,
},
{

  q: "An electric dipole is placed at an angle of 30° with an electric field of intensity \\(2 × 10^5 N C⁻¹\\). It experiences a torque equal to 4 N m. Calculate the magnitude of charge on the dipole, if the dipole length is 2 cm.",
  
  options: [
    "6 mC",
    "4 mC",
    "2 mC",
    "1 mC"
  ],
  
  answer: 2,
},
{

  q: "If \\( \\oint_{S} \\vec{E} \\cdot d\\vec{S} = 0 \\) over a surface, then:",
  options: [
    "the magnitude of electric field on the surface is constant.",
    "all the charges must necessarily be inside the surface.",
    "the electric field inside the surface is necessarily uniform.",
    "the number of flux lines entering the surface must be equal to the number of flux lines leaving it."
  ],
  
  answer: 3,
},
{ 
  q: "An electric dipole is placed as shown in the figure. The electric potential (in 10² V) at point P due to the dipole is (ε₀ = permittivity of free space and \\(\\frac{1}{4\\pi\\varepsilon_0}=K\\)):",
  figure: "images/M1/Q12_1.png",
  options: [
    "(5/8) qK",
    "(8/5) qK",
    "(8/3) qK",
    "(3/8) qK"
  ],
  
  answer: 3,
},
{ 
  q: "Six charges +q, −q, +q, −q, +q, and −q are fixed at the corners of a hexagon of side d as shown in the figure. The work done in bringing a charge q₀ to the centre of the hexagon from infinity is (ε₀ = permittivity of free space).",
  
  figure: "images/M1/Q13_1.png",
  
  options: [
    "-(q²/(4π ε₀ d)) (6 − 1/√2)",
    "Zero",
    "-q²/(4π ε₀ d)",
    "-(q²/(4π ε₀ d)) (3 − 1/√2)"
  ],
  
  answer: 1,
},
{ 
  q: "Two hollow conducting spheres of radii \\(R_1 and R_2 (R_1 >> R_2) \\) have equal charges. The potential would be",
  
  options: [
    "More on bigger sphere",
    "More on smaller sphere",
    "Equal on both the spheres",
    "Dependent on the material property of the sphere"
  ],
  
  answer: 1,
},
{ 
  q: "Two point charges −q and +q are placed at a distance L, as shown in the figure. The magnitude of electric field intensity at a distance R (R >> L) varies as:",
  figure: "images/M1/Q15_1.png",
  options: [
    "\\(1/R^2\\)",
    "\\(1/R^3\\)",
    "\\(1/R^4\\)",
    "\\(1/R^6\\)"
  ],
  
  answer: 1,
},
{ 
  q: "Polar molecules are the molecules:",
  
  options: [
    "having a permanent electric dipole moment",
    "having zero dipole moment",
    "acquire a dipole moment only in the presence of electric field due to displacement of charges",
    "acquire a dipole moment only when magnetic field is absent"
  ],
  
  answer: 0,
},
{ 
  q: "A dipole is placed in an electric field as shown. In which direction will it move?",
  
      figure: "images/M1/Q17_1.png",
  
  options: [
    "towards the right as its potential energy will increase.",
    "towards the left as its potential energy will increase.",
    "towards the right as its potential energy will decrease.",
    "towards the left as its potential energy will decrease."
  ],
  
  answer: 2,
},
{ 
  q: "Two charged spherical conductors of radius \\( R_1 \\) and \\( R_2 \\) are connected by a wire. Then the ratio of surface charge densities of the spheres (\\( \\sigma_1 / \\sigma_2 \\)) is:",
  figure: "images/M1/Q18_1.png",
  options: [
    "\\( \\frac{R_1^2}{R_2^2} \\)",
    "\\( \\frac{R_1}{R_2} \\)",
    "\\( \\frac{R_2}{R_1} \\)",
    "\\( \\sqrt{\\frac{R_1}{R_2}} \\)"
  ],
  
  answer: 2,
},
{ 
  q: "A short electric dipole has a dipole moment of 16 × 10⁻⁹ Cm. The electric potential due to the dipole at a point at a distance of 0.6 m from the centre of the dipole, situated on a line making an angle of 60° with the dipole axis is ( \\( \\frac{1}{4\\pi\\varepsilon_0} = 9 × 10^9 \\text{ Nm}^2/\\text{C}^2 \\) ):",
  

  options: [
    "200 V",
    "400 V",
    "zero",
    "50 V"
  ],
  
  answer: 0,
},
{ 
  q: "In a certain region of space with volume 0.2 m³, the electric potential is found to be 5 V throughout. The magnitude of electric field in this region is:",
  
  
  options: [
    "0.5 N/C",
    "1 N/C",
    "5 N/C",
    "zero"
  ],
  
  answer: 3,

}

    
];


