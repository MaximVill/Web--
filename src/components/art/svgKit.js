// Мелкие помощники для рисования SVG строками.
export const INK = '#15121c'

export const st = (w = 3) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`

// Заливка с контуром
export const P = (d, fill, w = 3) => `<path d="${d}" fill="${fill}" ${st(w)}/>`
// Плоская тень/блик без контура
export const S = (d, fill, op = 1) => `<path d="${d}" fill="${fill}"${op !== 1 ? ` opacity="${op}"` : ''}/>`
// Линия
export const L = (d, w = 2, col = INK) =>
  `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`
export const C = (cx, cy, r, fill, w = 3) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${st(w)}/>`
export const E = (cx, cy, rx, ry, fill, w = 3) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" ${st(w)}/>`

// Затемнить/осветлить цвет
export function shade(hex, f) {
  const n = parseInt(hex.slice(1), 16)
  const ch = (v) => Math.max(0, Math.min(255, Math.round(f < 0 ? v * (1 + f) : v + (255 - v) * f)))
  const r = ch(n >> 16)
  const g = ch((n >> 8) & 255)
  const b = ch(n & 255)
  return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)
}

// Зеркалим путь относительно x = 100 (только абсолютные M L Q C T H V Z)
export function mirror(d, axis = 100) {
  const out = []
  const re = /([MLQCTHVZ])([^MLQCTHVZ]*)/gi
  let m
  while ((m = re.exec(d))) {
    const cmd = m[1]
    const nums = (m[2].match(/-?\d*\.?\d+/g) || []).map(Number)
    let mapped
    const rel = cmd === cmd.toLowerCase()
    const fx = (x) => (rel ? -x : 2 * axis - x)
    if (cmd === 'H' || cmd === 'h') mapped = nums.map(fx)
    else if (cmd === 'V' || cmd === 'v' || cmd === 'Z' || cmd === 'z') mapped = nums
    else mapped = nums.map((v, i) => (i % 2 === 0 ? fx(v) : v))
    out.push(cmd + mapped.map((v) => +v.toFixed(2)).join(' '))
  }
  return out.join(' ')
}

// Пара симметричных путей
export const PP = (d, fill, w = 3) => P(d, fill, w) + P(mirror(d), fill, w)
export const SS = (d, fill, op = 1) => S(d, fill, op) + S(mirror(d), fill, op)
export const LL = (d, w = 2, col = INK) => L(d, w, col) + L(mirror(d), w, col)
