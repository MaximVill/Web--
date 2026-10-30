<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import Kid from './Kid.vue'
import NightBackground from './NightBackground.vue'
import * as sfx from '../../audio/sfx.js'

const props = defineProps({
  costume: { type: String, default: 'sheet' },
  label: { type: String, default: 'ЗОИНКС!' },
})
const emit = defineEmits(['done'])

let t
onMounted(() => {
  sfx.bongoRun(36)
  t = setTimeout(() => emit('done'), 4600)
})
onBeforeUnmount(() => clearTimeout(t))
</script>

<template>
  <div class="chase stageframe">
    <NightBackground :houses="false" />
    <!-- Один и тот же забор, куст и фонарь пролетают 4 раза подряд -->
    <div class="tile">
      <svg viewBox="0 0 800 400" preserveAspectRatio="none">
        <g stroke="#111" stroke-width="4" stroke-linejoin="round">
          <!-- забор -->
          <rect x="40" y="250" width="260" height="14" fill="#8a6a3a" />
          <rect x="40" y="290" width="260" height="14" fill="#8a6a3a" />
          <g fill="#a98450">
            <path v-for="i in 8" :key="i" :d="`M${40 + (i - 1) * 34} 330 V238 l14 -14 l14 14 V330z`" />
          </g>
          <!-- куст -->
          <g fill="#2e7a3a">
            <circle cx="400" cy="312" r="34" /><circle cx="440" cy="298" r="40" /><circle cx="480" cy="314" r="32" />
          </g>
          <circle cx="430" cy="290" r="4" fill="#d11" /><circle cx="462" cy="304" r="4" fill="#d11" />
          <!-- фонарь -->
          <rect x="590" y="140" width="10" height="190" fill="#222" />
          <path d="M572 140 h46 l-8 -26 h-30z" fill="#222" />
          <rect x="578" y="116" width="34" height="26" fill="#ffe36b" />
        </g>
        <circle cx="595" cy="128" r="46" fill="#ffe36b" opacity=".25" />
      </svg>
    </div>
    <div class="kid"><Kid :costume="costume" scared /></div>
    <div class="speed"><i v-for="i in 5" :key="i"></i></div>
    <div class="label">{{ label }}</div>
  </div>
</template>

<style scoped>

.tile { position: absolute; inset: 0; animation: fly 1.1s linear 4 forwards; }
.tile svg { width: 100%; height: 100%; display: block; }
@keyframes fly {
  from { transform: translateX(105%); }
  to { transform: translateX(-105%); }
}
.kid {
  position: absolute; left: 14%; bottom: 6%; height: 40%; aspect-ratio: 120 / 190;
  animation: run .22s ease-in-out infinite alternate;
}
@keyframes run {
  from { transform: translateY(0) rotate(-3deg); }
  to { transform: translateY(-14px) rotate(3deg); }
}
.speed { position: absolute; left: 0; top: 0; width: 100%; height: 100%; pointer-events: none; }
.speed i {
  position: absolute; height: 3px; background: rgba(255, 255, 255, .6); border-radius: 2px;
  width: 22%; animation: streak .45s linear infinite;
}
.speed i:nth-child(1) { top: 30%; left: 0; }
.speed i:nth-child(2) { top: 42%; left: 20%; animation-delay: .1s; }
.speed i:nth-child(3) { top: 55%; left: 5%; animation-delay: .2s; }
.speed i:nth-child(4) { top: 66%; left: 30%; animation-delay: .05s; }
.speed i:nth-child(5) { top: 76%; left: 10%; animation-delay: .3s; }
@keyframes streak { from { transform: translateX(120%); opacity: 0; } 30% { opacity: 1; } to { transform: translateX(-200%); opacity: 0; } }
.label {
  position: absolute; left: 50%; top: 8%; transform: translateX(-50%) rotate(-4deg);
  font-family: var(--font-title); font-weight: 700; font-size: clamp(32px, 8vw, 80px); color: #ffe94a;
  text-shadow: 4px 4px 0 var(--ink), -2px -2px 0 var(--ink), 2px -2px 0 var(--ink), -2px 2px 0 var(--ink);
  animation: pop .5s ease-out;
}
@keyframes pop { from { transform: translateX(-50%) scale(.2) rotate(-20deg); } }
</style>
