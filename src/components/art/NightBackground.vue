<script setup>
// Ночная деревня в духе фонов «Где ты, Скуби-Ду?»: холодный сине-бирюзовый свет,
// силуэты кривых деревьев, совы и летучие мыши, фахверковые дома с жёлтыми окнами.
defineProps({
  houses: { type: Boolean, default: true },
})

const bat = 'M0 0 q8 -12 16 -2 q8 -10 16 2 q-8 -2 -16 6 q-8 -8 -16 -6z'
</script>

<template>
  <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" class="bg" aria-hidden="true">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0a1740" />
        <stop offset=".55" stop-color="#1c4a86" />
        <stop offset="1" stop-color="#3a86b0" />
      </linearGradient>
      <radialGradient id="moonglow" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#e8f6ff" stop-opacity=".9" />
        <stop offset="1" stop-color="#9fd8ff" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="road" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#5aa0c8" />
        <stop offset="1" stop-color="#1d4a78" />
      </linearGradient>
    </defs>
    <rect width="800" height="400" fill="url(#sky)" />
    <circle cx="560" cy="90" r="110" fill="url(#moonglow)" />
    <circle cx="560" cy="90" r="38" fill="#eaf6ff" />
    <circle cx="548" cy="82" r="7" fill="#c6dcec" /><circle cx="574" cy="102" r="9" fill="#c6dcec" />
    <path d="M0 250 Q200 210 400 240 T800 232 V400 H0Z" fill="#1a3a6a" />

    <!-- деревня -->
    <g v-if="houses" stroke="#0a0f20" stroke-width="2.5" stroke-linejoin="round">
      <g>
        <path d="M20 330 V210 L100 160 L180 210 V330Z" fill="#7a8fb8" />
        <path d="M10 214 L100 150 L190 214Z" fill="#2a3a66" />
        <path d="M20 250 H180 M60 214 V330 M140 214 V330" fill="none" stroke="#2a3050" stroke-width="5" />
        <rect x="72" y="262" width="26" height="30" fill="#ffd95a" /><rect x="150" y="262" width="22" height="28" fill="#ffd95a" />
        <rect x="90" y="204" width="20" height="22" fill="#ffd95a" />
      </g>
      <g>
        <path d="M600 330 V196 L690 144 L780 196 V330Z" fill="#8aa0c8" />
        <path d="M590 200 L690 134 L790 200Z" fill="#2a3a66" />
        <path d="M600 244 H780 M650 200 V330 M730 200 V330" fill="none" stroke="#2a3050" stroke-width="5" />
        <rect x="610" y="262" width="26" height="34" fill="#ffd95a" /><rect x="700" y="262" width="26" height="34" fill="#ffd95a" />
        <rect x="676" y="190" width="22" height="26" fill="#ffd95a" />
      </g>
      <g opacity=".85">
        <path d="M250 330 V250 L300 218 L350 250 V330Z" fill="#5a70a0" /><path d="M244 252 L300 210 L356 252Z" fill="#22305a" />
        <rect x="288" y="272" width="16" height="20" fill="#ffd95a" />
        <path d="M440 330 V240 L500 204 L560 240 V330Z" fill="#5a70a0" /><path d="M434 244 L500 196 L566 244Z" fill="#22305a" />
        <rect x="482" y="266" width="18" height="24" fill="#ffd95a" />
        <path d="M388 330 V290 h22 V330z" fill="#3a4a78" />
      </g>
    </g>

    <!-- дорога и туман -->
    <path d="M0 400 L0 330 Q400 300 800 330 L800 400Z" fill="url(#road)" />
    <path d="M330 330 L470 330 L640 400 L160 400Z" fill="#7bb7da" opacity=".5" />
    <ellipse cx="400" cy="335" rx="380" ry="26" fill="#cfeaff" opacity=".2" />

    <!-- забор -->
    <g stroke="#0a0f20" stroke-width="2.5" fill="#0d1a38">
      <path v-for="i in 9" :key="'l' + i" :d="`M${(i - 1) * 24 + 4} 392 V340 l6 -9 l6 9 V392z`" />
      <path v-for="i in 9" :key="'r' + i" :d="`M${590 + (i - 1) * 24 + 4} 392 V340 l6 -9 l6 9 V392z`" />
    </g>

    <!-- силуэты кривых деревьев с совой и летучими мышами -->
    <g fill="#08112a" stroke="#050a1c" stroke-width="2">
      <path d="M-10 400 Q20 300 14 220 Q-8 200 -30 196 Q0 192 18 206 Q20 150 0 100 Q40 130 34 204 Q60 160 96 150 Q50 176 40 214 Q56 280 50 400Z" />
      <path d="M810 400 Q780 300 786 220 Q808 200 830 196 Q800 192 782 206 Q780 150 800 100 Q760 130 766 204 Q740 160 704 150 Q750 176 760 214 Q744 280 750 400Z" />
      <path d="M40 160 Q90 120 150 116 Q100 134 70 170Z M760 160 Q710 120 650 116 Q700 134 730 170Z" />
    </g>
    <g v-if="houses">
      <ellipse cx="86" cy="130" rx="9" ry="13" fill="#b08a9a" stroke="#050a1c" stroke-width="2" />
      <circle cx="83" cy="124" r="2.5" fill="#fff" /><circle cx="90" cy="124" r="2.5" fill="#fff" />
    </g>
    <g fill="#0a0f20">
      <path :d="bat" transform="translate(300 70)" /><path :d="bat" transform="translate(360 40) scale(.7)" />
      <path :d="bat" transform="translate(670 80) scale(.9)" /><path :d="bat" transform="translate(220 120) scale(.6)" />
    </g>
  </svg>
</template>

<style scoped>
.bg { pointer-events: none; position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
</style>
