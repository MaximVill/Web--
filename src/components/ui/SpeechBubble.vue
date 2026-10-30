<script setup>
import { computed } from 'vue'
import { state } from '../../stores/game.js'

const props = defineProps({
  text: { type: String, default: '' },
  who: { type: String, default: 'Жилец' },
  tone: { type: String, default: 'talk' }, // talk | good | bad | scary
})

// *слово* → подсветка (только в костюме Детектива)
const html = computed(() => {
  const esc = props.text.replace(/&/g, '&amp;').replace(/</g, '&lt;')
  return esc.replace(/\*([^*]+)\*/g, (_, w) => (state.costume === 'detective' ? `<mark class="clue">${w}</mark>` : w))
})
</script>

<template>
  <div class="bubble" :class="tone">
    <div class="who">{{ who }}</div>
    <p v-html="html"></p>
  </div>
</template>

<style scoped>
.bubble {
  position: relative; background: #fffdf4; color: var(--ink); border: 3px solid var(--ink);
  border-radius: 20px; padding: 10px 16px 12px; box-shadow: 0 5px 0 rgba(0, 0, 0, .45);
}
.bubble::before, .bubble::after {
  content: ''; position: absolute; left: 44px; border-style: solid; border-color: transparent;
}
.bubble::before { top: -20px; border-width: 0 10px 20px 10px; border-bottom-color: var(--ink); }
.bubble::after { top: -14px; left: 47px; border-width: 0 7px 15px 7px; border-bottom-color: #fffdf4; }
.bubble.good { background: #eef8d8; } .bubble.good::after { border-bottom-color: #eef8d8; }
.bubble.bad { background: #fde3e3; } .bubble.bad::after { border-bottom-color: #fde3e3; }
.bubble.scary { background: #fff2b0; } .bubble.scary::after { border-bottom-color: #fff2b0; }
.who { font-size: 12px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase; color: #a0461a; }
p { margin: 4px 0 0; font-size: 18px; line-height: 1.35; font-weight: 800; }
@media (min-width: 960px) {
  .bubble::before { top: 22px; left: -20px; border-width: 10px 20px 10px 0; border-color: transparent var(--ink) transparent transparent; }
  .bubble::after { top: 25px; left: -14px; border-width: 7px 15px 7px 0; border-color: transparent #fffdf4 transparent transparent; }
  .bubble.good::after { border-color: transparent #eef8d8 transparent transparent; }
  .bubble.bad::after { border-color: transparent #fde3e3 transparent transparent; }
  .bubble.scary::after { border-color: transparent #fff2b0 transparent transparent; }
}
</style>
