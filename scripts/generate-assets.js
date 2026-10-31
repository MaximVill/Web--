const fs = require('fs');
const path = require('path');

const memes = {
  'this-is-fine': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3d1607"/>
      <stop offset="100%" stop-color="#1f0902"/>
    </linearGradient>
    <linearGradient id="fire" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#d91e18"/>
      <stop offset="40%" stop-color="#f39c12"/>
      <stop offset="85%" stop-color="#f1c40f"/>
      <stop offset="100%" stop-color="#ffffff"/>
    </linearGradient>
  </defs>
  <!-- Background room -->
  <rect width="600" height="500" fill="url(#bg)"/>
  <rect x="0" y="380" width="600" height="120" fill="#2c1d11"/>
  
  <!-- Back Wall Flames -->
  <path d="M0,400 Q40,250 80,380 T160,320 T240,390 T320,290 T400,380 T480,260 T560,370 T600,280 L600,500 L0,500 Z" fill="url(#fire)" opacity="0.85"/>
  <path d="M0,420 Q60,180 120,390 T240,220 T360,400 T480,180 T600,390 L600,500 L0,500 Z" fill="url(#fire)" opacity="0.6"/>

  <!-- Smoke clouds -->
  <circle cx="100" cy="100" r="60" fill="#4a3b32" opacity="0.5"/>
  <circle cx="250" cy="70" r="70" fill="#4a3b32" opacity="0.5"/>
  <circle cx="450" cy="90" r="80" fill="#4a3b32" opacity="0.5"/>

  <!-- Dog Body -->
  <g transform="translate(180, 190)">
    <!-- Body -->
    <ellipse cx="120" cy="180" rx="65" ry="75" fill="#f5b041"/>
    
    <!-- Arm holding mug -->
    <path d="M70,180 Q85,210 115,205" stroke="#d68910" stroke-width="16" stroke-linecap="round" fill="none"/>
    
    <!-- Head -->
    <ellipse cx="120" cy="95" rx="55" ry="50" fill="#f5b041"/>
    <!-- Muzzle -->
    <ellipse cx="105" cy="115" rx="38" ry="25" fill="#f8c471"/>
    <!-- Nose -->
    <ellipse cx="85" cy="108" rx="9" ry="7" fill="#2c3e50"/>
    
    <!-- Ears -->
    <path d="M150,70 Q175,90 165,120 Q150,110 145,85 Z" fill="#b9770e"/>

    <!-- Eyes (wide & calm) -->
    <circle cx="100" cy="80" r="14" fill="#ffffff" stroke="#2c3e50" stroke-width="2"/>
    <circle cx="102" cy="80" r="6" fill="#2c3e50"/>
    
    <circle cx="135" cy="80" r="14" fill="#ffffff" stroke="#2c3e50" stroke-width="2"/>
    <circle cx="137" cy="80" r="6" fill="#2c3e50"/>

    <!-- Calm small smile -->
    <path d="M90,122 Q105,132 125,122" stroke="#2c3e50" stroke-width="3" fill="none" stroke-linecap="round"/>

    <!-- Hat -->
    <ellipse cx="120" cy="50" rx="35" ry="8" fill="#5d4037"/>
    <rect x="100" y="25" width="40" height="26" rx="4" fill="#6d4c41"/>
    <rect x="100" y="44" width="40" height="6" fill="#3e2723"/>

    <!-- Coffee Mug on table -->
    <rect x="50" y="195" width="32" height="35" rx="4" fill="#ecf0f1" stroke="#bdc3c7" stroke-width="2"/>
    <path d="M50,203 Q38,212 50,222" stroke="#bdc3c7" stroke-width="4" fill="none"/>
    <!-- Steam from coffee -->
    <path d="M60,190 Q65,175 60,165" stroke="#ffffff" stroke-width="2" fill="none" opacity="0.6"/>
    <path d="M72,192 Q77,180 72,170" stroke="#ffffff" stroke-width="2" fill="none" opacity="0.6"/>
  </g>

  <!-- Table -->
  <polygon points="120,410 480,410 440,460 160,460" fill="#795548"/>
  <rect x="180" y="460" width="20" height="40" fill="#5d4037"/>
  <rect x="400" y="460" width="20" height="40" fill="#5d4037"/>

  <!-- Foreground Flames -->
  <path d="M-20,520 Q50,380 90,470 T180,360 T290,480 T380,350 T480,470 T570,360 T620,490 L620,520 Z" fill="url(#fire)" opacity="0.9"/>

  <!-- Speech bubble "THIS IS FINE" -->
  <g transform="translate(380, 80)">
    <path d="M10,0 L160,0 C170,0 175,5 175,15 L175,65 C175,75 170,80 160,80 L50,80 L20,105 L30,80 L10,80 C2,80 0,75 0,65 L0,15 C0,5 2,0 10,0 Z" fill="#ffffff" stroke="#2c3e50" stroke-width="3"/>
    <text x="85" y="48" font-family="'Impact', 'Arial Black', sans-serif" font-size="22" font-weight="bold" fill="#000000" text-anchor="middle" letter-spacing="1">THIS IS FINE.</text>
  </g>
</svg>`,

  'harold': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="100%" height="100%">
  <defs>
    <linearGradient id="office-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4a5568"/>
      <stop offset="100%" stop-color="#2d3748"/>
    </linearGradient>
    <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fbd38d"/>
      <stop offset="100%" stop-color="#ed8936"/>
    </linearGradient>
  </defs>
  <!-- Background office -->
  <rect width="600" height="500" fill="url(#office-bg)"/>
  <!-- Blinds/Window -->
  <g opacity="0.15">
    <line x1="50" y1="40" x2="250" y2="40" stroke="#ffffff" stroke-width="8"/>
    <line x1="50" y1="70" x2="250" y2="70" stroke="#ffffff" stroke-width="8"/>
    <line x1="50" y1="100" x2="250" y2="100" stroke="#ffffff" stroke-width="8"/>
    <line x1="50" y1="130" x2="250" y2="130" stroke="#ffffff" stroke-width="8"/>
    <line x1="50" y1="160" x2="250" y2="160" stroke="#ffffff" stroke-width="8"/>
  </g>

  <!-- Laptop on desk -->
  <polygon points="50,460 220,460 200,380 70,380" fill="#718096"/>
  <rect x="70" y="310" width="130" height="75" rx="4" fill="#a0aec0" stroke="#4a5568" stroke-width="3"/>
  <rect x="78" y="318" width="114" height="59" fill="#2b6cb0"/>

  <!-- Harold Body (Blue Polo) -->
  <g transform="translate(180, 110)">
    <!-- Shoulders & Torso -->
    <path d="M-60,370 Q130,220 320,370 L340,390 L-80,390 Z" fill="#2b6cb0"/>
    <!-- Polo Collar -->
    <polygon points="105,245 130,290 155,245" fill="#f7fafc"/>
    <polygon points="90,240 130,270 170,240 150,220 110,220" fill="#2c5282"/>

    <!-- Neck -->
    <rect x="105" y="190" width="50" height="55" fill="#f6ad55"/>

    <!-- Head -->
    <ellipse cx="130" cy="120" rx="80" ry="95" fill="#fbd38d"/>
    <!-- Gray Hair around sides & balding top -->
    <path d="M50,110 C50,40 210,40 210,110 C220,70 200,20 130,20 C60,20 40,70 50,110 Z" fill="#e2e8f0"/>
    <path d="M48,110 Q40,140 55,160 Q65,130 55,100 Z" fill="#e2e8f0"/>
    <path d="M212,110 Q220,140 205,160 Q195,130 205,100 Z" fill="#e2e8f0"/>

    <!-- Gray Stubble / Beard -->
    <path d="M80,140 Q130,225 180,140 Q180,195 130,215 Q80,195 80,140 Z" fill="#cbd5e0" opacity="0.75"/>

    <!-- Wrinkles on forehead -->
    <path d="M95,65 Q130,55 165,65" stroke="#dd6b20" stroke-width="2" fill="none" opacity="0.6"/>
    <path d="M90,78 Q130,68 170,78" stroke="#dd6b20" stroke-width="2" fill="none" opacity="0.6"/>

    <!-- Eyebrows (worried / strained) -->
    <path d="M85,95 Q105,88 120,95" stroke="#718096" stroke-width="4" stroke-linecap="round" fill="none"/>
    <path d="M140,95 Q155,88 175,95" stroke="#718096" stroke-width="4" stroke-linecap="round" fill="none"/>

    <!-- Eyes (pain & tension) -->
    <ellipse cx="102" cy="112" rx="14" ry="10" fill="#ffffff" stroke="#7b341e" stroke-width="1.5"/>
    <circle cx="103" cy="112" r="5" fill="#4a5568"/>
    <!-- Crow's feet wrinkles -->
    <path d="M78,110 L88,112 M78,116 L88,114 M78,122 L88,117" stroke="#dd6b20" stroke-width="1.5"/>

    <ellipse cx="158" cy="112" rx="14" ry="10" fill="#ffffff" stroke="#7b341e" stroke-width="1.5"/>
    <circle cx="157" cy="112" r="5" fill="#4a5568"/>
    <path d="M182,110 L172,112 M182,116 L172,114 M182,122 L172,117" stroke="#dd6b20" stroke-width="1.5"/>

    <!-- Nose -->
    <path d="M128,105 L125,135 Q130,145 136,138" stroke="#c05621" stroke-width="2.5" fill="none"/>

    <!-- Iconic Strained Smile: Grimacing with pain -->
    <path d="M96,168 Q130,190 164,168" stroke="#742a2a" stroke-width="3" fill="#ffffff"/>
    <line x1="96" y1="168" x2="164" y2="168" stroke="#742a2a" stroke-width="2"/>
    <path d="M90,165 Q96,168 93,176" stroke="#c05621" stroke-width="2" fill="none"/>
    <path d="M170,165 Q164,168 167,176" stroke="#c05621" stroke-width="2" fill="none"/>

    <!-- Mug in hand (holding cup of coffee) -->
    <g transform="translate(180, 240)">
      <rect x="0" y="0" width="60" height="75" rx="6" fill="#f7fafc" stroke="#cbd5e0" stroke-width="3"/>
      <path d="M60,15 Q80,35 60,55" stroke="#cbd5e0" stroke-width="8" fill="none"/>
      <!-- Fingers wrapped around mug -->
      <ellipse cx="5" cy="20" rx="10" ry="7" fill="#fbd38d"/>
      <ellipse cx="5" cy="36" rx="10" ry="7" fill="#fbd38d"/>
      <ellipse cx="5" cy="52" rx="10" ry="7" fill="#fbd38d"/>
    </g>
  </g>
  
  <text x="300" y="475" font-family="'Impact', 'Arial Black', sans-serif" font-size="28" fill="#ffffff" stroke="#000000" stroke-width="2" text-anchor="middle" letter-spacing="1">ВСЁ ПОД КОНТРОЛЕМ (НЕТ)</text>
</svg>`,

  'drake': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <!-- Two Panel Split -->
  <line x1="0" y1="300" x2="600" y2="300" stroke="#1a202c" stroke-width="6"/>
  <line x1="300" y1="0" x2="300" y2="600" stroke="#1a202c" stroke-width="6"/>

  <!-- TOP LEFT: Drake Disapproves -->
  <rect x="0" y="0" width="300" height="300" fill="#f6ad55"/>
  <g transform="translate(20, 20)">
    <!-- Orange Jacket body turned away -->
    <path d="M30,280 Q70,140 210,160 L230,280 Z" fill="#dd6b20"/>
    <!-- Hand pushing away -->
    <path d="M170,130 Q220,110 240,150 Q230,190 190,180" fill="#8c532b"/>
    <!-- Hand palm turned to viewer -->
    <circle cx="235" cy="135" r="22" fill="#8c532b"/>
    <rect x="225" y="105" width="8" height="25" rx="4" fill="#8c532b"/>
    <rect x="236" y="102" width="8" height="28" rx="4" fill="#8c532b"/>
    <rect x="247" y="107" width="8" height="25" rx="4" fill="#8c532b"/>
    <!-- Head looking away/down in disgust -->
    <ellipse cx="110" cy="95" rx="48" ry="55" fill="#8c532b"/>
    <!-- Hair & Beard -->
    <path d="M70,85 C65,45 155,45 155,85" stroke="#1a202c" stroke-width="12" fill="none"/>
    <path d="M75,100 Q110,165 145,100" stroke="#1a202c" stroke-width="10" fill="none"/>
    <!-- Closed displeased eyes & grimace -->
    <path d="M85,90 Q95,98 105,92" stroke="#1a202c" stroke-width="3" fill="none"/>
    <path d="M120,90 Q130,98 140,92" stroke="#1a202c" stroke-width="3" fill="none"/>
    <path d="M98,125 Q115,115 130,122" stroke="#2d3748" stroke-width="4" fill="none"/>
  </g>

  <!-- TOP RIGHT: Blank / Placeholder area for text -->
  <rect x="300" y="0" width="300" height="300" fill="#edf2f7"/>
  <text x="450" y="140" font-family="'Impact', sans-serif" font-size="28" fill="#a0aec0" text-anchor="middle">❌ НЕТ</text>

  <!-- BOTTOM LEFT: Drake Approves -->
  <rect x="0" y="300" width="300" height="300" fill="#f6ad55"/>
  <g transform="translate(20, 320)">
    <!-- Orange Jacket body pointing -->
    <path d="M30,280 Q90,130 220,150 L230,280 Z" fill="#dd6b20"/>
    <!-- Head smiling toward viewer -->
    <ellipse cx="120" cy="85" rx="48" ry="55" fill="#8c532b"/>
    <!-- Hair & Beard -->
    <path d="M80,75 C75,35 165,35 165,75" stroke="#1a202c" stroke-width="12" fill="none"/>
    <path d="M85,90 Q120,155 155,90" stroke="#1a202c" stroke-width="10" fill="none"/>
    <!-- Happy Eyes -->
    <circle cx="105" cy="80" r="4" fill="#1a202c"/>
    <circle cx="138" cy="80" r="4" fill="#1a202c"/>
    <path d="M98,72 Q106,68 114,72" stroke="#1a202c" stroke-width="2.5" fill="none"/>
    <path d="M130,72 Q138,68 146,72" stroke="#1a202c" stroke-width="2.5" fill="none"/>
    <!-- Big satisfied smile with teeth -->
    <path d="M105,108 Q122,126 142,108 Z" fill="#ffffff" stroke="#1a202c" stroke-width="2"/>
    <!-- Pointing finger hand -->
    <g transform="translate(185, 120)">
      <circle cx="15" cy="20" r="18" fill="#8c532b"/>
      <!-- Pointing index finger -->
      <rect x="20" y="12" width="35" height="12" rx="6" fill="#8c532b"/>
    </g>
  </g>

  <!-- BOTTOM RIGHT: Blank / Placeholder area for text -->
  <rect x="300" y="300" width="300" height="300" fill="#ffffff"/>
  <text x="450" y="460" font-family="'Impact', sans-serif" font-size="28" fill="#38a169" text-anchor="middle">👉 ВОТ ЭТО ДА!</text>
</svg>`,

  'roll-safe': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="100%" height="100%">
  <!-- Background -->
  <rect width="600" height="500" fill="#2d3748"/>
  <circle cx="300" cy="250" r="230" fill="#4a5568" opacity="0.4"/>

  <!-- Kayode Ewumi (Roll Safe) -->
  <g transform="translate(150, 80)">
    <!-- Black Leather Jacket -->
    <path d="M-40,420 Q150,220 340,420 Z" fill="#1a202c"/>
    <path d="M70,300 L150,420 L230,300" stroke="#2d3748" stroke-width="6" fill="none"/>

    <!-- Neck -->
    <rect x="120" y="210" width="60" height="60" fill="#5c3826"/>
    <!-- Gold Chain -->
    <path d="M110,240 Q150,280 190,240" stroke="#ecc94b" stroke-width="5" fill="none"/>

    <!-- Head -->
    <ellipse cx="150" cy="130" rx="75" ry="90" fill="#5c3826"/>
    <!-- Short black hair -->
    <path d="M80,110 C80,35 220,35 220,110" stroke="#171923" stroke-width="16" fill="none"/>

    <!-- Eyebrows -->
    <path d="M100,105 Q120,95 135,108" stroke="#171923" stroke-width="4" fill="none"/>
    <path d="M165,108 Q180,95 200,105" stroke="#171923" stroke-width="4" fill="none"/>

    <!-- Eyes (clever side glance & smile) -->
    <ellipse cx="120" cy="120" rx="13" ry="9" fill="#ffffff"/>
    <circle cx="125" cy="120" r="5" fill="#171923"/>

    <ellipse cx="180" cy="120" rx="13" ry="9" fill="#ffffff"/>
    <circle cx="185" cy="120" r="5" fill="#171923"/>

    <!-- Nose -->
    <ellipse cx="150" cy="148" rx="14" ry="10" fill="#442819"/>

    <!-- Knowing smirk smile -->
    <path d="M120,178 Q150,205 190,172" stroke="#171923" stroke-width="4" fill="#ffffff"/>

    <!-- Hand tapping temple -->
    <g transform="translate(195, 75)">
      <!-- Arm coming up -->
      <path d="M50,150 Q70,90 20,40" stroke="#5c3826" stroke-width="26" stroke-linecap="round" fill="none"/>
      <!-- Hand -->
      <circle cx="15" cy="35" r="20" fill="#5c3826"/>
      <!-- Index finger pointing at temple -->
      <path d="M15,35 L-25,45" stroke="#5c3826" stroke-width="14" stroke-linecap="round"/>
    </g>
  </g>
  
  <text x="300" y="470" font-family="'Impact', 'Arial Black', sans-serif" font-size="26" fill="#ffffff" stroke="#000000" stroke-width="2" text-anchor="middle">ГЕНИАЛЬНО, ЕСЛИ ПОДУМАТЬ</text>
</svg>`,

  'pikachu': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="100%" height="100%">
  <!-- Background -->
  <rect width="600" height="500" fill="#2c5282"/>
  <circle cx="300" cy="270" r="220" fill="#3182ce" opacity="0.3"/>

  <!-- Surprised Pikachu -->
  <g transform="translate(150, 50)">
    <!-- Ears -->
    <!-- Left ear -->
    <path d="M80,140 L-10,10 Q-30,0 -20,30 L40,160 Z" fill="#ecc94b"/>
    <path d="M-10,10 Q-30,0 -20,30 L5,45 Z" fill="#1a202c"/>

    <!-- Right ear -->
    <path d="M220,140 L310,10 Q330,0 320,30 L260,160 Z" fill="#ecc94b"/>
    <path d="M310,10 Q330,0 320,30 L295,45 Z" fill="#1a202c"/>

    <!-- Body -->
    <ellipse cx="150" cy="320" rx="140" ry="110" fill="#ecc94b"/>

    <!-- Head -->
    <ellipse cx="150" cy="210" rx="115" ry="105" fill="#ecc94b"/>

    <!-- Eyes (wide open, shocked) -->
    <circle cx="100" cy="185" r="22" fill="#1a202c"/>
    <circle cx="106" cy="180" r="8" fill="#ffffff"/>

    <circle cx="200" cy="185" r="22" fill="#1a202c"/>
    <circle cx="206" cy="180" r="8" fill="#ffffff"/>

    <!-- Red Cheeks -->
    <circle cx="65" cy="235" r="25" fill="#e53e3e"/>
    <circle cx="235" cy="235" r="25" fill="#e53e3e"/>

    <!-- Tiny cute nose -->
    <polygon points="146,215 154,215 150,222" fill="#1a202c"/>

    <!-- Iconic O-shaped open mouth of utter shock :O -->
    <ellipse cx="150" cy="255" rx="22" ry="30" fill="#742a2a"/>
    <ellipse cx="150" cy="265" rx="14" ry="12" fill="#e53e3e"/>
  </g>
  
  <text x="300" y="475" font-family="'Impact', 'Arial Black', sans-serif" font-size="30" fill="#ffffff" stroke="#000000" stroke-width="2" text-anchor="middle">:О ВНЕЗАПНО :О</text>
</svg>`,

  'monkey-puppet': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="100%" height="100%">
  <!-- Split into 2 frames: looking forward, then looking away -->
  <line x1="300" y1="0" x2="300" y2="500" stroke="#1a202c" stroke-width="6"/>

  <!-- LEFT FRAME: Looking Forward -->
  <rect x="0" y="0" width="300" height="500" fill="#805ad5"/>
  <g transform="translate(30, 100)">
    <!-- Torso -->
    <path d="M30,350 Q120,230 210,350 Z" fill="#d69e2e"/>
    <!-- Head -->
    <circle cx="120" cy="180" r="95" fill="#d69e2e"/>
    <!-- Muzzle / Face -->
    <ellipse cx="120" cy="195" rx="70" ry="60" fill="#fbd38d"/>
    <!-- Big wide eyes looking straight -->
    <ellipse cx="90" cy="170" rx="22" ry="26" fill="#ffffff" stroke="#1a202c" stroke-width="3"/>
    <circle cx="90" cy="170" r="10" fill="#1a202c"/>

    <ellipse cx="150" cy="170" rx="22" ry="26" fill="#ffffff" stroke="#1a202c" stroke-width="3"/>
    <circle cx="150" cy="170" r="10" fill="#1a202c"/>

    <!-- Small nose & neutral straight mouth -->
    <circle cx="115" cy="205" r="3" fill="#1a202c"/>
    <circle cx="125" cy="205" r="3" fill="#1a202c"/>
    <line x1="105" y1="225" x2="135" y2="225" stroke="#1a202c" stroke-width="3" stroke-linecap="round"/>
  </g>

  <!-- RIGHT FRAME: Awkward Side Glance -->
  <rect x="300" y="0" width="300" height="500" fill="#805ad5"/>
  <g transform="translate(330, 100)">
    <!-- Torso -->
    <path d="M30,350 Q120,230 210,350 Z" fill="#d69e2e"/>
    <!-- Head -->
    <circle cx="120" cy="180" r="95" fill="#d69e2e"/>
    <!-- Muzzle / Face -->
    <ellipse cx="120" cy="195" rx="70" ry="60" fill="#fbd38d"/>
    <!-- Eyes looking way off to the side (awkward avoidance) -->
    <ellipse cx="90" cy="170" rx="22" ry="26" fill="#ffffff" stroke="#1a202c" stroke-width="3"/>
    <circle cx="106" cy="170" r="10" fill="#1a202c"/>

    <ellipse cx="150" cy="170" rx="22" ry="26" fill="#ffffff" stroke="#1a202c" stroke-width="3"/>
    <circle cx="166" cy="170" r="10" fill="#1a202c"/>

    <!-- Small tense mouth -->
    <circle cx="115" cy="205" r="3" fill="#1a202c"/>
    <circle cx="125" cy="205" r="3" fill="#1a202c"/>
    <line x1="108" y1="225" x2="132" y2="225" stroke="#1a202c" stroke-width="3" stroke-linecap="round"/>
  </g>

  <rect x="0" y="440" width="600" height="60" fill="#1a202c" opacity="0.9"/>
  <text x="300" y="480" font-family="'Impact', 'Arial Black', sans-serif" font-size="24" fill="#ffffff" text-anchor="middle">ДЕЛАЕМ ВИД, ЧТО НАС ЗДЕСЬ НЕТ</text>
</svg>`,

  'gatsby': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="100%" height="100%">
  <defs>
    <radialGradient id="bokeh" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ecc94b" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#744210" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="night" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1a202c"/>
      <stop offset="100%" stop-color="#2d3748"/>
    </linearGradient>
  </defs>

  <rect width="600" height="500" fill="url(#night)"/>

  <!-- Bokeh fireworks -->
  <circle cx="100" cy="120" r="80" fill="url(#bokeh)"/>
  <circle cx="480" cy="100" r="110" fill="url(#bokeh)"/>
  <circle cx="320" cy="80" r="60" fill="url(#bokeh)"/>

  <!-- Leonardo DiCaprio / Gatsby Body -->
  <g transform="translate(160, 100)">
    <!-- Tuxedo Jacket -->
    <path d="M-40,380 Q140,210 320,380 Z" fill="#171923"/>
    <!-- White shirt & bowtie -->
    <polygon points="110,230 140,310 170,230" fill="#f7fafc"/>
    <polygon points="120,235 140,245 120,255" fill="#1a202c"/>
    <polygon points="160,235 140,245 160,255" fill="#1a202c"/>
    <circle cx="140" cy="245" r="4" fill="#1a202c"/>

    <!-- Head -->
    <ellipse cx="140" cy="130" rx="65" ry="80" fill="#fbd38d"/>
    <!-- Slicked back blonde hair -->
    <path d="M75,120 C70,40 210,40 205,120 C205,70 190,45 140,45 C90,45 75,70 75,120 Z" fill="#d69e2e"/>

    <!-- Confident Charming Eyes -->
    <ellipse cx="118" cy="122" rx="12" ry="7" fill="#ffffff"/>
    <circle cx="120" cy="122" r="4" fill="#2b6cb0"/>

    <ellipse cx="162" cy="122" rx="12" ry="7" fill="#ffffff"/>
    <circle cx="164" cy="122" r="4" fill="#2b6cb0"/>

    <!-- Goatee / slight beard -->
    <path d="M125,185 Q140,195 155,185" stroke="#b7791f" stroke-width="3" fill="none"/>

    <!-- Charming Smile -->
    <path d="M118,165 Q140,185 162,165" stroke="#742a2a" stroke-width="3" fill="#ffffff"/>

    <!-- Arm raising champagne coupe -->
    <g transform="translate(190, 140)">
      <path d="M20,120 Q60,70 50,0" stroke="#171923" stroke-width="32" stroke-linecap="round" fill="none"/>
      <!-- Hand holding stem -->
      <ellipse cx="50" cy="0" rx="14" ry="12" fill="#fbd38d"/>
      <!-- Champagne Coupe glass -->
      <path d="M20,-45 Q50,-10 80,-45 Z" fill="#ecc94b" opacity="0.8" stroke="#ffffff" stroke-width="2"/>
      <line x1="50" y1="-10" x2="50" y2="20" stroke="#ffffff" stroke-width="3"/>
      <ellipse cx="50" cy="20" rx="16" ry="5" fill="#ffffff" opacity="0.6"/>
      <!-- Bubbles -->
      <circle cx="45" cy="-30" r="3" fill="#ffffff"/>
      <circle cx="55" cy="-25" r="2" fill="#ffffff"/>
      <circle cx="50" cy="-40" r="2.5" fill="#ffffff"/>
    </g>
  </g>

  <text x="300" y="475" font-family="'Impact', 'Arial Black', sans-serif" font-size="28" fill="#ecc94b" stroke="#000000" stroke-width="2" text-anchor="middle">ЗА ТЕБЯ И ТВОЙ ВЫБОР!</text>
</svg>`,

  'woman-cat': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="100%" height="100%">
  <!-- Split screen: Left screaming woman, Right cat at table -->
  <line x1="300" y1="0" x2="300" y2="500" stroke="#1a202c" stroke-width="6"/>

  <!-- LEFT: Woman yelling and pointing -->
  <rect x="0" y="0" width="300" height="500" fill="#cbd5e0"/>
  <g transform="translate(10, 60)">
    <!-- Blonde hair -->
    <path d="M20,130 C10,30 180,20 180,130 Q200,280 160,330 L50,330 Q0,260 20,130 Z" fill="#ecc94b"/>
    <!-- Head -->
    <ellipse cx="100" cy="140" rx="50" ry="60" fill="#fbd38d"/>
    <!-- Crying / angry eyes -->
    <path d="M75,125 Q90,118 100,128" stroke="#742a2a" stroke-width="3" fill="none"/>
    <path d="M78,132 L68,155" stroke="#3182ce" stroke-width="3"/> <!-- tear -->
    <path d="M110,128 Q120,118 135,125" stroke="#742a2a" stroke-width="3" fill="none"/>
    <path d="M128,132 L138,155" stroke="#3182ce" stroke-width="3"/> <!-- tear -->
    <!-- Screaming mouth -->
    <ellipse cx="105" cy="170" rx="22" ry="18" fill="#742a2a"/>
    <path d="M90,165 Q105,172 120,165" stroke="#ffffff" stroke-width="4"/>

    <!-- Pointing Finger hand -->
    <g transform="translate(150, 180)">
      <path d="M0,80 Q50,40 100,20" stroke="#fbd38d" stroke-width="20" stroke-linecap="round" fill="none"/>
      <line x1="90" y1="20" x2="135" y2="15" stroke="#fbd38d" stroke-width="12" stroke-linecap="round"/>
    </g>
  </g>

  <!-- RIGHT: Confused white cat (Smudge) sitting behind salad plate -->
  <rect x="300" y="0" width="300" height="500" fill="#2d3748"/>
  <!-- Restaurant table -->
  <rect x="300" y="320" width="300" height="180" fill="#4a5568"/>
  <!-- Salad plate -->
  <ellipse cx="450" cy="350" rx="70" ry="22" fill="#ffffff" stroke="#cbd5e0" stroke-width="2"/>
  <!-- Green salad leaves -->
  <circle cx="430" cy="346" r="14" fill="#38a169"/>
  <circle cx="460" cy="344" r="16" fill="#48bb78"/>
  <circle cx="445" cy="348" r="10" fill="#68d391"/>

  <!-- Smudge the Cat -->
  <g transform="translate(370, 140)">
    <!-- Cat Ears -->
    <polygon points="50,70 20,10 75,50" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <polygon points="40,60 26,22 65,48" fill="#fed7d7"/>

    <polygon points="110,50 165,10 135,70" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    <polygon points="120,48 159,22 145,60" fill="#fed7d7"/>

    <!-- Cat Head -->
    <ellipse cx="90" cy="100" rx="60" ry="50" fill="#ffffff"/>

    <!-- Confused / Squinting Eyes -->
    <ellipse cx="65" cy="95" rx="12" ry="7" fill="#ecc94b" stroke="#2d3748" stroke-width="2"/>
    <line x1="65" y1="88" x2="65" y2="102" stroke="#1a202c" stroke-width="3"/>

    <ellipse cx="115" cy="95" rx="12" ry="7" fill="#ecc94b" stroke="#2d3748" stroke-width="2"/>
    <line x1="115" y1="88" x2="115" y2="102" stroke="#1a202c" stroke-width="3"/>

    <!-- Pink nose & confused flat mouth -->
    <polygon points="86,112 94,112 90,118" fill="#f687b3"/>
    <line x1="82" y1="124" x2="98" y2="124" stroke="#4a5568" stroke-width="2"/>

    <!-- Whiskers -->
    <line x1="50" y1="110" x2="15" y2="105" stroke="#cbd5e0" stroke-width="2"/>
    <line x1="50" y1="118" x2="15" y2="125" stroke="#cbd5e0" stroke-width="2"/>
    <line x1="130" y1="110" x2="165" y2="105" stroke="#cbd5e0" stroke-width="2"/>
    <line x1="130" y1="118" x2="165" y2="125" stroke="#cbd5e0" stroke-width="2"/>
  </g>

  <rect x="0" y="440" width="600" height="60" fill="#1a202c" opacity="0.85"/>
  <text x="300" y="480" font-family="'Impact', 'Arial Black', sans-serif" font-size="24" fill="#ffffff" text-anchor="middle">НЕПОНИМАНИЕ ДОСТИГЛО ПИКА</text>
</svg>`,

  'fry': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="100%" height="100%">
  <!-- Background -->
  <rect width="600" height="500" fill="#2b6cb0"/>
  <circle cx="300" cy="250" r="220" fill="#3182ce" opacity="0.4"/>

  <!-- Philip J. Fry -->
  <g transform="translate(150, 70)">
    <!-- Red Jacket -->
    <path d="M-30,410 Q150,230 330,410 Z" fill="#e53e3e"/>
    <!-- White T-shirt collar -->
    <ellipse cx="150" cy="255" rx="35" ry="15" fill="#ffffff"/>

    <!-- Neck -->
    <rect x="125" y="195" width="50" height="55" fill="#fbd38d"/>

    <!-- Head -->
    <ellipse cx="150" cy="130" rx="70" ry="80" fill="#fbd38d"/>

    <!-- Iconic messy Orange Hair -->
    <path d="M80,120 C70,30 140,10 180,30 C220,10 240,60 220,120 C240,80 230,40 190,40 C140,25 90,60 80,120 Z" fill="#dd6b20"/>
    <path d="M170,30 Q200,-10 215,20 Z" fill="#dd6b20"/>

    <!-- Squinting suspicious eyes (Not sure if...) -->
    <!-- Left eye slit -->
    <path d="M100,125 Q120,115 135,123 Q120,130 100,125 Z" fill="#ffffff" stroke="#1a202c" stroke-width="2"/>
    <circle cx="120" cy="123" r="3" fill="#1a202c"/>

    <!-- Right eye slit -->
    <path d="M165,123 Q180,115 200,125 Q180,130 165,123 Z" fill="#ffffff" stroke="#1a202c" stroke-width="2"/>
    <circle cx="180" cy="123" r="3" fill="#1a202c"/>

    <!-- Eyebrows lowered in doubt -->
    <path d="M98,112 L136,118" stroke="#c05621" stroke-width="4" stroke-linecap="round"/>
    <path d="M164,118 L202,112" stroke="#c05621" stroke-width="4" stroke-linecap="round"/>

    <!-- Nose -->
    <path d="M148,125 L142,148 L154,148" stroke="#c05621" stroke-width="3" fill="none" stroke-linejoin="round"/>

    <!-- Skeptical mouth -->
    <line x1="125" y1="175" x2="175" y2="175" stroke="#742a2a" stroke-width="3" stroke-linecap="round"/>
  </g>

  <text x="300" y="475" font-family="'Impact', 'Arial Black', sans-serif" font-size="28" fill="#ffffff" stroke="#000000" stroke-width="2" text-anchor="middle">ТО ЛИ ПРАВДА, ТО ЛИ ПОДВОХ...</text>
</svg>`,

  'distracted-boyfriend': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="100%" height="100%">
  <!-- Background outdoor street -->
  <rect width="600" height="500" fill="#e2e8f0"/>
  <rect x="0" y="380" width="600" height="120" fill="#a0aec0"/>

  <!-- 1. Girl in Red (walking away on left, looking over shoulder) -->
  <g transform="translate(70, 130)">
    <path d="M20,300 Q60,180 80,300 Z" fill="#e53e3e"/> <!-- Red dress -->
    <circle cx="50" cy="110" r="32" fill="#fbd38d"/>
    <!-- Brunette hair flowing -->
    <path d="M20,90 Q60,60 70,140 Q40,160 20,90 Z" fill="#4a5568"/>
  </g>

  <!-- 2. Boyfriend in Middle (plaid shirt, head snapped back to left!) -->
  <g transform="translate(250, 100)">
    <!-- Body walking forward right, head twisted 180 degrees left -->
    <path d="M20,350 Q90,190 140,350 Z" fill="#3182ce"/>
    <!-- Blue checked pattern lines -->
    <line x1="50" y1="240" x2="110" y2="340" stroke="#2b6cb0" stroke-width="4"/>
    <line x1="80" y1="220" x2="140" y2="320" stroke="#2b6cb0" stroke-width="4"/>

    <!-- Head turned way back -->
    <ellipse cx="60" cy="110" rx="38" ry="42" fill="#fbd38d"/>
    <path d="M25,90 C30,50 95,50 95,90" stroke="#2d3748" stroke-width="12" fill="none"/>

    <!-- Mesmerized open eyes looking at girl in red -->
    <ellipse cx="45" cy="108" rx="8" ry="7" fill="#ffffff" stroke="#1a202c"/>
    <circle cx="43" cy="108" r="4" fill="#1a202c"/>
    <!-- Dumb impressed mouth :O -->
    <ellipse cx="46" cy="126" rx="6" ry="8" fill="#742a2a"/>
  </g>

  <!-- 3. Girlfriend on Right (walking holding his hand, outraged expression!) -->
  <g transform="translate(430, 110)">
    <path d="M30,340 Q70,200 110,340 Z" fill="#38a169"/> <!-- Cyan/green top -->
    <ellipse cx="70" cy="115" rx="36" ry="40" fill="#fbd38d"/>
    <!-- Blonde hair -->
    <path d="M35,95 C40,55 105,55 105,95 Q115,160 85,170" fill="#ecc94b"/>

    <!-- Angry offended stare at boyfriend -->
    <ellipse cx="55" cy="115" rx="7" ry="6" fill="#ffffff" stroke="#1a202c"/>
    <circle cx="53" cy="115" r="3" fill="#1a202c"/>
    <!-- Furious angled eyebrow -->
    <line x1="45" y1="104" x2="62" y2="110" stroke="#742a2a" stroke-width="3"/>
    <!-- Shocked/disgusted frown -->
    <path d="M48,135 Q56,128 65,135" stroke="#742a2a" stroke-width="3" fill="none"/>
  </g>

  <rect x="0" y="440" width="600" height="60" fill="#1a202c" opacity="0.9"/>
  <text x="300" y="480" font-family="'Impact', 'Arial Black', sans-serif" font-size="24" fill="#ffffff" text-anchor="middle">КОГДА ПОЯВИЛОСЬ ЧТО-ТО ПОИНТЕРЕСНЕЕ</text>
</svg>`
};

const stickers = {
  'thug-glasses': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
  <path d="M10,15 H90 V45 H70 V35 H30 V45 H10 Z M110,15 H190 V45 H170 V35 H130 V45 H110 Z M90,20 H110 V28 H90 Z" fill="#000000"/>
  <rect x="20" y="20" width="10" height="6" fill="#ffffff"/>
  <rect x="30" y="26" width="10" height="6" fill="#ffffff"/>
  <rect x="120" y="20" width="10" height="6" fill="#ffffff"/>
  <rect x="130" y="26" width="10" height="6" fill="#ffffff"/>
</svg>`,

  'cap': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100" width="160" height="100">
  <!-- Backward cap -->
  <path d="M30,70 C30,25 130,25 130,70 Z" fill="#e53e3e"/>
  <path d="M10,70 L40,65 L40,78 Z" fill="#9b2c2c"/>
  <ellipse cx="80" cy="30" rx="6" ry="3" fill="#ffffff"/>
  <path d="M30,70 Q80,82 130,70" stroke="#9b2c2c" stroke-width="4" fill="none"/>
</svg>`,

  'question': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" width="100" height="120">
  <text x="50" y="90" font-family="'Impact', 'Arial Black', sans-serif" font-size="110" font-weight="bold" fill="#e53e3e" stroke="#ffffff" stroke-width="6" text-anchor="middle">?</text>
</svg>`,

  'fire': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" width="100" height="120">
  <path d="M50,10 C65,35 90,60 90,85 C90,110 70,120 50,120 C30,120 10,110 10,85 C10,65 30,45 35,30 C40,50 45,60 50,10 Z" fill="#dd6b20"/>
  <path d="M50,45 C60,60 75,75 75,95 C75,110 65,115 50,115 C35,115 25,110 25,95 C25,80 40,65 50,45 Z" fill="#ecc94b"/>
</svg>`,

  'clown-nose': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="40" fill="#e53e3e"/>
  <ellipse cx="38" cy="36" rx="10" ry="6" fill="#ffffff" opacity="0.8"/>
</svg>`
};

for (const [name, content] of Object.entries(memes)) {
  fs.writeFileSync(path.join(__dirname, '..', 'assets', 'memes', name + '.svg'), content.trim(), 'utf8');
}

for (const [name, content] of Object.entries(stickers)) {
  fs.writeFileSync(path.join(__dirname, '..', 'assets', 'stickers', name + '.svg'), content.trim(), 'utf8');
}

console.log('Successfully generated ' + Object.keys(memes).length + ' memes and ' + Object.keys(stickers).length + ' stickers!');
