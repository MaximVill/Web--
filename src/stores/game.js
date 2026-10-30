import { reactive, computed } from 'vue'
import { MONSTERS, MONSTER_BY_ID, QUESTIONS } from '../data/monsters.js'
import { PROBES, ACCEPT_LINES, ACCEPT_REPLY } from '../data/probes.js'
import { ITEMS, ITEM_IDS } from '../data/items.js'
import { PUMPKINS } from '../data/pumpkins.js'
import { COSTUME_BY_ID } from '../data/costumes.js'
import {
  HOUSES_PER_RUN, MONSTER_CHANCE, HUMAN_MASK_CHANCE, TREAT_CHANCE, JUNK_CHANCE, MIN_QUESTIONS, SCARE_MAX, TP_MIN_SCARE,
} from '../data/config.js'
import * as sfx from '../audio/sfx.js'

const SAVE_KEY = 'scooby-halloween-save-v1'

const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1))
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

function freshInventory() {
  return Object.fromEntries(ITEM_IDS.map((i) => [i, 0]))
}

function load() {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) { /* без сохранений тоже работаем */ }
  return null
}

const saved = load() || {}

export const state = reactive({
  screen: 'title', // title | hq | street | door | escape | journal | win
  candies: saved.candies || 0,
  pumpkinLevel: saved.pumpkinLevel || 0,
  costume: saved.costume || 'sheet',
  owned: saved.owned || ['sheet'],
  journal: saved.journal || {},
  inventory: { ...freshInventory(), ...(saved.inventory || {}) },
  winSeen: !!saved.winSeen,
  muted: false,
  run: null,
  door: null,
  summary: null, // итог последнего забега
  escapeKind: null,
})

export function save() {
  try {
    const { candies, pumpkinLevel, costume, owned, journal, inventory, winSeen } = state
    localStorage.setItem(SAVE_KEY, JSON.stringify({ candies, pumpkinLevel, costume, owned, journal, inventory, winSeen }))
  } catch (e) { /* игнорируем */ }
}

export const capacity = computed(() => PUMPKINS[state.pumpkinLevel].cap)
export const photoCount = computed(() => MONSTERS.filter((m) => state.journal[m.id]).length)
export const candyMult = computed(() => 1 + 0.03 * photoCount.value)
export const costume = computed(() => state.costume)

export function toggleMute() {
  state.muted = !state.muted
  sfx.setMuted(state.muted)
}

// ---------- Штаб ----------
export function buyPumpkin() {
  const next = PUMPKINS[state.pumpkinLevel + 1]
  if (!next || state.candies < next.price) return false
  state.candies -= next.price
  state.pumpkinLevel++
  sfx.candy()
  save()
  return true
}

export function buyOrWear(id) {
  const c = COSTUME_BY_ID[id]
  if (!state.owned.includes(id)) {
    if (state.candies < c.price) return false
    state.candies -= c.price
    state.owned.push(id)
  }
  state.costume = id
  sfx.click()
  save()
  return true
}

export function go(screen) {
  state.screen = screen
}

// ---------- Забег ----------
function makeResident() {
  const m = pick(MONSTERS)
  const isMonster = Math.random() < MONSTER_CHANCE // шанс не зависит от номера дома
  return {
    monsterId: m.id,
    isMonster,
    // Соседи чаще в самодельном костюме с открытым лицом, иногда — в глухой резиновой маске.
    // Настоящий монстр всегда выглядит как «маска», поэтому расследовать нужно только таких.
    look: isMonster || Math.random() < HUMAN_MASK_CHANCE ? 'mask' : 'costume',
    variant: rnd(0, 11),
    clueIdx: rnd(0, m.clues.length - 1),
    limit: rnd(3, 4),
    offsets: { look: rnd(0, 2), habit: rnd(0, 2) },
    intro: pick(m.intros),
  }
}

export function startRun() {
  sfx.unlock()
  state.summary = null
  state.run = {
    houses: Array.from({ length: HOUSES_PER_RUN }, makeResident),
    facades: Array.from({ length: HOUSES_PER_RUN }, () => rnd(0, 2)), // вид дома не зависит от жильца
    index: 0,
    candies: 0,
    scare: 0,
    photos: 0,
  }
  state.door = null
  state.screen = 'street'
}

function endRun(reason) {
  const run = state.run
  let gained = run.candies
  if (reason === 'scare') gained = 0
  state.candies += gained
  state.summary = { reason, gained, lost: reason === 'scare' ? run.candies : 0, photos: run.photos }
  state.run = null
  state.door = null
  save()
  if (reason === 'scare') {
    state.escapeKind = 'scare'
    sfx.zoinks()
    state.screen = 'escape'
  } else if (reason === 'tp') {
    state.escapeKind = 'tp'
    state.screen = 'escape'
  } else if (reason === 'win') {
    state.winSeen = true
    save()
    state.screen = 'win'
  } else {
    state.screen = 'hq'
  }
}

export function returnToHq() {
  if (state.run) endRun('return')
}

export function finishEscape() {
  state.escapeKind = null
  state.screen = 'hq'
}

// ---------- Дверь ----------
function addCandies(n) {
  const run = state.run
  const room = capacity.value - run.candies
  const amount = Math.max(0, Math.min(room, Math.round(n * candyMult.value)))
  run.candies += amount
  if (amount) sfx.candy()
  return amount
}

export function knockDoor() {
  const run = state.run
  const resident = run.houses[run.index]
  state.door = {
    phase: 'knocking', // knocking | talk | result
    resident,
    view: 'masked', // masked | real | human | closed
    speech: resident.intro,
    kidLine: '',
    stage: 'menu', // menu — выбор вопроса | reply — ответ шкета на реплику жильца
    topic: null, // { cat, idx } — на что сейчас отвечает шкет
    acceptLine: '',
    asked: 0,
    used: { look: 0, hall: 0, habit: 0 },
    irritation: 0,
    noScare: false,
    result: null,
  }
  state.screen = 'door'
  sfx.knock()
  setTimeout(() => {
    sfx.creak()
  }, 900)
  setTimeout(() => {
    if (state.door && state.door.phase === 'knocking') {
      state.door.phase = 'talk'
      if (resident.isMonster && Math.random() < 0.5) sfx.suspicious()
    }
  }, 2100)
}

function scareGain() {
  const d = state.door
  if (d.noScare) return 0
  let g = rnd(12, 20)
  if (state.journal[d.resident.monsterId]) g *= 0.95
  if (state.costume === 'robot') g *= 1.2
  if (state.costume === 'fangs' && d.asked === 0) g *= 0.5
  return Math.round(g)
}

function setResult(r, view) {
  const d = state.door
  d.phase = 'result'
  d.result = r
  if (view) d.view = view
}

function slam(text) {
  setResult({ kind: 'slam', title: 'Бах!', text, candies: 0, item: null }, 'closed')
  sfx.laughTrack()
}

function checkScared() {
  const run = state.run
  if (run.scare >= SCARE_MAX) {
    run.scare = SCARE_MAX
    setResult({ kind: 'scared', title: 'ЗОИНКС!', text: 'Шкала испуга на максимуме! Ноги сами несут тебя прочь.', candies: 0, item: null })
    return true
  }
  return false
}

export function trickOrTreat() {
  const d = state.door
  if (d.phase !== 'talk') return
  d.kidLine = 'Сладость или гадость!'
  if (Math.random() < TREAT_CHANCE) {
    let base = rnd(4, 9)
    if (state.costume === 'robot') base *= 1.25
    const got = addCandies(base)
    setResult({ kind: 'treat', title: 'Сладость!', text: 'Жилец насыпает конфеты в тыкву и закрывает дверь.', candies: got, item: null }, 'closed')
  } else {
    let item = null
    if (Math.random() < JUNK_CHANCE) {
      item = pick(ITEM_IDS)
      state.inventory[item]++
      save()
    }
    sfx.laughTrack()
    setResult(
      {
        kind: 'trick',
        title: 'Гадость!',
        text: item
          ? `Жилец ворчит и швыряет в тебя «${ITEMS[item].name}», после чего захлопывает дверь.`
          : 'Жилец ворчит и с треском захлопывает дверь перед твоим носом.',
        candies: 0,
        item,
      },
      'closed'
    )
  }
}

// Человек раздражается от каждого вопроса; если перегнуть палку — захлопнет дверь
function annoyHuman() {
  const d = state.door
  d.irritation++
  if (d.irritation > d.resident.limit) {
    slam('Всё, хватит расспросов! Сосед теряет терпение и захлопывает дверь.')
    return true
  }
  return false
}

function spook(mult = 1) {
  const run = state.run
  run.scare += Math.round(scareGain() * mult)
  sfx.suspicious()
  checkScared()
}

export function ask(catId) {
  const d = state.door
  if (d.phase !== 'talk' || d.stage !== 'menu') return
  const res = d.resident
  const m = MONSTER_BY_ID[res.monsterId]
  d.kidLine = QUESTIONS.find((q) => q.id === catId).label

  if (!res.isMonster && annoyHuman()) return

  let text
  if (catId === 'hall') {
    const clue = m.clues[res.clueIdx]
    text = res.isMonster ? clue.tell : clue.excuse
    d.topic = { cat: 'clues', idx: res.clueIdx }
  } else {
    const pool = m[catId][res.isMonster ? 'monster' : 'human']
    const idx = (res.offsets[catId] + d.used[catId]) % pool.length
    text = pool[idx]
    d.topic = { cat: catId, idx }
  }
  if (res.isMonster && state.costume === 'fangs' && Math.random() < 0.5) text += ' ' + m.slip

  d.used[catId]++
  d.speech = text
  d.asked++
  d.stage = 'reply'
  d.acceptLine = pick(ACCEPT_LINES)
  sfx.click()

  if (res.isMonster) spook()
}

// Реплика шкета в ответ на конкретный ответ жильца
export function currentProbe() {
  const d = state.door
  if (!d || !d.topic) return null
  return PROBES[d.resident.monsterId][d.topic.cat][d.topic.idx]
}

export function probe() {
  const d = state.door
  if (d.phase !== 'talk' || d.stage !== 'reply') return
  const pr = currentProbe()
  const res = d.resident
  d.kidLine = pr.ask
  d.stage = 'menu'
  d.asked++
  sfx.click()
  if (res.isMonster) {
    d.speech = pr.monster
    spook(0.8)
  } else {
    if (annoyHuman()) return
    d.speech = pr.human
  }
}

export function accept() {
  const d = state.door
  if (d.phase !== 'talk' || d.stage !== 'reply') return
  const res = d.resident
  d.kidLine = d.acceptLine
  d.stage = 'menu'
  sfx.click()
  if (res.isMonster) {
    d.speech = pick(ACCEPT_REPLY.monster)
  } else {
    d.irritation = Math.max(0, d.irritation - 1)
    d.speech = pick(ACCEPT_REPLY.human)
  }
}

export function canAsk(catId) {
  const d = state.door
  if (!d || d.phase !== 'talk' || d.stage !== 'menu') return false
  if (catId === 'hall') return d.used.hall < 1
  return d.used[catId] < 3
}

export function canExpose() {
  const d = state.door
  return !!d && d.phase === 'talk' && d.asked >= MIN_QUESTIONS
}

function exposeMonster() {
  const d = state.door
  const run = state.run
  const id = d.resident.monsterId
  const isNew = !state.journal[id]
  if (isNew) {
    state.journal[id] = true
    run.photos++
  }
  const got = addCandies(rnd(30, 50))
  save()
  sfx.brassSting()
  setTimeout(sfx.polaroid, 500)
  setResult(
    {
      kind: 'exposed',
      title: 'МАСКА СОРВАНА!',
      text: isNew ? 'Настоящая морда! Вспышка Polaroid — снимок отправляется в «Журнал Тайн».' : 'Настоящая морда! Монстр в шоке убегает, а ты делаешь ещё один снимок.',
      candies: got,
      item: null,
      newPhoto: isNew,
      monsterId: id,
    },
    'real'
  )
}

export function expose() {
  if (!canExpose()) return
  const d = state.door
  d.kidLine = 'А ну-ка снимай маску!'
  if (d.resident.isMonster) {
    exposeMonster()
    return
  }
  // ошибка: обычный человек
  if (Math.random() < 0.5) {
    setResult({ kind: 'slam', title: 'Бах!', text: 'Оскорблённый сосед захлопывает дверь перед твоим носом.', candies: 0, item: null }, 'closed')
    sfx.laughTrack()
  } else {
    const got = addCandies(Math.max(1, Math.round(rnd(4, 9) * 0.3)))
    setResult({ kind: 'pity', title: 'Это просто сосед!', text: 'Сосед крутит пальцем у виска и отсыпает крошечную горстку конфет.', candies: got, item: null }, 'human')
    sfx.laughTrack()
  }
}

export function canUseItem(id) {
  const d = state.door
  if (!d || d.phase !== 'talk' || state.inventory[id] <= 0) return false
  if (id === 'tp') return state.run.scare >= TP_MIN_SCARE
  return true
}

export function useItem(id) {
  if (!canUseItem(id)) return
  const d = state.door
  const run = state.run
  const res = d.resident
  state.inventory[id]--
  save()
  if (id === 'tp') {
    // мгновенный побег со всеми конфетами
    endRun('tp')
    return
  }
  const real = res.isMonster
  let msg = 'Ничего не произошло. Предмет потрачен впустую.'
  if (id === 'garlic' && res.monsterId === 'vampire') {
    if (real) {
      d.noScare = true
      msg = 'Вампир морщится и отворачивается: чесночный дух его обезоруживает — пугать он больше не может.'
    } else {
      msg = 'Сосед в костюме вампира с аппетитом сосёт леденец. Ему даже нравится.'
    }
  } else if (id === 'battery' && res.monsterId === 'frankenstein') {
    if (real) {
      exposeMonster()
      return
    }
    msg = 'Сосед в костюме Франкенштейна недоумённо вертит «Крону». Он просто человек.'
  } else if (id === 'bone' && res.monsterId === 'werewolf') {
    if (real) {
      run.scare = Math.max(0, run.scare - 25)
      d.asked++
      msg = 'Оборотень умиротворённо грызёт косточку. Испуг спадает, а один вопрос задан бесплатно.'
    } else {
      msg = 'Сосед в костюме оборотня смеётся: «Это для собаки!»'
    }
  } else if (id === 'jar' && res.monsterId === 'ghost') {
    if (real) {
      d.noScare = true
      msg = 'Призрак втянут в банку! Он ослаблен и больше не может пугать.'
    } else {
      msg = 'Сосед в простыне ловит в банку муху. Призрака тут нет.'
    }
  }
  d.speech = msg
  sfx.click()
}

export function nextHouse() {
  const run = state.run
  const d = state.door
  if (!run || !d || d.phase !== 'result') return
  const kind = d.result.kind
  if (kind === 'scared') return endRun('scare')
  if (kind === 'exposed' && photoCount.value >= MONSTERS.length) return endRun('win')
  if (run.candies >= capacity.value) return endRun('full')
  if (run.index + 1 >= HOUSES_PER_RUN) return endRun('done')
  run.index++
  run.scare = Math.max(0, run.scare - 5)
  state.door = null
  state.screen = 'street'
}

export { QUESTIONS, ITEMS }
