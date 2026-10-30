<script setup>
// Набор мультяшных иконок вместо эмодзи (одинаково выглядят на всех системах)
defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 28 },
})
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 48 48" class="icon" aria-hidden="true">
    <g stroke="#15121c" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
      <template v-if="name === 'candy'">
        <path d="M6 14 L14 18 L12 24 L14 30 L6 34Z M42 14 L34 18 L36 24 L34 30 L42 34Z" fill="#f08a1c" />
        <ellipse cx="24" cy="24" rx="12" ry="10" fill="#e8384f" />
        <path d="M17 18 Q24 24 17 30 M31 18 Q24 24 31 30" fill="none" stroke="#fbf3dc" stroke-width="2.5" />
      </template>
      <template v-else-if="name === 'tp'">
        <path d="M10 14 h22 v24 h-22z" fill="#fbfaf6" />
        <ellipse cx="32" cy="26" rx="6" ry="12" fill="#fbfaf6" />
        <ellipse cx="32" cy="26" rx="2.5" ry="5" fill="#b9b2a2" />
        <ellipse cx="10" cy="26" rx="6" ry="12" fill="#e9e5da" />
        <path d="M10 38 q-4 6 2 8" fill="none" />
      </template>
      <template v-else-if="name === 'garlic'">
        <path d="M24 6 q2 6 0 8 M24 14 Q8 22 12 36 Q16 44 24 42 Q32 44 36 36 Q40 22 24 14Z" fill="#f4efe0" />
        <path d="M24 16 Q18 28 24 42 M24 16 Q30 28 24 42" fill="none" stroke-width="2" />
        <path d="M14 40 l-4 4 M34 40 l4 4" />
      </template>
      <template v-else-if="name === 'battery'">
        <rect x="10" y="12" width="28" height="30" rx="3" fill="#3a3a44" />
        <rect x="10" y="24" width="28" height="18" rx="2" fill="#f08a1c" />
        <rect x="14" y="6" width="6" height="6" fill="#9aa3ab" /><path d="M28 6 h6 v6 h-6z" fill="#9aa3ab" />
        <path d="M22 28 l-4 7 h6 l-4 7" fill="none" stroke="#fbf3dc" stroke-width="2.5" />
      </template>
      <template v-else-if="name === 'bone'">
        <path d="M14 30 L30 14 M18 34 L34 18" stroke-width="9" />
        <path d="M14 30 L30 14 M18 34 L34 18" stroke="#f4efe0" stroke-width="4" />
        <circle cx="10" cy="32" r="5" fill="#f4efe0" /><circle cx="16" cy="38" r="5" fill="#f4efe0" />
        <circle cx="32" cy="10" r="5" fill="#f4efe0" /><circle cx="38" cy="16" r="5" fill="#f4efe0" />
      </template>
      <template v-else-if="name === 'jar'">
        <rect x="12" y="6" width="24" height="7" rx="2" fill="#9aa3ab" />
        <path d="M14 13 h20 q6 4 6 12 v14 q0 4 -4 4 h-24 q-4 0 -4 -4 v-14 q0 -8 6 -12z" fill="#bfe6ff" fill-opacity=".7" />
        <path d="M16 20 v16" stroke="#fff" stroke-width="2.5" />
      </template>
      <template v-else-if="name === 'pumpkin'">
        <ellipse cx="24" cy="28" rx="18" ry="15" fill="#f08a1c" />
        <path d="M24 13 V43 M14 15 Q8 28 14 41 M34 15 Q40 28 34 41" fill="none" stroke-width="2" />
        <path d="M22 13 q0 -7 7 -8" fill="none" stroke="#3b5226" stroke-width="3.5" />
      </template>
      <template v-else-if="name === 'camera'">
        <rect x="6" y="14" width="36" height="26" rx="4" fill="#fbf3dc" />
        <rect x="6" y="14" width="36" height="7" fill="#2aa7b8" />
        <circle cx="24" cy="29" r="8" fill="#3a3a44" /><circle cx="24" cy="29" r="3.5" fill="#6fb7e0" stroke-width="2" />
        <rect x="32" y="8" width="8" height="6" fill="#e8384f" />
      </template>
      <template v-else-if="name === 'house'">
        <path d="M8 24 L24 10 L40 24" fill="none" />
        <path d="M12 22 V40 H36 V22" fill="#6b3fa0" />
        <rect x="20" y="28" width="8" height="12" fill="#ffd95a" />
      </template>
      <template v-else-if="name === 'sound'">
        <path d="M8 18 h8 l10 -8 v28 l-10 -8 h-8z" fill="#fbf3dc" />
        <path d="M32 16 q6 8 0 16 M36 11 q11 13 0 26" fill="none" />
      </template>
      <template v-else-if="name === 'mute'">
        <path d="M8 18 h8 l10 -8 v28 l-10 -8 h-8z" fill="#fbf3dc" />
        <path d="M32 18 l10 12 M42 18 l-10 12" fill="none" />
      </template>
      <template v-else-if="name === 'scare'">
        <circle cx="24" cy="24" r="19" fill="#ffe0b8" />
        <ellipse cx="17" cy="20" rx="5" ry="7" fill="#fff" /><ellipse cx="31" cy="20" rx="5" ry="7" fill="#fff" />
        <circle cx="17" cy="21" r="1.8" fill="#15121c" /><circle cx="31" cy="21" r="1.8" fill="#15121c" />
        <ellipse cx="24" cy="35" rx="6" ry="5" fill="#5a0d0d" />
        <path d="M10 12 l8 3 M38 12 l-8 3" fill="none" />
      </template>
    </g>
  </svg>
</template>

<style scoped>
.icon { display: inline-block; vertical-align: middle; flex: none; }
</style>
