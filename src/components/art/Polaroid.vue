<script setup>
import MonsterFigure from './MonsterFigure.vue'
import { MONSTER_BY_ID } from '../../data/monsters.js'

defineProps({
  id: { type: String, default: null }, // null — пустой слот
  tilt: { type: Number, default: 0 },
})
</script>

<template>
  <div class="polaroid" :class="{ empty: !id }" :style="{ transform: `rotate(${tilt}deg)` }">
    <div class="pin"></div>
    <div class="photo">
      <MonsterFigure v-if="id" :id="id" mode="real" view="10 -26 180 180" />
      <div v-else class="q">?</div>
    </div>
    <div class="cap">{{ id ? MONSTER_BY_ID[id].name.toUpperCase() : '' }}</div>
  </div>
</template>

<style scoped>
.polaroid {
  position: relative;
  background: #f8f4e6;
  border: 3px solid #111;
  padding: 8px 8px 4px;
  box-shadow: 4px 6px 0 rgba(0, 0, 0, .55);
  width: 100%;
}
.polaroid.empty { background: rgba(255, 255, 255, .08); border-style: dashed; box-shadow: none; }
.pin {
  position: absolute; top: -8px; left: 50%; width: 14px; height: 14px; margin-left: -7px;
  border-radius: 50%; background: #d11; border: 3px solid #111;
}
.photo {
  aspect-ratio: 1 / 1;
  background: radial-gradient(circle at 50% 40%, #3d6a8a, #13203a 75%);
  border: 3px solid #111;
  overflow: hidden;
  display: flex; align-items: flex-start; justify-content: center;
}
.q { align-self: center; font-family: Impact, sans-serif; font-size: 64px; color: rgba(255, 255, 255, .3); }
.cap {
  text-align: center; color: #111; font-family: var(--font-title);
  letter-spacing: 1px; font-size: 15px; height: 24px; line-height: 24px;
}
</style>
