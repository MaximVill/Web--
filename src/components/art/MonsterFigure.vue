<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { figureSvg } from './characters.js'

const props = defineProps({
  id: { type: String, required: true },
  mode: { type: String, default: 'masked' },
  talking: { type: Boolean, default: false },
  variant: { type: Number, default: 0 },
  mood: { type: String, default: 'calm' },
  view: { type: String, default: undefined },
})

const blink = ref(false)
const brow = ref(false)
const mouthOpen = ref(false)
let timers = []
let mouthTimer = null

function loopBlink() {
  const t = setTimeout(() => {
    blink.value = true
    timers.push(setTimeout(() => (blink.value = false), 140))
    loopBlink()
  }, 2200 + Math.random() * 2200)
  timers.push(t)
}
function loopBrow() {
  const t = setTimeout(() => {
    brow.value = true
    timers.push(setTimeout(() => (brow.value = false), 450))
    loopBrow()
  }, 3000 + Math.random() * 3500)
  timers.push(t)
}

watch(
  () => props.talking,
  (v) => {
    clearInterval(mouthTimer)
    mouthOpen.value = false
    if (v) mouthTimer = setInterval(() => (mouthOpen.value = !mouthOpen.value), 170)
  },
  { immediate: true }
)

onMounted(() => {
  loopBlink()
  loopBrow()
})
onBeforeUnmount(() => {
  timers.forEach(clearTimeout)
  clearInterval(mouthTimer)
})

const svg = computed(() =>
  figureSvg(props.id, {
    mode: props.mode,
    variant: props.variant,
    mood: props.mood,
    view: props.view,
    blink: blink.value,
    brow: brow.value,
    mouthOpen: mouthOpen.value,
  })
)
</script>

<template>
  <div class="monster" :class="[mode, { talking }]" v-html="svg"></div>
</template>

<style scoped>
.monster { width: 100%; height: 100%; }
.monster :deep(svg) { width: 100%; height: 100%; display: block; overflow: visible; }
.monster.real { animation: jump .4s ease-out; }
.monster.talking { animation: bob .34s ease-in-out infinite; }
@keyframes bob { 50% { transform: translateY(-3px); } }
@keyframes jump {
  0% { transform: scale(.85); }
  60% { transform: scale(1.08); }
  100% { transform: scale(1); }
}
</style>
