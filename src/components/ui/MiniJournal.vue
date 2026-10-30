<script setup>
import MonsterFigure from '../art/MonsterFigure.vue'
import { MONSTERS } from '../../data/monsters.js'
import { state, photoCount } from '../../stores/game.js'
</script>

<template>
  <div class="mj">
    <h3>Журнал тайн <span>{{ photoCount }}/8</span></h3>
    <div class="cards">
      <div
        v-for="(m, i) in MONSTERS"
        :key="m.id"
        class="cc"
        :class="{ found: state.journal[m.id] }"
        :style="{ '--r': (i % 2 ? 2 : -2) + 'deg' }"
        :title="state.journal[m.id] ? m.name : '???'"
      >
        <div v-if="state.journal[m.id]" class="face"><MonsterFigure :id="m.id" mode="real" view="40 0 120 120" /></div>
        <template v-else>?</template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mj { border-top: 4px solid #3a2947; margin: 4px -14px 0; padding: 12px 14px 0; }
h3 { margin: 0 0 8px; font-family: var(--font-title); font-weight: 700; font-size: 18px; letter-spacing: 1.5px; text-transform: uppercase; }
h3 span { color: #b23e4d; }
.cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 7px; }
.cc {
  height: 46px; border: 2px dashed #694a62; background: #fff0bc; display: grid; place-items: center; overflow: hidden;
  font-family: var(--font-title); font-weight: 700; font-size: 17px; color: #9c7880; transform: rotate(var(--r));
}
.cc.found { border-style: solid; border-color: #3d2937; background: #e86d51; box-shadow: 2px 2px #3a2533; }
.face { width: 100%; height: 100%; }
</style>
