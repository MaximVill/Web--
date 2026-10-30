<script setup>
import { computed } from 'vue'

const props = defineProps({
  costume: { type: String, default: 'sheet' },
  scared: { type: Boolean, default: false },
})

// Цвета рукавов и тела для каждого костюма
const LOOK = {
  sheet: { body: '#f4f6fb', sleeve: '#f4f6fb', fold: '#c9d3e6' },
  detective: { body: '#a8803a', sleeve: '#a8803a', fold: '#7f5f26' },
  robot: { body: '#b8bcc4', sleeve: '#9aa0aa', fold: '#7c828c' },
  fangs: { body: '#1c1c2a', sleeve: '#1c1c2a', fold: '#3a3a52' },
}
const look = computed(() => LOOK[props.costume] || LOOK.sheet)

// Замкнутые рукава: левая рука опущена, правая держит ведёрко-тыкву
const ARM_L = 'M38 64 Q26 76 24 100 Q23 114 26 122 L37 122 Q35 110 37 98 Q39 84 46 74Z'
const ARM_R = 'M82 64 Q94 76 97 100 Q99 114 98 122 L87 122 Q86 110 84 98 Q82 84 74 74Z'
</script>

<template>
  <svg viewBox="0 0 120 190" class="kid" :class="{ scared }" aria-hidden="true">
    <g stroke="#111" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
      <!-- плащ вампира позади -->
      <path v-if="costume === 'fangs'" d="M30 62 L42 54 H78 L90 62 L98 158 Q60 166 22 158Z" fill="#b01030" />
      <!-- капюшон простыни позади головы -->
      <path v-if="costume === 'sheet'" d="M32 60 Q28 14 60 10 Q92 14 88 60 Q74 66 60 66 Q46 66 32 60Z" fill="#f4f6fb" />

      <ellipse cx="62" cy="183" rx="34" ry="5" fill="#000" opacity=".28" stroke="none" />
      <!-- ноги и ботинки -->
      <path d="M45 136 H58 V174 H45Z M62 136 H75 V174 H62Z" :fill="costume === 'robot' ? '#7c828c' : '#2a2a33'" />
      <path d="M41 172 H58 Q61 178 57 182 H41 Q38 177 41 172Z M62 172 H79 Q82 177 79 182 H63 Q59 178 62 172Z" fill="#141218" />

      <!-- туловище -->
      <path
        v-if="costume === 'sheet'"
        d="M28 64 Q60 52 92 64 Q100 104 98 164 Q90 156 82 164 Q74 156 66 164 Q58 156 50 164 Q42 156 34 164 Q26 156 22 164 Q20 104 28 64Z"
        :fill="look.body"
      />
      <template v-else-if="costume === 'detective'">
        <path d="M36 64 Q60 54 84 64 L92 146 Q60 152 28 146Z" :fill="look.body" />
        <path d="M52 60 L60 92 L68 60 Q60 66 52 60Z" fill="#f6ecd0" />
        <path d="M44 64 L56 104 M76 64 L64 104" fill="none" stroke-width="2" />
        <path d="M30 120 H90" fill="none" stroke-width="2" :stroke="look.fold" />
        <circle cx="60" cy="112" r="2.6" fill="#6b4a1a" stroke-width="1.5" />
        <circle cx="60" cy="128" r="2.6" fill="#6b4a1a" stroke-width="1.5" />
      </template>
      <template v-else-if="costume === 'robot'">
        <rect x="30" y="62" width="60" height="78" rx="4" :fill="look.body" />
        <rect x="42" y="76" width="36" height="24" rx="2" fill="#6b7280" />
        <circle cx="52" cy="88" r="4" fill="#ffd95a" stroke-width="2" /><circle cx="68" cy="88" r="4" fill="#ff6b5e" stroke-width="2" />
        <path d="M36 112 H84 M36 124 H84" fill="none" stroke-width="2" :stroke="look.fold" />
      </template>
      <template v-else>
        <path d="M36 64 Q60 56 84 64 L88 142 Q60 148 32 142Z" :fill="look.body" />
        <path d="M46 62 L60 94 L74 62 Q60 68 46 62Z" fill="#f4f1f4" />
        <path d="M40 54 L50 62 L60 94 L48 62Z M80 54 L70 62 L60 94 L72 62Z" fill="#b01030" />
        <path d="M54 68 L60 64 L66 68 L60 72Z" fill="#d1103a" stroke-width="2" />
      </template>

      <!-- руки -->
      <template v-if="costume === 'robot'">
        <path d="M30 68 H18 V120 H30Z M90 68 H102 V120 H90Z" :fill="look.sleeve" />
        <path d="M18 84 H30 M18 100 H30 M90 84 H102 M90 100 H102" fill="none" stroke-width="2" :stroke="look.fold" />
        <circle cx="24" cy="125" r="6.5" fill="#7c828c" />
        <circle cx="96" cy="125" r="6.5" fill="#7c828c" />
      </template>
      <template v-else>
        <path :d="ARM_L" :fill="look.sleeve" />
        <path :d="ARM_R" :fill="look.sleeve" />
        <circle cx="31" cy="126" r="6" fill="#f6cfa6" />
        <circle cx="93" cy="126" r="6" fill="#f6cfa6" />
      </template>

      <!-- голова -->
      <circle cx="60" cy="40" r="19" fill="#f6cfa6" />
      <path d="M41 36 Q40 13 60 13 Q82 13 79 38 Q74 25 60 25 Q50 25 46 32 Q43 34 41 36Z" fill="#c2461a" />
      <template v-if="costume === 'robot'">
        <path d="M32 8 H88 V60 H32Z M43 22 V58 H77 V22Z" fill="#b8bcc4" fill-rule="evenodd" />
        <path d="M60 8 V0" fill="none" /><circle cx="60" cy="-1" r="3.5" fill="#ff6b5e" />
      </template>
      <template v-if="costume === 'detective'">
        <path d="M39 30 Q40 11 60 10 Q80 11 81 30Z" fill="#7a5a28" />
        <path d="M34 30 H86 Q88 35 82 35 H38 Q32 35 34 30Z" fill="#5e4420" />
      </template>
      <ellipse cx="53" cy="41" rx="3.4" ry="4.2" fill="#fff" stroke-width="2" />
      <ellipse cx="67" cy="41" rx="3.4" ry="4.2" fill="#fff" stroke-width="2" />
      <circle cx="54" cy="42" r="1.5" fill="#111" stroke="none" />
      <circle cx="68" cy="42" r="1.5" fill="#111" stroke="none" />
      <path d="M49 34 Q53 31 57 33 M71 34 Q67 31 63 33" fill="none" stroke-width="2.5" />
      <path d="M53 50 Q60 55 67 50" fill="none" stroke-width="2.5" />
      <path v-if="costume === 'fangs'" d="M55 51 L57 56 L59 51.5Z M61 51.5 L63 56 L65 51Z" fill="#fff" stroke-width="1.5" />
      <g fill="#b0603a" stroke="none">
        <circle cx="50" cy="47" r="1" /><circle cx="54" cy="48" r="1" /><circle cx="66" cy="48" r="1" /><circle cx="70" cy="47" r="1" />
      </g>

      <!-- лупа в левой руке детектива -->
      <template v-if="costume === 'detective'">
        <path d="M30 122 L22 106" fill="none" stroke-width="5" />
        <circle cx="19" cy="99" r="9" fill="#bfe6ff" fill-opacity=".75" />
        <path d="M15 95 Q17 93 20 93" fill="none" stroke="#fff" stroke-width="2" />
      </template>

      <!-- тыква-ведёрко в правой руке -->
      <path d="M79 142 Q93 112 109 142" fill="none" stroke-width="3" />
      <ellipse cx="94" cy="152" rx="17" ry="14" fill="#f28c1b" />
      <path d="M94 138 V166 M83 141 Q79 152 84 163 M105 141 Q109 152 104 163" fill="none" stroke-width="2" />
      <path d="M86 150 L90 145 L94 150Z M96 150 L100 145 L104 150Z M86 157 Q94 163 102 157" fill="#ffd95a" stroke-width="2" />
      <circle cx="93" cy="126" r="6" :fill="costume === 'robot' ? '#7c828c' : '#f6cfa6'" />
    </g>
  </svg>
</template>

<style scoped>
.kid { width: 100%; height: 100%; display: block; overflow: visible; }
.kid.scared { animation: shake .25s linear infinite; }
</style>
