<script setup>
import Polaroid from '../art/Polaroid.vue'
import * as sfx from '../../audio/sfx.js'
defineProps({ id: { type: String, required: true }, isNew: { type: Boolean, default: true } })
const emit = defineEmits(['close'])
</script>

<template>
  <div class="reveal" @click.self="emit('close')">
    <div class="box">
      <div class="pol"><Polaroid :id="id" :tilt="-4" /></div>
      <button class="choice primary" @click="sfx.click(); emit('close')">Вклеить в журнал!</button>
    </div>
  </div>
</template>

<style scoped>
.reveal { position: fixed; inset: 0; z-index: 70; display: grid; place-items: center; padding: 20px; background: rgba(5, 7, 16, .72); animation: fade .25s .5s both; }
.box { width: min(340px, 82vw); display: flex; flex-direction: column; gap: 12px; align-items: stretch; }
.pol { animation: pop .4s .5s cubic-bezier(.18, .88, .23, 1.3) both; }
.note { text-align: center; color: #b7dc77; }
@keyframes fade { from { opacity: 0; } }
@keyframes pop { from { transform: scale(.6) rotate(-10deg); } }
</style>
