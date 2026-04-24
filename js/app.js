/* ═══════════════════════════════════════════════════════════════════════════════════════════════════
   📚 FÍSICA INTERACTIVA - FUNCIONES PRINCIPALES
   ═══════════════════════════════════════════════════════════════════════════════════════════════════
   
   🎓 Autor: Msc. Néstor Fabio Montoya Palacios
   📅 Última actualización: Febrero 2026
   
   Este archivo contiene todas las funciones de la aplicación.

   ═══════════════════════════════════════════════════════════════════════════════════════════════════
   🔤 GUÍA RÁPIDA DE TAMAÑOS DE FUENTE (Tailwind CSS)
   ═══════════════════════════════════════════════════════════════════════════════════════════════════
   
   📏 Clases de tamaño de texto disponibles (de menor a mayor):
   
      text-[8px]   → 8px   (micro, solo contadores)
      text-[9px]   → 9px   (badges de fuente, fechas)
      text-[10px]  → 10px  (etiquetas pequeñas, subtítulos)
      text-[11px]  → 11px  (texto semi-pequeño personalizado)
      text-xs      → 12px  ← ESTÁNDAR para menú y contenido compacto
      text-sm      → 14px  ← IDEAL para texto de lectura cómoda
      text-base    → 16px  (texto grande, párrafos principales)
      text-lg      → 18px  (subtítulos, encabezados pequeños)
      text-xl      → 20px  (encabezados medianos)
      text-2xl     → 24px  (frases célebres, títulos grandes)
   
   📏 Tamaños personalizados (puedes inventar cualquiera):
      text-[13px]  → 13px  (intermedio entre text-xs y text-sm)
      text-[15px]  → 15px  (intermedio entre text-sm y text-base)
   
   💡 Para cambiar cualquier tamaño, busca el emoji 🔤 en este archivo.
      Ahí encontrarás la clase actual y puedes cambiarla fácilmente.
   
   🎨 Clases de grosor de fuente (de menor a mayor):
      font-normal    → peso 400 (texto regular)
      font-medium    → peso 500 (ligeramente negrita)
      font-semibold  → peso 600 (semi-negrita) ← MÁS USADO
      font-bold      → peso 700 (negrita)
      font-extrabold → peso 800 (extra negrita, solo títulos)
   
   ═══════════════════════════════════════════════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════════════════════
// 🎨 INICIALIZACIÓN DE ICONOS Y COMPONENTES
// ═══════════════════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function () {
    lucide.createIcons();
    initApp();
});

// Fallback si el DOM ya está listo (para carga dinámica de scripts)
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(function() {
        if (typeof lucide !== 'undefined') lucide.createIcons();
        if (typeof CONFIG !== 'undefined') initApp();
    }, 0);
}

function initApp() {
    // Configurar nombre del docente
    const headerName = document.getElementById('header-prof-name');
    if (headerName) headerName.textContent = CONFIG.docente;

    // Renderizar componentes
    renderPlatforms();
    renderAIHub();
    renderGreekAlphabet();
    renderMenu();
    renderRandomQuote();
    fetchMultiSourceNews();
    initSIPrefixes();
}

// ═══════════════════════════════════════════════════════════════════════════
// 📰 SISTEMA DE NOTICIAS CIENTÍFICAS MULTI-FUENTE
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 🔄 Obtiene noticias de múltiples fuentes científicas
 * Muestra noticias coloridas de: El País, NASA, Muy Interesante, Nat Geo, etc.
 */
async function fetchMultiSourceNews() {
    const container = document.getElementById('news-container');
    if (!container) return;

    // Mostrar skeleton de carga
    container.innerHTML = `
        <div class="glass-card p-4 h-28 skeleton animate-pulse"></div>
        <div class="glass-card p-4 h-28 skeleton animate-pulse"></div>
        <div class="glass-card p-4 h-28 skeleton animate-pulse"></div>
        <div class="glass-card p-4 h-28 skeleton animate-pulse"></div>
    `;

    let allNews = [];

    // Intentar obtener noticias de cada fuente
    for (const source of NEWS_SOURCES) {
        try {
            const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.url)}`;
            const response = await fetch(proxyUrl);
            const data = await response.json();

            if (data.items && data.items.length > 0) {
                const newsWithSource = data.items.slice(0, 2).map(item => ({
                    ...item,
                    sourceName: source.name,
                    sourceColor: source.color,
                    sourceIcon: source.icon,
                    bgCard: source.bgCard,
                    borderColor: source.borderColor
                }));
                allNews = allNews.concat(newsWithSource);
            }
        } catch (error) {
            console.warn(`⚠️ No se pudo cargar: ${source.name}`, error);
        }
    }

    // Mezclar aleatoriamente las noticias
    allNews = shuffleArray(allNews);

    // Renderizar noticias
    if (allNews.length > 0) {
        container.innerHTML = '';
        allNews.slice(0, 8).forEach(news => {
            container.innerHTML += createNewsCard(news);
        });
    } else {
        container.innerHTML = `
            <div class="col-span-2 glass-card p-6 text-center">
                <i class="fa-solid fa-satellite-dish text-4xl text-slate-300 mb-3"></i>
                <!-- 🔤 Mensaje sin conexión -->
                <p class="text-sm text-slate-500">No hay conexión a las fuentes de noticias.</p>
                <button onclick="fetchMultiSourceNews()" class="mt-3 text-sm text-indigo-500 hover:underline">
                    <i class="fa-solid fa-arrows-rotate mr-1"></i> Reintentar
                </button>
            </div>
        `;
    }
}

/**
 * 🎴 Crea una tarjeta de noticia con estilo visual atractivo
 * 
 * ═══════════════════════════════════════════════════════════════════════
 * 🔤 TAMAÑOS DE FUENTE EN TARJETAS DE NOTICIAS:
 * ═══════════════════════════════════════════════════════════════════════
 * 📌 Badge fuente (ScienceDaily, NASA...):  text-[10px]  → cambiar a text-xs para más grande
 * 📌 Fecha de publicación:                  text-[10px]  → cambiar a text-xs para más grande
 * 📌 Título de la noticia:                  text-sm      → cambiar a text-base para más grande
 * 📌 Descripción/resumen:                   text-xs      → cambiar a text-sm para más grande
 * 📌 Enlace "Leer más":                     text-[10px]  → cambiar a text-xs para más grande
 * ═══════════════════════════════════════════════════════════════════════
 */
function createNewsCard(news) {

    const date = new Date(news.pubDate);
    const formattedDate = date.toLocaleDateString('es-CO', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    // Limpiar descripción de HTML
    let description = news.description || '';
    description = description.replace(/<[^>]*>/g, '').substring(0, 130) + '...';

    return `
        <div class="glass-card p-4 border-l-4 ${news.borderColor} hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 bg-gradient-to-r ${news.bgCard}">
            <div class="flex justify-between items-center mb-2">
                <!-- 🔤 Badge nombre de la fuente -->
                <span class="text-[10px] font-bold ${news.sourceColor} text-white px-2 py-1 rounded-full flex items-center gap-1">
                    <i class="${news.sourceIcon}"></i>
                    ${news.sourceName}
                </span>
                <!-- 🔤 Fecha de publicación -->
                <span class="text-[10px] text-slate-400 flex items-center gap-1">
                    <i class="fa-regular fa-calendar"></i>
                    ${formattedDate}
                </span>
            </div>
            <!-- 🔤 Título de la noticia (text-sm = 14px) -->
            <a href="${news.link}" target="_blank" rel="noopener" 
               class="block font-bold text-sm text-slate-800 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 line-clamp-2 mb-1.5 transition-colors">
                ${news.title}
            </a>
            <!-- 🔤 Descripción/resumen de la noticia (text-xs = 12px) -->
            <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">${description}</p>
            <div class="mt-2 flex justify-end">
                <!-- 🔤 Enlace "Leer más" -->
                <a href="${news.link}" target="_blank" rel="noopener" 
                   class="text-[10px] font-bold text-indigo-500 hover:text-indigo-700 flex items-center gap-1 transition-colors">
                    Leer más <i class="fa-solid fa-arrow-right"></i>
                </a>
            </div>
        </div>
    `;
}

/**
 * 🔀 Mezcla aleatoriamente un array (Fisher-Yates)
 */
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// ═══════════════════════════════════════════════════════════════════════════
// 📋 RENDERIZADO DEL MENÚ DE RECURSOS (PANEL IZQUIERDO)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 🎯 Renderiza el menú lateral con todos los recursos educativos
 * @param {string} filter - Texto para filtrar recursos
 * 
 * ═══════════════════════════════════════════════════════════════════════
 * 🔤 TAMAÑOS DE FUENTE EN EL MENÚ LATERAL:
 * ═══════════════════════════════════════════════════════════════════════
 * 📌 Encabezado de categoría (ej: "1. MEDICIÓN..."):  text-[10px]  → cambiar a text-xs para más grande
 * 📌 Contador de items (ej: "9 items"):               text-[8px]   → cambiar a text-[10px] para más grande
 * 📌 Nombre del recurso/enlace:                        text-xs      → cambiar a text-sm para más grande
 * 📌 Icono dentro del cuadrito:                        text-xs      → cambiar a text-sm para más grande
 * 📌 Etiqueta tipo (INTERACTIVO, TEORÍA...):          via CSS .type-tag (ver index.html línea ~202)
 * 📌 Tooltip (hover en desktop):                       11px via CSS (ver index.html)
 * 📌 Texto "Próximamente...":                          text-xs      → cambiar a text-sm para más grande
 * ═══════════════════════════════════════════════════════════════════════
 */
function renderMenu(filter = '') {
    const container = document.getElementById('menu-container');
    if (!container) return;

    container.innerHTML = '';

    /* ═══════════════════════════════════════════════════════════════════
       🎨 COLORES DE ICONOS POR TIPO DE RECURSO
       ═══════════════════════════════════════════════════════════════════
       Cada tipo de recurso tiene su propio color de icono y fondo:
       🟢 html (Cuadernos Interactivos) → Esmeralda
       🟠 pdf  (Guías teóricas)         → Naranja
       🟣 ggb  (Simuladores GeoGebra)   → Índigo
       🔴 yt   (Videos YouTube)          → Rojo
       🟪 link (Enlaces externos)        → Púrpura
       
       Para cambiar un color, modifica 'color' (texto icono) y 'bg' (fondo cuadrito)
       ═══════════════════════════════════════════════════════════════════ */
    const iconStyle = {
        'html':        { color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200/60 dark:border-emerald-700/40' },
        'pdf':         { color: 'text-orange-500',  bg: 'bg-orange-50 dark:bg-orange-900/30 border-orange-200/60 dark:border-orange-700/40' },
        'ggb':         { color: 'text-indigo-500',  bg: 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200/60 dark:border-indigo-700/40' },
        'link':        { color: 'text-purple-500',  bg: 'bg-purple-50 dark:bg-purple-900/30 border-purple-200/60 dark:border-purple-700/40' },
        'yt':          { color: 'text-red-500',     bg: 'bg-red-50 dark:bg-red-900/30 border-red-200/60 dark:border-red-700/40' },
        'yt-playlist': { color: 'text-rose-500',    bg: 'bg-rose-50 dark:bg-rose-900/30 border-rose-200/60 dark:border-rose-700/40' }
    };
    const defaultStyle = { color: 'text-slate-500', bg: 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700' };

    RESOURCES.forEach(category => {
        const filteredItems = category.items.filter(item =>
            item.title.toLowerCase().includes(filter.toLowerCase())
        );

        if (filteredItems.length > 0 || filter === '') {
            const categoryDiv = document.createElement('div');
            const catIcon = category.icon ? `<i class="${category.icon} mr-1.5 opacity-70"></i>` : '';

            // Create header with toggle icon
            const headerEl = document.createElement('h4');
            headerEl.className = "px-2 mt-2 mb-2 text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-200/50 dark:border-slate-700/50 pb-1 flex justify-between items-end";
            headerEl.innerHTML = `
                <span>${catIcon}${category.cat} <i class="fa-solid fa-chevron-down cat-toggle-icon"></i></span> 
                <!-- 🔤 Contador de items (text-[8px]) -->
                <span class="text-[8px] font-normal text-slate-300 dark:text-slate-600">${filteredItems.length} items</span>
            `;
            categoryDiv.appendChild(headerEl);

            // Create scrollable wrapper for items
            const itemsWrapper = document.createElement('div');
            itemsWrapper.className = 'cat-items-wrapper';

            // Click header to toggle collapse
            headerEl.addEventListener('click', () => {
                categoryDiv.classList.toggle('cat-collapsed');
            });

            if (filteredItems.length > 0) {
                filteredItems.forEach(item => {
                    const typeClass = getTypeClass(item.t);
                    const style = iconStyle[item.t] || defaultStyle;
                    const btn = document.createElement('button');

                    /* 🔤 ESPACIADO DEL BOTÓN del menú lateral:
                       ─────────────────────────────────────────
                       px-2    = padding horizontal (izq/der)
                       py-2    = padding vertical → py-1.5 más compacto, py-2.5 más espaciado
                       gap-2.5 = espacio entre icono, texto y tag
                       mb-0.5  = margen inferior entre botones → mb-1 más separados */
                    btn.className = "menu-item w-full text-left px-2 py-2 rounded-lg flex items-center gap-2.5 transition-all mb-0.5 hover:bg-white/60 dark:hover:bg-slate-700/60 border border-transparent hover:border-indigo-100 dark:hover:border-slate-600 group";
                    btn.title = item.title + ' (' + item.lvl + ')';

                    btn.innerHTML = `
                        <!-- 🎨 Icono colorido del recurso (w-7 h-7 = tamaño cuadrito, w-8 h-8 más grande) -->
                        <div class="w-7 h-7 rounded-lg ${style.bg} border shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <!-- 🔤 Icono FontAwesome (text-xs = 12px) -->
                            <i class="${item.icon} ${style.color} text-xs"></i>
                        </div>
                        <!-- 🔤 Nombre del recurso/enlace (text-xs = 12px) -->
                        <span class="flex-1 min-w-0 text-sm font-semibold text-slate-700 dark:text-slate-200 leading-snug truncate">${item.title}</span>
                        <!-- 🖥️ Botón pantalla completa (solo items html/ggb) -->
                        ${item.t !== 'link' && item.t !== 'yt' && item.t !== 'yt-playlist' ? '<button class="pg-item-fs opacity-0 group-hover:opacity-100 w-6 h-6 rounded-md flex items-center justify-center text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all shrink-0" title="Pantalla completa"><i class="fa-solid fa-expand text-[9px]"></i></button>' : ''}
                        <!-- 🔤 Etiqueta tipo (tamaño controlado en CSS .type-tag del index.html) -->
                        <span class="type-tag ${typeClass} shrink-0">${item.lvl}</span>
                        <!-- 🏷️ Tooltip (aparece al pasar mouse en desktop) -->
                        <span class="tooltip-text">${item.title}</span>
                    `;

                    btn.onclick = (e) => {
                        // Si se hizo click en el botón de pantalla completa
                        if(e.target.closest('.pg-item-fs')){
                            e.stopPropagation();
                            if(typeof window.openFullscreenApp === 'function') window.openFullscreenApp(item.url, item.title);
                            return;
                        }
                        loadContent(item, btn);
                    };
                    itemsWrapper.appendChild(btn);
                });
            } else {
                // 🔤 Mensaje "Próximamente..." (text-xs = 12px)
                const emptyMsg = document.createElement('div');
                emptyMsg.className = "px-3 py-3 text-xs text-slate-400 dark:text-slate-500 italic bg-slate-50/50 dark:bg-slate-800/30 rounded-lg text-center border border-dashed border-slate-200 dark:border-slate-700 mx-1 mt-1";
                emptyMsg.innerHTML = `<i class="fa-solid fa-person-digging mr-1"></i> Próximamente...`;
                itemsWrapper.appendChild(emptyMsg);
            }

            categoryDiv.appendChild(itemsWrapper);
            container.appendChild(categoryDiv);
        }
    });
}

/**
 * 🏷️ Obtiene la clase CSS para el tipo de recurso
 */
function getTypeClass(type) {
    const classes = {
        'html': 'type-app',
        'pdf': 'type-pdf',
        'ggb': 'type-ggb',
        'link': 'type-ext',
        'yt': 'type-yt',
        'yt-playlist': 'type-yt'
    };
    return classes[type] || 'type-ext';
}

// ═══════════════════════════════════════════════════════════════════════════
// 📦 CARGA DE CONTENIDO EN EL VISOR
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 📂 Carga contenido en el visor principal
 */
let _currentLoadedItem = null;

function loadContent(item, btn) {
    // Enlaces externos abren en nueva pestaña
    if (item.t === 'link') {
        window.open(item.url, '_blank');
        return;
    }

    // Guardar item actual para botón pantalla completa
    _currentLoadedItem = item;

    // Ocultar dashboard de bienvenida
    document.getElementById('welcome-dashboard').classList.add('hidden');

    const frame = document.getElementById('main-frame');
    const ggbContainer = document.getElementById('ggb-container');
    const viewerHeader = document.getElementById('viewer-header');

    // Mostrar header del visor
    viewerHeader.classList.remove('hidden');
    viewerHeader.classList.add('flex');

    // Marcar item activo
    document.querySelectorAll('.menu-item').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    // Actualizar título
    document.getElementById('current-title').innerHTML = `
        <i class="${item.icon} text-indigo-500 mr-2"></i> ${item.title}
    `;

    // Cargar según tipo
    if (item.t === 'ggb') {
        loadGeoGebra(item, frame, ggbContainer);
    } else {
        loadIframe(item, frame, ggbContainer);
    }

    // En móviles, cerrar sidebar
    if (window.innerWidth < 768) {
        document.getElementById('sidebar').classList.add('-translate-x-full');
    }
}
// Hacer loadContent accesible globalmente (para el chatbot)
window.loadContent = loadContent;

/**
 * 📐 Carga un archivo GeoGebra
 */
function loadGeoGebra(item, frame, ggbContainer) {
    frame.classList.add('hidden');
    ggbContainer.classList.remove('hidden');

    const ggbElement = document.getElementById('ggb-element');
    ggbElement.innerHTML = '';

    const params = {
        "appName": "classic",
        "width": ggbElement.offsetWidth,
        "height": ggbElement.offsetHeight,
        "showToolBar": true,
        "borderColor": null,
        "showMenuBar": true,
        "allowStyleBar": true,
        "showAlgebraInput": true,
        "enableLabelDrags": false,
        "enableShiftDragZoom": true,
        "captureThreshold": null,
        "showToolBarHelp": false,
        "errorDialogsActive": true,
        "showTutorialLink": true,
        "showLogging": true,
        "useBrowserForJS": false
    };

    if (item.materialId) {
        params.material_id = item.materialId;
    } else {
        params.filename = item.url;
    }

    const applet = new GGBApplet(params, true);
    applet.inject('ggb-element');
}

/**
 * 🖼️ Carga contenido en iframe
 */
function loadIframe(item, frame, ggbContainer) {
    ggbContainer.classList.add('hidden');
    frame.classList.remove('hidden');

    let url = item.url;

    // Transformar URLs de YouTube
    if (item.t === 'yt' || item.t === 'yt-playlist') {
        if (url.includes('watch?v=')) {
            url = url.replace("watch?v=", "embed/").split('&')[0];
        } else if (url.includes('playlist?list=')) {
            url = url.replace("playlist?list=", "embed/videoseries?list=");
        } else if (url.includes('youtu.be/')) {
            url = url.replace("youtu.be/", "www.youtube.com/embed/");
        }
    }

    // Animación de carga
    frame.style.opacity = '0';
    setTimeout(() => {
        frame.src = url;
        frame.onload = () => frame.style.opacity = '1';
    }, 50);
}

// ═══════════════════════════════════════════════════════════════════════════
// 🌟 FRASES CÉLEBRES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 💬 Muestra una frase célebre aleatoria
 * 
 * 🔤 NOTA: El tamaño de la frase y el autor se controlan en el index.html:
 *    - Frase:  #quote-display → text-lg md:text-2xl (línea ~569)
 *    - Autor:  #quote-author  → text-sm md:text-base (línea ~574)
 */
function renderRandomQuote() {
    const quoteDisplay = document.getElementById('quote-display');
    const quoteAuthor = document.getElementById('quote-author');

    if (!quoteDisplay || !quoteAuthor) return;

    const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

    // Animación de fade
    quoteDisplay.style.opacity = '0';
    quoteAuthor.style.opacity = '0';

    setTimeout(() => {
        quoteDisplay.textContent = `"${quote.t}"`;
        quoteAuthor.textContent = `- ${quote.a}`;
        quoteDisplay.style.opacity = '1';
        quoteAuthor.style.opacity = '1';
    }, 300);
}

// ═══════════════════════════════════════════════════════════════════════════
// 🤖 HUB DE INTELIGENCIA ARTIFICIAL
// ═══════════════════════════════════════════════════════════════════════════

/**
 * ═══════════════════════════════════════════════════════════════════════
 * 🔤 TAMAÑOS DE FUENTE EN EL HUB DE IA:
 * ═══════════════════════════════════════════════════════════════════════
 * 📌 Icono del asistente:      text-lg      → cambiar a text-xl para más grande
 * 📌 Nombre del asistente:     text-[9px]   → cambiar a text-[10px] para más grande
 * ═══════════════════════════════════════════════════════════════════════
 */
function renderAIHub() {
    const container = document.getElementById('ai-hub-container');
    if (!container) return;

    AI_ASSISTANTS.forEach(ai => {
        const link = document.createElement('a');
        link.href = ai.u;
        link.target = "_blank";
        link.className = "flex flex-col items-center p-2 rounded bg-white/40 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-700 transition border border-transparent hover:border-indigo-200 hover:scale-105";
        link.innerHTML = `
            <!-- 🔤 Icono del asistente de IA (text-lg = 18px) -->
            <i class="${ai.i} ${ai.c} text-lg mb-1 transition"></i>
            <!-- 🔤 Nombre del asistente (text-[9px]) -->
            <span class="text-[9px] font-bold text-slate-600 dark:text-slate-300 text-center leading-none">${ai.n}</span>
        `;
        container.appendChild(link);
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// 🌐 PLATAFORMAS EXTERNAS (parte inferior del sidebar)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * ═══════════════════════════════════════════════════════════════════════
 * 🔤 TAMAÑOS DE FUENTE EN LAS PLATAFORMAS:
 * ═══════════════════════════════════════════════════════════════════════
 * 📌 Icono de la plataforma:   text-sm      → cambiar a text-base para más grande
 * 📌 Nombre de la plataforma:  text-[9px]   → cambiar a text-[10px] para más grande
 * 📌 Tamaño del cuadrito:      w-8 h-8      → w-10 h-10 para más grande
 * ═══════════════════════════════════════════════════════════════════════
 */
function renderPlatforms() {
    const container = document.getElementById('platforms-container');
    if (!container) return;

    PLATFORMS.forEach(platform => {
        const link = document.createElement('a');
        link.href = platform.u;
        link.target = "_blank";
        link.className = "flex flex-col items-center p-1 rounded hover:bg-white/50 dark:hover:bg-slate-700 transition group";
        link.innerHTML = `
            <!-- 🔤 Cuadrito con icono de plataforma (w-8 h-8) -->
            <div class="w-8 h-8 rounded bg-white dark:bg-slate-800 shadow flex items-center justify-center group-hover:scale-110 transition">
                <!-- 🔤 Icono (text-sm = 14px) -->
                <i class="${platform.i} ${platform.c} text-sm"></i>
            </div>
            <!-- 🔤 Nombre de la plataforma (text-[9px]) -->
            <span class="text-[9px] font-bold text-slate-600 dark:text-slate-300 mt-1">${platform.n}</span>
        `;
        container.appendChild(link);
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// 🇬🇷 ALFABETO GRIEGO
// ═══════════════════════════════════════════════════════════════════════════

/**
 * ═══════════════════════════════════════════════════════════════════════
 * 🔤 TAMAÑOS DE FUENTE EN EL ALFABETO GRIEGO:
 * ═══════════════════════════════════════════════════════════════════════
 * 📌 Letras griegas (Αα):     text-2xl     → cambiar a text-3xl para más grande
 * 📌 Nombre de la letra:      text-[10px]  → cambiar a text-xs para más grande
 * ═══════════════════════════════════════════════════════════════════════
 */
function renderGreekAlphabet() {
    const container = document.getElementById('greek-container');
    if (!container) return;

    GREEK_ALPHABET.forEach(letter => {
        container.innerHTML += `
            <div class="flex flex-col items-center p-2 rounded border border-slate-100 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-slate-700 transition cursor-pointer" title="Clic para copiar">
                <!-- 🔤 Letras griegas mayúscula y minúscula (text-2xl = 24px) -->
                <div class="text-2xl text-slate-800 dark:text-white font-serif">${letter[1]} ${letter[2]}</div>
                <!-- 🔤 Nombre de la letra griega (text-[10px]) -->
                <div class="text-[10px] font-bold text-slate-500 uppercase">${letter[0]}</div>
            </div>
        `;
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// 🔢 PREFIJOS DEL SISTEMA INTERNACIONAL
// ═══════════════════════════════════════════════════════════════════════════

const SI_PREFIXES = [
    { n: "Yotta", s: "Y", p: 24, t: "multiple" }, { n: "Zetta", s: "Z", p: 21, t: "multiple" },
    { n: "Exa", s: "E", p: 18, t: "multiple" }, { n: "Peta", s: "P", p: 15, t: "multiple" },
    { n: "Tera", s: "T", p: 12, t: "multiple" }, { n: "Giga", s: "G", p: 9, t: "multiple" },
    { n: "Mega", s: "M", p: 6, t: "multiple" }, { n: "Kilo", s: "k", p: 3, t: "multiple" },
    { n: "Hecto", s: "h", p: 2, t: "multiple" }, { n: "Deca", s: "da", p: 1, t: "multiple" },
    { n: "(Unidad Base)", s: "-", p: 0, t: "base" },
    { n: "Deci", s: "d", p: -1, t: "sub" }, { n: "Centi", s: "c", p: -2, t: "sub" },
    { n: "Mili", s: "m", p: -3, t: "sub" }, { n: "Micro", s: "µ", p: -6, t: "sub" },
    { n: "Nano", s: "n", p: -9, t: "sub" }, { n: "Pico", s: "p", p: -12, t: "sub" },
    { n: "Femto", s: "f", p: -15, t: "sub" }, { n: "Atto", s: "a", p: -18, t: "sub" },
    { n: "Zepto", s: "z", p: -21, t: "sub" }, { n: "Yocto", s: "y", p: -24, t: "sub" }
];

function initSIPrefixes() {
    const tMulti = document.getElementById('si-table-multiples');
    const tSub = document.getElementById('si-table-submultiples');
    const selFrom = document.getElementById('si-input-from');
    const selTo = document.getElementById('si-input-to');

    if (!tMulti || !tSub || !selFrom || !selTo) return;

    tMulti.innerHTML = '';
    tSub.innerHTML = '';
    selFrom.innerHTML = '';
    selTo.innerHTML = '';

    SI_PREFIXES.forEach(p => {
        const row = `
            <tr class="hover:bg-slate-100 dark:hover:bg-slate-700/50 transition">
                <td class="p-2 font-bold">${p.n}</td>
                <td class="p-2 font-mono text-indigo-600 dark:text-indigo-400">${p.s}</td>
                <td class="p-2 font-mono text-xs">10<sup>${p.p}</sup></td>
                <td class="p-2 font-mono text-xs text-slate-500">
                    ${p.p >= 0 ? '1' + '0'.repeat(p.p) : '0.' + '0'.repeat(Math.abs(p.p) - 1) + '1'}
                </td>
            </tr>
        `;

        if (p.t === 'multiple') tMulti.innerHTML += row;
        else if (p.t === 'sub') tSub.innerHTML += row;

        const opt = `<option value="${p.p}">${p.n} (${p.s})</option>`;
        selFrom.innerHTML += opt;
        selTo.innerHTML += opt;
    });

    selFrom.value = "0";
    selTo.value = "-3";
}

function convertSI() {
    const val = parseFloat(document.getElementById('si-input-val').value) || 0;
    const fromExp = parseInt(document.getElementById('si-input-from').value);
    const toExp = parseInt(document.getElementById('si-input-to').value);
    const diff = fromExp - toExp;
    const result = val * Math.pow(10, diff);

    let resStr = result.toString();
    if (Math.abs(diff) > 6 || resStr.length > 10) {
        resStr = result.toExponential(4);
    }

    document.getElementById('si-result').textContent = resStr;
}

// ═══════════════════════════════════════════════════════════════════════════
// 🎛️ FUNCIONES DE INTERFAZ
// ═══════════════════════════════════════════════════════════════════════════

function toggleTheme() {
    document.body.classList.toggle('dark');
    const icon = document.getElementById('theme-icon');
    if (icon) {
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    }
}

function showWelcomeScreen() {
    document.getElementById('main-frame').classList.add('hidden');
    document.getElementById('ggb-container').classList.add('hidden');
    document.getElementById('viewer-header').classList.add('hidden');
    document.getElementById('viewer-header').classList.remove('flex');
    document.getElementById('welcome-dashboard').classList.remove('hidden');
    renderRandomQuote();
    document.querySelectorAll('.menu-item').forEach(b => b.classList.remove('active'));
}

function reloadFrame() {
    const frame = document.getElementById('main-frame');
    if (frame.src) frame.src = frame.src;
}

function toggleFullscreen() {
    // Si hay un item cargado, abrir en overlay fullscreen
    if (_currentLoadedItem && typeof openFullscreenApp === 'function') {
        openFullscreenApp(_currentLoadedItem.url, _currentLoadedItem.title);
        return;
    }
    // Fallback: fullscreen nativo del navegador
    if (!document.fullscreenElement) {
        document.querySelector('main').requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

/**
 * 🖥️ Abre cualquier recurso en pantalla completa (overlay)
 * Accesible globalmente para el chatbot y el menú
 */
window.openFullscreenApp = function(url, title) {
    let overlay = document.getElementById('pg-fullscreen-overlay');
    if (overlay) overlay.remove();
    overlay = document.createElement('div');
    overlay.id = 'pg-fullscreen-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:999999;background:#0a0a1a;display:flex;flex-direction:column;animation:pgOverlayIn .35s ease';
    
    const hdr = document.createElement('div');
    hdr.style.cssText = 'height:48px;background:linear-gradient(135deg,#1a1a2e,#16213e);display:flex;align-items:center;padding:0 16px;gap:12px;flex-shrink:0;border-bottom:1px solid rgba(99,102,241,.25)';
    hdr.innerHTML = `
        <i class="fa-solid fa-rocket" style="color:#818cf8;font-size:16px"></i>
        <span style="flex:1;color:#e0e0f0;font-family:'Nunito',system-ui,sans-serif;font-size:14px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${title}</span>
        <button id="pg-fs-newtab" style="height:34px;padding:0 14px;border-radius:8px;border:1.5px solid rgba(129,140,248,.3);background:rgba(129,140,248,.1);color:#a5b4fc;cursor:pointer;display:flex;align-items:center;gap:6px;font-family:inherit;font-size:12px;font-weight:600;transition:all .2s" title="Abrir en nueva pestaña"><i class="fa-solid fa-arrow-up-right-from-square"></i><span class="hidden sm:inline">Nueva pestaña</span></button>
        <button id="pg-fs-close" style="width:34px;height:34px;border-radius:8px;border:none;background:rgba(239,68,68,.15);color:#f87171;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:15px;transition:all .2s" title="Cerrar (Esc)"><i class="fa-solid fa-xmark"></i></button>
    `;
    
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'flex:1;width:100%;border:none;background:#fff';
    iframe.src = url;
    iframe.allow = 'fullscreen';
    
    overlay.appendChild(hdr);
    overlay.appendChild(iframe);
    document.body.appendChild(overlay);
    
    // Inject animation CSS if not present
    if (!document.getElementById('pg-fs-css')) {
        const st = document.createElement('style');
        st.id = 'pg-fs-css';
        st.textContent = '@keyframes pgOverlayIn{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:scale(1)}}#pg-fs-close:hover{background:rgba(239,68,68,.3)!important}#pg-fs-newtab:hover{background:rgba(129,140,248,.25)!important;border-color:rgba(129,140,248,.5)!important}';
        document.head.appendChild(st);
    }
    
    hdr.querySelector('#pg-fs-close').addEventListener('click', () => overlay.remove());
    hdr.querySelector('#pg-fs-newtab').addEventListener('click', () => window.open(url, '_blank'));
    const escHandler = (e) => { if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', escHandler); } };
    document.addEventListener('keydown', escHandler);
};

function triggerWikiSearch() {
    const value = document.getElementById('wiki-input').value;
    if (value) {
        document.getElementById('welcome-dashboard').classList.add('hidden');
        document.getElementById('ggb-container').classList.add('hidden');
        document.getElementById('main-frame').classList.remove('hidden');
        document.getElementById('viewer-header').classList.remove('hidden');
        document.getElementById('viewer-header').classList.add('flex');
        document.getElementById('current-title').innerHTML = `
            <i class="fa-brands fa-wikipedia-w mr-2"></i> Wikipedia: ${value}
        `;
        document.getElementById('main-frame').src = `https://es.m.wikipedia.org/w/index.php?search=${encodeURIComponent(value)}`;
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 📌 MODALES
// ═══════════════════════════════════════════════════════════════════════════

window.openModal = function (id) {
    document.getElementById(id).classList.remove('hidden');
    if (id === 'modal-constants') renderConstants();
    else if (id === 'modal-si') initSIPrefixes();
};

window.closeModal = function (id) {
    document.getElementById(id).classList.add('hidden');
};

// ═══════════════════════════════════════════════════════════════════════════
// 🧪 CONSTANTES FÍSICAS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * ═══════════════════════════════════════════════════════════════════════
 * 🔤 TAMAÑOS DE FUENTE EN LA TABLA DE CONSTANTES:
 * ═══════════════════════════════════════════════════════════════════════
 * 📌 Categoría (ej: "Universales"):   text-xs    → cambiar a text-sm
 * 📌 Nombre de la constante:          text-xs    → cambiar a text-sm
 * 📌 Símbolo matemático:              text-sm    → cambiar a text-base
 * 📌 Valor numérico:                  text-xs    → cambiar a text-sm
 * 📌 Unidad:                          text-xs    → cambiar a text-sm
 * ═══════════════════════════════════════════════════════════════════════
 */
function renderConstants(filter = '') {
    const tbody = document.getElementById('constants-body');
    if (!tbody) return;

    tbody.innerHTML = '';
    let count = 0;
    let currentCat = '';

    CONSTANTS_DB.forEach(c => {
        if (c.n.toLowerCase().includes(filter.toLowerCase()) ||
            c.s.toLowerCase().includes(filter.toLowerCase())) {

            if (c.cat !== currentCat && filter === '') {
                const trCat = document.createElement('tr');
                trCat.innerHTML = `
                    <!-- 🔤 Encabezado de categoría de constantes -->
                    <td colspan="4" class="bg-slate-100 dark:bg-slate-800 font-bold text-xs uppercase tracking-widest text-slate-500 py-2 pl-4 border-b border-slate-200 dark:border-slate-700">
                        ${c.cat}
                    </td>
                `;
                tbody.appendChild(trCat);
                currentCat = c.cat;
            }

            const tr = document.createElement('tr');
            tr.className = "hover:bg-indigo-50/50 dark:hover:bg-slate-800/50 transition-colors";
            tr.innerHTML = `
                <!-- 🔤 Nombre de la constante (text-xs) -->
                <td class="font-medium text-slate-700 dark:text-slate-300 text-xs">${c.n}</td>
                <!-- 🔤 Símbolo matemático (text-sm) -->
                <td class="text-center font-serif text-indigo-600 dark:text-indigo-400 text-sm bg-white/30 dark:bg-slate-800/30">${c.s}</td>
                <!-- 🔤 Valor numérico (text-xs) -->
                <td class="font-mono text-xs text-slate-600 dark:text-slate-400">${c.v}</td>
                <!-- 🔤 Unidad (text-xs) -->
                <td class="font-mono text-xs text-slate-500 dark:text-slate-500 italic">${c.u}</td>
            `;
            tbody.appendChild(tr);
            count++;
        }
    });

    const countElement = document.getElementById('constants-count');
    if (countElement) countElement.textContent = count;

    if (window.MathJax) MathJax.typesetPromise();
}

// ═══════════════════════════════════════════════════════════════════════════
// 📱 SIDEBAR RESPONSIVE Y REDIMENSIONAMIENTO
// ═══════════════════════════════════════════════════════════════════════════

let isResizing = false;

document.addEventListener('DOMContentLoaded', function () {
    const resizer = document.getElementById('resizer');
    const sidebar = document.getElementById('sidebar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const searchInput = document.getElementById('search-input');
    const constantsSearch = document.getElementById('constants-search');

    // Redimensionamiento del sidebar
    if (resizer) {
        resizer.addEventListener('mousedown', () => {
            isResizing = true;
            document.body.style.cursor = 'col-resize';
        });
    }

    document.addEventListener('mousemove', (e) => {
        if (isResizing && sidebar && e.clientX > 200 && e.clientX < 600) {
            sidebar.style.width = `${e.clientX}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isResizing = false;
        document.body.style.cursor = 'default';
    });

    // Toggle móvil
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            sidebar.classList.toggle('-translate-x-full');
        });
    }

    // Búsqueda en menú
    if (searchInput) {
        searchInput.addEventListener('input', (e) => renderMenu(e.target.value));
    }

    // Búsqueda en constantes
    if (constantsSearch) {
        constantsSearch.addEventListener('input', (e) => renderConstants(e.target.value));
    }
});

// ═══════════════════════════════════════════════════════════════════════════
// 🔔 SISTEMA DE NOTIFICACIONES PUSH
// ═══════════════════════════════════════════════════════════════════════════

let notifySubscription = null;

/**
 * Toggle notificaciones on/off desde el botón campana del header
 */
window.toggleNotifications = async function() {
    const bell = document.getElementById('notify-bell-icon');
    const dot = document.getElementById('notify-bell-dot');
    
    if (!('serviceWorker' in navigator) || !('Notification' in window)) {
        alert('Tu navegador no soporta notificaciones push. Prueba con Chrome o Edge.');
        return;
    }

    const permission = Notification.permission;

    if (permission === 'granted' && localStorage.getItem('fisica_notify') === 'on') {
        // Desactivar
        localStorage.setItem('fisica_notify', 'off');
        if (bell) { bell.className = 'fa-solid fa-bell-slash text-sm'; }
        if (dot) dot.classList.add('hidden');
        showNotifyToast('🔕 Notificaciones desactivadas');
        return;
    }

    if (permission === 'denied') {
        alert('Las notificaciones están bloqueadas. Ve a la configuración de tu navegador y permite notificaciones para este sitio.');
        return;
    }

    // Pedir permiso
    try {
        const result = await Notification.requestPermission();
        if (result === 'granted') {
            localStorage.setItem('fisica_notify', 'on');
            if (bell) { bell.className = 'fa-solid fa-bell text-sm text-indigo-600'; }
            if (dot) dot.classList.remove('hidden');
            
            // Registrar Service Worker
            registerNotifySW();
            
            // Notificación de bienvenida
            showNotifyToast('🔔 ¡Notificaciones activadas! Te avisaremos cuando haya nuevo contenido.');
            
            // Enviar notificación de prueba
            setTimeout(() => {
                new Notification('📚 Física Interactiva', {
                    body: '¡Notificaciones activadas! Te avisaremos cuando haya nuevo contenido.',
                    icon: 'icon.svg'
                });
            }, 1000);
        }
    } catch (e) {
        console.warn('🔔 Error al pedir permiso:', e);
    }
};

function registerNotifySW() {
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register('sw-notify.js')
        .then(reg => {
            console.log('🔔 Service Worker registrado:', reg.scope);
            // Revisar nuevo contenido periódicamente
            startContentCheck(reg);
        })
        .catch(err => console.warn('🔔 SW error:', err));
}

/**
 * Revisa si hay nuevo contenido comparando versión guardada
 */
function startContentCheck(reg) {
    const CHECK_INTERVAL = 4 * 60 * 60 * 1000; // cada 4 horas
    const LAST_CHECK_KEY = 'fisica_last_content_check';
    const CONTENT_VERSION_KEY = 'fisica_content_version';
    
    function checkNow() {
        if (localStorage.getItem('fisica_notify') !== 'on') return;
        
        // Simular detección de nuevo contenido basado en la versión del sitio
        const currentVersion = document.querySelector('script')?.textContent?.match(/SITE_VERSION\s*=\s*'([^']+)'/)?.[1] || '0';
        const savedVersion = localStorage.getItem(CONTENT_VERSION_KEY);
        
        if (savedVersion && savedVersion !== currentVersion) {
            // ¡Hay nuevo contenido!
            if (reg.showNotification) {
                reg.showNotification('📚 Física Interactiva - Nuevo Contenido', {
                    body: '¡Se han actualizado los recursos! Versión ' + currentVersion + '. Toca para ver las novedades.',
                    icon: 'icon.svg',
                    vibrate: [100, 50, 100],
                    tag: 'new-content',
                    renotify: true
                });
            }
        }
        localStorage.setItem(CONTENT_VERSION_KEY, currentVersion);
        localStorage.setItem(LAST_CHECK_KEY, Date.now().toString());
    }
    
    // Revisar al cargar
    const lastCheck = parseInt(localStorage.getItem(LAST_CHECK_KEY) || '0');
    if (Date.now() - lastCheck > CHECK_INTERVAL) {
        setTimeout(checkNow, 5000);
    }
    
    // Revisar periódicamente si la pestaña está abierta
    setInterval(checkNow, CHECK_INTERVAL);
}

/**
 * Mini toast de confirmación
 */
function showNotifyToast(msg) {
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:70px;left:50%;transform:translateX(-50%);background:rgba(30,41,59,.92);color:#fff;padding:10px 20px;border-radius:12px;font-family:Nunito,sans-serif;font-size:13px;font-weight:600;z-index:999999;backdrop-filter:blur(10px);box-shadow:0 8px 30px rgba(0,0,0,.2);animation:pmSlideIn .3s ease;white-space:nowrap';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.transition = 'all .3s ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(-10px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Restaurar estado del botón campana al cargar
document.addEventListener('DOMContentLoaded', function() {
    const bell = document.getElementById('notify-bell-icon');
    const dot = document.getElementById('notify-bell-dot');
    const isOn = localStorage.getItem('fisica_notify') === 'on';
    
    if (isOn && Notification.permission === 'granted') {
        if (bell) bell.className = 'fa-solid fa-bell text-sm text-indigo-600';
        if (dot) dot.classList.remove('hidden');
        registerNotifySW();
    } else if (Notification.permission !== 'granted') {
        localStorage.setItem('fisica_notify', 'off');
    }
});

// ═══════════════════════════════════════════════════════════════════════════
// ✅ FIN DEL ARCHIVO DE FUNCIONES
// ═══════════════════════════════════════════════════════════════════════════
console.log("✅ Física Interactiva: Funciones principales cargadas correctamente");
