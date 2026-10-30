// Процедурный синтезатор ретро-звуков (Web Audio API), без внешних файлов.
let ctx = null
let master = null
let muted = false

function ensure() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    ctx = new AC()
    master = ctx.createGain()
    master.gain.value = 0.7
    master.connect(ctx.destination)
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

export function unlock() {
  ensure()
}

export function setMuted(v) {
  muted = v
}

function noiseBuffer(c, dur) {
  const buf = c.createBuffer(1, Math.floor(c.sampleRate * dur), c.sampleRate)
  const d = buf.getChannelData(0)
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
  return buf
}

function tone({ type = 'sine', f = 220, f2 = null, t = 0, dur = 0.3, vol = 0.3, attack = 0.01, filter = null }) {
  const c = ensure()
  if (!c || muted) return
  const o = c.createOscillator()
  const g = c.createGain()
  const t0 = c.currentTime + t
  o.type = type
  o.frequency.setValueAtTime(f, t0)
  if (f2 != null) o.frequency.exponentialRampToValueAtTime(Math.max(1, f2), t0 + dur)
  g.gain.setValueAtTime(0.0001, t0)
  g.gain.linearRampToValueAtTime(vol, t0 + attack)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  let node = o
  if (filter) {
    const fl = c.createBiquadFilter()
    fl.type = filter.type || 'lowpass'
    fl.frequency.value = filter.f
    fl.Q.value = filter.q || 1
    o.connect(fl)
    node = fl
  }
  node.connect(g)
  g.connect(master)
  o.start(t0)
  o.stop(t0 + dur + 0.05)
}

function noise({ t = 0, dur = 0.2, vol = 0.3, ftype = 'lowpass', f = 1000, q = 1, f2 = null }) {
  const c = ensure()
  if (!c || muted) return
  const src = c.createBufferSource()
  src.buffer = noiseBuffer(c, dur + 0.05)
  const fl = c.createBiquadFilter()
  fl.type = ftype
  fl.Q.value = q
  const t0 = c.currentTime + t
  fl.frequency.setValueAtTime(f, t0)
  if (f2 != null) fl.frequency.exponentialRampToValueAtTime(f2, t0 + dur)
  const g = c.createGain()
  g.gain.setValueAtTime(vol, t0)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  src.connect(fl)
  fl.connect(g)
  g.connect(master)
  src.start(t0)
  src.stop(t0 + dur + 0.05)
}

// 1. Стук молотка + скрип двери
export function knock() {
  for (let i = 0; i < 3; i++) {
    const t = i * 0.28
    tone({ type: 'sine', f: 130, f2: 55, t, dur: 0.18, vol: 0.9 })
    noise({ t, dur: 0.07, vol: 0.5, f: 500 })
  }
}

export function creak() {
  const c = ensure()
  if (!c || muted) return
  const o = c.createOscillator()
  const g = c.createGain()
  const fl = c.createBiquadFilter()
  const t0 = c.currentTime
  o.type = 'sawtooth'
  o.frequency.setValueAtTime(180, t0)
  o.frequency.linearRampToValueAtTime(420, t0 + 0.6)
  o.frequency.linearRampToValueAtTime(260, t0 + 1.2)
  fl.type = 'bandpass'
  fl.frequency.value = 900
  fl.Q.value = 8
  g.gain.setValueAtTime(0.0001, t0)
  g.gain.linearRampToValueAtTime(0.22, t0 + 0.1)
  g.gain.linearRampToValueAtTime(0.14, t0 + 0.9)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.3)
  // дрожание для «скрипа»
  const lfo = c.createOscillator()
  const lg = c.createGain()
  lfo.frequency.value = 17
  lg.gain.value = 40
  lfo.connect(lg)
  lg.connect(o.frequency)
  o.connect(fl)
  fl.connect(g)
  g.connect(master)
  o.start(t0)
  lfo.start(t0)
  o.stop(t0 + 1.4)
  lfo.stop(t0 + 1.4)
}

// 2. Тревожный низкий аккорд (фагот / бас)
export function suspicious() {
  const base = [98, 116.5, 138.6]
  base.forEach((f) =>
    tone({ type: 'sawtooth', f, f2: f * 0.97, dur: 1.1, vol: 0.13, attack: 0.15, filter: { f: 500, q: 2 } })
  )
  tone({ type: 'sine', f: 49, dur: 1.2, vol: 0.3, attack: 0.1 })
}

// 3. Брасс-аккорд при срывании маски
export function brassSting() {
  const chord = [196, 247, 294, 392, 494]
  chord.forEach((f) => {
    tone({ type: 'sawtooth', f, f2: f * 1.01, dur: 0.9, vol: 0.16, attack: 0.02, filter: { f: 2400, q: 2 } })
    tone({ type: 'square', f: f / 2, dur: 0.8, vol: 0.08, attack: 0.02, filter: { f: 1200 } })
  })
  noise({ dur: 0.15, vol: 0.3, ftype: 'highpass', f: 3000 })
}

// 4. Бонго-бег
export function bongoRun(beats = 24) {
  for (let i = 0; i < beats; i++) {
    const t = i * 0.12
    const hi = i % 3 === 0
    tone({ type: 'triangle', f: hi ? 420 : 300, f2: hi ? 300 : 190, t, dur: 0.1, vol: 0.5 })
    noise({ t, dur: 0.03, vol: 0.2, ftype: 'bandpass', f: 1800, q: 2 })
  }
}

// 5. Консервированный смех
export function laughTrack() {
  const c = ensure()
  if (!c || muted) return
  const voices = 7
  for (let v = 0; v < voices; v++) {
    const start = Math.random() * 0.25
    const baseF = 220 + Math.random() * 260
    const haCount = 5 + Math.floor(Math.random() * 3)
    for (let h = 0; h < haCount; h++) {
      const t = start + h * (0.13 + Math.random() * 0.03)
      const f = baseF * (1 + (Math.random() - 0.5) * 0.12)
      const dur = 0.11
      // формантный «ха»
      tone({ type: 'sawtooth', f, f2: f * 0.85, t, dur, vol: 0.06, filter: { type: 'bandpass', f: 800 + Math.random() * 400, q: 3 } })
      noise({ t, dur: 0.09, vol: 0.05, ftype: 'bandpass', f: 1500, q: 1.5 })
    }
  }
}

// 6. Polaroid: щелчок и писк зарядки вспышки
export function polaroid() {
  noise({ dur: 0.04, vol: 0.6, ftype: 'highpass', f: 2000 })
  tone({ type: 'square', f: 140, dur: 0.05, vol: 0.2 })
  tone({ type: 'sine', f: 800, f2: 3800, t: 0.18, dur: 0.9, vol: 0.09, attack: 0.05 })
}

export function candy() {
  tone({ type: 'triangle', f: 880, t: 0, dur: 0.08, vol: 0.15 })
  tone({ type: 'triangle', f: 1320, t: 0.08, dur: 0.12, vol: 0.15 })
}

export function zoinks() {
  tone({ type: 'sawtooth', f: 300, f2: 900, dur: 0.35, vol: 0.2, filter: { f: 2000 } })
  tone({ type: 'sawtooth', f: 900, f2: 200, t: 0.35, dur: 0.4, vol: 0.2, filter: { f: 2000 } })
}

export function click() {
  tone({ type: 'square', f: 520, dur: 0.04, vol: 0.08 })
}
