<script setup>
import { computed } from 'vue'
import Icon from './Icon.vue'
import { state, capacity } from '../../stores/game.js'
import { HOUSES_PER_RUN } from '../../data/config.js'

const run = computed(() => state.run)
const scare = computed(() => Math.round(run.value?.scare || 0))
</script>

<template>
  <template v-if="run">
    <div class="chip">Дом <strong>{{ run.index + 1 }} / {{ HOUSES_PER_RUN }}</strong></div>
    <div class="chip">
      <Icon name="pumpkin" :size="18" /> Тыква <strong>{{ run.candies }}/{{ capacity }}</strong>
    </div>
    <div class="chip" :class="{ hot: scare >= 60 }">
      <span class="face" :class="{ shaking: scare >= 60 }"><Icon name="scare" :size="18" /></span>
      Испуг <strong>{{ scare }}%</strong>
    </div>
  </template>
</template>

<style scoped>
.face { display: inline-flex; }
.shaking { animation: shake .2s linear infinite; }
</style>
