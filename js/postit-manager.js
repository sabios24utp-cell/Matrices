/* ═══════════════════════════════════════════════════════════════════════════════
   📌 POST-IT MANAGER v1.0 - Sistema de Notas Interactivas Premium
   ═══════════════════════════════════════════════════════════════════════════════
   🎓 Autor: Msc. Néstor Fabio Montoya Palacios
   🏫 Física Interactiva - I.E. María Auxiliadora, Cartago
   📅 Marzo 2026
   
   ✨ Características:
      • Arrastrar (drag) con soporte táctil
      • Redimensionar con handle elegante en esquina inferior-derecha
      • Minimizar / Maximizar / Restaurar / Cerrar
      • Modo dual: Grid ordenado ↔ Modo libre (ventanas flotantes)
      • Botón "Organizar" para reacomodar en cascada
      • Z-index dinámico (la nota activa va al frente)
      • Persistencia en localStorage
      • Compatible desktop + móvil
   ═══════════════════════════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════
    // ⚙️ CONFIGURACIÓN
    // ═══════════════════════════════════════════════════════════════════════
    const PM_STORAGE_KEY = 'pm_postits_state';
    const PM_MODE_KEY = 'pm_view_mode';
    const PM_MIN_WIDTH = 180;
    const PM_MIN_HEIGHT = 120;
    const PM_DEFAULT_WIDTH = 260;
    const PM_DEFAULT_HEIGHT = 180;
    const PM_MAX_POSTITS = 12;
    const PM_TITLEBAR_H = 32;

    let pmZIndex = 100000;
    let pmActiveEl = null;
    let pmAction = null; // 'drag' | 'resize'
    let pmStartData = {};
    let pmHasMoved = false;
    let pmPostItCounter = 0;
    let pmViewMode = 'grid'; // 'grid' | 'free'
    let pmInitialized = false;

    // ═══════════════════════════════════════════════════════════════════════
    // 🎨 CSS INYECTADO
    // ═══════════════════════════════════════════════════════════════════════
    function injectPMStyles() {
        if (document.getElementById('pm-styles')) return;
        const style = document.createElement('style');
        style.id = 'pm-styles';
        style.textContent = `
/* ═══ POST-IT MANAGER - ESTILOS ═══ */

/* Contenedor del sistema */
#pm-toolbar {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
}
.pm-tool-btn {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 5px 12px;
    border-radius: 10px;
    border: 1.5px solid rgba(99,102,241,.25);
    background: rgba(255,255,255,.65);
    backdrop-filter: blur(8px);
    font-family: 'Nunito', sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: #6366f1;
    cursor: pointer;
    transition: all .25s cubic-bezier(.34,1.56,.64,1);
    white-space: nowrap;
}
.pm-tool-btn:hover {
    background: rgba(99,102,241,.12);
    border-color: rgba(99,102,241,.5);
    transform: translateY(-1px) scale(1.03);
    box-shadow: 0 4px 15px rgba(99,102,241,.15);
}
.pm-tool-btn:active { transform: scale(.97); }
.pm-tool-btn.active {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: #fff;
    border-color: transparent;
    box-shadow: 0 4px 18px rgba(99,102,241,.35);
}
.dark .pm-tool-btn {
    background: rgba(30,41,59,.7);
    border-color: rgba(99,102,241,.3);
    color: #a5b4fc;
}
.dark .pm-tool-btn:hover {
    background: rgba(99,102,241,.2);
}
.dark .pm-tool-btn.active {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: #fff;
}

/* ═══ POST-IT (MODO LIBRE) ═══ */
.pm-postit {
    position: absolute;
    display: flex;
    flex-direction: column;
    border-radius: 6px 6px 14px 6px;
    overflow: hidden;
    box-shadow:
        0 4px 20px rgba(0,0,0,.08),
        0 1px 4px rgba(0,0,0,.06),
        inset 0 1px 0 rgba(255,255,255,.4);
    font-family: 'Nunito', sans-serif;
    transition: box-shadow .3s, opacity .3s;
    animation: pmSlideIn .4s cubic-bezier(.34,1.56,.64,1);
    user-select: none;
    -webkit-user-select: none;
}
.pm-postit:hover {
    box-shadow:
        0 8px 32px rgba(0,0,0,.12),
        0 2px 8px rgba(0,0,0,.08),
        inset 0 1px 0 rgba(255,255,255,.5);
}
.pm-postit.pm-dragging {
    opacity: .88;
    box-shadow: 0 16px 48px rgba(0,0,0,.2), 0 4px 12px rgba(0,0,0,.1);
    transition: none !important;
}

@keyframes pmSlideIn {
    from { opacity: 0; transform: scale(.85) translateY(15px) rotate(-2deg); }
    to   { opacity: 1; transform: scale(1) translateY(0) rotate(0deg); }
}

/* ═══ COLORES ═══ */
.pm-c-yellow  { background: linear-gradient(145deg, #fff9c4, #fff176); }
.pm-c-blue    { background: linear-gradient(145deg, #bbdefb, #90caf9); }
.pm-c-green   { background: linear-gradient(145deg, #c8e6c9, #a5d6a7); }
.pm-c-pink    { background: linear-gradient(145deg, #f8bbd0, #f48fb1); }
.pm-c-orange  { background: linear-gradient(145deg, #ffe0b2, #ffcc80); }
.pm-c-purple  { background: linear-gradient(145deg, #e1bee7, #ce93d8); }
.pm-c-cyan    { background: linear-gradient(145deg, #b2ebf2, #80deea); }
.pm-c-red     { background: linear-gradient(145deg, #ffcdd2, #ef9a9a); }

.dark .pm-c-yellow  { background: linear-gradient(145deg, #6d6200, #544b00); color: #fff9c4; }
.dark .pm-c-blue    { background: linear-gradient(145deg, #0d47a1, #1565c0); color: #bbdefb; }
.dark .pm-c-green   { background: linear-gradient(145deg, #1b5e20, #2e7d32); color: #c8e6c9; }
.dark .pm-c-pink    { background: linear-gradient(145deg, #880e4f, #ad1457); color: #f8bbd0; }
.dark .pm-c-orange  { background: linear-gradient(145deg, #bf360c, #e65100); color: #ffe0b2; }
.dark .pm-c-purple  { background: linear-gradient(145deg, #4a148c, #6a1b9a); color: #e1bee7; }
.dark .pm-c-cyan    { background: linear-gradient(145deg, #006064, #00838f); color: #b2ebf2; }
.dark .pm-c-red     { background: linear-gradient(145deg, #b71c1c, #c62828); color: #ffcdd2; }

/* ═══ BARRA DE TÍTULO ═══ */
.pm-titlebar {
    height: ${PM_TITLEBAR_H}px;
    display: flex;
    align-items: center;
    padding: 0 6px 0 10px;
    gap: 6px;
    cursor: grab;
    flex-shrink: 0;
    background: rgba(0,0,0,.06);
    border-bottom: 1px solid rgba(0,0,0,.06);
    position: relative;
    touch-action: manipulation;
}
.pm-titlebar:active { cursor: grabbing; }

.pm-title-text {
    flex: 1;
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: .6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    opacity: .7;
    pointer-events: none;
}

/* Botones de control de ventana */
.pm-wctl {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
}
.pm-wbtn {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 800;
    transition: all .2s cubic-bezier(.34,1.56,.64,1);
    background: rgba(0,0,0,.08);
    color: rgba(0,0,0,.5);
    font-family: 'Nunito', system-ui;
    line-height: 1;
    padding: 0;
    /* Touch target más grande que el botón visual */
    position: relative;
    z-index: 5;
    -webkit-tap-highlight-color: rgba(0,0,0,.1);
    touch-action: manipulation;
}
.pm-wbtn:hover { transform: scale(1.25); }
.pm-wbtn-min:hover { background: #fbbf24; color: #78350f; box-shadow: 0 2px 8px rgba(251,191,36,.4); }
.pm-wbtn-max:hover { background: #34d399; color: #064e3b; box-shadow: 0 2px 8px rgba(52,211,153,.4); }
.pm-wbtn-rst:hover { background: #60a5fa; color: #1e3a5f; box-shadow: 0 2px 8px rgba(96,165,250,.4); }
.pm-wbtn-cls:hover { background: #f87171; color: #7f1d1d; box-shadow: 0 2px 8px rgba(248,113,113,.4); }
.pm-wbtn-flt:hover { background: #a78bfa; color: #2e1065; box-shadow: 0 2px 8px rgba(167,139,250,.4); }
.pm-wbtn-exp:hover { background: #2dd4bf; color: #042f2e; box-shadow: 0 2px 8px rgba(45,212,191,.4); }

/* Export dropdown */
.pm-export-menu {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 4px;
    background: rgba(255,255,255,.97);
    backdrop-filter: blur(12px);
    border-radius: 10px;
    box-shadow: 0 8px 28px rgba(0,0,0,.15), 0 0 0 1px rgba(0,0,0,.04);
    padding: 4px;
    z-index: 100080;
    min-width: 130px;
    animation: pmPopIn .2s ease;
    font-family: 'Nunito', sans-serif;
}
.dark .pm-export-menu { background: rgba(30,41,59,.97); box-shadow: 0 8px 28px rgba(0,0,0,.4); }
.pm-export-opt {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 12px;
    border-radius: 7px;
    border: none;
    background: none;
    width: 100%;
    font-family: inherit;
    font-size: 11px;
    font-weight: 700;
    color: #334155;
    cursor: pointer;
    transition: all .15s;
}
.dark .pm-export-opt { color: #cbd5e1; }
.pm-export-opt:hover { background: rgba(99,102,241,.1); color: #6366f1; }
.pm-export-opt i { width: 14px; text-align: center; font-size: 12px; }

/* Floating post-it (detached from grid) */
.pm-postit.pm-floating {
    position: fixed !important;
    z-index: 100040 !important;
    box-shadow: 0 12px 40px rgba(0,0,0,.18), 0 2px 8px rgba(0,0,0,.1), inset 0 1px 0 rgba(255,255,255,.5) !important;
}
.pm-postit.pm-floating .pm-titlebar { cursor: grab; }
.pm-postit.pm-floating .pm-resize-handle { display: flex !important; }

.dark .pm-wbtn { background: rgba(255,255,255,.1); color: rgba(255,255,255,.5); }

/* ═══ CONTENIDO ═══ */
.pm-body {
    flex: 1;
    overflow: auto;
    padding: 10px 12px;
    font-size: 12px;
    line-height: 1.55;
    min-height: 0;
}
.pm-body::-webkit-scrollbar { width: 3px; }
.pm-body::-webkit-scrollbar-thumb { background: rgba(0,0,0,.12); border-radius: 4px; }

.pm-body a { color: inherit; text-decoration: underline; font-weight: 700; }
.pm-body a:hover { opacity: .7; }

/* ═══ HANDLE DE REDIMENSIONAMIENTO ═══ */
.pm-resize-handle {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 22px;
    height: 22px;
    cursor: nwse-resize;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px 0 12px 0;
    background: rgba(0,0,0,.04);
    transition: all .25s;
    z-index: 2;
}
.pm-resize-handle:hover {
    background: rgba(99,102,241,.15);
    transform: scale(1.15);
}
.pm-resize-handle::before {
    content: '';
    width: 8px;
    height: 8px;
    background-image:
        linear-gradient(135deg, transparent 40%, rgba(0,0,0,.2) 40%, rgba(0,0,0,.2) 46%, transparent 46%),
        linear-gradient(135deg, transparent 60%, rgba(0,0,0,.2) 60%, rgba(0,0,0,.2) 66%, transparent 66%),
        linear-gradient(135deg, transparent 80%, rgba(0,0,0,.2) 80%, rgba(0,0,0,.2) 86%, transparent 86%);
    display: block;
}
.dark .pm-resize-handle::before {
    background-image:
        linear-gradient(135deg, transparent 40%, rgba(255,255,255,.25) 40%, rgba(255,255,255,.25) 46%, transparent 46%),
        linear-gradient(135deg, transparent 60%, rgba(255,255,255,.25) 60%, rgba(255,255,255,.25) 66%, transparent 66%),
        linear-gradient(135deg, transparent 80%, rgba(255,255,255,.25) 80%, rgba(255,255,255,.25) 86%, transparent 86%);
}

/* ═══ ESTADO MINIMIZADO ═══ */
.pm-postit.pm-minimized {
    height: ${PM_TITLEBAR_H}px !important;
    min-height: ${PM_TITLEBAR_H}px !important;
    overflow: hidden;
    border-radius: 8px;
}
.pm-postit.pm-minimized .pm-body,
.pm-postit.pm-minimized .pm-resize-handle { display: none; }
.pm-postit.pm-minimized .pm-titlebar { cursor: grab; border-bottom: none; }

/* ═══ ESTADO MAXIMIZADO ═══ */
.pm-postit.pm-maximized {
    position: fixed !important;
    left: 0 !important;
    top: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    max-height: none !important;
    min-height: auto !important;
    border-radius: 0 !important;
    z-index: 100050 !important;
}
.pm-postit.pm-maximized .pm-resize-handle { display: none; }
.pm-postit.pm-maximized .pm-titlebar { cursor: default; }
/* Asegurar que maximized gane sobre grid-mode */
.pm-grid-mode .pm-postit.pm-maximized {
    position: fixed !important;
    left: 0 !important;
    top: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    max-height: none !important;
}

/* ═══ CONTENEDOR EN MODO GRID ═══ */
.pm-grid-mode {
    display: grid !important;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
    position: relative !important;
}
.pm-grid-mode .pm-postit {
    position: relative !important;
    left: auto !important;
    top: auto !important;
    width: auto !important;
    height: auto !important;
    min-height: 140px;
    max-height: 300px;
}
.pm-grid-mode .pm-postit .pm-titlebar { cursor: default; }
.pm-grid-mode .pm-postit .pm-resize-handle { display: none; }
.pm-grid-mode .pm-postit.pm-minimized {
    min-height: ${PM_TITLEBAR_H}px !important;
    max-height: ${PM_TITLEBAR_H}px !important;
}

/* ═══ BARRA DE MINIMIZADOS ═══ */
#pm-minimized-bar {
    position: fixed;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 6px;
    z-index: 100060;
    max-width: 90vw;
    overflow-x: auto;
    padding: 4px 8px;
    border-radius: 12px;
    background: rgba(255,255,255,.75);
    backdrop-filter: blur(12px);
    box-shadow: 0 4px 20px rgba(0,0,0,.1);
    border: 1px solid rgba(255,255,255,.3);
}
#pm-minimized-bar:empty { display: none; }
.dark #pm-minimized-bar {
    background: rgba(15,23,42,.8);
    border-color: rgba(255,255,255,.08);
}

.pm-mintab {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 4px 10px;
    border-radius: 8px;
    border: 1.5px solid rgba(0,0,0,.06);
    font-family: 'Nunito', sans-serif;
    font-size: 10px;
    font-weight: 700;
    cursor: pointer;
    transition: all .2s;
    white-space: nowrap;
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
}
.pm-mintab:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,.1);
}

/* ═══ BOTÓN "NUEVA NOTA" ═══ */
.pm-add-btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border-radius: 8px;
    border: 2px dashed rgba(99,102,241,.3);
    background: transparent;
    font-family: 'Nunito', sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: #6366f1;
    cursor: pointer;
    transition: all .25s;
}
.pm-add-btn:hover {
    background: rgba(99,102,241,.08);
    border-color: rgba(99,102,241,.5);
    transform: scale(1.05);
}
.dark .pm-add-btn { color: #a5b4fc; border-color: rgba(165,180,252,.3); }

/* ═══ TOOLTIP NUEVA NOTA ═══ */
#pm-new-note-popup {
    position: fixed;
    z-index: 100070;
    background: rgba(255,255,255,.97);
    backdrop-filter: blur(14px);
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0 12px 40px rgba(0,0,0,.15), 0 0 0 1px rgba(0,0,0,.04);
    width: 280px;
    animation: pmPopIn .3s cubic-bezier(.34,1.56,.64,1);
    font-family: 'Nunito', sans-serif;
}
.dark #pm-new-note-popup {
    background: rgba(30,41,59,.97);
    box-shadow: 0 12px 40px rgba(0,0,0,.4), 0 0 0 1px rgba(255,255,255,.06);
}
@keyframes pmPopIn {
    from { opacity: 0; transform: scale(.9) translateY(5px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
}
#pm-new-note-popup label {
    display: block;
    font-size: 9px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #64748b;
    margin-bottom: 4px;
}
.dark #pm-new-note-popup label { color: #94a3b8; }
#pm-new-note-popup input,
#pm-new-note-popup textarea {
    width: 100%;
    padding: 7px 10px;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    font-family: 'Nunito', sans-serif;
    font-size: 12px;
    outline: none;
    margin-bottom: 10px;
    transition: border-color .2s;
    background: #fff;
    color: #1e293b;
}
.dark #pm-new-note-popup input,
.dark #pm-new-note-popup textarea {
    background: #1e293b;
    border-color: #334155;
    color: #e2e8f0;
}
#pm-new-note-popup input:focus,
#pm-new-note-popup textarea:focus { border-color: #6366f1; }

.pm-color-pick {
    display: flex;
    gap: 6px;
    margin-bottom: 12px;
    flex-wrap: wrap;
}
.pm-cpick {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2.5px solid transparent;
    cursor: pointer;
    transition: all .2s cubic-bezier(.34,1.56,.64,1);
}
.pm-cpick:hover { transform: scale(1.25); }
.pm-cpick.sel { border-color: #1e293b; box-shadow: 0 2px 10px rgba(0,0,0,.2); transform: scale(1.15); }
.dark .pm-cpick.sel { border-color: #f1f5f9; }

.pm-popup-actions {
    display: flex;
    gap: 6px;
    justify-content: flex-end;
}
.pm-popup-btn {
    padding: 6px 16px;
    border-radius: 10px;
    border: none;
    font-family: 'Nunito', sans-serif;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
    transition: all .2s;
}
.pm-popup-btn-primary {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: #fff;
    box-shadow: 0 3px 12px rgba(99,102,241,.3);
}
.pm-popup-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 5px 18px rgba(99,102,241,.4); }
.pm-popup-btn-cancel {
    background: #f1f5f9;
    color: #64748b;
}
.dark .pm-popup-btn-cancel { background: #334155; color: #94a3b8; }
.pm-popup-btn-cancel:hover { background: #e2e8f0; }
.dark .pm-popup-btn-cancel:hover { background: #475569; }

/* ═══ BADGE FUENTE (chatbot, manual, noticia) ═══ */
.pm-source-badge {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    padding: 1px 7px;
    border-radius: 6px;
    font-size: 8px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: .5px;
    opacity: .7;
    pointer-events: none;
    margin-right: auto;
    flex-shrink: 0;
}
.pm-badge-chatbot {
    background: rgba(99,102,241,.15);
    color: #6366f1;
}
.pm-badge-news {
    background: rgba(239,68,68,.12);
    color: #ef4444;
}
.pm-badge-user {
    background: rgba(16,185,129,.12);
    color: #10b981;
}
.dark .pm-badge-chatbot { background: rgba(129,140,248,.2); color: #a5b4fc; }
.dark .pm-badge-news { background: rgba(248,113,113,.15); color: #fca5a5; }
.dark .pm-badge-user { background: rgba(52,211,153,.15); color: #6ee7b7; }

/* ═══ CATEGORY ICON (tipo de nota) ═══ */
.pm-cat-icon {
    width: 16px;
    height: 16px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
    flex-shrink: 0;
    background: rgba(0,0,0,.08);
}
.dark .pm-cat-icon { background: rgba(255,255,255,.1); }

/* ═══ RESPONSIVE ═══ */
@media (max-width: 640px) {
    .pm-grid-mode {
        grid-template-columns: 1fr !important;
    }
    .pm-postit.pm-maximized {
        border-radius: 0 !important;
    }
    .pm-tool-btn { font-size: 10px; padding: 4px 8px; }
    .pm-tool-btn .pm-btn-label { display: none; }
}
@media (min-width: 641px) and (max-width: 1024px) {
    .pm-grid-mode {
        grid-template-columns: repeat(2, 1fr) !important;
    }
}
`;
        document.head.appendChild(style);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 🏗️ INYECTAR TOOLBAR EN EL DASHBOARD
    // ═══════════════════════════════════════════════════════════════════════
    function injectToolbar() {
        const newsHeader = document.querySelector('#welcome-dashboard .lg\\:col-span-2 .flex.justify-between');
        if (!newsHeader || document.getElementById('pm-toolbar')) return;

        const toolbar = document.createElement('div');
        toolbar.id = 'pm-toolbar';
        toolbar.innerHTML = `
            <button class="pm-tool-btn ${pmViewMode === 'grid' ? 'active' : ''}" data-mode="grid" title="Vista Cuadrícula">
                <i class="fa-solid fa-grip"></i><span class="pm-btn-label">Grid</span>
            </button>
            <button class="pm-tool-btn ${pmViewMode === 'free' ? 'active' : ''}" data-mode="free" title="Vista Libre (ventanas)">
                <i class="fa-solid fa-window-restore"></i><span class="pm-btn-label">Libre</span>
            </button>
            <button class="pm-tool-btn" data-action="organize" title="Organizar en cascada">
                <i class="fa-solid fa-layer-group"></i><span class="pm-btn-label">Organizar</span>
            </button>
            <button class="pm-add-btn" data-action="new" title="Nueva nota">
                <i class="fa-solid fa-plus"></i><span class="pm-btn-label">Nota</span>
            </button>
        `;

        // Insertar después del botón de refresh
        const refreshBtn = newsHeader.querySelector('button[onclick*="fetchMultiSourceNews"]');
        if (refreshBtn) {
            refreshBtn.parentElement.insertBefore(toolbar, refreshBtn);
        } else {
            newsHeader.appendChild(toolbar);
        }

        // Events
        toolbar.querySelectorAll('[data-mode]').forEach(btn => {
            btn.addEventListener('click', () => switchMode(btn.dataset.mode));
        });
        toolbar.querySelector('[data-action="organize"]').addEventListener('click', organizeCascade);
        toolbar.querySelector('[data-action="new"]').addEventListener('click', (e) => showNewNotePopup(e));
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 📝 CREAR POST-IT
    // ═══════════════════════════════════════════════════════════════════════
    const PM_COLORS = ['yellow', 'blue', 'green', 'pink', 'orange', 'purple', 'cyan', 'red'];

    function createPostIt(opts = {}) {
        const container = getContainer();
        if (!container) return null;

        const existing = container.querySelectorAll('.pm-postit');
        if (existing.length >= PM_MAX_POSTITS) {
            existing[0].remove();
        }

        const id = 'pm-' + (++pmPostItCounter) + '-' + Date.now();
        const color = opts.color || PM_COLORS[Math.floor(Math.random() * PM_COLORS.length)];
        const title = opts.title || 'Nota';
        const content = opts.content || '';
        const w = opts.width || PM_DEFAULT_WIDTH;
        const h = opts.height || PM_DEFAULT_HEIGHT;
        const source = opts.source || 'user'; // 'chatbot' | 'news' | 'user'

        // Determinar badge e icono según fuente
        const badgeMap = {
            chatbot: { cls: 'pm-badge-chatbot', icon: 'fa-solid fa-robot', label: 'Tutor IA' },
            news:    { cls: 'pm-badge-news',    icon: 'fa-solid fa-newspaper', label: 'Noticia' },
            user:    { cls: 'pm-badge-user',     icon: 'fa-solid fa-user-pen', label: 'Mi nota' }
        };
        const badge = badgeMap[source] || badgeMap.user;

        // Icono de categoría según color
        const catIconMap = {
            yellow: 'fa-solid fa-clipboard-list',    // resúmenes
            blue:   'fa-solid fa-square-root-variable', // fórmulas
            green:  'fa-solid fa-book-open',          // definiciones
            pink:   'fa-solid fa-lightbulb',          // datos curiosos
            orange: 'fa-solid fa-calculator',         // soluciones
            purple: 'fa-solid fa-bookmark',           // lecturas
            cyan:   'fa-solid fa-wand-magic-sparkles',// tips
            red:    'fa-solid fa-triangle-exclamation' // advertencias
        };
        const catIcon = catIconMap[color] || 'fa-solid fa-note-sticky';

        const el = document.createElement('div');
        el.id = id;
        el.className = `pm-postit pm-c-${color}`;
        el.dataset.pmColor = color;
        el.dataset.pmState = 'normal';
        el.dataset.pmPrevGeom = '';
        el.dataset.pmSource = source;

        if (pmViewMode === 'free') {
            el.style.left = opts.left || (60 + Math.random() * 180) + 'px';
            el.style.top = opts.top || (40 + Math.random() * 120) + 'px';
            el.style.width = w + 'px';
            el.style.height = h + 'px';
            el.style.zIndex = ++pmZIndex;
        }

        el.innerHTML = `
            <div class="pm-titlebar">
                <div class="pm-cat-icon" title="${color}"><i class="${catIcon}"></i></div>
                <span class="pm-title-text">${escHtml(title)}</span>
                <span class="pm-source-badge ${badge.cls}"><i class="${badge.icon}" style="font-size:7px"></i> ${badge.label}</span>
                <div class="pm-wctl">
                    <button class="pm-wbtn pm-wbtn-exp" title="Exportar (PNG/PDF)" data-act="export"><i class="fa-solid fa-download" style="font-size:9px"></i></button>
                    <button class="pm-wbtn pm-wbtn-flt" title="Hacer flotante" data-act="float"><i class="fa-solid fa-thumbtack" style="font-size:9px"></i></button>
                    <button class="pm-wbtn pm-wbtn-min" title="Minimizar" data-act="minimize">─</button>
                    <button class="pm-wbtn pm-wbtn-max" title="Maximizar" data-act="maximize">□</button>
                    <button class="pm-wbtn pm-wbtn-rst" title="Restaurar" data-act="restore" style="display:none">❐</button>
                    <button class="pm-wbtn pm-wbtn-cls" title="Cerrar" data-act="close">✕</button>
                </div>
            </div>
            <div class="pm-body">${content}</div>
            <div class="pm-resize-handle" title="Redimensionar"></div>
        `;

        // ── Eventos de la barra de título ──
        const titlebar = el.querySelector('.pm-titlebar');
        titlebar.addEventListener('mousedown', (e) => onDragStart(e, el));
        titlebar.addEventListener('touchstart', (e) => onDragStart(e, el), { passive: true });

        // Doble clic en titlebar → toggle maximizar/restaurar
        titlebar.addEventListener('dblclick', () => {
            const state = el.dataset.pmState;
            if (state === 'maximized') restorePostIt(el);
            else maximizePostIt(el);
        });

        // ── Botones de control ──
        bindWindowControls(el);

        // ── Handle de resize ──
        const resizeHandle = el.querySelector('.pm-resize-handle');
        resizeHandle.addEventListener('mousedown', (e) => onResizeStart(e, el));
        resizeHandle.addEventListener('touchstart', (e) => onResizeStart(e, el), { passive: false });

        // ── Clic para traer al frente ──
        el.addEventListener('mousedown', () => bringToFront(el));
        el.addEventListener('touchstart', () => bringToFront(el), { passive: true });

        container.appendChild(el);

        // MathJax
        if (window.MathJax && MathJax.typesetPromise) {
            MathJax.typesetPromise([el]).catch(() => { });
        }

        saveState();
        return el;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 🔄 CONVERTIR NOTICIAS EXISTENTES A POST-ITS
    // ═══════════════════════════════════════════════════════════════════════
    function convertNewsCards() {
        const newsContainer = document.getElementById('news-container');
        if (!newsContainer) return;

        // Marcar el contenedor
        newsContainer.dataset.pmManaged = 'true';

        // Observar cambios en el contenedor de noticias para convertir las nuevas tarjetas
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(m => {
                m.addedNodes.forEach(node => {
                    if (node.nodeType === 1 && node.classList && node.classList.contains('glass-card') && !node.classList.contains('pm-postit')) {
                        wrapNewsCard(node, newsContainer);
                    }
                });
            });
            // Aplicar el modo actual
            applyMode();
        });

        observer.observe(newsContainer, { childList: true });

        // Convertir las existentes
        const existingCards = newsContainer.querySelectorAll('.glass-card:not(.pm-postit)');
        existingCards.forEach(card => wrapNewsCard(card, newsContainer));

        applyMode();
    }

    function wrapNewsCard(card, container) {
        const id = 'pm-news-' + (++pmPostItCounter) + '-' + Date.now();

        // Extraer info de la tarjeta
        const sourceEl = card.querySelector('span[class*="text-white"]');
        const titleEl = card.querySelector('a[class*="font-bold"]');
        const descEl = card.querySelector('p[class*="text-xs"]');
        const linkEl = card.querySelector('a[class*="text-indigo-500"]');

        const sourceName = sourceEl ? sourceEl.textContent.trim() : 'Noticia';
        const titleText = titleEl ? titleEl.textContent.trim() : 'Sin título';
        const descText = descEl ? descEl.textContent.trim() : '';
        const linkHref = linkEl ? linkEl.href : (titleEl ? titleEl.href : '#');

        // Detectar color por la fuente
        const colorMap = {
            'BBC': 'red', 'NASA': 'blue', 'ScienceDaily': 'green',
            'El País': 'yellow', 'Muy Interesante': 'purple',
            'National Geographic': 'orange'
        };
        let pmColor = 'cyan';
        for (const [key, val] of Object.entries(colorMap)) {
            if (sourceName.includes(key)) { pmColor = val; break; }
        }

        // Crear el wrapper post-it
        const postit = document.createElement('div');
        postit.id = id;
        postit.className = `pm-postit pm-c-${pmColor}`;
        postit.dataset.pmColor = pmColor;
        postit.dataset.pmState = 'normal';
        postit.dataset.pmPrevGeom = '';
        postit.dataset.pmIsNews = 'true';
        postit.dataset.pmSource = 'news';

        if (pmViewMode === 'free') {
            postit.style.width = PM_DEFAULT_WIDTH + 'px';
            postit.style.height = PM_DEFAULT_HEIGHT + 'px';
            postit.style.zIndex = ++pmZIndex;
        }

        const bodyContent = `
            <div style="font-weight:800;font-size:12px;line-height:1.3;margin-bottom:6px">
                <a href="${escAttr(linkHref)}" target="_blank" rel="noopener" style="text-decoration:none;color:inherit">${escHtml(titleText)}</a>
            </div>
            <div style="font-size:11px;opacity:.75;line-height:1.45">${escHtml(descText)}</div>
            ${linkHref !== '#' ? `<div style="margin-top:8px;text-align:right"><a href="${escAttr(linkHref)}" target="_blank" rel="noopener" style="font-size:10px;font-weight:700;opacity:.6">Leer más →</a></div>` : ''}
        `;

        postit.innerHTML = `
            <div class="pm-titlebar">
                <div class="pm-cat-icon"><i class="fa-solid fa-newspaper" style="font-size:8px"></i></div>
                <span class="pm-title-text">${escHtml(sourceName)}</span>
                <span class="pm-source-badge pm-badge-news"><i class="fa-solid fa-rss" style="font-size:7px"></i> Noticia</span>
                <div class="pm-wctl">
                    <button class="pm-wbtn pm-wbtn-exp" title="Exportar (PNG/PDF)" data-act="export"><i class="fa-solid fa-download" style="font-size:9px"></i></button>
                    <button class="pm-wbtn pm-wbtn-flt" title="Hacer flotante" data-act="float"><i class="fa-solid fa-thumbtack" style="font-size:9px"></i></button>
                    <button class="pm-wbtn pm-wbtn-min" title="Minimizar" data-act="minimize">─</button>
                    <button class="pm-wbtn pm-wbtn-max" title="Maximizar" data-act="maximize">□</button>
                    <button class="pm-wbtn pm-wbtn-rst" title="Restaurar" data-act="restore" style="display:none">❐</button>
                    <button class="pm-wbtn pm-wbtn-cls" title="Cerrar" data-act="close">✕</button>
                </div>
            </div>
            <div class="pm-body">${bodyContent}</div>
            <div class="pm-resize-handle" title="Redimensionar"></div>
        `;

        // Eventos
        const titlebar = postit.querySelector('.pm-titlebar');
        titlebar.addEventListener('mousedown', (e) => onDragStart(e, postit));
        titlebar.addEventListener('touchstart', (e) => onDragStart(e, postit), { passive: true });
        titlebar.addEventListener('dblclick', () => {
            if (postit.dataset.pmState === 'maximized') restorePostIt(postit);
            else maximizePostIt(postit);
        });

        bindWindowControls(postit);

        const resizeHandle = postit.querySelector('.pm-resize-handle');
        resizeHandle.addEventListener('mousedown', (e) => onResizeStart(e, postit));
        resizeHandle.addEventListener('touchstart', (e) => onResizeStart(e, postit), { passive: false });

        postit.addEventListener('mousedown', () => bringToFront(postit));
        postit.addEventListener('touchstart', () => bringToFront(postit), { passive: true });

        // Reemplazar la tarjeta original
        card.replaceWith(postit);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 🖱️ DRAG (ARRASTRAR)
    // ═══════════════════════════════════════════════════════════════════════
    function onDragStart(e, el) {
        if (pmViewMode === 'grid' && el.dataset.pmState !== 'maximized' && !el.classList.contains('pm-floating')) return;
        if (el.dataset.pmState === 'maximized') return;
        if (e.target.closest('.pm-wbtn') || e.target.closest('.pm-resize-handle')) return;

        const touch = e.touches ? e.touches[0] : e;
        pmActiveEl = el;
        pmAction = 'drag';
        pmHasMoved = false;
        pmStartData = {
            x: touch.clientX,
            y: touch.clientY,
            left: el.offsetLeft,
            top: el.offsetTop
        };
        el.classList.add('pm-dragging');
        bringToFront(el);

        // Solo preventDefault en mouse (no en touch, para no bloquear click/scroll)
        if (!e.touches && e.preventDefault) e.preventDefault();
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 📐 RESIZE (REDIMENSIONAR)
    // ═══════════════════════════════════════════════════════════════════════
    function onResizeStart(e, el) {
        if (pmViewMode === 'grid' && !el.classList.contains('pm-floating')) return;
        if (el.dataset.pmState === 'maximized') return;

        const touch = e.touches ? e.touches[0] : e;
        pmActiveEl = el;
        pmAction = 'resize';
        pmHasMoved = false;
        pmStartData = {
            x: touch.clientX,
            y: touch.clientY,
            width: el.offsetWidth,
            height: el.offsetHeight
        };
        el.classList.add('pm-dragging');
        bringToFront(el);

        if (e.preventDefault) e.preventDefault();
        e.stopPropagation();
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 🔄 MOVE / RESIZE GLOBAL LISTENERS
    // ═══════════════════════════════════════════════════════════════════════
    function onPointerMove(e) {
        if (!pmActiveEl || !pmAction) return;
        const touch = e.touches ? e.touches[0] : e;

        // Threshold: solo empezar a mover después de 4px (permite clicks limpios)
        if (!pmHasMoved) {
            const dx = Math.abs(touch.clientX - pmStartData.x);
            const dy = Math.abs(touch.clientY - pmStartData.y);
            if (dx < 4 && dy < 4) return;
            pmHasMoved = true;
        }

        if (pmAction === 'drag') {
            const dx = touch.clientX - pmStartData.x;
            const dy = touch.clientY - pmStartData.y;
            pmActiveEl.style.left = (pmStartData.left + dx) + 'px';
            pmActiveEl.style.top = (pmStartData.top + dy) + 'px';
        } else if (pmAction === 'resize') {
            const dw = touch.clientX - pmStartData.x;
            const dh = touch.clientY - pmStartData.y;
            const newW = Math.max(PM_MIN_WIDTH, pmStartData.width + dw);
            const newH = Math.max(PM_MIN_HEIGHT, pmStartData.height + dh);
            pmActiveEl.style.width = newW + 'px';
            pmActiveEl.style.height = newH + 'px';
        }

        // Solo preventDefault cuando realmente estamos moviendo (evita bloquear otros toques)
        if (pmHasMoved && e.cancelable && e.preventDefault) e.preventDefault();
    }

    function onPointerEnd() {
        if (pmActiveEl) {
            pmActiveEl.classList.remove('pm-dragging');
            if (pmHasMoved) saveState();
            pmActiveEl = null;
            pmAction = null;
            pmHasMoved = false;
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 🪟 CONTROLES DE VENTANA
    // ═══════════════════════════════════════════════════════════════════════
    function minimizePostIt(el) {
        // Guardar geometría actual para restaurar
        if (el.dataset.pmState === 'normal') {
            el.dataset.pmPrevGeom = JSON.stringify({
                left: el.style.left, top: el.style.top,
                width: el.style.width, height: el.style.height
            });
        }

        el.dataset.pmState = 'minimized';
        el.classList.add('pm-minimized');
        el.classList.remove('pm-maximized');

        // Mostrar botón de restaurar, ocultar max
        el.querySelector('.pm-wbtn-max').style.display = 'none';
        el.querySelector('.pm-wbtn-rst').style.display = 'flex';

        // En modo libre, mover a la barra de minimizados (creamos una mini-tab)
        if (pmViewMode === 'free') {
            el.style.display = 'none';
            createMinTab(el);
        }

        saveState();
    }

    function maximizePostIt(el) {
        // Guardar geometría antes de maximizar
        if (el.dataset.pmState === 'normal') {
            el.dataset.pmPrevGeom = JSON.stringify({
                left: el.style.left, top: el.style.top,
                width: el.style.width, height: el.style.height
            });
        }

        el.dataset.pmState = 'maximized';
        el.classList.add('pm-maximized');
        el.classList.remove('pm-minimized');
        el.style.display = '';

        el.querySelector('.pm-wbtn-max').style.display = 'none';
        el.querySelector('.pm-wbtn-rst').style.display = 'flex';
        el.querySelector('.pm-wbtn-min').style.display = 'flex';

        removeMinTab(el.id);
        saveState();
    }

    function restorePostIt(el) {
        const prevState = el.dataset.pmState;
        el.dataset.pmState = 'normal';
        el.classList.remove('pm-minimized', 'pm-maximized');
        el.style.display = '';

        // Restaurar geometría
        if (el.dataset.pmPrevGeom) {
            try {
                const geom = JSON.parse(el.dataset.pmPrevGeom);
                if (pmViewMode === 'free') {
                    el.style.left = geom.left || 'auto';
                    el.style.top = geom.top || 'auto';
                    el.style.width = geom.width || PM_DEFAULT_WIDTH + 'px';
                    el.style.height = geom.height || PM_DEFAULT_HEIGHT + 'px';
                }
            } catch (e) { }
        }

        el.querySelector('.pm-wbtn-max').style.display = 'flex';
        el.querySelector('.pm-wbtn-rst').style.display = 'none';

        removeMinTab(el.id);
        bringToFront(el);
        saveState();
    }

    function closePostIt(el) {
        el.style.transition = 'all .3s ease';
        el.style.transform = 'scale(.8)';
        el.style.opacity = '0';
        removeMinTab(el.id);
        setTimeout(() => {
            el.remove();
            saveState();
        }, 300);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 📌 BARRA DE MINIMIZADOS
    // ═══════════════════════════════════════════════════════════════════════
    function ensureMinBar() {
        if (!document.getElementById('pm-minimized-bar')) {
            const bar = document.createElement('div');
            bar.id = 'pm-minimized-bar';
            document.body.appendChild(bar);
        }
    }

    function createMinTab(el) {
        ensureMinBar();
        const bar = document.getElementById('pm-minimized-bar');
        if (bar.querySelector(`[data-pm-id="${el.id}"]`)) return;

        const color = el.dataset.pmColor || 'yellow';
        const title = el.querySelector('.pm-title-text')?.textContent || 'Nota';
        const tab = document.createElement('div');
        tab.className = `pm-mintab pm-c-${color}`;
        tab.dataset.pmId = el.id;
        tab.textContent = title;
        tab.title = 'Clic para restaurar: ' + title;
        tab.addEventListener('click', () => restorePostIt(el));
        bar.appendChild(tab);
    }

    function removeMinTab(id) {
        const tab = document.querySelector(`#pm-minimized-bar [data-pm-id="${id}"]`);
        if (tab) tab.remove();
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 🔀 MODOS: GRID ↔ LIBRE
    // ═══════════════════════════════════════════════════════════════════════
    function switchMode(mode) {
        pmViewMode = mode;
        try { localStorage.setItem(PM_MODE_KEY, mode); } catch (e) { }

        // Actualizar toolbar
        document.querySelectorAll('#pm-toolbar [data-mode]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });

        applyMode();
    }

    function applyMode() {
        const container = document.getElementById('news-container');
        if (!container) return;

        if (pmViewMode === 'grid') {
            container.classList.add('pm-grid-mode');
            container.style.position = 'relative';
            container.style.height = 'auto';
            container.style.minHeight = 'auto';

            // Restaurar todos los post-its minimizados en modo libre
            container.querySelectorAll('.pm-postit').forEach(el => {
                el.style.display = '';
                // No forzar restaurar estado; respetar minimizados
            });
        } else {
            container.classList.remove('pm-grid-mode');
            container.style.position = 'relative';
            container.style.minHeight = '400px';

            // Dar posición a los que no tengan
            let offsetX = 10, offsetY = 10;
            container.querySelectorAll('.pm-postit').forEach(el => {
                if (!el.style.left || el.style.left === 'auto') {
                    el.style.left = offsetX + 'px';
                    el.style.top = offsetY + 'px';
                    el.style.width = el.style.width || PM_DEFAULT_WIDTH + 'px';
                    el.style.height = el.style.height || PM_DEFAULT_HEIGHT + 'px';
                    offsetX += 30;
                    offsetY += 30;
                }
                // Ocultar minimizados y crear tabs
                if (el.dataset.pmState === 'minimized') {
                    el.style.display = 'none';
                    createMinTab(el);
                }
            });
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 📐 ORGANIZAR EN CASCADA
    // ═══════════════════════════════════════════════════════════════════════
    function organizeCascade() {
        if (pmViewMode === 'grid') {
            // En grid, solo reorganizar quitando maximizados
            const container = document.getElementById('news-container');
            if (!container) return;
            container.querySelectorAll('.pm-postit.pm-maximized').forEach(el => restorePostIt(el));
            return;
        }

        const container = document.getElementById('news-container');
        if (!container) return;

        const postits = container.querySelectorAll('.pm-postit');
        const containerW = container.offsetWidth;
        const cols = Math.max(1, Math.floor(containerW / (PM_DEFAULT_WIDTH + 20)));
        let col = 0, row = 0;

        postits.forEach((el, i) => {
            // Restaurar si está maximizado o minimizado
            if (el.dataset.pmState !== 'normal') {
                el.dataset.pmState = 'normal';
                el.classList.remove('pm-minimized', 'pm-maximized');
                el.style.display = '';
                el.querySelector('.pm-wbtn-max').style.display = 'flex';
                el.querySelector('.pm-wbtn-rst').style.display = 'none';
                removeMinTab(el.id);
            }

            const x = 10 + col * (PM_DEFAULT_WIDTH + 16);
            const y = 10 + row * (PM_DEFAULT_HEIGHT + 12);

            el.style.transition = 'all .45s cubic-bezier(.34,1.56,.64,1)';
            el.style.left = x + 'px';
            el.style.top = y + 'px';
            el.style.width = PM_DEFAULT_WIDTH + 'px';
            el.style.height = PM_DEFAULT_HEIGHT + 'px';
            el.style.zIndex = ++pmZIndex;

            setTimeout(() => { el.style.transition = ''; }, 500);

            col++;
            if (col >= cols) { col = 0; row++; }
        });

        // Ajustar altura del contenedor
        const totalRows = Math.ceil(postits.length / cols);
        container.style.minHeight = (totalRows * (PM_DEFAULT_HEIGHT + 12) + 20) + 'px';

        saveState();
    }

    // ═══════════════════════════════════════════════════════════════════════
    // ➕ POPUP NUEVA NOTA
    // ═══════════════════════════════════════════════════════════════════════
    function showNewNotePopup(e) {
        // Cerrar popup existente
        const existing = document.getElementById('pm-new-note-popup');
        if (existing) { existing.remove(); return; }

        const popup = document.createElement('div');
        popup.id = 'pm-new-note-popup';

        // Posicionar cerca del botón
        const rect = e.target.closest('.pm-add-btn').getBoundingClientRect();
        popup.style.left = Math.min(rect.left, window.innerWidth - 300) + 'px';
        popup.style.top = (rect.bottom + 8) + 'px';

        const colorsHtml = PM_COLORS.map((c, i) =>
            `<div class="pm-cpick ${i === 0 ? 'sel' : ''}" data-color="${c}" style="background:var(--pm-pick-${c})" title="${c}"></div>`
        ).join('');

        popup.innerHTML = `
            <label>Título</label>
            <input type="text" id="pm-new-title" placeholder="Ej: Fórmulas MRU" maxlength="60">
            <label>Contenido</label>
            <textarea id="pm-new-content" rows="3" placeholder="Escribe tu nota aquí..."></textarea>
            <label>Color</label>
            <div class="pm-color-pick">${colorsHtml}</div>
            <div class="pm-popup-actions">
                <button class="pm-popup-btn pm-popup-btn-cancel" id="pm-new-cancel">Cancelar</button>
                <button class="pm-popup-btn pm-popup-btn-primary" id="pm-new-create"><i class="fa-solid fa-plus" style="margin-right:4px"></i>Crear</button>
            </div>
        `;

        document.body.appendChild(popup);

        // Inyectar CSS vars para los picker circles
        const pickCSSVars = `
            :root {
                --pm-pick-yellow: #fff176; --pm-pick-blue: #90caf9;
                --pm-pick-green: #a5d6a7; --pm-pick-pink: #f48fb1;
                --pm-pick-orange: #ffcc80; --pm-pick-purple: #ce93d8;
                --pm-pick-cyan: #80deea; --pm-pick-red: #ef9a9a;
            }
        `;
        if (!document.getElementById('pm-pick-vars')) {
            const s = document.createElement('style');
            s.id = 'pm-pick-vars';
            s.textContent = pickCSSVars;
            document.head.appendChild(s);
        }

        // Eventos del popup
        let selectedColor = PM_COLORS[0];
        popup.querySelectorAll('.pm-cpick').forEach(pick => {
            pick.addEventListener('click', () => {
                popup.querySelectorAll('.pm-cpick').forEach(p => p.classList.remove('sel'));
                pick.classList.add('sel');
                selectedColor = pick.dataset.color;
            });
        });

        popup.querySelector('#pm-new-cancel').addEventListener('click', () => popup.remove());
        popup.querySelector('#pm-new-create').addEventListener('click', () => {
            const title = popup.querySelector('#pm-new-title').value.trim() || 'Nota';
            const content = popup.querySelector('#pm-new-content').value.trim();
            createPostIt({ color: selectedColor, title, content: escHtml(content).replace(/\n/g, '<br>'), source: 'user' });
            popup.remove();
        });

        // Cerrar con click fuera
        setTimeout(() => {
            const closeHandler = (e) => {
                if (!popup.contains(e.target) && !e.target.closest('.pm-add-btn')) {
                    popup.remove();
                    document.removeEventListener('mousedown', closeHandler);
                }
            };
            document.addEventListener('mousedown', closeHandler);
        }, 100);

        // Focus al título
        popup.querySelector('#pm-new-title').focus();
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 💾 PERSISTENCIA
    // ═══════════════════════════════════════════════════════════════════════
    function saveState() {
        const container = document.getElementById('news-container');
        if (!container) return;

        const data = [];
        container.querySelectorAll('.pm-postit').forEach(el => {
            data.push({
                id: el.id,
                color: el.dataset.pmColor,
                state: el.dataset.pmState,
                prevGeom: el.dataset.pmPrevGeom,
                isNews: el.dataset.pmIsNews === 'true',
                source: el.dataset.pmSource || 'user',
                title: el.querySelector('.pm-title-text')?.textContent || '',
                content: el.querySelector('.pm-body')?.innerHTML || '',
                left: el.style.left,
                top: el.style.top,
                width: el.style.width,
                height: el.style.height,
                zIndex: el.style.zIndex
            });
        });

        try { localStorage.setItem(PM_STORAGE_KEY, JSON.stringify(data)); } catch (e) { }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 🛠️ UTILIDADES
    // ═══════════════════════════════════════════════════════════════════════
    function getContainer() {
        return document.getElementById('news-container');
    }

    /** Vincula los botones de un post-it con soporte táctil robusto */
    function bindWindowControls(el) {
        el.querySelectorAll('.pm-wbtn').forEach(btn => {
            const action = btn.dataset.act;
            const doAction = () => {
                if (action === 'minimize') minimizePostIt(el);
                else if (action === 'maximize') maximizePostIt(el);
                else if (action === 'restore') restorePostIt(el);
                else if (action === 'close') closePostIt(el);
                else if (action === 'float') toggleFloating(el);
                else if (action === 'export') showExportMenu(el, btn);
            };
            btn.addEventListener('click', (e) => { e.stopPropagation(); doAction(); });
            let _btnTapX = 0, _btnTapY = 0;
            btn.addEventListener('touchstart', (e) => {
                e.stopPropagation();
                const t = e.touches[0];
                _btnTapX = t.clientX; _btnTapY = t.clientY;
            }, { passive: true });
            btn.addEventListener('touchend', (e) => {
                e.stopPropagation();
                const t = e.changedTouches[0];
                const dx = Math.abs(t.clientX - _btnTapX), dy = Math.abs(t.clientY - _btnTapY);
                if (dx < 15 && dy < 15) {
                    e.preventDefault();
                    doAction();
                }
            });
        });
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 📌 FLOTANTE: desprender post-it del grid y dejarlo fijo en pantalla
    // ═══════════════════════════════════════════════════════════════════════
    function toggleFloating(el) {
        const isFloating = el.classList.contains('pm-floating');
        if (isFloating) {
            // Devolver al grid
            el.classList.remove('pm-floating');
            el.style.position = '';
            el.style.left = ''; el.style.top = '';
            el.style.width = ''; el.style.height = '';
            const container = getContainer();
            if (container && !container.contains(el)) container.appendChild(el);
            el.querySelector('.pm-wbtn-flt i').className = 'fa-solid fa-thumbtack';
            el.querySelector('.pm-wbtn-flt').title = 'Hacer flotante';
        } else {
            // Desprender y hacer flotante
            const rect = el.getBoundingClientRect();
            el.classList.add('pm-floating');
            el.style.left = rect.left + 'px';
            el.style.top = rect.top + 'px';
            el.style.width = rect.width + 'px';
            el.style.height = Math.max(PM_MIN_HEIGHT, rect.height) + 'px';
            document.body.appendChild(el);
            bringToFront(el);
            el.querySelector('.pm-wbtn-flt i').className = 'fa-solid fa-thumbtack fa-rotate-90';
            el.querySelector('.pm-wbtn-flt').title = 'Devolver al panel';
        }
        saveState();
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 📤 EXPORTAR: menú PNG / PDF
    // ═══════════════════════════════════════════════════════════════════════
    function showExportMenu(el, btn) {
        // Cerrar menú existente
        document.querySelectorAll('.pm-export-menu').forEach(m => m.remove());
        const menu = document.createElement('div');
        menu.className = 'pm-export-menu';
        menu.innerHTML = `
            <button class="pm-export-opt" data-fmt="png"><i class="fa-solid fa-image"></i> Exportar PNG</button>
            <button class="pm-export-opt" data-fmt="pdf"><i class="fa-solid fa-file-pdf"></i> Exportar PDF</button>
        `;
        btn.style.position = 'relative';
        btn.appendChild(menu);

        menu.querySelector('[data-fmt="png"]').addEventListener('click', (e) => {
            e.stopPropagation(); menu.remove(); exportPostItAsImage(el, 'png');
        });
        menu.querySelector('[data-fmt="pdf"]').addEventListener('click', (e) => {
            e.stopPropagation(); menu.remove(); exportPostItAsImage(el, 'pdf');
        });

        setTimeout(() => {
            const closer = (e) => {
                if (!menu.contains(e.target)) { menu.remove(); document.removeEventListener('click', closer); }
            };
            document.addEventListener('click', closer);
        }, 50);
    }

    function exportPostItAsImage(el, format) {
        // Usar html2canvas si está disponible, sino fallback manual
        const body = el.querySelector('.pm-body');
        const title = el.querySelector('.pm-title-text')?.textContent || 'Nota';

        if (format === 'pdf') {
            const w = window.open('', '_blank');
            if (!w) { alert('Permite ventanas emergentes para exportar PDF'); return; }
            
            const html = `<html><head><title>${title}</title>
            <style>
                body{font-family:'Nunito',system-ui,sans-serif;padding:40px;max-width:800px;margin:auto;line-height:1.6}
                h2{color:#6366f1;border-bottom:2px solid #6366f1;padding-bottom:12px;margin-top:0}
                .content{font-size:15px;color:#334155}
                .footer{margin-top:40px;padding-top:15px;border-top:1px solid #e2e8f0;font-size:11px;color:#94a3b8;text-align:center}
                blockquote{border-left:4px solid #e2e8f0;padding-left:15px;margin-left:0;color:#64748b}
            </style>
            <script>
                window.MathJax = {
                    tex: { inlineMath: [['$', '$'], ['\\\\(', '\\\\)']], displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']] },
                    svg: { fontCache: 'global' },
                    startup: {
                        pageReady: () => {
                            return MathJax.startup.defaultPageReady().then(() => {
                                window.doPrint();
                            });
                        }
                    }
                };
                window.printed = false;
                window.doPrint = () => {
                    if(!window.printed) {
                        window.printed = true;
                        setTimeout(() => window.print(), 500);
                    }
                };
                setTimeout(window.doPrint, 3000);
            </script>
            <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
            </head><body>
            <h2>📌 ${escHtml(title)}</h2>
            <div class="content">${body?.innerHTML || ''}</div>
            <div class="footer">Exportado desde Física Interactiva — Prof. Néstor Fabio Montoya Palacios<br>
            ${new Date().toLocaleString('es-CO')}</div>
            </body></html>`;

            w.document.open();
            w.document.write(html);
            w.document.close();
        } else {
            // PNG: canvas screenshot
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const w = Math.max(400, el.offsetWidth * 2);
            const h = Math.max(300, el.offsetHeight * 2);
            canvas.width = w; canvas.height = h;

            // Fondo
            const colors = { yellow: '#fff9c4', blue: '#bbdefb', green: '#c8e6c9', pink: '#f8bbd0', orange: '#ffe0b2', purple: '#e1bee7', cyan: '#b2ebf2', red: '#ffcdd2' };
            ctx.fillStyle = colors[el.dataset.pmColor] || '#fff9c4';
            ctx.fillRect(0, 0, w, h);

            // Título
            ctx.fillStyle = '#333';
            ctx.font = 'bold 28px Nunito, sans-serif';
            ctx.fillText('📌 ' + title, 30, 50);

            // Línea
            ctx.strokeStyle = 'rgba(0,0,0,.15)';
            ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(30, 65); ctx.lineTo(w - 30, 65); ctx.stroke();

            // Contenido (texto plano)
            ctx.fillStyle = '#444';
            ctx.font = '20px Nunito, sans-serif';
            const text = (body?.textContent || '').trim();
            const lines = wrapCanvasText(ctx, text, w - 60, 20);
            let y = 95;
            lines.forEach(line => {
                if (y < h - 50) { ctx.fillText(line, 30, y); y += 28; }
            });

            // Footer
            ctx.fillStyle = '#999';
            ctx.font = '14px Nunito, sans-serif';
            ctx.fillText('Física Interactiva — Prof. Néstor Montoya — ' + new Date().toLocaleDateString('es-CO'), 30, h - 20);

            // Descargar
            canvas.toBlob(blob => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url; a.download = title.replace(/[^a-zA-Z0-9áéíóúñ ]/g, '') + '.png';
                document.body.appendChild(a); a.click(); a.remove();
                URL.revokeObjectURL(url);
            }, 'image/png');
        }
    }

    function wrapCanvasText(ctx, text, maxWidth, fontSize) {
        const words = text.split(/\s+/);
        const lines = []; let line = '';
        words.forEach(w => {
            const test = line ? line + ' ' + w : w;
            if (ctx.measureText(test).width > maxWidth) {
                if (line) lines.push(line);
                line = w;
            } else { line = test; }
        });
        if (line) lines.push(line);
        return lines;
    }

    function bringToFront(el) {
        el.style.zIndex = ++pmZIndex;
    }

    function escHtml(str) {
        const d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    }

    function escAttr(str) {
        return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 🚀 INICIALIZACIÓN
    // ═══════════════════════════════════════════════════════════════════════
    function initPostItManager() {
        if (pmInitialized) return;
        pmInitialized = true;

        injectPMStyles();

        // Cargar modo guardado
        try {
            const saved = localStorage.getItem(PM_MODE_KEY);
            if (saved === 'free' || saved === 'grid') pmViewMode = saved;
        } catch (e) { }

        // Global pointer events - mouse (always non-passive is fine)
        document.addEventListener('mousemove', onPointerMove);
        document.addEventListener('mouseup', onPointerEnd);
        // Touch: register as passive initially - we can't preventDefault from passive
        // but we handle prevention at the element level instead
        document.addEventListener('touchmove', function(e) {
            // Only intervene when actively dragging/resizing a post-it
            if (!pmActiveEl || !pmAction || !pmHasMoved) return;
            onPointerMove(e);
        }, { passive: false });
        document.addEventListener('touchend', onPointerEnd);

        // Esperar al DOM y a que las noticias se carguen
        const tryInit = () => {
            const newsContainer = document.getElementById('news-container');
            const welcomeDash = document.getElementById('welcome-dashboard');
            if (!newsContainer || !welcomeDash) {
                setTimeout(tryInit, 500);
                return;
            }

            injectToolbar();
            convertNewsCards();

            // Re-observar cuando el dashboard se muestra/oculta
            const dashObserver = new MutationObserver(() => {
                if (!welcomeDash.classList.contains('hidden')) {
                    setTimeout(() => {
                        if (!document.getElementById('pm-toolbar')) injectToolbar();
                        convertNewsCards();
                    }, 200);
                }
            });
            dashObserver.observe(welcomeDash, { attributes: true, attributeFilter: ['class'] });
        };

        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            setTimeout(tryInit, 800);
        } else {
            document.addEventListener('DOMContentLoaded', () => setTimeout(tryInit, 800));
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 🌐 API GLOBAL
    // ═══════════════════════════════════════════════════════════════════════
    window.PostItManager = {
        create: createPostIt,
        switchMode: switchMode,
        organize: organizeCascade,
        init: initPostItManager
    };

    // Auto-iniciar
    initPostItManager();

    console.log("✅ Post-It Manager v1.0 cargado correctamente");
})();
