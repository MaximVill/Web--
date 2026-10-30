<script setup>
import { computed } from 'vue'
import GameFrame from '../components/ui/GameFrame.vue'
import Kid from '../components/art/Kid.vue'
import HqBackground from '../components/art/HqBackground.vue'
import Icon from '../components/ui/Icon.vue'
import MiniJournal from '../components/ui/MiniJournal.vue'
import { PUMPKINS } from '../data/pumpkins.js'
import { COSTUMES } from '../data/costumes.js'
import { ITEMS, ITEM_IDS } from '../data/items.js'
import { state, startRun, buyPumpkin, buyOrWear, go } from '../stores/game.js'

const next = computed(() => PUMPKINS[state.pumpkinLevel + 1] || null)
const report = computed(() => {
  const s = state.summary
  if (!s) return ''
  if (s.reason === 'scare') return `зоинкс! потеряно ${s.lost} конфет`
  return `принесено ${s.gained} конфет${s.photos ? ` · снимков: ${s.photos}` : ''}`
})
function costumeAction(c) {
  if (state.costume === c.id) return 'надет'
  if (state.owned.includes(c.id)) return 'надеть'
  return `${c.price} конфет`
}
</script>

<template>
  <GameFrame heading="Штаб" :sub="report">
    <template #hud>
      <div class="chip"><Icon name="candy" :size="18" /> Конфеты <strong>{{ state.candies }}</strong></div>
      <div class="chip"><Icon name="pumpkin" :size="18" /> Тыква <strong>{{ PUMPKINS[state.pumpkinLevel].cap }}</strong></div>
    </template>

    <template #stage>
      <div class="stageframe">
        <HqBackground />
        <div class="spot"></div>
        <div class="hero"><Kid :costume="state.costume" /></div>
        <div class="pockets">
          <span v-for="id in ITEM_IDS" :key="id" class="pk" :class="{ none: !state.inventory[id] }" :title="ITEMS[id].name">
            <Icon :name="id" :size="26" /><b>{{ state.inventory[id] }}</b>
          </span>
        </div>
      </div>
    </template>

    <template #side>
      <button class="choice primary" @click="startRun">В ночь!</button>
      <button class="choice dark" @click="go('journal')">Журнал тайн</button>

      <div class="sect">Тыква-корзинка</div>
      <button class="choice" data-n="★" :disabled="!next || state.candies < next.price" @click="buyPumpkin">
        <template v-if="next">{{ next.name }}<span class="note">{{ next.price }} конфет</span></template>
        <template v-else>{{ PUMPKINS[state.pumpkinLevel].name }}</template>
      </button>

      <div class="sect">Костюмы</div>
      <button
        v-for="(c, i) in COSTUMES"
        :key="c.id"
        class="choice cos"
        :class="{ worn: state.costume === c.id }"
        :data-n="i + 1"
        :disabled="state.costume === c.id || (!state.owned.includes(c.id) && state.candies < c.price)"
        @click="buyOrWear(c.id)"
      >
        <span class="pv"><Kid :costume="c.id" /></span>
        <span class="ct" :title="c.desc">{{ c.name }}<span class="note">{{ costumeAction(c) }}</span></span>
      </button>

      <MiniJournal />
    </template>
  </GameFrame>
</template>

<style scoped>
.spot { position: absolute; left: 30%; right: 30%; bottom: 4%; height: 14%; border-radius: 50%; background: radial-gradient(ellipse, rgba(255, 220, 140, .55), transparent 70%); }
.hero { position: absolute; left: 50%; bottom: 7%; height: 58%; aspect-ratio: 120 / 190; transform: translateX(-50%); animation: idle 3.6s ease-in-out infinite; }
@keyframes idle { 50% { transform: translateX(-50%) translateY(-6px) rotate(.5deg); } }
.pockets { position: absolute; right: 12px; top: 12px; display: flex; gap: 6px; }
.pk { position: relative; background: #fff2bf; border: 3px solid #231a29; box-shadow: 3px 4px 0 #05060d; padding: 3px; display: grid; place-items: center; }
.pk b { position: absolute; right: -8px; bottom: -8px; background: #f18b39; border: 2px solid #211727; font-family: var(--font-title); font-size: 12px; padding: 0 4px; color: #211727; }
.pk.none { opacity: .4; filter: grayscale(1); }
.sect { font-family: var(--font-title); font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; font-size: 15px; margin-top: 4px; border-top: 2px dashed #8f6b62; padding-top: 10px; }
.choice.cos { display: flex; align-items: center; gap: 8px; padding-top: 6px; padding-bottom: 6px; }
.choice.cos.worn { background: #d7e78a; opacity: 1; }
.pv { width: 30px; height: 46px; flex: none; }
.pv :deep(svg) { width: 100%; height: 100%; }
.ct { display: flex; flex-direction: column; }
</style>
