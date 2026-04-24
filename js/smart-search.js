/* ═══════════════════════════════════════════════════════════════════════════════
   🔍 FÍSICA INTERACTIVA - Módulo de Búsqueda Mejorada (Smart Search)
   ═══════════════════════════════════════════════════════════════════════════════
   🎓 Autor: Msc. Néstor Fabio Montoya Palacios
   📅 Marzo 2026
   
   📌 MEJORAS SOBRE LA BÚSQUEDA ACTUAL:
   1. Busca por título, categoría, tipo de recurso (lvl) y palabras clave
   2. Búsqueda fuzzy (tolerante a errores de escritura)
   3. Sinónimos y alias (ej: "mru" encuentra "Movimiento Rectilíneo Uniforme")
   4. Resultados con puntuación de relevancia y highlighting
   5. Búsqueda por tipo: escribir "simulador" muestra todos los simuladores
   6. Dropdown de resultados en tiempo real
   7. Integración con el chatbot (función global de búsqueda)
   
   📌 INTEGRACIÓN:
   1. Copia a: public_html/Fisica/js/smart-search.js
   2. Agrega en index.html DESPUÉS de config.js y ANTES de app.js:
      <script src="js/smart-search.js"></script>
   3. Ver instrucciones detalladas al final
   ═══════════════════════════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════════════════════
// 🔧 DICCIONARIO DE SINÓNIMOS Y ALIAS
// ═══════════════════════════════════════════════════════════════════════════
const SEARCH_ALIASES = {
    // Cinemática
    'mru': ['movimiento rectilíneo uniforme', 'velocidad constante', 'cinemática'],
    'mrua': ['movimiento rectilíneo uniformemente acelerado', 'aceleración constante', 'mruv'],
    'mruv': ['mrua', 'movimiento acelerado', 'aceleración'],
    'caida libre': ['caída libre', 'movimiento vertical', 'gravedad', 'torre pisa'],
    'parabolico': ['parabólico', 'tiro parabólico', 'proyectil', 'semiparabólico'],
    'circular': ['mcu', 'movimiento circular uniforme', 'centripeta'],
    'mcu': ['movimiento circular uniforme', 'circular'],
    
    // Dinámica
    'newton': ['leyes de newton', 'fuerza', 'dinámica', 'segunda ley'],
    'fuerza': ['newton', 'dinámica', 'rozamiento'],
    'energia': ['energía', 'trabajo', 'potencia', 'cinética', 'potencial'],
    'hooke': ['resorte', 'ley de hooke', 'elástico'],
    'colision': ['colisión', 'choque', 'momentum', 'cantidad de movimiento'],
    'kepler': ['gravitación', 'órbita', 'planeta', 'satélite'],
    
    // Estática
    'torque': ['momento de fuerza', 'rotación', 'palanca'],
    'palanca': ['máquina simple', 'torque', 'equilibrio'],
    'estatica': ['estática', 'equilibrio', 'partícula'],
    
    // Ondas y Sonido
    'onda': ['ondas', 'ondulatorio', 'transversal', 'longitudinal'],
    'interferencia': ['superposición', 'ondas', 'constructiva', 'destructiva'],
    'doppler': ['efecto doppler', 'frecuencia', 'sonido'],
    'sonido': ['acústica', 'frecuencia', 'timbre', 'tubo sonoro'],
    'piano': ['instrumento', 'musical', 'tecla', 'nota'],
    'flauta': ['instrumento', 'dulce', 'musical'],
    'guitarra': ['cuerdas', 'diapasón', 'ondas estacionarias'],
    
    // Óptica
    'snell': ['refracción', 'ley de snell', 'índice de refracción'],
    'refraccion': ['refracción', 'snell', 'dioptrio', 'prisma'],
    'reflexion': ['reflexión', 'espejo', 'ley de reflexión'],
    'espejo': ['reflexión', 'cóncavo', 'convexo', 'plano'],
    'lente': ['convergente', 'divergente', 'dioptrio'],
    'prisma': ['refracción', 'dispersión', 'arcoíris'],
    'optica': ['óptica', 'luz', 'refracción', 'reflexión'],
    
    // Fluidos
    'fluido': ['fluidos', 'presión', 'pascal', 'arquímedes', 'bernoulli'],
    'pascal': ['presión', 'fluido', 'hidrostática'],
    'arquimedes': ['arquímedes', 'empuje', 'flotación'],
    'bernoulli': ['flujo', 'presión', 'velocidad'],
    
    // Oscilatorio
    'mas': ['movimiento armónico simple', 'péndulo', 'resorte', 'oscilatorio'],
    'pendulo': ['péndulo', 'mas', 'oscilación'],
    'resorte': ['masa resorte', 'hooke', 'mas', 'oscilación'],
    
    // Temperatura
    'calor': ['temperatura', 'térmica', 'termodinámica'],
    'temperatura': ['calor', 'celsius', 'fahrenheit', 'kelvin'],
    
    // Herramientas
    'calculadora': ['cálculo', 'calcular', 'operación'],
    'tabla periodica': ['tabla periódica', 'elementos', 'química'],
    'conversor': ['conversión', 'unidades', 'convertir'],
    'formula': ['fórmulas', 'ecuación', 'ecuaciones'],
    'transportador': ['ángulo', 'grados', 'radianes', 'medir ángulo'],
    'vector': ['vectores', 'magnitud', 'dirección', 'componentes', 'suma vectores'],
    
    // Tipos de recurso
    'simulador': ['simulación', 'interactivo', 'app'],
    'cuaderno': ['interactivo', 'notebook', 'digital'],
    'guia': ['guía', 'teoría', 'pdf', 'documento'],
    'taller': ['práctica', 'ejercicio', 'workshop'],
    'video': ['youtube', 'tutorial'],
};

// ═══════════════════════════════════════════════════════════════════════════
// 🔍 MOTOR DE BÚSQUEDA INTELIGENTE
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Búsqueda inteligente en todos los recursos
 * @param {string} query - Texto a buscar
 * @returns {Array} Resultados ordenados por relevancia
 */
window.smartSearch = function(query) {
    if (!query || query.trim().length < 2) return [];
    if (typeof RESOURCES === 'undefined') return [];

    const q = normalizeText(query);
    const tokens = q.split(/\s+/).filter(t => t.length >= 2);
    const results = [];

    // Expandir tokens con sinónimos
    const expandedTokens = new Set(tokens);
    tokens.forEach(token => {
        Object.entries(SEARCH_ALIASES).forEach(([key, aliases]) => {
            const normalKey = normalizeText(key);
            if (normalKey.includes(token) || token.includes(normalKey)) {
                aliases.forEach(alias => {
                    normalizeText(alias).split(/\s+/).forEach(w => expandedTokens.add(w));
                });
            }
        });
    });

    const allTokens = [...expandedTokens];

    RESOURCES.forEach(category => {
        if (!category.items) return;
        category.items.forEach(item => {
            let score = 0;
            const titleNorm = normalizeText(item.title);
            const catNorm = normalizeText(category.cat);
            const lvlNorm = normalizeText(item.lvl || '');
            const urlNorm = normalizeText(item.url || '');

            // 1. Match exacto en título (peso alto)
            if (titleNorm.includes(q)) {
                score += 100;
            }

            // 2. Match token por token en título
            tokens.forEach(token => {
                if (titleNorm.includes(token)) score += 30;
            });

            // 3. Match con sinónimos expandidos
            allTokens.forEach(token => {
                if (titleNorm.includes(token)) score += 15;
                if (catNorm.includes(token)) score += 8;
                if (lvlNorm.includes(token)) score += 12;
            });

            // 4. Match en categoría
            tokens.forEach(token => {
                if (catNorm.includes(token)) score += 10;
            });

            // 5. Match en tipo/nivel
            tokens.forEach(token => {
                if (lvlNorm.includes(token)) score += 20;
            });

            // 6. Match fuzzy (distancia de edición simple)
            tokens.forEach(token => {
                const titleWords = titleNorm.split(/\s+/);
                titleWords.forEach(word => {
                    if (word.length > 3 && token.length > 3) {
                        const dist = levenshteinDistance(token, word);
                        if (dist <= 2) score += Math.max(0, 15 - dist * 5);
                    }
                });
            });

            // 7. Bonus por URL match
            tokens.forEach(token => {
                if (urlNorm.includes(token)) score += 5;
            });

            if (score > 0) {
                results.push({
                    item: item,
                    category: category.cat,
                    catIcon: category.icon,
                    score: score,
                    matchType: score >= 100 ? 'exact' : score >= 30 ? 'partial' : 'fuzzy'
                });
            }
        });
    });

    // Ordenar por relevancia y deduplicar
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, 20); // Máximo 20 resultados
};

// ═══════════════════════════════════════════════════════════════════════════
// 📊 DROPDOWN DE RESULTADOS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Reemplaza el listener del buscador del sidebar con la versión mejorada.
 * Se ejecuta automáticamente al cargar este script.
 */
function upgradeSearchInput() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) {
        // Reintentar cuando el DOM esté listo
        document.addEventListener('DOMContentLoaded', upgradeSearchInput);
        return;
    }

    // Crear contenedor de dropdown si no existe
    let dropdown = document.getElementById('smart-search-dropdown');
    if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.id = 'smart-search-dropdown';
        dropdown.className = 'ss-dropdown hidden';
        searchInput.parentElement.style.position = 'relative';
        searchInput.parentElement.appendChild(dropdown);
    }

    // Inyectar estilos
    if (!document.getElementById('smart-search-css')) {
        const style = document.createElement('style');
        style.id = 'smart-search-css';
        style.textContent = getSmartSearchCSS();
        document.head.appendChild(style);
    }

    // Nuevo listener mejorado
    searchInput.addEventListener('input', (e) => {
        const value = e.target.value.trim();
        
        // Seguir filtrando el menú lateral normalmente
        if (typeof renderMenu === 'function') {
            renderMenu(value);
        }

        // Mostrar dropdown de resultados inteligentes
        if (value.length >= 2) {
            const results = smartSearch(value);
            renderSearchDropdown(results, value, dropdown);
        } else {
            dropdown.classList.add('hidden');
        }
    });

    // Cerrar dropdown al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });

    // Navegación con teclado
    searchInput.addEventListener('keydown', (e) => {
        if (dropdown.classList.contains('hidden')) return;
        const items = dropdown.querySelectorAll('.ss-item');
        const active = dropdown.querySelector('.ss-item.active');
        let idx = [...items].indexOf(active);

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (active) active.classList.remove('active');
            idx = (idx + 1) % items.length;
            items[idx]?.classList.add('active');
            items[idx]?.scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (active) active.classList.remove('active');
            idx = idx <= 0 ? items.length - 1 : idx - 1;
            items[idx]?.classList.add('active');
            items[idx]?.scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (active) active.click();
        } else if (e.key === 'Escape') {
            dropdown.classList.add('hidden');
        }
    });
}

function renderSearchDropdown(results, query, dropdown) {
    if (results.length === 0) {
        dropdown.innerHTML = `
            <div class="ss-empty">
                <i class="fa-solid fa-search"></i>
                <span>No se encontraron resultados para "<strong>${query}</strong>"</span>
            </div>
        `;
        dropdown.classList.remove('hidden');
        return;
    }

    const iconStyle = {
        'html': { color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/40' },
        'pdf':  { color: 'text-orange-500',  bg: 'bg-orange-100 dark:bg-orange-900/40' },
        'ggb':  { color: 'text-indigo-500',  bg: 'bg-indigo-100 dark:bg-indigo-900/40' },
        'link': { color: 'text-purple-500',  bg: 'bg-purple-100 dark:bg-purple-900/40' },
        'yt':   { color: 'text-red-500',     bg: 'bg-red-100 dark:bg-red-900/40' }
    };
    const defaultStyle = { color: 'text-slate-500', bg: 'bg-slate-100 dark:bg-slate-800' };

    let html = `<div class="ss-header"><span>${results.length} resultado${results.length !== 1 ? 's' : ''}</span><kbd>↑↓</kbd> navegar <kbd>↵</kbd> abrir</div>`;

    results.slice(0, 12).forEach((r, i) => {
        const style = iconStyle[r.item.t] || defaultStyle;
        const highlighted = highlightMatch(r.item.title, query);
        
        html += `
            <button class="ss-item ${i === 0 ? 'active' : ''}" data-idx="${i}" 
                onclick="smartSearchSelect(${JSON.stringify(r.item).replace(/"/g, '&quot;')})">
                <div class="ss-item-icon ${style.bg}">
                    <i class="${r.item.icon} ${style.color}"></i>
                </div>
                <div class="ss-item-info">
                    <span class="ss-item-title">${highlighted}</span>
                    <span class="ss-item-cat">${r.category} · ${r.item.lvl}</span>
                </div>
                <span class="ss-item-type">${r.item.lvl}</span>
            </button>
        `;
    });

    dropdown.innerHTML = html;
    dropdown.classList.remove('hidden');
}

/**
 * Al seleccionar un resultado, cargarlo en el visor
 */
window.smartSearchSelect = function(item) {
    const dropdown = document.getElementById('smart-search-dropdown');
    if (dropdown) dropdown.classList.add('hidden');

    // Usar la función loadContent existente
    if (typeof loadContent === 'function') {
        loadContent(item);
    }

    // Limpiar búsqueda
    const input = document.getElementById('search-input');
    if (input) input.value = '';
    if (typeof renderMenu === 'function') renderMenu('');
};

// ═══════════════════════════════════════════════════════════════════════════
// 🤖 INTEGRACIÓN CON CHATBOT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Función global para que el chatbot busque recursos
 * Devuelve texto formateado con los resultados
 */
window.chatbotSearchResources = function(query) {
    const results = smartSearch(query);
    if (results.length === 0) return null;

    let text = `Encontré ${results.length} recurso${results.length !== 1 ? 's' : ''} relacionado${results.length !== 1 ? 's' : ''}:\n\n`;
    results.slice(0, 5).forEach((r, i) => {
        text += `${i + 1}. **${r.item.title}** (${r.item.lvl}) — ${r.category}\n`;
        text += `   🔗 [ABRIR_APP:${r.item.url}:${r.item.title}]\n\n`;
    });

    return text;
};

// ═══════════════════════════════════════════════════════════════════════════
// 🛠️ UTILIDADES
// ═══════════════════════════════════════════════════════════════════════════

function normalizeText(text) {
    return (text || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')  // Quitar acentos
        .replace(/[^a-z0-9\s]/g, ' ')     // Solo alfanumérico
        .replace(/\s+/g, ' ')
        .trim();
}

function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            const cost = b.charAt(i - 1) === a.charAt(j - 1) ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + cost
            );
        }
    }
    return matrix[b.length][a.length];
}

function highlightMatch(text, query) {
    const words = query.split(/\s+/).filter(w => w.length >= 2);
    let result = text;
    words.forEach(word => {
        const regex = new RegExp(`(${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        result = result.replace(regex, '<mark class="ss-highlight">$1</mark>');
    });
    return result;
}

// ═══════════════════════════════════════════════════════════════════════════
// 🎨 ESTILOS CSS
// ═══════════════════════════════════════════════════════════════════════════
function getSmartSearchCSS() {
    return `
    .ss-dropdown {
        position:absolute; top:100%; left:0; right:0; z-index:9999;
        background:rgba(255,255,255,.97); backdrop-filter:blur(12px);
        border-radius:0 0 14px 14px; margin-top:2px;
        box-shadow:0 12px 40px rgba(0,0,0,.12); border:1px solid rgba(99,102,241,.12);
        max-height:360px; overflow-y:auto; overflow-x:hidden;
        font-family:'Nunito',system-ui,sans-serif;
    }
    .dark .ss-dropdown {
        background:rgba(15,23,42,.97); border-color:rgba(99,102,241,.2);
        box-shadow:0 12px 40px rgba(0,0,0,.3);
    }
    .ss-dropdown.hidden { display:none; }

    .ss-header {
        display:flex; align-items:center; justify-content:space-between;
        padding:8px 12px; font-size:10px; font-weight:700; color:#94a3b8;
        text-transform:uppercase; letter-spacing:.6px;
        border-bottom:1px solid rgba(100,116,139,.1);
    }
    .ss-header kbd {
        display:inline-block; padding:1px 5px; font-size:9px; font-family:monospace;
        background:rgba(100,116,139,.1); border-radius:4px; color:#94a3b8;
        margin:0 2px;
    }

    .ss-item {
        display:flex; align-items:center; gap:10px; width:100%;
        padding:8px 12px; border:none; background:none;
        cursor:pointer; transition:all .15s; font-family:inherit;
        text-align:left; border-bottom:1px solid rgba(100,116,139,.06);
    }
    .ss-item:hover, .ss-item.active {
        background:rgba(99,102,241,.06);
    }
    .dark .ss-item:hover, .dark .ss-item.active {
        background:rgba(99,102,241,.12);
    }
    .ss-item-icon {
        width:30px; height:30px; border-radius:8px;
        display:flex; align-items:center; justify-content:center;
        font-size:12px; flex-shrink:0;
    }
    .ss-item-info { flex:1; min-width:0; }
    .ss-item-title {
        display:block; font-size:12px; font-weight:700;
        color:#1e293b; line-height:1.3; white-space:nowrap;
        overflow:hidden; text-overflow:ellipsis;
    }
    .dark .ss-item-title { color:#e2e8f0; }
    .ss-item-cat {
        display:block; font-size:10px; color:#94a3b8; line-height:1.2;
        white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
    }
    .ss-item-type {
        font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:.5px;
        color:#6366f1; background:rgba(99,102,241,.08); padding:2px 6px;
        border-radius:4px; flex-shrink:0;
    }
    .ss-highlight {
        background:rgba(250,204,21,.3); color:inherit;
        border-radius:2px; padding:0 1px;
    }
    .dark .ss-highlight { background:rgba(250,204,21,.2); }

    .ss-empty {
        padding:20px; text-align:center; color:#94a3b8; font-size:12px;
        display:flex; flex-direction:column; align-items:center; gap:8px;
    }
    .ss-empty i { font-size:20px; opacity:.4; }

    /* Scrollbar */
    .ss-dropdown::-webkit-scrollbar { width:5px; }
    .ss-dropdown::-webkit-scrollbar-track { background:transparent; }
    .ss-dropdown::-webkit-scrollbar-thumb { background:rgba(100,116,139,.2); border-radius:4px; }
    `;
}

// ═══════════════════════════════════════════════════════════════════════════
// 🚀 AUTO-INICIALIZACIÓN
// ═══════════════════════════════════════════════════════════════════════════
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', upgradeSearchInput);
} else {
    upgradeSearchInput();
}

console.log('🔍 Módulo de Búsqueda Inteligente (Smart Search) cargado correctamente');

/* ═══════════════════════════════════════════════════════════════════════════
   📝 INSTRUCCIONES DE INTEGRACIÓN
   ═══════════════════════════════════════════════════════════════════════════

   ✅ PASO 1: Copia el archivo a public_html/Fisica/js/smart-search.js

   ✅ PASO 2: En index.html, agrega el script DESPUÉS de config.js y ANTES de app.js:
   
   <script src="js/config.js?v=2.7.4"></script>
   <script src="js/smart-search.js?v=1.0.0"></script>  ← AGREGAR AQUÍ
   <script src="js/app.js?v=3.4.8"></script>

   El módulo se auto-inicializa y mejora el buscador existente sin modificar app.js.
   
   ✅ PASO 3 (OPCIONAL): Para integrar con el chatbot, en chatbot-widget.js,
   dentro de la función que prepara el contexto del sitio (getSiteContext),
   puedes agregar que el chatbot use chatbotSearchResources(query) para
   buscar recursos dinámicamente en las respuestas.

   ═══════════════════════════════════════════════════════════════════════════ */
