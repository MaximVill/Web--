<script setup>
// Дом с улицы. Вид выбирается случайно и никак не связан с тем, кто живёт внутри.
defineProps({
  kind: { type: Number, default: 0 },
})
</script>

<template>
  <svg viewBox="0 0 400 300" class="house" aria-hidden="true">
    <defs>
      <radialGradient id="hf-win" cx=".5" cy=".55" r=".6">
        <stop offset="0" stop-color="#fff2a8" /><stop offset="1" stop-color="#f0a83a" />
      </radialGradient>
      <radialGradient id="hf-glow" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#ffd95a" stop-opacity=".45" /><stop offset="1" stop-color="#ffd95a" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="hf-moon" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#bfe3ff" stop-opacity=".25" /><stop offset=".7" stop-color="#bfe3ff" stop-opacity="0" />
      </linearGradient>
    </defs>
    <g stroke="#15121c" stroke-width="3" stroke-linejoin="round">
      <!-- Викторианский с башенкой -->
      <template v-if="kind === 0">
        <path d="M268 250 V96 H322 V250Z" fill="#53628f" />
        <path d="M262 98 L295 30 L328 98Z" fill="#26305a" />
        <path d="M295 30 V14" /><circle cx="295" cy="12" r="3" fill="#15121c" />
        <rect x="284" y="118" width="22" height="34" fill="url(#hf-win)" />
        <path d="M84 250 V128 H284 V250Z" fill="#6474a2" />
        <path d="M70 132 L184 58 L298 132Z" fill="#26305a" />
        <path d="M150 40 h18 v30 h-18z" fill="#3a3a52" />
        <path d="M84 128 H284 V250 H84Z" fill="url(#hf-moon)" stroke="none" />
        <path d="M184 76 l14 20 h-28z" fill="url(#hf-win)" />
        <rect x="104" y="146" width="34" height="44" fill="url(#hf-win)" /><rect x="230" y="146" width="34" height="44" fill="url(#hf-win)" />
        <path d="M121 146 V190 M104 168 H138 M247 146 V190 M230 168 H264" stroke-width="2.5" />
        <path d="M76 204 H292 L286 192 H82Z" fill="#2a3560" />
        <path d="M90 204 V250 M278 204 V250" stroke-width="5" stroke="#c9d6ea" />
      </template>
      <!-- Низкий коттедж с трубой -->
      <template v-else-if="kind === 1">
        <path d="M250 70 h24 v50 h-24z" fill="#6b3a3a" />
        <path d="M60 250 V140 H340 V250Z" fill="#5a7a8a" />
        <path d="M40 146 L200 74 L360 146Z" fill="#2c3a5e" />
        <path d="M60 140 H340 V250 H60Z" fill="url(#hf-moon)" stroke="none" />
        <rect x="82" y="168" width="42" height="40" fill="url(#hf-win)" /><rect x="276" y="168" width="42" height="40" fill="url(#hf-win)" />
        <path d="M103 168 V208 M82 188 H124 M297 168 V208 M276 188 H318" stroke-width="2.5" />
        <path d="M74 166 h12 v44 h-12z M120 166 h12 v44 h-12z M268 166 h12 v44 h-12z M314 166 h12 v44 h-12z" fill="#2a4a3a" />
        <circle cx="200" cy="120" r="12" fill="url(#hf-win)" />
      </template>
      <!-- Двухэтажный фермерский -->
      <template v-else>
        <path d="M100 250 V92 H300 V250Z" fill="#7a6a96" />
        <path d="M86 96 L200 26 L314 96Z" fill="#2e2a52" />
        <path d="M100 92 H300 V250 H100Z" fill="url(#hf-moon)" stroke="none" />
        <rect x="124" y="112" width="30" height="40" fill="url(#hf-win)" /><rect x="246" y="112" width="30" height="40" fill="#22284a" />
        <rect x="185" y="54" width="30" height="26" fill="url(#hf-win)" />
        <rect x="124" y="172" width="30" height="40" fill="#22284a" /><rect x="246" y="172" width="30" height="40" fill="url(#hf-win)" />
        <path d="M139 112 V152 M124 132 H154 M261 172 V212 M246 192 H276 M200 54 V80" stroke-width="2.5" />
        <path d="M100 160 H300" stroke="#5a4a76" stroke-width="4" />
        <path d="M330 250 V120 l8 -26 8 26 V250Z" fill="#3a3a52" />
        <path d="M338 94 l-22 -10 M338 94 l22 -10 M338 94 l-10 22 M338 94 l10 22" stroke-width="4" />
      </template>

      <!-- Дверь с крыльцом — одинаковая у всех -->
      <circle cx="200" cy="214" r="60" fill="url(#hf-glow)" stroke="none" class="glow" />
      <path d="M176 250 V192 Q200 172 224 192 V250Z" fill="#7a3a2a" />
      <circle cx="216" cy="222" r="3" fill="#d9a441" stroke-width="2" />
      <rect x="164" y="250" width="72" height="8" fill="#3a4a72" />
      <rect x="156" y="258" width="88" height="8" fill="#334068" />
      <!-- тыква у крыльца -->
      <ellipse cx="146" cy="254" rx="13" ry="10" fill="#e8761a" />
      <path d="M140 251 l3 -4 3 4z M148 251 l3 -4 3 4z M140 257 q7 5 14 0" fill="#ffd34a" stroke-width="1.5" />
    </g>
  </svg>
</template>

<style scoped>
.house { width: 100%; height: 100%; display: block; overflow: visible; }
.glow { animation: pulse 3s ease-in-out infinite; }
@keyframes pulse { 50% { opacity: .6; } }
</style>
