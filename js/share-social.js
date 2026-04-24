/* ═══════════════════════════════════════════════════════════════════════════════
   📤 FÍSICA INTERACTIVA - Módulo de Compartir en Redes Sociales v1.1
   ═══════════════════════════════════════════════════════════════════════════════
   🎓 Autor: Msc. Néstor Fabio Montoya Palacios
   📅 Marzo 2026
   
   ✨ v1.1: Panel draggable (arrastrable) + minimizable por toda la interfaz
   ═══════════════════════════════════════════════════════════════════════════════ */

const SHARE_CONFIG = {
    siteUrl: 'https://iemauxicartago.edu.co/Fisica/',
    siteName: 'Física Interactiva',
    author: 'Prof. Msc. Néstor Fabio Montoya Palacios',
    hashtags: 'FísicaInteractiva,Educación,Ciencia,Física',
    defaultMessage: '🔬 Mira este recurso de Física Interactiva del Prof. Néstor Montoya:'
};

// ═══════════════════════════════════════════════════════════════════════════
// 📤 PANEL DE COMPARTIR (Draggable + Colapsable)
// ═══════════════════════════════════════════════════════════════════════════

window.openSharePanel = function(opts = {}) {
    let title = opts.title || '';
    let url = opts.url || '';
    let description = opts.description || '';
    let type = opts.type || 'recurso';

    if (!url && typeof _currentLoadedItem !== 'undefined' && _currentLoadedItem) {
        title = _currentLoadedItem.title || 'Recurso de Física';
        url = SHARE_CONFIG.siteUrl + (_currentLoadedItem.url || '');
        type = _currentLoadedItem.lvl || 'Recurso';
        description = `${type}: ${title} — ${SHARE_CONFIG.siteName}`;
    }

    if (!url) {
        title = SHARE_CONFIG.siteName;
        url = SHARE_CONFIG.siteUrl;
        description = `🚀 Plataforma educativa de Física con simuladores, cuadernos interactivos, guías y más — ${SHARE_CONFIG.author}`;
        type = 'Plataforma';
    }

    const fullMessage = `${SHARE_CONFIG.defaultMessage}\n\n📚 ${title}\n🔗 ${url}`;

    const existing = document.getElementById('share-panel-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'share-panel-overlay';
    overlay.innerHTML = `
        <div class="sp-backdrop" onclick="closeSharePanel()"></div>
        <div class="sp-panel" id="share-panel-sheet">
            <div class="sp-header sp-drag-zone" id="sp-drag-header">
                <div class="sp-drag-handle"></div>
                <div class="sp-header-content">
                    <div class="sp-header-left">
                        <div class="sp-icon-circle">
                            <i class="fa-solid fa-share-nodes"></i>
                        </div>
                        <div>
                            <h3 class="sp-title">Compartir</h3>
                            <p class="sp-subtitle">${title.length > 40 ? title.substring(0, 40) + '…' : title}</p>
                        </div>
                    </div>
                    <div class="sp-header-actions">
                        <button class="sp-minimize" onclick="toggleShareMinimize()" title="Minimizar / Expandir">
                            <i class="fa-solid fa-chevron-down" id="sp-minimize-icon"></i>
                        </button>
                        <button class="sp-close" onclick="closeSharePanel()" title="Cerrar">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="sp-body" id="sp-body">
                <div class="sp-preview">
                    <div class="sp-preview-badge">${type}</div>
                    <div class="sp-preview-title">${title}</div>
                    <div class="sp-preview-url"><i class="fa-solid fa-link"></i> ${url.length > 48 ? url.substring(0, 48) + '…' : url}</div>
                </div>
                <div class="sp-section-label">Compartir por</div>
                <div class="sp-grid">
                    <button class="sp-btn sp-whatsapp" onclick="shareVia('whatsapp','${encodeURIComponent(fullMessage)}')" title="WhatsApp">
                        <div class="sp-btn-icon"><i class="fa-brands fa-whatsapp"></i></div><span>WhatsApp</span>
                    </button>
                    <button class="sp-btn sp-telegram" onclick="shareVia('telegram','${encodeURIComponent(title)}','${encodeURIComponent(url)}')" title="Telegram">
                        <div class="sp-btn-icon"><i class="fa-brands fa-telegram"></i></div><span>Telegram</span>
                    </button>
                    <button class="sp-btn sp-facebook" onclick="shareVia('facebook','','${encodeURIComponent(url)}')" title="Facebook">
                        <div class="sp-btn-icon"><i class="fa-brands fa-facebook-f"></i></div><span>Facebook</span>
                    </button>
                    <button class="sp-btn sp-twitter" onclick="shareVia('twitter','${encodeURIComponent(title + ' ' + SHARE_CONFIG.defaultMessage)}','${encodeURIComponent(url)}')" title="X / Twitter">
                        <div class="sp-btn-icon"><i class="fa-brands fa-x-twitter"></i></div><span>X</span>
                    </button>
                    <button class="sp-btn sp-email" onclick="shareVia('email','${encodeURIComponent(title)}','${encodeURIComponent(url)}','${encodeURIComponent(fullMessage)}')" title="Correo">
                        <div class="sp-btn-icon"><i class="fa-solid fa-envelope"></i></div><span>Correo</span>
                    </button>
                    <button class="sp-btn sp-copy" onclick="shareCopyLink('${url}')" title="Copiar enlace">
                        <div class="sp-btn-icon"><i class="fa-solid fa-link"></i></div><span>Copiar</span>
                    </button>
                    <button class="sp-btn sp-qr" onclick="shareShowQR('${url}','${encodeURIComponent(title)}')" title="Código QR">
                        <div class="sp-btn-icon"><i class="fa-solid fa-qrcode"></i></div><span>QR</span>
                    </button>
                    <button class="sp-btn sp-native" onclick="shareNative('${encodeURIComponent(title)}','${encodeURIComponent(description)}','${url}')" title="Más opciones">
                        <div class="sp-btn-icon"><i class="fa-solid fa-ellipsis"></i></div><span>Más</span>
                    </button>
                </div>
                <div id="sp-qr-area" class="sp-qr-area hidden">
                    <canvas id="sp-qr-canvas"></canvas>
                    <p class="sp-qr-label">Escanea con tu teléfono</p>
                    <button class="sp-qr-download" onclick="downloadQR()"><i class="fa-solid fa-download"></i> Descargar QR</button>
                </div>
                <div class="sp-footer"><i class="fa-solid fa-graduation-cap"></i> ${SHARE_CONFIG.siteName} — ${SHARE_CONFIG.author}</div>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    if (!document.getElementById('share-panel-css')) {
        const style = document.createElement('style');
        style.id = 'share-panel-css';
        style.textContent = getSharePanelCSS();
        document.head.appendChild(style);
    }

    const panel = overlay.querySelector('.sp-panel');
    requestAnimationFrame(() => {
        overlay.querySelector('.sp-backdrop').style.opacity = '1';
        panel.style.opacity = '1';
        panel.style.transform = 'scale(1)';
    });

    // ✨ Hacer el panel DRAGGABLE desde el header
    makeShareDraggable(panel, document.getElementById('sp-drag-header'));

    const escHandler = (e) => {
        if (e.key === 'Escape') { closeSharePanel(); document.removeEventListener('keydown', escHandler); }
    };
    document.addEventListener('keydown', escHandler);
};

window.closeSharePanel = function() {
    const overlay = document.getElementById('share-panel-overlay');
    if (!overlay) return;
    const panel = overlay.querySelector('.sp-panel');
    const backdrop = overlay.querySelector('.sp-backdrop');
    if (panel) { panel.style.opacity = '0'; panel.style.transform = 'scale(.9)'; }
    if (backdrop) backdrop.style.opacity = '0';
    setTimeout(() => overlay.remove(), 300);
};

window.toggleShareMinimize = function() {
    const body = document.getElementById('sp-body');
    const icon = document.getElementById('sp-minimize-icon');
    if (!body || !icon) return;
    const isHidden = body.style.display === 'none';
    body.style.display = isHidden ? '' : 'none';
    icon.className = isHidden ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-up';
};

// ═══════════════════════════════════════════════════════════════════════════
// 🖱️ DRAGGABLE - Arrastrar panel por la interfaz
// ═══════════════════════════════════════════════════════════════════════════

function makeShareDraggable(panel, dragZone) {
    let isDragging = false, startX, startY, panelX, panelY;

    function onStart(cx, cy, e) {
        if (e.target.closest('button')) return;
        isDragging = true;
        startX = cx; startY = cy;
        const rect = panel.getBoundingClientRect();
        panelX = rect.left; panelY = rect.top;
        panel.style.transition = 'none';
        panel.classList.add('sp-dragging');
        e.preventDefault();
    }

    function onMove(cx, cy) {
        if (!isDragging) return;
        let newX = panelX + (cx - startX);
        let newY = panelY + (cy - startY);
        // Limitar a los bordes de la ventana
        newX = Math.max(-panel.offsetWidth * 0.3, Math.min(newX, window.innerWidth - panel.offsetWidth * 0.7));
        newY = Math.max(0, Math.min(newY, window.innerHeight - 60));
        panel.style.position = 'fixed';
        panel.style.left = newX + 'px';
        panel.style.top = newY + 'px';
        panel.style.right = 'auto';
        panel.style.bottom = 'auto';
        panel.style.margin = '0';
    }

    function onEnd() {
        isDragging = false;
        panel.style.transition = '';
        panel.classList.remove('sp-dragging');
    }

    dragZone.addEventListener('mousedown', (e) => onStart(e.clientX, e.clientY, e));
    document.addEventListener('mousemove', (e) => { if (isDragging) onMove(e.clientX, e.clientY); });
    document.addEventListener('mouseup', onEnd);

    dragZone.addEventListener('touchstart', (e) => {
        if (e.target.closest('button')) return;
        onStart(e.touches[0].clientX, e.touches[0].clientY, e);
    }, { passive: false });
    document.addEventListener('touchmove', (e) => {
        if (isDragging) { onMove(e.touches[0].clientX, e.touches[0].clientY); e.preventDefault(); }
    }, { passive: false });
    document.addEventListener('touchend', onEnd);
}

// ═══════════════════════════════════════════════════════════════════════════
// 🔗 FUNCIONES DE COMPARTIR
// ═══════════════════════════════════════════════════════════════════════════

window.shareVia = function(platform, text, url, body) {
    const urls = {
        whatsapp: `https://wa.me/?text=${text}`,
        telegram: `https://t.me/share/url?url=${url}&text=${text}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        twitter:  `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${SHARE_CONFIG.hashtags}`,
        email:    `mailto:?subject=${text}&body=${body || text}%0A%0A${url}`
    };
    if (urls[platform]) window.open(urls[platform], '_blank', 'width=600,height=500,noopener,noreferrer');
};

window.shareCopyLink = function(url) {
    navigator.clipboard.writeText(url).then(() => {
        const btn = document.querySelector('.sp-copy .sp-btn-icon');
        if (btn) { btn.innerHTML = '<i class="fa-solid fa-check"></i>'; btn.style.background = '#10b981'; }
        const label = document.querySelector('.sp-copy span');
        if (label) label.textContent = '¡Copiado!';
        setTimeout(() => {
            if (btn) { btn.innerHTML = '<i class="fa-solid fa-link"></i>'; btn.style.background = ''; }
            if (label) label.textContent = 'Copiar';
        }, 2000);
    }).catch(() => { prompt('Copia este enlace:', url); });
};

window.shareNative = function(title, description, url) {
    if (navigator.share) {
        navigator.share({ title: decodeURIComponent(title), text: decodeURIComponent(description), url }).catch(() => {});
    } else { shareCopyLink(url); }
};

// ═══════════════════════════════════════════════════════════════════════════
// 📱 CÓDIGO QR
// ═══════════════════════════════════════════════════════════════════════════

window.shareShowQR = function(url) {
    const area = document.getElementById('sp-qr-area');
    if (!area) return;
    area.classList.toggle('hidden');
    if (area.classList.contains('hidden')) return;
    const canvas = document.getElementById('sp-qr-canvas');
    if (!canvas) return;
    const qrImg = new Image();
    qrImg.crossOrigin = 'anonymous';
    qrImg.onload = function() {
        canvas.width = 200; canvas.height = 200;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 200, 200);
        ctx.drawImage(qrImg, 10, 10, 180, 180);
    };
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}&format=png`;
};

window.downloadQR = function() {
    const canvas = document.getElementById('sp-qr-canvas');
    if (!canvas) return;
    const a = document.createElement('a');
    a.download = 'FisicaInteractiva_QR.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
};

// ═══════════════════════════════════════════════════════════════════════════
// 🎨 ESTILOS CSS
// ═══════════════════════════════════════════════════════════════════════════

function getSharePanelCSS() {
    return `
    #share-panel-overlay{position:fixed;inset:0;z-index:999998;display:flex;align-items:center;justify-content:center}
    .sp-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.3);backdrop-filter:blur(3px);opacity:0;transition:opacity .3s}
    .sp-panel{position:relative;z-index:2;width:92%;max-width:420px;background:linear-gradient(145deg,#fff,#f1f5f9);border-radius:20px;padding:0;opacity:0;transform:scale(.9);transition:opacity .3s,transform .3s cubic-bezier(.22,1,.36,1);box-shadow:0 20px 60px rgba(0,0,0,.16),0 0 0 1px rgba(99,102,241,.08);max-height:85vh;overflow:hidden;font-family:'Nunito',system-ui,sans-serif}
    .dark .sp-panel{background:linear-gradient(145deg,#1e293b,#0f172a);box-shadow:0 20px 60px rgba(0,0,0,.4),0 0 0 1px rgba(99,102,241,.15)}
    .sp-panel.sp-dragging{box-shadow:0 25px 80px rgba(0,0,0,.22),0 0 0 2px rgba(99,102,241,.35)!important}
    .sp-header{padding:10px 16px 6px;user-select:none}
    .sp-drag-zone{cursor:grab}.sp-drag-zone:active{cursor:grabbing}
    .sp-drag-handle{width:40px;height:4px;background:rgba(100,116,139,.22);border-radius:4px;margin:0 auto 10px;transition:background .2s}
    .sp-drag-zone:hover .sp-drag-handle{background:rgba(99,102,241,.4)}
    .sp-header-content{display:flex;align-items:center;justify-content:space-between}
    .sp-header-left{display:flex;align-items:center;gap:10px}
    .sp-header-actions{display:flex;align-items:center;gap:5px}
    .sp-icon-circle{width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;color:#fff;font-size:17px;box-shadow:0 4px 12px rgba(99,102,241,.3)}
    .sp-title{font-weight:800;font-size:16px;color:#1e293b;margin:0;line-height:1.2}.dark .sp-title{color:#e2e8f0}
    .sp-subtitle{font-size:11px;color:#64748b;margin:0;line-height:1.3}.dark .sp-subtitle{color:#94a3b8}
    .sp-close,.sp-minimize{width:30px;height:30px;border-radius:8px;border:none;background:rgba(100,116,139,.08);color:#64748b;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:13px;transition:all .2s}
    .sp-close:hover{background:rgba(239,68,68,.1);color:#ef4444}
    .sp-minimize:hover{background:rgba(99,102,241,.1);color:#6366f1}
    .sp-body{overflow-y:auto;max-height:calc(85vh - 80px)}
    .sp-preview{margin:4px 14px 10px;padding:10px 14px;border-radius:12px;background:linear-gradient(135deg,rgba(99,102,241,.05),rgba(139,92,246,.05));border:1px solid rgba(99,102,241,.1)}
    .dark .sp-preview{background:linear-gradient(135deg,rgba(99,102,241,.1),rgba(139,92,246,.08));border-color:rgba(99,102,241,.18)}
    .sp-preview-badge{display:inline-block;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:#6366f1;background:rgba(99,102,241,.1);padding:2px 7px;border-radius:5px;margin-bottom:5px}
    .sp-preview-title{font-weight:700;font-size:13px;color:#1e293b;margin-bottom:3px}.dark .sp-preview-title{color:#e2e8f0}
    .sp-preview-url{font-size:10px;color:#64748b;display:flex;align-items:center;gap:4px}.sp-preview-url i{font-size:8px}
    .sp-section-label{padding:0 18px;margin-bottom:8px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:#94a3b8}
    .sp-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;padding:0 14px 14px}
    @media(max-width:360px){.sp-grid{grid-template-columns:repeat(3,1fr)}}
    .sp-btn{display:flex;flex-direction:column;align-items:center;gap:5px;padding:10px 4px 7px;border-radius:14px;border:none;background:rgba(255,255,255,.5);cursor:pointer;transition:all .2s;font-family:inherit}
    .dark .sp-btn{background:rgba(30,41,59,.4)}
    .sp-btn:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,.08)}
    .sp-btn:active{transform:scale(.95)}
    .sp-btn-icon{width:46px;height:46px;border-radius:13px;display:flex;align-items:center;justify-content:center;font-size:21px;color:#fff;transition:all .25s}
    .sp-btn span{font-size:9px;font-weight:700;color:#64748b}.dark .sp-btn span{color:#94a3b8}
    .sp-whatsapp .sp-btn-icon{background:linear-gradient(135deg,#25d366,#128c7e)}
    .sp-telegram .sp-btn-icon{background:linear-gradient(135deg,#2aabee,#229ed9)}
    .sp-facebook .sp-btn-icon{background:linear-gradient(135deg,#1877f2,#0d6efd)}
    .sp-twitter .sp-btn-icon{background:linear-gradient(135deg,#14171a,#333)}
    .sp-email .sp-btn-icon{background:linear-gradient(135deg,#ea4335,#c5221f)}
    .sp-copy .sp-btn-icon{background:linear-gradient(135deg,#6366f1,#4f46e5)}
    .sp-qr .sp-btn-icon{background:linear-gradient(135deg,#8b5cf6,#7c3aed)}
    .sp-native .sp-btn-icon{background:linear-gradient(135deg,#64748b,#475569)}
    .sp-whatsapp:hover .sp-btn-icon{box-shadow:0 4px 18px rgba(37,211,102,.4)}
    .sp-telegram:hover .sp-btn-icon{box-shadow:0 4px 18px rgba(42,171,238,.4)}
    .sp-facebook:hover .sp-btn-icon{box-shadow:0 4px 18px rgba(24,119,242,.4)}
    .sp-copy:hover .sp-btn-icon{box-shadow:0 4px 18px rgba(99,102,241,.4)}
    .sp-qr-area{text-align:center;padding:14px;margin:0 14px 10px;border-radius:12px;background:rgba(255,255,255,.7);border:1px dashed rgba(99,102,241,.2)}
    .dark .sp-qr-area{background:rgba(15,23,42,.4);border-color:rgba(99,102,241,.25)}
    .sp-qr-area canvas{border-radius:10px;margin:0 auto;display:block}
    .sp-qr-label{font-size:10px;color:#94a3b8;margin:6px 0}
    .sp-qr-download{display:inline-flex;align-items:center;gap:5px;padding:5px 12px;border-radius:8px;border:none;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;font-size:11px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .2s}
    .sp-qr-download:hover{transform:scale(1.05);box-shadow:0 4px 12px rgba(99,102,241,.3)}
    .sp-footer{text-align:center;padding:8px 14px 10px;font-size:9px;font-weight:600;color:#94a3b8;letter-spacing:.3px}
    .sp-btn-icon{animation:spPopIn .4s cubic-bezier(.68,-.55,.27,1.55) backwards}
    .sp-grid .sp-btn:nth-child(1) .sp-btn-icon{animation-delay:.05s}
    .sp-grid .sp-btn:nth-child(2) .sp-btn-icon{animation-delay:.1s}
    .sp-grid .sp-btn:nth-child(3) .sp-btn-icon{animation-delay:.15s}
    .sp-grid .sp-btn:nth-child(4) .sp-btn-icon{animation-delay:.2s}
    .sp-grid .sp-btn:nth-child(5) .sp-btn-icon{animation-delay:.25s}
    .sp-grid .sp-btn:nth-child(6) .sp-btn-icon{animation-delay:.3s}
    .sp-grid .sp-btn:nth-child(7) .sp-btn-icon{animation-delay:.35s}
    .sp-grid .sp-btn:nth-child(8) .sp-btn-icon{animation-delay:.4s}
    @keyframes spPopIn{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}
    `;
}

console.log('📤 Módulo Compartir v1.1 (draggable + minimizable) cargado');
