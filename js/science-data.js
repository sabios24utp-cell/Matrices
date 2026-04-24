/* ═══════════════════════════════════════════════════════════════════════════════════════════════════
   🔬 FÍSICA INTERACTIVA - BASES DE DATOS CIENTÍFICAS
   ═══════════════════════════════════════════════════════════════════════════════════════════════════
   📚 Este archivo contiene todas las tablas de referencia científica
   🎓 Autor: Msc. Néstor Fabio Montoya Palacios
   ═══════════════════════════════════════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════════════════
   🌡️ PROPIEDADES DE MATERIALES
   ═══════════════════════════════════════════════════════════════════════════ */
const MATERIALS_DB = [
    // METALES
    { cat: "Metales", n: "Aluminio", sym: "Al", density: 2700, specificHeat: 897, meltingPoint: 660, boilingPoint: 2519, hardness: "2.75", youngModulus: 70 },
    { cat: "Metales", n: "Cobre", sym: "Cu", density: 8960, specificHeat: 385, meltingPoint: 1085, boilingPoint: 2562, hardness: "3.0", youngModulus: 130 },
    { cat: "Metales", n: "Hierro", sym: "Fe", density: 7874, specificHeat: 449, meltingPoint: 1538, boilingPoint: 2861, hardness: "4.0", youngModulus: 211 },
    { cat: "Metales", n: "Oro", sym: "Au", density: 19300, specificHeat: 129, meltingPoint: 1064, boilingPoint: 2856, hardness: "2.5", youngModulus: 78 },
    { cat: "Metales", n: "Plata", sym: "Ag", density: 10500, specificHeat: 235, meltingPoint: 962, boilingPoint: 2162, hardness: "2.5", youngModulus: 83 },
    { cat: "Metales", n: "Plomo", sym: "Pb", density: 11340, specificHeat: 129, meltingPoint: 327, boilingPoint: 1749, hardness: "1.5", youngModulus: 16 },
    { cat: "Metales", n: "Acero", sym: "Fe-C", density: 7850, specificHeat: 502, meltingPoint: 1510, boilingPoint: 2750, hardness: "4-8", youngModulus: 200 },
    { cat: "Metales", n: "Titanio", sym: "Ti", density: 4540, specificHeat: 523, meltingPoint: 1668, boilingPoint: 3287, hardness: "6.0", youngModulus: 116 },
    { cat: "Metales", n: "Zinc", sym: "Zn", density: 7140, specificHeat: 388, meltingPoint: 420, boilingPoint: 907, hardness: "2.5", youngModulus: 108 },
    { cat: "Metales", n: "Tungsteno", sym: "W", density: 19250, specificHeat: 132, meltingPoint: 3422, boilingPoint: 5555, hardness: "7.5", youngModulus: 411 },
    // NO METALES Y OTROS
    { cat: "No Metales", n: "Agua (líquida)", sym: "H₂O", density: 1000, specificHeat: 4186, meltingPoint: 0, boilingPoint: 100, hardness: "-", youngModulus: "-" },
    { cat: "No Metales", n: "Hielo", sym: "H₂O", density: 917, specificHeat: 2090, meltingPoint: 0, boilingPoint: 100, hardness: "1.5", youngModulus: 9 },
    { cat: "No Metales", n: "Vidrio", sym: "-", density: 2500, specificHeat: 840, meltingPoint: 1400, boilingPoint: "-", hardness: "5.5", youngModulus: 70 },
    { cat: "No Metales", n: "Madera (roble)", sym: "-", density: 750, specificHeat: 2400, meltingPoint: "-", boilingPoint: "-", hardness: "3.5", youngModulus: 12 },
    { cat: "No Metales", n: "Concreto", sym: "-", density: 2400, specificHeat: 880, meltingPoint: "-", boilingPoint: "-", hardness: "3-7", youngModulus: 30 },
    { cat: "No Metales", n: "Caucho", sym: "-", density: 1100, specificHeat: 2010, meltingPoint: "-", boilingPoint: "-", hardness: "-", youngModulus: 0.01 },
    // GASES (a condiciones estándar)
    { cat: "Gases", n: "Aire", sym: "-", density: 1.225, specificHeat: 1005, meltingPoint: "-", boilingPoint: "-", hardness: "-", youngModulus: "-" },
    { cat: "Gases", n: "Oxígeno", sym: "O₂", density: 1.429, specificHeat: 918, meltingPoint: -219, boilingPoint: -183, hardness: "-", youngModulus: "-" },
    { cat: "Gases", n: "Nitrógeno", sym: "N₂", density: 1.251, specificHeat: 1040, meltingPoint: -210, boilingPoint: -196, hardness: "-", youngModulus: "-" },
    { cat: "Gases", n: "Hidrógeno", sym: "H₂", density: 0.0899, specificHeat: 14300, meltingPoint: -259, boilingPoint: -253, hardness: "-", youngModulus: "-" }
];


/* ═══════════════════════════════════════════════════════════════════════════
   🔺 IDENTIDADES TRIGONOMÉTRICAS (AMPLIADO)
   ═══════════════════════════════════════════════════════════════════════════ */
const TRIG_IDENTITIES = {
    fundamental: [
        { name: "Pitágoras", formula: "\\sin^2\\theta + \\cos^2\\theta = 1" },
        { name: "Tangente", formula: "\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}" },
        { name: "Cotangente", formula: "\\cot\\theta = \\frac{\\cos\\theta}{\\sin\\theta}" },
        { name: "Secante", formula: "\\sec\\theta = \\frac{1}{\\cos\\theta}" },
        { name: "Cosecante", formula: "\\csc\\theta = \\frac{1}{\\sin\\theta}" },
        { name: "Sec² y Tan²", formula: "1 + \\tan^2\\theta = \\sec^2\\theta" },
        { name: "Csc² y Cot²", formula: "1 + \\cot^2\\theta = \\csc^2\\theta" },
        { name: "Tan × Cot", formula: "\\tan\\theta \\cdot \\cot\\theta = 1" },
        { name: "Sen × Csc", formula: "\\sin\\theta \\cdot \\csc\\theta = 1" },
        { name: "Cos × Sec", formula: "\\cos\\theta \\cdot \\sec\\theta = 1" }
    ],
    sumaDiferencia: [
        { name: "Sen(A+B)", formula: "\\sin(A+B) = \\sin A \\cos B + \\cos A \\sin B" },
        { name: "Sen(A-B)", formula: "\\sin(A-B) = \\sin A \\cos B - \\cos A \\sin B" },
        { name: "Cos(A+B)", formula: "\\cos(A+B) = \\cos A \\cos B - \\sin A \\sin B" },
        { name: "Cos(A-B)", formula: "\\cos(A-B) = \\cos A \\cos B + \\sin A \\sin B" },
        { name: "Tan(A+B)", formula: "\\tan(A+B) = \\frac{\\tan A + \\tan B}{1 - \\tan A \\tan B}" },
        { name: "Tan(A-B)", formula: "\\tan(A-B) = \\frac{\\tan A - \\tan B}{1 + \\tan A \\tan B}" },
        { name: "Cot(A+B)", formula: "\\cot(A+B) = \\frac{\\cot A \\cot B - 1}{\\cot B + \\cot A}" },
        { name: "Cot(A-B)", formula: "\\cot(A-B) = \\frac{\\cot A \\cot B + 1}{\\cot B - \\cot A}" }
    ],
    anguloDoble: [
        { name: "Sen(2θ)", formula: "\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta" },
        { name: "Cos(2θ) v1", formula: "\\cos(2\\theta) = \\cos^2\\theta - \\sin^2\\theta" },
        { name: "Cos(2θ) v2", formula: "\\cos(2\\theta) = 2\\cos^2\\theta - 1" },
        { name: "Cos(2θ) v3", formula: "\\cos(2\\theta) = 1 - 2\\sin^2\\theta" },
        { name: "Tan(2θ)", formula: "\\tan(2\\theta) = \\frac{2\\tan\\theta}{1-\\tan^2\\theta}" },
        { name: "Cot(2θ)", formula: "\\cot(2\\theta) = \\frac{\\cot^2\\theta - 1}{2\\cot\\theta}" },
        { name: "Sec(2θ)", formula: "\\sec(2\\theta) = \\frac{\\sec^2\\theta}{2 - \\sec^2\\theta}" },
        { name: "Csc(2θ)", formula: "\\csc(2\\theta) = \\frac{\\sec\\theta \\csc\\theta}{2}" }
    ],
    anguloTriple: [
        { name: "Sen(3θ)", formula: "\\sin(3\\theta) = 3\\sin\\theta - 4\\sin^3\\theta" },
        { name: "Cos(3θ)", formula: "\\cos(3\\theta) = 4\\cos^3\\theta - 3\\cos\\theta" },
        { name: "Tan(3θ)", formula: "\\tan(3\\theta) = \\frac{3\\tan\\theta - \\tan^3\\theta}{1 - 3\\tan^2\\theta}" }
    ],
    medioAngulo: [
        { name: "Sen(θ/2)", formula: "\\sin\\frac{\\theta}{2} = \\pm\\sqrt{\\frac{1-\\cos\\theta}{2}}" },
        { name: "Cos(θ/2)", formula: "\\cos\\frac{\\theta}{2} = \\pm\\sqrt{\\frac{1+\\cos\\theta}{2}}" },
        { name: "Tan(θ/2) v1", formula: "\\tan\\frac{\\theta}{2} = \\frac{1-\\cos\\theta}{\\sin\\theta}" },
        { name: "Tan(θ/2) v2", formula: "\\tan\\frac{\\theta}{2} = \\frac{\\sin\\theta}{1+\\cos\\theta}" },
        { name: "Tan(θ/2) v3", formula: "\\tan\\frac{\\theta}{2} = \\pm\\sqrt{\\frac{1-\\cos\\theta}{1+\\cos\\theta}}" }
    ],
    productoSuma: [
        { name: "Sen·Sen", formula: "\\sin A \\sin B = \\frac{1}{2}[\\cos(A-B) - \\cos(A+B)]" },
        { name: "Cos·Cos", formula: "\\cos A \\cos B = \\frac{1}{2}[\\cos(A-B) + \\cos(A+B)]" },
        { name: "Sen·Cos", formula: "\\sin A \\cos B = \\frac{1}{2}[\\sin(A+B) + \\sin(A-B)]" },
        { name: "Cos·Sen", formula: "\\cos A \\sin B = \\frac{1}{2}[\\sin(A+B) - \\sin(A-B)]" }
    ],
    sumaProducto: [
        { name: "Sen+Sen", formula: "\\sin A + \\sin B = 2\\sin\\frac{A+B}{2}\\cos\\frac{A-B}{2}" },
        { name: "Sen-Sen", formula: "\\sin A - \\sin B = 2\\cos\\frac{A+B}{2}\\sin\\frac{A-B}{2}" },
        { name: "Cos+Cos", formula: "\\cos A + \\cos B = 2\\cos\\frac{A+B}{2}\\cos\\frac{A-B}{2}" },
        { name: "Cos-Cos", formula: "\\cos A - \\cos B = -2\\sin\\frac{A+B}{2}\\sin\\frac{A-B}{2}" }
    ],
    cofunciones: [
        { name: "Sen y Cos", formula: "\\sin\\theta = \\cos(90° - \\theta)" },
        { name: "Cos y Sen", formula: "\\cos\\theta = \\sin(90° - \\theta)" },
        { name: "Tan y Cot", formula: "\\tan\\theta = \\cot(90° - \\theta)" },
        { name: "Cot y Tan", formula: "\\cot\\theta = \\tan(90° - \\theta)" },
        { name: "Sec y Csc", formula: "\\sec\\theta = \\csc(90° - \\theta)" },
        { name: "Csc y Sec", formula: "\\csc\\theta = \\sec(90° - \\theta)" }
    ],
    reduccion: [
        { name: "Sen(-θ)", formula: "\\sin(-\\theta) = -\\sin\\theta" },
        { name: "Cos(-θ)", formula: "\\cos(-\\theta) = \\cos\\theta" },
        { name: "Tan(-θ)", formula: "\\tan(-\\theta) = -\\tan\\theta" },
        { name: "Sen(π-θ)", formula: "\\sin(\\pi - \\theta) = \\sin\\theta" },
        { name: "Cos(π-θ)", formula: "\\cos(\\pi - \\theta) = -\\cos\\theta" },
        { name: "Sen(π+θ)", formula: "\\sin(\\pi + \\theta) = -\\sin\\theta" },
        { name: "Cos(π+θ)", formula: "\\cos(\\pi + \\theta) = -\\cos\\theta" }
    ],
    leyesSenoCoseno: [
        { name: "Ley del Seno", formula: "\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R" },
        { name: "Ley del Coseno", formula: "c^2 = a^2 + b^2 - 2ab\\cos C" },
        { name: "Ley de Tangentes", formula: "\\frac{a-b}{a+b} = \\frac{\\tan\\frac{A-B}{2}}{\\tan\\frac{A+B}{2}}" },
        { name: "Área triángulo", formula: "A = \\frac{1}{2}ab\\sin C" },
        { name: "Fórmula de Herón", formula: "A = \\sqrt{s(s-a)(s-b)(s-c)}" }
    ],
    valoresNotables: [
        { angle: "0°", sin: "0", cos: "1", tan: "0" },
        { angle: "30°", sin: "1/2", cos: "√3/2", tan: "√3/3" },
        { angle: "45°", sin: "√2/2", cos: "√2/2", tan: "1" },
        { angle: "60°", sin: "√3/2", cos: "1/2", tan: "√3" },
        { angle: "90°", sin: "1", cos: "0", tan: "∞" },
        { angle: "120°", sin: "√3/2", cos: "-1/2", tan: "-√3" },
        { angle: "135°", sin: "√2/2", cos: "-√2/2", tan: "-1" },
        { angle: "150°", sin: "1/2", cos: "-√3/2", tan: "-√3/3" },
        { angle: "180°", sin: "0", cos: "-1", tan: "0" },
        { angle: "270°", sin: "-1", cos: "0", tan: "∞" },
        { angle: "360°", sin: "0", cos: "1", tan: "0" }
    ]
};


/* ═══════════════════════════════════════════════════════════════════════════
   🌍 SISTEMA SOLAR - Planetas y Lunas
   ═══════════════════════════════════════════════════════════════════════════ */
const SOLAR_SYSTEM_DB = {
    planets: [
        { name: "Mercurio", symbol: "☿", mass: "3.30×10²³", radius: 2440, distSun: 57.9, orbitalPeriod: 88, rotationPeriod: 1407.6, moons: 0, gravity: 3.7, temp: 167, color: "#B5B5B5" },
        { name: "Venus", symbol: "♀", mass: "4.87×10²⁴", radius: 6052, distSun: 108.2, orbitalPeriod: 225, rotationPeriod: 5832.5, moons: 0, gravity: 8.9, temp: 464, color: "#E6C229" },
        { name: "Tierra", symbol: "⊕", mass: "5.97×10²⁴", radius: 6371, distSun: 149.6, orbitalPeriod: 365.25, rotationPeriod: 23.93, moons: 1, gravity: 9.8, temp: 15, color: "#6B93D6" },
        { name: "Marte", symbol: "♂", mass: "6.42×10²³", radius: 3390, distSun: 227.9, orbitalPeriod: 687, rotationPeriod: 24.62, moons: 2, gravity: 3.7, temp: -65, color: "#C1440E" },
        { name: "Júpiter", symbol: "♃", mass: "1.90×10²⁷", radius: 69911, distSun: 778.5, orbitalPeriod: 4333, rotationPeriod: 9.93, moons: 95, gravity: 24.8, temp: -110, color: "#D8CA9D" },
        { name: "Saturno", symbol: "♄", mass: "5.68×10²⁶", radius: 58232, distSun: 1432, orbitalPeriod: 10759, rotationPeriod: 10.66, moons: 146, gravity: 10.4, temp: -140, color: "#F4D59E" },
        { name: "Urano", symbol: "♅", mass: "8.68×10²⁵", radius: 25362, distSun: 2867, orbitalPeriod: 30687, rotationPeriod: 17.24, moons: 28, gravity: 8.9, temp: -195, color: "#D1E7E7" },
        { name: "Neptuno", symbol: "♆", mass: "1.02×10²⁶", radius: 24622, distSun: 4515, orbitalPeriod: 60190, rotationPeriod: 16.11, moons: 16, gravity: 11.2, temp: -200, color: "#5B5DDF" }
    ],
    moons: [
        { name: "Luna", planet: "Tierra", mass: "7.35×10²²", radius: 1737, distPlanet: 384400, orbitalPeriod: 27.3 },
        { name: "Fobos", planet: "Marte", mass: "1.07×10¹⁶", radius: 11.3, distPlanet: 9376, orbitalPeriod: 0.32 },
        { name: "Deimos", planet: "Marte", mass: "1.48×10¹⁵", radius: 6.2, distPlanet: 23460, orbitalPeriod: 1.26 },
        { name: "Ío", planet: "Júpiter", mass: "8.93×10²²", radius: 1822, distPlanet: 421800, orbitalPeriod: 1.77 },
        { name: "Europa", planet: "Júpiter", mass: "4.80×10²²", radius: 1561, distPlanet: 671100, orbitalPeriod: 3.55 },
        { name: "Ganímedes", planet: "Júpiter", mass: "1.48×10²³", radius: 2634, distPlanet: 1070400, orbitalPeriod: 7.15 },
        { name: "Calisto", planet: "Júpiter", mass: "1.08×10²³", radius: 2410, distPlanet: 1882700, orbitalPeriod: 16.69 },
        { name: "Titán", planet: "Saturno", mass: "1.35×10²³", radius: 2575, distPlanet: 1221870, orbitalPeriod: 15.95 },
        { name: "Encélado", planet: "Saturno", mass: "1.08×10²⁰", radius: 252, distPlanet: 238020, orbitalPeriod: 1.37 },
        { name: "Tritón", planet: "Neptuno", mass: "2.14×10²²", radius: 1353, distPlanet: 354759, orbitalPeriod: 5.88 }
    ],
    sun: { name: "Sol", symbol: "☉", mass: "1.99×10³⁰", radius: 696340, temp: 5500, luminosity: "3.83×10²⁶", age: "4.6×10⁹", spectralType: "G2V" }
};

/* ═══════════════════════════════════════════════════════════════════════════
   ⚛️ PARTÍCULAS SUBATÓMICAS
   ═══════════════════════════════════════════════════════════════════════════ */
const PARTICLES_DB = [
    // Leptones
    { cat: "Leptones", name: "Electrón", symbol: "e⁻", mass: "9.109×10⁻³¹", charge: "-1", spin: "1/2", antiparticle: "Positrón" },
    { cat: "Leptones", name: "Positrón", symbol: "e⁺", mass: "9.109×10⁻³¹", charge: "+1", spin: "1/2", antiparticle: "Electrón" },
    { cat: "Leptones", name: "Muón", symbol: "μ⁻", mass: "1.88×10⁻²⁸", charge: "-1", spin: "1/2", antiparticle: "Antimuón" },
    { cat: "Leptones", name: "Tau", symbol: "τ⁻", mass: "3.17×10⁻²⁷", charge: "-1", spin: "1/2", antiparticle: "Antitau" },
    { cat: "Leptones", name: "Neutrino electrónico", symbol: "νₑ", mass: "< 2.2 eV", charge: "0", spin: "1/2", antiparticle: "Antineutrino" },
    // Hadrones - Bariones
    { cat: "Bariones", name: "Protón", symbol: "p⁺", mass: "1.673×10⁻²⁷", charge: "+1", spin: "1/2", antiparticle: "Antiprotón" },
    { cat: "Bariones", name: "Neutrón", symbol: "n⁰", mass: "1.675×10⁻²⁷", charge: "0", spin: "1/2", antiparticle: "Antineutrón" },
    // Quarks
    { cat: "Quarks", name: "Up", symbol: "u", mass: "2.2 MeV/c²", charge: "+2/3", spin: "1/2", antiparticle: "Anti-up" },
    { cat: "Quarks", name: "Down", symbol: "d", mass: "4.7 MeV/c²", charge: "-1/3", spin: "1/2", antiparticle: "Anti-down" },
    { cat: "Quarks", name: "Charm", symbol: "c", mass: "1.28 GeV/c²", charge: "+2/3", spin: "1/2", antiparticle: "Anti-charm" },
    { cat: "Quarks", name: "Strange", symbol: "s", mass: "96 MeV/c²", charge: "-1/3", spin: "1/2", antiparticle: "Anti-strange" },
    { cat: "Quarks", name: "Top", symbol: "t", mass: "173 GeV/c²", charge: "+2/3", spin: "1/2", antiparticle: "Anti-top" },
    { cat: "Quarks", name: "Bottom", symbol: "b", mass: "4.18 GeV/c²", charge: "-1/3", spin: "1/2", antiparticle: "Anti-bottom" },
    // Bosones
    { cat: "Bosones", name: "Fotón", symbol: "γ", mass: "0", charge: "0", spin: "1", antiparticle: "Sí mismo" },
    { cat: "Bosones", name: "Gluón", symbol: "g", mass: "0", charge: "0", spin: "1", antiparticle: "Sí mismo" },
    { cat: "Bosones", name: "W⁺", symbol: "W⁺", mass: "80.4 GeV/c²", charge: "+1", spin: "1", antiparticle: "W⁻" },
    { cat: "Bosones", name: "W⁻", symbol: "W⁻", mass: "80.4 GeV/c²", charge: "-1", spin: "1", antiparticle: "W⁺" },
    { cat: "Bosones", name: "Z⁰", symbol: "Z⁰", mass: "91.2 GeV/c²", charge: "0", spin: "1", antiparticle: "Sí mismo" },
    { cat: "Bosones", name: "Bosón de Higgs", symbol: "H⁰", mass: "125 GeV/c²", charge: "0", spin: "0", antiparticle: "Sí mismo" }
];

/* ═══════════════════════════════════════════════════════════════════════════
   🎨 ESPECTRO ELECTROMAGNÉTICO
   ═══════════════════════════════════════════════════════════════════════════ */
const EM_SPECTRUM = [
    { name: "Ondas de Radio", freqMin: "3 Hz", freqMax: "300 GHz", lambdaMin: "1 mm", lambdaMax: "100 km", energy: "< 1.24 meV", applications: "Radio, TV, comunicaciones, radar", color: "#8B4513" },
    { name: "Microondas", freqMin: "300 MHz", freqMax: "300 GHz", lambdaMin: "1 mm", lambdaMax: "1 m", energy: "1.24 μeV - 1.24 meV", applications: "Hornos, WiFi, Bluetooth, satélites", color: "#CD853F" },
    { name: "Infrarrojo", freqMin: "300 GHz", freqMax: "400 THz", lambdaMin: "700 nm", lambdaMax: "1 mm", energy: "1.24 meV - 1.7 eV", applications: "Control remoto, visión nocturna, calentamiento", color: "#DC143C" },
    { name: "Luz Visible", freqMin: "400 THz", freqMax: "800 THz", lambdaMin: "380 nm", lambdaMax: "700 nm", energy: "1.7 - 3.3 eV", applications: "Visión humana, fotografía, iluminación", color: "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)" },
    { name: "Ultravioleta", freqMin: "800 THz", freqMax: "30 PHz", lambdaMin: "10 nm", lambdaMax: "380 nm", energy: "3.3 - 124 eV", applications: "Esterilización, bronceado, detección de billetes", color: "#9400D3" },
    { name: "Rayos X", freqMin: "30 PHz", freqMax: "30 EHz", lambdaMin: "0.01 nm", lambdaMax: "10 nm", energy: "124 eV - 124 keV", applications: "Radiografías, tomografías, seguridad", color: "#4169E1" },
    { name: "Rayos Gamma", freqMin: "> 30 EHz", freqMax: "∞", lambdaMin: "0", lambdaMax: "0.01 nm", energy: "> 124 keV", applications: "Radioterapia, esterilización, astronomía gamma", color: "#000080" }
];

const VISIBLE_SPECTRUM = [
    { color: "Rojo", lambdaMin: 620, lambdaMax: 700, freq: "430-480 THz", hex: "#FF0000" },
    { color: "Naranja", lambdaMin: 590, lambdaMax: 620, freq: "480-510 THz", hex: "#FF7F00" },
    { color: "Amarillo", lambdaMin: 570, lambdaMax: 590, freq: "510-530 THz", hex: "#FFFF00" },
    { color: "Verde", lambdaMin: 495, lambdaMax: 570, freq: "530-600 THz", hex: "#00FF00" },
    { color: "Azul", lambdaMin: 450, lambdaMax: 495, freq: "600-670 THz", hex: "#0000FF" },
    { color: "Violeta", lambdaMin: 380, lambdaMax: 450, freq: "670-790 THz", hex: "#8B00FF" }
];

const EMISSION_SPECTRA = [
    { element: "Hidrógeno", symbol: "H", lines: [410.2, 434.0, 486.1, 656.3], colors: ["#7600BC", "#3C14DC", "#00BFFF", "#FF0000"], series: "Balmer" },
    { element: "Helio", symbol: "He", lines: [447.1, 501.6, 587.6, 667.8], colors: ["#4400FF", "#00FF7F", "#FFD700", "#FF4500"], series: "Visible" },
    { element: "Mercurio", symbol: "Hg", lines: [404.7, 435.8, 546.1, 577.0, 579.1], colors: ["#7B00FF", "#5500FF", "#54FF00", "#FFFF00", "#FFE600"], series: "Visible" },
    { element: "Sodio", symbol: "Na", lines: [589.0, 589.6], colors: ["#FFD700", "#FFC700"], series: "D-lines" },
    { element: "Neón", symbol: "Ne", lines: [585.2, 588.2, 603.0, 607.4, 616.4, 621.7, 626.6, 633.4, 638.3, 640.2], colors: ["#FF6600", "#FF5500", "#FF4400", "#FF3300", "#FF2200", "#FF1100", "#FF0000", "#EE0000", "#DD0000", "#CC0000"], series: "Visible" }
];

/* ═══════════════════════════════════════════════════════════════════════════
   📐 MANUAL DE FÓRMULAS DE FÍSICA (AMPLIADO - Por categorías)
   ═══════════════════════════════════════════════════════════════════════════ */
const PHYSICS_FORMULAS = {
    mru: {
        title: "🚗 MRU",
        formulas: [
            { name: "Velocidad", formula: "v = \\frac{\\Delta x}{\\Delta t}", vars: "v: velocidad, Δx: desplazamiento, Δt: tiempo" },
            { name: "Posición", formula: "x = x_0 + vt", vars: "x₀: posición inicial, v: velocidad constante" },
            { name: "Desplazamiento", formula: "\\Delta x = vt", vars: "Distancia recorrida" },
            { name: "Velocidad media", formula: "v_m = \\frac{x_f - x_i}{t_f - t_i}", vars: "Velocidad promedio" }
        ]
    },
    mrua: {
        title: "🚀 MRUA",
        formulas: [
            { name: "Velocidad final", formula: "v = v_0 + at", vars: "v₀: velocidad inicial, a: aceleración" },
            { name: "Posición", formula: "x = x_0 + v_0t + \\frac{1}{2}at^2", vars: "Ecuación horaria" },
            { name: "Velocidad²", formula: "v^2 = v_0^2 + 2a\\Delta x", vars: "Sin tiempo" },
            { name: "Desplazamiento", formula: "\\Delta x = v_0t + \\frac{1}{2}at^2", vars: "Distancia" },
            { name: "Velocidad media", formula: "v_m = \\frac{v_0 + v}{2}", vars: "Promedio de velocidades" },
            { name: "Aceleración", formula: "a = \\frac{\\Delta v}{\\Delta t} = \\frac{v - v_0}{t}", vars: "Cambio de velocidad" }
        ]
    },
    vertical: {
        title: "⬇️ Mov. Vertical",
        formulas: [
            { name: "Caída libre (h)", formula: "h = \\frac{1}{2}gt^2", vars: "g = 9.8 m/s² (Tierra)" },
            { name: "Velocidad caída", formula: "v = gt", vars: "Desde reposo" },
            { name: "Velocidad² caída", formula: "v^2 = 2gh", vars: "Sin tiempo" },
            { name: "Tiempo de caída", formula: "t = \\sqrt{\\frac{2h}{g}}", vars: "Desde altura h" },
            { name: "Lanzamiento vertical", formula: "h = v_0t - \\frac{1}{2}gt^2", vars: "Hacia arriba" },
            { name: "Altura máxima", formula: "h_{max} = \\frac{v_0^2}{2g}", vars: "Punto más alto" },
            { name: "Tiempo subida", formula: "t_s = \\frac{v_0}{g}", vars: "Hasta detenerse" }
        ]
    },
    parabolico: {
        title: "🏀 Mov. Parabólico",
        formulas: [
            { name: "Componente x vel.", formula: "v_x = v_0\\cos\\theta", vars: "Constante" },
            { name: "Componente y vel.", formula: "v_y = v_0\\sin\\theta - gt", vars: "Variable" },
            { name: "Posición x", formula: "x = v_0\\cos\\theta \\cdot t", vars: "Horizontal" },
            { name: "Posición y", formula: "y = v_0\\sin\\theta \\cdot t - \\frac{1}{2}gt^2", vars: "Vertical" },
            { name: "Alcance máximo", formula: "R = \\frac{v_0^2\\sin(2\\theta)}{g}", vars: "θ=45° máximo" },
            { name: "Altura máxima", formula: "h_{max} = \\frac{v_0^2\\sin^2\\theta}{2g}", vars: "Punto más alto" },
            { name: "Tiempo de vuelo", formula: "T = \\frac{2v_0\\sin\\theta}{g}", vars: "Ida y vuelta" },
            { name: "Ecuación trayectoria", formula: "y = x\\tan\\theta - \\frac{gx^2}{2v_0^2\\cos^2\\theta}", vars: "Parábola" }
        ]
    },
    mcu: {
        title: "🔄 MCU",
        formulas: [
            { name: "Velocidad angular", formula: "\\omega = \\frac{\\Delta\\theta}{\\Delta t}", vars: "rad/s" },
            { name: "Velocidad tangencial", formula: "v = \\omega r", vars: "m/s" },
            { name: "Período", formula: "T = \\frac{2\\pi}{\\omega} = \\frac{2\\pi r}{v}", vars: "Tiempo 1 vuelta" },
            { name: "Frecuencia", formula: "f = \\frac{1}{T} = \\frac{\\omega}{2\\pi}", vars: "Hz" },
            { name: "Aceleración centrípeta", formula: "a_c = \\frac{v^2}{r} = \\omega^2 r", vars: "Hacia el centro" },
            { name: "Vel. angular y freq.", formula: "\\omega = 2\\pi f", vars: "Relación" },
            { name: "Arco recorrido", formula: "s = \\theta r", vars: "θ en radianes" }
        ]
    },
    dinamica: {
        title: "🍎 Dinámica",
        formulas: [
            { name: "Primera Ley Newton", formula: "\\sum\\vec{F} = 0 \\Rightarrow \\vec{v} = \\text{cte}", vars: "Inercia" },
            { name: "Segunda Ley Newton", formula: "\\vec{F} = m\\vec{a}", vars: "F: fuerza neta" },
            { name: "Tercera Ley Newton", formula: "\\vec{F}_{12} = -\\vec{F}_{21}", vars: "Acción-reacción" },
            { name: "Peso", formula: "W = mg", vars: "g = 9.8 m/s²" },
            { name: "Normal (horizontal)", formula: "N = mg", vars: "Superficie horizontal" },
            { name: "Normal (inclinado)", formula: "N = mg\\cos\\theta", vars: "Plano inclinado" },
            { name: "Fuerza en inclinado", formula: "F_{\\parallel} = mg\\sin\\theta", vars: "Componente paralela" },
            { name: "Fricción estática", formula: "f_s \\leq \\mu_s N", vars: "Máxima: f = μₛN" },
            { name: "Fricción cinética", formula: "f_k = \\mu_k N", vars: "En movimiento" },
            { name: "Fuerza centrípeta", formula: "F_c = \\frac{mv^2}{r} = m\\omega^2 r", vars: "MCU" },
            { name: "Ley de Hooke", formula: "F = -kx", vars: "k: constante elástica" }
        ]
    },
    gravitacion: {
        title: "🌍 Gravitación",
        formulas: [
            { name: "Ley de Gravitación", formula: "F = G\\frac{m_1 m_2}{r^2}", vars: "G = 6.67×10⁻¹¹ N·m²/kg²" },
            { name: "Campo gravitacional", formula: "g = \\frac{GM}{r^2}", vars: "En superficie: g = 9.8 m/s²" },
            { name: "Primera Ley Kepler", formula: "\\text{Órbitas elípticas}", vars: "Sol en un foco" },
            { name: "Segunda Ley Kepler", formula: "\\frac{dA}{dt} = \\text{cte}", vars: "Áreas iguales" },
            { name: "Tercera Ley Kepler", formula: "\\frac{T^2}{r^3} = \\frac{4\\pi^2}{GM}", vars: "T²/r³ = constante" },
            { name: "Velocidad orbital", formula: "v = \\sqrt{\\frac{GM}{r}}", vars: "Órbita circular" },
            { name: "Período orbital", formula: "T = 2\\pi\\sqrt{\\frac{r^3}{GM}}", vars: "De Kepler" },
            { name: "Velocidad de escape", formula: "v_e = \\sqrt{\\frac{2GM}{R}}", vars: "Escape gravitacional" },
            { name: "Energía potencial grav.", formula: "U = -\\frac{GMm}{r}", vars: "Negativa" },
            { name: "Energía orbital total", formula: "E = -\\frac{GMm}{2r}", vars: "Cinética + Potencial" }
        ]
    },
    energia: {
        title: "⚡ Trabajo y Energía",
        formulas: [
            { name: "Trabajo", formula: "W = Fd\\cos\\theta", vars: "F·d·cos(ángulo)" },
            { name: "Trabajo (integral)", formula: "W = \\int \\vec{F} \\cdot d\\vec{r}", vars: "Fuerza variable" },
            { name: "Energía cinética", formula: "E_k = \\frac{1}{2}mv^2", vars: "Energía de movimiento" },
            { name: "E. potencial grav.", formula: "E_p = mgh", vars: "Cerca de superficie" },
            { name: "E. potencial elástica", formula: "E_p = \\frac{1}{2}kx^2", vars: "Resorte" },
            { name: "Teorema W-E", formula: "W_{neto} = \\Delta E_k", vars: "Trabajo = cambio Ek" },
            { name: "Conservación E", formula: "E_{k1} + E_{p1} = E_{k2} + E_{p2}", vars: "Sistema conservativo" },
            { name: "Potencia", formula: "P = \\frac{W}{t} = \\vec{F} \\cdot \\vec{v}", vars: "Watts (J/s)" },
            { name: "Potencia media", formula: "P_m = \\frac{\\Delta E}{\\Delta t}", vars: "Promedio" },
            { name: "Eficiencia", formula: "\\eta = \\frac{W_{útil}}{W_{total}} \\times 100\\%", vars: "Porcentaje" }
        ]
    },
    momentum: {
        title: "💥 Momentum e Impulso",
        formulas: [
            { name: "Momentum lineal", formula: "\\vec{p} = m\\vec{v}", vars: "Cantidad de movimiento" },
            { name: "Impulso", formula: "\\vec{J} = \\vec{F}\\Delta t", vars: "Cambio de momentum" },
            { name: "Teorema Impulso", formula: "\\vec{J} = \\Delta\\vec{p} = m\\Delta\\vec{v}", vars: "Impulso = Δp" },
            { name: "Conservación p", formula: "\\vec{p}_{antes} = \\vec{p}_{después}", vars: "Sistema aislado" },
            { name: "Colisión elástica", formula: "v_1' = \\frac{m_1-m_2}{m_1+m_2}v_1", vars: "Se conserva Ek" },
            { name: "Colisión inelástica", formula: "m_1v_1 + m_2v_2 = (m_1+m_2)v'", vars: "Se unen" },
            { name: "Coef. restitución", formula: "e = \\frac{v_2' - v_1'}{v_1 - v_2}", vars: "0≤e≤1" }
        ]
    },
    rotacion: {
        title: "🔄 Rotación",
        formulas: [
            { name: "Torque", formula: "\\tau = rF\\sin\\theta = r_{\\perp}F", vars: "Momento de fuerza" },
            { name: "Torque (cruz)", formula: "\\vec{\\tau} = \\vec{r} \\times \\vec{F}", vars: "Producto cruz" },
            { name: "Segunda Ley rotación", formula: "\\tau = I\\alpha", vars: "I: momento de inercia" },
            { name: "Momento inercia", formula: "I = \\sum m_i r_i^2", vars: "Partículas discretas" },
            { name: "I disco sólido", formula: "I = \\frac{1}{2}MR^2", vars: "Eje central" },
            { name: "I esfera sólida", formula: "I = \\frac{2}{5}MR^2", vars: "Eje diametral" },
            { name: "I barra (centro)", formula: "I = \\frac{1}{12}ML^2", vars: "Eje en centro" },
            { name: "I barra (extremo)", formula: "I = \\frac{1}{3}ML^2", vars: "Eje en extremo" },
            { name: "I aro", formula: "I = MR^2", vars: "Todos los puntos en R" },
            { name: "Teorema Steiner", formula: "I = I_{cm} + Md^2", vars: "Ejes paralelos" },
            { name: "Ley de palancas", formula: "F_1 d_1 = F_2 d_2", vars: "Equilibrio" },
            { name: "Momento angular", formula: "L = I\\omega", vars: "Rotación" },
            { name: "Centro de masa", formula: "x_{cm} = \\frac{\\sum m_i x_i}{\\sum m_i}", vars: "Posición CM" }
        ]
    },
    poleas: {
        title: "⚙️ Poleas y Máquinas",
        formulas: [
            { name: "Polea fija", formula: "F = W", vars: "Solo cambia dirección" },
            { name: "Polea móvil", formula: "F = \\frac{W}{2}", vars: "Ventaja mecánica 2" },
            { name: "Aparejo potencial", formula: "F = \\frac{W}{2^n}", vars: "n: poleas móviles" },
            { name: "Aparejo factorial", formula: "F = \\frac{W}{n}", vars: "n: número de cuerdas" },
            { name: "Plano inclinado", formula: "VM = \\frac{L}{h}", vars: "Ventaja mecánica ideal" },
            { name: "Tornillo", formula: "VM = \\frac{2\\pi r}{p}", vars: "p: paso del tornillo" },
            { name: "Cuña", formula: "VM = \\frac{L}{t}", vars: "L: largo, t: espesor" }
        ]
    },
    mas: {
        title: "〰️ MAS",
        formulas: [
            { name: "Elongación", formula: "x = A\\cos(\\omega t + \\phi)", vars: "A: amplitud, φ: fase" },
            { name: "Velocidad MAS", formula: "v = -A\\omega\\sin(\\omega t + \\phi)", vars: "Derivada de x" },
            { name: "Aceleración MAS", formula: "a = -A\\omega^2\\cos(\\omega t + \\phi)", vars: "a = -ω²x" },
            { name: "Velocidad máxima", formula: "v_{max} = A\\omega", vars: "En x = 0" },
            { name: "Aceleración máxima", formula: "a_{max} = A\\omega^2", vars: "En x = ±A" },
            { name: "Período resorte", formula: "T = 2\\pi\\sqrt{\\frac{m}{k}}", vars: "Masa-resorte" },
            { name: "Período péndulo", formula: "T = 2\\pi\\sqrt{\\frac{L}{g}}", vars: "Péndulo simple" },
            { name: "Frecuencia angular", formula: "\\omega = \\sqrt{\\frac{k}{m}}", vars: "Resorte" },
            { name: "Energía MAS", formula: "E = \\frac{1}{2}kA^2", vars: "E total constante" }
        ]
    },
    ondas: {
        title: "🌊 Ondas",
        formulas: [
            { name: "Velocidad de onda", formula: "v = f\\lambda", vars: "f: frecuencia, λ: long. onda" },
            { name: "Período", formula: "T = \\frac{1}{f}", vars: "Tiempo de un ciclo" },
            { name: "Onda en cuerda", formula: "v = \\sqrt{\\frac{T}{\\mu}}", vars: "T: tensión, μ: densidad lineal" },
            { name: "Ecuación de onda", formula: "y = A\\sin(kx - \\omega t)", vars: "k = 2π/λ, ω = 2πf" },
            { name: "Velocidad sonido aire", formula: "v = 331 + 0.6T", vars: "T en °C" },
            { name: "Intensidad onda", formula: "I = \\frac{P}{4\\pi r^2}", vars: "Onda esférica" },
            { name: "Nivel intensidad", formula: "\\beta = 10\\log\\frac{I}{I_0}", vars: "I₀ = 10⁻¹² W/m², β en dB" },
            { name: "Efecto Doppler", formula: "f' = f\\frac{v \\pm v_o}{v \\mp v_s}", vars: "Movimiento relativo" },
            { name: "Ondas estacionarias", formula: "L = n\\frac{\\lambda}{2}", vars: "Cuerda fija-fija" },
            { name: "Tubo abierto", formula: "f_n = n\\frac{v}{2L}", vars: "n = 1,2,3..." },
            { name: "Tubo cerrado", formula: "f_n = n\\frac{v}{4L}", vars: "n = 1,3,5... (impares)" }
        ]
    },
    termo: {
        title: "🌡️ Termodinámica",
        formulas: [
            { name: "Celsius-Kelvin", formula: "K = °C + 273.15", vars: "Escalas" },
            { name: "Celsius-Fahrenheit", formula: "°F = \\frac{9}{5}°C + 32", vars: "Conversión" },
            { name: "Calor específico", formula: "Q = mc\\Delta T", vars: "c: calor específico" },
            { name: "Calor latente", formula: "Q = mL", vars: "L: calor latente" },
            { name: "Equilibrio térmico", formula: "Q_{cedido} + Q_{absorbido} = 0", vars: "Calorimetría" },
            { name: "Dilatación lineal", formula: "\\Delta L = \\alpha L_0 \\Delta T", vars: "α: coef. dilatación" },
            { name: "Dilatación volumen", formula: "\\Delta V = \\beta V_0 \\Delta T", vars: "β ≈ 3α" },
            { name: "Ley gases ideales", formula: "PV = nRT", vars: "R = 8.314 J/(mol·K)" },
            { name: "Proceso isotérmico", formula: "P_1V_1 = P_2V_2", vars: "T = constante" },
            { name: "Proceso isobárico", formula: "\\frac{V_1}{T_1} = \\frac{V_2}{T_2}", vars: "P = constante" },
            { name: "Proceso isocórico", formula: "\\frac{P_1}{T_1} = \\frac{P_2}{T_2}", vars: "V = constante" },
            { name: "Primera Ley", formula: "\\Delta U = Q - W", vars: "Q: calor, W: trabajo" },
            { name: "Trabajo en gas", formula: "W = P\\Delta V", vars: "Proceso isobárico" },
            { name: "Eficiencia Carnot", formula: "\\eta = 1 - \\frac{T_c}{T_h}", vars: "Máxima eficiencia" },
            { name: "Conducción", formula: "\\frac{Q}{t} = kA\\frac{\\Delta T}{L}", vars: "k: conductividad" }
        ]
    },
    optica: {
        title: "🔭 Óptica",
        formulas: [
            { name: "Velocidad luz", formula: "c = 3 \\times 10^8 \\text{ m/s}", vars: "En el vacío" },
            { name: "Ley de Snell", formula: "n_1\\sin\\theta_1 = n_2\\sin\\theta_2", vars: "Refracción" },
            { name: "Índice refracción", formula: "n = \\frac{c}{v}", vars: "v: velocidad en medio" },
            { name: "Ángulo crítico", formula: "\\sin\\theta_c = \\frac{n_2}{n_1}", vars: "Reflexión total" },
            { name: "Ec. espejo/lente", formula: "\\frac{1}{f} = \\frac{1}{p} + \\frac{1}{q}", vars: "p: objeto, q: imagen" },
            { name: "Magnificación", formula: "M = -\\frac{q}{p} = \\frac{h_i}{h_o}", vars: "Aumento" },
            { name: "Potencia lente", formula: "P = \\frac{1}{f}", vars: "Dioptrías (m⁻¹)" },
            { name: "Espejo cóncavo", formula: "f = \\frac{R}{2}", vars: "f positivo" },
            { name: "Espejo convexo", formula: "f = -\\frac{R}{2}", vars: "f negativo" },
            { name: "Lente convergente", formula: "f > 0", vars: "Foco real" },
            { name: "Lente divergente", formula: "f < 0", vars: "Foco virtual" },
            { name: "Interf. constructiva", formula: "\\delta = m\\lambda", vars: "m = 0,1,2,..." },
            { name: "Interf. destructiva", formula: "\\delta = (m+\\frac{1}{2})\\lambda", vars: "Mínimos" },
            { name: "Young (máximos)", formula: "d\\sin\\theta = m\\lambda", vars: "Doble rendija" },
            { name: "Difracción rendija", formula: "a\\sin\\theta = m\\lambda", vars: "Mínimos" },
            { name: "Red de difracción", formula: "d\\sin\\theta = m\\lambda", vars: "Máximos principales" },
            { name: "Abertura circular", formula: "\\sin\\theta = 1.22\\frac{\\lambda}{D}", vars: "Primer mínimo" }
        ]
    },
    electricidad: {
        title: "⚡ Electricidad",
        formulas: [
            { name: "Ley de Coulomb", formula: "F = k\\frac{|q_1 q_2|}{r^2}", vars: "k = 8.99×10⁹ N·m²/C²" },
            { name: "Campo eléctrico", formula: "E = \\frac{F}{q} = k\\frac{Q}{r^2}", vars: "N/C o V/m" },
            { name: "Ley de Gauss", formula: "\\oint \\vec{E} \\cdot d\\vec{A} = \\frac{Q_{enc}}{\\varepsilon_0}", vars: "Flujo eléctrico" },
            { name: "Potencial eléctrico", formula: "V = k\\frac{Q}{r}", vars: "Voltios (J/C)" },
            { name: "Energía potencial", formula: "U = k\\frac{q_1 q_2}{r} = qV", vars: "Julios" },
            { name: "Trabajo campo", formula: "W = q(V_A - V_B)", vars: "Trabajo conservativo" },
            { name: "Ley de Ohm", formula: "V = IR", vars: "V: voltaje, I: corriente" },
            { name: "Resistividad", formula: "R = \\rho\\frac{L}{A}", vars: "ρ: resistividad" },
            { name: "Potencia eléctrica", formula: "P = IV = I^2R = \\frac{V^2}{R}", vars: "Watts" },
            { name: "Resistencias serie", formula: "R_T = R_1 + R_2 + ...", vars: "Sumas" },
            { name: "Resistencias paralelo", formula: "\\frac{1}{R_T} = \\frac{1}{R_1} + \\frac{1}{R_2} + ...", vars: "Inversos" },
            { name: "Kirchhoff (nodos)", formula: "\\sum I_{entrante} = \\sum I_{saliente}", vars: "Conservación carga" },
            { name: "Kirchhoff (mallas)", formula: "\\sum V = 0", vars: "Suma de voltajes" },
            { name: "Capacitancia", formula: "C = \\frac{Q}{V}", vars: "Faradios" },
            { name: "Capacitor placas", formula: "C = \\varepsilon_0\\frac{A}{d}", vars: "Paralelas" },
            { name: "Energía capacitor", formula: "U = \\frac{1}{2}CV^2 = \\frac{Q^2}{2C}", vars: "Almacenada" },
            { name: "Capacitores serie", formula: "\\frac{1}{C_T} = \\frac{1}{C_1} + \\frac{1}{C_2} + ...", vars: "Inversos" },
            { name: "Capacitores paralelo", formula: "C_T = C_1 + C_2 + ...", vars: "Sumas" }
        ]
    },
    magnetismo: {
        title: "🧲 Magnetismo",
        formulas: [
            { name: "Fuerza Lorentz", formula: "\\vec{F} = q\\vec{v} \\times \\vec{B}", vars: "Sobre carga móvil" },
            { name: "Fuerza magnética", formula: "F = qvB\\sin\\theta", vars: "Magnitud" },
            { name: "Radio trayectoria", formula: "r = \\frac{mv}{qB}", vars: "Partícula en campo B" },
            { name: "Fuerza conductor", formula: "F = BIL\\sin\\theta", vars: "Alambre con corriente" },
            { name: "Ley Biot-Savart", formula: "d\\vec{B} = \\frac{\\mu_0}{4\\pi}\\frac{Id\\vec{l} \\times \\hat{r}}{r^2}", vars: "Campo de corriente" },
            { name: "Campo alambre", formula: "B = \\frac{\\mu_0 I}{2\\pi r}", vars: "Alambre infinito" },
            { name: "Campo espira", formula: "B = \\frac{\\mu_0 I}{2R}", vars: "Centro de espira" },
            { name: "Campo solenoide", formula: "B = \\mu_0 nI", vars: "n = N/L vueltas/m" },
            { name: "Ley de Ampère", formula: "\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I_{enc}", vars: "Circulación de B" },
            { name: "Flujo magnético", formula: "\\Phi = BA\\cos\\theta", vars: "Webers (Wb)" },
            { name: "Ley de Faraday", formula: "\\varepsilon = -N\\frac{d\\Phi}{dt}", vars: "FEM inducida" },
            { name: "FEM en barra", formula: "\\varepsilon = BLv", vars: "Barra móvil" },
            { name: "Ley de Lenz", formula: "\\varepsilon = -\\frac{d\\Phi}{dt}", vars: "Signo negativo" },
            { name: "Transformador", formula: "\\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s}", vars: "Ideal" },
            { name: "Inductancia", formula: "L = \\frac{\\Phi}{I}", vars: "Henrios (H)" },
            { name: "Energía inductor", formula: "U = \\frac{1}{2}LI^2", vars: "Almacenada" }
        ]
    },
    moderna: {
        title: "⚛️ Física Moderna",
        formulas: [
            { name: "Energía fotón", formula: "E = hf = \\frac{hc}{\\lambda}", vars: "h = 6.63×10⁻³⁴ J·s" },
            { name: "Efecto fotoeléctrico", formula: "E_k = hf - \\phi", vars: "φ: función trabajo" },
            { name: "Umbral fotoeléctrico", formula: "f_0 = \\frac{\\phi}{h}", vars: "Frecuencia mínima" },
            { name: "De Broglie", formula: "\\lambda = \\frac{h}{p} = \\frac{h}{mv}", vars: "Onda de materia" },
            { name: "Incertidumbre Δx·Δp", formula: "\\Delta x \\Delta p \\geq \\frac{h}{4\\pi}", vars: "Heisenberg" },
            { name: "Incertidumbre ΔE·Δt", formula: "\\Delta E \\Delta t \\geq \\frac{h}{4\\pi}", vars: "Energía-tiempo" },
            { name: "Masa-energía", formula: "E = mc^2", vars: "Equivalencia" },
            { name: "Energía relativista", formula: "E^2 = (pc)^2 + (mc^2)^2", vars: "Total" },
            { name: "Dilatación tiempo", formula: "t = \\frac{t_0}{\\sqrt{1-v^2/c^2}}", vars: "γt₀" },
            { name: "Contracción longitud", formula: "L = L_0\\sqrt{1-v^2/c^2}", vars: "L₀/γ" },
            { name: "Niveles Bohr", formula: "E_n = -\\frac{13.6 \\text{ eV}}{n^2}", vars: "Hidrógeno" },
            { name: "Radio Bohr", formula: "r_n = n^2 a_0", vars: "a₀ = 0.529 Å" },
            { name: "Líneas espectrales", formula: "\\frac{1}{\\lambda} = R_H(\\frac{1}{n_f^2}-\\frac{1}{n_i^2})", vars: "Rydberg" },
            { name: "Decaimiento", formula: "N = N_0 e^{-\\lambda t}", vars: "Radiactivo" },
            { name: "Vida media", formula: "t_{1/2} = \\frac{\\ln 2}{\\lambda}", vars: "Tiempo mitad" },
            { name: "Actividad", formula: "A = \\lambda N = A_0 e^{-\\lambda t}", vars: "Becquerels" },
            { name: "Defecto de masa", formula: "\\Delta m = Zm_p + Nm_n - M", vars: "Núcleo" },
            { name: "Energía de enlace", formula: "E_b = \\Delta m \\cdot c^2", vars: "MeV" }
        ]
    }
};

/* ═══════════════════════════════════════════════════════════════════════════
   🧠 FRASES CÉLEBRES Y MENSAJES PROACTIVOS (CHATBOT)
   ═══════════════════════════════════════════════════════════════════════════ */
const CHATBOT_QUOTES = [
    /* FÍSICA Y MATEMÁTICAS */
    "«El universo está escrito en el lenguaje de las matemáticas.» – Galileo Galilei",
    "«No podemos resolver problemas pensando de la misma manera que cuando los creamos.» – Albert Einstein",
    "«Lo que sabemos es una gota de agua; lo que ignoramos es el océano.» – Isaac Newton",
    "«Si he logrado ver más lejos, ha sido porque he subido a hombros de gigantes.» – Isaac Newton",
    "«La imaginación es más importante que el conocimiento. El conocimiento es limitado. La imaginación rodea al mundo.» – Albert Einstein",
    "«Nada en la vida es para ser temido, es solo para ser comprendido. Ahora es el momento de comprender más, para que podamos temer menos.» – Marie Curie",
    "«Si quieres encontrar los secretos del universo, piensa en términos de energía, frecuencia y vibración.» – Nikola Tesla",
    "«El presente es de ellos; el futuro, por el que he trabajado realmente, es mío.» – Nikola Tesla",
    "«Me enseñaron que el camino del progreso no era ni rápido ni fácil.» – Marie Curie",
    "«Dios no juega a los dados con el universo.» – Albert Einstein",
    "«Las matemáticas son el alfabeto con el cual Dios ha escrito el universo.» – Galileo Galilei",
    "«Cualquier persona que nunca haya cometido un error, nunca ha intentado algo nuevo.» – Albert Einstein",
    "«Nunca consideres el estudio como una obligación, sino como una oportunidad.» – Albert Einstein",
    "«No sé cómo me verá el mundo, pero para mí soy como un niño jugando en la playa.» – Isaac Newton",
    "«La ciencia es internacional; pero su éxito es de aquellos que saben dominar primero a la naturaleza.» – Marie Curie",
    "«Un experimento es una pregunta que la ciencia le hace a la Naturaleza.» – Max Planck",
    "«La ciencia no nos ha enseñado aún si la locura es o no lo más sublime de la inteligencia.» – Edgar Allan Poe",
    "«Un día el hombre conectará su aparato a los engranajes primordiales del universo.» – Nikola Tesla",
    "«Las invenciones son los peldaños en la gran escalera del progreso.» – Nikola Tesla",
    "«Donde el mundo falla, la matemática perdura.» – Srinivasa Ramanujan",
    "«La magia es solo ciencia que aún no entendemos.» – Arthur C. Clarke",
    "«Hay una fuerza motriz más poderosa que el vapor, la electricidad y la energía atómica: la voluntad.» – Albert Einstein",
    "«Yo no fracasé. Solo encontré 10.000 caminos que no funcionaban.» – Thomas A. Edison",
    "«La ciencia se compone de errores, que a su vez son los pasos hacia la verdad.» – Julio Verne",
    "«No es conocimiento, sino el acto de aprendizaje lo que otorga la mayor de las satisfacciones.» – Carl Friedrich Gauss",
    "«En las matemáticas no se entienden las cosas, se acostumbra uno a ellas.» – John von Neumann",
    "«Una teoría matemática no debe considerarse completa hasta que se la hayas hecho tan clara a cualquiera que la entienda.» – David Hilbert",
    "«La geometría tiene dos grandes tesoros: uno es el teorema de Pitágoras; el otro, la división de una línea en extrema y media razón.» – Johannes Kepler",
    "«No podemos enseñar nada a nadie. Sólo podemos ayudarles a que lo descubran por sí mismos.» – Galileo Galilei",
    "«El que no puede entender la ciencia, tiene poco que decirle a la vida.» – Richard Feynman",
    "«El principio más importante es que no te engañes a ti mismo, porque tú eres la persona más fácil de engañar.» – Richard Feynman",
    "«Todo está hecho de átomos; todos los fenómenos se deben al movimiento de los átomos.» – Richard Feynman",
    "«En el fondo, las matemáticas se tratan de entender.» – William Thurston",
    "«Con demasiada frecuencia nos olvidamos de la naturaleza fundamental de un número, viéndolo solo como una combinación de dígitos.» – Srinivasa Ramanujan",
    "«Ecuaciones son simplemente la parte aburrida de las matemáticas.» – Stephen Hawking",
    "«El mayor enemigo del conocimiento no es la ignorancia, es la ilusión de conocimiento.» – Stephen Hawking",
    "«Mira hacia las estrellas y no hacia tus pies. Trata de darle sentido a lo que ves.» – Stephen Hawking",
    "«La inteligencia es la capacidad de adaptarse al cambio.» – Stephen Hawking",
    "«Aquel que es un pionero en la ciencia tiene que estar preparado para los constantes ataques de los demás.» – Marie Curie",
    "«Nunca debes tener miedo de lo que estás haciendo cuando es correcto.» – Marie Curie",
    "«Los científicos de hoy en día piensan profundamente, en lugar de claramente.» – Nikola Tesla",
    "«Las grandes invenciones nunca surgen de la nada.» – Leonardo da Vinci",
    "«La simplicidad es la máxima sofisticación.» – Leonardo da Vinci",
    "«Quien ama la práctica sin la teoría es como el marinero que sube a bordo sin timón y sin compás.» – Leonardo da Vinci",
    "«Mide lo que sea medible y haz medible lo que no lo sea.» – Galileo Galilei",
    
    /* FILOSOFÍA Y PEDAGOGÍA */
    "«Solo sé que no sé nada.» – Sócrates",
    "«La educación es el encendido de una llama, no el llenado de un recipiente.» – Sócrates",
    "«Pienso, luego existo.» – René Descartes",
    "«La paciencia es amarga, pero su fruto es dulce.» – Jean-Jacques Rousseau",
    "«La inteligencia consiste no solo en el conocimiento, sino también en la destreza de aplicar los conocimientos.» – Aristóteles",
    "«Educando la mente sin educar el corazón, no es educación en absoluto.» – Aristóteles",
    "«Es la marca de una mente educada poder entretener un pensamiento sin aceptarlo.» – Aristóteles",
    "«Saber que se sabe lo que se sabe y que no se sabe lo que no se sabe; he aquí el verdadero saber.» – Confucio",
    "«Aprender sin pensar es tiempo perdido; pensar sin aprender es peligroso.» – Confucio",
    "«Lo que se oye se olvida. Lo que se ve se recuerda. Lo que se hace se aprende.» – Confucio",
    "«Si crees que la educación es cara, prueba con la ignorancia.» – Derek Bok",
    "«Un viaje de mil millas comienza con un solo paso.» – Lao Tsé",
    "«El sabio no dice todo lo que piensa, pero siempre piensa todo lo que dice.» – Aristóteles",
    "«Hazlo, o no lo hagas, pero no lo intentes.» – Yoda (Filosofía Zen)",
    "«La duda es el principio de la sabiduría.» – Aristóteles",
    "«No hay camino para la verdad, la verdad es el camino.» – Mahatma Gandhi",
    "«Educar no es dar carrera para vivir, sino templar el alma para las dificultades de la vida.» – Pitágoras",
    "«Prefiero el bastón de la experiencia al carro rápido de la fortuna.» – Pitágoras",
    "«El conocimiento habla, pero la sabiduría escucha.» – Jimi Hendrix",
    "«Dime y lo olvido, enséñame y lo recuerdo, involúcrame y lo aprendo.» – Benjamin Franklin",
    "«El aprendizaje nunca cansa a la mente.» – Leonardo da Vinci",
    "«Una inversión en conocimiento paga el mejor interés.» – Benjamin Franklin",
    "«El secreto del cambio es enfocar toda tu energía, no en luchar contra lo viejo, sino en construir lo nuevo.» – Sócrates",
    "«Todos piensan en cambiar el mundo, pero nadie piensa en cambiarse a sí mismo.» – León Tolstói",
    "«La educación es el arma más poderosa que puedes usar para cambiar el mundo.» – Nelson Mandela",
    
    /* CURIOSIDADES Y DATOS FÍSICOS */
    "💡 ¿Sabías que un día en Venus es más largo que un año en Venus?",
    "💡 Curiosidad: El Sol concentra el 99.86% de toda la masa del Sistema Solar.",
    "💡 Si fueses a la velocidad de la luz, el tiempo se detendría por completo para ti.",
    "💡 Hay más estrellas en el universo que granos de arena en todas las playas de la Tierra.",
    "💡 El agua puede estar en estado sólido, líquido y gaseoso al mismo tiempo (el punto triple).",
    "💡 Si el universo a escala fuera del tamaño de la Tierra, un átomo sería invisiblemente diminuto; si un átomo fuera del tamaño de un estadio de fútbol, el núcleo sería como un guisante en el centro.",
    "💡 La Vía Láctea viaja por el espacio a una velocidad de unos 600 kilómetros por segundo.",
    "💡 La luz tarda aproximadamente 8 minutos y 20 segundos en viajar desde el Sol hasta la Tierra.",
    "💡 Casi todos los átomos de tu cuerpo se crearon en el núcleo de una estrella.",
    "💡 El sonido no puede viajar en el vacío del espacio porque necesita materia para propagarse.",
    "💡 Los agujeros negros no son 'aspiradoras' cósmicas: un objeto necesita caer dentro del horizonte de eventos para no poder escapar jamás.",
    "💡 Júpiter es tan grande que podrías meter a todos los otros planetas del sistema solar dentro de él y aún sobraría espacio.",
    "💡 Un relámpago puede alcanzar temperaturas de 30.000 °C, que es cinco veces más caliente que la superficie del Sol.",
    "💡 El campo magnético de la Tierra nos protege de las letales tormentas solares desviando sus partículas.",
    "💡 Si doblaras una hoja de papel 42 veces (teóricamente), su grosor llegaría hasta la Luna.",
    
    /* MOTIVACIÓN Y APRENDIZAJE PROACTIVO */
    "¡Ey! Descansar un par de minutos después de estudiar fijamente incrementa tu retención. ¡Respira!",
    "No te rindas con ese problema. A veces, la respuesta llega simplemente cambiando la perspectiva.",
    "El cerebro aprende más con los errores que cuando todo sale a la primera. ¡Tus errores construyen conocimiento!",
    "Llevas un buen ritmo. Trata de explicar lo que acabas de aprender en voz alta; si lo logras, ya lo dominas (la técnica Feynman).",
    "Incluso los científicos más geniales se frustraban. Tómatelo con calma y ataca esa ecuación paso a paso.",
    "A veces, todo lo que necesitas es dibujar un diagrama de cuerpo libre. La mente entiende mejor cuando los ojos ven las fuerzas.",
    "¿Has notado lo potente que es el álgebra cuando comienzas a cancelar términos? ¡Disfruta el proceso lógico!",
    "Recuerda: la fórmula no se memoriza, se comprende. ¿De dónde viene cada letra?",
    "Mantén esa curiosidad viva. Es la llave maestra que abre las puertas del conocimiento.",
    "¿Sabes qué? Estás construyendo sinapsis nuevas en tu cerebro en este instante. ¡Sigue así!",
    "Si sientes que no avanzas, pausa, toma agua y mira por la ventana un momento. El cerebro también necesita procesar.",
    "Las dificultades en física a menudo son solo un obstáculo matemático. Chequea tus despejes.",
    "En la ciencia, un 'no sé' es el punto de partida para el descubrimiento. Ánimo con lo que estás analizando. 🚀",
    "¡Eres capaz de entender cosas mucho más complejas de lo que crees!",
    "Es normal que la física cuántica o la relatividad te parezcan extrañas. ¡La intuición cotidiana a veces falla frente a los misterios del universo!"
];

console.log("✅ Bases de datos científicas cargadas correctamente");
