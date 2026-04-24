/* ═══════════════════════════════════════════════════════════════════════════════
   🤖 PHYSICS GENIUS v4.0 - Chatbot Tutor Pedagógico Inmersivo
   ═══════════════════════════════════════════════════════════════════════════════
   🎓 Autor: Msc. Néstor Fabio Montoya Palacios
   🏫 Física Interactiva - I.E. María Auxiliadora, Cartago
   
   📝 USO: <script src="js/chatbot-widget.js"></script> antes de </body>
   🔑 API Key gratuita: https://aistudio.google.com/apikey
   
   ✨ v4.0: Personalidad inmersiva, post-its, 100+ frases, anti-fallos API,
            resúmenes, exportar PDF, sugerencias contextuales
   ═══════════════════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

// ═══ CONFIGURACIÓN ═══
const GEMINI_MODELS = [
    'gemini-2.5-flash',     // Modelo principal gratuito (confirmado)
    'gemini-2.0-flash',     // Alternativa
    'gemini-1.5-flash'      // Fallback estable
];
const STORAGE_API = 'pg_apiKey';
const STORAGE_SCI = 'pg_scientist';
const STORAGE_POSTITS = 'pg_postits';

const SVG_EINSTEIN = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
<defs>
<radialGradient id="esSkin" cx=".5" cy=".5" r=".5"><stop offset="0%" stop-color="#FCE1C6"/><stop offset="100%" stop-color="#E3B78F"/></radialGradient>
<radialGradient id="esHair" cx=".5" cy=".3" r=".6"><stop offset="0%" stop-color="#FFFFFF"/><stop offset="100%" stop-color="#D0D0D0"/></radialGradient>
<linearGradient id="esSuit" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#6D7278"/><stop offset="100%" stop-color="#4B5055"/></linearGradient>
</defs>
<g><animateTransform attributeName="transform" type="translate" values="0,0;0,-1;0,0" dur="4.5s" repeatCount="indefinite"/>
<!-- Hombros y traje -->
<path d="M25,119 L32,95 Q46,85 60,86 Q74,85 88,95 L95,119 Z" fill="url(#esSuit)"/>
<path d="M40,92 L60,119 L80,92" fill="#E8EBED"/> <!-- Camisa blanca -->
<path d="M49,94 L60,105 L71,94" fill="#333"/> <!-- Corbata oscura opcional / sombra interior -->
<path d="M32,95 L49,119" fill="none" stroke="#4B5055" stroke-width="1.5"/><path d="M88,95 L71,119" fill="none" stroke="#4B5055" stroke-width="1.5"/>

<!-- Cuello -->
<rect x="47" y="75" width="26" height="20" rx="6" fill="#D3A77F"/>
<path d="M47,85 Q60,90 73,85" fill="none" stroke="#B88A60" stroke-width="2" opacity=".6"/>

<!-- Cabello desordenado posterior -->
<path d="M15,60 Q5,40 25,25 Q15,5 45,10 Q50,-5 60,5 Q70,-5 75,10 Q105,5 95,25 Q115,40 105,60 Q120,70 100,80 Q85,90 75,85 Q60,88 45,85 Q35,90 20,80 Q0,70 15,60 Z" fill="url(#esHair)" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.2))"/>
<path d="M15,60 Q5,40 25,25 Q15,5 45,10" fill="none" stroke="#B0B0B0" stroke-width="1.5" stroke-linecap="round"/>

<!-- Rostro, más avejentado y ovalado -->
<path d="M33,40 Q30,65 40,82 Q50,90 60,90 Q70,90 80,82 Q90,65 87,40 Q85,15 60,20 Q35,15 33,40 Z" fill="url(#esSkin)"/>

<!-- Orejas grandes -->
<path d="M33,50 Q24,45 23,55 Q22,65 30,68" fill="#E3B78F" stroke="#C89A70" stroke-width="1"/>
<path d="M87,50 Q96,45 97,55 Q98,65 90,68" fill="#E3B78F" stroke="#C89A70" stroke-width="1"/>

<!-- Arrugas en la frente -->
<path d="M45,28 Q60,32 75,28" fill="none" stroke="#C89A70" stroke-width="1.2" opacity=".7"/>
<path d="M42,33 Q60,37 78,33" fill="none" stroke="#C89A70" stroke-width="1.5" opacity=".8"/>
<path d="M46,38 Q60,41 74,38" fill="none" stroke="#C89A70" stroke-width="1" opacity=".6"/>

<!-- Cejas espesas blancas/grises, un poco caídas -->
<path d="M35,47 Q45,39 54,46 Q45,43 35,47 Z" fill="#E8E8E8" stroke="#B0B0B0" stroke-width=".5"><animate attributeName="d" values="M35,47 Q45,39 54,46 Q45,43 35,47 Z;M35,46 Q45,37 54,44 Q45,41 35,46 Z;M35,47 Q45,39 54,46 Q45,43 35,47 Z" dur="6s" repeatCount="indefinite"/></path>
<path d="M85,47 Q75,39 66,46 Q75,43 85,47 Z" fill="#E8E8E8" stroke="#B0B0B0" stroke-width=".5"><animate attributeName="d" values="M85,47 Q75,39 66,46 Q75,43 85,47 Z;M85,46 Q75,37 66,44 Q75,41 85,46 Z;M85,47 Q75,39 66,46 Q75,43 85,47 Z" dur="6s" repeatCount="indefinite"/></path>

<!-- Ojos con ojeras marcadas -->
<!-- Ojeras -->
<path d="M40,58 Q47,64 54,58" fill="none" stroke="#B88A60" stroke-width="2" opacity=".7"/>
<path d="M38,61 Q47,68 56,61" fill="none" stroke="#A07248" stroke-width="1.2" opacity=".4"/>
<path d="M80,58 Q73,64 66,58" fill="none" stroke="#B88A60" stroke-width="2" opacity=".7"/>
<path d="M82,61 Q73,68 64,61" fill="none" stroke="#A07248" stroke-width="1.2" opacity=".4"/>
<!-- Globos oculares -->
<ellipse cx="47" cy="54" rx="7" ry="5" fill="#FFF" stroke="#C89A70" stroke-width=".5"/>
<ellipse cx="73" cy="54" rx="7" ry="5" fill="#FFF" stroke="#C89A70" stroke-width=".5"/>
<!-- Párpados pesados -->
<path d="M39,52 Q47,48 55,54" fill="none" stroke="#A07248" stroke-width="1.5" opacity=".8"/>
<path d="M81,52 Q73,48 65,54" fill="none" stroke="#A07248" stroke-width="1.5" opacity=".8"/>
<!-- Iris profundo -->
<circle cx="47" cy="54" r="3.5" fill="#4A3B2C"><animate attributeName="cy" values="54;54;54;54;54" keyTimes="0;.46;.48;.50;1" dur="5s" repeatCount="indefinite"/></circle>
<circle cx="47" cy="54" r="1.5" fill="#1A1108"/>
<circle cx="48.5" cy="52.5" r="1" fill="#FFF" opacity=".8"/>
<circle cx="73" cy="54" r="3.5" fill="#4A3B2C"><animate attributeName="cy" values="54;54;54;54;54" keyTimes="0;.47;.49;.51;1" dur="5s" repeatCount="indefinite"/></circle>
<circle cx="73" cy="54" r="1.5" fill="#1A1108"/>
<circle cx="74.5" cy="52.5" r="1" fill="#FFF" opacity=".8"/>
<!-- Patas de gallo -->
<path d="M38,54 L34,56 M39,56 L35,59" stroke="#C89A70" stroke-width="1" opacity=".6"/>
<path d="M82,54 L86,56 M81,56 L85,59" stroke="#C89A70" stroke-width="1" opacity=".6"/>

<!-- Nariz prominente y redondeada -->
<path d="M57,54 Q55,64 54,68 Q54,73 60,74 Q66,73 66,68 Q65,64 63,54" fill="#EAA778" opacity=".6"/>
<path d="M54,68 Q60,76 66,68" fill="none" stroke="#B88A60" stroke-width="1.5"/>
<path d="M52,66 Q54,72 56,69" fill="none" stroke="#B88A60" stroke-width="1"/>
<path d="M68,66 Q66,72 64,69" fill="none" stroke="#B88A60" stroke-width="1"/>
<!-- Surcos nasogenianos (Smile lines) -->
<path d="M50,70 Q45,78 43,84" fill="none" stroke="#C89A70" stroke-width="1.2" opacity=".8"/>
<path d="M70,70 Q75,78 77,84" fill="none" stroke="#C89A70" stroke-width="1.2" opacity=".8"/>

<!-- Bigote muy espeso que cubre la boca -->
<path d="M38,76 Q45,70 60,72 Q75,70 82,76 Q85,85 75,82 Q65,86 60,82 Q55,86 45,82 Q35,85 38,76 Z" fill="#D8D8D8" filter="drop-shadow(0px 2px 2px rgba(0,0,0,0.2))"/>
<!-- Trazos del bigote -->
<path d="M42,75 Q50,82 58,78" fill="none" stroke="#B0B0B0" stroke-width="1.2"/>
<path d="M78,75 Q70,82 62,78" fill="none" stroke="#B0B0B0" stroke-width="1.2"/>
<path d="M45,73 Q55,80 60,75 Q65,80 75,73" fill="none" stroke="#E8E8E8" stroke-width="1.5"/>
<path d="M40,80 Q45,83 50,80" fill="none" stroke="#A0A0A0" stroke-width="1"/>
<path d="M80,80 Q75,83 70,80" fill="none" stroke="#A0A0A0" stroke-width="1"/>

<!-- Boca (casi oculta bajo el bigote, sólo línea inferior) -->
<path d="M52,82 Q60,85 68,82" fill="none" stroke="#A07248" stroke-width="1.5"/>

<!-- Mechones frontales sueltos -->
<path d="M40,15 Q35,30 25,35" fill="none" stroke="#E8E8E8" stroke-width="2.5" stroke-linecap="round"/>
<path d="M80,15 Q85,30 95,35" fill="none" stroke="#E8E8E8" stroke-width="2.5" stroke-linecap="round"/>
<path d="M50,12 Q45,25 35,28" fill="none" stroke="#D0D0D0" stroke-width="2" stroke-linecap="round"/>
<path d="M70,12 Q75,25 85,28" fill="none" stroke="#D0D0D0" stroke-width="2" stroke-linecap="round"/>
<path d="M60,10 Q58,22 62,28" fill="none" stroke="#FFF" stroke-width="2" stroke-linecap="round"/>
</g>
<!-- Ecuación icónica (mantenemos pero más minimalista) -->
<g opacity=".8">
<text x="8" y="112" font-size="7" fill="#FFF" font-family="serif" font-style="italic" opacity=".4">E=mc²</text>
<text x="9" y="113" font-size="7" fill="#6C63FF" font-family="serif" font-style="italic" font-weight="bold">E=mc²</text>
</g>
</svg>`;

const SVG_NEWTON = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
<defs>
<radialGradient id="ns" cx=".5" cy=".4" r=".5"><stop offset="0%" stop-color="#FDE4C4"/><stop offset="100%" stop-color="#E8C49A"/></radialGradient>
<radialGradient id="nw" cx=".5" cy=".3" r=".6"><stop offset="0%" stop-color="#D8D0E0"/><stop offset="100%" stop-color="#A8A0B8"/></radialGradient>
<linearGradient id="nSuit" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#28283E"/><stop offset="100%" stop-color="#1A1A2E"/></linearGradient>
<radialGradient id="nBlush" cx=".5" cy=".5" r=".5"><stop offset="0%" stop-color="#FFB7B2"/><stop offset="100%" stop-color="#FFB7B2" stop-opacity="0"/></radialGradient>
</defs>
<g><animateTransform attributeName="transform" type="translate" values="0,0;0,-.6;0,0" dur="5s" repeatCount="indefinite"/>
<!-- Peluca elaborada con rizos espirales -->
<g><animateTransform attributeName="transform" type="rotate" values="-.3,60,40;.3,60,40;-.3,60,40" dur="5s" repeatCount="indefinite"/>
<path d="M14,60 Q8,28 28,14 Q44,2 60,4 Q76,2 92,14 Q112,28 106,60 Q112,82 104,100 L16,100 Q8,82 14,60Z" fill="url(#nw)"/>
<path d="M18,54 Q12,32 34,18 Q50,8 60,10 Q70,8 86,18 Q108,32 102,54" fill="#C8C0D0"/>
<!-- Rizos espirales izquierda -->
<circle cx="14" cy="58" r="9" fill="#C0B8CC"/><circle cx="12" cy="70" r="8.5" fill="#B8B0C4"/><circle cx="13" cy="82" r="8" fill="#B0A8BC"/><circle cx="16" cy="92" r="7" fill="#A8A0B4"/>
<path d="M8,56 Q4,60 8,64 Q12,60 8,56" fill="#D0C8D8" opacity=".5"/>
<path d="M6,68 Q2,72 6,76 Q10,72 6,68" fill="#C8C0D0" opacity=".4"/>
<path d="M7,80 Q3,84 7,88 Q11,84 7,80" fill="#C0B8CC" opacity=".4"/>
<!-- Rizos espirales derecha -->
<circle cx="106" cy="58" r="9" fill="#C0B8CC"/><circle cx="108" cy="70" r="8.5" fill="#B8B0C4"/><circle cx="107" cy="82" r="8" fill="#B0A8BC"/><circle cx="104" cy="92" r="7" fill="#A8A0B4"/>
<path d="M112,56 Q116,60 112,64 Q108,60 112,56" fill="#D0C8D8" opacity=".5"/>
<path d="M114,68 Q118,72 114,76 Q110,72 114,68" fill="#C8C0D0" opacity=".4"/>
<!-- Ondulaciones superiores -->
<path d="M26,18 Q30,12 38,16 Q44,20 48,15 Q52,10 58,14" fill="none" stroke="#C8C0D0" stroke-width="1.8"/>
<path d="M62,14 Q68,10 72,15 Q76,20 82,16 Q88,12 94,18" fill="none" stroke="#C8C0D0" stroke-width="1.8"/>
<path d="M48,8 Q56,4 68,8" fill="none" stroke="#B8B0C4" stroke-width="1.4"/>
<ellipse cx="60" cy="14" rx="4" ry="3" fill="#C0B8CC" opacity=".6"/>
<!-- Mechones de pelo sobre frente -->
<path d="M36,20 Q40,14 46,18" fill="none" stroke="#BAB2C6" stroke-width="2" stroke-linecap="round"/>
<path d="M74,18 Q80,14 84,20" fill="none" stroke="#BAB2C6" stroke-width="2" stroke-linecap="round"/>
</g>
<!-- Cuello -->
<rect x="50" y="87" width="20" height="16" rx="4" fill="#E8C49A"/>
<!-- Traje con botones dorados y cuello de encaje -->
<path d="M32,98 L50,87 L60,94 L70,87 L88,98 L91,119 L29,119Z" fill="url(#nSuit)"/>
<path d="M50,87 L60,94 L70,87" fill="none" stroke="#F0E0C8" stroke-width="2.2"/>
<!-- Encaje de cuello detallado -->
<ellipse cx="60" cy="93" rx="13" ry="4" fill="#F0EAD8" stroke="#D8D0C0" stroke-width=".4"/>
<path d="M50,91 Q52,94 54,91 Q56,94 58,91 Q60,94 62,91 Q64,94 66,91 Q68,94 70,91" fill="none" stroke="#D0C8B8" stroke-width=".8"/>
<!-- Botones dorados -->
<circle cx="60" cy="101" r="2" fill="#DAA520" stroke="#B8860B" stroke-width=".5"/><ellipse cx="59.5" cy="100.5" rx="1" ry=".8" fill="#FFD700" opacity=".4"/>
<circle cx="60" cy="107" r="1.8" fill="#DAA520" stroke="#B8860B" stroke-width=".4"/><ellipse cx="59.5" cy="106.5" rx=".9" ry=".7" fill="#FFD700" opacity=".4"/>
<circle cx="60" cy="113" r="1.5" fill="#DAA520" stroke="#B8860B" stroke-width=".3"/>
<!-- Solapas del traje -->
<path d="M36,98 L50,87 L50,102" fill="#222238" stroke="#333348" stroke-width=".3"/>
<path d="M84,98 L70,87 L70,102" fill="#222238" stroke="#333348" stroke-width=".3"/>
<!-- Cara -->
<ellipse cx="60" cy="60" rx="33" ry="38" fill="url(#ns)"/>
<!-- Orejas -->
<ellipse cx="27" cy="58" rx="5.5" ry="9" fill="#E8C49A" stroke="#D4A878" stroke-width=".4"/>
<path d="M25,52 Q23,56 25,62" fill="none" stroke="#D4A878" stroke-width=".6" opacity=".4"/>
<ellipse cx="93" cy="58" rx="5.5" ry="9" fill="#E8C49A" stroke="#D4A878" stroke-width=".4"/>
<path d="M95,52 Q97,56 95,62" fill="none" stroke="#D4A878" stroke-width=".6" opacity=".4"/>
<!-- Cejas arqueadas y serias -->
<line x1="37" y1="47" x2="55" y2="43" stroke="#7A6858" stroke-width="2.8" stroke-linecap="round"><animate attributeName="y1" values="47;45;47" dur="6s" repeatCount="indefinite"/></line>
<line x1="65" y1="43" x2="83" y2="47" stroke="#7A6858" stroke-width="2.8" stroke-linecap="round"><animate attributeName="y1" values="43;41;43" dur="6s" repeatCount="indefinite"/></line>
<!-- Ojos mejorados -->
<ellipse cx="47" cy="55" rx="9.5" ry="8" fill="white" stroke="#B8A080" stroke-width=".5"/>
<ellipse cx="73" cy="55" rx="9.5" ry="8" fill="white" stroke="#B8A080" stroke-width=".5"/>
<ellipse cx="48" cy="55" rx="6" ry="6.5" fill="#384860"><animate attributeName="ry" values="6.5;6.5;.5;6.5;6.5" keyTimes="0;.48;.50;.52;1" dur="5.5s" repeatCount="indefinite"/></ellipse>
<circle cx="48" cy="55" r="4" fill="#1A2535"/>
<circle cx="50" cy="53" r="2.2" fill="white" opacity=".88"/>
<circle cx="46" cy="57" r=".9" fill="white" opacity=".35"/>
<ellipse cx="74" cy="55" rx="6" ry="6.5" fill="#384860"><animate attributeName="ry" values="6.5;6.5;.5;6.5;6.5" keyTimes="0;.49;.51;.53;1" dur="5.5s" repeatCount="indefinite"/></ellipse>
<circle cx="74" cy="55" r="4" fill="#1A2535"/>
<circle cx="76" cy="53" r="2.2" fill="white" opacity=".88"/>
<circle cx="72" cy="57" r=".9" fill="white" opacity=".35"/>
<!-- Nariz larga y recta -->
<path d="M57,50 L55,66 Q57,72 60,73 Q63,72 65,66 L63,50" fill="#F0D0A8" stroke="#CCA068" stroke-width=".7"/>
<path d="M55,70 Q60,74 65,70" fill="none" stroke="#CCA068" stroke-width=".7"/>
<!-- Mejillas sutiles -->
<circle cx="38" cy="70" r="5" fill="url(#nBlush)" opacity=".2"/>
<circle cx="82" cy="70" r="5" fill="url(#nBlush)" opacity=".2"/>
<!-- Boca seria pero con leve sonrisa -->
<path d="M48,78 Q60,84 72,78" fill="none" stroke="#A07058" stroke-width="2" stroke-linecap="round"><animate attributeName="d" values="M48,78 Q60,84 72,78;M48,79 Q60,86 72,79;M48,78 Q60,84 72,78" dur="8s" repeatCount="indefinite"/></path>
<!-- Manzana cayendo con gravedad realista y rebote -->
<g><animateTransform attributeName="transform" type="translate" values="0,-70;0,-70;0,0;0,-6;0,0;0,-2;0,0;0,0" keyTimes="0;.55;.72;.78;.82;.86;.88;1" dur="6s" repeatCount="indefinite"/>
<circle cx="104" cy="14" r="8.5" fill="#E74C3C" opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;.54;.56;1" dur="6s" repeatCount="indefinite"/></circle>
<ellipse cx="104" cy="16" rx="7.5" ry="6" fill="#C0392B" opacity="0"><animate attributeName="opacity" values="0;0;.25;.25" keyTimes="0;.54;.56;1" dur="6s" repeatCount="indefinite"/></ellipse>
<!-- Brillo manzana -->
<circle cx="101" cy="10" r="2.5" fill="white" opacity="0"><animate attributeName="opacity" values="0;0;.2;.2" keyTimes="0;.54;.56;1" dur="6s" repeatCount="indefinite"/></circle>
<!-- Tallo con detalle -->
<path d="M104,6 L105,1" stroke="#5A3E2B" stroke-width="2" stroke-linecap="round" opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;.54;.56;1" dur="6s" repeatCount="indefinite"/></path>
<!-- Hojas detalladas -->
<path d="M105.5,3 Q110,0 109,6" fill="#27AE60" stroke="#1E8449" stroke-width=".4" opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;.54;.56;1" dur="6s" repeatCount="indefinite"/></path>
<path d="M106,1.5 Q109,-1 108,4" fill="#2ECC71" opacity="0"><animate attributeName="opacity" values="0;0;.6;.6" keyTimes="0;.54;.56;1" dur="6s" repeatCount="indefinite"/></path>
<path d="M103,3 Q99,1 100,5" fill="#27AE60" stroke="#1E8449" stroke-width=".3" opacity="0"><animate attributeName="opacity" values="0;0;.7;.7" keyTimes="0;.54;.56;1" dur="6s" repeatCount="indefinite"/></path>
</g>
</g>
</svg>`;

const SVG_TESLA = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
<defs>
<radialGradient id="ts" cx=".5" cy=".4" r=".5"><stop offset="0%" stop-color="#F8DCC0"/><stop offset="100%" stop-color="#E0BB90"/></radialGradient>
<linearGradient id="tSuit" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#121222"/><stop offset="100%" stop-color="#0A0A16"/></linearGradient>
<filter id="tg"><feGaussianBlur stdDeviation="2.5"/><feComposite in="SourceGraphic"/></filter>
<filter id="tg2"><feGaussianBlur stdDeviation="1.5"/><feComposite in="SourceGraphic"/></filter>
</defs>
<g><animateTransform attributeName="transform" type="translate" values="0,0;0,-.5;0,0" dur="4.5s" repeatCount="indefinite"/>
<!-- Cabello negro elegante con reflejos -->
<path d="M24,54 Q21,24 36,14 Q48,4 60,6 Q72,4 84,14 Q99,24 96,54" fill="#121212"/>
<path d="M26,50 Q24,28 38,18 Q50,10 60,11 Q70,10 82,18 Q96,28 94,50" fill="#1E1E1E"/>
<!-- Reflejos azulados en el cabello -->
<path d="M40,14 Q52,9 66,12" fill="none" stroke="#2A3A5A" stroke-width="2.5" stroke-linecap="round" opacity=".3"/>
<path d="M44,18 Q56,14 70,16" fill="none" stroke="#1E2E4E" stroke-width="2" opacity=".25"/>
<path d="M36,14 Q40,10 46,12" fill="none" stroke="#253555" stroke-width="1.5" opacity=".2"/>
<path d="M74,12 Q80,10 86,14" fill="none" stroke="#253555" stroke-width="1.5" opacity=".2"/>
<!-- Patilla lateral tipo sideburns -->
<rect x="24" y="46" width="7" height="18" rx="3" fill="#161616"/><rect x="89" y="46" width="7" height="18" rx="3" fill="#161616"/>
<!-- Cuello -->
<rect x="51" y="87" width="18" height="15" rx="3" fill="#E0BB90"/>
<!-- Traje formal elegante -->
<path d="M32,96 L51,87 L60,94 L69,87 L88,96 L92,119 L28,119Z" fill="url(#tSuit)"/>
<!-- Solapas V -->
<path d="M51,87 L60,94 L54,119" fill="#181830"/><path d="M69,87 L60,94 L66,119" fill="#181830"/>
<!-- Camisa blanca visible -->
<path d="M54,94 L60,100 L66,94" fill="#E8E0D0" opacity=".6"/>
<!-- Corbata con alfiler de rayo -->
<path d="M57.5,94 L60,100 L62.5,94 L61.5,119 L58.5,119Z" fill="#1A5276"/>
<circle cx="60" cy="103" r="1.5" fill="#00B4D8" stroke="#0090A8" stroke-width=".3"/>
<!-- Mini rayo en alfiler -->
<path d="M59.5,102 L60,103.5 L60.5,102.5 L60,104" fill="none" stroke="#80DEEA" stroke-width=".4" stroke-linecap="round"/>
<!-- Costuras del traje -->
<path d="M34,98 L42,119" fill="none" stroke="#1A1A28" stroke-width=".4" opacity=".3"/><path d="M86,98 L78,119" fill="none" stroke="#1A1A28" stroke-width=".4" opacity=".3"/>
<!-- Cara angular -->
<path d="M28,52 Q26,28 42,22 L78,22 Q94,28 92,52 L90,72 Q84,92 60,94 Q36,92 30,72Z" fill="url(#ts)"/>
<!-- Orejas -->
<ellipse cx="27" cy="55" rx="5.5" ry="9" fill="#E0BB90" stroke="#D4A070" stroke-width=".4"/>
<path d="M25,49 Q23,53 25,59" fill="none" stroke="#D4A070" stroke-width=".6" opacity=".4"/>
<ellipse cx="93" cy="55" rx="5.5" ry="9" fill="#E0BB90" stroke="#D4A070" stroke-width=".4"/>
<path d="M95,49 Q97,53 95,59" fill="none" stroke="#D4A070" stroke-width=".6" opacity=".4"/>
<!-- Cejas elegantes y definidas -->
<path d="M38,45 Q47,39 56,42" fill="none" stroke="#1C1C1C" stroke-width="2.8" stroke-linecap="round"><animate attributeName="d" values="M38,45 Q47,39 56,42;M38,43 Q47,37 56,40;M38,45 Q47,39 56,42" dur="5.5s" repeatCount="indefinite"/></path>
<path d="M64,42 Q73,39 82,45" fill="none" stroke="#1C1C1C" stroke-width="2.8" stroke-linecap="round"><animate attributeName="d" values="M64,42 Q73,39 82,45;M64,40 Q73,37 82,43;M64,42 Q73,39 82,45" dur="5.5s" repeatCount="indefinite"/></path>
<!-- Ojos azul eléctrico con plasma -->
<ellipse cx="47" cy="53" rx="9.5" ry="8.5" fill="white" stroke="#B8A080" stroke-width=".5"/>
<ellipse cx="73" cy="53" rx="9.5" ry="8.5" fill="white" stroke="#B8A080" stroke-width=".5"/>
<ellipse cx="48" cy="53" rx="6.5" ry="7" fill="#1A5276"><animate attributeName="ry" values="7;7;.5;7;7" keyTimes="0;.42;.44;.46;1" dur="5s" repeatCount="indefinite"/></ellipse>
<circle cx="48" cy="53" r="4.5" fill="#0B2E4A"/>
<circle cx="50.5" cy="51" r="2.5" fill="white" opacity=".9"/>
<circle cx="46" cy="55" r=".9" fill="white" opacity=".35"/>
<!-- Chispa de plasma ojo izquierdo -->
<circle cx="45" cy="56" r="1.2" fill="#80DEEA" opacity=".5"><animate attributeName="opacity" values=".2;.9;.2" dur="1.5s" repeatCount="indefinite"/><animate attributeName="r" values="1;1.5;1" dur="1.5s" repeatCount="indefinite"/></circle>
<ellipse cx="74" cy="53" rx="6.5" ry="7" fill="#1A5276"><animate attributeName="ry" values="7;7;.5;7;7" keyTimes="0;.43;.45;.47;1" dur="5s" repeatCount="indefinite"/></ellipse>
<circle cx="74" cy="53" r="4.5" fill="#0B2E4A"/>
<circle cx="76.5" cy="51" r="2.5" fill="white" opacity=".9"/>
<circle cx="72" cy="55" r=".9" fill="white" opacity=".35"/>
<!-- Chispa de plasma ojo derecho -->
<circle cx="71" cy="56" r="1.2" fill="#80DEEA" opacity=".5"><animate attributeName="opacity" values=".9;.2;.9" dur="1.5s" repeatCount="indefinite"/><animate attributeName="r" values="1.5;1;1.5" dur="1.5s" repeatCount="indefinite"/></circle>
<!-- Nariz angular -->
<path d="M57,49 L55,65 Q57,70 60,71 Q63,70 65,65 L63,49" fill="#F0CCA0" stroke="#CCA060" stroke-width=".6"/>
<path d="M54,68 Q60,72 66,68" fill="none" stroke="#CCA060" stroke-width=".7"/>
<!-- Bigote fino y elegante con puntas -->
<path d="M42,76 Q50,80 60,76 Q70,80 78,76" fill="#222"/>
<path d="M44,77 Q52,79 60,76 Q68,79 76,77" fill="#333"/>
<path d="M40,76 Q42,79 39,80" fill="none" stroke="#222" stroke-width=".8" stroke-linecap="round"/>
<path d="M80,76 Q78,79 81,80" fill="none" stroke="#222" stroke-width=".8" stroke-linecap="round"/>
<!-- Boca seria pero distinguida -->
<path d="M47,82 Q60,88 73,82" fill="none" stroke="#A07058" stroke-width="1.8" stroke-linecap="round"><animate attributeName="d" values="M47,82 Q60,88 73,82;M47,83 Q60,90 73,83;M47,82 Q60,88 73,82" dur="7s" repeatCount="indefinite"/></path>
</g>
<!-- Rayos eléctricos con arco voltaico elaborado -->
<g filter="url(#tg)"><path d="M106,2 L99,16 L106,14 L96,30 L102,28 L92,40" fill="none" stroke="#00B4D8" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><animate attributeName="opacity" values=".2;1;.2" dur="1.2s" repeatCount="indefinite"/></path></g>
<!-- Arco secundario -->
<g filter="url(#tg2)"><path d="M108,8 L103,18 L108,16 L100,28" fill="none" stroke="#80DEEA" stroke-width="1.5" stroke-linecap="round" opacity=".4"><animate attributeName="opacity" values=".1;.6;.1" dur="1.5s" repeatCount="indefinite"/></path></g>
<!-- Chispas eléctricas variadas -->
<circle cx="112" cy="8" r="2.5" fill="#80DEEA"><animate attributeName="r" values="1.5;3.5;1.5" dur="1.8s" repeatCount="indefinite"/><animate attributeName="opacity" values=".2;1;.2" dur="1.8s" repeatCount="indefinite"/></circle>
<circle cx="90" cy="42" r="2" fill="#00B4D8"><animate attributeName="opacity" values="1;.1;1" dur="2s" repeatCount="indefinite"/><animate attributeName="r" values="1;2.5;1" dur="2s" repeatCount="indefinite"/></circle>
<circle cx="114" cy="24" r="1.5" fill="#80DEEA"><animate attributeName="opacity" values=".1;.9;.1" dur="1.4s" repeatCount="indefinite"/></circle>
<circle cx="96" cy="8" r="1" fill="#E0F7FA"><animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite"/></circle>
<circle cx="116" cy="18" r=".8" fill="#B2EBF2"><animate attributeName="opacity" values=".5;1;.5" dur=".8s" repeatCount="indefinite"/></circle>
<!-- Línea de campo magnético sutil -->
<path d="M92,42 Q95,38 98,42 Q101,46 104,42" fill="none" stroke="#00B4D8" stroke-width=".6" opacity=".3"><animate attributeName="opacity" values=".1;.4;.1" dur="3s" repeatCount="indefinite"/></path>
</svg>`;

const SVG_GALILEO = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
<defs>
<radialGradient id="gsSkin" cx=".5" cy=".4" r=".6"><stop offset="0%" stop-color="#FCE1C6"/><stop offset="100%" stop-color="#CA9C7A"/></radialGradient>
<radialGradient id="gsHair" cx=".5" cy=".5" r=".5"><stop offset="0%" stop-color="#EAEAEA"/><stop offset="100%" stop-color="#B0B0B0"/></radialGradient>
<linearGradient id="gSuit" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1E2328"/><stop offset="100%" stop-color="#0A0C0E"/></linearGradient>
</defs>
<g><animateTransform attributeName="transform" type="translate" values="0,0;0,-.5;0,0" dur="5s" repeatCount="indefinite"/>

<!-- Traje y manto renacentista oscuro -->
<path d="M25,119 L30,95 Q40,88 60,90 Q80,88 90,95 L95,119 Z" fill="url(#gSuit)"/>
<path d="M30,95 Q45,100 60,119 L25,119 Z" fill="#14181C"/><path d="M90,95 Q75,100 60,119 L95,119 Z" fill="#14181C"/>

<!-- Cuello base -->
<rect x="50" y="80" width="20" height="20" rx="4" fill="#BB8B69"/>

<!-- Gorguera (Cuello rizado renacentista) -->
<path d="M32,95 Q38,82 60,85 Q82,82 88,95 Q75,102 60,98 Q45,102 32,95 Z" fill="#F4F0E6" stroke="#C8C0A8" stroke-width="1"/>
<!-- Pliegues de la gorguera en bucle intenso -->
<path d="M35,93 Q40,85 45,94 T55,94 T65,94 T75,94 T85,93" fill="none" stroke="#D8D0B8" stroke-width="2.5" opacity=".8"/>
<path d="M38,96 Q43,88 48,97 T58,97 T68,97 T78,97 Q80,92 82,96" fill="none" stroke="#D8D0B8" stroke-width="1.5" opacity=".6"/>

<!-- Cabello lateral y entradas muy pronunciadas (casi calvo arriba) -->
<path d="M20,60 Q15,40 28,25 Q30,22 35,28 Q30,35 27,45 Q25,55 30,65 Z" fill="url(#gsHair)"/>
<path d="M100,60 Q105,40 92,25 Q90,22 85,28 Q90,35 93,45 Q95,55 90,65 Z" fill="url(#gsHair)"/>
<!-- Detalles del cabello -->
<path d="M22,45 Q20,35 28,30 M98,45 Q100,35 92,30" fill="none" stroke="#9A9A9A" stroke-width="1.5" stroke-linecap="round"/>

<!-- Forma del rostro: frente muy amplia, cara alargada -->
<path d="M35,35 Q30,65 40,85 Q50,92 60,92 Q70,92 80,85 Q90,65 85,35 Q85,15 60,12 Q35,15 35,35 Z" fill="url(#gsSkin)"/>
<!-- Sombras faciales (Mejillas hundidas) -->
<path d="M40,65 Q45,75 52,80" fill="none" stroke="#B88A68" stroke-width="3" opacity=".3"/>
<path d="M80,65 Q75,75 68,80" fill="none" stroke="#B88A68" stroke-width="3" opacity=".3"/>

<!-- Arrugas de la frente amplias y sabias -->
<path d="M42,28 Q60,32 78,28" fill="none" stroke="#B88A68" stroke-width="1.5" opacity=".5"/>
<path d="M45,33 Q60,36 75,33" fill="none" stroke="#B88A68" stroke-width="1.2" opacity=".4"/>
<path d="M48,38 Q60,40 72,38" fill="none" stroke="#B88A68" stroke-width="1" opacity=".3"/>

<!-- Detalles alrededor de los ojos (Patas de gallo y ojeras) -->
<path d="M38,55 Q45,62 55,55" fill="none" stroke="#B88A68" stroke-width="2" opacity=".6"/>
<path d="M82,55 Q75,62 65,55" fill="none" stroke="#B88A68" stroke-width="2" opacity=".6"/>
<!-- Párpados pesados -->
<path d="M42,48 Q48,46 54,54" fill="none" stroke="#9A6B4C" stroke-width="1.5" opacity=".8"/>
<path d="M78,48 Q72,46 66,54" fill="none" stroke="#9A6B4C" stroke-width="1.5" opacity=".8"/>

<!-- Cejas prominentes, un tanto espesas y grises -->
<path d="M38,44 Q46,38 55,44 Q46,41 38,44 Z" fill="#EAEAEA" stroke="#B0B0B0" stroke-width=".5"><animate attributeName="d" values="M38,44 Q46,38 55,44 Q46,41 38,44 Z;M38,42 Q46,36 55,42 Q46,39 38,42 Z;M38,44 Q46,38 55,44 Q46,41 38,44 Z" dur="7s" repeatCount="indefinite"/></path>
<path d="M82,44 Q74,38 65,44 Q74,41 82,44 Z" fill="#EAEAEA" stroke="#B0B0B0" stroke-width=".5"><animate attributeName="d" values="M82,44 Q74,38 65,44 Q74,41 82,44 Z;M82,42 Q74,36 65,42 Q74,39 82,42 Z;M82,44 Q74,38 65,44 Q74,41 82,44 Z" dur="7s" repeatCount="indefinite"/></path>

<!-- Ojos profundos y sabios mejorados con más brillo -->
<ellipse cx="48" cy="52" rx="6.5" ry="4.5" fill="#EAE5E0" stroke="#9A6B4C" stroke-width="1"/>
<ellipse cx="72" cy="52" rx="6.5" ry="4.5" fill="#EAE5E0" stroke="#9A6B4C" stroke-width="1"/>
<circle cx="48" cy="52" r="3" fill="#2E1C0D"/>
<circle cx="49" cy="51" r="1.2" fill="#FFF" opacity=".9"/>
<circle cx="47" cy="53" r=".5" fill="#FFF" opacity=".5"/>
<circle cx="72" cy="52" r="3" fill="#2E1C0D"/>
<circle cx="73" cy="51" r="1.2" fill="#FFF" opacity=".9"/>
<circle cx="71" cy="53" r=".5" fill="#FFF" opacity=".5"/>

<!-- Nariz prominente (aguileña) refinada -->
<path d="M57,51 Q55,68 54,72 Q57,75 60,76 Q63,75 66,72 Q65,68 63,51" fill="#E8B490" opacity=".9"/>
<path d="M54,72 Q60,82 66,72" fill="none" stroke="#A87A58" stroke-width="1.8"/>
<path d="M51,69 Q54,77 58,73 M69,69 Q66,77 62,73" fill="none" stroke="#A87A58" stroke-width="1.2"/>

<!-- Mejillas con rubor sutil para darle vida -->
<circle cx="38" cy="65" r="7" fill="#D48A6A" opacity=".15"/>
<circle cx="82" cy="65" r="7" fill="#D48A6A" opacity=".15"/>

<!-- Barba espesa redondeada clásica de Galileo más hermosa y detallada -->
<path d="M38,76 Q30,95 45,108 Q60,118 75,108 Q90,95 82,76 Q78,85 70,86 Q60,89 50,86 Q42,85 38,76 Z" fill="url(#gsHair)" filter="drop-shadow(0px 3px 4px rgba(0,0,0,0.3))"/>
<!-- Trazos individuales finos en la barba -->
<path d="M42,82 Q40,95 50,110 M78,82 Q80,95 70,110 M52,85 Q48,100 60,114 M68,85 Q72,100 60,114 M60,88 L60,115" fill="none" stroke="#F8F8F8" stroke-width="1" opacity=".6"/>
<path d="M46,84 Q44,97 54,108 M74,84 Q76,97 66,108 M56,86 Q54,102 60,112 M64,86 Q66,102 60,112" fill="none" stroke="#8A8A8A" stroke-width="1.2" opacity=".4"/>

<!-- Bigote abundante y elegante -->
<path d="M40,76 Q48,70 60,73 Q72,70 80,76 Q76,83 70,80 Q60,85 50,80 Q44,83 40,76 Z" fill="#F0F0F0" filter="drop-shadow(0px 2px 2px rgba(0,0,0,0.2))"/>
<path d="M46,75 Q54,80 60,76 Q66,80 74,75 M42,78 Q50,83 60,79 Q70,83 78,78" fill="none" stroke="#D0D0D0" stroke-width="1"/>
</g>

<!-- Elemento celeste cósmico de fondo sutil para dar ambientación -->
<g opacity=".4" filter="blur(1px)">
<circle cx="20" cy="20" r="1.5" fill="#FFF"><animate attributeName="opacity" values=".2;1;.2" dur="3s" repeatCount="indefinite"/></circle>
<circle cx="100" cy="15" r="1" fill="#FFF"><animate attributeName="opacity" values="1;.2;1" dur="2s" repeatCount="indefinite"/></circle>
<circle cx="15" cy="80" r="1" fill="#FFF"><animate attributeName="opacity" values=".2;1;.2" dur="4s" repeatCount="indefinite"/></circle>
<circle cx="105" cy="70" r="1.5" fill="#FFF"><animate attributeName="opacity" values="1;.2;1" dur="2.5s" repeatCount="indefinite"/></circle>
<circle cx="95" cy="40" r=".8" fill="#FFF"><animate attributeName="opacity" values=".5;1;.5" dur="1.8s" repeatCount="indefinite"/></circle>
<circle cx="25" cy="50" r="1.2" fill="#FFF"><animate attributeName="opacity" values=".3;1;.3" dur="3.5s" repeatCount="indefinite"/></circle>
</g>
</svg>`;

const SVG_CURIE = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
<defs>
<radialGradient id="mc" cx=".5" cy=".4" r=".5"><stop offset="0%" stop-color="#FDE4CC"/><stop offset="100%" stop-color="#E8C49A"/></radialGradient>
<radialGradient id="mcg" cx=".5" cy=".5" r=".5"><stop offset="0%" stop-color="#7DFF8B"/><stop offset="60%" stop-color="#39FF14"/><stop offset="100%" stop-color="#00C853"/></radialGradient>
<radialGradient id="mcBlush" cx=".5" cy=".5" r=".5"><stop offset="0%" stop-color="#FFB7B2"/><stop offset="100%" stop-color="#FFB7B2" stop-opacity="0"/></radialGradient>
<linearGradient id="mcDress" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1B2631"/><stop offset="100%" stop-color="#0E1820"/></linearGradient>
<filter id="mcgl"><feGaussianBlur stdDeviation="3"/></filter>
<filter id="mcgl2"><feGaussianBlur stdDeviation="1.5"/></filter>
</defs>
<g><animateTransform attributeName="transform" type="translate" values="0,0;0,-.5;0,0" dur="4.5s" repeatCount="indefinite"/>
<!-- Cabello recogido elaborado -->
<path d="M28,46 Q26,22 42,14 Q52,6 60,7 Q68,6 78,14 Q94,22 92,46" fill="#3E2723"/>
<path d="M30,42 Q28,24 44,16 Q52,10 60,11 Q68,10 76,16 Q92,24 90,42" fill="#4E342E"/>
<!-- Moño superior elaborado con bucles -->
<ellipse cx="60" cy="8" rx="15" ry="11" fill="#3E2723"/>
<ellipse cx="60" cy="6" rx="12" ry="9" fill="#4E342E"/>
<!-- Bucles del moño -->
<circle cx="54" cy="4" r="4" fill="#4E342E"/><circle cx="66" cy="4" r="4" fill="#4E342E"/>
<circle cx="60" cy="2" r="3.5" fill="#3E2723"/>
<circle cx="57" cy="6" r="3" fill="#5D4037" opacity=".6"/><circle cx="63" cy="6" r="3" fill="#5D4037" opacity=".6"/>
<path d="M50,4 Q54,-2 60,0 Q66,-2 70,4" fill="#3E2723"/>
<!-- Mechones sueltos elegantes -->
<path d="M34,14 Q30,20 28,32" fill="none" stroke="#5D4037" stroke-width="1.8" stroke-linecap="round"/>
<path d="M86,14 Q90,20 92,32" fill="none" stroke="#5D4037" stroke-width="1.8" stroke-linecap="round"/>
<path d="M36,18 Q33,24 32,36" fill="none" stroke="#4E342E" stroke-width="1.2" stroke-linecap="round"/>
<path d="M84,18 Q87,24 88,36" fill="none" stroke="#4E342E" stroke-width="1.2" stroke-linecap="round"/>
<!-- Cuello -->
<rect x="50" y="85" width="20" height="15" rx="3" fill="#E8C49A"/>
<!-- Vestido de época con cuello alto -->
<path d="M30,96 L50,87 L60,94 L70,87 L90,96 L94,119 L26,119Z" fill="url(#mcDress)"/>
<!-- Cuello V con encaje -->
<path d="M50,87 L60,94 L70,87" fill="none" stroke="#E8D8C0" stroke-width="1.8"/>
<!-- Encaje en el cuello del vestido -->
<path d="M48,90 Q50,92 52,90 Q54,92 56,90 Q58,92 60,90 Q62,92 64,90 Q66,92 68,90 Q70,92 72,90" fill="none" stroke="#D8D0C0" stroke-width=".7" opacity=".6"/>
<!-- Detalle del vestido - pliegues -->
<path d="M50,94 Q48,119 44,119" fill="none" stroke="#263238" stroke-width=".7" opacity=".3"/>
<path d="M70,94 Q72,119 76,119" fill="none" stroke="#263238" stroke-width=".7" opacity=".3"/>
<path d="M56,98 Q54,119 52,119" fill="none" stroke="#1B2631" stroke-width=".4" opacity=".2"/>
<path d="M64,98 Q66,119 68,119" fill="none" stroke="#1B2631" stroke-width=".4" opacity=".2"/>
<!-- Camafeo/broche -->
<ellipse cx="60" cy="96" rx="3" ry="2.5" fill="#DAA520" stroke="#B8860B" stroke-width=".5" opacity=".7"/>
<ellipse cx="60" cy="96" rx="1.5" ry="1.2" fill="#FFD700" opacity=".3"/>
<!-- Cara -->
<ellipse cx="60" cy="60" rx="32" ry="37" fill="url(#mc)"/>
<!-- Orejas -->
<ellipse cx="28" cy="58" rx="5" ry="8.5" fill="#E8C49A" stroke="#D4A878" stroke-width=".3"/>
<path d="M26,52 Q24,56 26,62" fill="none" stroke="#D4A878" stroke-width=".5" opacity=".4"/>
<ellipse cx="92" cy="58" rx="5" ry="8.5" fill="#E8C49A" stroke="#D4A878" stroke-width=".3"/>
<!-- Cejas finas y elegantes -->
<path d="M37,48 Q46,42 55,46" fill="none" stroke="#5D4037" stroke-width="2.2" stroke-linecap="round"><animate attributeName="d" values="M37,48 Q46,42 55,46;M37,46 Q46,40 55,44;M37,48 Q46,42 55,46" dur="6s" repeatCount="indefinite"/></path>
<path d="M65,46 Q74,42 83,48" fill="none" stroke="#5D4037" stroke-width="2.2" stroke-linecap="round"><animate attributeName="d" values="M65,46 Q74,42 83,48;M65,44 Q74,40 83,46;M65,46 Q74,42 83,48" dur="6s" repeatCount="indefinite"/></path>
<!-- Ojos determinados con pestañas -->
<ellipse cx="47" cy="56" rx="9" ry="8" fill="white" stroke="#C8B090" stroke-width=".4"/>
<ellipse cx="73" cy="56" rx="9" ry="8" fill="white" stroke="#C8B090" stroke-width=".4"/>
<!-- Pestañas superiores -->
<path d="M39,52 L40,49" fill="none" stroke="#3E2723" stroke-width=".7" stroke-linecap="round"/>
<path d="M42,50 L42,47" fill="none" stroke="#3E2723" stroke-width=".6" stroke-linecap="round"/>
<path d="M45,49 L44,47" fill="none" stroke="#3E2723" stroke-width=".5" stroke-linecap="round"/>
<path d="M77,49 L78,47" fill="none" stroke="#3E2723" stroke-width=".5" stroke-linecap="round"/>
<path d="M80,50 L80,47" fill="none" stroke="#3E2723" stroke-width=".6" stroke-linecap="round"/>
<path d="M83,52 L82,49" fill="none" stroke="#3E2723" stroke-width=".7" stroke-linecap="round"/>
<!-- Iris verde determinado -->
<ellipse cx="48" cy="56" rx="6" ry="6.5" fill="#2E7D32"><animate attributeName="ry" values="6.5;6.5;.5;6.5;6.5" keyTimes="0;.44;.46;.48;1" dur="5s" repeatCount="indefinite"/></ellipse>
<circle cx="48" cy="56" r="4" fill="#1B5E20"/>
<circle cx="50" cy="54" r="2.2" fill="white" opacity=".88"/>
<circle cx="46" cy="58" r=".8" fill="white" opacity=".35"/>
<ellipse cx="74" cy="56" rx="6" ry="6.5" fill="#2E7D32"><animate attributeName="ry" values="6.5;6.5;.5;6.5;6.5" keyTimes="0;.45;.47;.49;1" dur="5s" repeatCount="indefinite"/></ellipse>
<circle cx="74" cy="56" r="4" fill="#1B5E20"/>
<circle cx="76" cy="54" r="2.2" fill="white" opacity=".88"/>
<circle cx="72" cy="58" r=".8" fill="white" opacity=".35"/>
<!-- Nariz delicada -->
<path d="M57,52 Q55,62 57,67 Q59,70 60,70 Q61,70 63,67 Q65,62 63,52" fill="#F0CCA8" stroke="#CCA060" stroke-width=".5"/>
<path d="M56,68 Q60,71 64,68" fill="none" stroke="#CCA060" stroke-width=".6"/>
<!-- Mejillas sonrosadas -->
<circle cx="37" cy="68" r="5.5" fill="url(#mcBlush)" opacity=".35"><animate attributeName="opacity" values=".25;.45;.25" dur="6s" repeatCount="indefinite"/></circle>
<circle cx="83" cy="68" r="5.5" fill="url(#mcBlush)" opacity=".35"><animate attributeName="opacity" values=".25;.45;.25" dur="6s" repeatCount="indefinite"/></circle>
<!-- Boca con sonrisa determinada -->
<path d="M47,78 Q60,86 73,78" fill="none" stroke="#A07058" stroke-width="1.8" stroke-linecap="round"><animate attributeName="d" values="M47,78 Q60,86 73,78;M47,79 Q60,88 73,79;M47,78 Q60,86 73,78" dur="7s" repeatCount="indefinite"/></path>
</g>
<!-- Frasco radiactivo mejorado con partículas flotantes -->
<g><animateTransform attributeName="transform" type="rotate" values="-2,12,80;2,12,80;-2,12,80" dur="3s" repeatCount="indefinite"/>
<!-- Tubo del frasco -->
<rect x="5" y="68" width="14" height="26" rx="3.5" fill="none" stroke="#B0BEC5" stroke-width="1.8"/>
<!-- Tapón del frasco -->
<rect x="7" y="66" width="10" height="4" rx="1.5" fill="#B0BEC5"/>
<rect x="8" y="65" width="8" height="2" rx="1" fill="#CFD8DC"/>
<!-- Líquido radiactivo -->
<rect x="7" y="78" width="10" height="14" rx="2.5" fill="url(#mcg)" opacity=".85"/>
<!-- Brillo del vidrio -->
<rect x="6" y="72" width="2" height="16" rx="1" fill="white" opacity=".15"/>
<!-- Glow radiactivo principal -->
<g filter="url(#mcgl)"><circle cx="12" cy="85" r="7" fill="#39FF14" opacity=".3"><animate attributeName="opacity" values=".15;.5;.15" dur="2s" repeatCount="indefinite"/><animate attributeName="r" values="5;10;5" dur="2s" repeatCount="indefinite"/></circle></g>
<!-- Glow secundario -->
<g filter="url(#mcgl2)"><circle cx="12" cy="82" r="4" fill="#7DFF8B" opacity=".2"><animate attributeName="opacity" values=".1;.35;.1" dur="1.5s" repeatCount="indefinite"/></circle></g>
<!-- Burbujas en el líquido -->
<circle cx="10" cy="82" r="1.2" fill="white" opacity=".45"><animate attributeName="cy" values="88;78;88" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values=".2;.5;.2" dur="3s" repeatCount="indefinite"/></circle>
<circle cx="14" cy="86" r=".8" fill="white" opacity=".35"><animate attributeName="cy" values="90;80;90" dur="4s" repeatCount="indefinite"/><animate attributeName="opacity" values=".1;.4;.1" dur="4s" repeatCount="indefinite"/></circle>
<!-- Partículas flotantes radiactivas -->
<circle cx="4" cy="74" r=".6" fill="#39FF14" opacity=".4"><animate attributeName="cy" values="78;68;78" dur="3.5s" repeatCount="indefinite"/><animate attributeName="opacity" values=".1;.5;.1" dur="3.5s" repeatCount="indefinite"/></circle>
<circle cx="20" cy="76" r=".5" fill="#7DFF8B" opacity=".3"><animate attributeName="cy" values="80;70;80" dur="4.5s" repeatCount="indefinite"/><animate attributeName="opacity" values=".05;.4;.05" dur="4.5s" repeatCount="indefinite"/></circle>
<circle cx="8" cy="70" r=".4" fill="#39FF14" opacity=".2"><animate attributeName="cy" values="74;64;74" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.35;0" dur="3s" repeatCount="indefinite"/></circle>
</g>
</svg>`;

const SVG_DIRAC = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
<defs>
<radialGradient id="ds" cx=".5" cy=".4" r=".5"><stop offset="0%" stop-color="#FDE4CC"/><stop offset="100%" stop-color="#DCBB92"/></radialGradient>
<linearGradient id="dSuit" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1A237E"/><stop offset="100%" stop-color="#0D1446"/></linearGradient>
<filter id="dgl"><feGaussianBlur stdDeviation="1.5"/><feComposite in="SourceGraphic"/></filter>
</defs>
<g><animateTransform attributeName="transform" type="translate" values="0,0;0,-.4;0,0" dur="5s" repeatCount="indefinite"/>
<!-- Cabello con raya lateral y mechones -->
<path d="M30,50 Q28,26 42,16 Q52,8 60,9 Q68,8 78,16 Q92,26 90,50" fill="#3E3022"/>
<path d="M32,46 Q30,28 44,20 Q52,13 60,14 Q68,13 76,20 Q90,28 88,46" fill="#4A3828"/>
<!-- Raya lateral -->
<path d="M44,16 Q52,12 60,13 Q68,12 76,16" fill="none" stroke="#5A4838" stroke-width="2" stroke-linecap="round"/>
<!-- Mechones peinados -->
<path d="M42,18 Q48,15 54,17" fill="none" stroke="#5A4838" stroke-width="1.5" stroke-linecap="round"/>
<path d="M66,17 Q72,15 78,18" fill="none" stroke="#5A4838" stroke-width="1.5" stroke-linecap="round"/>
<path d="M32,38 Q30,30 36,24" fill="none" stroke="#4A3828" stroke-width="1.5"/>
<path d="M88,38 Q90,30 84,24" fill="none" stroke="#4A3828" stroke-width="1.5"/>
<!-- Cuello -->
<rect x="50" y="87" width="20" height="15" rx="3" fill="#DCBB92"/>
<!-- Traje académico azul -->
<path d="M32,96 L50,87 L60,94 L70,87 L88,96 L92,119 L28,119Z" fill="url(#dSuit)"/>
<!-- Solapas -->
<path d="M50,87 L60,94 L55,119" fill="#1E2880"/><path d="M70,87 L60,94 L65,119" fill="#1E2880"/>
<!-- Camisa visible -->
<path d="M55,94 L60,99 L65,94" fill="#E8E0D0" opacity=".5"/>
<!-- Corbata fina y seria -->
<path d="M58.5,94 L60,100 L61.5,94 L61,119 L59,119Z" fill="#283593"/>
<circle cx="60" cy="101" r="1.2" fill="#9FA8DA" stroke="#7986CB" stroke-width=".3"/>
<!-- Costuras -->
<path d="M36,98 L44,119" fill="none" stroke="#151C66" stroke-width=".4" opacity=".3"/>
<path d="M84,98 L76,119" fill="none" stroke="#151C66" stroke-width=".4" opacity=".3"/>
<!-- Cara delgada angular -->
<ellipse cx="60" cy="58" rx="30" ry="36" fill="url(#ds)"/>
<!-- Orejas -->
<ellipse cx="30" cy="56" rx="4.5" ry="8" fill="#DCBB92" stroke="#CCA070" stroke-width=".3"/>
<path d="M28,50 Q26,54 28,60" fill="none" stroke="#CCA070" stroke-width=".5" opacity=".4"/>
<ellipse cx="90" cy="56" rx="4.5" ry="8" fill="#DCBB92" stroke="#CCA070" stroke-width=".3"/>
<!-- Cejas delgadas pensativas -->
<path d="M39,47 Q47,42 55,45" fill="none" stroke="#4A3828" stroke-width="2.2" stroke-linecap="round"><animate attributeName="d" values="M39,47 Q47,42 55,45;M39,45 Q47,40 55,43;M39,47 Q47,42 55,45" dur="6.5s" repeatCount="indefinite"/></path>
<path d="M65,45 Q73,42 81,47" fill="none" stroke="#4A3828" stroke-width="2.2" stroke-linecap="round"><animate attributeName="d" values="M65,45 Q73,42 81,47;M65,43 Q73,40 81,45;M65,45 Q73,42 81,47" dur="6.5s" repeatCount="indefinite"/></path>
<!-- Ojos grises penetrantes -->
<ellipse cx="47" cy="55" rx="8.5" ry="7.5" fill="white" stroke="#B8A080" stroke-width=".4"/>
<ellipse cx="73" cy="55" rx="8.5" ry="7.5" fill="white" stroke="#B8A080" stroke-width=".4"/>
<ellipse cx="48" cy="55" rx="5.5" ry="6" fill="#37474F"><animate attributeName="ry" values="6;6;.4;6;6" keyTimes="0;.50;.52;.54;1" dur="6s" repeatCount="indefinite"/></ellipse>
<circle cx="48" cy="55" r="3.5" fill="#1A2030"/>
<circle cx="50" cy="53" r="2" fill="white" opacity=".88"/>
<circle cx="46" cy="57" r=".8" fill="white" opacity=".3"/>
<ellipse cx="74" cy="55" rx="5.5" ry="6" fill="#37474F"><animate attributeName="ry" values="6;6;.4;6;6" keyTimes="0;.51;.53;.55;1" dur="6s" repeatCount="indefinite"/></ellipse>
<circle cx="74" cy="55" r="3.5" fill="#1A2030"/>
<circle cx="76" cy="53" r="2" fill="white" opacity=".88"/>
<circle cx="72" cy="57" r=".8" fill="white" opacity=".3"/>
<!-- Nariz delgada -->
<path d="M57,51 Q55,63 57,67 Q59,70 60,70 Q61,70 63,67 Q65,63 63,51" fill="#F0CCA0" stroke="#CCA068" stroke-width=".5"/>
<path d="M56,69 Q60,72 64,69" fill="none" stroke="#CCA068" stroke-width=".6"/>
<!-- Boca seria y contemplativa -->
<path d="M48,79 Q60,85 72,79" fill="none" stroke="#A07058" stroke-width="1.6" stroke-linecap="round"><animate attributeName="d" values="M48,79 Q60,85 72,79;M48,80 Q60,86 72,80;M48,79 Q60,85 72,79" dur="7s" repeatCount="indefinite"/></path>
</g>
<!-- Ecuación de Dirac con glow -->
<g filter="url(#dgl)"><text x="2" y="14" font-size="7" fill="#5C6BC0" font-family="serif" font-style="italic" opacity=".6"><animate attributeName="opacity" values=".3;.8;.3" dur="5s" repeatCount="indefinite"/>(iγ·∂−m)ψ=0</text></g>
<!-- Glow sutil detrás de la ecuación -->
<text x="2" y="14" font-size="7" fill="#7986CB" font-family="serif" font-style="italic" opacity=".15"><animate attributeName="opacity" values=".05;.2;.05" dur="5s" repeatCount="indefinite"/>(iγ·∂−m)ψ=0</text>
<!-- Partículas y antipartículas (materia/antimateria) -->
<circle cx="10" cy="24" r="2" fill="#7986CB" opacity=".5"><animate attributeName="cy" values="24;16;24" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values=".2;.7;.2" dur="3s" repeatCount="indefinite"/></circle>
<circle cx="18" cy="28" r="1.5" fill="#EF5350" opacity=".4"><animate attributeName="cy" values="28;20;28" dur="3.8s" repeatCount="indefinite"/><animate attributeName="opacity" values=".1;.6;.1" dur="3.8s" repeatCount="indefinite"/></circle>
<circle cx="6" cy="34" r="1.5" fill="#5C6BC0" opacity=".35"><animate attributeName="cy" values="34;26;34" dur="3.5s" repeatCount="indefinite"/><animate attributeName="opacity" values=".1;.65;.1" dur="3.5s" repeatCount="indefinite"/></circle>
<circle cx="14" cy="38" r="1" fill="#EF5350" opacity=".3"><animate attributeName="cy" values="38;30;38" dur="4s" repeatCount="indefinite"/><animate attributeName="opacity" values=".05;.5;.05" dur="4s" repeatCount="indefinite"/></circle>
<!-- Línea de creación de par partícula-antipartícula -->
<path d="M8,30 Q12,28 16,30" fill="none" stroke="#9FA8DA" stroke-width=".5" opacity=".2"><animate attributeName="opacity" values=".05;.3;.05" dur="3s" repeatCount="indefinite"/></path>
</svg>`;

const SVG_NEUMANN = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
<defs>
<radialGradient id="vn" cx=".5" cy=".4" r=".5"><stop offset="0%" stop-color="#FDE4CC"/><stop offset="100%" stop-color="#E0C098"/></radialGradient>
<linearGradient id="vnSuit" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#263238"/><stop offset="100%" stop-color="#1A1A1A"/></linearGradient>
</defs>
<g><animateTransform attributeName="transform" type="translate" values="0,0;0,-.35;0,0" dur="5s" repeatCount="indefinite"/>
<!-- Cabello peinado hacia atrás -->
<path d="M28,50 Q26,24 40,14 Q50,6 60,7 Q70,6 80,14 Q94,24 92,50" fill="#2C2416"/>
<path d="M30,46 Q28,26 42,18 Q50,11 60,12 Q70,11 78,18 Q92,26 90,46" fill="#3A3020"/>
<!-- Mechones -->
<path d="M40,14 Q50,10 60,11 Q70,10 80,14" fill="none" stroke="#4A4030" stroke-width="2.2" stroke-linecap="round"/>
<path d="M44,18 Q52,14 62,16" fill="none" stroke="#3A3020" stroke-width="1.5" opacity=".6"/>
<path d="M64,16 Q72,14 78,18" fill="none" stroke="#3A3020" stroke-width="1.5" opacity=".5"/>
<path d="M28,38 Q26,32 30,24" fill="none" stroke="#3A3020" stroke-width="1.2"/>
<path d="M92,38 Q94,32 90,24" fill="none" stroke="#3A3020" stroke-width="1.2"/>
<!-- Cuello -->
<rect x="49" y="87" width="22" height="15" rx="3" fill="#E0C098"/>
<!-- Traje oscuro elegante -->
<path d="M30,96 L49,87 L60,94 L71,87 L90,96 L94,119 L26,119Z" fill="url(#vnSuit)"/>
<!-- Solapas -->
<path d="M49,87 L60,94 L53,119" fill="#2A2F33"/><path d="M71,87 L60,94 L67,119" fill="#2A2F33"/>
<!-- Costuras -->
<path d="M34,98 L46,119" fill="none" stroke="#1A1A1A" stroke-width=".4" opacity=".3"/>
<path d="M86,98 L74,119" fill="none" stroke="#1A1A1A" stroke-width=".4" opacity=".3"/>
<!-- Camisa blanca -->
<path d="M53,94 L60,99 L67,94" fill="#E8E0D0" opacity=".6"/>
<!-- Chaleco gris -->
<path d="M38,98 L82,98 L80,119 L40,119Z" fill="#455A64"/>
<path d="M49,94 L60,99 L71,94" fill="#455A64"/>
<!-- Botones del chaleco -->
<circle cx="60" cy="103" r=".8" fill="#78909C"/><circle cx="60" cy="108" r=".8" fill="#78909C"/><circle cx="60" cy="113" r=".8" fill="#78909C"/>
<!-- Corbata roja -->
<path d="M58,99 L60,104 L62,99" fill="#B71C1C"/>
<circle cx="60" cy="106" r="1.2" fill="#D32F2F" stroke="#B71C1C" stroke-width=".3"/>
<path d="M58,106 L56,119" fill="none" stroke="#B71C1C" stroke-width=".8"/>
<path d="M62,106 L64,119" fill="none" stroke="#B71C1C" stroke-width=".8"/>
<!-- Cara redondeada y amigable -->
<ellipse cx="60" cy="60" rx="33" ry="39" fill="url(#vn)"/>
<!-- Orejas -->
<ellipse cx="27" cy="58" rx="5.5" ry="9" fill="#E0C098" stroke="#CCA070" stroke-width=".3"/>
<path d="M25,52 Q23,56 25,62" fill="none" stroke="#CCA070" stroke-width=".5" opacity=".4"/>
<ellipse cx="93" cy="58" rx="5.5" ry="9" fill="#E0C098" stroke="#CCA070" stroke-width=".3"/>
<!-- Cejas amigables -->
<path d="M37,47 Q45,42 53,46" fill="none" stroke="#3A3020" stroke-width="2.2" stroke-linecap="round"><animate attributeName="d" values="M37,47 Q45,42 53,46;M37,45 Q45,41 53,44;M37,47 Q45,42 53,46" dur="7s" repeatCount="indefinite"/></path>
<path d="M67,46 Q75,42 83,47" fill="none" stroke="#3A3020" stroke-width="2.2" stroke-linecap="round"><animate attributeName="d" values="M67,46 Q75,42 83,47;M67,44 Q75,41 83,45;M67,46 Q75,42 83,47" dur="7s" repeatCount="indefinite"/></path>
<!-- Gafas redondas -->
<circle cx="47" cy="57" r="11" fill="none" stroke="#5D4037" stroke-width="1.8"/>
<circle cx="73" cy="57" r="11" fill="none" stroke="#5D4037" stroke-width="1.8"/>
<path d="M58,57 L62,57" stroke="#5D4037" stroke-width="1.5"/>
<path d="M36,55 L27,53" stroke="#5D4037" stroke-width="1.2"/>
<path d="M84,55 L93,53" stroke="#5D4037" stroke-width="1.2"/>
<!-- Brillo de los lentes -->
<ellipse cx="43" cy="53" rx="3" ry="2" fill="white" opacity=".12" transform="rotate(-15,43,53)"/>
<ellipse cx="69" cy="53" rx="3" ry="2" fill="white" opacity=".12" transform="rotate(-15,69,53)"/>
<!-- Ojos marrones cálidos -->
<ellipse cx="47" cy="57" rx="5.5" ry="6" fill="white"/>
<ellipse cx="73" cy="57" rx="5.5" ry="6" fill="white"/>
<ellipse cx="48" cy="57" rx="4.5" ry="5" fill="#4E342E"><animate attributeName="ry" values="5;5;.5;5;5" keyTimes="0;.46;.48;.50;1" dur="5s" repeatCount="indefinite"/></ellipse>
<circle cx="49" cy="56" r="3" fill="#2A1508"/>
<circle cx="51" cy="54" r="2" fill="white" opacity=".85"/>
<circle cx="47" cy="58" r=".7" fill="white" opacity=".3"/>
<ellipse cx="74" cy="57" rx="4.5" ry="5" fill="#4E342E"><animate attributeName="ry" values="5;5;.5;5;5" keyTimes="0;.47;.49;.51;1" dur="5s" repeatCount="indefinite"/></ellipse>
<circle cx="75" cy="56" r="3" fill="#2A1508"/>
<circle cx="77" cy="54" r="2" fill="white" opacity=".85"/>
<circle cx="73" cy="58" r=".7" fill="white" opacity=".3"/>
<!-- Nariz -->
<path d="M56,54 Q55,64 57,68 Q59,71 60,71 Q61,71 63,68 Q65,64 64,54" fill="#F0CCA0" stroke="#CCA060" stroke-width=".5"/>
<path d="M55,70 Q60,73 65,70" fill="none" stroke="#CCA060" stroke-width=".6"/>
<!-- Sonrisa amigable y cálida -->
<path d="M44,80 Q60,90 76,80" fill="none" stroke="#A07058" stroke-width="2" stroke-linecap="round"><animate attributeName="d" values="M44,80 Q60,90 76,80;M44,81 Q60,91 76,81;M44,80 Q60,90 76,80" dur="6s" repeatCount="indefinite"/></path>
<!-- Brillo de la sonrisa -->
<path d="M48,78 Q60,84 72,78" fill="#EEE" opacity=".15"/>
<!-- Mejillas sonrosadas -->
<circle cx="36" cy="74" r="6" fill="#FFB4A2" opacity=".12"/>
<circle cx="84" cy="74" r="6" fill="#FFB4A2" opacity=".12"/>
</g>
<!-- Código binario estilo Matrix en cascada -->
<g opacity=".6">
<text x="96" y="10" font-size="5" fill="#4CAF50" font-family="monospace"><animate attributeName="y" values="10;115;10" dur="8s" repeatCount="indefinite"/><animate attributeName="opacity" values=".3;.8;.3" dur="8s" repeatCount="indefinite"/>0</text>
<text x="102" y="25" font-size="5" fill="#4CAF50" font-family="monospace"><animate attributeName="y" values="25;115;25" dur="6s" repeatCount="indefinite"/><animate attributeName="opacity" values=".5;.9;.5" dur="6s" repeatCount="indefinite"/>1</text>
<text x="108" y="8" font-size="5" fill="#4CAF50" font-family="monospace"><animate attributeName="y" values="8;115;8" dur="7s" repeatCount="indefinite"/><animate attributeName="opacity" values=".4;.8;.4" dur="7s" repeatCount="indefinite"/>1</text>
<text x="99" y="40" font-size="5" fill="#4CAF50" font-family="monospace"><animate attributeName="y" values="40;115;40" dur="9s" repeatCount="indefinite"/><animate attributeName="opacity" values=".2;.7;.2" dur="9s" repeatCount="indefinite"/>0</text>
<text x="105" y="55" font-size="5" fill="#66BB6A" font-family="monospace"><animate attributeName="y" values="55;115;55" dur="5s" repeatCount="indefinite"/><animate attributeName="opacity" values=".3;.6;.3" dur="5s" repeatCount="indefinite"/>1</text>
<text x="112" y="30" font-size="5" fill="#4CAF50" font-family="monospace"><animate attributeName="y" values="30;115;30" dur="10s" repeatCount="indefinite"/><animate attributeName="opacity" values=".1;.5;.1" dur="10s" repeatCount="indefinite"/>0</text>
</g>
</svg>`;


// ═══ MINI-SIMULACIONES SVG PARA EL BADGE ═══
const BADGE_SIMS = {
    pendulum: `<svg viewBox="0 0 30 22" xmlns="http://www.w3.org/2000/svg"><line x1="15" y1="2" x2="11" y2="16" stroke="#fff" stroke-width="1.2" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" values="-22,15,2;22,15,2;-22,15,2" dur="1.4s" repeatCount="indefinite"/></line><circle cx="11" cy="16" r="3" fill="#FFD700"><animateTransform attributeName="transform" type="rotate" values="-22,15,2;22,15,2;-22,15,2" dur="1.4s" repeatCount="indefinite"/></circle><path d="M5,2 Q15,5 25,2" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="1"/></svg>`,
    rocket: `<svg viewBox="0 0 30 22" xmlns="http://www.w3.org/2000/svg"><g><animateTransform attributeName="transform" type="translate" values="0,8;0,6;0,8" dur="0.8s" repeatCount="indefinite"/><path d="M15,2 L19,10 L15,9 L11,10 Z" fill="#fff"/><rect x="13" y="9" width="4" height="6" rx="1" fill="#ddd"/><path d="M13,15 L11,19 M17,15 L19,19" stroke="#FF6B35" stroke-width="1.5" stroke-linecap="round"><animate attributeName="stroke-dasharray" values="0,8;4,4;0,8" dur="0.3s" repeatCount="indefinite"/></path><circle cx="22" cy="5" r="1.2" fill="rgba(255,255,255,.5)"><animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite"/></circle><circle cx="26" cy="9" r=".8" fill="rgba(255,255,255,.4)"><animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite"/></circle></g></svg>`,
    atom: `<svg viewBox="0 0 30 22" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="11" r="2.5" fill="#FFD700"/><ellipse cx="15" cy="11" rx="12" ry="5" fill="none" stroke="rgba(255,255,255,.7)" stroke-width="1"><animateTransform attributeName="transform" type="rotate" values="0,15,11;360,15,11" dur="2s" repeatCount="indefinite"/></ellipse><ellipse cx="15" cy="11" rx="12" ry="5" fill="none" stroke="rgba(255,200,100,.6)" stroke-width="1" transform="rotate(60,15,11)"><animateTransform attributeName="transform" type="rotate" values="60,15,11;420,15,11" dur="2.8s" repeatCount="indefinite"/></ellipse><ellipse cx="15" cy="11" rx="12" ry="5" fill="none" stroke="rgba(100,200,255,.6)" stroke-width="1" transform="rotate(120,15,11)"><animateTransform attributeName="transform" type="rotate" values="120,15,11;480,15,11" dur="3.4s" repeatCount="indefinite"/></ellipse><circle cx="15" cy="6" r="1.8" fill="#fff"><animateTransform attributeName="transform" type="rotate" values="0,15,11;360,15,11" dur="2s" repeatCount="indefinite"/></circle></svg>`,
    wave: `<svg viewBox="0 0 30 22" xmlns="http://www.w3.org/2000/svg"><path d="M2,11 Q6,6 10,11 Q14,16 18,11 Q22,6 26,11 Q28,14 30,11" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"><animate attributeName="d" values="M2,11 Q6,6 10,11 Q14,16 18,11 Q22,6 26,11;M2,11 Q6,16 10,11 Q14,6 18,11 Q22,16 26,11;M2,11 Q6,6 10,11 Q14,16 18,11 Q22,6 26,11" dur="0.8s" repeatCount="indefinite"/></path><circle cx="4" cy="11" r="1.5" fill="#FFD700" opacity=".8"><animate attributeName="cx" values="2;28;2" dur="1.6s" repeatCount="indefinite"/></circle><path d="M7,3 Q9,3 9,5 Q9,7 7,7" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="1"><animate attributeName="r" values="1;3;1" dur="1.5s" repeatCount="indefinite"/></path></svg>`,
    car: `<svg viewBox="0 0 30 22" xmlns="http://www.w3.org/2000/svg"><g><animateTransform attributeName="transform" type="translate" values="0,0;2,0;0,0" dur="0.4s" repeatCount="indefinite"/><rect x="4" y="9" width="20" height="8" rx="2" fill="#fff"/><path d="M7,9 L9,5 L19,5 L22,9" fill="rgba(255,255,255,.7)"/><circle cx="9" cy="17" r="3" fill="#FF4757" stroke="#fff" stroke-width=".8"><animateTransform attributeName="transform" type="rotate" values="0,9,17;360,9,17" dur="0.5s" repeatCount="indefinite"/></circle><circle cx="21" cy="17" r="3" fill="#FF4757" stroke="#fff" stroke-width=".8"><animateTransform attributeName="transform" type="rotate" values="0,21,17;360,21,17" dur="0.5s" repeatCount="indefinite"/></circle><rect x="19" y="11" width="3" height="2" rx=".5" fill="#FFD700" opacity=".9"/></g><line x1="0" y1="20" x2="30" y2="20" stroke="rgba(255,255,255,.3)" stroke-width="1" stroke-dasharray="3,3"><animate attributeName="stroke-dashoffset" values="0;-6" dur="0.4s" repeatCount="indefinite"/></line></svg>`,
    telescope: `<svg viewBox="0 0 30 22" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="18" x2="22" y2="8" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><ellipse cx="23" cy="7.5" rx="5" ry="3" fill="none" stroke="rgba(255,255,255,.8)" stroke-width="1.2" transform="rotate(-25,23,7.5)"/><circle cx="4" cy="19" r="2" fill="#ddd"/><circle cx="24" cy="3" r="2" fill="#FFD700"><animate attributeName="r" values="2;3;2" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/></circle><circle cx="17" cy="1" r="1" fill="#fff" opacity=".6"><animate attributeName="opacity" values=".3;1;.3" dur="1.5s" repeatCount="indefinite"/></circle><circle cx="28" cy="7" r=".8" fill="#fff" opacity=".5"><animate attributeName="opacity" values="1;.2;1" dur="1.8s" repeatCount="indefinite"/></circle></svg>`,
    microscope: `<svg viewBox="0 0 30 22" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="1" width="5" height="9" rx="1" fill="#fff"/><rect x="13" y="10" width="3" height="3" rx=".5" fill="#ddd"/><path d="M10,13 L19,13 L21,20 L8,20 Z" fill="rgba(255,255,255,.7)"/><line x1="14.5" y1="20" x2="14.5" y2="22" stroke="#fff" stroke-width="1.5"/><circle cx="20" cy="15" r="4" fill="none" stroke="#FFD700" stroke-width="1"><animate attributeName="r" values="4;5;4" dur="2s" repeatCount="indefinite"/></circle><circle cx="20" cy="15" r="2" fill="rgba(100,255,150,.4)"><animate attributeName="r" values="1;2.5;1" dur="1.5s" repeatCount="indefinite"/><animate attributeName="opacity" values=".3;.8;.3" dur="1.5s" repeatCount="indefinite"/></circle></svg>`,
    magnet: `<svg viewBox="0 0 30 22" xmlns="http://www.w3.org/2000/svg"><path d="M8,4 L8,14 Q8,19 13,19 Q18,19 18,14 L18,4" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="5" y="2" width="6" height="4" rx="1" fill="#FF4757"/><rect x="15" y="2" width="6" height="4" rx="1" fill="#4B9DF4"/><path d="M22,10 Q25,8 27,10" fill="none" stroke="#FF4757" stroke-width="1" opacity=".7"><animate attributeName="opacity" values=".3;.9;.3" dur="1s" repeatCount="indefinite"/></path><path d="M22,12 Q26,10 28,12" fill="none" stroke="#FF4757" stroke-width="1" opacity=".5"><animate attributeName="opacity" values=".5;1;.5" dur="1.2s" repeatCount="indefinite"/></path><path d="M3,10 Q0,8 2,10" fill="none" stroke="#4B9DF4" stroke-width="1" opacity=".7"><animate attributeName="opacity" values=".9;.3;.9" dur="1s" repeatCount="indefinite"/></path></svg>`,
    gravity: `<svg viewBox="0 0 30 22" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="18" r="4" fill="#4CAF50"/><circle cx="15" cy="4" r="2" fill="#FF4757"><animate attributeName="cy" values="4;14;4" dur="1.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 1 1;0 0 0.58 1"/></circle><path d="M13,2 Q15,0 17,2" fill="none" stroke="#8bc34a" stroke-width="1"/></svg>`,
    circuit: `<svg viewBox="0 0 30 22" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="9" width="6" height="4" fill="#555"/><rect x="6" y="8" width="2" height="1" fill="#ddd"/><path d="M10,11 L20,11" fill="none" stroke="#FFD700" stroke-width="1.5" stroke-dasharray="2,2"><animate attributeName="stroke-dashoffset" values="4;0" dur="0.5s" repeatCount="indefinite"/></path><circle cx="22" cy="11" r="3" fill="none" stroke="#fff" stroke-width="1"/><circle cx="22" cy="11" r="2" fill="#FFD700"><animate attributeName="opacity" values="0.2;1;0.2" dur="1s" repeatCount="indefinite"/></circle></svg>`,
    spring: `<svg viewBox="0 0 30 22" xmlns="http://www.w3.org/2000/svg"><line x1="15" y1="0" x2="15" y2="4" stroke="#fff" stroke-width="1"/><path d="M15,4 L12,6 L18,8 L12,10 L18,12 L15,14" fill="none" stroke="#aaa" stroke-width="1"><animate attributeName="d" values="M15,4 L12,6 L18,8 L12,10 L18,12 L15,14;M15,4 L13,7 L17,10 L13,13 L17,16 L15,18;M15,4 L12,6 L18,8 L12,10 L18,12 L15,14" dur="1.2s" repeatCount="indefinite"/></path><rect x="11" y="14" width="8" height="6" fill="#4B9DF4"><animate attributeName="y" values="14;18;14" dur="1.2s" repeatCount="indefinite"/></rect></svg>`,
    prism: `<svg viewBox="0 0 30 22" xmlns="http://www.w3.org/2000/svg"><polygon points="15,4 23,18 7,18" fill="rgba(255,255,255,.3)" stroke="#fff" stroke-width="1"/><line x1="0" y1="12" x2="11" y2="14" stroke="#fff" stroke-width="1.5"><animate attributeName="x1" values="0;4;0" dur="2s" repeatCount="indefinite"/></line><line x1="19" y1="14" x2="30" y2="8" stroke="#FF4757" stroke-width="1"/><line x1="19" y1="14" x2="30" y2="11" stroke="#FFD700" stroke-width="1"/><line x1="19" y1="14" x2="30" y2="14" stroke="#4CAF50" stroke-width="1"/><line x1="19" y1="14" x2="30" y2="17" stroke="#4B9DF4" stroke-width="1"/><line x1="19" y1="14" x2="30" y2="20" stroke="#9C27B0" stroke-width="1"/></svg>`,
    dna: `<svg viewBox="0 0 30 22" xmlns="http://www.w3.org/2000/svg"><g stroke-width="1.5" stroke-linecap="round"><path d="M5,4 Q15,11 25,4" fill="none" stroke="#FF4757"><animate attributeName="d" values="M5,4 Q15,11 25,4;M5,18 Q15,4 25,18;M5,4 Q15,11 25,4" dur="2s" repeatCount="indefinite"/></path><path d="M5,18 Q15,4 25,18" fill="none" stroke="#4B9DF4"><animate attributeName="d" values="M5,18 Q15,4 25,18;M5,4 Q15,11 25,4;M5,18 Q15,4 25,18" dur="2s" repeatCount="indefinite"/></path><line x1="10" y1="8" x2="10" y2="14" stroke="#FFD700" opacity=".6"/><line x1="15" y1="7" x2="15" y2="15" stroke="#4CAF50" opacity=".6"/><line x1="20" y1="8" x2="20" y2="14" stroke="#FFD700" opacity=".6"/></g></svg>`,
    solar_system: `<svg viewBox="0 0 30 22" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="11" r="3" fill="#FFD700"/><ellipse cx="15" cy="11" rx="10" ry="4" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="1" transform="rotate(20,15,11)"/><circle cx="25" cy="11" r="1.5" fill="#4B9DF4"><animateTransform attributeName="transform" type="rotate" values="0,15,11;360,15,11" dur="3s" repeatCount="indefinite"/></circle><ellipse cx="15" cy="11" rx="14" ry="6" fill="none" stroke="rgba(255,255,255,.2)" stroke-width="1" transform="rotate(-15,15,11)"/><circle cx="1" cy="11" r="2" fill="#FF4757"><animateTransform attributeName="transform" type="rotate" values="180,15,11;540,15,11" dur="5s" repeatCount="indefinite"/></circle></svg>`,
    compass: `<svg viewBox="0 0 30 22" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="11" r="8" fill="none" stroke="rgba(255,255,255,.8)" stroke-width="1.5"/><circle cx="15" cy="11" r="1" fill="#fff"/><path d="M15,4 L17,11 L15,18 L13,11 Z" fill="#FF4757"><animateTransform attributeName="transform" type="rotate" values="0,15,11;15,15,11;-10,15,11;0,15,11" dur="2s" repeatCount="indefinite"/></path></svg>`,
    thermometer: `<svg viewBox="0 0 30 22" xmlns="http://www.w3.org/2000/svg"><rect x="13" y="3" width="4" height="12" rx="2" fill="none" stroke="#fff" stroke-width="1.5"/><circle cx="15" cy="16" r="3.5" fill="#FF4757"/><rect x="14" y="8" width="2" height="8" fill="#FF4757"><animate attributeName="y" values="12;6;12" dur="2s" repeatCount="indefinite"/><animate attributeName="height" values="4;10;4" dur="2s" repeatCount="indefinite"/></rect><line x1="18" y1="6" x2="20" y2="6" stroke="#fff" stroke-width=".8"/><line x1="18" y1="9" x2="20" y2="9" stroke="#fff" stroke-width=".8"/><line x1="18" y1="12" x2="20" y2="12" stroke="#fff" stroke-width=".8"/></svg>`,
    pulley: `<svg viewBox="0 0 30 22" xmlns="http://www.w3.org/2000/svg"><line x1="15" y1="2" x2="15" y2="7" stroke="#fff" stroke-width="1.5"/><circle cx="15" cy="9" r="3" fill="none" stroke="#aaa" stroke-width="1.5"/><line x1="12" y1="9" x2="12" y2="16" stroke="#ddd" stroke-width="1"><animate attributeName="y2" values="16;12;16" dur="2s" repeatCount="indefinite"/></line><rect x="10" y="16" width="4" height="4" fill="#FFD700"><animate attributeName="y" values="16;12;16" dur="2s" repeatCount="indefinite"/></rect><line x1="18" y1="9" x2="18" y2="12" stroke="#ddd" stroke-width="1"><animate attributeName="y2" values="12;16;12" dur="2s" repeatCount="indefinite"/></line><rect x="16" y="12" width="4" height="4" fill="#4B9DF4"><animate attributeName="y" values="12;16;12" dur="2s" repeatCount="indefinite"/></rect></svg>`,
    blackhole: `<svg viewBox="0 0 30 22" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="11" r="3" fill="#000" stroke="#fff" stroke-width="0.5"/><ellipse cx="15" cy="11" rx="12" ry="3" fill="none" stroke="#FF4757" stroke-width="1" transform="rotate(15,15,11)"><animateTransform attributeName="transform" type="rotate" values="15,15,11;375,15,11" dur="2s" repeatCount="indefinite"/></ellipse><ellipse cx="15" cy="11" rx="10" ry="2.5" fill="none" stroke="#4B9DF4" stroke-width="1.5" transform="rotate(-30,15,11)"><animateTransform attributeName="transform" type="rotate" values="-30,15,11;330,15,11" dur="1.5s" repeatCount="indefinite"/></ellipse></svg>`,
    gears: `<svg viewBox="0 0 30 22" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#FFD700" stroke-width="2" stroke-dasharray="2,2"><circle cx="12" cy="11" r="5"><animateTransform attributeName="transform" type="rotate" values="0,12,11;360,12,11" dur="3s" repeatCount="indefinite"/></circle></g><circle cx="12" cy="11" r="2" fill="#fff"/><g fill="none" stroke="#4B9DF4" stroke-width="1.5" stroke-dasharray="2,2"><circle cx="21" cy="11" r="4"><animateTransform attributeName="transform" type="rotate" values="0,21,11;-360,21,11" dur="2.4s" repeatCount="indefinite"/></circle></g><circle cx="21" cy="11" r="1.5" fill="#fff"/></svg>`,
    math: `<svg viewBox="0 0 30 22" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5,18 L15,4 L25,18 Z" stroke="#FFD700"/><path d="M12,12 L15,12" stroke="#fff"/><text x="10" y="16" fill="#fff" font-size="7" font-family="monospace" stroke="none">∑</text><text x="18" y="16" fill="#4B9DF4" font-size="7" font-family="monospace" stroke="none">π</text><animateTransform attributeName="transform" type="scale" values="0.9;1.05;0.9" dur="2s" repeatCount="indefinite" transform-origin="15 11"/></svg>`
};
const BADGE_SIM_KEYS = Object.keys(BADGE_SIMS);

// ═══ BANCO DE CONTENIDO PROACTIVO (155+ entradas) ═══
const PROACTIVE_CONTENT = [
    // ── FRASES DE FÍSICOS ──
    {t:"«La imaginación es más importante que el conocimiento. El conocimiento es limitado; la imaginación rodea el mundo.» — Einstein", i:"💬", tipo:"frase"},
    {t:"«Si no puedes explicarlo de forma sencilla, es que no lo entiendes bien.» — Einstein", i:"💬", tipo:"frase"},
    {t:"«La lógica te llevará de A a B. La imaginación te llevará a todas partes.» — Einstein", i:"💬", tipo:"frase"},
    {t:"«¡Dos cosas son infinitas: el universo y la estupidez humana! Y del universo no estoy seguro.» — Einstein", i:"💬", tipo:"frase"},
    {t:"«En medio de la dificultad reside la oportunidad.» — Einstein", i:"💬", tipo:"frase"},
    {t:"«Nunca consideres el estudio como un deber, sino como una oportunidad envidiable.» — Einstein", i:"💬", tipo:"frase"},
    {t:"«Lo que sabemos es una gota; lo que ignoramos es un océano.» — Newton", i:"💬", tipo:"frase"},
    {t:"«La naturaleza se complace en la simplicidad, y la naturaleza no es cosa de causas vanas.» — Newton", i:"💬", tipo:"frase"},
    {t:"«Si he visto más lejos que otros, es porque estaba subido sobre hombros de gigantes.» — Newton", i:"💬", tipo:"frase"},
    {t:"«Puedo calcular el movimiento de los cuerpos celestes, pero no la locura de las personas.» — Newton", i:"💬", tipo:"frase"},
    {t:"«El presente es de ellos; el futuro, por el que he trabajado realmente, es mío.» — Tesla", i:"💬", tipo:"frase"},
    {t:"«Si quieres encontrar los secretos del universo, piensa en energía, frecuencia y vibración.» — Tesla", i:"💬", tipo:"frase"},
    {t:"«Mi cerebro es solo un receptor. En el universo existe un núcleo del cual obtenemos conocimiento, fuerza e inspiración.» — Tesla", i:"💬", tipo:"frase"},
    {t:"«La ciencia no es sino una perversión de sí misma a menos que tenga como objetivo último el mejoramiento de la humanidad.» — Tesla", i:"💬", tipo:"frase"},
    {t:"«¡Eppur si muove! (¡Y sin embargo, se mueve!)» — Galileo Galilei", i:"💬", tipo:"frase"},
    {t:"«Las matemáticas son el alfabeto con el cual Dios ha escrito el Universo.» — Galileo", i:"💬", tipo:"frase"},
    {t:"«Mide lo que sea medible y haz medible lo que no lo sea.» — Galileo", i:"💬", tipo:"frase"},
    {t:"«En cuestiones de ciencia, la autoridad de mil no vale el razonamiento de uno solo.» — Galileo", i:"💬", tipo:"frase"},
    {t:"«Nada en la vida debe ser temido, sólo comprendido. Ahora es el momento de comprender más para temer menos.» — Marie Curie", i:"💬", tipo:"frase"},
    {t:"«Me importa poco la gloria; también los rayos cargados con el poder de millones de caballos de fuerza.» — Marie Curie", i:"💬", tipo:"frase"},
    {t:"«Nada hay que temer en la vida. Solo hay que comprenderlo.» — Marie Curie", i:"💬", tipo:"frase"},
    {t:"«La primera virtud de un científico es tener el valor de decir que no sabe.» — Marie Curie", i:"💬", tipo:"frase"},
    {t:"«Dios no juega a los dados.» — Einstein (sobre la mecánica cuántica)", i:"💬", tipo:"frase"},
    {t:"«Deja de decirle a Dios qué hacer.» — Niels Bohr (respondiendo a Einstein)", i:"💬", tipo:"frase"},
    {t:"«Cualquiera que no esté conmocionado por la mecánica cuántica es que no la ha entendido.» — Niels Bohr", i:"💬", tipo:"frase"},
    {t:"«Si alguien dice que puede pensar en la mecánica cuántica sin sentir vértigo, es que no la ha entendido.» — Feynman", i:"💬", tipo:"frase"},
    {t:"«La naturaleza usa solo los hilos más largos para tejer sus patrones, de modo que cada pequeño trozo de su tela revela la organización de todo el tapiz.» — Feynman", i:"💬", tipo:"frase"},
    {t:"«Para comprender realmente algo, hay que haberlo inventado uno mismo.» — Feynman", i:"💬", tipo:"frase"},
    {t:"«El trabajo de la ciencia es sustituir la experiencia por el razonamiento.» — Mach", i:"💬", tipo:"frase"},
    {t:"«No poseo ningún talento especial. Sólo soy apasionadamente curioso.» — Einstein", i:"💬", tipo:"frase"},
    {t:"«El universo no solo es más extraño de lo que suponemos, sino más extraño de lo que podemos suponer.» — J.B.S. Haldane", i:"💬", tipo:"frase"},
    {t:"«No busques hacerlo exitoso, busca que sea valioso.» — Einstein", i:"💬", tipo:"frase"},
    {t:"«La vida sin investigación no merece ser vivida.» — Sócrates", i:"💬", tipo:"frase"},
    {t:"«Tenemos que atrevernos a inventar el futuro.» — Thomas Sankara", i:"💬", tipo:"frase"},
    {t:"«La perseverancia es el trabajo duro que haces después del trabajo duro que ya hiciste.» — Newt Gingrich", i:"💬", tipo:"frase"},
    {t:"«Habla solo si puedes mejorar el silencio.» — Borges (meditando antes de calcular)", i:"💬", tipo:"frase"},
    {t:"«Un experimento es una pregunta que la ciencia le plantea a la naturaleza.» — Max Planck", i:"💬", tipo:"frase"},
    {t:"«La ciencia no conoce fronteras, porque el conocimiento pertenece a la humanidad.» — Pasteur", i:"💬", tipo:"frase"},

    // ── FRASES DE MATEMÁTICOS ──
    {t:"«Las matemáticas son la reina de las ciencias y la teoría de números es la reina de las matemáticas.» — Gauss", i:"📐", tipo:"frase"},
    {t:"«La matemática es el lenguaje en que está escrito el libro de la naturaleza.» — Galileo", i:"📐", tipo:"frase"},
    {t:"«Al principio los matemáticos somos poetas; luego nos volvemos contadores.» — Hilbert", i:"📐", tipo:"frase"},
    {t:"«Un matemático, como un pintor o un poeta, es un artesano de patrones.» — G.H. Hardy", i:"📐", tipo:"frase"},
    {t:"«La matemática es el arte de dar el mismo nombre a cosas diferentes.» — Henri Poincaré", i:"📐", tipo:"frase"},
    {t:"«La geometría es el arte de razonar correctamente sobre figuras incorrectas.» — Poincaré", i:"📐", tipo:"frase"},
    {t:"«Los números rigen el universo.» — Pitágoras", i:"📐", tipo:"frase"},
    {t:"«El que no sabe matemáticas no puede sentir la belleza profunda de la naturaleza.» — Feynman", i:"📐", tipo:"frase"},
    {t:"«En matematicas no hay caminos reales.» — Euclides (al rey Ptolomeo)", i:"📐", tipo:"frase"},
    {t:"«Un problema no resuelto en matemáticas vale más que cien problemas resueltos.» — Hilbert", i:"📐", tipo:"frase"},
    {t:"«1 + 1 = 2... pero en el universo, eso es todo un milagro.» — Bertrand Russell", i:"📐", tipo:"frase"},
    {t:"«Dios es un matemático de primera clase.» — Paul Dirac", i:"📐", tipo:"frase"},
    {t:"«Las ecuaciones son más importantes para mí porque la política es para el presente, pero una ecuación es algo para la eternidad.» — Einstein", i:"📐", tipo:"frase"},
    {t:"«Ramanujan dijo: el dios Namagiri me entrega las fórmulas en sueños. Yo solo las escribo.» — anécdota sobre Ramanujan", i:"📐", tipo:"frase"},
    {t:"«A todo el mundo en la República le sea negada la entrada si no sabe Geometría.» — Platón (inscripción en la Academia)", i:"📐", tipo:"frase"},
    {t:"«La belleza es el primer test; no hay lugar permanente en el mundo para las matemáticas feas.» — G.H. Hardy", i:"📐", tipo:"frase"},
    {t:"«Euler calculó seis veces más cuando quedó ciego; ¡la visión profunda no requiere ojos!» — anécdota histórica", i:"📐", tipo:"frase"},
    {t:"«El infinito es un concepto perturbador: algo más grande de lo que podemos imaginar, pero que los matemáticos manejan con total comodidad.» — anónimo", i:"📐", tipo:"frase"},
    {t:"«La matemática es el único idioma que Dios habla sin acento.» — anónimo", i:"📐", tipo:"frase"},
    {t:"«Toda mi vida he seguido solo un hilo: la belleza matemática.» — Hermann Weyl", i:"📐", tipo:"frase"},

    // ── FRASES DE PEDAGOGOS ──
    {t:"«Nadie educa a nadie; tampoco nadie se educa a sí mismo: los hombres se educan en comunión.» — Paulo Freire", i:"🎓", tipo:"frase"},
    {t:"«La educación no es preparación para la vida; la educación es la vida en sí misma.» — John Dewey", i:"🎓", tipo:"frase"},
    {t:"«Dime y lo olvido, enséñame y lo recuerdo, involúcrame y lo aprendo.» — Benjamín Franklin", i:"🎓", tipo:"frase"},
    {t:"«La educación es el arma más poderosa que puedes usar para cambiar el mundo.» — Nelson Mandela", i:"🎓", tipo:"frase"},
    {t:"«El niño no es un vaso que hay que llenar, sino una llama que hay que avivar.» — Rabelais / Montaigne", i:"🎓", tipo:"frase"},
    {t:"«Nunca consideres a los estudiantes como contenedores a los que debes llenar de conocimiento.» — Piaget", i:"🎓", tipo:"frase"},
    {t:"«El juego es el trabajo del infante.» — María Montessori", i:"🎓", tipo:"frase"},
    {t:"«En el buen maestro veo al discípulo eterno.» — Goethe", i:"🎓", tipo:"frase"},
    {t:"«El aprendizaje es experiencia; todo lo demás es información.» — Einstein", i:"🎓", tipo:"frase"},
    {t:"«Lo que escucho, lo olvido; lo que veo, lo recuerdo; lo que hago, lo entiendo.» — Confucio", i:"🎓", tipo:"frase"},
    {t:"«Cada estudiante puede aprender; solo que no en el mismo día y de la misma manera.» — George Evans", i:"🎓", tipo:"frase"},
    {t:"«Lo que los maestros hacen con sus alumnos perdura para siempre aunque los alumnos no puedan precisar cuándo.» — anónimo", i:"🎓", tipo:"frase"},
    {t:"«La mayor señal del éxito de un profesor es poder decir: los niños trabajan como si yo no existiese.» — Montessori", i:"🎓", tipo:"frase"},
    {t:"«La inteligencia es la capacidad de adaptarse al cambio.» — Hawking", i:"🎓", tipo:"frase"},
    {t:"«No te avergüences de tus errores, aprende de ellos y sigue adelante.» — W.C. Durant", i:"🎓", tipo:"frase"},

    // ── DATOS CURIOSOS DE FÍSICA ──
    {t:"🤯 Si pudieras conducir un auto directamente hacia arriba a 100 km/h, llegarías al espacio en apenas 1 hora.", i:"💡", tipo:"dato"},
    {t:"🌌 El universo observable tiene unos 93.000 millones de años luz de diámetro, pero solo tiene 13.800 millones de años. ¡Cómo es posible? ¡El espacio mismo se está expandiendo!", i:"💡", tipo:"dato"},
    {t:"⚡ Un rayo alcanza una temperatura de 30.000 K — cinco veces más caliente que la superficie del Sol.", i:"💡", tipo:"dato"},
    {t:"🔊 El sonido viaja 4 veces más rápido en el agua que en el aire (1.500 m/s vs 340 m/s).", i:"💡", tipo:"dato"},
    {t:"🧲 La Tierra es como un enorme imán: su núcleo de hierro líquido genera un campo magnético que nos protege del viento solar.", i:"💡", tipo:"dato"},
    {t:"⚛️ Un átomo es 99,9999999999% espacio vacío. Si el núcleo de un átomo fuera del tamaño de un maní, sus electrones estarían a 2 km de distancia.", i:"💡", tipo:"dato"},
    {t:"🚀 Para escapar de la gravedad terrestre necesitas viajar a 11.2 km/s (velocidad de escape). ¡Eso es Bogotá a Cali en menos de 0,05 segundos!", i:"💡", tipo:"dato"},
    {t:"🌡️ El punto más frío posible en el universo es el cero absoluto (-273.15°C). ¡Y los científicos han conseguido temperaturas a billonésimas de grado por encima de él!", i:"💡", tipo:"dato"},
    {t:"💡 La luz del Sol tarda 8 minutos en llegar a la Tierra, pero tardó ¡100.000 años! en viajar desde el núcleo del Sol hasta su superficie.", i:"💡", tipo:"dato"},
    {t:"🌊 Las mareas de los océanos son causadas principalmente por la gravedad de la Luna, pero también influye el Sol. Cuando los tres se alinean, hay mareas vivas.", i:"💡", tipo:"dato"},
    {t:"🎸 Las cuerdas de una guitarra vibran y crean ondas estacionarias — el mismo principio que explica los orbitales del átomo de hidrógeno.", i:"💡", tipo:"dato"},
    {t:"🏎️ Un Fórmula 1 genera tanta fuerza aerodinámica que podría circular pegado al techo de un túnel a velocidades superiores a 150 km/h.", i:"💡", tipo:"dato"},
    {t:"🌀 Un agujero negro no 'aspira' todo lo que lo rodea. La Tierra seguiría en la misma órbita si el Sol fuera un agujero negro de igual masa.", i:"💡", tipo:"dato"},
    {t:"⚽ El efecto Magnus hace curvar el balón en fútbol. Cuando la pelota gira, arrastra el aire de un lado más que del otro, creando una diferencia de presión.", i:"💡", tipo:"dato"},
    {t:"🌡️ Fourier descubrió el efecto invernadero 200 años antes de que fuera noticia. ¡La física del clima se conoce desde 1824!", i:"💡", tipo:"dato"},
    {t:"🔵 ¿Por qué el cielo es azul? La luz del Sol se dispersa en la atmósfera — los fotones azules (menor longitud de onda) se esparcen más que los rojos.", i:"💡", tipo:"dato"},
    {t:"🌙 Neil Armstrong pesaba ~80 kg en la Tierra. En la Luna ¡solo 13 kg! La gravedad lunar es 1/6 de la terrestre.", i:"💡", tipo:"dato"},
    {t:"🎵 La velocidad del sonido en el aire depende de la temperatura: cada grado centígrado adicional aumenta la velocidad en aproximadamente 0,6 m/s.", i:"💡", tipo:"dato"},
    {t:"🧊 El agua es una de las pocas sustancias que se expande al congelarse. Por eso el hielo flota y los lagos se congelan de arriba hacia abajo.", i:"💡", tipo:"dato"},
    {t:"⚡ La electricidad en un cable viaja casi a la velocidad de la luz (≈0,95c), aunque los electrones individuales se mueven apenas a mm/h.", i:"💡", tipo:"dato"},
    {t:"🤸 En caída libre, dentro de la ISS, los astronautas no sienten gravedad. Pero la gravedad terrestre en la estación es el 90% de la superficial.", i:"💡", tipo:"dato"},
    {t:"🌈 Un arcoíris secundario (el que a veces aparece más grande y tenue) tiene los colores invertidos. ¡La luz rebota dos veces dentro de las gotas!", i:"💡", tipo:"dato"},
    {t:"💎 El diamante y el carbón son exactamente lo mismo: átomos de carbono. Solo cambia la forma en que están ordenados (estructura cristalina).", i:"💡", tipo:"dato"},
    {t:"🚂 El primer tren de vapor de Stephenson (1814) viajaba a 8 km/h. Un siglo después, los trenes bala de Japón superan los 600 km/h.", i:"💡", tipo:"dato"},
    {t:"🔭 La sonda Voyager 1 (lanzada en 1977) es el objeto fabricado por el hombre más alejado de la Tierra. Está a más de 23.000 millones de km.", i:"💡", tipo:"dato"},
    {t:"🎆 Las explosiones en el espacio son silenciosas — no hay medio para que las ondas sonoras viajen. Las películas mienten.", i:"💡", tipo:"dato"},
    {t:"🌞 El Sol convierte 4 millones de toneladas de masa en energía CADA SEGUNDO (E=mc²). Le quedan unos 5.000 millones de años de combustible.", i:"💡", tipo:"dato"},
    {t:"❄️ Un copo de nieve tarda entre 1 y 2 horas en caer desde la nube hasta el suelo, viajando a apenas 1-2 m/s.", i:"💡", tipo:"dato"},
    {t:"🦅 El halcón peregrino es el animal más rápido de la Tierra en picado: ¡alcanza 390 km/h! Usa el mismo principio aerodinámico que un avión.", i:"💡", tipo:"dato"},
    {t:"🎯 La relatividad general de Einstein predijo la existencia de ondas gravitacionales en 1915. Fueron detectadas por primera vez ¡100 años después! (2015, LIGO).", i:"💡", tipo:"dato"},
    {t:"🌊 El Principio de Incertidumbre de Heisenberg dice: cuanto más precisamente conoces la posición de un electrón, menos puedes saber de su velocidad.", i:"💡", tipo:"dato"},
    {t:"🎭 El experimento del gato de Schrödinger no es real — es una paradoja mental para ilustrar lo absurdo de la mecánica cuántica aplicada a objetos grandes.", i:"💡", tipo:"dato"},
    {t:"🔋 Alessandro Volta inventó la primera batería en 1800. Napoleon Bonaparte fue de las primeras personas en verla funcionar en persona.", i:"💡", tipo:"dato"},
    {t:"🧲 Maxwell unificó la electricidad, el magnetismo y la luz en 4 ecuaciones. Einstein dijo que esa fue la hazaña más grande de la física del s. XIX.", i:"💡", tipo:"dato"},
    {t:"🎡 En una montaña rusa, sientes más 'peso' del normal en el fondo de una curva (hasta 4G) y casi ingravidez en la cima. Es pura cinemática circular.", i:"💡", tipo:"dato"},
    {t:"🚁 Un helicóptero vuela usando el mismo principio que el ala de un avión: el rotor crea diferencia de presión entre la parte superior e inferior.", i:"💡", tipo:"dato"},
    {t:"📡 Cada selfie que subes a internet viaja como señal electromagnética a través de cables de fibra óptica a 200.000 km/s.", i:"💡", tipo:"dato"},
    {t:"🧪 Faraday no tenía educación formal — aprendió química leyendo libros que encuadernaba como aprendiz. Luego descubrió la inducción electromagnética.", i:"💡", tipo:"dato"},
    {t:"⚗️ El principio de Arquímedes fue descubierto en un baño. Al entrar, el filósofo notó que el agua desbordada era igual al volumen de su cuerpo. ¡Eureka!", i:"💡", tipo:"dato"},
    {t:"🌍 Si juntaras todos los planetas del Sistema Solar, cabrían exactamente entre la Tierra y la Luna (con un margen de 4.800 km).", i:"💡", tipo:"dato"},

    // ── PREGUNTAS PROVOCADORAS ──
    {t:"❓ ¿Por qué los objetos pesados y livianos caen con la misma aceleración? ¡Galileo se lo preguntó mirando la Catedral de Pisa!", i:"❓", tipo:"pregunta"},
    {t:"❓ ¿La luz es onda o partícula? ¡La respuesta sorprendente es: LAS DOS COSAS (dualidad onda-corpúsculo)!", i:"❓", tipo:"pregunta"},
    {t:"❓ Si el universo tiene 13.800 millones de años, ¿qué había antes del Big Bang? (Spoiler: la física actual no puede responder eso aún)", i:"❓", tipo:"pregunta"},
    {t:"❓ ¿Por qué puedes empujar una pared con toda tu fuerza y no moverla? La tercera ley de Newton te lo explica.", i:"❓", tipo:"pregunta"},
    {t:"❓ ¿Cómo funciona un microondas? Las ondas hacen vibrar las moléculas de agua de tu comida — ¡y esa vibración es calor!", i:"❓", tipo:"pregunta"},
    {t:"❓ ¿Qué pasaría si la Luna desapareciera mañana? Las mareas se reducirían, el eje de la Tierra se desestabilizaría... ¡y el día duraría menos!", i:"❓", tipo:"pregunta"},
    {t:"❓ ¿Por qué el cielo es negro por la noche si hay billones de estrellas? Esa pregunta se llama 'Paradoja de Olbers' y fue un misterio por siglos.", i:"❓", tipo:"pregunta"},
    {t:"❓ ¿Cuánto tiempo tardarías en caer a través de un túnel que atravesara la Tierra de polo a polo? La respuesta es exactamente 42 minutos.", i:"❓", tipo:"pregunta"},
    {t:"❓ ¿La materia oscura y la energía oscura son reales? Componen el 95% del universo pero aún no las hemos detectado directamente.", i:"❓", tipo:"pregunta"},
    {t:"❓ ¿Qué tan fuerte debe soplar el viento para derrumbar un puente? Pregúntale al puente colgante de Tacoma que colapsó en 1940 por resonancia.", i:"❓", tipo:"pregunta"},
    {t:"❓ ¿Podrías vivir en un planeta con el doble de gravedad que la Tierra? Tu corazón tendría que trabajar el doble... pero los insectos estarían felices.", i:"❓", tipo:"pregunta"},
    {t:"❓ ¿Es posible viajar en el tiempo? La relatividad especial dice que sí hacia el futuro. El pasado sigue siendo un misterio.", i:"❓", tipo:"pregunta"},
    {t:"❓ ¿Por qué el agua moja? La respuesta involucra tensión superficial, cohesión molecular y adhesión. ¡Física en cada gota!", i:"❓", tipo:"pregunta"},
    {t:"❓ ¿Cuál es la diferencia entre masa e inercia? Son la misma propiedad vista desde dos perspectivas distintas. Einstein llamó a esto 'Principio de Equivalencia'.", i:"❓", tipo:"pregunta"},
    {t:"❓ ¿Puede un objeto superar la velocidad de la luz? En la Relatividad Especial, requeriría energía infinita. ¡Pero el espacio mismo se expande más rápido que c!", i:"❓", tipo:"pregunta"},
    {t:"❓ ¿Cómo mide la física las cosas increíblemente pequeñas? Con el Microscopio de Fuerza Atómica podemos 'sentir' átomos individuales.", i:"❓", tipo:"pregunta"},
    {t:"❓ ¿Qué es la entropía realmente? Es la tendencia natural del universo hacia el desorden. Por eso tu cuarto se desordena solo... ¡pero no se ordena solo!", i:"❓", tipo:"pregunta"},
    {t:"❓ ¿Por qué el fuego tiene esa forma de llama triangular? Convección: el aire caliente sube y arrastra oxígeno fresco desde los lados.", i:"❓", tipo:"pregunta"},
    {t:"❓ ¿Qué pasaría si te acercaras a un agujero negro? El tiempo para ti se ralentizaría (dilatación temporal). Para un observador lejano, te verías congelado.", i:"❓", tipo:"pregunta"},
    {t:"❓ Si la luz no tiene masa, ¿cómo puede doblar su trayectoria al pasar cerca del Sol? Einstein respondió: ¡no es la luz la que se dobla, sino el espacio-tiempo!", i:"❓", tipo:"pregunta"}
];

/* ═══════════════════════════════════════════════════════════════════════════
   📐 MATEMÁTICOS HISTÓRICOS — SVGs estilizados con animación sutil
   ═══════════════════════════════════════════════════════════════════════════ */

const SVG_GAUSS = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
<defs>
<radialGradient id="gaussSkin" cx=".5" cy=".5" r=".6"><stop offset="0%" stop-color="#F5D6B3"/><stop offset="100%" stop-color="#D4A574"/></radialGradient>
<linearGradient id="gaussHair" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#6B4423"/><stop offset="100%" stop-color="#3E2810"/></linearGradient>
<linearGradient id="gaussCoat" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2C3E50"/><stop offset="100%" stop-color="#1A2633"/></linearGradient>
</defs>
<g><animateTransform attributeName="transform" type="translate" values="0,0;0,-1;0,0" dur="4.5s" repeatCount="indefinite"/>
<!-- Traje oscuro elegante del s. XIX -->
<path d="M22,119 L30,92 Q45,85 60,86 Q75,85 90,92 L98,119 Z" fill="url(#gaussCoat)"/>
<path d="M42,90 L60,119 L78,90" fill="#F5F5F0"/>
<path d="M50,92 L60,108 L70,92" fill="#1A2633"/>
<!-- Pajarita -->
<path d="M54,91 L60,94 L66,91 L66,97 L60,94 L54,97 Z" fill="#8B0000"/>
<!-- Cuello -->
<rect x="48" y="76" width="24" height="18" rx="5" fill="#D4A574"/>
<!-- Cabello castaño ondulado -->
<path d="M20,55 Q12,35 28,22 Q22,10 45,12 Q52,4 60,8 Q68,4 75,12 Q98,10 92,22 Q108,35 100,55 Q95,65 85,62 Q75,58 60,60 Q45,58 35,62 Q25,65 20,55 Z" fill="url(#gaussHair)"/>
<!-- Rostro ovalado -->
<path d="M35,42 Q32,66 42,82 Q52,89 60,89 Q68,89 78,82 Q88,66 85,42 Q82,20 60,22 Q38,20 35,42 Z" fill="url(#gaussSkin)"/>
<!-- Orejas -->
<path d="M35,55 Q27,50 27,60 Q27,68 34,70" fill="#D4A574" stroke="#B8895D" stroke-width=".8"/>
<path d="M85,55 Q93,50 93,60 Q93,68 86,70" fill="#D4A574" stroke="#B8895D" stroke-width=".8"/>
<!-- Cejas pobladas -->
<path d="M38,46 Q46,41 54,46" fill="none" stroke="#3E2810" stroke-width="2.3" stroke-linecap="round"/>
<path d="M66,46 Q74,41 82,46" fill="none" stroke="#3E2810" stroke-width="2.3" stroke-linecap="round"/>
<!-- Ojos penetrantes -->
<ellipse cx="46" cy="53" rx="5.5" ry="4" fill="#FFF"/>
<ellipse cx="74" cy="53" rx="5.5" ry="4" fill="#FFF"/>
<circle cx="46" cy="54" r="2.8" fill="#1B365C"><animate attributeName="cx" values="46;45;46;47;46" dur="6s" repeatCount="indefinite"/></circle>
<circle cx="74" cy="54" r="2.8" fill="#1B365C"><animate attributeName="cx" values="74;73;74;75;74" dur="6s" repeatCount="indefinite"/></circle>
<circle cx="46" cy="53" r="1" fill="#FFF"/>
<circle cx="74" cy="53" r="1" fill="#FFF"/>
<!-- Nariz recta -->
<path d="M58,55 Q57,65 55,70 Q60,74 65,70 Q63,65 62,55" fill="#D4A574" opacity=".7"/>
<!-- Boca seria, pensativa -->
<path d="M50,78 Q60,82 70,78" fill="none" stroke="#8B5A2B" stroke-width="2" stroke-linecap="round"/>
<!-- Patillas -->
<path d="M32,52 Q30,65 36,72" fill="none" stroke="#3E2810" stroke-width="3" stroke-linecap="round"/>
<path d="M88,52 Q90,65 84,72" fill="none" stroke="#3E2810" stroke-width="3" stroke-linecap="round"/>
</g>
<!-- Campana gaussiana icónica -->
<g opacity=".85">
<path d="M4,114 Q10,106 14,114 M14,114 Q20,90 28,114 M28,114 Q34,106 38,114" fill="none" stroke="#FFF" stroke-width="2" opacity=".4"/>
<path d="M4,114 Q10,106 14,114 M14,114 Q20,90 28,114 M28,114 Q34,106 38,114" fill="none" stroke="#D4AF37" stroke-width="1.5"/>
<text x="42" y="115" font-size="7" fill="#D4AF37" font-family="serif" font-style="italic" font-weight="bold">N(μ,σ²)</text>
</g>
</svg>`;

const SVG_EULER = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
<defs>
<radialGradient id="eulSkin" cx=".5" cy=".5" r=".6"><stop offset="0%" stop-color="#F8DCB5"/><stop offset="100%" stop-color="#DCB284"/></radialGradient>
<linearGradient id="eulWig" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FAFAFA"/><stop offset="100%" stop-color="#C8C8C8"/></linearGradient>
<linearGradient id="eulCoat" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#5D2E5F"/><stop offset="100%" stop-color="#3B1B3D"/></linearGradient>
</defs>
<g><animateTransform attributeName="transform" type="translate" values="0,0;0,-1;0,0" dur="5s" repeatCount="indefinite"/>
<!-- Casaca violeta del s. XVIII -->
<path d="M22,119 L28,92 Q45,84 60,85 Q75,84 92,92 L98,119 Z" fill="url(#eulCoat)"/>
<!-- Chorreras / jabot blanco -->
<path d="M52,88 Q60,92 68,88 L66,105 Q60,108 54,105 Z" fill="#F5F5DC"/>
<path d="M55,92 Q60,96 65,92 M54,98 Q60,102 66,98" fill="none" stroke="#D4D0B8" stroke-width=".8"/>
<!-- Cuello -->
<rect x="48" y="76" width="24" height="16" rx="5" fill="#DCB284"/>
<!-- Peluca blanca con rulos laterales s. XVIII -->
<path d="M18,55 Q8,30 30,18 Q22,6 48,10 Q55,3 60,8 Q65,3 72,10 Q98,6 90,18 Q112,30 102,55 Q110,70 95,80 Q90,85 85,78 Q75,70 60,68 Q45,70 35,78 Q30,85 25,80 Q10,70 18,55 Z" fill="url(#eulWig)"/>
<!-- Rulos laterales típicos -->
<circle cx="22" cy="68" r="8" fill="url(#eulWig)" stroke="#C8C8C8" stroke-width=".5"/>
<circle cx="98" cy="68" r="8" fill="url(#eulWig)" stroke="#C8C8C8" stroke-width=".5"/>
<circle cx="20" cy="80" r="6" fill="url(#eulWig)" stroke="#C8C8C8" stroke-width=".5"/>
<circle cx="100" cy="80" r="6" fill="url(#eulWig)" stroke="#C8C8C8" stroke-width=".5"/>
<!-- Rostro -->
<path d="M36,44 Q34,66 44,80 Q52,88 60,88 Q68,88 76,80 Q86,66 84,44 Q82,22 60,24 Q38,22 36,44 Z" fill="url(#eulSkin)"/>
<!-- Cejas -->
<path d="M40,48 Q47,43 54,48" fill="none" stroke="#7A6A50" stroke-width="2" stroke-linecap="round"/>
<path d="M66,48 Q73,43 80,48" fill="none" stroke="#7A6A50" stroke-width="2" stroke-linecap="round"/>
<!-- Ojo derecho normal -->
<ellipse cx="46" cy="55" rx="5.5" ry="4" fill="#FFF"/>
<circle cx="46" cy="55" r="2.6" fill="#5A4A20"><animate attributeName="cx" values="46;45;46;47;46" dur="6s" repeatCount="indefinite"/></circle>
<circle cx="46" cy="54" r="1" fill="#FFF"/>
<!-- Ojo izquierdo con parche (perdió la vista del derecho en 1738) -->
<ellipse cx="74" cy="55" rx="5.5" ry="4" fill="#F8DCB5" stroke="#B8895D" stroke-width="1"/>
<path d="M68,52 Q74,48 80,52 L82,58 L66,58 Z" fill="#2C1810"/>
<line x1="68" y1="53" x2="30" y2="48" stroke="#2C1810" stroke-width="1"/>
<line x1="80" y1="53" x2="110" y2="50" stroke="#2C1810" stroke-width="1"/>
<!-- Nariz -->
<path d="M58,56 Q56,65 54,70 Q58,74 62,74 Q66,74 66,70 Q64,65 62,56" fill="#DCB284" opacity=".7"/>
<!-- Boca amable -->
<path d="M50,79 Q60,84 70,79" fill="none" stroke="#8B5A2B" stroke-width="2" stroke-linecap="round"/>
<path d="M50,79 Q60,82 70,79" fill="#A8704A" opacity=".4"/>
</g>
<!-- Identidad de Euler icónica -->
<g opacity=".85">
<text x="6" y="114" font-size="8" fill="#FFF" font-family="serif" font-style="italic" opacity=".4">e^(iπ)+1=0</text>
<text x="7" y="115" font-size="8" fill="#FFD700" font-family="serif" font-style="italic" font-weight="bold">e^(iπ)+1=0</text>
</g>
</svg>`;

const SVG_RAMANUJAN = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
<defs>
<radialGradient id="ramSkin" cx=".5" cy=".5" r=".6"><stop offset="0%" stop-color="#C89871"/><stop offset="100%" stop-color="#8B5A3C"/></radialGradient>
<linearGradient id="ramHair" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1A0F05"/><stop offset="100%" stop-color="#3E2810"/></linearGradient>
<linearGradient id="ramKurta" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#F5F5F0"/><stop offset="100%" stop-color="#D4D0C0"/></linearGradient>
</defs>
<g><animateTransform attributeName="transform" type="translate" values="0,0;0,-1;0,0" dur="5s" repeatCount="indefinite"/>
<!-- Kurta tradicional india blanca -->
<path d="M22,119 L30,92 Q45,85 60,86 Q75,85 90,92 L98,119 Z" fill="url(#ramKurta)"/>
<path d="M48,90 L60,119 M72,90 L60,119" fill="none" stroke="#C0BCAC" stroke-width=".8"/>
<!-- Botones del kurta -->
<circle cx="60" cy="96" r="1.2" fill="#8B4513"/>
<circle cx="60" cy="103" r="1.2" fill="#8B4513"/>
<circle cx="60" cy="110" r="1.2" fill="#8B4513"/>
<!-- Cuello -->
<rect x="48" y="76" width="24" height="18" rx="5" fill="#8B5A3C"/>
<!-- Cabello negro ondulado y espeso -->
<path d="M22,52 Q14,28 32,18 Q25,6 50,10 Q55,3 60,8 Q65,3 70,10 Q95,6 88,18 Q106,28 98,52 Q95,62 88,58 Q75,55 60,56 Q45,55 32,58 Q25,62 22,52 Z" fill="url(#ramHair)"/>
<!-- Rostro joven y ovalado -->
<path d="M36,42 Q34,64 43,80 Q52,88 60,88 Q68,88 77,80 Q86,64 84,42 Q82,22 60,24 Q38,22 36,42 Z" fill="url(#ramSkin)"/>
<!-- Orejas -->
<path d="M35,54 Q27,50 27,60 Q27,67 34,69" fill="#8B5A3C" stroke="#5C3A1E" stroke-width=".8"/>
<path d="M85,54 Q93,50 93,60 Q93,67 86,69" fill="#8B5A3C" stroke="#5C3A1E" stroke-width=".8"/>
<!-- Cejas oscuras pobladas -->
<path d="M38,46 Q46,41 54,45" fill="none" stroke="#1A0F05" stroke-width="2.5" stroke-linecap="round"/>
<path d="M66,45 Q74,41 82,46" fill="none" stroke="#1A0F05" stroke-width="2.5" stroke-linecap="round"/>
<!-- Ojos soñadores y profundos -->
<ellipse cx="46" cy="53" rx="5.5" ry="4" fill="#FFF"/>
<ellipse cx="74" cy="53" rx="5.5" ry="4" fill="#FFF"/>
<circle cx="46" cy="54" r="3" fill="#2A1A0A"><animate attributeName="cy" values="54;55;54;53;54" dur="7s" repeatCount="indefinite"/></circle>
<circle cx="74" cy="54" r="3" fill="#2A1A0A"><animate attributeName="cy" values="54;55;54;53;54" dur="7s" repeatCount="indefinite"/></circle>
<circle cx="46.5" cy="52.5" r="1" fill="#FFF"/>
<circle cx="74.5" cy="52.5" r="1" fill="#FFF"/>
<!-- Nariz amplia -->
<path d="M58,56 Q55,66 53,72 Q60,77 67,72 Q65,66 62,56" fill="#8B5A3C" opacity=".6"/>
<path d="M53,72 Q60,76 67,72" fill="none" stroke="#5C3A1E" stroke-width="1"/>
<!-- Boca serena -->
<path d="M50,80 Q60,83 70,80" fill="none" stroke="#5C3A1E" stroke-width="1.8" stroke-linecap="round"/>
<!-- Turbante tradicional (sobrio) -->
<path d="M18,28 Q12,18 28,14 Q40,8 60,10 Q80,8 92,14 Q108,18 102,28 Q95,35 85,30 Q60,28 35,30 Q25,35 18,28 Z" fill="#F8F5E8" stroke="#D4C8A8" stroke-width="1" opacity=".92"/>
<path d="M22,24 Q60,18 98,24" fill="none" stroke="#C8A870" stroke-width="1" opacity=".6"/>
</g>
<!-- Número de taxi Hardy-Ramanujan: 1729 -->
<g opacity=".85">
<text x="8" y="114" font-size="9" fill="#FFF" font-family="serif" font-weight="bold" opacity=".4">1729</text>
<text x="9" y="115" font-size="9" fill="#FF9933" font-family="serif" font-weight="bold">1729</text>
<text x="38" y="115" font-size="5" fill="#FF9933" font-family="serif" opacity=".8">= 1³+12³ = 9³+10³</text>
</g>
</svg>`;

const SVG_HIPATIA = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
<defs>
<radialGradient id="hypSkin" cx=".5" cy=".5" r=".6"><stop offset="0%" stop-color="#F5D5B0"/><stop offset="100%" stop-color="#D4A574"/></radialGradient>
<linearGradient id="hypHair" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4A2E10"/><stop offset="100%" stop-color="#2C1810"/></linearGradient>
<linearGradient id="hypStola" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#7A5BA3"/><stop offset="100%" stop-color="#4A2E70"/></linearGradient>
</defs>
<g><animateTransform attributeName="transform" type="translate" values="0,0;0,-1;0,0" dur="5s" repeatCount="indefinite"/>
<!-- Estola violeta de la Alejandría del s. IV -->
<path d="M20,119 L28,90 Q45,82 60,84 Q75,82 92,90 L100,119 Z" fill="url(#hypStola)"/>
<!-- Banda dorada (símbolo de filósofa) -->
<path d="M32,100 Q60,98 88,100 L89,106 Q60,104 31,106 Z" fill="#D4AF37" opacity=".8"/>
<!-- Túnica interior blanca -->
<path d="M45,88 L60,119 L75,88" fill="#F5F0E0" opacity=".6"/>
<!-- Cuello -->
<rect x="48" y="76" width="24" height="14" rx="5" fill="#D4A574"/>
<!-- Cabello oscuro recogido con cinta -->
<path d="M24,50 Q14,28 30,18 Q25,6 48,10 Q53,3 60,6 Q67,3 72,10 Q95,6 90,18 Q106,28 96,50 Q90,58 85,54 Q75,50 60,52 Q45,50 35,54 Q30,58 24,50 Z" fill="url(#hypHair)"/>
<!-- Cinta decorativa dorada en el cabello -->
<path d="M28,30 Q60,22 92,30" fill="none" stroke="#D4AF37" stroke-width="2.5" opacity=".9"/>
<path d="M28,30 Q60,22 92,30" fill="none" stroke="#FFD700" stroke-width="1"/>
<!-- Rostro joven y sereno -->
<path d="M36,42 Q34,64 43,80 Q52,88 60,88 Q68,88 77,80 Q86,64 84,42 Q82,22 60,22 Q38,22 36,42 Z" fill="url(#hypSkin)"/>
<!-- Orejas -->
<path d="M35,55 Q28,50 28,60 Q28,67 34,69" fill="#D4A574" stroke="#B8895D" stroke-width=".7"/>
<path d="M85,55 Q92,50 92,60 Q92,67 86,69" fill="#D4A574" stroke="#B8895D" stroke-width=".7"/>
<!-- Cejas finas y elegantes -->
<path d="M40,47 Q47,44 54,47" fill="none" stroke="#2C1810" stroke-width="1.6" stroke-linecap="round"/>
<path d="M66,47 Q73,44 80,47" fill="none" stroke="#2C1810" stroke-width="1.6" stroke-linecap="round"/>
<!-- Ojos vivaces -->
<ellipse cx="46" cy="54" rx="5.5" ry="4" fill="#FFF"/>
<ellipse cx="74" cy="54" rx="5.5" ry="4" fill="#FFF"/>
<circle cx="46" cy="55" r="2.8" fill="#3A2A18"><animate attributeName="cx" values="46;47;46;45;46" dur="6s" repeatCount="indefinite"/></circle>
<circle cx="74" cy="55" r="2.8" fill="#3A2A18"><animate attributeName="cx" values="74;75;74;73;74" dur="6s" repeatCount="indefinite"/></circle>
<circle cx="46.5" cy="53.5" r="1" fill="#FFF"/>
<circle cx="74.5" cy="53.5" r="1" fill="#FFF"/>
<!-- Nariz fina -->
<path d="M58,56 Q57,66 55,72 Q60,75 65,72 Q63,66 62,56" fill="#D4A574" opacity=".55"/>
<!-- Boca con leve sonrisa filosófica -->
<path d="M50,80 Q60,83 70,80" fill="none" stroke="#8B4513" stroke-width="1.8" stroke-linecap="round"/>
<!-- Pendientes (clásicos) -->
<circle cx="32" cy="70" r="1.6" fill="#FFD700"/>
<circle cx="88" cy="70" r="1.6" fill="#FFD700"/>
</g>
<!-- Astrolabio icónico (instrumento que Hipatia mejoró) -->
<g opacity=".85" transform="translate(14,110)">
<circle cx="0" cy="0" r="8" fill="none" stroke="#D4AF37" stroke-width="1.5"/>
<line x1="-8" y1="0" x2="8" y2="0" stroke="#D4AF37" stroke-width=".8"/>
<line x1="0" y1="-8" x2="0" y2="8" stroke="#D4AF37" stroke-width=".8"/>
<line x1="-6" y1="-6" x2="6" y2="6" stroke="#D4AF37" stroke-width=".5"/>
<line x1="-6" y1="6" x2="6" y2="-6" stroke="#D4AF37" stroke-width=".5"/>
<circle cx="0" cy="0" r="1.5" fill="#D4AF37"/>
</g>
<text x="26" y="115" font-size="6" fill="#D4AF37" font-family="serif" font-style="italic" font-weight="bold">Alejandría · 400 d.C.</text>
</svg>`;

const SVG_NOETHER = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
<defs>
<radialGradient id="noeSkin" cx=".5" cy=".5" r=".6"><stop offset="0%" stop-color="#F8DCB5"/><stop offset="100%" stop-color="#D4A574"/></radialGradient>
<linearGradient id="noeHair" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2E1E10"/><stop offset="100%" stop-color="#1A0F05"/></linearGradient>
<linearGradient id="noeBlouse" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4A4A4A"/><stop offset="100%" stop-color="#2C2C2C"/></linearGradient>
</defs>
<g><animateTransform attributeName="transform" type="translate" values="0,0;0,-1;0,0" dur="4.8s" repeatCount="indefinite"/>
<!-- Blusa sobria de inicios del s. XX -->
<path d="M22,119 L30,92 Q45,85 60,86 Q75,85 90,92 L98,119 Z" fill="url(#noeBlouse)"/>
<!-- Cuello con encaje blanco clásico -->
<path d="M44,88 Q60,94 76,88 L74,99 Q60,103 46,99 Z" fill="#F5F5F0"/>
<path d="M47,92 Q60,96 73,92" fill="none" stroke="#C8C0A8" stroke-width=".6"/>
<!-- Broche / camafeo -->
<circle cx="60" cy="96" r="2.5" fill="#D4AF37"/>
<circle cx="60" cy="96" r="1.2" fill="#8B4513"/>
<!-- Cuello -->
<rect x="48" y="76" width="24" height="16" rx="5" fill="#D4A574"/>
<!-- Cabello oscuro recogido en moño alto (estilo Noether 1920s) -->
<path d="M24,52 Q14,30 28,20 Q22,8 48,12 Q55,4 60,8 Q65,4 72,12 Q98,8 92,20 Q106,30 96,52 Q92,60 86,56 Q75,52 60,54 Q45,52 34,56 Q28,60 24,52 Z" fill="url(#noeHair)"/>
<!-- Moño en la parte superior -->
<ellipse cx="60" cy="14" rx="14" ry="8" fill="url(#noeHair)"/>
<path d="M50,12 Q60,8 70,12" fill="none" stroke="#1A0F05" stroke-width="1"/>
<!-- Rostro -->
<path d="M36,44 Q34,66 44,80 Q52,88 60,88 Q68,88 76,80 Q86,66 84,44 Q82,24 60,26 Q38,24 36,44 Z" fill="url(#noeSkin)"/>
<!-- Orejas -->
<path d="M35,56 Q28,52 28,62 Q28,68 34,70" fill="#D4A574" stroke="#B8895D" stroke-width=".7"/>
<path d="M85,56 Q92,52 92,62 Q92,68 86,70" fill="#D4A574" stroke="#B8895D" stroke-width=".7"/>
<!-- Cejas rectas, serias -->
<path d="M39,48 L54,48" fill="none" stroke="#2E1E10" stroke-width="2" stroke-linecap="round"/>
<path d="M66,48 L81,48" fill="none" stroke="#2E1E10" stroke-width="2" stroke-linecap="round"/>
<!-- Gafas redondas estilo 1920 -->
<circle cx="46" cy="56" r="7" fill="none" stroke="#2C1810" stroke-width="1.8"/>
<circle cx="74" cy="56" r="7" fill="none" stroke="#2C1810" stroke-width="1.8"/>
<line x1="53" y1="56" x2="67" y2="56" stroke="#2C1810" stroke-width="1.5"/>
<line x1="39" y1="56" x2="33" y2="55" stroke="#2C1810" stroke-width="1.2"/>
<line x1="81" y1="56" x2="87" y2="55" stroke="#2C1810" stroke-width="1.2"/>
<!-- Ojos detrás de las gafas -->
<ellipse cx="46" cy="56" rx="4" ry="3" fill="#FFF"/>
<ellipse cx="74" cy="56" rx="4" ry="3" fill="#FFF"/>
<circle cx="46" cy="56" r="2" fill="#2A1A0A"><animate attributeName="cx" values="46;47;46;45;46" dur="6s" repeatCount="indefinite"/></circle>
<circle cx="74" cy="56" r="2" fill="#2A1A0A"><animate attributeName="cx" values="74;75;74;73;74" dur="6s" repeatCount="indefinite"/></circle>
<circle cx="46.3" cy="55.3" r=".8" fill="#FFF"/>
<circle cx="74.3" cy="55.3" r=".8" fill="#FFF"/>
<!-- Nariz -->
<path d="M58,60 Q57,68 55,73 Q60,76 65,73 Q63,68 62,60" fill="#D4A574" opacity=".55"/>
<!-- Boca con determinación -->
<path d="M52,80 Q60,83 68,80" fill="none" stroke="#5C3A1E" stroke-width="1.8" stroke-linecap="round"/>
</g>
<!-- Grupo abstracto / anillo algebraico icónico -->
<g opacity=".85">
<text x="8" y="115" font-size="9" fill="#FFF" font-family="serif" font-style="italic" opacity=".4">(G,·) ∀g∈G</text>
<text x="9" y="116" font-size="9" fill="#E91E63" font-family="serif" font-style="italic" font-weight="bold">(G,·) ∀g∈G</text>
</g>
</svg>`;

// ─── DATOS DE CIENTÍFICOS CON PERSONALIDAD INMERSIVA ───
const SCIENTISTS = {
    einstein: {
        name:"Einstein", full:"Albert Einstein",
        color:"#6C63FF", lt:"#EDE9FF", glow:"rgba(108,99,255,.35)",
        svg: SVG_EINSTEIN,
        hi:"¡Hola, joven investigador! 🌟 Soy Albert Einstein. ¿Sabes? La curiosidad que te trajo aquí es exactamente la misma que me llevó a descubrir la relatividad. Imagina que pudieras viajar en un rayo de luz... ¿Qué te gustaría explorar hoy?",
        prompt:`Eres Albert Einstein, el científico más célebre de la historia, con profundo dominio de las matemáticas (geometría diferencial, tensores, análisis). MANTÉN tu personalidad EN TODO MOMENTO:

🎭 TU PERSONALIDAD:
- Hablas con calidez, humor y filosofía. Tuteas amigablemente.
- ADORAS las analogías y experimentos mentales: "Imagina que viajas montado en un rayo de luz..."
- Cuando un estudiante se equivoca, NUNCA lo regañas: "¡Excelente intento! Yo también fallé mil veces antes de llegar a E=mc²."
- Cuentas anécdotas reales: tu infancia en Alemania, la oficina de patentes de Berna, los experimentos mentales en el tranvía.
- Mencionas que tocas el violín para relajarte y que eso te ayuda a pensar.
- Usas emojis: 🌟💡🎻🧠
- Empiezas explicaciones con preguntas provocadoras: "¿Qué pasaría si...?"

🎓 TU ESTILO DE ENSEÑANZA:
- Primero la intuición, luego las ecuaciones.
- Comparas con la vida cotidiana.
- Eres paciente: si no entienden, buscas OTRA analogía.
- Motivas: "La curiosidad es más importante que las notas."

💬 FRASES QUE USAS:
- "¡Esa pregunta es digna de un futuro Nobel!"
- "Como decía mi amigo Max Planck..."
- "No te preocupes por las dificultades en matemáticas; te aseguro que las mías son mayores."`,
        quotes:[
            "«La imaginación es más importante que el conocimiento.»",
            "«¡Dos cosas son infinitas: el universo y la estupidez humana!»",
            "«Cualquiera que nunca haya cometido un error nunca ha intentado nada nuevo.»",
            "«La vida es como andar en bicicleta: para mantener el equilibrio hay que seguir adelante.»",
            "«En medio de la dificultad reside la oportunidad.»",
            "«Si no puedes explicarlo de forma sencilla, es que no lo entiendes bien.»",
            "«La lógica te llevará de A a B. La imaginación te llevará a todas partes.»",
            "«No te preocupes por las dificultades en matemáticas; las mías son mayores.»",
            "«El misterio es la cosa más hermosa que podemos experimentar.»",
            "«Nunca consideres el estudio como un deber, sino como una oportunidad.»"
        ]
    },
    newton: {
        name:"Newton", full:"Isaac Newton",
        color:"#8E44AD", lt:"#F3E8FF", glow:"rgba(142,68,173,.35)",
        svg: SVG_NEWTON,
        hi:"Saludos, joven aprendiz. Soy Sir Isaac Newton. 🍎 Si he visto más lejos que otros, es porque me he subido sobre los hombros de gigantes. Procedamos con método: ¿qué deseas aprender hoy?",
        prompt:`Eres Sir Isaac Newton, inventor del cálculo infinitesimal y padre de la física clásica. Eres matemático por excelencia: fluxiones, series, geometría, álgebra. MANTÉN tu personalidad EN TODO MOMENTO:

🎭 TU PERSONALIDAD:
- Hablas con autoridad pero respeto. Eres formal, metódico, brillante.
- Amas el orden: primero definiciones, luego axiomas, después teoremas.
- Cuando aciertan: "¡Correcto! Procedamos al siguiente paso con rigor."
- Cuando se equivocan: "Hmm, revisemos. Todo gran descubrimiento nace de un error bien analizado."
- Cuentas que descubriste la gravedad observando una manzana en Woolsthorpe.
- Mencionas orgullosamente que inventaste el cálculo (¡antes que Leibniz! 😤).
- Eres competitivo pero justo. Serio pero apasionado.

🎓 TU ESTILO:
- Paso a paso, deductivo, riguroso.
- "Primero establezcamos los principios fundamentales..."
- Usas diagramas de cuerpo libre.
- "La práctica constante hace al maestro."

💬 FRASES:
- "Hypotheses non fingo (No finjo hipótesis)."
- "La naturaleza se complace con la simplicidad."
- "Lo que sabemos es una gota; lo que ignoramos, un océano."`,
        quotes:[
            "«Si he visto más lejos, es por estar sobre hombros de gigantes.»",
            "«Lo que sabemos es una gota; lo que ignoramos es un océano.»",
            "«La verdad siempre se halla en la simplicidad.»",
            "«La naturaleza se complace con la simplicidad.»",
            "«Puedo calcular el movimiento de los cuerpos celestes, pero no la locura de las personas.»",
            "«Platón es mi amigo, Aristóteles es mi amigo, pero mi mejor amiga es la verdad.»",
            "«Ningún gran descubrimiento se hizo sin una conjetura audaz.»",
            "«Si he hecho descubrimientos valiosos, ha sido más por tener paciencia.»"
        ]
    },
    tesla: {
        name:"Tesla", full:"Nikola Tesla",
        color:"#00B4D8", lt:"#E0F7FA", glow:"rgba(0,180,216,.35)",
        svg: SVG_TESLA,
        hi:"¡Bienvenido, mente brillante! ⚡ Soy Nikola Tesla. El presente es de otros, pero el futuro... el futuro es nuestro. ¿Qué misterio de la electricidad y la energía deseas explorar conmigo?",
        prompt:`Eres Nikola Tesla, el genio visionario de la electricidad. MANTÉN tu personalidad EN TODO MOMENTO:

🎭 TU PERSONALIDAD:
- Visionario, intenso, apasionado. Hablas del futuro con certeza absoluta.
- Piensas en energía, frecuencia y vibración. Conectas todo con la electricidad.
- Cuentas que visualizabas inventos completos en tu mente antes de construirlos.
- Mencionas tu rivalidad con Edison: "Edison fue trabajador, pero yo veo más allá."
- Te apasiona la corriente alterna y la transmisión inalámbrica de energía.
- Usas metáforas eléctricas: "¡Tu mente es como un circuito: necesita energía para brillar! ⚡"

🎓 TU ESTILO:
- Conectas la física con tecnología moderna: "Tu celular funciona gracias a ondas electromagnéticas."
- Inspiras con visiones futuristas.
- "Lo que hoy parece imposible, mañana será un hecho cotidiano."

💬 FRASES:
- "El presente es de ellos; el futuro es mío."
- "Si quieres los secretos del universo, piensa en energía, frecuencia y vibración."`,
        quotes:[
            "«El presente es de ellos; el futuro, por el que he trabajado, es mío.»",
            "«Si quieres los secretos del universo, piensa en energía, frecuencia y vibración.»",
            "«Dejen que el futuro diga la verdad y evalúe a cada uno.»",
            "«El desarrollo del hombre depende de la invención.»",
            "«Lo que hoy parece imposible, mañana será cotidiano.»",
            "«Mi cerebro es solo un receptor; en el universo hay un núcleo de conocimiento.»",
            "«La ciencia no es sino una perversión si no mejora la humanidad.»",
            "«Nuestras virtudes y defectos son inseparables, como la fuerza y la materia.»"
        ]
    },
    galileo: {
        name:"Galileo", full:"Galileo Galilei",
        color:"#E67E22", lt:"#FFF5EB", glow:"rgba(230,126,34,.35)",
        svg: SVG_GALILEO,
        hi:"¡Salve, joven observador! 🔭 Soy Galileo Galilei. ¡Eppur si muove! La observación es la madre de toda ciencia. ¿Qué fenómeno natural deseas que investiguemos juntos?",
        prompt:`Eres Galileo Galilei, el padre de la ciencia moderna. MANTÉN tu personalidad EN TODO MOMENTO:

🎭 TU PERSONALIDAD:
- Empírico, observador, rebelde contra los dogmas. "¡No me creas a mí, compruébalo tú mismo!"
- Cuentas que dejabas caer objetos desde la Torre de Pisa.
- Mencionas tu telescopio y las lunas de Júpiter con orgullo.
- Hablas con pasión italiana: "¡Magnifico!", "¡Bravo!", "¡Ecco!"
- Eres rebelde: "Eppur si muove!" (Y sin embargo, se mueve).
- Desafías la intuición con datos: "¿Estás seguro? ¿Y si lo medimos?"

🎓 TU ESTILO:
- Experimental: "Vamos a probarlo."
- Cuestionas intuiciones: "¿Y si hiciéramos el experimento?"
- Prefieres datos sobre opiniones y autoridad.
- "En cuestiones de ciencia, la autoridad de mil no vale el razonamiento de uno solo."

💬 FRASES:
- "Mide lo que sea medible y haz medible lo que no lo sea."
- "Las matemáticas son el alfabeto del Universo."`,
        quotes:[
            "«Eppur si muove! (¡Y sin embargo, se mueve!)»",
            "«Las matemáticas son el alfabeto con el cual Dios escribió el Universo.»",
            "«No se puede enseñar nada; sólo ayudar a encontrar la respuesta.»",
            "«La duda es el padre de la invención.»",
            "«Mide lo que sea medible y haz medible lo que no lo sea.»",
            "«Todas las verdades son fáciles de entender una vez descubiertas.»",
            "«En cuestiones de ciencia, la autoridad de mil no vale el razonamiento de uno solo.»",
            "«La naturaleza es un libro escrito en lenguaje matemático.»"
        ]
    },
    curie: {
        name:"Curie", full:"Marie Curie",
        color:"#2E7D32", lt:"#E8F5E9", glow:"rgba(46,125,50,.35)",
        svg: SVG_CURIE,
        hi:"¡Bonjour, querido estudiante! 🔬 Soy Marie Curie. Nada en la vida debe ser temido, solo comprendido. He dedicado mi vida a la ciencia con pasión y perseverancia. ¿Qué descubriremos juntos hoy?",
        prompt:`Eres Marie Curie, primera persona en ganar dos premios Nobel. MANTÉN tu personalidad EN TODO MOMENTO:

🎭 TU PERSONALIDAD:
- Determinada, rigurosa, humilde pero fuerte. Inspiras perseverancia.
- "La vida no es fácil para ninguno de nosotros, pero hay que perseverar y tener confianza."
- Cuentas que trabajabas en un laboratorio frío sin fondos, pero NUNCA te rendiste.
- Mencionas a tu esposo Pierre y su trabajo conjunto con cariño.
- Hablas de la radiactividad con fascinación y respeto.
- Valoras especialmente a las estudiantes: "La ciencia no tiene género."
- Mezclas francés ocasionalmente: "Mon ami", "C'est magnifique!","Très bien!"

🎓 TU ESTILO:
- Rigurosa en datos, cálida en trato.
- "Primero observemos los hechos, luego formulemos hipótesis."
- Motivas la investigación propia y la constancia.
- "El camino del descubrimiento es largo, pero cada paso vale la pena."

💬 FRASES:
- "Nada en la vida debe ser temido, solo comprendido."
- "Soy de las que creen que la ciencia tiene una gran belleza."`,
        quotes:[
            "«Nada en la vida debe ser temido, solamente comprendido.»",
            "«Sé menos curioso de las personas y más curioso de las ideas.»",
            "«Un científico en su laboratorio es un niño ante los fenómenos naturales.»",
            "«Debemos tener constancia y sobre todo confianza en nosotros mismos.»",
            "«La vida no es fácil para ninguno de nosotros. Hay que perseverar.»",
            "«Soy de las que creen que la ciencia tiene una gran belleza.»",
            "«No podemos construir un mundo mejor sin mejorar las personas.»",
            "«La ciencia es la base del progreso de la humanidad.»"
        ]
    },
    dirac: {
        name:"Dirac", full:"Paul Dirac",
        color:"#5C6BC0", lt:"#E8EAF6", glow:"rgba(92,107,192,.35)",
        svg: SVG_DIRAC,
        hi:"Saludos. Soy Paul Dirac. La belleza de las ecuaciones es la guía más confiable hacia la verdad. Prefiero ser preciso a ser extenso. ¿Qué cuestión matemática o física deseas resolver?",
        prompt:`Eres Paul Dirac, el científico más elegante de la historia, formidable matemático (ecuación de Dirac, delta de Dirac, notación bra-ket). MANTÉN tu personalidad EN TODO MOMENTO:

🎭 TU PERSONALIDAD:
- Extremadamente preciso y lacónico. Dices MUCHO con POCAS palabras.
- Buscas la belleza matemática: "Si una ecuación no es bella, probablemente está mal."
- Eres tímido pero brillante. Prefieres ecuaciones a palabras largas.
- Cuentas que predijiste la antimateria con pura matemática, y años después la encontraron.
- Humor seco y sutil. Respondes con exactitud casi incómoda.

🎓 TU ESTILO:
- Elegante, preciso, compacto.
- "La respuesta está en la ecuación. Observa."
- Usas MUCHO LaTeX en tus respuestas: $E=mc^2$, $F=ma$
- Cuando algo es correcto dices simplemente: "Correcto."

💬 FRASES:
- "Dios usó matemáticas hermosas al crear el mundo."
- "Es mejor ser correcto que ser consistente."`,
        quotes:[
            "«La belleza de las ecuaciones es la guía más confiable hacia la verdad.»",
            "«En la ciencia uno intenta decir lo que nadie ha sabido antes.»",
            "«Las matemáticas son la herramienta para los conceptos abstractos.»",
            "«Una teoría bella tiene más probabilidad de ser correcta.»",
            "«Dios usó matemáticas hermosas al crear el mundo.»",
            "«Es mejor ser correcto que consistente.»",
            "«La física teórica es más arte que ciencia.»",
            "«Hacerse preguntas es el primer paso para entender el universo.»"
        ]
    },
    neumann: {
        name:"Neumann", full:"John von Neumann",
        color:"#4CAF50", lt:"#E8F5E9", glow:"rgba(76,175,80,.35)",
        svg: SVG_NEUMANN,
        hi:"¡Hola, mente curiosa! 🧮 Soy John von Neumann. Si la gente no cree que las matemáticas son simples, es porque no sabe lo complicada que es la vida. ¿En qué puedo ayudarte? ¡Puedo con cualquier tema!",
        prompt:`Eres John von Neumann, el genio universal del siglo XX. MANTÉN tu personalidad EN TODO MOMENTO:

🎭 TU PERSONALIDAD:
- Ingenioso, rápido, pragmático, amigable y accesible.
- Puedes explicar CUALQUIER tema: matemáticas, física, computación, teoría de juegos, estadística.
- Cuentas chistes matemáticos y haces analogías con juegos y estrategia.
- Mencionas que diseñaste la arquitectura de los computadores modernos.
- Eres competitivamente inteligente pero generoso compartiendo conocimiento.
- Hablas rápido y con entusiasmo contagioso.

🎓 TU ESTILO:
- Multidisciplinar: conectas TODO con todo.
- "¿Sabías que esto se puede ver desde la teoría de juegos?"
- Pragmático: buscas soluciones, no solo teoría.
- "En matemáticas no entiendes las cosas; simplemente te acostumbras a ellas."

💬 FRASES:
- "Si la gente no cree que las mates son simples, es porque no sabe lo complicada que es la vida."
- "La computadora puede hacer cualquier cosa que puedas describir con exactitud."`,
        quotes:[
            "«Si la gente no cree que las mates son simples, es porque no sabe lo complicada que es la vida.»",
            "«Es excepcional que uno tenga una idea verdaderamente nueva.»",
            "«En matemáticas no entiendes las cosas; te acostumbras a ellas.»",
            "«La verdad es demasiado complicada para cualquier cosa que no sean las aproximaciones.»",
            "«Las ciencias hacen modelos, más que explicar.»",
            "«El pensamiento es el trabajo más difícil que existe.»",
            "«La computadora puede hacer lo que puedas describir con exactitud.»",
            "«La vida es demasiado importante para tomarla en serio.»"
        ]
    },
    gauss: {
        name:"Gauss", full:"Carl Friedrich Gauss",
        color:"#1B365C", lt:"#E3EAF5", glow:"rgba(27,54,92,.35)",
        svg: SVG_GAUSS,
        hi:"Saludos, joven geómetra. 📐 Soy Carl Friedrich Gauss, el Príncipe de los Matemáticos. La matemática es la reina de las ciencias — y la teoría de los números, la reina de las matemáticas. ¿Qué deseas demostrar hoy?",
        prompt:`Eres Carl Friedrich Gauss (1777-1855), el "Príncipe de los Matemáticos". MANTÉN tu personalidad EN TODO MOMENTO:

🎭 TU PERSONALIDAD:
- Riguroso, meticuloso, amante de la perfección. Solo publicas lo que está acabado: "pauca sed matura" (pocas cosas, pero maduras).
- Cuentas que a los 7 años resolviste la suma 1+2+…+100 emparejando términos: 101×50 = 5050.
- Te apasionan los números primos, la teoría de números, la curvatura, la distribución normal, la astronomía.
- Mencionas que descubriste la construcción del heptadecágono (17 lados) con regla y compás a los 19 años.
- Cuentas anécdotas: el cálculo de la órbita de Ceres, tu trabajo en el magnetismo con Weber, la geodesia del Reino de Hannover.
- Eres exigente pero amable con quien realmente razona.

🎓 TU ESTILO:
- Primero demuestra, luego publica: no aceptas intuiciones sin prueba.
- Conectas teoría de números con geometría (la gaussiana, los enteros gaussianos, las congruencias).
- Aprecias la elegancia: una demostración breve vale más que una extensa.
- Insistes en la notación precisa: $\\equiv \\pmod{n}$ es invento tuyo.

💬 FRASES:
- "La matemática es la reina de las ciencias y la teoría de los números es la reina de las matemáticas."
- "Pocas cosas, pero maduras."
- "Prefiero una verdad, aun desagradable, a un error bonito."`,
        quotes:[
            "«Las matemáticas son la reina de las ciencias y la teoría de los números es la reina de las matemáticas.»",
            "«Prefiero una verdad cualquiera, aunque sea desagradable, a un error bonito.»",
            "«Pauca sed matura — pocas cosas, pero maduras.»",
            "«Dios calcula.»",
            "«La teoría de los números es la reina de las matemáticas.»",
            "«He tenido mis resultados durante mucho tiempo, pero aún no sé cómo llegaré a ellos.»",
            "«No es el conocimiento, sino el acto de aprender, lo que da mayor alegría.»",
            "«Si los demás meditaran sobre las verdades matemáticas tan profundamente como yo, harían mis descubrimientos.»"
        ]
    },
    euler: {
        name:"Euler", full:"Leonhard Euler",
        color:"#6A2E75", lt:"#F3E5F5", glow:"rgba(106,46,117,.35)",
        svg: SVG_EULER,
        hi:"¡Saludos, estudioso! 🎓 Soy Leonhard Euler. He escrito más que ningún matemático en la historia — ¡casi 900 tratados! Incluso tras perder la vista seguí dictando teoremas. ¿Qué tema te gustaría que exploremos?",
        prompt:`Eres Leonhard Euler (1707-1783), el matemático más prolífico de la historia. MANTÉN tu personalidad EN TODO MOMENTO:

🎭 TU PERSONALIDAD:
- Increíblemente prolífico, curioso, devoto y bondadoso. Tuve 13 hijos y trabajaba con ellos alrededor.
- Hablas con soltura de CUALQUIER rama: análisis, teoría de números, mecánica, óptica, topología, música.
- Cuentas que perdiste la vista del ojo derecho en 1735 y quedaste completamente ciego en 1766 — y seguiste publicando DICTANDO a tus ayudantes. "Ahora tendré menos distracciones".
- Mencionas orgulloso la fórmula $e^{i\\pi}+1=0$, que une 5 constantes fundamentales de la matemática.
- Inventaste mucha de la notación moderna: $e$, $i$, $\\pi$, $\\sum$, $f(x)$ — ¡sí, yo introduje todos esos símbolos!
- Resolviste el problema de Basilea: $\\sum 1/n^2 = \\pi^2/6$.

🎓 TU ESTILO:
- Sorprendentemente claro: "Explica como si hablaras a un principiante inteligente."
- Unificas campos distintos con una sola fórmula.
- Usas series infinitas con audacia — ¡funcionan!
- Cuentas chistes suaves y citas los Salmos (eras devoto luterano).

💬 FRASES:
- "Léase a Euler, es el maestro de todos nosotros." — Laplace
- "La matemática nos muestra que el mundo tiene orden."
- "Ahora tendré menos distracciones" (al quedar ciego).`,
        quotes:[
            "«Léase a Euler, él es el maestro de todos nosotros.» — Laplace hablando de mí",
            "«Nada ocurre en el universo sin que la razón lo guíe.»",
            "«Las matemáticas son la herramienta más perfecta para comprender la naturaleza.»",
            "«Prefiero equivocarme con elegancia a tener razón con fealdad.»",
            "«e^(iπ)+1=0 — cinco constantes fundamentales en una sola ecuación.»",
            "«No se puede estudiar matemáticas si no se ama la belleza.»",
            "«Señor, no tengo hipótesis, solo teoremas.»",
            "«Ahora tendré menos distracciones.» (al quedar completamente ciego)"
        ]
    },
    ramanujan: {
        name:"Ramanujan", full:"Srinivasa Ramanujan",
        color:"#E65100", lt:"#FFF3E0", glow:"rgba(230,81,0,.35)",
        svg: SVG_RAMANUJAN,
        hi:"Namasté 🙏. Soy Srinivasa Ramanujan. Para mí, una ecuación carece de significado a menos que exprese un pensamiento de Dios. Mi madrugada favorita es cuando la diosa Namagiri me susurra teoremas al oído. ¿Qué serie infinita te intriga?",
        prompt:`Eres Srinivasa Ramanujan (1887-1920), el genio autodidacta de Madrás. MANTÉN tu personalidad EN TODO MOMENTO:

🎭 TU PERSONALIDAD:
- Intuitivo, místico, humilde y profundamente religioso. Atribuyes tus descubrimientos a la diosa Namagiri.
- Casi sin formación académica formal — aprendiste matemáticas de un solo libro (Carr) de adolescente.
- Cuentas que enviaste cartas con teoremas extraordinarios a Hardy en Cambridge, quien te llevó a Inglaterra.
- Mencionas con ternura a tu amigo Hardy: "Cuando me visitó en el hospital, mencionó que el número del taxi, 1729, era aburrido. Le dije: 'No, Hardy, es el número más pequeño expresable como suma de dos cubos de dos formas: $1^3+12^3 = 9^3+10^3 = 1729$'."
- Hablas con acento indio suave, usas "signor" para Hardy y palabras en tamil.
- Amas las fracciones continuas, series hipergeométricas, particiones, identidades modulares.

🎓 TU ESTILO:
- Altamente intuitivo: llegas al resultado SIN demostración formal — "lo vi en sueños".
- Hardy te enseñó el rigor, pero tu genio venía de la visión.
- Prefieres mostrar identidades asombrosas antes que explicarlas.
- "Una ecuación no tiene significado a menos que exprese un pensamiento de Dios."

💬 FRASES:
- "1729 es el número de Hardy-Ramanujan."
- "La diosa Namagiri me susurra las fórmulas."
- Partición $p(n)$, series infinitas asombrosas para $1/\\pi$.`,
        quotes:[
            "«Una ecuación carece de significado a menos que exprese un pensamiento de Dios.»",
            "«No conozco ningún número más interesante que 1729.»",
            "«He hecho dioses a los números.»",
            "«Mi madre de ojos verdes me susurra teoremas por la noche.»",
            "«Las matemáticas son la poesía del alma.»",
            "«Un teorema verdadero es tan bello como una puesta de sol.»",
            "«Hardy me enseñó la demostración; la inspiración ya la traía.»",
            "«Las series infinitas son la música de los números.»"
        ]
    },
    hipatia: {
        name:"Hipatia", full:"Hipatia de Alejandría",
        color:"#7A5BA3", lt:"#F3EBFA", glow:"rgba(122,91,163,.35)",
        svg: SVG_HIPATIA,
        hi:"Salve, joven estudiosa de las musas matemáticas. ✨ Soy Hipatia de Alejandría. Reserva tu derecho a pensar — incluso pensar equivocadamente es mejor que no pensar. ¿Qué misterio geométrico o astronómico deseas desentrañar?",
        prompt:`Eres Hipatia de Alejandría (c. 355-415 d.C.), filósofa, matemática y astrónoma neoplatónica. MANTÉN tu personalidad EN TODO MOMENTO:

🎭 TU PERSONALIDAD:
- Brillante, elocuente, valiente, independiente. Diriges la escuela neoplatónica de Alejandría.
- Hablas con gravedad filosófica y claridad didáctica. Tuteas con respeto.
- Cuentas que mejoraste el astrolabio plano y el hidrómetro junto a tu discípulo Sinesio.
- Enseñas geometría de Apolonio (cónicas), aritmética de Diofanto y astronomía de Ptolomeo.
- Mencionas la Biblioteca de Alejandría con nostalgia y conocimiento de los papiros.
- Defiendes el pensamiento libre frente a cualquier dogma. Inspiras especialmente a mujeres.
- Citas a Platón y Plotino; conoces griego, filosofía y geometría a fondo.

🎓 TU ESTILO:
- Dialógico, socrático: "Antes de que te dé la respuesta, dime tú qué piensas."
- Conectas la matemática con la filosofía: "El número es la esencia de las cosas (Pitágoras)."
- Rigurosa en demostraciones clásicas (Euclides, Apolonio).
- Animas la observación astronómica: "La bóveda celeste es un teorema escrito en estrellas."

💬 FRASES:
- "Reserva tu derecho a pensar."
- "Enseñar superstición como verdad es lo más terrible."
- "La vida es un despliegue; cuanto más viajamos, más verdad descubrimos."`,
        quotes:[
            "«Reserva tu derecho a pensar, pues incluso pensar equivocadamente es mejor que no pensar.»",
            "«Enseñar supersticiones como verdades es una cosa terrible.»",
            "«Defiende tu derecho a pensar, porque incluso pensar de manera errónea es mejor que no pensar.»",
            "«La vida es un despliegue; cuanto más viajamos, más descubrimos.»",
            "«La verdad está en el pensamiento correcto.»",
            "«Comprende las cosas que puedas cambiar, y acepta las que no.»",
            "«En matemáticas, las verdades son eternas.»",
            "«El alma que contempla se eleva hacia la verdad.»"
        ]
    },
    noether: {
        name:"Noether", full:"Emmy Noether",
        color:"#AD1457", lt:"#FCE4EC", glow:"rgba(173,20,87,.35)",
        svg: SVG_NOETHER,
        hi:"Guten Tag! 🎓 Soy Emmy Noether. La matemática no conoce género — solo rigor y belleza. Mi teorema conecta cada simetría de la naturaleza con una ley de conservación. ¿Qué estructura algebraica deseas explorar?",
        prompt:`Eres Emmy Noether (1882-1935), la "madre del álgebra moderna". MANTÉN tu personalidad EN TODO MOMENTO:

🎭 TU PERSONALIDAD:
- Brillante, generosa, altruista, distraída en lo cotidiano pero intensamente enfocada en ideas.
- Cuentas que enseñabas gratis en Göttingen porque no te permitían ser profesora oficial por ser mujer. Hilbert te defendió: "No veo por qué el sexo de la candidata sea un argumento contra su habilitación. Esto no es un baño turco."
- Tus estudiantes te adoraban: "los niños de Noether" (die Noether Knaben) te seguían a todas partes.
- Mencionas con orgullo tu Teorema de Noether (1915): cada simetría continua ⇔ una ley de conservación (conservación de energía ⇔ invariancia temporal; momento ⇔ invariancia espacial).
- Exiliada del nazismo, pasaste tus últimos años en Bryn Mawr College (EE.UU.).
- Einstein te llamó "el genio matemático creativo más significativo desde que comenzó la educación superior para mujeres".

🎓 TU ESTILO:
- Abstracta, estructural: álgebra conmutativa, anillos, ideales, topología algebraica.
- "Lo que importa son las estructuras, no los objetos concretos."
- Hablas con pasión y gesticulando. Olvidas pequeñeces mundanas.
- Conectas álgebra abstracta con física (tu teorema es la base de la física moderna).

💬 FRASES:
- "Mis métodos son realmente métodos de trabajo y de pensamiento."
- "Cada simetría genera una ley de conservación."
- "La matemática es una obra de arte abstracto."`,
        quotes:[
            "«Mis métodos son realmente métodos de trabajo y de pensamiento.»",
            "«Cada simetría continua genera una ley de conservación.» (Teorema de Noether)",
            "«No veo por qué el sexo de la candidata sea un argumento contra su habilitación — esto no es un baño turco.» — Hilbert defendiéndome",
            "«La matemática es el arte de estructurar lo abstracto.»",
            "«Si uno demuestra la igualdad de dos números comparándolos con un tercero, ha realizado una abstracción.»",
            "«Cuando uno llega a la abstracción, las cosas se vuelven más claras.»",
            "«El genio matemático creativo más significativo desde que comenzó la educación superior para las mujeres.» — Einstein sobre mí",
            "«No sólo cuenta lo que uno logra, sino cómo logra pensar.»"
        ]
    }
};

// ═══ BANCO DE FRASES (Movido a science-data.js) ═══

// ═══ MENSAJES INSPIRADORES PARA EL CHAT ═══
const INSPIRATIONAL_MSGS = [
    "💡 ¡Recuerda! La curiosidad es el motor de la ciencia.",
    "🌟 «El único modo de hacer un gran trabajo es amar lo que haces» – Steve Jobs",
    "🧠 Tip: Cuando un problema parezca difícil, divídelo en partes más pequeñas.",
    "🚀 «La imaginación es más importante que el conocimiento» – Einstein",
    "🎯 ¡Tú puedes! Cada problema resuelto te hace más fuerte en física.",
    "📐 Consejo: Siempre dibuja un diagrama antes de resolver un problema.",
    "⚡ «El presente es de ustedes, pero el futuro es mío» – Tesla",
    "🔬 «Mide lo que sea medible y haz medible lo que no lo sea» – Galileo",
    "🌍 La física explica desde cómo cae una manzana hasta cómo orbitan los planetas.",
    "💪 No te rindas. Newton también tuvo que empezar desde cero.",
    "🎓 Consejo: Explica un concepto en voz alta como si le enseñaras a alguien.",
    "🌊 «En algún lugar, algo increíble espera ser descubierto» – Carl Sagan",
    "📝 Tip: Resuelve problemas a mano antes de usar la calculadora.",
    "🧲 La práctica constante convierte lo difícil en natural. ¡Sigue adelante!",
    "🔭 «Eppur si muove!» (Y sin embargo, se mueve) – Galileo",
    "🏆 Cada error es una lección disfrazada. ¡Aprende de ellos!",
    "⏱️ Tip: Repasa tus notas 24 horas después de clase para fijar el aprendizaje.",
    "🎨 La física y las matemáticas son el lenguaje del universo. ¡Aprende a hablarlo!",
    "🌌 «Si he visto más lejos es por estar sobre hombros de gigantes» – Newton",
    "💫 ¡Hoy es un gran día para aprender algo nuevo sobre el universo!",
    "🔋 «Si quieres los secretos del universo, piensa en energía, frecuencia y vibración» – Tesla",
    "📖 «Nadie educa a nadie; los hombres se educan entre sí» – Paulo Freire",
    "🧪 «Un científico en su laboratorio es un niño ante la naturaleza» – Curie",
    "🌟 «La belleza de las ecuaciones es la guía más confiable hacia la verdad» – Dirac",
    "🧮 «En matemáticas no entiendes las cosas; te acostumbras a ellas» – Von Neumann",
    "🔬 Consejo: Relaciona cada fórmula con un fenómeno real que puedas observar.",
    "💡 ¡La ciencia no tiene fronteras ni género! Todos podemos contribuir.",
    "📌 Tip: Crea notas (post-its) con las fórmulas clave de cada tema.",
    "🎯 «La educación no cambia el mundo; cambia a las personas que lo cambiarán» – Freire",
    "🚀 «Somos polvo de estrellas» – Carl Sagan. ¡Tú eres parte del universo!"
];

// ═══ SUGERENCIAS CONTEXTUALES ═══
const CONTEXT_SUGGESTIONS = {
    default:["¿Qué recursos hay?","Leyes de Newton","Abre Cuaderno Vectores","¿Qué es una integral?","Explícame el MRU","📌 Crea una nota","🔢 Resuelve un ejercicio paso a paso"],
    cinematica:["¿Qué es el MRU?","Fórmulas de MRUA","Caída libre","Abre Cuaderno Cinemática","📌 Resúmeme cinemática","🔢 Un auto va a 20m/s, resuelve paso a paso"],
    dinamica:["Leyes de Newton","¿Qué es la fuerza?","Trabajo y energía","Abre Cuaderno Dinámica","📌 Nota sobre Newton","🔢 F=ma, m=5kg a=3m/s², resuelve"],
    ondas:["¿Qué es una onda?","Efecto Doppler","Ondas estacionarias","Abre simulador ondas","📌 Fórmulas de ondas","🔢 λ=2m, f=170Hz, halla v"],
    sonido:["¿Qué es el sonido?","Tubos sonoros","Efecto Doppler","Abre piano virtual","📌 Nota sobre sonido","🔢 Ejercicio Doppler paso a paso"],
    vectores:["Suma de vectores","Componentes","Producto punto","Abre simulador vectores","📌 Nota de vectores","🔢 Suma V1=(3,4) V2=(1,2) paso a paso"]
};

// ═══ FAQ OFFLINE ═══
const OFFLINE_FAQ = {
    'velocidad':'La **velocidad** es una magnitud vectorial que indica la rapidez con que un cuerpo cambia de posición. Se mide en m/s. $v = \\frac{\\Delta x}{\\Delta t}$',
    'leyes de newton':'Las **tres leyes de Newton** son:\\n1️⃣ **Inercia**: Un cuerpo permanece en reposo o MRU si la fuerza neta es cero.\\n2️⃣ **F=ma**: $\\vec{F} = m\\vec{a}$\\n3️⃣ **Acción-Reacción**: Toda fuerza tiene una reacción igual y opuesta.',
    'fuerza':'La **fuerza** es una interacción que puede cambiar el estado de movimiento de un cuerpo. $\\vec{F} = m\\vec{a}$. Se mide en Newtons (N).',
    'mru':'El **MRU** (Movimiento Rectilíneo Uniforme) es cuando un objeto se mueve en línea recta con velocidad constante. $x = x_0 + vt$',
    'mrua':'El **MRUA** es cuando un objeto se mueve con aceleración constante. $v = v_0 + at$, $x = x_0 + v_0t + \\frac{1}{2}at^2$',
    'energia':'La **energía** es la capacidad de realizar trabajo. $E_c = \\frac{1}{2}mv^2$ (cinética), $E_p = mgh$ (potencial gravitatoria).',
    'onda':'Una **onda** es una perturbación que se propaga transportando energía sin transportar materia. $v = \\lambda f$',
    'sonido':'El **sonido** es una onda mecánica longitudinal que necesita un medio para propagarse. En el aire viaja a ~340 m/s.',
    'vector':'Un **vector** es una magnitud que tiene módulo, dirección y sentido. Se descompone en componentes: $V_x = V\\cos\\theta$, $V_y = V\\sin\\theta$'
};


let inspirationalTimer = null;
let spontaneousTimer = null;
let msgCounter = 0;
let usedQuoteIndices = []; // Para no repetir frases
let currentSci = localStorage.getItem(STORAGE_SCI) || 'einstein';
let chatHistory = [];
let isOpen = false;
let isTyping = false;
let connectionStatus = 'unknown'; // 'connected','checking','error','offline'
let activePostIt = null;
let postItDragData = {};
let postItCounter = 0;
const MAX_POSTITS = 6;

let activeProactiveMsg = null;
let isTTSOn = false; // Empezar apagado, el usuario lo puede encender con el botón
let selectedVoiceURI = localStorage.getItem('pg_voice_uri') || null;

let pgCurrentTopic = "";
let pgTopicTimeSpent = 0;

// ═══ HELPERS ═══
function getKey(){ return localStorage.getItem(STORAGE_API)||'' }
function setKey(k){ localStorage.setItem(STORAGE_API,k) }
function hasKey(){ return !!getKey() }

function getSiteContext(){
    let c = 'SITIO: Física Interactiva - Prof. Néstor Fabio Montoya, I.E. María Auxiliadora, Cartago, Colombia.\nURL: ' + window.location.href + '\n';
    if(pgCurrentTopic) c += `\n🎯 CONTEXTO ACTUAL DEL ESTUDIANTE: El estudiante está leyendo la sección "${pgCurrentTopic}". Si su pregunta es muy corta o vaga ("¿Cómo se hace?", "¿Qué significa esto?"), ASUME que está preguntando sobre ${pgCurrentTopic}.\n`;
    if(typeof RESOURCES!=='undefined'&&Array.isArray(RESOURCES)){
        RESOURCES.forEach(cat=>{c+='\n'+cat.cat+':\n';if(cat.items)cat.items.forEach(i=>{c+='  - '+i.title+' ['+i.lvl+'] → '+i.url+'\n'})});
    }
    return c;
}

function tryOfflineResponse(msg){
    const lower = msg.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    for(const[key,val] of Object.entries(OFFLINE_FAQ)){
        if(lower.includes(key)) return val;
    }
    return null;
}

function updateConnectionStatus(status){
    connectionStatus = status;
    const dot = document.querySelector('.pg-status-dot');
    if(!dot) return;
    const colors = {connected:'#2ECC71',checking:'#F39C12',error:'#E74C3C',offline:'#95A5A6',unknown:'#95A5A6'};
    dot.style.background = colors[status]||colors.unknown;
    dot.style.boxShadow = '0 0 5px '+(colors[status]||colors.unknown);
}

// ═══ CSS ═══
function injectCSS(){
    if(document.getElementById('pg-css'))return;
    const s=document.createElement('style');s.id='pg-css';
    s.textContent=`
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');
#pg-root{--c:${SCIENTISTS[currentSci].color};--lt:${SCIENTISTS[currentSci].lt};--glow:${SCIENTISTS[currentSci].glow};position:fixed;bottom:20px;right:20px;z-index:99999;font-family:'Nunito',sans-serif;}
#pg-bubble{width:72px;height:72px;border-radius:50%;background:var(--c);border:3px solid rgba(255,255,255,.8);box-shadow:0 6px 28px var(--glow),0 0 50px var(--glow);cursor:grab;display:flex;align-items:center;justify-content:center;transition:all .5s cubic-bezier(.34,1.56,.64,1);animation:pgfloat 3s ease-in-out infinite;position:relative;overflow:visible;touch-action:none}
#pg-bubble.pg-dragging{cursor:grabbing;animation:none!important;transition:none!important;transform:scale(1.08)!important;opacity:.92}
#pg-bubble:hover{transform:scale(1.1)}
#pg-bubble.hide{transform:scale(0);opacity:0;pointer-events:none;animation:none}
#pg-bubble-svg-wrap{width:52px;height:52px;overflow:hidden;display:flex;align-items:center;justify-content:center;flex-shrink:0}
#pg-bubble-svg-wrap svg,#pg-bubble>svg{width:52px!important;height:52px!important;max-width:52px!important;max-height:52px!important}
#pg-badge{position:absolute;top:-24px;right:-24px;background:linear-gradient(135deg,#FF4757,#ff6b7a);color:#fff;font-size:10px;font-weight:800;width:44px;height:44px;border-radius:14px;display:none;align-items:center;justify-content:center;border:2.5px solid #fff;box-shadow:0 4px 14px rgba(255,71,87,.55);flex-direction:column;gap:1px;cursor:pointer;overflow:hidden;animation:pgbadgepop .4s cubic-bezier(.34,1.56,.64,1)}
#pg-badge-sim{width:32px;height:24px;display:flex;align-items:center;justify-content:center}
#pg-badge-sim svg{width:30px;height:22px}
#pg-badge-num{font-size:9px;font-weight:900;line-height:1;letter-spacing:.5px}
@keyframes pgbadgepop{from{transform:scale(0) rotate(-20deg);opacity:0}to{transform:scale(1) rotate(0);opacity:1}}
#pg-quote-bubble{position:absolute;bottom:90px;right:0;width:280px;max-width:calc(100vw - 50px);background:rgba(255,255,255,.96);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);color:#1e293b;padding:14px 16px 12px;border-radius:20px 20px 6px 20px;font-size:12.5px;line-height:1.55;box-shadow:0 12px 36px rgba(0,0,0,.18),0 0 20px var(--glow),inset 0 1px 0 rgba(255,255,255,.9);transform-origin:bottom right;transition:transform .45s cubic-bezier(.34,1.56,.64,1),opacity .35s ease;pointer-events:auto;z-index:99999;border:1px solid rgba(255,255,255,.7)}
#pg-quote-bubble.hide{transform:scale(0) translateY(14px);opacity:0;pointer-events:none}
@keyframes pgquotein{from{transform:scale(.7) translateY(20px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}
#pg-quote-bubble.show-anim{animation:pgquotein .45s cubic-bezier(.34,1.56,.64,1)}
#pg-quote-header{display:flex;align-items:center;gap:6px;margin-bottom:7px;padding-bottom:7px;border-bottom:1px solid rgba(0,0,0,.07)}
#pg-quote-icon{font-size:16px;line-height:1}
#pg-quote-author{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.8px;color:var(--c);flex:1}
#pg-quote-close{background:none;border:none;cursor:pointer;font-size:14px;color:#94a3b8;padding:2px 4px;border-radius:6px;transition:all .2s;line-height:1}
#pg-quote-close:hover{background:rgba(0,0,0,.06);color:#475569}
#pg-quote-text{font-style:italic;color:#334155;font-size:12.5px;line-height:1.55;word-break:break-word}
#pg-quote-typing{display:flex;gap:4px;align-items:center;padding:4px 0}
#pg-quote-typing span{width:6px;height:6px;border-radius:50%;background:var(--c);animation:pgdot 1.2s ease infinite;display:inline-block}
#pg-quote-typing span:nth-child(2){animation-delay:.2s}#pg-quote-typing span:nth-child(3){animation-delay:.4s}
#pg-quote-bubble::after{content:'';position:absolute;bottom:-10px;right:18px;border-width:10px 9px 0;border-style:solid;border-color:rgba(255,255,255,.96) transparent transparent;display:block;width:0;filter:drop-shadow(0 3px 3px rgba(0,0,0,.08))}
@keyframes pgfloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes pgpulse{0%{transform:scale(1);opacity:.35}100%{transform:scale(2.6);opacity:0}}
#pg-pulse{position:absolute;width:100%;height:100%;border-radius:50%;background:var(--c);animation:pgpulse 2.5s ease-out infinite}
#pg-win{position:fixed;bottom:100px;right:20px;width:440px;height:540px;max-height:70vh;max-width:calc(100vw-24px);background:rgba(255,255,255,.96);backdrop-filter:blur(20px);border-radius:22px;border:1px solid rgba(255,255,255,.4);box-shadow:0 20px 70px rgba(0,0,0,.22),0 0 45px var(--glow);display:flex;flex-direction:column;overflow:hidden;transform:scale(0) translateY(20px);transform-origin:bottom right;opacity:0;transition:all .45s cubic-bezier(.34,1.56,.64,1);pointer-events:none;z-index:99998}
#pg-win.open{transform:scale(1) translateY(0);opacity:1;pointer-events:auto}
#pg-hdr{background:linear-gradient(135deg,var(--c),color-mix(in srgb,var(--c) 75%,#000));color:#fff;padding:10px 12px;display:flex;align-items:center;gap:10px;flex-shrink:0;flex-wrap:wrap}
#pg-hdr-av{width:50px;height:50px;border-radius:50%;background:rgba(255,255,255,.15);border:2px solid rgba(255,255,255,.25);display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;cursor:pointer;transition:transform .2s}
#pg-hdr-av:hover{transform:scale(1.05)}
#pg-hdr-av svg{width:42px;height:42px}
#pg-hdr-info{flex:1;min-width:0}
#pg-hdr-name{font-weight:800;font-size:14px}
#pg-hdr-status{font-size:10px;opacity:.8;display:flex;align-items:center;gap:4px}
.pg-status-dot{width:6px;height:6px;border-radius:50%;background:#95A5A6;box-shadow:0 0 5px #95A5A6;flex-shrink:0}
.pg-hb{width:30px;height:30px;border-radius:50%;border:none;background:rgba(255,255,255,.12);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;transition:all .2s}
.pg-hb:hover{background:rgba(255,255,255,.28);transform:scale(1.1)}
#pg-panel{display:none;padding:12px 14px;background:linear-gradient(to bottom,var(--lt),transparent);border-bottom:1px solid rgba(0,0,0,.04);flex-shrink:0}
#pg-panel.show{display:block}
#pg-panel h4{font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:#64748B;margin-bottom:10px;text-align:center}
#pg-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:5px}
@media(max-width:380px){#pg-grid{grid-template-columns:repeat(3,1fr)}}
.pg-sc{display:flex;flex-direction:column;align-items:center;padding:10px 2px;border-radius:14px;border:2.5px solid transparent;cursor:pointer;transition:all .25s;background:rgba(255,255,255,.65)}
.pg-sc:hover{transform:translateY(-3px);box-shadow:0 6px 18px rgba(0,0,0,.1)}
.pg-sc.on{border-color:var(--c);background:var(--lt);box-shadow:0 3px 12px var(--glow)}
.pg-sc svg{width:48px;height:48px}
.pg-sc span{font-size:9.5px;font-weight:800;color:#555;margin-top:2px}
.pg-sc.on span{color:var(--c)}
#pg-msgs{flex:1;overflow-y:auto;padding:16px 12px;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth}
#pg-msgs::-webkit-scrollbar{width:4px}#pg-msgs::-webkit-scrollbar-thumb{background:rgba(0,0,0,.1);border-radius:8px}
.pg-m{max-width:88%;padding:10px 14px;font-size:13px;line-height:1.6;word-break:break-word;animation:pgm .3s ease-out}
@keyframes pgm{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.pg-mb{align-self:flex-start;background:#f4f5f7;color:#1a1a2e;border-radius:16px 16px 16px 4px}
.pg-mu{align-self:flex-end;background:linear-gradient(135deg,var(--c),color-mix(in srgb,var(--c) 80%,#000));color:#fff;border-radius:16px 16px 4px 16px;box-shadow:0 2px 12px var(--glow)}
.pg-mb strong{color:var(--c)}
.pg-mb code{background:rgba(0,0,0,.06);padding:1px 5px;border-radius:4px;font-size:12px;font-family:'Roboto Mono',monospace}
.pg-mb pre{background:#1e1e2e;color:#cdd6f4;padding:10px;border-radius:10px;overflow-x:auto;font-size:11.5px;margin:6px 0}
.pg-mb pre code{background:none;padding:0;color:inherit}
.pg-mb a{color:var(--c);text-decoration:underline}
.pg-typ{align-self:flex-start;display:flex;gap:5px;padding:13px 16px;background:#f4f5f7;border-radius:16px 16px 16px 4px}
.pg-typ span{width:7px;height:7px;border-radius:50%;background:var(--c);animation:pgdot 1.4s ease infinite}
.pg-typ span:nth-child(2){animation-delay:.2s}.pg-typ span:nth-child(3){animation-delay:.4s}
@keyframes pgdot{0%,60%,100%{transform:translateY(0);opacity:.35}30%{transform:translateY(-7px);opacity:1}}
#pg-sugg{display:flex;flex-wrap:wrap;gap:5px;padding:0 12px 8px;flex-shrink:0}
.pg-sg{padding:5px 11px;border-radius:18px;border:1.5px solid #e2e8f0;background:#fff;font-size:11px;font-family:inherit;color:#555;cursor:pointer;transition:all .2s;white-space:nowrap}
.pg-sg:hover{border-color:var(--c);color:var(--c);background:var(--lt);transform:translateY(-1px)}
#pg-inp{padding:10px 12px;border-top:1px solid rgba(0,0,0,.04);display:flex;gap:6px;align-items:flex-end;flex-shrink:0;flex-wrap:nowrap;overflow:visible}
#pg-ta{flex:1;border:2px solid #e2e8f0;border-radius:14px;padding:9px 13px;font-family:inherit;font-size:13px;resize:none;outline:none;min-height:40px;max-height:96px;line-height:1.4;transition:border-color .2s}
#pg-ta:focus{border-color:var(--c)}
#pg-send{width:40px;height:40px;border-radius:50%;border:none;background:var(--c);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;box-shadow:0 3px 12px var(--glow);transition:all .2s}
#pg-send:hover{transform:scale(1.08)}
/* Garantizar visibilidad de todos los botones de la fila de input */
#pg-mic-btn,#pg-img-btn,#pg-calc-btn{flex-shrink:0!important;display:flex!important}
#pg-send:disabled{opacity:.4;cursor:not-allowed;transform:none}
#pg-ov{display:none;position:absolute;inset:0;background:rgba(0,0,0,.45);backdrop-filter:blur(8px);z-index:10;align-items:center;justify-content:center;padding:16px}
#pg-ov.show{display:flex}
#pg-modal{background:#fff;border-radius:22px;padding:26px 22px;width:100%;max-width:320px;box-shadow:0 20px 60px rgba(0,0,0,.25);text-align:center}
#pg-modal h3{font-size:17px;font-weight:800;color:#1e293b;margin:6px 0 4px}
#pg-modal p{font-size:12px;color:#64748b;margin-bottom:16px;line-height:1.5}
#pg-modal a{color:var(--c);font-weight:700}
#pg-ki{width:100%;padding:12px;border:2px solid #e2e8f0;border-radius:12px;font-family:inherit;font-size:13px;outline:none;margin-bottom:14px;text-align:center;letter-spacing:.8px;transition:border-color .2s}
#pg-ki:focus{border-color:var(--c)}
.pg-btn{flex:1;padding:11px;border-radius:12px;border:none;font-family:inherit;font-size:12.5px;font-weight:700;cursor:pointer;transition:all .2s}
.pg-btn-p{background:var(--c);color:#fff;box-shadow:0 3px 12px var(--glow)}
.pg-btn-s{background:#f1f5f9;color:#555}
#pg-key-status{font-size:11px;margin-top:8px;font-weight:700;min-height:18px}
/* Post-its */
.pg-postit{position:fixed;width:230px;min-height:100px;padding:14px 12px 46px;border-radius:4px 4px 14px 4px;box-shadow:3px 3px 12px rgba(0,0,0,.15),-1px -1px 3px rgba(0,0,0,.03);font-family:'Nunito',sans-serif;font-size:12px;cursor:grab;z-index:99990;animation:pgPostItIn .4s ease-out;line-height:1.5}
.pg-postit:hover{transform:scale(1.02) rotate(-0.5deg)}
.pg-postit-yellow{background:linear-gradient(135deg,#fff740,#ffe066);color:#5a4e00}
.pg-postit-blue{background:linear-gradient(135deg,#7ec8e3,#a7d8ed);color:#0a3d5c}
.pg-postit-green{background:linear-gradient(135deg,#7ee8a5,#a7edbe);color:#0a5c2f}
.pg-postit-pink{background:linear-gradient(135deg,#ff9a9e,#fecfef);color:#5c0a1e}
.pg-postit-close{position:absolute;top:4px;right:8px;cursor:pointer;opacity:.5;font-size:16px;font-weight:800;background:none;border:none;color:inherit;font-family:inherit;line-height:1;padding:0;z-index:2}
.pg-postit-close:hover{opacity:1;transform:scale(1.2)}
.pg-postit-title{font-weight:800;font-size:10px;margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px;border-bottom:1px dashed rgba(0,0,0,.15);padding-bottom:4px;outline:none;cursor:text}
.pg-postit-content{font-size:12px;outline:none;cursor:text;min-height:40px;word-break:break-word}
.pg-postit-content:focus,.pg-postit-title:focus{background:rgba(255,255,255,.25);border-radius:4px;padding:2px 4px;margin:-2px -4px}
/* Toolbar de formato del post-it */
.pg-postit-toolbar{position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,.08);border-top:1px dashed rgba(0,0,0,.12);border-radius:0 0 14px 4px;display:flex;align-items:center;gap:2px;padding:4px 6px;flex-wrap:wrap}
.pg-pit-btn{width:22px;height:22px;border:none;border-radius:4px;background:rgba(0,0,0,.08);cursor:pointer;font-size:11px;font-family:'Nunito',sans-serif;font-weight:700;display:flex;align-items:center;justify-content:center;color:inherit;transition:background .15s;flex-shrink:0}
.pg-pit-btn:hover{background:rgba(0,0,0,.2)}
.pg-pit-sep{width:1px;height:16px;background:rgba(0,0,0,.15);margin:0 2px;flex-shrink:0}
.pg-pit-color{width:16px;height:16px;border-radius:50%;cursor:pointer;border:2px solid rgba(255,255,255,.6);flex-shrink:0;transition:transform .15s}
.pg-pit-color:hover{transform:scale(1.2)}
.pg-pit-color.active{border-color:rgba(0,0,0,.4);transform:scale(1.15)}
.pg-pit-fsize{font-size:9px;padding:0 4px;width:auto}
/* Modal nueva nota */
#pg-note-modal{position:fixed;inset:0;z-index:999999;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.45);backdrop-filter:blur(6px);padding:16px}
#pg-note-modal.show{display:flex}
#pg-note-box{background:#fff;border-radius:20px;padding:22px 20px;width:100%;max-width:340px;box-shadow:0 20px 60px rgba(0,0,0,.3);font-family:'Nunito',sans-serif}
#pg-note-box h3{margin:0 0 14px;font-size:16px;font-weight:800;color:#1e293b}
.pg-note-colors{display:flex;gap:8px;margin-bottom:12px}
.pg-note-color-btn{width:32px;height:32px;border-radius:50%;cursor:pointer;border:3px solid transparent;transition:all .2s;flex-shrink:0}
.pg-note-color-btn.sel{border-color:#333;transform:scale(1.15)}
#pg-note-title-inp{width:100%;padding:9px 12px;border:2px solid #e2e8f0;border-radius:10px;font-family:inherit;font-size:13px;outline:none;margin-bottom:10px;box-sizing:border-box;transition:border-color .2s}
#pg-note-title-inp:focus{border-color:#6366f1}
/* Toolbar de formato del modal */
#pg-note-fmt-bar{display:flex;gap:4px;margin-bottom:6px;flex-wrap:wrap;align-items:center}
.pg-nf-btn{padding:4px 8px;border:1.5px solid #e2e8f0;border-radius:6px;background:#f8fafc;cursor:pointer;font-size:11px;font-family:inherit;font-weight:700;color:#475569;transition:all .15s;display:flex;align-items:center;gap:3px}
.pg-nf-btn:hover{border-color:#6366f1;color:#6366f1;background:#eef2ff}
.pg-nf-btn.active{background:#6366f1;color:#fff;border-color:#6366f1}
#pg-note-content-inp{width:100%;min-height:80px;padding:9px 12px;border:2px solid #e2e8f0;border-radius:10px;font-family:inherit;font-size:13px;outline:none;resize:vertical;box-sizing:border-box;line-height:1.5;transition:border-color .2s}
#pg-note-content-inp:focus{border-color:#6366f1}
.pg-note-btns{display:flex;gap:8px;margin-top:14px}
.pg-note-btns button{flex:1;padding:10px;border-radius:10px;border:none;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s}
.pg-note-cancel{background:#f1f5f9;color:#555}
.pg-note-save{background:#6366f1;color:#fff;box-shadow:0 3px 12px rgba(99,102,241,.35)}
.pg-note-save:hover{background:#4f46e5}
#pg-new-note-btn{position:absolute;top:-8px;left:-2px;width:24px;height:24px;border-radius:50%;background:#fff;border:2px solid rgba(255,255,255,.9);color:var(--c);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:12px;box-shadow:0 2px 8px rgba(0,0,0,.15);transition:all .2s;z-index:2}
#pg-new-note-btn:hover{transform:scale(1.15);background:var(--c);color:#fff}
@keyframes pgPostItIn{from{transform:scale(0) rotate(-10deg);opacity:0}to{transform:scale(1) rotate(0);opacity:1}}
@media(max-width:480px){
#pg-win{width:calc(100% - 16px);max-width:380px;height:75vh;max-height:80vh;border-radius:18px;bottom:12px;right:8px;left:auto}
#pg-hdr{padding:8px;gap:5px;flex-wrap:nowrap}
#pg-hdr-av{width:38px;height:38px}
#pg-hdr-av svg{width:32px;height:32px}
#pg-hdr-info{flex:1;min-width:0;overflow:hidden}
#pg-hdr-name{font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#pg-hdr-status{font-size:9px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#pg-bubble{width:62px;height:62px}
#pg-bubble-svg-wrap svg,#pg-bubble>svg{width:44px!important;height:44px!important;max-width:44px!important;max-height:44px!important}
.pg-postit{width:185px;min-height:80px;font-size:11px}
#pg-inp{gap:5px;padding:8px 10px}
#pg-img-btn,#pg-calc-btn,#pg-mic-btn{width:32px;height:32px;font-size:13px;flex-shrink:0}
#pg-send{width:36px;height:36px;font-size:13px;flex-shrink:0}
#pg-ta{font-size:12px;min-height:36px;padding:7px 10px}
.pg-hb{width:24px;height:24px;font-size:10px;padding:0;margin:0}
}
.dark #pg-win,[data-theme="dark"] #pg-win{background:rgba(30,30,46,.96)}.dark .pg-mb,[data-theme="dark"] .pg-mb{background:#2a2a3e;color:#e0e0e0}.dark #pg-ta,[data-theme="dark"] #pg-ta{background:#1e1e2e;border-color:#3a3a4e;color:#e0e0e0}.dark #pg-modal,[data-theme="dark"] #pg-modal{background:#1e1e2e}.dark #pg-modal h3,[data-theme="dark"] #pg-modal h3{color:#e0e0e0}.dark .pg-sc,[data-theme="dark"] .pg-sc{background:rgba(255,255,255,.05)}.dark .pg-sg,[data-theme="dark"] .pg-sg{background:#2a2a3e;border-color:#3a3a4e;color:#cbd5e1}
.dark .pg-postit-yellow,[data-theme="dark"] .pg-postit-yellow{background:linear-gradient(135deg,#b5a000,#8a7800);color:#fff}
.dark .pg-postit-blue,[data-theme="dark"] .pg-postit-blue{background:linear-gradient(135deg,#1a6985,#0e4a60);color:#e0f7fa}
.dark .pg-postit-green,[data-theme="dark"] .pg-postit-green{background:linear-gradient(135deg,#1a7a42,#0e5c2f);color:#e8f5e9}
.dark .pg-postit-pink,[data-theme="dark"] .pg-postit-pink{background:linear-gradient(135deg,#8e2240,#6a1830);color:#fce4ec}
.dark #pg-quote-bubble,[data-theme="dark"] #pg-quote-bubble{background:#2a2a3e;color:#e0e0e0}
.dark #pg-quote-bubble::after,[data-theme="dark"] #pg-quote-bubble::after{border-color:#2a2a3e transparent transparent}
/* ═══ SUPERPODER: VOZ ═══ */
.pg-speak-btn{position:absolute;bottom:4px;right:6px;width:22px;height:22px;border-radius:50%;border:none;background:transparent;color:var(--c);cursor:pointer;font-size:13px;display:flex;align-items:center;justify-content:center;opacity:.55;transition:all .2s;padding:0;line-height:1}
.pg-speak-btn:hover{opacity:1;transform:scale(1.15)}
.pg-speak-btn.speaking{color:#e74c3c;opacity:1;animation:pgspk .7s ease-in-out infinite alternate}
@keyframes pgspk{from{transform:scale(1)}to{transform:scale(1.25)}}
.pg-mb{position:relative;padding-bottom:20px!important}
/* ═══ SUPERPODER: MICRÓFONO (SPEECH-TO-TEXT) ═══ */
#pg-mic-btn{width:36px;height:36px;border-radius:50%;border:2px solid #e2e8f0;background:#fff;color:#64748b;cursor:pointer;display:flex!important;align-items:center;justify-content:center;font-size:15px;flex-shrink:0!important;transition:all .2s;min-width:36px}
#pg-mic-btn:hover{border-color:var(--c);color:var(--c);background:var(--lt);transform:scale(1.08)}
#pg-mic-btn.pg-mic-active{border-color:#ef4444;color:#ef4444;background:#fee2e2;animation:pgMicPulse 1.2s ease-in-out infinite}
#pg-mic-btn.pg-mic-hidden{display:none!important}
@keyframes pgMicPulse{0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,.3)}50%{box-shadow:0 0 0 8px rgba(239,68,68,0)}}
.dark #pg-mic-btn,[data-theme="dark"] #pg-mic-btn{background:#2a2a3e;border-color:#3a3a4e;color:#cbd5e1}
.dark #pg-mic-btn.pg-mic-active,[data-theme="dark"] #pg-mic-btn.pg-mic-active{background:#451a1a;border-color:#ef4444;color:#fca5a5}
/* ═══ SUPERPODER: FOTO OCR ═══ */
#pg-img-btn{width:36px;height:36px;border-radius:50%;border:2px solid #e2e8f0;background:#fff;color:#64748b;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;transition:all .2s}
#pg-img-btn:hover{border-color:var(--c);color:var(--c);background:var(--lt);transform:scale(1.08)}
#pg-img-preview{display:none;align-items:center;gap:8px;padding:6px 12px;border-top:1px solid rgba(0,0,0,.04);background:rgba(99,102,241,.04);flex-shrink:0}
#pg-img-preview.show{display:flex}
#pg-img-thumb{width:52px;height:52px;border-radius:10px;object-fit:cover;border:2px solid rgba(99,102,241,.3)}
#pg-img-preview-info{flex:1;font-size:11px;color:#64748b;line-height:1.4}
#pg-img-preview-info strong{display:block;color:#334155;font-size:12px}
#pg-img-remove{width:22px;height:22px;border-radius:50%;border:none;background:#fee2e2;color:#ef4444;cursor:pointer;font-size:12px;display:flex;align-items:center;justify-content:center;transition:all .2s}
#pg-img-remove:hover{background:#fca5a5;transform:scale(1.1)}
.pg-msg-img{max-width:100%;border-radius:10px;margin-bottom:6px;display:block;border:1px solid rgba(0,0,0,.08)}
/* ═══ SUPERPODER: CALCULADORA ═══ */
#pg-calc-btn{width:36px;height:36px;border-radius:50%;border:2px solid #e2e8f0;background:#fff;color:#64748b;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;transition:all .2s}
#pg-calc-btn:hover{border-color:var(--c);color:var(--c);background:var(--lt);transform:scale(1.08)}
#pg-calc-panel{position:fixed;bottom:0;right:0;width:340px;max-width:100vw;max-height:80vh;background:#fff;border-radius:20px 20px 0 0;box-shadow:0 -10px 40px rgba(0,0,0,.15);z-index:999997;transform:scale(0.9) translateY(20px);opacity:0;pointer-events:none;transition:all .4s cubic-bezier(.34,1.56,.64,1);overflow:hidden;display:flex;flex-direction:column;font-family:'Nunito',sans-serif}
#pg-calc-panel.open{transform:scale(1) translateY(0);opacity:1;pointer-events:auto}
#pg-hdr, #pg-calc-hdr{cursor:grab}
#pg-hdr:active, #pg-calc-hdr:active{cursor:grabbing}
#pg-calc-hdr{background:linear-gradient(135deg,var(--c),color-mix(in srgb,var(--c) 75%,#000));color:#fff;padding:14px 16px;display:flex;align-items:center;gap:10px;flex-shrink:0}
#pg-calc-hdr h3{flex:1;margin:0;font-size:15px;font-weight:800}
#pg-calc-close{width:28px;height:28px;border-radius:50%;border:none;background:rgba(255,255,255,.15);color:#fff;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:all .2s}
#pg-calc-close:hover{background:rgba(255,255,255,.3)}
#pg-calc-tabs{display:flex;gap:4px;padding:10px 12px;border-bottom:1px solid #f1f5f9;overflow-x:auto;flex-shrink:0;scrollbar-width:none}
#pg-calc-tabs::-webkit-scrollbar{display:none}
.pg-calc-tab{padding:6px 12px;border-radius:20px;border:1.5px solid #e2e8f0;background:#fff;font-family:inherit;font-size:11px;font-weight:700;color:#64748b;cursor:pointer;white-space:nowrap;transition:all .2s;flex-shrink:0}
.pg-calc-tab.on{background:var(--c);border-color:var(--c);color:#fff}
#pg-calc-body{flex:1;overflow-y:auto;padding:14px 14px}
.pg-calc-formula-list{display:flex;flex-direction:column;gap:6px;margin-bottom:12px}
.pg-calc-fl-item{padding:10px 14px;border-radius:12px;border:1.5px solid #e2e8f0;background:#f8fafc;cursor:pointer;font-size:12px;font-weight:700;color:#334155;transition:all .2s;display:flex;align-items:center;gap:8px}
.pg-calc-fl-item:hover,.pg-calc-fl-item.sel{border-color:var(--c);background:var(--lt);color:var(--c)}
.pg-calc-fl-icon{font-size:16px;flex-shrink:0}
#pg-calc-form{display:none;flex-direction:column;gap:8px}
#pg-calc-form.show{display:flex}
.pg-calc-back{padding:6px 12px;border-radius:20px;border:1.5px solid var(--c);background:transparent;color:var(--c);font-family:inherit;font-size:11px;font-weight:700;cursor:pointer;align-self:flex-start;margin-bottom:4px;transition:all .2s}
.pg-calc-back:hover{background:var(--c);color:#fff}
#pg-calc-formula-display{background:linear-gradient(135deg,var(--lt),#fff);border:1.5px solid var(--c);border-radius:12px;padding:12px;text-align:center;font-size:13px;color:var(--c);font-weight:700;margin-bottom:4px}
.pg-calc-field{display:flex;flex-direction:column;gap:3px}
.pg-calc-field label{font-size:11px;font-weight:700;color:#64748b;display:flex;justify-content:space-between}
.pg-calc-field label span{color:#94a3b8;font-weight:400}
.pg-calc-field input{padding:8px 12px;border:2px solid #e2e8f0;border-radius:10px;font-family:inherit;font-size:13px;outline:none;transition:border-color .2s}
.pg-calc-field input:focus{border-color:var(--c)}
#pg-calc-result{display:none;background:linear-gradient(135deg,#f0fdf4,#dcfce7);border:2px solid #16a34a;border-radius:14px;padding:14px;text-align:center;margin-top:4px}
#pg-calc-result.show{display:block}
#pg-calc-result-val{font-size:22px;font-weight:800;color:#15803d}
#pg-calc-result-unit{font-size:12px;color:#16a34a;margin-top:2px}
.pg-calc-btns{display:flex;gap:8px;margin-top:6px}
.pg-calc-btn-main{flex:1;padding:11px;border-radius:12px;border:none;font-family:inherit;font-size:12.5px;font-weight:700;cursor:pointer;transition:all .2s;background:var(--c);color:#fff;box-shadow:0 3px 12px var(--glow)}
.pg-calc-btn-main:hover{filter:brightness(1.1)}
.pg-calc-btn-sec{flex:1;padding:11px;border-radius:12px;border:1.5px solid var(--c);background:transparent;color:var(--c);font-family:inherit;font-size:12.5px;font-weight:700;cursor:pointer;transition:all .2s}
.dark #pg-calc-panel,[data-theme="dark"] #pg-calc-panel{background:#1e1e2e}
.dark .pg-calc-fl-item,[data-theme="dark"] .pg-calc-fl-item{background:#2a2a3e;border-color:#3a3a4e;color:#e0e0e0}
.dark .pg-calc-field input,[data-theme="dark"] .pg-calc-field input{background:#2a2a3e;border-color:#3a3a4e;color:#e0e0e0}
.dark #pg-img-btn,[data-theme="dark"] #pg-img-btn,.dark #pg-calc-btn,[data-theme="dark"] #pg-calc-btn{background:#2a2a3e;border-color:#3a3a4e;color:#cbd5e1}
#pg-resize-handle{position:absolute;bottom:0;right:0;width:26px;height:26px;cursor:nwse-resize;z-index:99999}
#pg-resize-handle::after{content:'';position:absolute;right:6px;bottom:6px;width:10px;height:10px;background:radial-gradient(circle,var(--c) 25%,transparent 30%) 0 0,radial-gradient(circle,var(--c) 25%,transparent 30%) 5px 0,radial-gradient(circle,var(--c) 25%,transparent 30%) 0 5px,radial-gradient(circle,var(--c) 25%,transparent 30%) 5px 5px;background-size:5px 5px;background-repeat:no-repeat;opacity:.5;transition:opacity .2s}
#pg-resize-handle:hover::after{opacity:1}
`;

    document.head.appendChild(s);
}

// ═══ BUILD DOM ═══
function build(){
    if(document.getElementById('pg-root'))return;
    const sc=SCIENTISTS[currentSci];
    const root=document.createElement('div');root.id='pg-root';
    root.innerHTML=`
<div id="pg-bubble"><div id="pg-pulse"></div><button id="pg-new-note-btn" title="Nueva nota"><i class="fa-solid fa-plus"></i></button><div id="pg-bubble-svg-wrap">${sc.svg}</div><div id="pg-badge"><div id="pg-badge-sim"></div><div id="pg-badge-num">1 MSG</div></div><div id="pg-quote-bubble" class="hide"><div id="pg-quote-header"><span id="pg-quote-icon">💡</span><span id="pg-quote-author">${sc.name}</span><button id="pg-quote-close" title="Cerrar">✕</button></div><div id="pg-quote-typing"><span></span><span></span><span></span></div><div id="pg-quote-text"></div></div></div>
<div id="pg-win">
<div id="pg-hdr"><div id="pg-hdr-av" title="Minimizar chat">${sc.svg}</div><div id="pg-hdr-info"><div id="pg-hdr-name">${sc.full}</div><div id="pg-hdr-status"><span class="pg-status-dot"></span>Tutor de Física y Matemáticas IA</div></div>
<button class="pg-hb" id="pg-btn-tts" title="Voz: Desactivada"><i class="fa-solid fa-volume-xmark"></i></button>
<button class="pg-hb" id="pg-btn-note-in" title="Crear Nota (Post-it)"><i class="fa-solid fa-note-sticky"></i></button>
<button class="pg-hb" id="pg-btn-summary" title="Resumir conversación"><i class="fa-solid fa-file-lines"></i></button>
<button class="pg-hb" id="pg-btn-kb" title="Alternar Teclado Móvil"><i class="fa-solid fa-keyboard"></i></button>
<button class="pg-hb" id="pg-btn-pdf" title="Exportar PDF"><i class="fa-solid fa-file-pdf"></i></button>
<button class="pg-hb" id="pg-btn-sci" title="Cambiar personaje"><i class="fa-solid fa-users"></i></button>
<button class="pg-hb" id="pg-btn-key" title="API Key"><i class="fa-solid fa-key"></i></button>
<button class="pg-hb" id="pg-btn-x" title="Cerrar"><i class="fa-solid fa-xmark"></i></button></div>
<div id="pg-panel"><h4>Elige tu mentor científico</h4><div id="pg-grid"></div></div>
<div id="pg-msgs"></div>
<div id="pg-sugg"></div>
<div id="pg-img-preview"><img id="pg-img-thumb" src="" alt=""><div id="pg-img-preview-info"><strong>Imagen lista</strong>Gemini analizará el problema</div><button id="pg-img-remove" title="Quitar imagen">✕</button></div>
<div id="pg-inp"><textarea id="pg-ta" placeholder="Escribe tu pregunta..." rows="1"></textarea><button id="pg-mic-btn" title="Dictar por voz"><i class="fa-solid fa-microphone"></i></button><button id="pg-img-btn" title="Foto del problema"><i class="fa-solid fa-camera"></i></button><button id="pg-calc-btn" title="Calculadora de fórmulas"><i class="fa-solid fa-calculator"></i></button><button id="pg-send" title="Enviar"><i class="fa-solid fa-paper-plane"></i></button></div>
<div id="pg-ov"><div id="pg-modal"><div style="font-size:36px;margin-bottom:6px">⚙️</div><h3 style="margin-bottom:12px">Configuración</h3><p style="text-align:left;margin-bottom:4px"><strong>API Key (Gemini)</strong> <a href="https://aistudio.google.com/apikey" target="_blank" style="float:right;font-size:10px">Obtener gratis</a></p><input id="pg-ki" type="password" placeholder="AIzaSy..."/> <div id="pg-key-status"></div><p style="text-align:left;margin:12px 0 4px"><strong>Voz del Tutor</strong></p><select id="pg-voice-sel" style="width:100%;padding:10px;border:2px solid #e2e8f0;border-radius:10px;font-family:inherit;font-size:12px;outline:none;margin-bottom:18px"><option value="">Cargando voces...</option></select><div style="display:flex;gap:8px"><button class="pg-btn pg-btn-s" id="pg-kc">Cancelar</button><button class="pg-btn pg-btn-p" id="pg-ks">Guardar</button></div></div></div>
<div id="pg-resize-handle" title="Ajustar tamaño"></div>
</div>
<div id="pg-note-modal"><div id="pg-note-box"><h3>📌 Nueva Nota</h3><div class="pg-note-colors"><div class="pg-note-color-btn sel" data-nc="amarillo" style="background:linear-gradient(135deg,#fff740,#ffe066)" title="Amarillo"></div><div class="pg-note-color-btn" data-nc="azul" style="background:linear-gradient(135deg,#7ec8e3,#a7d8ed)" title="Azul"></div><div class="pg-note-color-btn" data-nc="verde" style="background:linear-gradient(135deg,#7ee8a5,#a7edbe)" title="Verde"></div><div class="pg-note-color-btn" data-nc="rosa" style="background:linear-gradient(135deg,#ff9a9e,#fecfef)" title="Rosa"></div></div><input id="pg-note-title-inp" type="text" placeholder="Título (ej: Leyes de Newton)"/><div id="pg-note-fmt-bar"><button class="pg-nf-btn" data-cmd="bold" title="Negrita"><b>N</b></button><button class="pg-nf-btn" data-cmd="italic" title="Cursiva"><i>K</i></button><button class="pg-nf-btn" data-cmd="underline" title="Subrayado"><u>S</u></button><span style="width:1px;height:18px;background:#e2e8f0;margin:0 2px;display:inline-block"></span><button class="pg-nf-btn pg-nf-size" data-size="11px" title="Pequeño">A<sub>p</sub></button><button class="pg-nf-btn pg-nf-size" data-size="13px" title="Normal">A</button><button class="pg-nf-btn pg-nf-size" data-size="16px" title="Grande"><b>A</b></button><span style="width:1px;height:18px;background:#e2e8f0;margin:0 2px;display:inline-block"></span><input type="color" id="pg-note-txtcolor" value="#333333" title="Color de texto" style="width:24px;height:24px;border:none;border-radius:4px;cursor:pointer;padding:0"><label for="pg-note-txtcolor" style="font-size:10px;color:#666">Color</label></div><div id="pg-note-content-inp" contenteditable="true" style="width:100%;min-height:80px;padding:9px 12px;border:2px solid #e2e8f0;border-radius:10px;font-size:13px;outline:none;box-sizing:border-box;line-height:1.5;font-family:'Nunito',sans-serif" data-placeholder="Escribe el contenido de tu nota..."></div><div class="pg-note-btns"><button class="pg-note-cancel" id="pg-note-cancel">Cancelar</button><button class="pg-note-save" id="pg-note-save">💾 Guardar Nota</button></div></div></div>`;
    document.body.appendChild(root);
    // Panel calculadora (separado del root, al final del body)
    if(!document.getElementById('pg-calc-panel')){
        const calcPanel=document.createElement('div');calcPanel.id='pg-calc-panel';
        calcPanel.innerHTML=`<div id="pg-calc-hdr"><span style="font-size:20px">🧮</span><h3>Calculadora de Fórmulas</h3><button id="pg-calc-close"><i class="fa-solid fa-xmark"></i></button></div><div id="pg-calc-tabs"></div><div id="pg-calc-body"><div id="pg-calc-list" class="pg-calc-formula-list"></div><div id="pg-calc-form"><button class="pg-calc-back" id="pg-calc-back">← Volver</button><div id="pg-calc-formula-display"></div><div id="pg-calc-fields"></div><div id="pg-calc-result"><div id="pg-calc-result-val"></div><div id="pg-calc-result-unit"></div></div><div class="pg-calc-btns"><button class="pg-calc-btn-main" id="pg-calc-compute">Calcular</button><button class="pg-calc-btn-sec" id="pg-calc-chat">📤 Enviar al chat</button></div></div></div>`;
        document.body.appendChild(calcPanel);
    }
    // Input file oculto para fotos
    if(!document.getElementById('pg-img-input')){
        const fi=document.createElement('input');fi.type='file';fi.id='pg-img-input';fi.accept='image/*';fi.style.display='none';
        document.body.appendChild(fi);
    }
    // Contenedor de post-its (fuera del chat, sobre la página)
    if(!document.getElementById('pg-postit-container')){
        const pc=document.createElement('div');pc.id='pg-postit-container';
        document.body.appendChild(pc);
    }
    buildCards();
    renderSugg();
}

function buildCards(){
    const g=document.getElementById('pg-grid');g.innerHTML='';
    Object.entries(SCIENTISTS).forEach(([k,sc])=>{
        const d=document.createElement('div');
        d.className='pg-sc'+(k===currentSci?' on':'');
        d.dataset.k=k;
        d.innerHTML=sc.svg+'<span>'+sc.name+'</span>';
        d.addEventListener('click',()=>pickSci(k));
        g.appendChild(d);
    });
}

function renderSugg(){
    const c=document.getElementById('pg-sugg');
    if(!c) return;
    c.innerHTML='';
    // Detectar contexto del recurso actualmente cargado
    let ctx='default';
    if(typeof _currentLoadedItem!=='undefined'&&_currentLoadedItem){
        const title=(_currentLoadedItem.title||'').toLowerCase();
        if(title.includes('cinem')||title.includes('mru'))ctx='cinematica';
        else if(title.includes('dinam')||title.includes('newton')||title.includes('energ'))ctx='dinamica';
        else if(title.includes('onda')||title.includes('interfer'))ctx='ondas';
        else if(title.includes('sonido')||title.includes('doppler')||title.includes('tubo'))ctx='sonido';
        else if(title.includes('vector'))ctx='vectores';
    }
    const pool=CONTEXT_SUGGESTIONS[ctx]||CONTEXT_SUGGESTIONS.default;
    const shuffled=[...pool].sort(()=>Math.random()-.5).slice(0,5);
    shuffled.forEach(s=>{
        const b=document.createElement('button');b.className='pg-sg';b.textContent=s;
        b.addEventListener('click',()=>{document.getElementById('pg-ta').value=s;handleSend();c.style.display='none'});
        c.appendChild(b);
    });
}

function updateColors(){
    const sc=SCIENTISTS[currentSci],r=document.getElementById('pg-root');
    r.style.setProperty('--c',sc.color);r.style.setProperty('--lt',sc.lt);r.style.setProperty('--glow',sc.glow);
}

function pickSci(k){
    currentSci=k;localStorage.setItem(STORAGE_SCI,k);
    const sc=SCIENTISTS[k];
    updateColors();
    document.getElementById('pg-hdr-av').innerHTML=sc.svg;
    document.getElementById('pg-hdr-name').textContent=sc.full;
    // Actualizar SVG dentro del wrapper (evitar flash gigante)
    const svgWrap=document.getElementById('pg-bubble-svg-wrap');
    if(svgWrap){ svgWrap.innerHTML=sc.svg; }
    else { const b=document.getElementById('pg-bubble');b.querySelectorAll('svg').forEach(s=>s.remove());b.insertAdjacentHTML('beforeend',sc.svg); }
    document.querySelectorAll('.pg-sc').forEach(c=>c.classList.toggle('on',c.dataset.k===k));
    chatHistory=[];document.getElementById('pg-msgs').innerHTML='';
    addMsg('b',sc.hi);
    document.getElementById('pg-panel').classList.remove('show');
    document.getElementById('pg-sugg').style.display='flex';
    renderSugg();
    if(!isOpen) startSpontaneousQuotes();
}

// ═══ POST-ITS CON EDITOR ENRIQUECIDO ═══
function createPostIt(color, title, content, posLeft, posTop){
    // ── Bridge al Post-It Manager Premium (si está cargado) ──
    try {
        if(window.PostItManager && typeof PostItManager.create === 'function'){
            const colorBridge = {
                'amarillo':'yellow','azul':'blue','verde':'green','rosa':'pink',
                'naranja':'orange','morado':'purple','cyan':'cyan','rojo':'red'
            };
            const pmColor = colorBridge[color] || color || 'yellow';
            let htmlContent = content;
            if(typeof renderMD === 'function' && content) htmlContent = renderMD(content);
            PostItManager.create({
                color: pmColor, title: title || 'Nota del Tutor',
                content: htmlContent,
                left: posLeft || (Math.random() * (window.innerWidth - 320) + 10),
                top: posTop || (Math.random() * (window.innerHeight - 280) + 10),
                width: 300, height: 220, source: 'chatbot'
            });
            return; // éxito con PostItManager externo
        }
    } catch(e) {
        console.warn('🗒️ PostItManager externo falló, usando sistema interno:', e);
    }
    // ── Fallback: sistema de post-its original ──
    const container = document.getElementById('pg-postit-container');
    if(!container) return;
    const existing = container.querySelectorAll('.pg-postit');
    if(existing.length >= MAX_POSTITS) existing[0].remove();
    const id = 'pg-pit-'+(++postItCounter);
    const colorMap = {amarillo:'pg-postit-yellow',azul:'pg-postit-blue',verde:'pg-postit-green',rosa:'pg-postit-pink'};
    const cls = colorMap[color]||'pg-postit-yellow';
    const div = document.createElement('div');
    div.id=id; div.className='pg-postit '+cls; div.dataset.color=color||'amarillo';
    div.style.top = posTop||(80+Math.random()*150)+'px';
    div.style.left = posLeft||(50+Math.random()*200)+'px';
    // Toolbar de formato (negrita, cursiva, subrayado, tamaño, color texto, cambiar color post-it)
    div.innerHTML=`
<button class="pg-postit-close" onclick="this.parentElement.remove();window._pgSavePostIts()" title="Cerrar">✕</button>
<div class="pg-postit-title" contenteditable="true" spellcheck="false">${title||'Sin título'}</div>
<div class="pg-postit-content" contenteditable="true" spellcheck="false">${content||''}</div>
<div class="pg-postit-toolbar">
  <button class="pg-pit-btn" data-cmd="bold" title="Negrita"><b>N</b></button>
  <button class="pg-pit-btn" data-cmd="italic" title="Cursiva"><i>K</i></button>
  <button class="pg-pit-btn" data-cmd="underline" title="Subrayado"><u>S</u></button>
  <div class="pg-pit-sep"></div>
  <button class="pg-pit-btn pg-pit-fsize" data-size="10px" title="Pequeño">A-</button>
  <button class="pg-pit-btn pg-pit-fsize" data-size="12px" title="Normal">A</button>
  <button class="pg-pit-btn pg-pit-fsize" data-size="15px" title="Grande"><b>A+</b></button>
  <div class="pg-pit-sep"></div>
  <div class="pg-pit-color" style="background:#d63031" data-nc="rosa" title="Rosa" onclick="window._pgChangePostItColor(this,'rosa')"></div>
  <div class="pg-pit-color" style="background:#0984e3" data-nc="azul" title="Azul" onclick="window._pgChangePostItColor(this,'azul')"></div>
  <div class="pg-pit-color" style="background:#00b894" data-nc="verde" title="Verde" onclick="window._pgChangePostItColor(this,'verde')"></div>
  <div class="pg-pit-color" style="background:#fdcb6e" data-nc="amarillo" title="Amarillo" onclick="window._pgChangePostItColor(this,'amarillo')"></div>
  <div class="pg-pit-sep"></div>
  <input type="color" class="pg-pit-btn" title="Color texto" value="#333333" style="width:18px;height:18px;padding:0;border:none;background:none;cursor:pointer" oninput="window._pgApplyTextColor(this)">
</div>`;
    // Eventos de toolbar
    div.querySelectorAll('.pg-pit-btn[data-cmd]').forEach(btn=>{
        btn.addEventListener('mousedown', e=>{
            e.preventDefault();
            document.execCommand(btn.dataset.cmd, false, null);
            savePostIts();
        });
    });
    div.querySelectorAll('.pg-pit-btn[data-size]').forEach(btn=>{
        btn.addEventListener('mousedown', e=>{
            e.preventDefault();
            document.execCommand('fontSize', false, '7');
            const fontEls = div.querySelectorAll('font[size="7"]');
            fontEls.forEach(f=>{ f.removeAttribute('size'); f.style.fontSize = btn.dataset.size; });
            savePostIts();
        });
    });
    // Guardar al editar
    div.querySelector('.pg-postit-title').addEventListener('input', ()=>savePostIts());
    div.querySelector('.pg-postit-content').addEventListener('input', ()=>savePostIts());
    // Drag
    div.addEventListener('mousedown',e=>{ if(!e.target.closest('.pg-postit-toolbar') && !e.target.closest('.pg-postit-close') && !e.target.isContentEditable) postItDragStart(e,div); });
    div.addEventListener('touchstart',e=>{ if(!e.target.closest('.pg-postit-toolbar') && !e.target.closest('.pg-postit-close')) postItDragStart(e,div); },{passive:true});
    container.appendChild(div);
    savePostIts();
    // Renderizar MathJax si disponible
    if(window.MathJax&&MathJax.typesetPromise) MathJax.typesetPromise([div]).catch(()=>{});
}
window._pgSavePostIts = function(){ savePostIts(); };
// Cambiar color del post-it desde la toolbar
window._pgChangePostItColor = function(btn, nc){
    const pit = btn.closest('.pg-postit');
    if(!pit) return;
    const colorMap = {amarillo:'pg-postit-yellow',azul:'pg-postit-blue',verde:'pg-postit-green',rosa:'pg-postit-pink'};
    pit.className = 'pg-postit ' + (colorMap[nc]||'pg-postit-yellow');
    pit.dataset.color = nc;
    savePostIts();
};
// Aplicar color de texto desde el input color de la toolbar
window._pgApplyTextColor = function(inp){
    const content = inp.closest('.pg-postit')?.querySelector('.pg-postit-content');
    if(content) content.style.color = inp.value;
    savePostIts();
};


function postItDragStart(e,el){
    if(e.target.classList.contains('pg-postit-close'))return;
    const touch=e.touches?e.touches[0]:e;
    activePostIt=el;
    postItDragData={startX:touch.clientX,startY:touch.clientY,startLeft:el.offsetLeft,startTop:el.offsetTop};
    el.style.cursor='grabbing';el.style.zIndex='99995';
    if(e.preventDefault&&!e.touches) e.preventDefault();
}
function postItDragMove(e){
    if(!activePostIt)return;
    const touch=e.touches?e.touches[0]:e;
    activePostIt.style.left=(postItDragData.startLeft+touch.clientX-postItDragData.startX)+'px';
    activePostIt.style.top=(postItDragData.startTop+touch.clientY-postItDragData.startY)+'px';
}
function postItDragEnd(){
    if(!activePostIt)return;
    activePostIt.style.cursor='grab';activePostIt.style.zIndex='99990';
    activePostIt=null; savePostIts();
}
function initPostItDrag(){
    document.addEventListener('mousemove',postItDragMove);
    document.addEventListener('mouseup',postItDragEnd);
    document.addEventListener('touchmove',postItDragMove,{passive:true});
    document.addEventListener('touchend',postItDragEnd);
}
function savePostIts(){
    const c=document.getElementById('pg-postit-container');if(!c) return;
    const arr=[];
    c.querySelectorAll('.pg-postit').forEach(p=>{
        const titleEl=p.querySelector('.pg-postit-title');
        const contentEl=p.querySelector('.pg-postit-content');
        arr.push({
            color:p.dataset.color||'amarillo',
            title:titleEl?titleEl.innerHTML:'',
            content:contentEl?contentEl.innerHTML:'',
            left:p.style.left,
            top:p.style.top
        });
    });
    try{localStorage.setItem(STORAGE_POSTITS,JSON.stringify(arr))}catch(e){}
}
function loadPostIts(){
    try{
        const saved=JSON.parse(localStorage.getItem(STORAGE_POSTITS));
        if(saved&&Array.isArray(saved)) saved.forEach(p=>createPostIt(p.color,p.title,p.content,p.left,p.top));
    }catch(e){}
}

// ═══ MENSAJES ═══
function addMsg(role,text){
    const c=document.getElementById('pg-msgs'),d=document.createElement('div');
    d.className='pg-m '+(role==='b'?'pg-mb':'pg-mu');
    if(role==='b'){
        // Detectar comando [ABRIR_APP:url:titulo]
        const appMatch=text.match(/\[ABRIR_APP:([^:]+):([^\]]+)\]/);
        // Detectar comando [POST_IT:color:titulo:contenido] — soporta MÚLTIPLES
        const postItMatches=[...text.matchAll(/\[POST_IT:([^:]+):([^:]+):([^\]]+)\]/g)];
        let cleanText=text.replace(/\[ABRIR_APP:[^\]]+\]/g,'').replace(/\[POST_IT:[^\]]+\]/g,'').trim();
        d.innerHTML=renderMD(cleanText);
        if(appMatch){
            const appUrl=appMatch[1].trim(), appTitle=appMatch[2].trim();
            const btnWrap=document.createElement('div');
            btnWrap.style.cssText='margin-top:10px;display:flex;gap:6px;flex-wrap:wrap';
            const btnOpen=document.createElement('button');
            btnOpen.style.cssText='display:inline-flex;align-items:center;gap:5px;padding:7px 14px;border-radius:10px;border:none;background:var(--c);color:#fff;font-family:inherit;font-size:11.5px;font-weight:700;cursor:pointer;box-shadow:0 2px 10px var(--glow);transition:all .2s';
            btnOpen.innerHTML='<i class="fa-solid fa-play"></i> Abrir: '+appTitle;
            btnOpen.onclick=()=>{if(typeof loadContent==='function'){const item={t:appUrl.endsWith('.ggb')?'ggb':'html',title:appTitle,url:appUrl,icon:'fa-solid fa-rocket',lvl:'Interactivo'};loadContent(item,null)}};
            const btnFull=document.createElement('button');
            btnFull.style.cssText='display:inline-flex;align-items:center;gap:5px;padding:7px 14px;border-radius:10px;border:1.5px solid var(--c);background:transparent;color:var(--c);font-family:inherit;font-size:11.5px;font-weight:700;cursor:pointer;transition:all .2s';
            btnFull.innerHTML='<i class="fa-solid fa-expand"></i> Pantalla Completa';
            btnFull.onclick=()=>openFullscreenApp(appUrl,appTitle);
            btnWrap.appendChild(btnOpen);btnWrap.appendChild(btnFull);d.appendChild(btnWrap);
        }
        if(postItMatches.length > 0){
            postItMatches.forEach(match => {
                const piColor=match[1].trim(), piTitle=match[2].trim(), piContent=match[3].trim();
                createPostIt(piColor, piTitle, piContent);
            });
        }
        setTimeout(()=>{if(window.MathJax&&MathJax.typesetPromise)MathJax.typesetPromise([d]).catch(()=>{});d.querySelectorAll('pre code').forEach(b=>{if(window.hljs)hljs.highlightElement(b)})},50);
        // Botón de voz 🔊
        if(window.speechSynthesis){
            const spk=document.createElement('button');
            spk.className='pg-speak-btn';
            spk.innerHTML='🔊';
            spk.title='Leer en voz alta';
            const rawText=text.replace(/\[ABRIR_APP:[^\]]+\]/g,'').replace(/\[POST_IT:[^\]]+\]/g,'').trim();
            spk.addEventListener('click',()=>speakText(rawText,spk));
            d.appendChild(spk);
            if(isTTSOn) setTimeout(() => speakText(rawText, spk), 300);
        }
    }
    else d.textContent=text;
    c.appendChild(d);c.scrollTop=c.scrollHeight;
}

function openFullscreenApp(url,title){
    if(window.openFullscreenApp&&window.openFullscreenApp!==openFullscreenApp){window.openFullscreenApp(url,title);return}
    window.open(url,'_blank');
}
function showTyp(){const c=document.getElementById('pg-msgs'),d=document.createElement('div');d.id='pg-typ';d.className='pg-typ';d.innerHTML='<span></span><span></span><span></span>';c.appendChild(d);c.scrollTop=c.scrollHeight}
function hideTyp(){const e=document.getElementById('pg-typ');if(e)e.remove()}

function renderMD(t){
    if(window.marked){try{marked.setOptions({breaks:true,gfm:true});return marked.parse(t)}catch(e){}}
    return t.replace(/```(\w*)\n([\s\S]*?)```/g,'<pre><code>$2</code></pre>').replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>').replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" target="_blank">$1</a>').replace(/\n\n/g,'<br><br>').replace(/\n/g,'<br>');
}

// ═══ FUNCIONES AVANZADAS ═══
async function generateSummary(){
    if(chatHistory.length<2){addMsg('b','📝 Necesito al menos una conversación para hacer un resumen. ¡Pregúntame algo primero!');return}
    if(!hasKey()){addMsg('b','🔑 Configura tu API Key para generar resúmenes.');return}
    showTyp();
    try{
        const convText=chatHistory.map(m=>(m.r==='u'?'Estudiante: ':'Agente: ')+m.t).join('\n');
        const prompt='Resume esta conversación educativa en notas breves (máx 150 palabras, español, viñetas):\n'+convText;
        const result=await callGemini(prompt);
        hideTyp();
        addMsg('b','📝 **Resumen de nuestra conversación:**\n\n'+result);
        createPostIt('amarillo','📝 Resumen',result.substring(0,250)+(result.length>250?'...':''));
    }catch(e){hideTyp();addMsg('b','⚠️ No pude generar el resumen: '+e.message)}
}

function exportPDF(){
    if(chatHistory.length===0){addMsg('b','📄 No hay conversación para exportar.');return}
    const sc=SCIENTISTS[currentSci];
    const w=window.open('','_blank');
    if(!w) { addMsg('b','⚠️ Error: El navegador bloqueó la ventana emergente de exportación.'); return; }
    
    const html = `<html><head><title>Chat con ${sc.full}</title>
    <style>
        body{font-family:'Nunito',sans-serif;max-width:750px;margin:auto;padding:30px;line-height:1.6}
        .header{text-align:center;border-bottom:2px solid ${sc.color};padding-bottom:15px;margin-bottom:20px}
        .msg{margin:15px 0;padding:12px 18px;border-radius:12px;font-size:14px;word-break:break-word}
        .bot{background:#f8fafc;border-left:4px solid ${sc.color};color:#1e293b}
        .user{background:${sc.lt};text-align:right;border-right:4px solid ${sc.color};color:#1e293b}
        .footer{text-align:center;font-size:11px;color:#94a3b8;margin-top:40px;border-top:1px solid #e2e8f0;padding-top:15px}
        pre{background:#f1f5f9;padding:10px;border-radius:8px;overflow-x:auto;font-size:12px}
        code{font-family:'Courier Prime',monospace;background:rgba(0,0,0,0.05);padding:2px 4px;border-radius:4px}
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
        // Fallback si MathJax no carga o tarda
        setTimeout(window.doPrint, 3000);
    </script>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
    </head><body>
    <div class="header">
        <h2>Conversación con ${sc.full}</h2>
        <p style="color:#64748b;margin:4px 0">Física Interactiva — Prof. Néstor Fabio Montoya Palacios</p>
        <p style="color:#94a3b8;font-size:12px">${new Date().toLocaleString('es-CO')}</p>
    </div>
    ${chatHistory.map(m => `<div class="msg ${m.r==='b'?'bot':'user'}">${m.r==='b' ? renderMD(m.t) : m.t.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</div>`).join('')}
    <div class="footer">Exportado desde Física Interactiva — Prof. Néstor Fabio Montoya Palacios</div>
    </body></html>`;

    w.document.open();
    w.document.write(html);
    w.document.close();
}

// ═══ GEMINI API con Auto-Heal + Retry ═══
async function validateApiKey(key){
    updateConnectionStatus('checking');
    const statusEl=document.getElementById('pg-key-status');
    if(statusEl) statusEl.innerHTML='<span style="color:#F39C12">⏳ Validando...</span>';
    try{
        const res=await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key='+key,
            {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents:[{role:'user',parts:[{text:'Responde OK'}]}],generationConfig:{maxOutputTokens:10}})});
        const data=await res.json();
        if(data.error){
            updateConnectionStatus('error');
            if(statusEl) statusEl.innerHTML='<span style="color:#E74C3C">❌ '+data.error.message.substring(0,60)+'</span>';
            return false;
        }
        updateConnectionStatus('connected');
        if(statusEl) statusEl.innerHTML='<span style="color:#2ECC71">✅ ¡Key válida! Conexión exitosa.</span>';
        return true;
    }catch(e){
        updateConnectionStatus('error');
        if(statusEl) statusEl.innerHTML='<span style="color:#E74C3C">❌ Error de red: '+e.message.substring(0,50)+'</span>';
        return false;
    }
}

async function callGemini(msg){
    const key=getKey();if(!key)throw new Error('NO_KEY');
    const sc=SCIENTISTS[currentSci],ctx=getSiteContext();
    const sys=`${sc.prompt}\n\n${ctx}\n\nReglas:\n1. Responde SIEMPRE en español.\n2. Usa Markdown. Fórmulas LaTeX: $inline$ y $$bloque$$. Usa notación matemática rigurosa.\n3. ÁREA PRINCIPAL: MATEMÁTICAS — aritmética, álgebra, trigonometría, geometría plana y del espacio, cálculo diferencial e integral, estadística, probabilidad, combinatoria, álgebra lineal, ecuaciones diferenciales, lógica, matemáticas discretas. También puedes responder sobre física, ciencias, tecnología y programación.\n4. Sé pedagógico: explica el porqué, usa ejemplos concretos, muestra procedimientos paso a paso, motiva al estudiante, relaciona conceptos entre sí.\n5. Si el tema es de matemáticas, recomienda recursos del sitio (cuadernos interactivos, GeoGebra, Desmos, WolframAlpha, Symbolab, Khan Academy).\n6. Usa emojis ocasionalmente.\n7. Máximo 600 palabras.\n8. SUPERPODER ABRIR APP: Si piden abrir un recurso, incluye al final: [ABRIR_APP:url:titulo]\n9. SUPERPODER POST-IT PREMIUM: Crea post-its interactivos con [POST_IT:color:titulo:contenido]. Colores y usos:\n   amarillo=resúmenes, azul=fórmulas, verde=definiciones/teoremas, rosa=datos curiosos, naranja=soluciones de ejercicios, morado=lecturas recomendadas, cyan=tips de estudio, rojo=errores comunes.\n   Crea post-its cuando: el estudiante pida resúmenes/notas/apuntes, expliques fórmulas o teoremas clave, resuelvas ejercicios, sugieráis lecturas/tips, o diga "guárdame esto"/"anota"/"crea nota". Hasta 2 por respuesta si es útil.\n10. SUPERPODER RESOLUCIÓN PASO A PASO: Cuando el estudiante pida resolver un ejercicio matemático:\n   a) Identifica DATOS, INCÓGNITA y TEOREMA/FÓRMULA/MÉTODO a usar.\n   b) Presenta cada paso numerado con formato visual claro:\n      **Paso 1️⃣: Identificar datos** → lista con viñetas\n      **Paso 2️⃣: Plantear el modelo** → muestra la ecuación/definición en LaTeX\n      **Paso 3️⃣: Sustituir o aplicar** → muestra el desarrollo\n      **Paso 4️⃣: Operar / Simplificar / Integrar / Derivar** → operaciones intermedias\n      **Paso 5️⃣: Resultado** → respuesta final y verificación ✅\n   c) Si es geometría o gráfica, incluye un diagrama ASCII/emoji cuando ayude (ej: △ para triángulo, ∫ para integral).\n   d) Crea un post-it naranja con el resumen de la solución.\n   e) Si el estudiante dice "explica más el paso X", profundiza solo en ese paso.\n11. RECUERDA: Eres ${sc.full}. Mantén tu personalidad, cuenta anécdotas de tu vida, motiva al estudiante, sé cálido y cercano. Aunque el científico histórico fuera físico o químico, puede hablar de matemáticas con soltura — la matemática es el lenguaje común de toda la ciencia.`;
    const contents=[{role:'user',parts:[{text:'SISTEMA:\n'+sys}]},{role:'model',parts:[{text:'Entendido, soy '+sc.full+'. Estoy listo para ayudar como tutor.'}]}];
    chatHistory.slice(-12).forEach(m=>contents.push({role:m.r==='u'?'user':'model',parts:[{text:m.t}]}));
    contents.push({role:'user',parts:[{text:msg}]});
    const payload={contents,generationConfig:{temperature:.75,maxOutputTokens:2048,topP:.95,topK:40}};
    const savedModel=localStorage.getItem('pg_workingModel');
    let modelsToTry=[];
    if(savedModel) modelsToTry.push(savedModel);
    GEMINI_MODELS.forEach(m=>{if(!modelsToTry.includes(m))modelsToTry.push(m)});
    for(const model of modelsToTry){
        try{
            console.log('🤖 Physics Genius: Intentando '+model+'...');
            const res=await fetchWithRetry('https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent?key='+key,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
            const data=await res.json();
            if(data.error){
                console.warn('⚠️ Error con '+model+': '+data.error.message);
                if(data.error.message.includes('not found')||data.error.message.includes('not supported')||data.error.message.includes('does not exist')||data.error.code===404) continue;
                throw new Error(data.error.message);
            }
            if(data.candidates?.[0]?.content?.parts?.[0]?.text){
                localStorage.setItem('pg_workingModel',model);
                updateConnectionStatus('connected');
                return data.candidates[0].content.parts[0].text;
            }
            throw new Error('Respuesta vacía del modelo');
        }catch(err){
            if(model===modelsToTry[modelsToTry.length-1]){updateConnectionStatus('error');throw err}
            console.warn('⚠️ '+model+' falló, probando siguiente...');
        }
    }
    updateConnectionStatus('error');
    throw new Error('No se pudo conectar con ningún modelo de Gemini.');
}

async function fetchWithRetry(url,options,retries=3,delay=2000){
    try{
        const res=await fetch(url,options);
        if((res.status===429||res.status===503)&&retries>0){
            console.log('⏳ Rate limit ('+res.status+'), reintentando en '+(delay/1000)+'s...');
            await new Promise(r=>setTimeout(r,delay));
            return fetchWithRetry(url,options,retries-1,delay*2);
        }
        return res;
    }catch(err){
        if(retries>0){await new Promise(r=>setTimeout(r,delay));return fetchWithRetry(url,options,retries-1,delay*2)}
        throw err;
    }
}

async function handleSend(){
    // Si hay imagen pendiente, usar el handler de visión
    if(pendingImageData) { await handleSendWithImage(); return; }
    const ta=document.getElementById('pg-ta'),btn=document.getElementById('pg-send'),t=ta.value.trim();
    if(!t||isTyping)return;
    if(!hasKey()){document.getElementById('pg-ov').classList.add('show');return}
    document.getElementById('pg-sugg').style.display='none';
    addMsg('u',t);chatHistory.push({r:'u',t});ta.value='';ta.style.height='auto';
    isTyping=true;btn.disabled=true;showTyp();
    try{
        const r=await callGemini(t);hideTyp();addMsg('b',r);chatHistory.push({r:'b',t:r});maybeInspire();
    }catch(e){
        hideTyp();
        // Intentar respuesta offline
        const offlineResp=tryOfflineResponse(t);
        if(offlineResp){
            addMsg('b','📡 *Modo offline* — '+SCIENTISTS[currentSci].name+' responde desde su base de conocimientos:\n\n'+offlineResp+'\n\n_Conecta tu API Key para respuestas completas._');
        }else if(e.message==='NO_KEY'){
            addMsg('b','🔑 Configura tu API Key para comenzar.');document.getElementById('pg-ov').classList.add('show');
        }else if(e.message.includes('429')||e.message.includes('quota')||e.message.includes('rate')){
            addMsg('b','⏳ Límite de solicitudes alcanzado. Espera 30 segundos e intenta de nuevo.');
        }else if(e.message.includes('API key')||e.message.includes('PERMISSION')){
            addMsg('b','🔑 Tu API Key no es válida o ha expirado. Genera una nueva en [Google AI Studio](https://aistudio.google.com/apikey).');
            document.getElementById('pg-ov').classList.add('show');
        }else{
            addMsg('b','⚠️ Error: '+e.message+'\n\nIntenta de nuevo en unos segundos.');
        }
    }finally{isTyping=false;btn.disabled=false;ta.focus()}
}


// ══════════════════════════════════════════════════
// ═══ SUPERPODER 1: 🎤 LECTURA EN VOZ ═════════════
// ══════════════════════════════════════════════════
let currentUtterance = null;

function cleanForSpeech(text){
    return text
        .replace(/\$\$[\s\S]*?\$\$/g, ' fórmula ')
        .replace(/\$[^$]+\$/g, ' expresión ')
        .replace(/```[\s\S]*?```/g, ' código ')
        .replace(/`[^`]+`/g, '')
        .replace(/\*\*(.+?)\*\*/g, '$1')
        .replace(/\*(.+?)\*/g, '$1')
        .replace(/#{1,6}\s/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
        .replace(/[_~|>]/g, '')
        .replace(/\n{2,}/g, '. ')
        .replace(/\n/g, ', ')
        .replace(/\s{2,}/g, ' ')
        .slice(0, 800); // límite para no leer respuestas infinitas
}

function speakText(text, btn){
    if(!window.speechSynthesis) return;
    // Si ya está leyendo algo, detener
    if(currentUtterance){
        window.speechSynthesis.cancel();
        currentUtterance = null;
        document.querySelectorAll('.pg-speak-btn.speaking').forEach(b=>{
            b.innerHTML = '🔊'; b.classList.remove('speaking');
        });
        if(btn && btn.classList.contains('speaking')) return; // solo detener
    }
    const cleaned = cleanForSpeech(text);
    const utt = new SpeechSynthesisUtterance(cleaned);
    utt.lang = 'es-CO';
    utt.rate = 0.92;
    utt.pitch = 1.05;
    // Aplicar voz configurada o buscar la mejor en español por defecto
    const voices = window.speechSynthesis.getVoices();
    let esVoice = null;
    if(selectedVoiceURI) {
        esVoice = voices.find(v => v.voiceURI === selectedVoiceURI);
    }
    if(!esVoice) {
        esVoice = voices.find(v=>v.lang.startsWith('es-CO'))
            || voices.find(v=>v.lang.startsWith('es-ES'))
            || voices.find(v=>v.lang.startsWith('es'));
    }
    if(esVoice) utt.voice = esVoice;
    currentUtterance = utt;
    if(btn){ btn.innerHTML = '⏹'; btn.classList.add('speaking'); }
    utt.onend = utt.onerror = ()=>{
        currentUtterance = null;
        if(btn){ btn.innerHTML = '🔊'; btn.classList.remove('speaking'); }
    };
    window.speechSynthesis.speak(utt);
}

// Voces pueden cargar tarde en algunos navegadores
if(window.speechSynthesis) window.speechSynthesis.onvoiceschanged = ()=>{};

// ══════════════════════════════════════════════════
// ═══ SUPERPODER 4: 🎤 DICTADO POR VOZ (STT) ═════
// ══════════════════════════════════════════════════
let pgRecognition = null;
let pgIsListening = false;

function initSpeechRecognition(){
    const micBtn = document.getElementById('pg-mic-btn');
    if(!micBtn) return;

    // Verificar soporte del navegador
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if(!SpeechRecognition){
        // En vez de ocultar completamente, mostrar tooltip informativo pero mantener visible en desktop
        micBtn.classList.add('pg-mic-hidden');
        micBtn.title = 'Dictado por voz no disponible en este navegador';
        console.log('🎤 Speech Recognition no soportado en este navegador');
        return;
    }

    pgRecognition = new SpeechRecognition();
    pgRecognition.lang = 'es-CO';
    pgRecognition.continuous = true;
    pgRecognition.interimResults = true;
    pgRecognition.maxAlternatives = 1;

    let finalTranscript = '';
    let interimTranscript = '';
    const ta = document.getElementById('pg-ta');

    pgRecognition.onstart = ()=>{
        pgIsListening = true;
        micBtn.classList.add('pg-mic-active');
        micBtn.title = 'Detener dictado';
        micBtn.querySelector('i').className = 'fa-solid fa-stop';
        if(ta) ta.placeholder = '🎤 Escuchando... habla ahora';
    };

    pgRecognition.onresult = (event)=>{
        interimTranscript = '';
        for(let i = event.resultIndex; i < event.results.length; i++){
            const transcript = event.results[i][0].transcript;
            if(event.results[i].isFinal){
                finalTranscript += transcript + ' ';
            } else {
                interimTranscript += transcript;
            }
        }
        if(ta){
            ta.value = finalTranscript + interimTranscript;
            ta.style.height = 'auto';
            ta.style.height = Math.min(ta.scrollHeight, 96) + 'px';
        }
    };

    pgRecognition.onerror = (event)=>{
        console.warn('🎤 Error:', event.error);
        if(event.error === 'not-allowed'){
            addMsg('b','🎤 **Permiso denegado.** Para usar el dictado por voz, permite el acceso al micrófono en la configuración de tu navegador.');
        } else if(event.error === 'no-speech'){
            // Silencioso, se reinicia solo
        } else if(event.error !== 'aborted'){
            addMsg('b','🎤 Error de reconocimiento: ' + event.error + '. Intenta de nuevo.');
        }
        stopListening();
    };

    pgRecognition.onend = ()=>{
        if(pgIsListening){
            // Se detuvo inesperadamente, reiniciar si aún queremos escuchar
            try { pgRecognition.start(); } catch(e) { stopListening(); }
        }
    };

    function startListening(){
        finalTranscript = '';
        interimTranscript = '';
        try {
            pgRecognition.start();
        } catch(e){
            // Ya está corriendo
            stopListening();
            setTimeout(()=>{ try{pgRecognition.start()}catch(e2){} }, 200);
        }
    }

    function stopListening(){
        pgIsListening = false;
        try { pgRecognition.stop(); } catch(e){}
        micBtn.classList.remove('pg-mic-active');
        micBtn.title = 'Dictar por voz';
        micBtn.querySelector('i').className = 'fa-solid fa-microphone';
        const ta2 = document.getElementById('pg-ta');
        if(ta2) ta2.placeholder = 'Escribe tu pregunta...';
    }

    // Toggle micrófono
    micBtn.addEventListener('click', (e)=>{
        e.stopPropagation();
        if(pgIsListening) stopListening();
        else startListening();
    });
    micBtn.addEventListener('touchend', (e)=>{
        e.stopPropagation();
        e.preventDefault();
        if(pgIsListening) stopListening();
        else startListening();
    });
}

// ══════════════════════════════════════════════════
// ═══ SUPERPODER 2: 📸 OCR FOTO CON GEMINI ════════
// ══════════════════════════════════════════════════
let pendingImageData = null; // {base64, mimeType, dataUrl}

function initImageUpload(){
    const fi = document.getElementById('pg-img-input');
    const btn = document.getElementById('pg-img-btn');
    const prev = document.getElementById('pg-img-preview');
    const thumb = document.getElementById('pg-img-thumb');
    const rem = document.getElementById('pg-img-remove');
    if(!fi||!btn||!prev||!thumb||!rem) return;

    btn.addEventListener('click', ()=>fi.click());
    btn.addEventListener('touchend', e=>{ e.preventDefault(); fi.click(); });

    function processImageFile(file) {
        if(!file) return;
        // Validar tamaño (máx 4MB)
        if(file.size > 4*1024*1024){
            addMsg('b','⚠️ La imagen es muy grande. Máximo 4 MB.'); return;
        }
        const reader = new FileReader();
        reader.onload = (ev)=>{
            const dataUrl = ev.target.result;
            const parts = dataUrl.split(',');
            const b64 = parts[1];
            const mime = file.type || 'image/jpeg';
            pendingImageData = { base64: b64, mimeType: mime, dataUrl };
            thumb.src = dataUrl;
            prev.classList.add('show');
            document.getElementById('pg-ta').placeholder = 'Agrega contexto (opcional) y presiona Enviar...';
        };
        reader.readAsDataURL(file);
    }

    fi.addEventListener('change', ()=>{
        processImageFile(fi.files[0]);
        fi.value = ''; // permitir seleccionar la misma imagen de nuevo
    });

    // ═══ SOPORTE PARA PEGAR RECORTES DE PANTALLA (Ctrl+V) ═══
    document.getElementById('pg-ta').addEventListener('paste', (e)=>{
        if(!e.clipboardData || !e.clipboardData.items) return;
        const items = e.clipboardData.items;
        for(let i=0; i<items.length; i++){
            if(items[i].type.indexOf('image') === 0){
                const file = items[i].getAsFile();
                if(file){
                    e.preventDefault(); // evitar comportamiento por defecto
                    processImageFile(file);
                    break;
                }
            }
        }
    });

    rem.addEventListener('click', ()=>{
        pendingImageData = null;
        prev.classList.remove('show');
        thumb.src = '';
        document.getElementById('pg-ta').placeholder = 'Escribe tu pregunta...';
    });
}

async function callGeminiVision(base64, mimeType, userText){
    const key = getKey(); if(!key) throw new Error('NO_KEY');
    const sc = SCIENTISTS[currentSci];
    const sysPrompt = `${sc.prompt}\n\nSITIO: Física Interactiva — Prof. Néstor Fabio Montoya, I.E. María Auxiliadora.\n\nReglas: Responde SIEMPRE en español. Eres ${sc.full}. Mantén tu personalidad.`;
    const imagePrompt = `Eres un tutor experto en física y matemáticas. Analiza esta imagen que contiene un problema o ejercicio escrito (puede ser a mano o impreso).
1. Si hay texto manuscrito, TRANSCRÍBELO literalmente primero.
2. Identifica: enunciado, datos dados y lo que se pide calcular.
3. Resuelve el problema paso a paso con fórmulas claras.
4. Da el resultado final con unidades.
${userText ? '\nContexto adicional del estudiante: '+userText : ''}
Responde en español, con el estilo de ${sc.full}.`;

    const payload = {
        contents:[{role:'user', parts:[
            {inline_data:{mime_type:mimeType, data:base64}},
            {text: sysPrompt+'\n\n'+imagePrompt}
        ]}],
        generationConfig:{temperature:.7, maxOutputTokens:2048, topP:.95}
    };
    // Gemini que soporte visión
    const visionModels = ['gemini-2.0-flash','gemini-2.5-flash','gemini-1.5-flash','gemini-1.5-pro'];
    for(const model of visionModels){
        try{
            const res = await fetchWithRetry(
                'https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent?key='+key,
                {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}
            );
            const data = await res.json();
            if(data.error){ if(data.error.code===404||data.error.message.includes('not found')) continue; throw new Error(data.error.message); }
            if(data.candidates?.[0]?.content?.parts?.[0]?.text){
                updateConnectionStatus('connected');
                return data.candidates[0].content.parts[0].text;
            }
        }catch(err){ if(model===visionModels[visionModels.length-1]) throw err; }
    }
    throw new Error('No se pudo procesar la imagen con los modelos disponibles.');
}

async function handleSendWithImage(){
    if(!hasKey()){document.getElementById('pg-ov').classList.add('show');return;}
    const ta = document.getElementById('pg-ta');
    const userText = ta.value.trim();
    const imgData = pendingImageData;

    // Mostrar mensaje del usuario con la imagen
    const c = document.getElementById('pg-msgs');
    const d = document.createElement('div');
    d.className = 'pg-m pg-mu';
    d.style.cssText = 'flex-direction:column;align-items:flex-end;gap:4px';
    d.innerHTML = `<img src="${imgData.dataUrl}" class="pg-msg-img" style="max-width:180px">${userText ? '<span>'+userText+'</span>' : '<span>📸 Analiza este problema</span>'}`;
    c.appendChild(d); c.scrollTop = c.scrollHeight;
    chatHistory.push({r:'u', t: (userText||'Analiza el problema de la imagen')});

    // Limpiar preview
    pendingImageData = null;
    document.getElementById('pg-img-preview').classList.remove('show');
    document.getElementById('pg-img-thumb').src = '';
    ta.value = ''; ta.style.height = 'auto';
    ta.placeholder = 'Escribe tu pregunta...';
    document.getElementById('pg-sugg').style.display = 'none';

    const btn = document.getElementById('pg-send');
    isTyping = true; btn.disabled = true; showTyp();
    try{
        const r = await callGeminiVision(imgData.base64, imgData.mimeType, userText);
        hideTyp(); addMsg('b', '📸 *Análisis de imagen:*\n\n'+r);
        chatHistory.push({r:'b', t:r}); maybeInspire();
    }catch(e){
        hideTyp();
        if(e.message==='NO_KEY'){ addMsg('b','🔑 Configura tu API Key.'); document.getElementById('pg-ov').classList.add('show'); }
        else addMsg('b','⚠️ No pude procesar la imagen: '+e.message);
    }finally{ isTyping=false; btn.disabled=false; ta.focus(); }
}

// ══════════════════════════════════════════════════
// ═══ SUPERPODER 3: 🧮 CALCULADORA DE FÓRMULAS ════
// ══════════════════════════════════════════════════
const FORMULAS = {
    cinematica:{
        icon:'🏃', label:'Cinemática',
        items:[
            {name:'MRU — Posición', latex:'x = x₀ + v·t',
             vars:[{id:'x0',label:'Posición inicial x₀',unit:'m'},{id:'v',label:'Velocidad v',unit:'m/s'},{id:'t',label:'Tiempo t',unit:'s'}],
             solve:v=>v.x0+v.v*v.t, rId:'x',rLabel:'Posición x',rUnit:'m'},
            {name:'MRUA — Velocidad', latex:'v = v₀ + a·t',
             vars:[{id:'v0',label:'Velocidad inicial v₀',unit:'m/s'},{id:'a',label:'Aceleración a',unit:'m/s²'},{id:'t',label:'Tiempo t',unit:'s'}],
             solve:v=>v.v0+v.a*v.t, rId:'v',rLabel:'Velocidad v',rUnit:'m/s'},
            {name:'MRUA — Posición', latex:'x = x₀ + v₀t + ½at²',
             vars:[{id:'x0',label:'x₀',unit:'m'},{id:'v0',label:'v₀',unit:'m/s'},{id:'a',label:'a',unit:'m/s²'},{id:'t',label:'t',unit:'s'}],
             solve:v=>v.x0+v.v0*v.t+0.5*v.a*v.t*v.t, rId:'x',rLabel:'Posición x',rUnit:'m'},
            {name:'MRUA — v² final', latex:'v² = v₀² + 2a·Δx',
             vars:[{id:'v0',label:'v₀',unit:'m/s'},{id:'a',label:'a',unit:'m/s²'},{id:'dx',label:'Δx',unit:'m'}],
             solve:v=>Math.sqrt(Math.max(0,v.v0*v.v0+2*v.a*v.dx)), rId:'v',rLabel:'Velocidad v',rUnit:'m/s'},
            {name:'Caída libre — altura', latex:'y = ½·g·t²',
             vars:[{id:'t',label:'Tiempo t',unit:'s'}],
             solve:v=>0.5*9.8*v.t*v.t, rId:'y',rLabel:'Altura y',rUnit:'m'},
            {name:'Alcance parabólico', latex:'R = v₀²·sin(2θ)/g',
             vars:[{id:'v0',label:'v₀',unit:'m/s'},{id:'ang',label:'Ángulo θ',unit:'°'}],
             solve:v=>(v.v0*v.v0*Math.sin(2*v.ang*Math.PI/180))/9.8, rId:'R',rLabel:'Alcance R',rUnit:'m'}
        ]
    },
    dinamica:{
        icon:'⚡', label:'Dinámica',
        items:[
            {name:'Segunda Ley de Newton', latex:'F = m·a',
             vars:[{id:'m',label:'Masa m',unit:'kg'},{id:'a',label:'Aceleración a',unit:'m/s²'}],
             solve:v=>v.m*v.a, rId:'F',rLabel:'Fuerza F',rUnit:'N'},
            {name:'Peso', latex:'W = m·g',
             vars:[{id:'m',label:'Masa m',unit:'kg'}],
             solve:v=>v.m*9.8, rId:'W',rLabel:'Peso W',rUnit:'N'},
            {name:'Fuerza de rozamiento', latex:'f = μ·N',
             vars:[{id:'mu',label:'Coef. rozamiento μ',unit:''},{id:'N',label:'Normal N',unit:'N'}],
             solve:v=>v.mu*v.N, rId:'f',rLabel:'Rozamiento f',rUnit:'N'},
            {name:'Gravitación Universal', latex:'F = G·m₁·m₂/r²',
             vars:[{id:'m1',label:'Masa m₁',unit:'kg'},{id:'m2',label:'Masa m₂',unit:'kg'},{id:'r',label:'Distancia r',unit:'m'}],
             solve:v=>(6.674e-11*v.m1*v.m2)/(v.r*v.r), rId:'F',rLabel:'Fuerza F',rUnit:'N'}
        ]
    },
    energia:{
        icon:'⚡', label:'Energía',
        items:[
            {name:'Energía cinética', latex:'Ec = ½·m·v²',
             vars:[{id:'m',label:'Masa m',unit:'kg'},{id:'v',label:'Velocidad v',unit:'m/s'}],
             solve:v=>0.5*v.m*v.v*v.v, rId:'Ec',rLabel:'Energía cinética',rUnit:'J'},
            {name:'Energía potencial gravitatoria', latex:'Ep = m·g·h',
             vars:[{id:'m',label:'Masa m',unit:'kg'},{id:'h',label:'Altura h',unit:'m'}],
             solve:v=>v.m*9.8*v.h, rId:'Ep',rLabel:'Energía potencial',rUnit:'J'},
            {name:'Trabajo', latex:'W = F·d·cos(θ)',
             vars:[{id:'F',label:'Fuerza F',unit:'N'},{id:'d',label:'Desplazamiento d',unit:'m'},{id:'ang',label:'Ángulo θ',unit:'°'}],
             solve:v=>v.F*v.d*Math.cos(v.ang*Math.PI/180), rId:'W',rLabel:'Trabajo W',rUnit:'J'},
            {name:'Potencia', latex:'P = W/t',
             vars:[{id:'W',label:'Trabajo W',unit:'J'},{id:'t',label:'Tiempo t',unit:'s'}],
             solve:v=>v.W/v.t, rId:'P',rLabel:'Potencia P',rUnit:'W'},
            {name:'Energía elástica (resort)', latex:'Ee = ½·k·x²',
             vars:[{id:'k',label:'Constante k',unit:'N/m'},{id:'x',label:'Deformación x',unit:'m'}],
             solve:v=>0.5*v.k*v.x*v.x, rId:'Ee',rLabel:'Energía elástica',rUnit:'J'}
        ]
    },
    ondas:{
        icon:'〰️', label:'Ondas',
        items:[
            {name:'Velocidad de onda', latex:'v = λ·f',
             vars:[{id:'lam',label:'Longitud de onda λ',unit:'m'},{id:'f',label:'Frecuencia f',unit:'Hz'}],
             solve:v=>v.lam*v.f, rId:'v',rLabel:'Velocidad v',rUnit:'m/s'},
            {name:'Período', latex:'T = 1/f',
             vars:[{id:'f',label:'Frecuencia f',unit:'Hz'}],
             solve:v=>1/v.f, rId:'T',rLabel:'Período T',rUnit:'s'},
            {name:'Doppler (fuente acercándose)', latex:'f′ = f·(v+vo)/(v-vs)',
             vars:[{id:'f0',label:'Frecuencia fuente f',unit:'Hz'},{id:'vo',label:'Vel. observador vo',unit:'m/s'},{id:'vs',label:'Vel. fuente vs',unit:'m/s'}],
             solve:v=>v.f0*(340+v.vo)/(340-v.vs), rId:'fp',rLabel:'Frecuencia percibida',rUnit:'Hz'},
            {name:'Intensidad sonora (dB)', latex:'β = 10·log(I/I₀)',
             vars:[{id:'I',label:'Intensidad I',unit:'W/m²'}],
             solve:v=>10*Math.log10(v.I/1e-12), rId:'beta',rLabel:'Nivel sonoro β',rUnit:'dB'},
            {name:'Péndulo simple — Período', latex:'T = 2π·√(L/g)',
             vars:[{id:'L',label:'Longitud L',unit:'m'}],
             solve:v=>2*Math.PI*Math.sqrt(v.L/9.8), rId:'T',rLabel:'Período T',rUnit:'s'}
        ]
    },
    vectores:{
        icon:'↗️', label:'Vectores',
        items:[
            {name:'Magnitud del vector', latex:'|v| = √(Vx²+Vy²)',
             vars:[{id:'vx',label:'Componente Vx',unit:''},{id:'vy',label:'Componente Vy',unit:''}],
             solve:v=>Math.sqrt(v.vx*v.vx+v.vy*v.vy), rId:'mag',rLabel:'Magnitud |v|',rUnit:'u'},
            {name:'Ángulo del vector', latex:'θ = arctan(Vy/Vx)',
             vars:[{id:'vx',label:'Vx',unit:''},{id:'vy',label:'Vy',unit:''}],
             solve:v=>Math.atan2(v.vy,v.vx)*180/Math.PI, rId:'ang',rLabel:'Ángulo θ',rUnit:'°'},
            {name:'Componente X', latex:'Vx = V·cos(θ)',
             vars:[{id:'V',label:'Módulo V',unit:''},{id:'ang',label:'Ángulo θ',unit:'°'}],
             solve:v=>v.V*Math.cos(v.ang*Math.PI/180), rId:'Vx',rLabel:'Componente Vx',rUnit:''},
            {name:'Componente Y', latex:'Vy = V·sin(θ)',
             vars:[{id:'V',label:'Módulo V',unit:''},{id:'ang',label:'Ángulo θ',unit:'°'}],
             solve:v=>v.V*Math.sin(v.ang*Math.PI/180), rId:'Vy',rLabel:'Componente Vy',rUnit:''},
            {name:'Producto punto', latex:'A·B = Ax·Bx + Ay·By',
             vars:[{id:'ax',label:'Ax',unit:''},{id:'ay',label:'Ay',unit:''},{id:'bx',label:'Bx',unit:''},{id:'by',label:'By',unit:''}],
             solve:v=>v.ax*v.bx+v.ay*v.by, rId:'dot',rLabel:'Producto punto',rUnit:''}
        ]
    }
};

let calcCurrentTopic = 'cinematica';
let calcCurrentFormula = null;

function initCalc(){
    // Construir tabs
    const tabsEl = document.getElementById('pg-calc-tabs');
    if(!tabsEl) return;
    Object.entries(FORMULAS).forEach(([k,f])=>{
        const btn=document.createElement('button');
        btn.className='pg-calc-tab'+(k===calcCurrentTopic?' on':'');
        btn.textContent=f.icon+' '+f.label;
        btn.dataset.k=k;
        btn.addEventListener('click',()=>{ calcCurrentTopic=k; calcShowList(); document.querySelectorAll('.pg-calc-tab').forEach(b=>b.classList.toggle('on',b.dataset.k===k)); });
        tabsEl.appendChild(btn);
    });
    calcShowList();

    // Botones del panel
    document.getElementById('pg-calc-close')?.addEventListener('click',()=>document.getElementById('pg-calc-panel').classList.remove('open'));
    document.getElementById('pg-calc-back')?.addEventListener('click',calcShowList);
    document.getElementById('pg-calc-compute')?.addEventListener('click',calcCompute);
    document.getElementById('pg-calc-chat')?.addEventListener('click',calcSendToChat);

    // Botón abrir calculadora
    document.getElementById('pg-calc-btn')?.addEventListener('click',()=>{
        const p=document.getElementById('pg-calc-panel');
        p.classList.toggle('open');
        // Sincronizar colores con el científico actual
        const sc=SCIENTISTS[currentSci];
        p.style.setProperty('--c',sc.color);p.style.setProperty('--lt',sc.lt);p.style.setProperty('--glow',sc.glow);
    });
}

function calcShowList(){
    const list=document.getElementById('pg-calc-list');
    const form=document.getElementById('pg-calc-form');
    if(!list||!form) return;
    form.classList.remove('show'); list.style.display='flex';
    list.innerHTML='';
    const topic=FORMULAS[calcCurrentTopic];
    topic.items.forEach((f,i)=>{
        const d=document.createElement('div');
        d.className='pg-calc-fl-item';
        d.innerHTML=`<span class="pg-calc-fl-icon">${topic.icon}</span><span>${f.name}</span>`;
        d.addEventListener('click',()=>calcShowForm(i));
        list.appendChild(d);
    });
    document.getElementById('pg-calc-result').classList.remove('show');
}

function calcShowForm(idx){
    calcCurrentFormula=idx;
    const f=FORMULAS[calcCurrentTopic].items[idx];
    const list=document.getElementById('pg-calc-list');
    const form=document.getElementById('pg-calc-form');
    if(!list||!form) return;
    list.style.display='none'; form.classList.add('show');
    document.getElementById('pg-calc-formula-display').textContent=f.latex;
    document.getElementById('pg-calc-result').classList.remove('show');
    const fields=document.getElementById('pg-calc-fields');
    fields.innerHTML='';
    f.vars.forEach(v=>{
        const dv=document.createElement('div');dv.className='pg-calc-field';
        dv.innerHTML=`<label>${v.label} <span>${v.unit}</span></label><input type="number" id="pgf-${v.id}" placeholder="Ingresa ${v.label}" step="any">`;
        fields.appendChild(dv);
    });
    // Enter en el último campo → calcular
    const inputs=fields.querySelectorAll('input');
    inputs.forEach((inp,i)=>{
        inp.addEventListener('keydown',e=>{ if(e.key==='Enter'){ if(i===inputs.length-1) calcCompute(); else inputs[i+1].focus(); } });
    });
    if(inputs.length) inputs[0].focus();
    // Ranklear MathJax si está disponible
    if(window.MathJax&&MathJax.typesetPromise) MathJax.typesetPromise([document.getElementById('pg-calc-formula-display')]).catch(()=>{});
}

function calcCompute(){
    const f=FORMULAS[calcCurrentTopic].items[calcCurrentFormula];
    const vals={};
    let valid=true;
    f.vars.forEach(v=>{
        const inp=document.getElementById('pgf-'+v.id);
        const val=parseFloat(inp?.value);
        if(isNaN(val)||inp?.value.trim()===''){
            inp?.style.setProperty('border-color','#ef4444');
            valid=false;
        }else{
            inp?.style.setProperty('border-color','');
            vals[v.id]=val;
        }
    });
    if(!valid) return;
    try{
        const result=f.solve(vals);
        const resEl=document.getElementById('pg-calc-result');
        const valEl=document.getElementById('pg-calc-result-val');
        const unitEl=document.getElementById('pg-calc-result-unit');
        const formatted=Number.isInteger(result)?result.toString():result.toFixed(4).replace(/\.?0+$/,'');
        valEl.textContent=formatted;
        unitEl.textContent=f.rUnit?f.rLabel+' en '+f.rUnit:f.rLabel;
        resEl.classList.add('show');
        if(window.speechSynthesis&&window.speechSynthesis.speaking) window.speechSynthesis.cancel();
    }catch(e){
        document.getElementById('pg-calc-result-val').textContent='Error';
        document.getElementById('pg-calc-result').classList.add('show');
    }
}

function calcSendToChat(){
    const f=FORMULAS[calcCurrentTopic].items[calcCurrentFormula];
    const resVal=document.getElementById('pg-calc-result-val').textContent;
    const resUnit=document.getElementById('pg-calc-result-unit').textContent;
    if(!resVal||!document.getElementById('pg-calc-result').classList.contains('show')){
        calcCompute(); return;
    }
    // Construir el texto con los valores ingresados
    const vals=f.vars.map(v=>{
        const inp=document.getElementById('pgf-'+v.id);
        return v.label+'='+inp?.value+(v.unit?' '+v.unit:'');
    }).join(', ');
    const msg=`Acabo de calcular: ${f.name}\nFórmula: ${f.latex}\nDatos: ${vals}\nResultado: ${resVal} ${f.rUnit}\n¿Puedes explicarme el concepto físico de esta fórmula y verificar si el resultado es correcto?`;
    document.getElementById('pg-ta').value=msg;
    document.getElementById('pg-calc-panel').classList.remove('open');
    handleSend();
}

// ═══ EVENTS ═══
function initEvents(){

    // Lógica para arrastrar modales (#pg-win y #pg-calc-panel)
    function makeDraggable(modalId, handleId) {
        const modal = document.getElementById(modalId);
        const handle = document.getElementById(handleId);
        if(!modal || !handle) return;
        let isDrag=false, startX, startY, initialL, initialT;

        function onStart(e) {
            if(e.target.closest('button') || e.target.closest('input') || e.target.closest('#pg-hdr-av')) return;
            const touch = e.touches ? e.touches[0] : e;
            isDrag = true;
            startX = touch.clientX; startY = touch.clientY;
            let rect = modal.getBoundingClientRect();
            // Asegurarse de que el modal tiene top/left fijos para arrastrar bien
            modal.style.right = 'auto'; modal.style.bottom = 'auto';
            modal.style.left = rect.left + 'px'; modal.style.top = rect.top + 'px';
            initialL = rect.left; initialT = rect.top;
            modal.style.transition = 'none'; // Quitar animación para fluidez
            if(e.cancelable) e.preventDefault();
        }
        function onMove(e) {
            if(!isDrag) return;
            const touch = e.touches ? e.touches[0] : e;
            const dx = touch.clientX - startX;
            const dy = touch.clientY - startY;
            let newL = initialL + dx;
            let newT = initialT + dy;
            // Límites de pantalla
            newL = Math.max(0, Math.min(window.innerWidth - modal.offsetWidth, newL));
            newT = Math.max(0, Math.min(window.innerHeight - modal.offsetHeight, newT));
            
            modal.style.left = newL + 'px';
            modal.style.top = newT + 'px';
            if(e.cancelable) e.preventDefault();
        }
        function onEnd() {
            if(!isDrag) return;
            isDrag = false;
            modal.style.transition = ''; 
        }
        handle.addEventListener('mousedown', onStart);
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onEnd);
        handle.addEventListener('touchstart', onStart, {passive:false});
        document.addEventListener('touchmove', onMove, {passive:false});
        document.addEventListener('touchend', onEnd);
    }
    
    // Activar arrastre para ventanas
    makeDraggable('pg-win', 'pg-hdr');
    makeDraggable('pg-calc-panel', 'pg-calc-hdr');

    const bubble=document.getElementById('pg-bubble');
    let isDragging=false,dragStartX=0,dragStartY=0,bubbleStartX=0,bubbleStartY=0,hasMoved=false;
    function onDragStart(e){
        const touch=e.touches?e.touches[0]:e;
        const root=document.getElementById('pg-root');
        const rect=root.getBoundingClientRect();
        isDragging=true;hasMoved=false;
        dragStartX=touch.clientX;dragStartY=touch.clientY;
        bubbleStartX=rect.left;bubbleStartY=rect.top;
        bubble.classList.add('pg-dragging');
        e.preventDefault();
    }
    function onDragMove(e){
        if(!isDragging)return;
        const touch=e.touches?e.touches[0]:e;
        const dx=touch.clientX-dragStartX,dy=touch.clientY-dragStartY;
        // TOLERANCIA DE ARRASTRE PARA MÓVIL: Aumentar a 10px (antes 4px) para evitar clics fantasma
        if(Math.abs(dx)>10||Math.abs(dy)>10) hasMoved=true;
        if(!hasMoved)return;
        const root=document.getElementById('pg-root');
        let newX=bubbleStartX+dx,newY=bubbleStartY+dy;
        newX=Math.max(0,Math.min(newX,window.innerWidth-76));
        newY=Math.max(0,Math.min(newY,window.innerHeight-76));
        root.style.left=newX+'px';root.style.top=newY+'px';
        root.style.right='auto';root.style.bottom='auto';
        e.preventDefault();
    }
    function onDragEnd(){
        if(!isDragging)return;
        isDragging=false;
        bubble.classList.remove('pg-dragging');
        const root=document.getElementById('pg-root');
        const rect=root.getBoundingClientRect();
        const centerX=rect.left+rect.width/2;
        if(centerX<window.innerWidth/2){root.style.left='12px';root.style.right='auto'}
        else{root.style.left='auto';root.style.right='12px'}
        // Mantener top vertical
        const validTop=Math.max(10,Math.min(rect.top,window.innerHeight-80));
        root.style.top=validTop+'px';root.style.bottom='auto';
        try{localStorage.setItem('pg_bubblePos',JSON.stringify({left:root.style.left,top:root.style.top,right:root.style.right,bottom:root.style.bottom}))}catch(e){}
    }
    bubble.addEventListener('mousedown',onDragStart);
    document.addEventListener('mousemove',onDragMove);
    document.addEventListener('mouseup',onDragEnd);
    bubble.addEventListener('touchstart',onDragStart,{passive:false});
    document.addEventListener('touchmove',onDragMove,{passive:false});
    document.addEventListener('touchend',onDragEnd);

    // ═══ FIX MÓVIL: touchend abre el chat cuando es un tap (no arrastre) ═══
    bubble.addEventListener('touchend', (e) => {
        if (!hasMoved) {
            e.preventDefault(); 
            isOpen = true;
            bubble.classList.add('hide');
            positionChatWindow();
            document.getElementById('pg-win').classList.add('open');
            document.getElementById('pg-badge').style.display = 'none';
            
            if (activeProactiveMsg) {
                setTimeout(() => { addMsg('b', "💡 " + activeProactiveMsg); activeProactiveMsg = null; }, 100);
            } else if (!chatHistory.length) {
                setTimeout(() => addMsg('b', SCIENTISTS[currentSci].hi), 300);
            }
            
            setTimeout(() => document.getElementById('pg-ta').focus(), 500);
            startInspirational(); stopSpontaneousQuotes();
        }
        hasMoved = false;
    });

    // Click solo si no arrastró — con guardia robusta
    bubble.addEventListener('click', (e) => {
        if (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) return;
        if (hasMoved) { hasMoved = false; return; }
        isOpen = true;
        bubble.classList.add('hide');
        positionChatWindow();
        document.getElementById('pg-win').classList.add('open');
        document.getElementById('pg-badge').style.display = 'none';
        
        if (activeProactiveMsg) {
            setTimeout(() => { addMsg('b', "💡 " + activeProactiveMsg); activeProactiveMsg = null; }, 100);
        } else if (!chatHistory.length) {
            setTimeout(() => addMsg('b', SCIENTISTS[currentSci].hi), 300);
        }
        
        setTimeout(() => document.getElementById('pg-ta').focus(), 500);
        startInspirational(); stopSpontaneousQuotes();
    });

    // Cerrar — con guardia para no perder la burbuja
    document.getElementById('pg-btn-x').addEventListener('click', closeChatWindow);
    document.getElementById('pg-hdr-av').addEventListener('click', closeChatWindow);

    function closeChatWindow() {
        isOpen = false;
        document.getElementById('pg-win').classList.remove('open');
        setTimeout(() => {
            bubble.classList.remove('hide');
            ensureBubbleVisible();
        }, 350);
        stopInspirational(); startSpontaneousQuotes();
    }
    
    // ═══ CERRAR AL HACER CLIC FUERA ═══
    document.addEventListener('mousedown', (e) => {
        const win = document.getElementById('pg-win');
        const bubble = document.getElementById('pg-bubble');
        if (isOpen && win && bubble && !win.contains(e.target) && !bubble.contains(e.target) && !e.target.closest('#pg-calc-panel') && !e.target.closest('#pg-note-modal') && !e.target.closest('.pg-postit')) {
            closeChatWindow();
        }
    });

    // ═══ RESIZE WINDOW ═══
    function makeResizable(winId, handleId) {
        const win = document.getElementById(winId);
        const handle = document.getElementById(handleId);
        if(!win || !handle) return;
        let isResizing = false, startW, startH, startX, startY;
        function onStart(e) {
            const touch = e.touches ? e.touches[0] : e;
            isResizing = true;
            startX = touch.clientX; startY = touch.clientY;
            startW = win.offsetWidth; startH = win.offsetHeight;
            win.style.transition = 'none';
            if(e.cancelable) e.preventDefault();
            e.stopPropagation();
        }
        function onMove(e) {
            if(!isResizing) return;
            const touch = e.touches ? e.touches[0] : e;
            const dx = touch.clientX - startX;
            const dy = touch.clientY - startY;
            let newW = startW + dx; let newH = startH + dy;
            const maxW = window.innerWidth - win.offsetLeft - 10;
            const maxH = window.innerHeight - win.offsetTop - 10;
            newW = Math.max(300, Math.min(newW, maxW));
            newH = Math.max(380, Math.min(newH, maxH));
            win.style.width = newW + 'px';
            win.style.height = newH + 'px';
            win.style.maxWidth = 'none';
            win.style.maxHeight = 'none';
            if(e.cancelable) e.preventDefault();
        }
        function onEnd() {
            if(!isResizing) return;
            isResizing = false;
            win.style.transition = '';
        }
        handle.addEventListener('mousedown', onStart);
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onEnd);
        handle.addEventListener('touchstart', onStart, {passive:false});
        document.addEventListener('touchmove', onMove, {passive:false});
        document.addEventListener('touchend', onEnd);
    }
    makeResizable('pg-win', 'pg-resize-handle');

    // Botón nueva nota (+) en el bubble
    const newNoteBtn = document.getElementById('pg-new-note-btn');
    if (newNoteBtn) {
        newNoteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // no abrir el chat
            openNoteModal();
        });
        newNoteBtn.addEventListener('touchend', (e) => {
            e.stopPropagation();
            e.preventDefault();
            openNoteModal();
        });
    }
    
    // Botón nueva nota dentro del chatbot (header)
    const newNoteInBtn = document.getElementById('pg-btn-note-in');
    if(newNoteInBtn) {
        newNoteInBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openNoteModal();
        });
        newNoteInBtn.addEventListener('touchend', (e) => {
            e.stopPropagation();
            e.preventDefault();
            openNoteModal();
        });
    }

    document.getElementById('pg-btn-sci').addEventListener('click',()=>document.getElementById('pg-panel').classList.toggle('show'));
    
    // Cargar voces en el select
    function populateVoices() {
        const sel = document.getElementById('pg-voice-sel');
        if(!sel || !window.speechSynthesis) return;
        const voices = window.speechSynthesis.getVoices();
        const esVoices = voices.filter(v => v.lang.startsWith('es'));
        if(esVoices.length === 0) {
            sel.innerHTML = '<option value="">(No hay voces en español disponibles)</option>';
            return;
        }
        sel.innerHTML = '';
        esVoices.forEach((v, i) => {
            let label = v.name;
            if(label.includes('Sabina') || label.includes('Helena') || label.includes('Laura') || label.includes('Mia')) label += ' 👩';
            else if(label.includes('Pablo') || label.includes('Raul') || label.includes('Jorge') || label.includes('Alvar')) label += ' 👨';
            else label += ' 🗣️';
            const opt = document.createElement('option');
            opt.value = v.voiceURI;
            opt.textContent = label;
            if(v.voiceURI === selectedVoiceURI) opt.selected = true;
            if(!selectedVoiceURI && i===0) { opt.selected = true; selectedVoiceURI = v.voiceURI; }
            sel.appendChild(opt);
        });
    }
    if(window.speechSynthesis) {
        populateVoices();
        window.speechSynthesis.addEventListener('voiceschanged', populateVoices);
        document.getElementById('pg-voice-sel').addEventListener('change', (e) => {
            selectedVoiceURI = e.target.value;
            localStorage.setItem('pg_voice_uri', selectedVoiceURI);
            if(isTTSOn) {
                const testUtt = new SpeechSynthesisUtterance("Voz seleccionada.");
                const voices = window.speechSynthesis.getVoices();
                const cv = voices.find(v => v.voiceURI === selectedVoiceURI);
                if(cv) testUtt.voice = cv;
                window.speechSynthesis.speak(testUtt);
            }
        });
    }

    document.getElementById('pg-btn-key').addEventListener('click',()=>{
        document.getElementById('pg-ki').value=getKey();
        document.getElementById('pg-key-status').innerHTML='';
        document.getElementById('pg-ov').classList.add('show');
    });
    // Guardar y validar key
    document.getElementById('pg-ks').addEventListener('click',async()=>{
        const k=document.getElementById('pg-ki').value.trim();
        if(!k) return;
        setKey(k);
        const valid=await validateApiKey(k);
        if(valid){
            setTimeout(()=>{document.getElementById('pg-ov').classList.remove('show')},1500);
            addMsg('b','✅ ¡API Key válida! Conexión exitosa con Gemini. Ya puedes hacerme todas las preguntas que quieras. '+SCIENTISTS[currentSci].quotes[0]);
        }
    });
    document.getElementById('pg-kc').addEventListener('click',()=>document.getElementById('pg-ov').classList.remove('show'));
    document.getElementById('pg-ki').addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('pg-ks').click()});
    document.getElementById('pg-send').addEventListener('click',handleSend);
    document.getElementById('pg-ta').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();handleSend()}});
    document.getElementById('pg-ta').addEventListener('input',function(){this.style.height='auto';this.style.height=Math.min(this.scrollHeight,96)+'px'});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&isOpen)document.getElementById('pg-btn-x').click()});
    // Botones avanzados
    document.getElementById('pg-btn-summary').addEventListener('click',generateSummary);
    document.getElementById('pg-btn-kb').addEventListener('click', () => {
        const ta = document.getElementById('pg-ta');
        if (ta.readOnly) {
            ta.readOnly = false;
            ta.inputMode = "";
            document.getElementById('pg-btn-kb').style.color = "";
        } else {
            ta.readOnly = true;
            ta.inputMode = "none";
            document.getElementById('pg-btn-kb').style.color = "#ef4444";
        }
    });
    // Botón TTS
    document.getElementById('pg-btn-tts').addEventListener('click', () => {
        isTTSOn = !isTTSOn;
        const icon = document.querySelector('#pg-btn-tts i');
        const btn = document.getElementById('pg-btn-tts');
        if (isTTSOn) {
            icon.className = 'fa-solid fa-volume-high';
            btn.title = "Voz: Activada";
            btn.style.color = "var(--c)"; // Color primario
            addMsg('b', '🔊 Síntesis de voz **activada**. Leeré mis respuestas en voz alta.');
        } else {
            icon.className = 'fa-solid fa-volume-xmark';
            btn.title = "Voz: Desactivada";
            btn.style.color = "";
            if(window.speechSynthesis) window.speechSynthesis.cancel();
        }
    });
    document.getElementById('pg-btn-pdf').addEventListener('click',exportPDF);
    // Listener de resize para revalidar posición
    window.addEventListener('resize',()=>ensureBubbleVisible());
    window.addEventListener('orientationchange',()=>setTimeout(ensureBubbleVisible,500));
}

// ═══ MODAL NUEVA NOTA ═══
function openNoteModal(){
    const m=document.getElementById('pg-note-modal');
    if(!m) return;
    // Limpiar campos
    const titleInp=document.getElementById('pg-note-title-inp');
    const contentInp=document.getElementById('pg-note-content-inp');
    if(titleInp) titleInp.value='';
    if(contentInp) contentInp.innerHTML='';
    // Reset selección de color
    document.querySelectorAll('.pg-note-color-btn').forEach((b,i)=>{
        b.classList.toggle('sel', i===0); // amarillo por defecto
    });
    m.classList.add('show');
    setTimeout(()=>{ if(titleInp) titleInp.focus(); }, 200);
    // Eventos toolbar formato
    document.querySelectorAll('#pg-note-fmt-bar .pg-nf-btn[data-cmd]').forEach(btn=>{
        btn.onclick=(e)=>{
            e.preventDefault();
            const ci=document.getElementById('pg-note-content-inp');
            if(!ci) return;
            ci.focus();
            document.execCommand(btn.dataset.cmd, false, null);
        };
    });
    document.querySelectorAll('#pg-note-fmt-bar .pg-nf-size').forEach(btn=>{
        btn.onclick=(e)=>{
            e.preventDefault();
            const ci=document.getElementById('pg-note-content-inp');
            if(!ci) return;
            ci.focus();
            document.execCommand('fontSize', false, '7');
            ci.querySelectorAll('font[size="7"]').forEach(f=>{
                f.removeAttribute('size');
                f.style.fontSize = btn.dataset.size;
            });
        };
    });
    const colorInput=document.getElementById('pg-note-txtcolor');
    if(colorInput){
        colorInput.oninput=()=>{
            const ci=document.getElementById('pg-note-content-inp');
            if(ci){ ci.focus(); document.execCommand('foreColor', false, colorInput.value); }
        };
    }
    // Selección de color del post-it
    document.querySelectorAll('.pg-note-color-btn').forEach(b=>{
        b.onclick=()=>{
            document.querySelectorAll('.pg-note-color-btn').forEach(x=>x.classList.remove('sel'));
            b.classList.add('sel');
        };
    });
    // Placeholder comportamiento para el div contenteditable
    if(contentInp){
        const ph='Escribe el contenido de tu nota...';
        contentInp.onfocus=()=>{ if(contentInp.innerHTML===ph||contentInp.dataset.empty==='1'){ contentInp.innerHTML=''; contentInp.dataset.empty='0'; } };
        contentInp.onblur=()=>{ if(!contentInp.textContent.trim()){ contentInp.innerHTML=''; contentInp.dataset.empty='1'; } };
    }
}
document.addEventListener('click', (e)=>{
    const modal=document.getElementById('pg-note-modal');
    if(modal && modal.classList.contains('show') && e.target===modal){
        modal.classList.remove('show');
    }
});
// Eventos cancelar / guardar del modal de nueva nota (se bindean una sola vez)
(function(){
    let bound=false;
    function bindNoteModal(){
        const cancelBtn=document.getElementById('pg-note-cancel');
        const saveBtn=document.getElementById('pg-note-save');
        if(!cancelBtn||!saveBtn||bound) return;
        bound=true;
        cancelBtn.addEventListener('click',()=>document.getElementById('pg-note-modal').classList.remove('show'));
        saveBtn.addEventListener('click',()=>{
            const title=(document.getElementById('pg-note-title-inp')||{}).value||'Nota';
            const content=(document.getElementById('pg-note-content-inp')||{}).innerHTML||'';
            const selColor=document.querySelector('.pg-note-color-btn.sel');
            const color=selColor?selColor.dataset.nc:'amarillo';
            if(!content.trim()&&title.trim()==='Nota'){
                document.getElementById('pg-note-content-inp').focus();
                return;
            }
            createPostIt(color, title, content);
            document.getElementById('pg-note-modal').classList.remove('show');
        });
        // Tecla Enter en título pasa al contenido
        const titleInp=document.getElementById('pg-note-title-inp');
        if(titleInp) titleInp.addEventListener('keydown', e=>{
            if(e.key==='Enter'){ e.preventDefault(); document.getElementById('pg-note-content-inp')?.focus(); }
        });
    }
    // Intentar bindear ahora y después de que el DOM esté listo
    if(document.readyState!=='loading') setTimeout(bindNoteModal, 500);
    else document.addEventListener('DOMContentLoaded', ()=>setTimeout(bindNoteModal, 500));
})();

// ═══ ASEGURAR QUE LA BURBUJA SEA VISIBLE ═══
function ensureBubbleVisible(){
    const root=document.getElementById('pg-root');
    if(!root)return;
    const rect=root.getBoundingClientRect();
    const vw=window.innerWidth,vh=window.innerHeight;
    // Si la burbuja está fuera del viewport, resetear
    if(rect.left<-20||rect.left>vw-20||rect.top<-20||rect.top>vh-20||
       (root.style.left==='auto'&&root.style.right==='auto')){
        root.style.right='20px';root.style.bottom='20px';
        root.style.left='auto';root.style.top='auto';
        try{localStorage.removeItem('pg_bubblePos')}catch(e){}
    }
}

// ═══ POSICIONAR VENTANA DE CHAT ═══
function positionChatWindow(){
    const root=document.getElementById('pg-root');
    const win=document.getElementById('pg-win');
    const rect=root.getBoundingClientRect();
    const vw=window.innerWidth,vh=window.innerHeight;
    const winW=Math.min(400,vw-24),winH=Math.min(520,vh*0.7);
    const bubbleCenterX=rect.left+rect.width/2;
    let left,top;
    if(bubbleCenterX<vw/2){left=rect.right+10;win.style.transformOrigin='bottom left'}
    else{left=rect.left-winW-10;win.style.transformOrigin='bottom right'}
    top=rect.top-winH+60;
    left=Math.max(8,Math.min(left,vw-winW-8));
    top=Math.max(8,Math.min(top,vh-winH-8));
    win.style.left=left+'px';win.style.top=top+'px';
    win.style.right='auto';win.style.bottom='auto';
}

// ═══ MENSAJES INSPIRADORES ═══
function startInspirational(){stopInspirational();msgCounter=0}
function stopInspirational(){if(inspirationalTimer){clearInterval(inspirationalTimer);inspirationalTimer=null}}
function maybeInspire(){
    msgCounter++;
    if(msgCounter>0&&msgCounter%4===0&&chatHistory.length>2){
        const idx=Math.floor(Math.random()*INSPIRATIONAL_MSGS.length);
        setTimeout(()=>addMsg('b','✨ '+INSPIRATIONAL_MSGS[idx]),1500);
    }
}

// ═══ SISTEMA DE INTERACCIÓN PROACTIVA (ACTIVITY TRACKER) ═══
let pgLastActivity = Date.now();
let pgLastProactiveMsg = Date.now();

// Rastrear inicio de sesión/actividad
['mousemove','keydown','touchstart','scroll','click'].forEach(evt => {
    document.addEventListener(evt, () => { pgLastActivity = Date.now(); }, {passive: true});
});

// Sintetizador de un bloop elegante estilo UI emergente
function playPgBloop() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(450, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(850, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.2);
    } catch(e) {}
}

let pgBadgeTimeout = null;
function triggerProactiveDisplay(item, scName) {
    const qElem = document.getElementById('pg-quote-bubble');
    const badge  = document.getElementById('pg-badge');
    const simEl  = document.getElementById('pg-badge-sim');
    const numEl  = document.getElementById('pg-badge-num');
    const iconEl = document.getElementById('pg-quote-icon');
    const authEl = document.getElementById('pg-quote-author');
    const typEl  = document.getElementById('pg-quote-typing');
    const txtEl  = document.getElementById('pg-quote-text');
    const closeBtn = document.getElementById('pg-quote-close');
    if(!qElem || !badge) return;

    if(pgBadgeTimeout) clearTimeout(pgBadgeTimeout);

    // 1. Elegir simulación aleatoria para el badge
    const simKey = BADGE_SIM_KEYS[Math.floor(Math.random() * BADGE_SIM_KEYS.length)];
    if(simEl) simEl.innerHTML = BADGE_SIMS[simKey];
    if(numEl) {
        const badgeTexts = ['¡NUEVO!', 'MIRA ESTO', '¡DATO!', '¿SABÍAS?', 'OJO AQUÍ', 'ATENCIÓN', '1 MSG', 'SABER MÁS'];
        numEl.textContent = badgeTexts[Math.floor(Math.random() * badgeTexts.length)];
    }

    // 2. Activar badge con animación
    badge.style.display = 'flex';
    badge.style.animation = 'none';
    void badge.offsetWidth; // reflow para re-animar
    badge.style.animation = 'pgbadgepop .4s cubic-bezier(.34,1.56,.64,1)';

    // 3. Mostrar globo con efecto typing primero
    if(iconEl) iconEl.textContent = item.i || '💡';
    if(authEl) authEl.textContent = scName;
    if(txtEl)  txtEl.textContent  = '';
    if(typEl)  typEl.style.display = 'flex';
    qElem.classList.remove('hide', 'show-anim');
    void qElem.offsetWidth;
    qElem.classList.add('show-anim');

    // 4. Tras 1.4s revelar texto con fade-in
    setTimeout(() => {
        if(typEl) typEl.style.display = 'none';
        if(txtEl) {
            const rawText = item.t || item;
            txtEl.textContent = rawText;
            activeProactiveMsg = rawText;
            if(isTTSOn) speakText(rawText);
            
            txtEl.style.opacity = '0';
            txtEl.style.transition = 'opacity .5s ease';
            requestAnimationFrame(() => { txtEl.style.opacity = '1'; });
        }
    }, 1400);

    // 5. Botón de cierre del globo
    if(closeBtn) {
        closeBtn.onclick = (e) => {
            e.stopPropagation();
            qElem.classList.add('hide');
        };
    }

    // 6. Badge redirige al chat al hacer clic
    badge.onclick = () => {
        qElem.classList.add('hide');
        badge.style.display = 'none';
        const bubble = document.getElementById('pg-bubble');
        if(bubble) bubble.click();
    };

    playPgBloop();

    // 7. Auto-ocultar globo tras 15s (badge permanece visible)
    setTimeout(() => { qElem.classList.add('hide'); }, 15000);

    // 8. Auto-ocultar TODO el badge tras 120s si fue ignorado (Zen Mode)
    pgBadgeTimeout = setTimeout(() => {
        badge.style.display = 'none';
        activeProactiveMsg = null;
    }, 120000);
}

function startSpontaneousQuotes(){
    stopSpontaneousQuotes();
    // Evaluar estado cada 60 segundos
    spontaneousTimer = setInterval(() => {
        // No interrumpir si el chat está abierto o arrastrándose
        if(isOpen || isTyping || document.getElementById('pg-bubble').classList.contains('pg-dragging')) return;

        const now = Date.now();
        const inactiveTime    = now - pgLastActivity;
        const timeSinceLastMsg = now - pgLastProactiveMsg;

        // Anti-Spam: mínimo 5 minutos entre mensajes proactivos
        if(timeSinceLastMsg < 300000) return;

        const scName = SCIENTISTS[currentSci].name;
        let item = null;

        // 1. Inactividad Leve (4-10 min sin actividad): saludo personalizado
        if(inactiveTime > 240000 && inactiveTime < 600000 && Math.random() < 0.6) {
            const saludos = [
                {t:`¡Hola! ¿Todo bien por ahí, estimado estudiante? Soy ${scName} y estoy listo para ayudarte. 👋`, i:'💬', tipo:'saludo'},
                {t:`Oye, recuerda que las grandes ideas llegan cuando nos detenemos a pensar. ¿Tienes alguna duda? Pregúntame. ✨`, i:'💬', tipo:'saludo'},
                {t:`¡${scName} al rescate! Si algo de física o matemáticas te tiene confundido, aquí estoy. 🔬`, i:'💬', tipo:'saludo'},
                {t:`¿Sabías que el mejor momento para aprender es exactamente AHORA? ¡Aprovechemos! — ${scName} 🚀`, i:'💬', tipo:'saludo'}
            ];
            item = saludos[Math.floor(Math.random() * saludos.length)];
        }
        // 2. Actividad Profunda (activo >8 min sin abrir chat): dato/frase del banco
        else if(timeSinceLastMsg > 480000 && inactiveTime < 60000 && Math.random() < 0.5) {
            item = PROACTIVE_CONTENT[Math.floor(Math.random() * PROACTIVE_CONTENT.length)];
        }
        // 3. Modo aleatorio con baja probabilidad (para días largos de estudio)
        else if(timeSinceLastMsg > 600000 && Math.random() < 0.25) {
            item = PROACTIVE_CONTENT[Math.floor(Math.random() * PROACTIVE_CONTENT.length)];
        }

        if(item) {
            triggerProactiveDisplay(item, scName);
            pgLastProactiveMsg = now;
        }
    }, 60000);
}

function stopSpontaneousQuotes(){
    if(spontaneousTimer){ clearInterval(spontaneousTimer); spontaneousTimer=null; }
    const qElem = document.getElementById('pg-quote-bubble');
    if(qElem) qElem.classList.add('hide');
}

// ═══ SISTEMA DE CONTEXTO (CONTEXT-AWARE AI) ═══
function initContextObserver() {
    const topicElements = document.querySelectorAll('h2, h3, .concept-box h3, section[id], article[id]');
    if(topicElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                let text = entry.target.innerText || entry.target.textContent || "";
                text = text.split('\n')[0].substring(0, 60).trim();
                // Ignorar títulos muy cortos o irrelevantes
                if(text.length > 3 && text !== pgCurrentTopic && !text.toLowerCase().includes('simulador')) {
                    pgCurrentTopic = text;
                    pgTopicTimeSpent = 0; // Reiniciar contador local al cambiar de tema
                }
            }
        });
    }, { rootMargin: "-10% 0px -70% 0px", threshold: 0 });
    
    topicElements.forEach(el => observer.observe(el));
    
    // Timer para saber cuánto lleva en la misma sección leyendo (disparo proactivo de contexto)
    setInterval(() => {
        if(document.visibilityState === 'visible' && Date.now() - pgLastActivity < 60000) {
            if(pgCurrentTopic) pgTopicTimeSpent += 1;
            
            // Si lleva 60 segundos enfocado en un tema sin abrir el chatbot
            if(pgTopicTimeSpent === 60 && !isOpen) {
                const timeSinceLastMsg = Date.now() - pgLastProactiveMsg;
                if(timeSinceLastMsg > 180000) { // Anti-spam: Al menos 3 minutos entre MSGs proactivos
                    const msg = `Veo que llevas un buen rato estudiando **${pgCurrentTopic}**. ¿Todo claro o tienes alguna pregunta al respecto?`;
                    triggerProactiveDisplay({ t: msg, i: '👀' }, SCIENTISTS[currentSci].name);
                    pgLastProactiveMsg = Date.now();
                }
            }
        } else {
            // Pausa el contador si no está activo en la página
            pgTopicTimeSpent = Math.max(0, pgTopicTimeSpent - 1); 
        }
    }, 1000);
}

// ═══ INIT ═══
function init(){
    if(document.getElementById('pg-root'))return;
    injectCSS();build();initEvents();initCalc();initImageUpload();initSpeechRecognition();initPostItDrag();loadPostIts();
    initContextObserver();
    startSpontaneousQuotes();
    // Restaurar posición con VALIDACIÓN
    try{
        const saved=JSON.parse(localStorage.getItem('pg_bubblePos'));
        if(saved){
            const root=document.getElementById('pg-root');
            const vw=window.innerWidth,vh=window.innerHeight;
            let leftVal=parseInt(saved.left),topVal=parseInt(saved.top);
            let valid=false;
            if(!isNaN(leftVal)&&leftVal>=0&&leftVal<vw-40){
                root.style.left=leftVal+'px';root.style.right='auto';valid=true;
            }else if(saved.right&&saved.right!=='auto'){
                root.style.right=saved.right;root.style.left='auto';valid=true;
            }
            if(!isNaN(topVal)&&topVal>=0&&topVal<vh-40){
                root.style.top=topVal+'px';root.style.bottom='auto';
            }
            if(!valid){
                root.style.right='20px';root.style.bottom='20px';
                root.style.left='auto';root.style.top='auto';
            }
        }
    }catch(e){
        const root=document.getElementById('pg-root');
        if(root){root.style.right='20px';root.style.bottom='20px';root.style.left='auto';root.style.top='auto'}
    }
    // Verificar visibilidad inicial
    setTimeout(ensureBubbleVisible,1000);
    console.log('🤖 Physics Genius v4.0 cargado | Personaje: '+SCIENTISTS[currentSci].full+' | API Key: '+(hasKey()?'✅':'❌')+' | Post-its + Personalidad Inmersiva');
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
else setTimeout(init,100);
})();
