/* ═══════════════════════════════════════════════════════════════════════════════════════════════════
   📐 MATEMÁTICAS INTERACTIVAS - ARCHIVO DE CONFIGURACIÓN Y RECURSOS
   ═══════════════════════════════════════════════════════════════════════════════════════════════════

   🎓 Autor: Msc. Néstor Fabio Montoya Palacios
   🏫 Institución: Colegio María Auxiliadora - Cartago, Valle del Cauca, Colombia
   📅 Plataforma hermana de "Física Interactiva" (v1.0.0 · Abril 2026)

   ═══════════════════════════════════════════════════════════════════════════════════════════════════
   📝 INSTRUCCIONES DE USO:

   Este archivo contiene TODA la configuración de tu plataforma educativa de matemáticas.
   Para agregar nuevo contenido, simplemente edita las secciones correspondientes.

   🔴 IMPORTANTE: Después de editar, guarda el archivo y recarga la página web.
   ═══════════════════════════════════════════════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════════════════════
// 🔧 CONFIGURACIÓN GENERAL DEL DOCENTE
// ═══════════════════════════════════════════════════════════════════════════
const CONFIG = {
    docente: "Msc. Néstor Fabio Montoya Palacios",
    youtube: "https://www.youtube.com/@nestormontoya1",
    institucion: "Colegio María Auxiliadora de Cartago",
    area: "Matemáticas",
    año: 2026,
    // 🎨 Tema de color: emerald (default) | indigo | amber | crimson
    // El usuario puede cambiarlo en tiempo real desde el selector del header.
    // Se eligió ESMERALDA (verde) para máximo contraste con el azul/índigo
    // de la plataforma de Física y evocar la tradicional "pizarra con tiza" matemática.
    tema: "emerald"
};

/* ═══════════════════════════════════════════════════════════════════════════
   📂 BANCO DE RECURSOS EDUCATIVOS — 12 categorías matemáticas
   ═══════════════════════════════════════════════════════════════════════════ */

const RESOURCES = [
    // ═══════════════════════════════════════════════════════════════════════════
    // 1️⃣ ARITMÉTICA Y NÚMEROS
    // ═══════════════════════════════════════════════════════════════════════════
    {
        cat: "1. Aritmética y Números",
        color: "text-indigo-600",
        icon: "fa-solid fa-calculator",
        items: [
            { t: "html", title: "QuantumCalc — Calculadora Simbólica", url: "aplicaciones/calculadora.html", icon: "fa-solid fa-calculator", lvl: "Herramienta" }
            // Pendiente: operaciones, fracciones, potencias, radicales, números reales
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 2️⃣ ÁLGEBRA
    // ═══════════════════════════════════════════════════════════════════════════
    {
        cat: "2. Álgebra",
        color: "text-violet-600",
        icon: "fa-solid fa-square-root-variable",
        items: [
            { t: "html", title: "Cuaderno: Plantilla Maestra", url: "aplicaciones/Cuaderno_Plantilla_Maestra.html", icon: "fa-solid fa-file-lines", lvl: "Plantilla" },
            { t: "html", title: "Cuaderno: Función Lineal y Geometría Analítica", url: "aplicaciones/Cuaderno_FuncionLineal.html", icon: "fa-solid fa-chart-line", lvl: "Cuaderno" }
            // Pendiente: expresiones, ecuaciones, sistemas, polinomios, factorización
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 3️⃣ TRIGONOMETRÍA
    // ═══════════════════════════════════════════════════════════════════════════
    {
        cat: "3. Trigonometría",
        color: "text-purple-600",
        icon: "fa-solid fa-wave-square",
        items: [
            // Pendiente: razones, identidades, ecuaciones trigonométricas
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 4️⃣ GEOMETRÍA
    // ═══════════════════════════════════════════════════════════════════════════
    {
        cat: "4. Geometría (plana y del espacio)",
        color: "text-blue-600",
        icon: "fa-solid fa-draw-polygon",
        items: [
            // Pendiente: áreas, volúmenes, Thales, Pitágoras, cuerpos geométricos
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 5️⃣ CÁLCULO DIFERENCIAL
    // ═══════════════════════════════════════════════════════════════════════════
    {
        cat: "5. Cálculo Diferencial",
        color: "text-fuchsia-600",
        icon: "fa-solid fa-chart-line",
        items: [
            // Pendiente: límites, continuidad, derivadas, optimización
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 6️⃣ CÁLCULO INTEGRAL
    // ═══════════════════════════════════════════════════════════════════════════
    {
        cat: "6. Cálculo Integral",
        color: "text-pink-600",
        icon: "fa-solid fa-infinity",
        items: [
            // Pendiente: antiderivadas, técnicas, aplicaciones
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 7️⃣ ESTADÍSTICA
    // ═══════════════════════════════════════════════════════════════════════════
    {
        cat: "7. Estadística",
        color: "text-emerald-600",
        icon: "fa-solid fa-chart-column",
        items: [
            // Pendiente: descriptiva, inferencial, distribuciones
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 8️⃣ PROBABILIDAD Y COMBINATORIA
    // ═══════════════════════════════════════════════════════════════════════════
    {
        cat: "8. Probabilidad y Combinatoria",
        color: "text-teal-600",
        icon: "fa-solid fa-dice",
        items: [
            // Pendiente: permutaciones, variaciones, combinaciones, probabilidad condicional
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 9️⃣ ÁLGEBRA LINEAL
    // ═══════════════════════════════════════════════════════════════════════════
    {
        cat: "9. Álgebra Lineal",
        color: "text-cyan-600",
        icon: "fa-solid fa-vector-square",
        items: [
            // Pendiente: vectores, matrices, sistemas, espacios vectoriales
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 🔟 ECUACIONES DIFERENCIALES
    // ═══════════════════════════════════════════════════════════════════════════
    {
        cat: "10. Ecuaciones Diferenciales",
        color: "text-sky-600",
        icon: "fa-solid fa-arrow-trend-up",
        items: [
            // Pendiente: ODEs de primer y segundo orden, aplicaciones
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 1️⃣1️⃣ LÓGICA Y TEORÍA DE CONJUNTOS
    // ═══════════════════════════════════════════════════════════════════════════
    {
        cat: "11. Lógica y Teoría de Conjuntos",
        color: "text-slate-600",
        icon: "fa-solid fa-diagram-project",
        items: [
            // 📓 Cuadernos Interactivos
            { t: "html", title: "Cuaderno: Lógica Matemática", url: "aplicaciones/Cuaderno_Logica.html", icon: "fa-solid fa-brain", lvl: "Cuaderno" },
            { t: "html", title: "Cuaderno: Teoría de Conjuntos", url: "aplicaciones/Cuaderno_Conjuntos.html", icon: "fa-solid fa-circle-nodes", lvl: "Cuaderno" },
            // 🧪 Aplicaciones / Simuladores
            { t: "html", title: "Aplicación: Conjuntos (Diagramas de Venn)", url: "aplicaciones/conjuntos.html", icon: "fa-solid fa-diagram-project", lvl: "Interactivo" },
            { t: "html", title: "Aplicación: Lógica Proposicional", url: "aplicaciones/logica.html", icon: "fa-solid fa-code-branch", lvl: "Interactivo" },
            { t: "html", title: "Aplicación: Relaciones Matemáticas", url: "aplicaciones/relaciones.html", icon: "fa-solid fa-arrows-left-right", lvl: "Interactivo" }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 1️⃣2️⃣ MATEMÁTICAS DISCRETAS
    // ═══════════════════════════════════════════════════════════════════════════
    {
        cat: "12. Matemáticas Discretas",
        color: "text-rose-600",
        icon: "fa-solid fa-network-wired",
        items: [
            // Pendiente: grafos, recursividad, inducción, algoritmos
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 🎮 JUEGOS EDUCATIVOS MATEMÁTICOS
    // ═══════════════════════════════════════════════════════════════════════════
    {
        cat: "🎮 Juegos Educativos",
        color: "text-pink-600",
        icon: "fa-solid fa-gamepad",
        items: [
            // Pendiente: clonar y adaptar juegos de la plataforma de física a contextos matemáticos
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // 🧰 OTRAS HERRAMIENTAS Y CANALES
    // ═══════════════════════════════════════════════════════════════════════════
    {
        cat: "🧰 Herramientas Matemáticas",
        color: "text-slate-500",
        icon: "fa-solid fa-toolbox",
        items: [
            { t: "link", title: "GeoGebra Clásico", url: "https://www.geogebra.org/classic", icon: "fa-solid fa-shapes", lvl: "Web" },
            { t: "link", title: "Desmos (Graficador)", url: "https://www.desmos.com/calculator?lang=es", icon: "fa-solid fa-chart-line", lvl: "Web" },
            { t: "link", title: "WolframAlpha", url: "https://www.wolframalpha.com/?lang=es", icon: "fa-solid fa-brain", lvl: "Web" },
            { t: "link", title: "Symbolab (Paso a paso)", url: "https://es.symbolab.com/", icon: "fa-solid fa-square-root-variable", lvl: "Web" },
            { t: "link", title: "Khan Academy Matemáticas", url: "https://es.khanacademy.org/math", icon: "fa-solid fa-graduation-cap", lvl: "Web" },
            { t: "link", title: "PhET Matemáticas", url: "https://phet.colorado.edu/es/simulations/filter?subjects=math", icon: "fa-solid fa-atom", lvl: "Web" },
            { t: "link", title: "Canal Profe Néstor", url: CONFIG.youtube, icon: "fa-brands fa-youtube", lvl: "Externo" }
        ]
    }
];

/* ═══════════════════════════════════════════════════════════════════════════
   🌟 BANCO DE FRASES CÉLEBRES DE MATEMÁTICOS
   ═══════════════════════════════════════════════════════════════════════════ */
const QUOTES = [
    // 🏛️ ANTIGÜEDAD CLÁSICA
    { t: "Dame un punto de apoyo y moveré el mundo.", a: "Arquímedes" },
    { t: "Los números gobiernan el universo.", a: "Pitágoras" },
    { t: "No entre quien no sepa geometría.", a: "Platón (Academia)" },
    { t: "Eureka, eureka! (¡Lo encontré!)", a: "Arquímedes" },
    { t: "No hay camino real hacia la geometría.", a: "Euclides a Ptolomeo I" },
    { t: "Todo está ordenado según número y medida.", a: "Pitágoras" },

    // 🧮 RENACIMIENTO Y CLÁSICOS
    { t: "Las matemáticas son el alfabeto con el cual Dios ha escrito el universo.", a: "Galileo Galilei" },
    { t: "La naturaleza es un libro escrito en lenguaje matemático.", a: "Galileo Galilei" },
    { t: "He pensado en ello durante todo el día, y a menudo durante la noche.", a: "Pierre de Fermat" },
    { t: "Cogito, ergo sum.", a: "René Descartes" },
    { t: "La música es el placer que el alma humana experimenta al contar sin saber que cuenta.", a: "Gottfried Leibniz" },
    { t: "El lenguaje del universo no se puede leer hasta que hayamos aprendido su idioma: las matemáticas.", a: "Galileo Galilei" },

    // 📐 EULER, GAUSS Y LOS GRANDES DEL XVIII-XIX
    { t: "Las matemáticas son la reina de las ciencias, y la teoría de los números es la reina de las matemáticas.", a: "Carl Friedrich Gauss" },
    { t: "Prefiero una verdad cualquiera, aunque sea desagradable, a un error bonito.", a: "Carl Friedrich Gauss" },
    { t: "Un matemático que no es también algo de poeta, nunca será un matemático completo.", a: "Karl Weierstrass" },
    { t: "Leed a Euler, leed a Euler, él es el maestro de todos nosotros.", a: "Pierre-Simon Laplace" },
    { t: "Nada ocurre en el universo sin que la razón lo guíe.", a: "Leonhard Euler" },
    { t: "Una ecuación no tiene significado para mí si no expresa un pensamiento de Dios.", a: "Srinivasa Ramanujan" },

    // 🔢 HILBERT, POINCARÉ Y MODERNOS
    { t: "Debemos saber. Sabremos.", a: "David Hilbert" },
    { t: "El arte de hacer matemáticas consiste en encontrar ese caso especial que contiene todos los gérmenes de la generalidad.", a: "David Hilbert" },
    { t: "La matemática es el arte de dar el mismo nombre a cosas distintas.", a: "Henri Poincaré" },
    { t: "Un científico digno de tal nombre experimenta, sobre todo en matemáticas, el mismo sentimiento que un artista.", a: "Henri Poincaré" },
    { t: "No hay ramas de la matemática, por abstractas que sean, que no puedan aplicarse algún día a los fenómenos del mundo real.", a: "Nikolái Lobachevski" },

    // 🌀 SIGLO XX
    { t: "Lo esencial del progreso matemático está en descubrir nuevas formas de razonar, no solo manipular fórmulas.", a: "Hermann Weyl" },
    { t: "Todo debería hacerse tan simple como sea posible, pero no más simple.", a: "Albert Einstein" },
    { t: "Las matemáticas puras son, en su forma, la poesía de las ideas lógicas.", a: "Albert Einstein" },
    { t: "La esencia de las matemáticas no es hacer las cosas simples complicadas, sino hacer las cosas complicadas simples.", a: "Stan Gudder" },
    { t: "Las demostraciones matemáticas, como los diamantes, son duras y claras.", a: "John Locke" },

    // 🧠 LÓGICA Y TEORÍA DE CONJUNTOS
    { t: "En matemáticas el arte de plantear las cuestiones debe tenerse en mayor valor que resolverlas.", a: "Georg Cantor" },
    { t: "La esencia de las matemáticas es su libertad.", a: "Georg Cantor" },
    { t: "La matemática es la ciencia del infinito.", a: "Hermann Weyl" },
    { t: "Esta sentencia no tiene demostración.", a: "Kurt Gödel (esencia del Teorema de Incompletitud)" },

    // 🧩 MUJERES EN LA MATEMÁTICA
    { t: "Sin duda, la matemática es la más fina y poderosa creación del espíritu humano.", a: "Sofia Kovalévskaya" },
    { t: "La imaginación es el principio de la creación.", a: "Ada Lovelace" },
    { t: "Mientras más estudio, más me doy cuenta de lo poco que sé.", a: "Hipatia de Alejandría (atribuida)" },
    { t: "La matemática conoce los momentos bellos de la emoción pura.", a: "Emmy Noether" },

    // 📊 ESTADÍSTICA Y PROBABILIDAD
    { t: "En Dios confiamos; todos los demás deben traer datos.", a: "W. Edwards Deming" },
    { t: "La estadística es la gramática de la ciencia.", a: "Karl Pearson" },
    { t: "La teoría de la probabilidad es, en el fondo, nada más que sentido común reducido a cálculo.", a: "Pierre-Simon Laplace" },
    { t: "No podemos resolver problemas pensando del mismo modo que cuando los creamos.", a: "Albert Einstein" },

    // 🧪 DIVULGADORES Y CONTEMPORÁNEOS
    { t: "Un matemático es una máquina de convertir café en teoremas.", a: "Alfréd Rényi (atribuida a Paul Erdős)" },
    { t: "La matemática posee no sólo la verdad, sino cierta belleza suprema.", a: "Bertrand Russell" },
    { t: "Las matemáticas son el más bello y poderoso invento del espíritu humano.", a: "Stefan Banach" },
    { t: "Un buen matemático ve analogías entre teoremas; un mejor matemático ve analogías entre analogías.", a: "Stefan Banach" },
    { t: "La matemática es la puerta y la llave de las ciencias.", a: "Roger Bacon" },

    // 🎓 PEDAGOGÍA MATEMÁTICA
    { t: "No se puede enseñar nada a un hombre, solamente ayudarle a encontrarlo dentro de sí.", a: "Galileo Galilei" },
    { t: "El profesor mediocre dice. El buen profesor explica. El profesor superior demuestra. El gran profesor inspira.", a: "William Arthur Ward" }
];

/* ═══════════════════════════════════════════════════════════════════════════
   📰 FUENTES DE NOTICIAS MATEMÁTICAS Y CIENTÍFICAS
   ═══════════════════════════════════════════════════════════════════════════ */
const NEWS_SOURCES = [
    {
        name: "El País - Ciencia",
        url: "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/ciencia/portada",
        color: "bg-indigo-500",
        icon: "fa-solid fa-newspaper",
        bgCard: "from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30",
        borderColor: "border-indigo-400"
    },
    {
        name: "Quanta Magazine",
        url: "https://www.quantamagazine.org/feed/",
        color: "bg-violet-600",
        icon: "fa-solid fa-atom",
        bgCard: "from-violet-50 to-violet-100 dark:from-violet-900/30 dark:to-violet-800/30",
        borderColor: "border-violet-400"
    },
    {
        name: "Muy Interesante - Matemáticas",
        url: "https://www.muyinteresante.es/ciencia/matematicas/rss",
        color: "bg-purple-500",
        icon: "fa-solid fa-square-root-variable",
        bgCard: "from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30",
        borderColor: "border-purple-400"
    },
    {
        name: "Gaussianos (blog matemático)",
        url: "https://www.gaussianos.com/feed/",
        color: "bg-fuchsia-500",
        icon: "fa-solid fa-infinity",
        bgCard: "from-fuchsia-50 to-fuchsia-100 dark:from-fuchsia-900/30 dark:to-fuchsia-800/30",
        borderColor: "border-fuchsia-400"
    },
    {
        name: "ScienceDaily - Math",
        url: "https://www.sciencedaily.com/rss/computers_math/mathematics.xml",
        color: "bg-emerald-500",
        icon: "fa-solid fa-microscope",
        bgCard: "from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30",
        borderColor: "border-emerald-400"
    }
];

/* ═══════════════════════════════════════════════════════════════════════════
   🤖 HUB DE ASISTENTES DE INTELIGENCIA ARTIFICIAL
   ═══════════════════════════════════════════════════════════════════════════ */
const AI_ASSISTANTS = [
    { n: "ChatGPT", u: "https://chat.openai.com/", i: "fa-solid fa-message", c: "text-emerald-500" },
    { n: "Gemini", u: "https://gemini.google.com/", i: "fa-solid fa-star", c: "text-blue-500" },
    { n: "DeepSeek", u: "https://chat.deepseek.com/", i: "fa-solid fa-fish", c: "text-indigo-600" },
    { n: "Claude", u: "https://claude.ai/", i: "fa-solid fa-brain", c: "text-orange-500" },
    { n: "Copilot", u: "https://copilot.microsoft.com/", i: "fa-brands fa-microsoft", c: "text-pink-500" },
    { n: "NotebookLM", u: "https://notebooklm.google.com/", i: "fa-solid fa-book-open", c: "text-purple-500" },
    { n: "AI Studio", u: "https://aistudio.google.com/", i: "fa-solid fa-flask-vial", c: "text-amber-500" },
    { n: "WolframAlpha", u: "https://www.wolframalpha.com/", i: "fa-solid fa-square-root-variable", c: "text-red-500" },
    { n: "Qwen", u: "https://chat.qwen.ai/", i: "fa-solid fa-robot", c: "text-cyan-500" }
];

/* ═══════════════════════════════════════════════════════════════════════════
   🌐 PLATAFORMAS EXTERNAS RELACIONADAS
   ═══════════════════════════════════════════════════════════════════════════ */
const PLATFORMS = [
    { n: "GeoGebra", u: "https://www.geogebra.org/classic", i: "fa-solid fa-shapes", c: "text-indigo-500" },
    { n: "Desmos", u: "https://www.desmos.com/calculator?lang=es", i: "fa-solid fa-chart-line", c: "text-violet-500" },
    { n: "WolframAlpha", u: "https://www.wolframalpha.com/?lang=es", i: "fa-solid fa-brain", c: "text-purple-500" },
    { n: "Symbolab", u: "https://es.symbolab.com/", i: "fa-solid fa-square-root-variable", c: "text-fuchsia-500" },
    { n: "Khan Academy", u: "https://es.khanacademy.org/math", i: "fa-solid fa-graduation-cap", c: "text-emerald-500" },
    { n: "Python", u: "https://iemauxicartago.edu.co/Python/", i: "fa-brands fa-python", c: "text-yellow-500" },
    { n: "Jupyter", u: "https://iemauxicartago.edu.co/Jupyter/", i: "fa-solid fa-terminal", c: "text-orange-500" },
    { n: "YouTube", u: CONFIG.youtube, i: "fa-brands fa-youtube", c: "text-red-500" }
];

/* ═══════════════════════════════════════════════════════════════════════════
   🇬🇷 ALFABETO GRIEGO (para referencia matemática)
   ═══════════════════════════════════════════════════════════════════════════ */
const GREEK_ALPHABET = [
    ['Alpha', 'Α', 'α'], ['Beta', 'Β', 'β'], ['Gamma', 'Γ', 'γ'], ['Delta', 'Δ', 'δ'],
    ['Epsilon', 'Ε', 'ε'], ['Zeta', 'Ζ', 'ζ'], ['Eta', 'Η', 'η'], ['Theta', 'Θ', 'θ'],
    ['Iota', 'Ι', 'ι'], ['Kappa', 'Κ', 'κ'], ['Lambda', 'Λ', 'λ'], ['Mu', 'Μ', 'μ'],
    ['Nu', 'Ν', 'ν'], ['Xi', 'Ξ', 'ξ'], ['Omicron', 'Ο', 'ο'], ['Pi', 'Π', 'π'],
    ['Rho', 'Ρ', 'ρ'], ['Sigma', 'Σ', 'σ'], ['Tau', 'Τ', 'τ'], ['Upsilon', 'Υ', 'υ'],
    ['Phi', 'Φ', 'φ'], ['Chi', 'Χ', 'χ'], ['Psi', 'Ψ', 'ψ'], ['Omega', 'Ω', 'ω']
];

// ═══════════════════════════════════════════════════════════════════════════
// 🎨 SISTEMA DE TEMAS (Paletas intercambiables)
// ═══════════════════════════════════════════════════════════════════════════
// El usuario puede elegir uno desde el selector del header.
// Se aplica cambiando <html data-theme="..."> y actualizando CSS variables.
const THEMES = {
    indigo:  { name: "Índigo/Violeta", primary: "#4f46e5", secondary: "#7c3aed", accent: "#a78bfa", icon: "fa-solid fa-square-root-variable" },
    emerald: { name: "Esmeralda",      primary: "#10b981", secondary: "#059669", accent: "#6ee7b7", icon: "fa-solid fa-leaf" },
    amber:   { name: "Ámbar/Dorado",   primary: "#f59e0b", secondary: "#d97706", accent: "#fcd34d", icon: "fa-solid fa-sun" },
    crimson: { name: "Carmesí",        primary: "#dc2626", secondary: "#991b1b", accent: "#fca5a5", icon: "fa-solid fa-fire" }
};

// ═══════════════════════════════════════════════════════════════════════════
// 🔢 FIN DEL ARCHIVO DE CONFIGURACIÓN
// ═══════════════════════════════════════════════════════════════════════════
console.log("✅ Matemáticas Interactivas: Archivo de configuración cargado correctamente");
