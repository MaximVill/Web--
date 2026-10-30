<script setup>
import { computed } from 'vue'
import MonsterFigure from './MonsterFigure.vue'
import { MONSTER_BY_ID } from '../../data/monsters.js'

const props = defineProps({
  resident: { type: Object, required: true },
  phase: { type: String, required: true },
  view: { type: String, required: true }, // masked | real | human | closed
  talking: { type: Boolean, default: false },
  flash: { type: Boolean, default: false },
  mood: { type: String, default: 'calm' },
})

const open = computed(() => props.phase === 'talk' || (props.phase === 'result' && props.view !== 'closed'))
const slammed = computed(() => props.phase === 'result' && props.view === 'closed')
const clueSvg = computed(() => MONSTER_BY_ID[props.resident.monsterId].clues[props.resident.clueIdx].svg)
const costume = computed(() => props.resident.look === 'costume')
const figureMode = computed(() => {
  if (props.view === 'real') return 'real'
  if (costume.value) return 'costume'
  return props.view === 'human' ? 'unmasked' : 'masked'
})
const figureMood = computed(() => (props.view === 'human' ? 'angry' : props.mood))

// Дом снаружи немного отличается от двери к двери, но никак не связан с тем, кто внутри
const PALETTES = [
  { wall: '#4d6795', line: '#3c5280', door: '#7a3a2a' },
  { wall: '#5b5f8f', line: '#474a78', door: '#2f5a4a' },
  { wall: '#46708a', line: '#365a72', door: '#6a2f5a' },
  { wall: '#6a5a86', line: '#544770', door: '#7a5a2a' },
]
const pal = computed(() => PALETTES[props.resident.variant % PALETTES.length])
const boards = Array.from({ length: 19 }, (_, i) => 52 + i * 11.5)
const planks = [-120, -40, 40, 120, 200, 280, 360, 440, 520]
</script>

<template>
  <div class="scene" :class="{ open }">
    <!-- 1. Фасад, крыльцо, окна -->
    <svg class="layer" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="ds-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#0a1740" /><stop offset="1" stop-color="#21508a" />
        </linearGradient>
        <linearGradient id="ds-moonlit" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#bfe3ff" stop-opacity=".22" /><stop offset=".6" stop-color="#bfe3ff" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="ds-under" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#050a1c" stop-opacity=".75" /><stop offset="1" stop-color="#050a1c" stop-opacity="0" />
        </linearGradient>
        <radialGradient id="ds-win" cx=".5" cy=".55" r=".6">
          <stop offset="0" stop-color="#fff2a8" /><stop offset="1" stop-color="#f0a83a" />
        </radialGradient>
        <radialGradient id="ds-lamp" cx=".5" cy=".5" r=".5">
          <stop offset="0" stop-color="#ffe9a0" stop-opacity=".8" /><stop offset="1" stop-color="#ffe9a0" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="ds-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#2a3560" /><stop offset="1" stop-color="#46588a" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#ds-sky)" />
      <!-- стена с вагонкой -->
      <rect y="40" width="400" height="224" :fill="pal.wall" />
      <path v-for="y in boards" :key="y" :d="`M0 ${y} H400`" :stroke="pal.line" stroke-width="2.5" />
      <rect y="40" width="400" height="224" fill="url(#ds-moonlit)" />
      <!-- окна -->
      <g v-for="x in [24, 298]" :key="x" stroke="#15121c" stroke-width="3" stroke-linejoin="round">
        <rect :x="x - 6" y="84" width="90" height="124" fill="#c9d6ea" />
        <rect :x="x" y="92" width="78" height="108" fill="url(#ds-win)" />
        <path :d="`M${x} 92 q20 40 8 108 h-8z M${x + 78} 92 q-20 40 -8 108 h8z`" fill="#8a2a3a" />
        <path :d="`M${x + 39} 92 V200 M${x} 140 H${x + 78}`" fill="none" stroke-width="4" />
        <rect :x="x - 10" y="206" width="98" height="8" fill="#c9d6ea" />
      </g>
      <!-- силуэт в окне -->
      <path d="M326 200 q2 -28 14 -30 q-8 -6 -6 -16 q2 -12 12 -12 q10 0 12 12 q2 10 -6 16 q12 2 14 30z" fill="#15121c" opacity=".55" />
      <!-- фонарь у двери -->
      <circle cx="282" cy="118" r="44" fill="url(#ds-lamp)" class="lampglow" />
      <g stroke="#15121c" stroke-width="3" stroke-linejoin="round">
        <path d="M272 100 h20 l-4 -8 h-12z" fill="#2a2a36" />
        <rect x="274" y="100" width="16" height="26" fill="#ffe36b" />
        <path d="M282 100 V126 M274 113 H290" stroke-width="2" />
        <path d="M270 126 h24 l-4 6 h-16z" fill="#2a2a36" />
        <path d="M262 112 h12" />
      </g>
      <!-- фрамуга над дверью -->
      <path d="M146 66 Q200 34 254 66Z" fill="url(#ds-win)" stroke="#15121c" stroke-width="3" />
      <path d="M200 40 V66 M172 50 L186 66 M228 50 L214 66" stroke="#15121c" stroke-width="2.5" />
      <!-- навес крыльца -->
      <rect width="400" height="40" fill="#1c2852" />
      <rect y="28" width="400" height="14" fill="#2a3a6e" stroke="#15121c" stroke-width="3" />
      <path d="M0 18 H400" stroke="#15121c" stroke-width="2" opacity=".5" />
      <rect y="42" width="400" height="34" fill="url(#ds-under)" />
      <!-- пол крыльца -->
      <path d="M0 262 H400 V300 H0Z" fill="url(#ds-floor)" stroke="#15121c" stroke-width="3" />
      <path v-for="x in planks" :key="x" :d="`M${200 + (x - 200) * 0.35} 262 L${x} 300`" stroke="#1c2650" stroke-width="2" />
      <!-- полоса тёплого света из открытой двери -->
      <path class="spill" d="M140 262 H260 L330 300 H70Z" fill="#ffd27a" />
      <!-- коврик -->
      <path d="M160 274 H240 L250 294 H150Z" fill="#8a3a2a" stroke="#15121c" stroke-width="3" />
      <text x="200" y="290" text-anchor="middle" class="mat">БУ!</text>
    </svg>

    <!-- 2. Прихожая и жилец -->
    <div class="doorway">
      <svg class="hall" viewBox="0 0 120 192" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <radialGradient id="ds-hall" cx=".5" cy=".25" r=".9">
            <stop offset="0" stop-color="#f4c56a" /><stop offset="1" stop-color="#8a5226" />
          </radialGradient>
          <pattern id="ds-paper" width="16" height="20" patternUnits="userSpaceOnUse">
            <path d="M8 2 L13 10 L8 18 L3 10Z" fill="#b8722e" opacity=".45" />
          </pattern>
        </defs>
        <rect width="120" height="192" fill="url(#ds-hall)" />
        <rect width="120" height="128" fill="url(#ds-paper)" />
        <rect y="124" width="120" height="40" fill="#6b3a24" stroke="#15121c" stroke-width="2" />
        <path d="M8 132 h30 v24 h-30z M46 132 h30 v24 h-30z M84 132 h30 v24 h-30z" fill="none" stroke="#4a2414" stroke-width="2" />
        <path d="M0 164 H120 V192 H0Z" fill="#5a3220" stroke="#15121c" stroke-width="2" />
        <path d="M30 164 L10 192 M60 164 V192 M90 164 L110 192" stroke="#3a1e12" stroke-width="1.5" />
        <!-- портрет предка -->
        <rect x="80" y="28" width="30" height="38" fill="#d9a441" stroke="#15121c" stroke-width="2.5" />
        <rect x="85" y="33" width="20" height="28" fill="#3a4a3a" />
        <ellipse cx="95" cy="44" rx="5" ry="6" fill="#c9b08a" /><path d="M86 61 Q95 48 104 61Z" fill="#1d1a1e" />
        <!-- лампа -->
        <path d="M60 0 V14" stroke="#15121c" stroke-width="2" />
        <path d="M50 14 h20 l-4 8 h-12z" fill="#7a2a3a" stroke="#15121c" stroke-width="2" />
        <circle cx="60" cy="24" r="16" fill="#fff2a8" opacity=".35" />
        <g transform="translate(-6 80) scale(.5)" v-html="clueSvg"></g>
      </svg>
      <div v-if="open || phase === 'result'" class="who">
        <MonsterFigure
          :id="resident.monsterId"
          :mode="figureMode"
          :variant="resident.variant || 0"
          :mood="figureMood"
          :talking="talking"
        />
      </div>
    </div>

    <!-- 3. Створка двери -->
    <div class="door" :class="{ open, slammed }">
      <svg viewBox="0 0 120 192" preserveAspectRatio="none" aria-hidden="true">
        <rect width="120" height="192" :fill="pal.door" stroke="#15121c" stroke-width="4" />
        <rect x="0" y="0" width="16" height="192" fill="#000" opacity=".18" />
        <g fill="none" stroke="#15121c" stroke-width="3">
          <rect x="16" y="16" width="38" height="60" /><rect x="66" y="16" width="38" height="60" />
          <rect x="16" y="92" width="38" height="80" /><rect x="66" y="92" width="38" height="80" />
        </g>
        <g fill="#000" opacity=".22">
          <rect x="20" y="20" width="30" height="8" /><rect x="70" y="20" width="30" height="8" />
          <rect x="20" y="96" width="30" height="8" /><rect x="70" y="96" width="30" height="8" />
        </g>
        <circle cx="60" cy="56" r="9" fill="none" stroke="#d9a441" stroke-width="4" />
        <circle cx="60" cy="47" r="4" fill="#d9a441" stroke="#15121c" stroke-width="2" />
        <circle cx="104" cy="104" r="5" fill="#d9a441" stroke="#15121c" stroke-width="2.5" />
        <rect x="42" y="84" width="36" height="6" rx="2" fill="#d9a441" stroke="#15121c" stroke-width="2" />
      </svg>
    </div>

    <!-- 4. Передний план: наличник, колонны, тыквы, ветви, туман -->
    <svg class="layer front" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <radialGradient id="ds-jack" cx=".5" cy=".5" r=".5">
          <stop offset="0" stop-color="#ffcf4a" stop-opacity=".6" /><stop offset="1" stop-color="#ffcf4a" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="ds-fog" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#cfe6ff" stop-opacity="0" /><stop offset="1" stop-color="#cfe6ff" stop-opacity=".35" />
        </linearGradient>
      </defs>
      <g stroke="#15121c" stroke-width="3" stroke-linejoin="round">
        <path d="M128 262 V64 H272 V262 H260 V72 H140 V262Z" fill="#c9d6ea" />
        <path d="M120 64 H280 L272 54 H128Z" fill="#dfe8f5" />
        <path d="M262 72 V262 H260" fill="#9fb0cc" stroke="none" />
        <!-- колонны крыльца -->
        <path d="M0 40 H22 V264 H0Z M378 40 H400 V264 H378Z" fill="#c9d6ea" />
        <path d="M14 40 V264 M392 40 V264" stroke="#9fb0cc" stroke-width="4" />
      </g>
      <!-- тыквы-фонари -->
      <g v-for="(p, i) in [{ x: 92, s: 1 }, { x: 318, s: 0.8 }]" :key="i" :transform="`translate(${p.x} 268) scale(${p.s})`">
        <circle cy="-4" r="40" fill="url(#ds-jack)" class="jackglow" />
        <g stroke="#15121c" stroke-width="3" stroke-linejoin="round">
          <ellipse cx="0" cy="0" rx="26" ry="20" fill="#e8761a" />
          <path d="M-10 -19 Q-18 0 -10 19 M10 -19 Q18 0 10 19" fill="none" stroke-width="2" />
          <path d="M-2 -20 q0 -8 6 -10" fill="none" stroke="#3b5226" stroke-width="4" />
          <path d="M-14 -6 l6 -7 6 7z M2 -6 l6 -7 6 7z M-14 5 q14 12 28 0 l-5 2 -4 -3 -5 4 -5 -4 -4 3z" fill="#ffd34a" stroke-width="2" />
        </g>
      </g>
      <!-- ветви с мхом -->
      <g fill="#08112a" stroke="#050a1c" stroke-width="1.5">
        <path d="M0 0 H70 Q50 6 36 14 Q28 30 30 58 Q24 34 18 22 Q10 30 8 52 Q4 30 0 26Z" />
        <path d="M30 14 q6 20 2 40 M14 18 q2 18 -2 34 M50 8 q4 16 0 30" fill="none" stroke="#2f4a5a" stroke-width="3" opacity=".8" />
      </g>
      <rect y="230" width="400" height="70" fill="url(#ds-fog)" class="fog" />
    </svg>

    <div v-if="flash" class="flash"></div>
    <slot />
  </div>
</template>

<style scoped>
.scene {
  position: relative;
  width: min(100cqw - 14px, (100cqh - 14px) * 4 / 3);
  aspect-ratio: 4 / 3;
  margin: 0 auto;
  border: 5px solid #0e0b17;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 0 3px #51617f, 9px 10px 0 #05060d;
  perspective: 900px;
  background: #0a1740;
}
.layer { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.front { pointer-events: none; z-index: 4; }
.mat { font-family: var(--font-title); font-size: 14px; fill: #f0b04a; }
.spill { opacity: 0; transition: opacity .8s; }
.scene.open .spill { opacity: .35; }
.lampglow { animation: flicker 3.2s infinite; }
.jackglow { animation: flicker 2.1s infinite; }
@keyframes flicker { 0%, 100% { opacity: 1; } 48% { opacity: 1; } 50% { opacity: .55; } 53% { opacity: 1; } 80% { opacity: .8; } }
.fog { animation: fog 9s ease-in-out infinite alternate; }
@keyframes fog { from { opacity: .7; } to { opacity: 1; } }

.doorway { position: absolute; left: 35%; width: 30%; top: 24%; height: 63.4%; overflow: hidden; z-index: 2; background: #8a5226; }
.hall { position: absolute; inset: 0; width: 100%; height: 100%; }
.who { position: absolute; bottom: 1%; height: 97%; aspect-ratio: 200 / 470; left: 60%; transform: translateX(-50%); }

.door {
  position: absolute; left: 35%; width: 30%; top: 24%; height: 63.4%; z-index: 3;
  transform-origin: left center;
  transition: transform 1.1s cubic-bezier(.3, 1.3, .5, 1);
}
.door svg { width: 100%; height: 100%; display: block; }
.door.open { transform: rotateY(-100deg); }
.door.slammed { transition: transform .12s ease-in; }
.flash { position: absolute; inset: 0; background: #fff; z-index: 20; animation: flash .7s ease-out forwards; }
@keyframes flash { 0% { opacity: 1; } 100% { opacity: 0; } }
</style>
