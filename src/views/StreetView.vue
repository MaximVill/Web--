<script setup>
import { computed } from 'vue'
import GameFrame from '../components/ui/GameFrame.vue'
import NightBackground from '../components/art/NightBackground.vue'
import HouseFacade from '../components/art/HouseFacade.vue'
import Kid from '../components/art/Kid.vue'
import Hud from '../components/ui/Hud.vue'
import Inventory from '../components/ui/Inventory.vue'
import MiniJournal from '../components/ui/MiniJournal.vue'
import { state, knockDoor, returnToHq } from '../stores/game.js'

const run = computed(() => state.run)
const kind = computed(() => run.value.facades[run.value.index])
</script>

<template>
  <GameFrame v-if="run" :heading="`Дом №${run.index + 1}`">
    <template #hud><Hud /></template>
    <template #stage>
      <div class="stageframe">
        <NightBackground />
        <div class="facade"><HouseFacade :key="run.index" :kind="kind" /></div>
        <div class="kid"><Kid :costume="state.costume" /></div>
      </div>
    </template>
    <template #side>
      <button class="choice primary" @click="knockDoor">Постучать в дверь</button>
      <button class="choice ret" @click="returnToHq">В штаб</button>
      <Inventory :usable="false" />
      <MiniJournal />
    </template>
  </GameFrame>
</template>

<style scoped>
.facade { position: absolute; left: 8%; right: 8%; top: 14%; bottom: 6%; animation: approach .6s ease-out; }
@keyframes approach { from { transform: scale(.85); opacity: 0; } }
.kid { position: absolute; left: 26%; bottom: 2%; height: 46%; aspect-ratio: 120 / 190; animation: idle 3.6s ease-in-out infinite; }
@keyframes idle { 50% { transform: translateY(-5px) rotate(.5deg); } }
</style>
