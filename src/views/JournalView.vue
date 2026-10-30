<script setup>
import GameFrame from '../components/ui/GameFrame.vue'
import Polaroid from '../components/art/Polaroid.vue'
import Icon from '../components/ui/Icon.vue'
import { MONSTERS } from '../data/monsters.js'
import { state, go, photoCount } from '../stores/game.js'
const tilts = [-3, 2, -1.5, 3, -2, 1.5, -3.5, 2.5]
</script>

<template>
  <GameFrame heading="Журнал тайн" >
    <template #hud>
      <div class="chip"><Icon name="camera" :size="18" /> Снимки <strong>{{ photoCount }}/8</strong></div>
    </template>
    <template #stage>
      <div class="stageframe board">
        <div class="grid">
          <div v-for="(m, i) in MONSTERS" :key="m.id" class="slot">
            <Polaroid :id="state.journal[m.id] ? m.id : null" :tilt="tilts[i]" />
          </div>
        </div>
      </div>
    </template>
    <template #side>
      <button class="choice primary" @click="go('hq')">Назад в штаб</button>
    </template>
  </GameFrame>
</template>

<style scoped>
.board { background: repeating-linear-gradient(45deg, #6b4a2a 0 14px, #62432a 14px 28px); display: grid; place-items: center; }
.grid { width: 88%; display: grid; grid-template-columns: repeat(4, 1fr); gap: 5% 4%; }
@media (max-width: 600px) { .grid { gap: 3%; } }
</style>
