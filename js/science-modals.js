/* ═══════════════════════════════════════════════════════════════════════════════════════════════════
   🔬 FÍSICA INTERACTIVA - FUNCIONES PARA MODALES CIENTÍFICOS
   ═══════════════════════════════════════════════════════════════════════════════════════════════════
   
   📝 Este archivo contiene las funciones que renderizan el contenido de los modales de
   herramientas científicas. Las funciones se llaman automáticamente cuando se abre cada modal.
   
   📦 Requiere: science-data.js (datos de materiales, trigonometría, sistema solar, etc.)
   
   ═══════════════════════════════════════════════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════════════════════
// 🌡️ PROPIEDADES DE MATERIALES
// ═══════════════════════════════════════════════════════════════════════════
function renderMaterials(filter = '') {
    const container = document.getElementById('materials-body');
    if (!container || typeof MATERIALS_DB === 'undefined') return;

    let html = `
        <div class="mb-4">
            <input type="text" id="materials-search" placeholder="🔍 Buscar material..." 
                onkeyup="renderMaterials(this.value)"
                class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"
                value="${filter}">
        </div>
        <div class="overflow-x-auto">
            <table class="w-full text-xs border-collapse">
                <thead class="bg-amber-100 dark:bg-amber-900/50">
                    <tr>
                        <th class="p-2 text-left">Material</th>
                        <th class="p-2 text-center">Densidad<br><span class="font-normal">(kg/m³)</span></th>
                        <th class="p-2 text-center">Calor Esp.<br><span class="font-normal">(J/kg·K)</span></th>
                        <th class="p-2 text-center">Fusión<br><span class="font-normal">(°C)</span></th>
                        <th class="p-2 text-center">Ebullición<br><span class="font-normal">(°C)</span></th>
                        <th class="p-2 text-center">Dureza<br><span class="font-normal">(Mohs)</span></th>
                        <th class="p-2 text-center">Young<br><span class="font-normal">(GPa)</span></th>
                    </tr>
                </thead>
                <tbody>`;

    let currentCat = '';
    MATERIALS_DB.forEach(m => {
        if (m.n.toLowerCase().includes(filter.toLowerCase())) {
            if (m.cat !== currentCat) {
                html += `<tr><td colspan="7" class="bg-amber-100 dark:bg-amber-900/30 font-bold text-xs uppercase text-amber-700 dark:text-amber-300 py-2 pl-4">${m.cat}</td></tr>`;
                currentCat = m.cat;
            }
            html += `
                <tr class="hover:bg-amber-50 dark:hover:bg-slate-700/50 transition border-b border-slate-100 dark:border-slate-700">
                    <td class="p-2 font-bold text-slate-700 dark:text-slate-200">${m.n} <span class="text-xs text-slate-400">(${m.sym})</span></td>
                    <td class="p-2 font-mono text-center">${m.density}</td>
                    <td class="p-2 font-mono text-center">${m.specificHeat}</td>
                    <td class="p-2 font-mono text-center">${m.meltingPoint}</td>
                    <td class="p-2 font-mono text-center">${m.boilingPoint}</td>
                    <td class="p-2 font-mono text-center">${m.hardness}</td>
                    <td class="p-2 font-mono text-center">${m.youngModulus}</td>
                </tr>`;
        }
    });

    html += '</tbody></table></div>';
    container.innerHTML = html;
}

// ═══════════════════════════════════════════════════════════════════════════
// 🔺 IDENTIDADES TRIGONOMÉTRICAS
// ═══════════════════════════════════════════════════════════════════════════
function renderTrigIdentities() {
    const container = document.getElementById('trig-body');
    if (!container || typeof TRIG_IDENTITIES === 'undefined') return;

    let html = '';

    // Valores notables primero
    html += `
        <div class="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-xl">
            <h4 class="font-bold text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-2">
                <i class="fa-solid fa-table"></i> Valores Notables
            </h4>
            <div class="overflow-x-auto">
                <table class="w-full text-sm border-collapse bg-white dark:bg-slate-900 rounded-lg overflow-hidden">
                    <thead>
                        <tr class="bg-indigo-100 dark:bg-indigo-900/50">
                            <th class="p-2 border border-indigo-200 dark:border-slate-600">θ</th>
                            <th class="p-2 border border-indigo-200 dark:border-slate-600">sin θ</th>
                            <th class="p-2 border border-indigo-200 dark:border-slate-600">cos θ</th>
                            <th class="p-2 border border-indigo-200 dark:border-slate-600">tan θ</th>
                        </tr>
                    </thead>
                    <tbody>`;

    TRIG_IDENTITIES.valoresNotables.forEach(v => {
        html += `<tr class="text-center hover:bg-indigo-50 dark:hover:bg-slate-700"><td class="p-2 border font-bold">${v.angle}</td><td class="p-2 border font-mono">${v.sin}</td><td class="p-2 border font-mono">${v.cos}</td><td class="p-2 border font-mono">${v.tan}</td></tr>`;
    });
    html += '</tbody></table></div></div>';

    // Identidades por categoría
    const sections = [
        { key: 'fundamental', title: 'Identidades Fundamentales', icon: 'fa-infinity', color: 'emerald' },
        { key: 'sumaDiferencia', title: 'Suma y Diferencia de Ángulos', icon: 'fa-plus-minus', color: 'blue' },
        { key: 'anguloDoble', title: 'Ángulo Doble', icon: 'fa-angles-right', color: 'purple' },
        { key: 'anguloTriple', title: 'Ángulo Triple', icon: 'fa-3', color: 'indigo' },
        { key: 'medioAngulo', title: 'Medio Ángulo', icon: 'fa-divide', color: 'rose' },
        { key: 'productoSuma', title: 'Producto a Suma', icon: 'fa-xmark', color: 'amber' },
        { key: 'sumaProducto', title: 'Suma a Producto', icon: 'fa-plus', color: 'teal' },
        { key: 'cofunciones', title: 'Cofunciones', icon: 'fa-arrows-rotate', color: 'cyan' },
        { key: 'reduccion', title: 'Fórmulas de Reducción', icon: 'fa-compress', color: 'orange' },
        { key: 'leyesSenoCoseno', title: 'Leyes del Seno y Coseno', icon: 'fa-triangle', color: 'fuchsia' }
    ];

    sections.forEach(s => {
        if (!TRIG_IDENTITIES[s.key]) return;
        html += `
            <div class="mb-6">
                <h4 class="font-bold text-${s.color}-600 dark:text-${s.color}-400 mb-3 flex items-center gap-2">
                    <i class="fa-solid ${s.icon}"></i> ${s.title}
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">`;
        TRIG_IDENTITIES[s.key].forEach(f => {
            html += `
                <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600 hover:shadow-md transition">
                    <span class="text-xs font-bold text-slate-500 block mb-1">${f.name}</span>
                    <div class="text-lg text-slate-800 dark:text-slate-100">$${f.formula}$</div>
                </div>`;
        });
        html += '</div></div>';
    });

    container.innerHTML = html;
    if (window.MathJax) MathJax.typesetPromise();
}

// ═══════════════════════════════════════════════════════════════════════════
// 🌍 SISTEMA SOLAR
// ═══════════════════════════════════════════════════════════════════════════
function renderSolarSystem() {
    const container = document.getElementById('solar-body');
    if (!container || typeof SOLAR_SYSTEM_DB === 'undefined') return;

    let html = '';

    // Sol
    const s = SOLAR_SYSTEM_DB.sun;
    html += `
        <div class="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-xl mb-6">
            <div class="text-5xl">${s.symbol}</div>
            <div>
                <h4 class="font-bold text-xl text-orange-600">${s.name}</h4>
                <p class="text-xs text-slate-600 dark:text-slate-300">
                    Masa: ${s.mass} kg | Radio: ${s.radius.toLocaleString()} km | Temp. superficial: ${s.temp}°C | Tipo: ${s.spectralType}
                </p>
            </div>
        </div>`;

    // Título de Planetas
    html += `<h4 class="font-bold text-orange-600 dark:text-orange-400 mb-3 flex items-center gap-2">
        <i class="fa-solid fa-globe"></i> Planetas del Sistema Solar
    </h4>`;

    // Planetas
    html += '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">';
    SOLAR_SYSTEM_DB.planets.forEach(p => {
        html += `
            <div class="p-4 rounded-xl border-2 hover:shadow-lg transition" style="border-color:${p.color}; background: linear-gradient(135deg, ${p.color}20, transparent)">
                <div class="flex items-center gap-2 mb-2">
                    <span class="text-2xl">${p.symbol}</span>
                    <span class="font-bold text-slate-800 dark:text-white">${p.name}</span>
                </div>
                <div class="text-[10px] space-y-1 text-slate-600 dark:text-slate-300">
                    <p>📏 Radio: <b>${p.radius.toLocaleString()} km</b></p>
                    <p>⚖️ Masa: <b>${p.mass} kg</b></p>
                    <p>🌡️ Temp. media: <b>${p.temp}°C</b></p>
                    <p>🪐 Lunas: <b>${p.moons}</b></p>
                    <p>⏱️ Período orbital: <b>${p.orbitalPeriod} días</b></p>
                    <p>🌍 Gravedad: <b>${p.gravity} m/s²</b></p>
                    <p>📍 Dist. al Sol: <b>${p.distSun} mill. km</b></p>
                </div>
            </div>`;
    });
    html += '</div>';

    // Título de Lunas
    html += `<h4 class="font-bold text-slate-600 dark:text-slate-400 mb-3 flex items-center gap-2">
        <i class="fa-solid fa-moon"></i> Principales Lunas del Sistema Solar
    </h4>`;

    // Lunas
    html += `
        <div class="overflow-x-auto">
            <table class="w-full text-xs">
                <thead class="bg-slate-100 dark:bg-slate-800">
                    <tr>
                        <th class="p-2 text-left">Luna</th>
                        <th class="p-2">Planeta</th>
                        <th class="p-2">Radio (km)</th>
                        <th class="p-2">Masa (kg)</th>
                        <th class="p-2">Distancia</th>
                        <th class="p-2">Período (días)</th>
                    </tr>
                </thead>
                <tbody>`;
    SOLAR_SYSTEM_DB.moons.forEach(m => {
        html += `
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-700 border-b">
                <td class="p-2 font-bold">${m.name}</td>
                <td class="p-2 text-center">${m.planet}</td>
                <td class="p-2 font-mono text-center">${m.radius}</td>
                <td class="p-2 font-mono text-center">${m.mass}</td>
                <td class="p-2 font-mono text-center">${m.distPlanet.toLocaleString()} km</td>
                <td class="p-2 font-mono text-center">${m.orbitalPeriod}</td>
            </tr>`;
    });
    html += '</tbody></table></div>';

    container.innerHTML = html;
}

// ═══════════════════════════════════════════════════════════════════════════
// ⚛️ PARTÍCULAS SUBATÓMICAS
// ═══════════════════════════════════════════════════════════════════════════
function renderParticles() {
    const container = document.getElementById('particles-body');
    if (!container || typeof PARTICLES_DB === 'undefined') return;

    let html = `
        <div class="overflow-x-auto">
            <table class="w-full text-xs border-collapse">
                <thead class="bg-purple-100 dark:bg-purple-900/50">
                    <tr>
                        <th class="p-2 text-left">Partícula</th>
                        <th class="p-2 text-center">Símbolo</th>
                        <th class="p-2 text-center">Masa</th>
                        <th class="p-2 text-center">Carga</th>
                        <th class="p-2 text-center">Spin</th>
                        <th class="p-2 text-left">Antipartícula</th>
                    </tr>
                </thead>
                <tbody>`;

    const catColors = { Leptones: 'purple', Bariones: 'blue', Quarks: 'emerald', Bosones: 'rose' };
    let currentCat = '';

    PARTICLES_DB.forEach(p => {
        if (p.cat !== currentCat) {
            const c = catColors[p.cat] || 'slate';
            html += `<tr><td colspan="6" class="bg-${c}-100 dark:bg-${c}-900/30 font-bold text-xs uppercase text-${c}-700 dark:text-${c}-300 py-2 pl-4">${p.cat}</td></tr>`;
            currentCat = p.cat;
        }
        html += `
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition border-b border-slate-100 dark:border-slate-700">
                <td class="p-2 font-bold text-slate-700 dark:text-slate-200">${p.name}</td>
                <td class="p-2 font-mono text-center text-lg text-indigo-600 dark:text-indigo-400">${p.symbol}</td>
                <td class="p-2 font-mono text-xs">${p.mass}</td>
                <td class="p-2 font-mono text-center font-bold ${p.charge.includes('+') ? 'text-red-500' : p.charge.includes('-') ? 'text-blue-500' : 'text-slate-400'}">${p.charge}</td>
                <td class="p-2 font-mono text-center">${p.spin}</td>
                <td class="p-2 text-xs text-slate-500">${p.antiparticle}</td>
            </tr>`;
    });

    html += '</tbody></table></div>';
    container.innerHTML = html;
}

// ═══════════════════════════════════════════════════════════════════════════
// 🎨 ESPECTRO ELECTROMAGNÉTICO
// ═══════════════════════════════════════════════════════════════════════════
function renderSpectrum() {
    const container = document.getElementById('spectrum-body');
    if (!container || typeof EM_SPECTRUM === 'undefined') return;

    let html = '';

    // Título de espectro principal
    html += `<h4 class="font-bold text-rose-600 dark:text-rose-400 mb-3 flex items-center gap-2">
        <i class="fa-solid fa-wave-square"></i> Bandas del Espectro Electromagnético
    </h4>`;

    // Espectro principal
    html += '<div class="space-y-2 mb-6">';
    EM_SPECTRUM.forEach(s => {
        const isGradient = s.color.includes('gradient');
        html += `
            <div class="p-3 rounded-lg border-l-4 hover:shadow-md transition" style="border-color:${isGradient ? '#FF0000' : s.color}; background:${isGradient ? s.color : s.color + '20'}">
                <div class="flex justify-between items-center mb-1">
                    <span class="font-bold text-slate-800 dark:text-white">${s.name}</span>
                    <span class="text-[10px] bg-white/80 dark:bg-slate-800 px-2 py-1 rounded">${s.energy}</span>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px] text-slate-600 dark:text-slate-300">
                    <div><b>λ:</b> ${s.lambdaMin} - ${s.lambdaMax}</div>
                    <div><b>f:</b> ${s.freqMin} - ${s.freqMax}</div>
                    <div class="col-span-2"><b>Usos:</b> ${s.applications}</div>
                </div>
            </div>`;
    });
    html += '</div>';

    // Espectro visible - solo si VISIBLE_SPECTRUM existe
    if (typeof VISIBLE_SPECTRUM !== 'undefined') {
        html += `<h4 class="font-bold text-rose-600 dark:text-rose-400 mb-3 flex items-center gap-2">
            <i class="fa-solid fa-eye"></i> Espectro Visible (380-700 nm)
        </h4>`;

        html += '<div class="flex rounded-lg overflow-hidden h-12 mb-4">';
        VISIBLE_SPECTRUM.forEach(c => {
            html += `<div class="flex-1 flex items-center justify-center text-white text-[10px] font-bold" style="background:${c.hex}" title="${c.color}: ${c.lambdaMin}-${c.lambdaMax} nm">${c.color}</div>`;
        });
        html += '</div>';

        html += '<div class="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6">';
        VISIBLE_SPECTRUM.forEach(c => {
            html += `<div class="p-2 rounded text-center text-[10px]" style="background:${c.hex}20; border:2px solid ${c.hex}"><b>${c.color}</b><br>${c.lambdaMin}-${c.lambdaMax} nm<br>${c.freq}</div>`;
        });
        html += '</div>';
    }

    // Espectros de emisión - solo si EMISSION_SPECTRA existe
    if (typeof EMISSION_SPECTRA !== 'undefined') {
        html += `<h4 class="font-bold text-rose-600 dark:text-rose-400 mb-3 flex items-center gap-2">
            <i class="fa-solid fa-fire"></i> Espectros de Emisión de Elementos
        </h4>`;

        html += '<div class="space-y-4">';
        EMISSION_SPECTRA.forEach(e => {
            html += `
                <div class="p-3 bg-slate-900 rounded-lg">
                    <div class="flex justify-between items-center mb-2">
                        <span class="font-bold text-white">${e.element} <span class="text-slate-400">(${e.symbol})</span></span>
                        <span class="text-[10px] text-slate-400">${e.series}</span>
                    </div>
                    <div class="relative h-8 bg-black rounded flex items-center">`;
            e.lines.forEach((l, i) => {
                const pos = ((l - 380) / (700 - 380)) * 100;
                html += `<div class="absolute h-full w-1" style="left:${pos}%; background:${e.colors[i]}" title="${l} nm"></div>`;
            });
            html += `</div><div class="flex flex-wrap gap-1 mt-2">`;
            e.lines.forEach((l, i) => {
                html += `<span class="text-[9px] px-1 rounded" style="background:${e.colors[i]}; color:${l > 550 ? 'black' : 'white'}">${l} nm</span>`;
            });
            html += '</div></div>';
        });
        html += '</div>';
    }

    container.innerHTML = html;
}

// ═══════════════════════════════════════════════════════════════════════════
// 📐 MANUAL DE FÓRMULAS DE FÍSICA
// ═══════════════════════════════════════════════════════════════════════════
let currentFormulaCategory = 'all';

function renderFormulas(category = 'all') {
    currentFormulaCategory = category;
    const container = document.getElementById('formulas-body');
    if (!container || typeof PHYSICS_FORMULAS === 'undefined') return;

    let html = '';

    // Tabs de navegación
    html += '<div class="flex flex-wrap gap-2 mb-4 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-x-auto">';
    html += `<button onclick="renderFormulas('all')" class="px-3 py-1 text-xs font-bold rounded whitespace-nowrap ${category === 'all' ? 'bg-indigo-500 text-white' : 'bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'}">📚 Todas</button>`;
    Object.keys(PHYSICS_FORMULAS).forEach(key => {
        const f = PHYSICS_FORMULAS[key];
        const isActive = category === key;
        html += `<button onclick="renderFormulas('${key}')" class="px-3 py-1 text-xs font-bold rounded whitespace-nowrap ${isActive ? 'bg-indigo-500 text-white' : 'bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'}">${f.title}</button>`;
    });
    html += '</div>';

    // Contenido
    html += '<div class="formulas-content">';
    const categories = category === 'all' ? Object.keys(PHYSICS_FORMULAS) : [category];

    categories.forEach(key => {
        const cat = PHYSICS_FORMULAS[key];
        if (!cat) return;

        html += `
            <div class="mb-6">
                <h3 class="font-bold text-lg text-indigo-700 dark:text-indigo-400 mb-3 border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
                    ${cat.title}
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">`;

        cat.formulas.forEach(f => {
            html += `
                <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600 hover:shadow-md hover:border-indigo-300 transition">
                    <div class="flex justify-between items-start mb-2">
                        <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400">${f.name}</span>
                    </div>
                    <div class="text-lg text-slate-800 dark:text-slate-100 mb-1">$${f.formula}$</div>
                    <p class="text-[10px] text-slate-500 dark:text-slate-400">${f.vars}</p>
                </div>`;
        });
        html += '</div></div>';
    });
    html += '</div>';

    container.innerHTML = html;
    if (window.MathJax) MathJax.typesetPromise();
}

// ═══════════════════════════════════════════════════════════════════════════
// 🔧 EXTENDER LA FUNCIÓN openModal PARA CARGAR CONTENIDO DINÁMICAMENTE
// ═══════════════════════════════════════════════════════════════════════════
const originalOpenModal = window.openModal;
window.openModal = function (id) {
    // Primero intentamos llamar al openModal original si existe
    if (typeof originalOpenModal === 'function') {
        originalOpenModal(id);
    } else {
        // Si no existe, simplemente mostramos el modal
        document.getElementById(id)?.classList.remove('hidden');
    }

    // Crear iconos de Lucide para botón cerrar
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Llamar funciones de renderizado específicas según el modal
    switch (id) {
        case 'modal-materials':
            renderMaterials();
            break;
        case 'modal-trig':
            renderTrigIdentities();
            break;
        case 'modal-solar':
            renderSolarSystem();
            break;
        case 'modal-particles':
            renderParticles();
            break;
        case 'modal-spectrum':
            renderSpectrum();
            break;
        case 'modal-formulas':
            renderFormulas(currentFormulaCategory);
            break;
        case 'modal-constants':
            if (typeof renderConstants === 'function') renderConstants();
            break;
        case 'modal-si':
            if (typeof initSIPrefixes === 'function') initSIPrefixes();
            break;
    }
};

// ═══════════════════════════════════════════════════════════════════════════
// ✅ CONFIRMACIÓN DE CARGA
// ═══════════════════════════════════════════════════════════════════════════
console.log("✅ Funciones de modales científicos cargadas correctamente");
