<script setup>
import { computed, ref, watch } from 'vue'
import GameFrame from '../components/ui/GameFrame.vue'
import DoorScene from '../components/art/DoorScene.vue'
import Hud from '../components/ui/Hud.vue'
import Inventory from '../components/ui/Inventory.vue'
import MiniJournal from '../components/ui/MiniJournal.vue'
import PhotoReveal from '../components/ui/PhotoReveal.vue'
import Icon from '../components/ui/Icon.vue'
import { ITEMS } from '../data/items.js'
import { QUESTIONS } from '../data/monsters.js'
import { MIN_QUESTIONS } from '../data/config.js'
import {
  state, trickOrTreat, ask, canAsk, probe, accept, currentProbe, expose, canExpose, nextHouse, returnToHq,
} from '../stores/game.js'

const d = computed(() => state.door)
const run = computed(() => state.run)
const talking = computed(() => d.value.phase === 'talk')
const flash = computed(() => d.value.result?.kind === 'exposed')
const res = computed(() => d.value.result)

// Человек злится от расспросов — это видно по лицу, если он без маски
const mood = computed(() => {
  const r = d.value.resident
  if (r.isMonster) return 'calm'
  if (d.value.irritation >= r.limit) return 'angry'
  if (d.value.irritation >= 2) return 'annoyed'
  return 'calm'
})

const residentText = computed(() => (d.value.phase === 'result' ? res.value.text : d.value.speech))
const residentName = computed(() => (d.value.phase === 'result' ? res.value.title : 'Жилец'))
const pr = computed(() => (d.value.stage === 'reply' ? currentProbe() : null))
const left = computed(() => Math.max(0, MIN_QUESTIONS - d.value.asked))

const heading = computed(() => {
  if (d.value.phase === 'knocking') return 'Тук-тук...'
  if (d.value.phase === 'result') return res.value.kind === 'scared' ? 'Зоинкс!' : 'Дело закрыто'
  return d.value.stage === 'reply' ? 'Что ответишь?' : 'Твой ход'
})

// *слово* → подсветка у Детектива
const fmt = (t) => {
  const esc = (t || '').replace(/&/g, '&amp;').replace(/</g, '&lt;')
  return esc.replace(/\*([^*]+)\*/g, (_, w) => (state.costume === 'detective' ? `<mark class="clue">${w}</mark>` : w))
}

// Polaroid всплывает после удачного разоблачения
const showPhoto = ref(false)
watch(flash, (v) => { if (v) showPhoto.value = true })

const tailColor = computed(() => {
  const k = res.value?.kind
  if (k === 'treat' || k === 'exposed') return '#e9f5c0'
  if (k === 'slam' || k === 'trick' || k === 'pity') return '#ffd9cf'
  if (k === 'scared') return '#ffe94a'
  return '#fff4c9'
})

// Перезапускаем анимацию облачков при каждой новой реплике
const lineKey = computed(() => `${d.value.speech}|${d.value.phase}|${d.value.kidLine}`)
</script>

<template>
  <div v-if="d && run">
  <GameFrame :heading="heading">
    <template #hud><Hud /></template>

    <template #stage>
      <DoorScene :resident="d.resident" :phase="d.phase" :view="d.view" :talking="talking" :flash="flash" :mood="mood">
        <div v-if="d.phase !== 'knocking'" :key="'r' + lineKey" class="speech" :class="[res?.kind, { long: residentText.length > 90 }]">
          <span class="name">{{ residentName }}</span>
          <span v-html="fmt(residentText)"></span>
        </div>
        <div v-if="d.phase !== 'knocking'" :key="'t' + lineKey" class="tail res" :style="{ '--tail': tailColor }"></div>
        <div v-if="d.kidLine && d.phase !== 'knocking'" :key="'k' + lineKey" class="speech kid" :class="{ long: d.kidLine.length > 40 }">
          <span class="name">Ты</span>{{ d.kidLine }}
        </div>
      </DoorScene>
    </template>

    <template #side>
      <!-- Ответ на конкретную реплику жильца -->
      <template v-if="d.phase === 'talk' && d.stage === 'reply' && pr">
        <button class="choice kid" data-n="1" @click="probe">{{ pr.ask }}</button>
        <button class="choice" data-n="2" @click="accept">{{ d.acceptLine }}</button>
        <button class="choice primary" @click="trickOrTreat">Сладость или гадость!</button>
        <button class="choice bust" :disabled="!canExpose()" @click="expose">
          Сорвать маску!
          <span class="pips"><i v-for="n in MIN_QUESTIONS" :key="n" :class="{ on: d.asked >= n }"></i></span>
        </button>
      </template>

      <!-- Выбор вопроса -->
      <template v-else-if="d.phase === 'talk'">
        <button class="choice primary" @click="trickOrTreat">Сладость или гадость!</button>
        <button
          v-for="(q, i) in QUESTIONS"
          :key="q.id"
          class="choice"
          :data-n="i + 1"
          :disabled="!canAsk(q.id)"
          @click="ask(q.id)"
        >{{ q.label }}</button>
        <button class="choice bust" :disabled="!canExpose()" @click="expose">
          Сорвать маску!
          <span class="pips"><i v-for="n in MIN_QUESTIONS" :key="n" :class="{ on: d.asked >= n }"></i></span>
        </button>
        <Inventory />
      </template>

      <!-- Итог у двери -->
      <template v-else-if="d.phase === 'result'">
        <div v-if="res.candies || res.item" class="loot">
          <span v-if="res.candies"><Icon name="candy" :size="24" /> +{{ res.candies }}</span>
          <span v-if="res.item"><Icon :name="res.item" :size="24" /> {{ ITEMS[res.item].name }}</span>
        </div>
        <button class="choice next" @click="nextHouse">{{ res.kind === 'scared' ? 'Бежать!' : 'К следующему дому →' }}</button>
        <button v-if="res.kind !== 'scared'" class="choice ret" @click="returnToHq">Вернуться в штаб</button>
      </template>


      <MiniJournal />
    </template>
  </GameFrame>

  <PhotoReveal
    v-if="showPhoto && res?.kind === 'exposed'"
    :id="res.monsterId"
    :is-new="res.newPhoto"
    @close="showPhoto = false"
  />
  </div>
</template>

<style scoped>
.speech {
  position: absolute; z-index: 9; top: 5%; left: 3%; width: 30%;
  max-height: 46%; overflow: hidden;
  padding: 10px 14px 11px; color: #201527; background: #fff4c9;
  border: 4px solid #171321; border-radius: 18px;
  box-shadow: 5px 6px 0 rgba(7, 7, 14, .64);
  font-weight: 800; font-size: clamp(11px, 1.15vw, 16px); line-height: 1.28;
  overflow-wrap: anywhere; hyphens: auto;
  transform: rotate(-1.2deg);
  animation: pop .35s cubic-bezier(.2, .9, .3, 1.3) both;
}
.speech.long { font-size: clamp(10px, 1vw, 14px); }
.tail { position: absolute; z-index: 10; width: 34px; height: 26px; pointer-events: none; animation: pop .35s both; }
.tail::before, .tail::after { content: ''; position: absolute; inset: 0; clip-path: polygon(0 0, 100% 100%, 30% 0); }
.tail::before { background: #171321; }
.tail::after { background: var(--tail, #fff4c9); inset: 4px 7px 6px 4px; }
.tail.res { top: calc(5% + 22px); left: calc(33% - 6px); transform: rotate(-30deg); }
.speech .name { display: block; margin-bottom: 3px; color: #b23e4d; font-family: var(--font-title); font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; font-size: .95em; }
.speech.treat, .speech.exposed { background: #e9f5c0; }
.speech.slam, .speech.trick, .speech.pity { background: #ffd9cf; }
.speech.scared { background: #ffe94a; }
.speech.kid {
  top: auto; bottom: 5%; left: auto; right: 3%; width: 27%; background: #ffe2c2;
  transform: rotate(1deg);
}
.speech.kid .name { color: #2b3563; }
.pips { display: inline-flex; gap: 5px; margin-left: 8px; vertical-align: middle; }
.pips i { width: 10px; height: 10px; border-radius: 50%; border: 2px solid #231a29; background: #fff2bf; }
.pips i.on { background: #231a29; }
.loot { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; font-family: var(--font-title); font-weight: 700; font-size: 20px; padding: 6px 0; }
.loot span { display: inline-flex; align-items: center; gap: 6px; }
@keyframes pop { from { opacity: 0; transform: scale(.7) rotate(-6deg); } }
@media (max-width: 600px) {
  .speech { top: 3%; left: 3%; width: 46%; max-height: 60%; font-size: 10.5px; padding: 6px 8px; border-radius: 12px; border-width: 3px; }
  .speech.long { font-size: 9.5px; }
  .speech.kid, .tail { display: none; }
}
</style>
