<script setup>
// Штаб: деревянный сарай-клуб с лампочкой, окном в ночь и доской с уликами.
</script>

<template>
  <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" class="bg" aria-hidden="true">
    <defs>
      <linearGradient id="hq-wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#4a2f22" /><stop offset="1" stop-color="#2a1a14" />
      </linearGradient>
      <radialGradient id="hq-light" cx=".5" cy=".1" r=".8">
        <stop offset="0" stop-color="#ffd27a" stop-opacity=".55" /><stop offset=".55" stop-color="#ffd27a" stop-opacity=".08" />
        <stop offset="1" stop-color="#000" stop-opacity=".4" />
      </radialGradient>
      <linearGradient id="hq-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0a1740" /><stop offset="1" stop-color="#2a6aa0" />
      </linearGradient>
      <pattern id="hq-cork" width="10" height="10" patternUnits="userSpaceOnUse">
        <rect width="10" height="10" fill="#b5844a" /><circle cx="3" cy="3" r="1.2" fill="#9a6e3a" /><circle cx="8" cy="7" r="1" fill="#c99a5e" />
      </pattern>
    </defs>
    <rect width="800" height="450" fill="url(#hq-wall)" />
    <path v-for="i in 20" :key="i" :d="`M${i * 42} 0 V450`" stroke="#1e120c" stroke-width="3" />
    <g fill="#1e120c" opacity=".6">
      <circle v-for="i in 20" :key="'n' + i" :cx="i * 42 - 6" cy="40" r="2" />
      <circle v-for="i in 20" :key="'m' + i" :cx="i * 42 - 6" cy="300" r="2" />
    </g>

    <!-- окно в ночь -->
    <g stroke="#15121c" stroke-width="5" stroke-linejoin="round">
      <rect x="560" y="60" width="170" height="140" fill="url(#hq-sky)" />
      <circle cx="680" cy="100" r="22" fill="#eaf6ff" stroke-width="3" />
      <path d="M560 200 Q600 150 640 170 Q660 140 700 160 Q720 150 730 170 V200Z" fill="#08112a" stroke-width="2" />
      <path d="M645 60 V200 M560 130 H730" stroke="#6b4a32" stroke-width="8" />
      <path d="M645 60 V200 M560 130 H730" />
      <rect x="550" y="196" width="190" height="14" fill="#6b4a32" />
    </g>

    <!-- пробковая доска с уликами и нитками -->
    <g stroke="#15121c" stroke-width="4">
      <rect x="40" y="60" width="230" height="160" fill="url(#hq-cork)" />
      <rect x="40" y="60" width="230" height="160" fill="none" stroke="#6b4a32" stroke-width="10" />
      <rect x="40" y="60" width="230" height="160" fill="none" />
    </g>
    <g stroke="#15121c" stroke-width="2">
      <rect x="62" y="80" width="46" height="54" fill="#fbf3dc" transform="rotate(-6 85 107)" />
      <rect x="66" y="84" width="38" height="34" fill="#3d5a2a" transform="rotate(-6 85 107)" />
      <rect x="150" y="76" width="50" height="40" fill="#fff6a8" transform="rotate(4 175 96)" />
      <path d="M158 88 h34 M158 96 h28 M158 104 h30" stroke-width="1.5" transform="rotate(4 175 96)" />
      <rect x="208" y="130" width="44" height="52" fill="#fbf3dc" transform="rotate(7 230 156)" />
      <rect x="212" y="134" width="36" height="32" fill="#4a2f6a" transform="rotate(7 230 156)" />
      <rect x="84" y="150" width="56" height="44" fill="#ffd2e0" transform="rotate(-3 112 172)" />
      <path d="M92 162 h40 M92 170 h32 M92 178 h36" stroke-width="1.5" transform="rotate(-3 112 172)" />
    </g>
    <path d="M86 84 L176 80 L230 136 L112 154 Z" fill="none" stroke="#d11" stroke-width="2" />
    <g fill="#e8384f" stroke="#15121c" stroke-width="1.5">
      <circle cx="86" cy="84" r="5" /><circle cx="176" cy="80" r="5" /><circle cx="230" cy="136" r="5" /><circle cx="112" cy="154" r="5" />
    </g>

    <!-- полка с тыквами и фонариком -->
    <g stroke="#15121c" stroke-width="3" stroke-linejoin="round">
      <rect x="320" y="200" width="180" height="12" fill="#6b4a32" />
      <ellipse cx="350" cy="186" rx="20" ry="15" fill="#f08a1c" />
      <path d="M342 182 l4 -5 4 5z M352 182 l4 -5 4 5z M342 190 q8 5 16 0" fill="#ffd34a" stroke-width="1.5" />
      <ellipse cx="392" cy="190" rx="14" ry="11" fill="#e8761a" />
      <rect x="430" y="170" width="40" height="30" rx="3" fill="#2aa7b8" />
      <circle cx="462" cy="185" r="8" fill="#fff2a8" />
    </g>

    <!-- пол -->
    <path d="M0 380 H800 V450 H0Z" fill="#24160f" stroke="#15121c" stroke-width="3" />
    <path v-for="i in 12" :key="'f' + i" :d="`M${i * 70} 380 L${i * 70 - 30} 450`" stroke="#15121c" stroke-width="2" />

    <!-- лампочка -->
    <path d="M400 0 V40" stroke="#15121c" stroke-width="3" />
    <path d="M388 40 h24 l-4 10 h-16z" fill="#2a2a36" stroke="#15121c" stroke-width="2" />
    <circle cx="400" cy="60" r="12" fill="#fff2a8" stroke="#15121c" stroke-width="2" />
    <rect width="800" height="450" fill="url(#hq-light)" />
  </svg>
</template>

<style scoped>
.bg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
</style>
