<script setup>
import GameFrame from '../components/ui/GameFrame.vue'
import ChaseLoop from '../components/art/ChaseLoop.vue'
import { state, finishEscape } from '../stores/game.js'
</script>

<template>
  <GameFrame
    :heading="state.escapeKind === 'tp' ? 'Улюлю!' : 'Зоинкс!'"
  >
    <template #stage>
      <ChaseLoop :costume="state.costume" :label="state.escapeKind === 'tp' ? 'УЛЮЛЮ!' : 'ЗОИНКС!'" @done="finishEscape" />
    </template>
    <template #side>
    </template>
  </GameFrame>
</template>
