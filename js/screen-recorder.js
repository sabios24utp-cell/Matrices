/* ═══════════════════════════════════════════════════════════════════════════════
   🎬 FÍSICA INTERACTIVA - Módulo de Grabación de Video de Simulaciones
   ═══════════════════════════════════════════════════════════════════════════════
   🎓 Autor: Msc. Néstor Fabio Montoya Palacios
   📅 Marzo 2026
   
   📌 FUNCIONALIDAD:
   - Graba la simulación activa (iframe o contenido visible) como video WebM/MP4
   - Controles de inicio, pausa, detener, descargar
   - Indicador de tiempo de grabación en vivo
   - Exporta a formato WebM (compatible con la mayoría de navegadores)
   - Opción de incluir o no audio del sistema
   
   📌 INTEGRACIÓN:
   1. Copia a: public_html/Fisica/js/screen-recorder.js
   2. Agrega en index.html antes de </body>:
      <script src="js/screen-recorder.js"></script>
   3. Agrega el botón en el viewer-header (ver instrucciones al final)
   ═══════════════════════════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════════════════════
// 🔧 CONFIGURACIÓN DE GRABACIÓN
// ═══════════════════════════════════════════════════════════════════════════
const RECORDER_CONFIG = {
    mimeType: 'video/webm;codecs=vp9',       // Formato principal
    fallbackMime: 'video/webm;codecs=vp8',   // Fallback
    fallbackMime2: 'video/webm',             // Segundo fallback
    videoBitsPerSecond: 2500000,              // 2.5 Mbps (buena calidad)
    maxDuration: 5 * 60 * 1000,              // 5 minutos máximo
    filePrefix: 'FisicaInteractiva_'
};

// ═══════════════════════════════════════════════════════════════════════════
// 🎬 ESTADO DEL GRABADOR
// ═══════════════════════════════════════════════════════════════════════════
let _recorder = null;
let _recordedChunks = [];
let _recordingStream = null;
let _recordingTimer = null;
let _recordingSeconds = 0;
let _recordingState = 'idle'; // idle | recording | paused

// ═══════════════════════════════════════════════════════════════════════════
// ▶️ INICIAR GRABACIÓN
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Inicia o reanuda la grabación de la pantalla/simulación
 */
window.startRecording = async function() {
    // Si está pausada, reanudar
    if (_recordingState === 'paused' && _recorder) {
        _recorder.resume();
        _recordingState = 'recording';
        updateRecorderUI();
        startTimer();
        return;
    }

    // Verificar soporte del navegador
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
        showRecorderToast('❌ Tu navegador no soporta la grabación de pantalla. Usa Chrome, Edge o Firefox.', 'error');
        return;
    }

    try {
        // Solicitar captura de pantalla
        const displayOptions = {
            video: {
                cursor: 'always',
                displaySurface: 'browser',
                frameRate: { ideal: 30, max: 60 }
            },
            audio: true, // Intentar capturar audio del sistema
            preferCurrentTab: true
        };

        _recordingStream = await navigator.mediaDevices.getDisplayMedia(displayOptions);

        // Detectar el mejor formato soportado
        let mimeType = RECORDER_CONFIG.mimeType;
        if (!MediaRecorder.isTypeSupported(mimeType)) {
            mimeType = RECORDER_CONFIG.fallbackMime;
            if (!MediaRecorder.isTypeSupported(mimeType)) {
                mimeType = RECORDER_CONFIG.fallbackMime2;
                if (!MediaRecorder.isTypeSupported(mimeType)) {
                    mimeType = ''; // Dejar que el navegador elija
                }
            }
        }

        const options = { videoBitsPerSecond: RECORDER_CONFIG.videoBitsPerSecond };
        if (mimeType) options.mimeType = mimeType;

        _recordedChunks = [];
        _recorder = new MediaRecorder(_recordingStream, options);

        _recorder.ondataavailable = (e) => {
            if (e.data && e.data.size > 0) _recordedChunks.push(e.data);
        };

        _recorder.onstop = () => {
            _recordingState = 'idle';
            updateRecorderUI();
            stopTimer();
            // Auto-abrir panel de descarga si hay datos
            if (_recordedChunks.length > 0) {
                showDownloadPanel();
            }
        };

        // Si el usuario detiene la compartición desde el navegador
        _recordingStream.getVideoTracks()[0].onended = () => {
            if (_recordingState !== 'idle') {
                stopRecording();
            }
        };

        // Iniciar
        _recorder.start(1000); // Chunks cada segundo
        _recordingState = 'recording';
        _recordingSeconds = 0;
        
        showRecorderOverlay();
        updateRecorderUI();
        startTimer();
        showRecorderToast('🔴 Grabación iniciada', 'success');

        // Protección: parar automáticamente después de maxDuration
        setTimeout(() => {
            if (_recordingState === 'recording') {
                stopRecording();
                showRecorderToast('⏱️ Grabación detenida automáticamente (máximo 5 min)', 'warning');
            }
        }, RECORDER_CONFIG.maxDuration);

    } catch (err) {
        if (err.name === 'NotAllowedError') {
            showRecorderToast('🚫 Permiso de grabación denegado.', 'warning');
        } else {
            showRecorderToast('❌ Error al iniciar grabación: ' + err.message, 'error');
            console.error('🎬 Error de grabación:', err);
        }
    }
};

// ═══════════════════════════════════════════════════════════════════════════
// ⏸️ PAUSAR GRABACIÓN
// ═══════════════════════════════════════════════════════════════════════════
window.pauseRecording = function() {
    if (_recorder && _recordingState === 'recording') {
        _recorder.pause();
        _recordingState = 'paused';
        updateRecorderUI();
        stopTimer();
        showRecorderToast('⏸️ Grabación pausada', 'info');
    }
};

// ═══════════════════════════════════════════════════════════════════════════
// ⏹️ DETENER GRABACIÓN
// ═══════════════════════════════════════════════════════════════════════════
window.stopRecording = function() {
    if (_recorder && _recordingState !== 'idle') {
        _recorder.stop();
        if (_recordingStream) {
            _recordingStream.getTracks().forEach(t => t.stop());
            _recordingStream = null;
        }
        _recordingState = 'idle';
        stopTimer();
        updateRecorderUI();
    }
};

// ═══════════════════════════════════════════════════════════════════════════
// 💾 DESCARGAR VIDEO
// ═══════════════════════════════════════════════════════════════════════════
window.downloadRecording = function() {
    if (_recordedChunks.length === 0) {
        showRecorderToast('⚠️ No hay video grabado para descargar', 'warning');
        return;
    }

    const blob = new Blob(_recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const filename = RECORDER_CONFIG.filePrefix + 
        (typeof _currentLoadedItem !== 'undefined' && _currentLoadedItem ? 
            _currentLoadedItem.title.replace(/[^a-zA-Z0-9áéíóúñÁÉÍÓÚÑ ]/g, '').replace(/\s+/g, '_') : 
            'Simulacion') + 
        '_' + new Date().toISOString().slice(0, 10) + '.webm';

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    showRecorderToast('✅ Video descargado: ' + filename, 'success');
};

// ═══════════════════════════════════════════════════════════════════════════
// 🎛️ UI DEL GRABADOR - OVERLAY FLOTANTE
// ═══════════════════════════════════════════════════════════════════════════

function showRecorderOverlay() {
    let overlay = document.getElementById('rec-overlay');
    if (overlay) overlay.remove();

    overlay = document.createElement('div');
    overlay.id = 'rec-overlay';
    overlay.innerHTML = `
        <div class="rec-controls">
            <div class="rec-indicator" id="rec-indicator">
                <span class="rec-dot"></span>
                <span class="rec-time" id="rec-time">00:00</span>
            </div>
            <div class="rec-buttons">
                <button id="rec-btn-pause" onclick="pauseRecording()" title="Pausar" class="rec-btn rec-btn-pause">
                    <i class="fa-solid fa-pause"></i>
                </button>
                <button id="rec-btn-resume" onclick="startRecording()" title="Reanudar" class="rec-btn rec-btn-resume hidden">
                    <i class="fa-solid fa-play"></i>
                </button>
                <button id="rec-btn-stop" onclick="stopRecording()" title="Detener" class="rec-btn rec-btn-stop">
                    <i class="fa-solid fa-stop"></i>
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    // Inyectar CSS si no existe
    if (!document.getElementById('rec-overlay-css')) {
        const style = document.createElement('style');
        style.id = 'rec-overlay-css';
        style.textContent = getRecorderCSS();
        document.head.appendChild(style);
    }

    // Hacer draggable
    makeDraggable(overlay);
}

function updateRecorderUI() {
    const overlay = document.getElementById('rec-overlay');
    if (!overlay) return;

    const indicator = document.getElementById('rec-indicator');
    const btnPause = document.getElementById('rec-btn-pause');
    const btnResume = document.getElementById('rec-btn-resume');
    const btnStop = document.getElementById('rec-btn-stop');

    if (_recordingState === 'recording') {
        indicator.classList.remove('paused');
        indicator.classList.add('active');
        btnPause.classList.remove('hidden');
        btnResume.classList.add('hidden');
    } else if (_recordingState === 'paused') {
        indicator.classList.add('paused');
        indicator.classList.remove('active');
        btnPause.classList.add('hidden');
        btnResume.classList.remove('hidden');
    } else {
        // idle - remover overlay
        setTimeout(() => {
            if (overlay) overlay.remove();
        }, 300);
    }
}

function showDownloadPanel() {
    const existing = document.getElementById('rec-download-panel');
    if (existing) existing.remove();

    const blob = new Blob(_recordedChunks, { type: 'video/webm' });
    const sizeMB = (blob.size / (1024 * 1024)).toFixed(1);
    const duration = formatTime(_recordingSeconds);
    const videoURL = URL.createObjectURL(blob);

    const panel = document.createElement('div');
    panel.id = 'rec-download-panel';
    panel.innerHTML = `
        <div class="rec-dl-backdrop" onclick="closeDownloadPanel()"></div>
        <div class="rec-dl-sheet">
            <div class="rec-dl-header">
                <div class="rec-dl-icon"><i class="fa-solid fa-film"></i></div>
                <div>
                    <h3 class="rec-dl-title">¡Video grabado!</h3>
                    <p class="rec-dl-meta">${duration} · ${sizeMB} MB · WebM</p>
                </div>
                <button class="rec-dl-close" onclick="closeDownloadPanel()"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <video class="rec-dl-preview" controls src="${videoURL}"></video>
            <div class="rec-dl-actions">
                <button class="rec-dl-btn rec-dl-btn-primary" onclick="downloadRecording()">
                    <i class="fa-solid fa-download"></i> Descargar Video
                </button>
                <button class="rec-dl-btn rec-dl-btn-share" onclick="closeDownloadPanel();openSharePanel({title:'Video de Simulación',type:'Video'})">
                    <i class="fa-solid fa-share-nodes"></i> Compartir
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(panel);

    requestAnimationFrame(() => {
        panel.querySelector('.rec-dl-backdrop').style.opacity = '1';
        panel.querySelector('.rec-dl-sheet').style.transform = 'translateY(0)';
    });
}

window.closeDownloadPanel = function() {
    const panel = document.getElementById('rec-download-panel');
    if (!panel) return;
    const sheet = panel.querySelector('.rec-dl-sheet');
    const backdrop = panel.querySelector('.rec-dl-backdrop');
    if (sheet) sheet.style.transform = 'translateY(100%)';
    if (backdrop) backdrop.style.opacity = '0';
    setTimeout(() => panel.remove(), 350);
};

// ═══════════════════════════════════════════════════════════════════════════
// ⏱️ TEMPORIZADOR
// ═══════════════════════════════════════════════════════════════════════════

function startTimer() {
    stopTimer();
    _recordingTimer = setInterval(() => {
        _recordingSeconds++;
        const el = document.getElementById('rec-time');
        if (el) el.textContent = formatTime(_recordingSeconds);
    }, 1000);
}

function stopTimer() {
    if (_recordingTimer) {
        clearInterval(_recordingTimer);
        _recordingTimer = null;
    }
}

function formatTime(secs) {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

// ═══════════════════════════════════════════════════════════════════════════
// 🖱️ DRAGGABLE
// ═══════════════════════════════════════════════════════════════════════════
function makeDraggable(el) {
    let isDragging = false, startX, startY, elX, elY;
    el.style.cursor = 'grab';
    
    el.addEventListener('mousedown', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        const rect = el.getBoundingClientRect();
        elX = rect.left;
        elY = rect.top;
        el.style.cursor = 'grabbing';
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        el.style.left = (elX + dx) + 'px';
        el.style.top = (elY + dy) + 'px';
        el.style.right = 'auto';
        el.style.bottom = 'auto';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        if (el) el.style.cursor = 'grab';
    });

    // Touch support
    el.addEventListener('touchstart', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
        isDragging = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        const rect = el.getBoundingClientRect();
        elX = rect.left;
        elY = rect.top;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const dx = e.touches[0].clientX - startX;
        const dy = e.touches[0].clientY - startY;
        el.style.left = (elX + dx) + 'px';
        el.style.top = (elY + dy) + 'px';
        el.style.right = 'auto';
        el.style.bottom = 'auto';
    }, { passive: true });

    document.addEventListener('touchend', () => { isDragging = false; });
}

// ═══════════════════════════════════════════════════════════════════════════
// 🔔 TOASTS
// ═══════════════════════════════════════════════════════════════════════════
function showRecorderToast(msg, type = 'info') {
    const colors = {
        success: 'linear-gradient(135deg,#059669,#10b981)',
        error: 'linear-gradient(135deg,#dc2626,#ef4444)',
        warning: 'linear-gradient(135deg,#d97706,#f59e0b)',
        info: 'linear-gradient(135deg,#4f46e5,#6366f1)'
    };
    const toast = document.createElement('div');
    toast.style.cssText = `position:fixed;top:80px;left:50%;transform:translateX(-50%);background:${colors[type]||colors.info};color:#fff;padding:10px 20px;border-radius:12px;font-family:'Nunito',system-ui,sans-serif;font-size:13px;font-weight:700;z-index:999999;box-shadow:0 8px 30px rgba(0,0,0,.25);animation:recToastIn .3s ease;white-space:nowrap`;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.transition = 'all .3s ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(-10px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ═══════════════════════════════════════════════════════════════════════════
// 🎨 ESTILOS CSS
// ═══════════════════════════════════════════════════════════════════════════
function getRecorderCSS() {
    return `
    @keyframes recToastIn { from { opacity:0; transform:translateX(-50%) translateY(-10px); } }
    @keyframes recPulse { 0%,100% { opacity:1; } 50% { opacity:.3; } }
    @keyframes recBlink { 0%,100% { box-shadow:0 0 0 rgba(239,68,68,0); } 50% { box-shadow:0 0 12px rgba(239,68,68,.5); } }

    #rec-overlay {
        position:fixed; top:80px; right:20px; z-index:999990;
        user-select:none;
    }
    .rec-controls {
        display:flex; align-items:center; gap:10px;
        background:rgba(15,23,42,.92); backdrop-filter:blur(12px);
        padding:8px 14px; border-radius:16px;
        box-shadow:0 8px 30px rgba(0,0,0,.3); border:1px solid rgba(99,102,241,.2);
    }
    .rec-indicator { display:flex; align-items:center; gap:6px; }
    .rec-indicator.active .rec-dot { animation:recPulse 1s infinite; }
    .rec-indicator.paused .rec-dot { background:#f59e0b; animation:none; }
    .rec-dot {
        width:10px; height:10px; border-radius:50%; background:#ef4444;
        box-shadow:0 0 8px rgba(239,68,68,.5);
    }
    .rec-time { color:#e2e8f0; font-family:'Nunito',monospace; font-size:14px; font-weight:700; min-width:42px; }
    .rec-buttons { display:flex; gap:6px; }
    .rec-btn {
        width:32px; height:32px; border-radius:10px; border:none;
        display:flex; align-items:center; justify-content:center;
        cursor:pointer; font-size:12px; transition:all .2s;
    }
    .rec-btn-pause { background:rgba(249,115,22,.15); color:#f97316; }
    .rec-btn-pause:hover { background:rgba(249,115,22,.3); }
    .rec-btn-resume { background:rgba(34,197,94,.15); color:#22c55e; }
    .rec-btn-resume:hover { background:rgba(34,197,94,.3); }
    .rec-btn-stop { background:rgba(239,68,68,.15); color:#ef4444; }
    .rec-btn-stop:hover { background:rgba(239,68,68,.3); }
    .hidden { display:none!important; }

    /* Panel de descarga */
    #rec-download-panel { position:fixed; inset:0; z-index:999997; display:flex; align-items:flex-end; justify-content:center; }
    .rec-dl-backdrop { position:absolute; inset:0; background:rgba(0,0,0,.5); backdrop-filter:blur(4px); opacity:0; transition:opacity .35s; }
    .rec-dl-sheet {
        position:relative; z-index:2; width:100%; max-width:480px;
        background:linear-gradient(145deg,#ffffff,#f1f5f9);
        border-radius:24px 24px 0 0; padding:20px 20px env(safe-area-inset-bottom,16px);
        transform:translateY(100%); transition:transform .4s cubic-bezier(.22,1,.36,1);
        box-shadow:0 -10px 50px rgba(0,0,0,.15); font-family:'Nunito',system-ui,sans-serif;
    }
    .dark .rec-dl-sheet { background:linear-gradient(145deg,#1e293b,#0f172a); }
    .rec-dl-header { display:flex; align-items:center; gap:12px; margin-bottom:16px; }
    .rec-dl-icon {
        width:44px; height:44px; border-radius:14px;
        background:linear-gradient(135deg,#ef4444,#f97316);
        display:flex; align-items:center; justify-content:center;
        color:#fff; font-size:18px;
    }
    .rec-dl-title { font-weight:800; font-size:17px; color:#1e293b; margin:0; }
    .dark .rec-dl-title { color:#e2e8f0; }
    .rec-dl-meta { font-size:12px; color:#64748b; margin:0; }
    .rec-dl-close {
        margin-left:auto; width:32px; height:32px; border-radius:10px; border:none;
        background:rgba(100,116,139,.1); color:#64748b; cursor:pointer;
        display:flex; align-items:center; justify-content:center;
    }
    .rec-dl-close:hover { background:rgba(239,68,68,.1); color:#ef4444; }
    .rec-dl-preview {
        width:100%; border-radius:14px; margin-bottom:16px; max-height:240px;
        background:#000; object-fit:contain;
    }
    .rec-dl-actions { display:flex; gap:10px; }
    .rec-dl-btn {
        flex:1; padding:12px; border-radius:12px; border:none;
        font-family:inherit; font-size:14px; font-weight:700;
        cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;
        transition:all .2s;
    }
    .rec-dl-btn-primary { background:linear-gradient(135deg,#6366f1,#8b5cf6); color:#fff; }
    .rec-dl-btn-primary:hover { transform:translateY(-1px); box-shadow:0 4px 15px rgba(99,102,241,.4); }
    .rec-dl-btn-share { background:rgba(34,197,94,.1); color:#16a34a; border:1.5px solid rgba(34,197,94,.3); }
    .rec-dl-btn-share:hover { background:rgba(34,197,94,.15); }
    `;
}

// ═══════════════════════════════════════════════════════════════════════════
// ✅ CARGA COMPLETA
// ═══════════════════════════════════════════════════════════════════════════
console.log('🎬 Módulo de Grabación de Video cargado correctamente');

/* ═══════════════════════════════════════════════════════════════════════════
   📝 INSTRUCCIONES DE INTEGRACIÓN EN index.html
   ═══════════════════════════════════════════════════════════════════════════

   ✅ PASO 1: Agregar botón de grabar en el VIEWER HEADER (~línea 612)
   Después del botón de pantalla completa:

   <button onclick="startRecording()"
       class="p-1.5 text-slate-500 hover:text-red-500 dark:text-slate-400 transition"
       title="Grabar simulación en video">
       <i data-lucide="video" class="w-4 h-4"></i>
   </button>

   ✅ PASO 2: Cargar el script en index.html (antes del cierre </body>):
   
   <script src="js/screen-recorder.js"></script>

   ═══════════════════════════════════════════════════════════════════════════ */
