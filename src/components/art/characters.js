// Персонажи в духе «Где ты, Скуби-Ду?» (1969): плоская заливка, одна тень, чёрный контур.
// viewBox 0 0 200 280 — средний план (голова, торс, руки), как будто жилец стоит в дверях.
//
// mode:
//  'masked'   — облик монстра (настоящий монстр ИЛИ сосед в глухой резиновой маске — не отличить)
//  'real'     — сорванная «маска» оказалась настоящей мордой
//  'costume'  — обычный человек в самодельном костюме, лицо видно
//  'unmasked' — сосед, с которого стянули резиновую маску
import { INK, P, S, L, C, E, PP, SS, LL, shade, mirror } from './svgKit.js'

// ---------------- общие формы ----------------
const TORSO = 'M60 116 Q100 104 140 116 Q154 122 156 140 L160 284 L40 284 L44 140 Q46 122 60 116Z'
const NECK = 'M88 90 L88 118 Q100 126 112 118 L112 90Z'
const HEAD = 'M68 56 Q66 22 100 20 Q134 22 132 56 Q134 82 124 96 Q112 110 100 110 Q88 110 76 96 Q66 82 68 56Z'
const HEAD_SH = 'M120 28 Q134 36 132 56 Q134 82 124 96 Q112 110 100 110 Q116 100 122 80 Q126 56 120 28Z'
const EAR = 'M70 58 Q57 52 58 67 Q59 81 72 80Z'
const ARM = 'M60 118 Q42 124 38 158 Q34 192 37 224 L58 224 Q56 194 60 166 Q62 148 68 134Z'
const ARM_SH = 'M60 160 Q58 190 58 224 L50 224 Q50 190 54 164Z'

// ---------------- ноги (полный рост) ----------------
const LEG = 'M60 274 L99 274 L97 416 L68 416Z'
const RAG = 'M60 274 L99 274 L98 376 L92 368 L86 380 L80 370 L74 382 L68 372 L63 378Z'
const SHIN = 'M66 360 L96 360 L96 418 L67 418Z'
const SHOE = 'M64 412 H98 Q101 424 96 432 H58 Q50 431 52 422 Q55 413 64 412Z'
const BOOT = 'M65 350 L98 350 L98 416 L65 416Z'
const SHADOW = '<ellipse cx="100" cy="434" rx="66" ry="9" fill="#000" opacity=".28"/>'

function legs({ pants, shoe = null, ragged = false, skin = '#f2c6a0', boot = null, claws = false, stripes = null }) {
  let s = ''
  if (ragged) s += PP(SHIN, skin)
  s += PP(ragged ? RAG : LEG, pants)
  if (stripes) s += LL([300, 322, 344, 366, 388].map((y) => `M${61 + (y - 274) * 0.06} ${y} L${98.7 - (y - 274) * 0.01} ${y}`).join(' '), 7, stripes)
  s += L('M99 286 L98 410', 1.5, 'rgba(0,0,0,.35)')
  if (boot) s += PP(BOOT, boot)
  if (shoe) {
    s += PP(SHOE, shoe)
  } else {
    // босые ступни
    s += PP(SHOE, skin) + LL('M60 424 L58 432 M68 424 L67 432 M76 424 L76 432', 1.5)
    if (claws) s += PP('M54 430 L50 438 L60 433Z M64 432 L62 440 L70 434Z M74 432 L74 440 L80 433Z', '#f2ecd8', 1.5)
  }
  return s
}

function hand(skin, x0 = 35, t = 220, w = 24) {
  const d = `M${x0} ${t} Q${x0 - 4} ${t + 16} ${x0 - 1} ${t + 28} Q${x0 + 2} ${t + 37} ${x0 + 7} ${t + 34} Q${x0 + 11} ${t + 39} ${x0 + 15} ${t + 34} Q${x0 + 19} ${t + 37} ${x0 + 21} ${t + 30} Q${x0 + w + 2} ${t + 16} ${x0 + w - 2} ${t}Z`
  const fingers = `M${x0 + 7} ${t + 24} L${x0 + 7} ${t + 33} M${x0 + 14} ${t + 24} L${x0 + 14} ${t + 33}`
  return P(d, skin) + L(fingers, 1.5) + P(mirror(d), skin) + L(mirror(fingers), 1.5)
}

function clawHand(skin, x0 = 35, t = 220) {
  const base = hand(skin, x0, t)
  const claws = `M${x0 - 1} ${t + 28} L${x0 - 3} ${t + 40} L${x0 + 3} ${t + 33} M${x0 + 7} ${t + 34} L${x0 + 7} ${t + 45} L${x0 + 11} ${t + 36} M${x0 + 15} ${t + 34} L${x0 + 16} ${t + 45} L${x0 + 19} ${t + 34}`
  return base + P(claws, '#f2ecd8', 1.5) + P(mirror(claws), '#f2ecd8', 1.5)
}

// ---------------- лица ----------------
function eye(x, y, o = {}) {
  const rx = o.rx || 5.5
  const ry = o.ry || 6.5
  if (o.blink) return L(`M${x - rx} ${y} Q${x} ${y + 3.5} ${x + rx} ${y}`, 2.5)
  if (o.real) {
    return (
      E(x, y, rx + 1, ry + 1, '#ffe95a', 2.5) +
      `<ellipse cx="${x}" cy="${y}" rx="1.6" ry="${ry - 0.5}" fill="#c40000"/>` +
      `<circle cx="${x}" cy="${y}" r="${rx + 5}" fill="#fff36b" opacity=".25"/>`
    )
  }
  let s = E(x, y, rx, ry, o.sclera || '#fbf8ee', 2.5)
  s += `<circle cx="${x + (o.look || 1)}" cy="${y + 1}" r="${o.ir || rx * 0.55}" fill="${o.iris || INK}"/>`
  if (o.iris && o.iris !== INK) s += `<circle cx="${x + (o.look || 1)}" cy="${y + 1}" r="${(o.ir || rx * 0.55) * 0.5}" fill="${INK}"/>`
  s += `<circle cx="${x + (o.look || 1) - 1.4}" cy="${y - 1}" r="1.1" fill="#fff"/>`
  if (o.lid) {
    // тяжёлое верхнее веко
    s += P(`M${x - rx - 1.5} ${y + (o.lidDrop || 0.5)} Q${x} ${y - ry - 5} ${x + rx + 1.5} ${y + (o.lidDrop || 0.5)} Q${x} ${y - 1.5 + (o.lidDrop || 0)} ${x - rx - 1.5} ${y + (o.lidDrop || 0.5)}Z`, o.lid, 2)
  }
  return s
}

const eyes = (y, o, dx = 13) => eye(100 - dx, y, o) + eye(100 + dx, y, { ...o, look: o.look })

// Брови: k — злость (внутренний край опускается), lift — подъём (подёргивание)
function brows(y, { k = 0, w = 3.5, col = INK, dx = 13, len = 9, lift = 0 } = {}) {
  const x1 = 100 - dx - len
  const x2 = 100 - dx + len * 0.7
  return LL(`M${x1} ${y - lift + k * 0.3} Q${(x1 + x2) / 2} ${y - lift - 3 + k * 0.2} ${x2} ${y - lift + k}`, w, col)
}

function mouth(y, o = {}) {
  const w = o.w || 10
  if (o.real) {
    const tTop = `M${100 - w - 2} ${y} L${100 - w + 3} ${y + 7} L${100 - w + 7} ${y + 1} L${100 - 3} ${y + 8} L100 ${y + 1} L${100 + 3} ${y + 8} L${100 + w - 7} ${y + 1} L${100 + w - 3} ${y + 7} L${100 + w + 2} ${y}`
    return (
      P(`M${100 - w - 5} ${y - 2} Q100 ${y + 26} ${100 + w + 5} ${y - 2} Q100 ${y + 4} ${100 - w - 5} ${y - 2}Z`, '#2a0408', 2.5) +
      P(tTop + 'Z', '#fbf6e4', 1.5) +
      P(`M${100 - w + 2} ${y + 16} L${100 - w + 6} ${y + 9} L${100 - w + 10} ${y + 17}Z M${100 + w - 2} ${y + 16} L${100 + w - 6} ${y + 9} L${100 + w - 10} ${y + 17}Z`, '#fbf6e4', 1.5) +
      L(`M${100 + w - 1} ${y + 10} q3 9 0 14`, 2.5, '#8fe3ff')
    )
  }
  const fangs = o.fangs
    ? P(`M${100 - 8} ${y + 1} L${100 - 6} ${y + 8} L${100 - 4} ${y + 1.5}Z M${100 + 4} ${y + 1.5} L${100 + 6} ${y + 8} L${100 + 8} ${y + 1}Z`, '#fff', 1.5)
    : ''
  if (o.open) {
    return (
      P(`M${100 - w} ${y - 1} Q100 ${y - 4} ${100 + w} ${y - 1} Q${100 + w - 1} ${y + 11} 100 ${y + 12} Q${100 - w + 1} ${y + 11} ${100 - w} ${y - 1}Z`, '#3a0d12', 2.5) +
      S(`M${100 - w + 4} ${y + 8} Q100 ${y + 3} ${100 + w - 4} ${y + 8} Q100 ${y + 12} ${100 - w + 4} ${y + 8}Z`, '#d05a6e') +
      (o.teeth ? S(`M${100 - w + 2} ${y - 1} L${100 + w - 2} ${y - 1} L${100 + w - 3} ${y + 2} L${100 - w + 3} ${y + 2}Z`, '#fff') : '') +
      fangs
    )
  }
  const kind = o.kind || 'smile'
  const curve = { smile: 6, grin: 9, flat: 1, frown: -5, grim: -2 }[kind]
  let s = L(`M${100 - w} ${y} Q100 ${y + curve} ${100 + w} ${y}`, 2.5)
  if (kind === 'smile' || kind === 'grin') s += LL(`M${100 - w - 2} ${y - 2} Q${100 - w} ${y} ${100 - w + 1} ${y + 2}`, 1.5)
  return s + fangs
}

// ---------------- аура для разоблачения ----------------
const AURA = `<defs><radialGradient id="aura"><stop offset="0" stop-color="#c8ff3a" stop-opacity=".55"/><stop offset="1" stop-color="#c8ff3a" stop-opacity="0"/></radialGradient></defs><circle cx="100" cy="120" r="140" fill="url(#aura)"/>`

// Шов маски на шее — есть и у монстра, и у человека в маске: подсказкой не служит
const SEAM = L('M84 112 Q100 118 116 112', 1.5, 'rgba(0,0,0,.35)')

// =====================================================================
//                         МОНСТРЫ
// =====================================================================
const MONSTERS = {
  frankenstein: {
    skin: '#8fbf6a',
    legs: () => legs({ pants: '#4a4a22', shoe: '#3b2c20', boot: '#3b2c20' }),
    body() {
      const skin = this.skin
      const jacket = '#6b4a2e'
      const sleeve = 'M60 118 Q42 124 38 158 Q34 186 36 214 L41 208 L45 216 L50 208 L55 216 L59 210 Q58 190 60 166 Q62 148 68 134Z'
      return (
        P(NECK, skin) +
        PP('M84 104 L72 104 L72 94 L84 94Z', '#9aa3ab', 2.5) + PP('M72 96 L68 96 L68 102 L72 102Z', '#6f777e', 2) +
        P(TORSO, '#55743a') +
        L('M80 150 Q90 160 86 176 M118 160 Q112 172 116 186', 1.5, '#3b5226') +
        PP('M60 116 Q46 122 44 142 L40 284 L84 284 L88 176 L78 128 Q70 120 60 116Z', jacket) +
        LL('M78 128 L90 160 L84 168', 2) +
        SS('M46 150 L42 284 L54 284 L56 160Z', shade(jacket, -0.25)) +
        PP(sleeve, jacket) + SS(ARM_SH, shade(jacket, -0.25)) +
        hand(skin, 34, 208, 26)
      )
    },
    head(m) {
      const skin = this.skin
      const sh = shade(skin, -0.25)
      const H = 'M70 30 L130 30 Q134 60 132 84 Q128 102 112 106 L88 106 Q72 102 68 84 Q66 60 70 30Z'
      return (
        PP(EAR, skin, 2.5) +
        P(H, skin) +
        S('M120 30 L130 30 Q134 60 132 84 Q128 102 112 106 L106 106 Q122 96 124 76 Q126 52 120 30Z', sh) +
        P('M66 46 L66 18 Q100 8 134 18 L134 46 L128 40 L122 47 L115 40 L108 47 L100 40 L92 47 L85 40 L78 47 L72 40Z', '#141218') +
        L('M74 22 Q100 14 126 22', 2, '#3a3448') +
        L('M76 52 L98 48', 2) + L('M80 49 l1 6 M86 48 l1 6 M92 47 l1 6', 1.5) +
        L('M84 56 Q100 53 116 56', 1.5, sh) +
        LL('M76 76 Q78 90 86 98', 1.5, shade(skin, -0.4)) +
        (m === 'masked' ? SEAM : '')
      )
    },
    face(s, m) {
      const skin = this.skin
      const real = m === 'real'
      return (
        eyes(64, { rx: 5.5, ry: 6, blink: s.blink, real, lid: real ? null : skin, lidDrop: 1 }) +
        brows(55 - (s.brow ? 3 : 0), { w: 5, k: real ? 4 : 1, len: 10 }) +
        P('M98 64 L93 81 Q100 86 107 81 L102 64', skin, 2) + S('M102 66 L106 81 L103 82Z', shade(skin, -0.25)) +
        mouth(94, { w: 12, kind: 'grim', open: s.mouthOpen, real, teeth: true })
      )
    },
  },

  vampire: {
    skin: '#e4dfee',
    legs: () => legs({ pants: '#1a1a24', shoe: '#0d0d14' }),
    back() {
      return P('M50 120 L40 420 Q100 432 160 420 L150 120Z', '#8e0a21') +
        P('M56 124 L30 34 Q58 66 74 98 L100 112 L126 98 Q142 66 170 34 L144 124Z', '#c8102e') +
        S('M58 118 L40 54 Q60 78 72 100Z', '#8e0a21') + S(mirror('M58 118 L40 54 Q60 78 72 100Z'), '#8e0a21')
    },
    body() {
      const skin = this.skin
      const suit = '#5b3a96'
      return (
        P(NECK, skin) +
        P(TORSO, suit) +
        P('M84 114 L100 176 L116 114 Q100 122 84 114Z', '#aab6d3') +
        PP('M60 116 Q72 112 84 114 L100 176 L92 210 L74 140Z', shade(suit, -0.18)) +
        PP('M100 124 L84 116 L84 134Z', '#c8102e', 2.5) + C(100, 125, 4, '#c8102e', 2.5) +
        C(100, 196, 2, INK, 0) + C(100, 216, 2, INK, 0) +
        PP(ARM, suit) + SS(ARM_SH, shade(suit, -0.25)) +
        hand(skin)
      )
    },
    head(m) {
      const skin = this.skin
      const sh = '#b9aecb'
      const H = 'M70 50 Q70 22 100 20 Q130 22 130 50 Q132 80 122 96 Q110 112 100 114 Q90 112 78 96 Q68 80 70 50Z'
      return (
        PP('M71 56 L52 34 L60 72 Q62 82 73 82Z', skin, 2.5) +
        P(H, skin) +
        S('M118 28 Q132 40 130 56 Q132 80 122 96 Q110 112 100 114 Q114 102 120 82 Q124 56 118 28Z', sh) +
        SS('M74 72 Q78 90 90 100 Q80 96 74 84Z', sh) +
        P('M66 60 Q60 16 100 12 Q140 16 134 60 Q128 40 116 34 Q106 32 100 48 Q94 32 84 34 Q72 40 66 60Z', '#16131f') +
        L('M80 22 Q96 16 112 20', 2, '#3c3550') +
        P('M89 102 Q100 99 111 102 Q109 114 100 120 Q91 114 89 102Z', '#16131f', 2.5) +
        LL('M76 74 Q80 86 86 92', 1.5, shade(sh, -0.3)) +
        (m === 'masked' ? SEAM : '')
      )
    },
    face(s, m) {
      const real = m === 'real'
      return (
        eyes(62, { rx: 5.5, ry: 5, blink: s.blink, real, sclera: '#f5dc5a', ir: 2.6 }) +
        brows(52 - (s.brow ? 3 : 0), { w: 4.5, k: real ? 6 : 4, len: 10 }) +
        L('M100 60 L95 80 Q100 84 105 80', 2) +
        mouth(91, { w: 9, kind: 'frown', open: s.mouthOpen, real, fangs: true })
      )
    },
  },

  witch: {
    skin: '#8db86a',
    legs: () =>
      PP('M72 418 L54 436 Q50 440 58 440 L94 438 L96 418Z', '#141218') +
      P('M44 262 L156 262 L172 424 L160 414 L150 430 L138 416 L126 432 L114 418 L100 434 L86 418 L74 432 L62 416 L50 430 L40 414 L28 424Z', '#221f2c') +
      P('M120 330 L144 326 L146 350 L122 352Z', '#6b3fa0', 2.5),
    back() {
      return P('M66 46 Q44 92 50 156 Q58 146 60 166 Q68 136 74 100Z', '#18151e', 2.5) +
        P('M134 46 Q160 96 148 160 Q142 148 138 168 Q132 132 126 100Z', '#18151e', 2.5)
    },
    body() {
      const skin = this.skin
      const robe = '#221f2c'
      const sleeve = 'M60 118 Q40 126 34 160 Q28 196 25 222 L33 214 L37 226 L45 214 L51 224 L58 212 Q58 190 62 166 Q64 148 70 134Z'
      return (
        P(NECK, skin) +
        P(TORSO, robe) +
        P('M120 192 L142 188 L144 212 L122 214Z', '#6b3fa0', 2.5) + L('M124 190 l-3 -3 M134 189 l0 -4 M144 196 l4 0', 1.5) +
        P('M66 236 L84 232 L86 252 L68 256Z', '#6b3fa0', 2.5) +
        P('M78 106 Q100 124 122 106 L128 122 Q100 134 72 122Z', robe) +
        P('M146 404 L178 46 L185 48 L155 404Z', '#7a5530', 2.5) + L('M168 140 q6 4 4 10', 1.5) +
        P('M134 398 L164 396 Q176 420 172 440 L126 440 Q126 416 134 398Z', '#b59a50', 2.5) + L('M142 406 L138 436 M150 404 L150 438 M158 404 L162 436', 1.5) +
        PP(sleeve, robe) +
        hand(skin) +
        L('M38 236 Q42 240 46 238', 1.5)
      )
    },
    head(m) {
      const skin = this.skin
      const sh = shade(skin, -0.25)
      const hair = '#18151e'
      const H = 'M72 52 Q72 26 100 24 Q128 26 128 52 Q130 78 122 94 Q112 110 100 118 Q90 112 80 98 Q70 80 72 52Z'
      return (
        P(H, skin) +
        S('M118 30 Q130 40 128 56 Q130 78 122 94 Q112 110 100 118 Q114 100 120 80 Q124 56 118 30Z', sh) +
        P('M72 40 Q58 62 62 96 Q66 82 70 88 Q70 66 78 50Z', hair, 2.5) +
        P('M128 40 Q144 66 138 100 Q134 86 130 92 Q130 70 122 50Z', hair, 2.5) +
        C(118, 86, 2.6, '#6b4a2a', 1.5) + C(80, 58, 1.8, '#6b4a2a', 1.2) +
        P('M26 48 Q100 72 174 48 Q152 32 100 34 Q48 32 26 48Z', '#18161f') +
        P('M70 42 Q84 16 96 -8 Q104 -18 120 -14 Q108 -8 108 6 Q112 24 132 44 Q100 52 70 42Z', '#18161f') +
        P('M98 8 L112 10 L110 24 L96 22Z', '#6b3fa0', 2) +
        L('M60 52 Q100 66 140 52', 1.5, '#3a3448') +
        (m === 'masked' ? SEAM : '')
      )
    },
    face(s, m) {
      const skin = this.skin
      const real = m === 'real'
      const tooth = s.mouthOpen || real ? '' : P('M101 99 L103 105 L106 98Z', '#fff7d0', 1.5)
      return (
        eye(88, 64, { rx: 5, ry: 6.5, blink: s.blink, real, look: 2 }) + eye(112, 63, { rx: 6, ry: 7.5, blink: s.blink, real, look: 2 }) +
        brows(54 - (s.brow ? 3 : 0), { w: 3.5, k: 4, len: 9 }) +
        P('M99 58 Q92 76 82 90 Q92 95 101 86 Q106 78 105 66Z', skin, 2.5) + C(88, 84, 2, '#6b4a2a', 1) +
        (s.mouthOpen || real
          ? mouth(100, { w: 11, open: s.mouthOpen, real })
          : L('M88 99 Q100 106 116 94', 2.5) + tooth)
      )
    },
  },

  mummy: {
    skin: '#e6d59c',
    legs: () => '',
    body() {
      const band = this.skin
      const stripes = Array.from({ length: 28 }, (_, i) => {
        const y = 118 + i * 11
        return `M30 ${y + (i % 2 ? 4 : -2)} Q100 ${y + (i % 2 ? -4 : 6)} 170 ${y + (i % 3 ? 2 : -3)}`
      }).join(' ')
      const clip = `<clipPath id="mumclip"><path d="${TORSO}"/><path d="${ARM}"/><path d="${mirror(ARM)}"/><path d="${LEG}"/><path d="${mirror(LEG)}"/></clipPath>`
      return (
        `<defs>${clip}</defs>` +
        PP(LEG, band) + PP(SHOE, '#c9b47a') +
        P(NECK, band) + L('M88 98 L112 104 M88 108 L112 112', 1.5, '#8a7440') +
        P(TORSO, band) + PP(ARM, band) +
        `<g clip-path="url(#mumclip)">` + S('M120 110 L160 120 L160 284 L130 284Z', shade(band, -0.15)) + L(stripes, 1.5, '#8a7440') + `</g>` +
        P('M120 150 Q126 170 118 200 L124 200 Q132 172 126 150Z', band, 2) +
        P('M58 224 Q52 240 56 260 L60 258 Q58 242 62 226Z', band, 1.5) +
        hand('#c9b47a')
      )
    },
    head(m) {
      const band = this.skin
      return (
        P(HEAD, band) +
        P('M76 48 Q100 40 124 48 L126 86 Q114 104 100 104 Q86 104 74 86Z', '#9c8352', 2) +
        P('M66 42 Q100 26 134 42 L134 54 Q100 40 66 54Z', band, 2) +
        P('M68 56 Q84 52 92 56 L90 62 Q80 60 70 64Z', band, 1.5) +
        P('M70 84 Q90 92 106 106 L96 110 Q80 98 70 94Z', band, 2) +
        P('M120 98 Q128 88 132 76 L134 88 Q128 100 120 104Z', band, 1.5) +
        L('M70 32 Q100 22 130 32 M68 70 Q72 72 74 76', 1.5, '#8a7440') +
        P('M130 34 l16 -6 -6 10 12 6 -18 0Z', band, 2) +
        S(HEAD_SH, shade(band, -0.15), 0.6) +
        (m === 'masked' ? SEAM : '')
      )
    },
    face(s, m) {
      const real = m === 'real'
      const socket = E(87, 66, 8, 6.5, '#120d08', 2) + E(113, 66, 8, 6.5, '#120d08', 2)
      const glow = real
        ? C(87, 66, 3.5, '#ff2a1a', 0) + C(113, 66, 3.5, '#ff2a1a', 0) + C(87, 66, 1.4, '#ffe95a', 0) + C(113, 66, 1.4, '#ffe95a', 0)
        : s.blink ? '' : C(88, 67, 1.8, '#d8c27a', 0) + C(112, 67, 1.8, '#d8c27a', 0)
      const mouthPart = real
        ? mouth(90, { w: 11, real })
        : s.mouthOpen
          ? E(100, 92, 9, 4.5, '#120d08', 2) + L('M92 88 l0 8 M100 87 l0 9 M108 88 l0 8', 1.5, '#c4ad70')
          : L('M88 91 L112 91', 2) + L('M91 87 l0 8 M96 87 l0 8 M101 87 l0 8 M106 87 l0 8 M111 87 l0 8', 1.3)
      return socket + glow + L('M97 78 l1 2 M103 78 l-1 2', 2) + mouthPart
    },
  },

  zombie: {
    skin: '#97ab84',
    legs: () => legs({ pants: '#4d6670', ragged: true, skin: '#97ab84' }),
    body() {
      const skin = this.skin
      const shirt = '#5f7a45'
      const sleeve = 'M60 118 Q42 124 38 158 L40 176 L45 170 L49 180 L54 170 L58 178 Q60 156 68 134Z'
      const fore = 'M40 172 Q36 198 37 224 L58 224 Q56 200 58 172Z'
      return (
        P(NECK, skin) + L('M92 100 l16 6 M95 97 l-2 6 M101 99 l-2 6 M107 101 l-2 6', 1.5) +
        P(TORSO, shirt) +
        P('M86 114 L100 150 L114 114 Q100 122 86 114Z', '#cfc6b8', 2.5) +
        L('M86 114 L80 126 L88 128 M114 114 L122 128 L114 128', 2) +
        P('M64 172 L72 160 L80 172 L76 190 L66 186Z', skin, 2) +
        P('M124 210 L134 200 L142 214 L132 226Z', skin, 2) +
        L('M70 236 L80 244 M126 150 l8 10', 1.5) +
        PP(fore, skin) + PP(sleeve, shirt) +
        hand(skin) +
        S('M110 140 Q118 150 112 160Z', shade(shirt, -0.3))
      )
    },
    head(m) {
      const skin = this.skin
      const sh = shade(skin, -0.25)
      const H = 'M68 58 Q66 24 100 22 Q136 26 132 58 Q134 84 122 98 Q110 110 98 110 Q86 108 76 96 Q66 82 68 58Z'
      return (
        PP(EAR, skin, 2.5) +
        P(H, skin) +
        S(HEAD_SH, sh, 0.8) +
        S('M74 44 Q80 40 84 46 Q80 50 74 44Z', sh) + S('M118 82 Q124 80 124 88 Q118 90 118 82Z', '#7a5a5a', 0.6) +
        L('M72 34 Q70 20 82 18 M80 28 Q82 10 96 12 M98 24 Q104 8 116 14 M110 28 Q124 16 130 30 M124 36 Q136 34 134 46', 2.5, '#3f4a2c') +
        L('M126 70 l6 6 -6 6', 1.5) +
        (m === 'masked' ? SEAM : '')
      )
    },
    face(s, m) {
      const skin = this.skin
      const real = m === 'real'
      const ring = S('M77 58 Q87 50 97 58 Q98 72 87 74 Q76 72 77 58Z', shade(skin, -0.35), 0.7) + S(mirror('M77 58 Q87 50 97 58 Q98 72 87 74 Q76 72 77 58Z'), shade(skin, -0.35), 0.7)
      return (
        ring +
        eyes(63, { rx: 7, ry: 7.5, blink: s.blink, real, sclera: '#f1ecc4', ir: 1.8, lid: real ? null : skin, lidDrop: -2 }) +
        brows(52 - (s.brow ? 3 : 0), { w: 3, k: real ? 4 : -2, len: 8, col: '#3f4a2c' }) +
        P('M97 70 L94 82 L103 82Z', shade(skin, -0.3), 1.5) +
        (real ? mouth(94, { w: 11, real }) : mouth(93, { w: 8, open: true, teeth: s.mouthOpen }) )
      )
    },
  },

  swamp: {
    skin: '#3e8a5c',
    legs: () =>
      legs({ pants: '#3e8a5c', skin: '#3e8a5c' }) +
      LL('M66 300 q4 -4 8 0 M78 330 q4 -4 8 0 M68 360 q4 -4 8 0 M80 390 q4 -4 8 0', 1.5, '#2b6643') +
      PP('M52 420 L42 428 L54 432Z', '#5fb07a', 1.5),
    body() {
      const skin = this.skin
      const fin = '#5fb07a'
      const weed = '#6aa84a'
      return (
        P(NECK, skin) +
        P(TORSO, skin) +
        P('M78 128 Q100 120 122 128 L120 284 L80 284Z', '#9cc79a', 2.5) +
        L('M82 150 Q100 146 118 150 M82 172 Q100 168 118 172 M82 194 Q100 190 118 194 M82 216 Q100 212 118 216 M82 238 Q100 234 118 238', 1.5, '#5a8a62') +
        LL('M54 132 q4 -4 8 0 M50 146 q4 -4 8 0 M58 154 q4 -4 8 0 M48 166 q4 -4 8 0', 1.5, '#2b6643') +
        PP(ARM, skin) +
        PP('M40 168 L22 178 L28 186 L20 194 L40 196Z', fin, 2.5) +
        hand(skin) + PP('M38 248 L36 254 M45 252 L45 258', fin, 1) +
        P('M58 116 Q66 150 56 190 Q62 180 66 198 Q72 160 72 122Z', weed, 2.5) +
        P('M134 118 Q142 160 134 210 Q142 196 146 212 Q148 160 144 124Z', weed, 2.5)
      )
    },
    head(m) {
      const skin = this.skin
      const fin = '#5fb07a'
      const H = 'M64 60 Q62 26 100 22 Q138 26 136 60 Q138 92 120 104 Q100 112 80 104 Q62 92 64 60Z'
      return (
        PP('M66 62 Q50 54 42 66 Q52 70 46 80 Q56 80 52 90 Q62 86 70 82Z', fin, 2.5) +
        P(H, skin) +
        S('M122 30 Q138 40 136 60 Q138 92 120 104 Q100 112 92 110 Q122 98 128 72 Q130 48 122 30Z', shade(skin, -0.25)) +
        P('M82 26 Q84 6 93 14 Q97 -2 104 12 Q112 0 116 16 Q124 8 120 28Z', fin, 2.5) +
        LL('M72 78 q4 2 4 6 M74 72 q5 2 5 6', 1.5) +
        LL('M76 40 q4 -3 8 0 M90 34 q4 -3 8 0', 1.5, '#2b6643') +
        (m === 'masked' ? SEAM : '')
      )
    },
    face(s, m) {
      const real = m === 'real'
      return (
        L('M70 50 Q84 42 98 50 M102 50 Q116 42 130 50', 3.5) +
        eyes(60, { rx: 8.5, ry: 8.5, blink: s.blink, real, sclera: '#e6f07a', ir: 4 }, 17) +
        L('M96 76 l-1 4 M104 76 l1 4', 2) +
        (real ? mouth(92, { w: 16, real }) : mouth(92, { w: 17, kind: 'grim', open: s.mouthOpen }))
      )
    },
  },

  werewolf: {
    skin: '#8a5e36',
    legs: () => legs({ pants: '#5e4a76', ragged: true, skin: '#8a5e36', claws: true }),
    body() {
      const fur = this.skin
      const shirt = '#5a4a78'
      const sleeve = 'M60 118 Q42 124 38 158 L40 180 L45 172 L49 182 L54 172 L58 180 Q60 156 68 134Z'
      const fore = 'M40 176 L34 186 L40 192 Q36 206 37 224 L58 224 Q56 204 60 190 L64 180 L58 176Z'
      return (
        P(NECK, fur) +
        P(TORSO, shirt) +
        P('M82 114 L100 176 L118 114 Q100 122 82 114Z', fur, 2.5) +
        L('M92 130 l4 8 M104 132 l-3 8 M98 150 l2 8', 1.5, '#5e3d20') +
        L('M66 200 l10 8 M130 230 l-8 10', 1.5) +
        PP(fore, fur) + PP(sleeve, shirt) +
        clawHand(fur)
      )
    },
    head(m) {
      const fur = this.skin
      const H = 'M68 54 Q66 24 100 22 Q134 24 132 54 L144 62 L133 70 L142 82 L128 86 Q118 106 100 108 Q82 106 72 86 L58 82 L67 70 L56 62Z'
      return (
        PP('M72 46 L58 4 L92 28Z', fur, 2.5) + SS('M72 40 L64 16 L86 30Z', '#c78d6a') +
        P(NECK + '', fur, 0) +
        PP('M70 100 L60 114 L76 112 L72 124 L88 114Z', fur, 2.5) +
        P(H, fur) +
        S('M120 30 Q132 40 132 54 L144 62 L133 70 L142 82 L128 86 Q118 106 100 108 Q116 96 122 78 Q126 54 120 30Z', shade(fur, -0.25)) +
        S('M86 24 L92 36 L100 22 L108 36 L114 24 L112 42 Q100 46 88 42Z', shade(fur, -0.3)) +
        (m === 'masked' ? SEAM : '')
      )
    },
    face(s, m) {
      const real = m === 'real'
      return (
        eyes(58, { rx: 5, ry: 5.5, blink: s.blink, real, sclera: '#f0b030', ir: 2.4 }) +
        brows(49 - (s.brow ? 3 : 0), { w: 4.5, k: real ? 5 : 3, len: 9, col: '#3a2410' }) +
        P('M82 72 Q100 62 118 72 Q124 96 100 104 Q76 96 82 72Z', '#c99a6a', 2.5) +
        P('M91 70 Q100 63 109 70 Q105 78 100 78 Q95 78 91 70Z', '#1a1012', 2) +
        L('M100 78 L100 86', 2) +
        (real ? mouth(90, { w: 12, real }) : mouth(90, { w: 11, kind: 'grim', open: s.mouthOpen, fangs: true }))
      )
    },
  },

  ghost: {
    skin: '#f3f5fb',
    legs: () => '',
    body() {
      const sheet = this.skin
      const sh = '#c4cde0'
      const B = 'M38 410 Q34 300 46 160 Q50 128 62 112 Q52 96 54 70 Q58 22 100 20 Q142 22 146 70 Q148 96 138 112 Q150 128 154 160 Q166 300 162 410 Q152 394 142 410 Q132 394 122 410 Q112 394 100 410 Q88 394 78 410 Q68 394 58 410 Q48 394 38 410Z'
      return (
        `<circle cx="100" cy="110" r="96" fill="#bfe6ff" opacity=".18"/>` +
        P(B, sheet) +
        S('M126 40 Q146 60 146 90 Q148 120 150 160 Q160 280 160 400 L136 398 Q142 260 138 150 Q138 100 126 40Z', sh, 0.8) +
        L('M70 140 Q64 260 68 396 M100 130 Q96 260 100 400 M130 140 Q136 260 132 396', 2, sh) +
        PP('M54 136 Q22 168 20 214 Q30 206 36 218 Q42 204 50 214 Q52 186 64 164Z', sheet)
      )
    },
    head() {
      return ''
    },
    face(s, m) {
      const real = m === 'real'
      const hole = '#1d1a30'
      if (s.blink) return LL('M78 64 L94 64', 3) + E(100, 94, 7, s.mouthOpen ? 10 : 6, hole, 2.5)
      const eyesG = real
        ? E(86, 62, 9, 12, '#ff3b2a', 2.5) + E(114, 62, 9, 12, '#ff3b2a', 2.5) + C(86, 62, 3.5, '#ffe95a', 0) + C(114, 62, 3.5, '#ffe95a', 0)
        : E(86, 62, 8, 12, hole, 2.5) + E(114, 62, 8, 12, hole, 2.5)
      return eyesG + (real ? mouth(92, { w: 13, real }) : E(100, 94, 7, s.mouthOpen ? 11 : 7, hole, 2.5))
    },
  },
}

// =====================================================================
//                     ЛЮДИ В САМОДЕЛЬНЫХ КОСТЮМАХ
// =====================================================================
const SKINS = ['#f6cfa6', '#eab68c', '#c98d60', '#8f5c3c']
const HAIRS = ['#5a3a1e', '#1d1a1e', '#c2461a', '#d9b25a', '#8a8a8a']

const HAIR = {
  short: (c) => P('M66 60 Q60 16 100 15 Q140 16 134 60 Q130 40 118 36 Q100 44 82 36 Q70 40 66 60Z', c),
  bob: (c) =>
    P('M62 84 Q52 18 100 15 Q148 18 138 84 Q130 86 126 78 Q128 52 120 42 Q100 50 80 42 Q72 52 74 78 Q70 86 62 84Z', c) +
    P('M74 50 Q84 28 124 36 Q126 46 122 52 Q100 46 74 54Z', c),
  slick: (c) =>
    P('M67 56 Q62 16 100 14 Q138 16 133 56 Q126 34 110 31 Q96 30 84 36 Q74 42 67 56Z', c) + L('M90 18 Q86 26 88 34', 1.5, shade(c, 0.3)),
  shaggy: (c) =>
    P('M64 66 Q54 30 72 20 Q86 8 104 12 Q128 10 136 32 Q144 50 136 68 L130 56 L126 68 L120 46 Q100 52 84 44 L80 58 L74 46 L70 64Z', c),
  curly: (c) =>
    [[72, 40], [80, 28], [94, 22], [108, 22], [121, 28], [129, 40], [68, 54], [132, 54]].map(([x, y]) => C(x, y, 10, c, 2.5)).join(''),
  wig: (c) =>
    P('M66 46 L66 16 Q100 8 134 16 L134 46 L126 41 L118 46 L110 41 L102 46 L94 41 L86 46 L78 41 L72 46Z', c),
}

// Обычное лицо человека: живые глаза, румянец, нормальный нос
function humanFace(s, o) {
  const mood = o.mood || 'calm'
  const k = { calm: -1, annoyed: 3, angry: 6 }[mood]
  const kind = { calm: 'smile', annoyed: 'flat', angry: 'frown' }[mood]
  let f = ''
  f += SS('M74 76 Q80 72 86 76 Q80 82 74 76Z', '#f08a8a', o.paint ? 0.15 : 0.45)
  f += eyes(62, { rx: 5, ry: 6, blink: s.blink, iris: o.iris || '#5a3a1e', ir: 3.2 })
  f += brows(52 - (s.brow ? 3 : 0), { w: 3, k, len: 8, col: shade(o.hairColor || '#5a3a1e', -0.2) })
  f += L('M100 62 Q95 76 98 81 Q101 83 105 80', 2)
  if (o.freckles) f += [[78, 72], [82, 75], [86, 72], [114, 72], [118, 75], [122, 72]].map(([x, y]) => C(x, y, 1, '#a0583a', 0)).join('')
  if (o.glasses) {
    const fr = 'M78 54 L96 54 L96 70 L78 70Z'
    f += P(fr, 'rgba(190,227,255,.35)', 3.5) + P(mirror(fr), 'rgba(190,227,255,.35)', 3.5) + L('M96 60 L104 60', 3)
  }
  f += mouth(92, { w: 10, kind, open: s.mouthOpen, fangs: o.fangs, teeth: true })
  return f
}

function humanHead(s, o) {
  const skin = o.skin
  return (
    PP(EAR, o.earSkin || skin, 2.5) +
    P(HEAD, skin) +
    S(HEAD_SH, shade(skin, -0.12)) +
    (o.beard ? P('M70 76 Q72 112 100 118 Q128 112 130 76 Q126 98 100 100 Q74 98 70 76Z', o.hairColor, 2.5) : '') +
    (o.hair ? HAIR[o.hair](o.hairColor) : '') +
    (o.extra || '') +
    humanFace(s, o)
  )
}

const pick = (arr, v) => arr[v % arr.length]

// Костюм + лицо по образу
const COSTUMES = {
  frankenstein(v, s, mood) {
    const real = pick(SKINS, v)
    const paint = '#a9d08c'
    const legsSvg = legs({ pants: '#2f3550', shoe: '#5a3a1e' })
    const body =
      legsSvg +
      P(NECK, paint) +
      PP('M84 104 L70 104 L70 94 L84 94Z', '#c4975c', 2) + LL('M70 99 Q62 104 66 112', 1.2) +
      P(TORSO, '#e8e2d2') + L('M70 150 h60 M70 170 h60', 1, '#cfc6b0') +
      PP('M60 116 Q46 122 44 142 L40 284 L84 284 L88 176 L78 128 Q70 120 60 116Z', '#7a5a3a') +
      PP(ARM, '#7a5a3a') + SS(ARM_SH, '#5a3f26') +
      hand(real)
    const head = humanHead(s, {
      skin: paint, earSkin: real, hair: 'wig', hairColor: '#141218', mood, paint: true, iris: '#3a5a8a',
      extra: L('M78 50 L96 46', 1.5, '#2a4a1a') + L('M82 47 l0 5 M88 46 l0 5 M93 45 l0 5', 1.2, '#2a4a1a'),
    })
    return body + head
  },
  mummy(v, s, mood) {
    const skin = pick(SKINS, v)
    const tp = '#f8f6ee'
    const legsSvg = legs({ pants: '#3a6ea8', shoe: '#f2efe6' }) + PP('M60 300 L99 314 L99 326 L61 312Z M62 360 L98 372 L98 384 L63 372Z', '#f8f6ee', 2)
    const body =
      legsSvg +
      P(NECK, skin) +
      P(TORSO, '#3a6ea8') + L('M44 160 H156 M44 190 H156 M42 220 H158 M42 250 H158', 8, '#e05a3a') +
      P('M44 136 L156 168 L156 184 L44 152Z', tp, 2) + P('M42 196 L158 176 L158 192 L42 212Z', tp, 2) +
      P('M42 236 L158 252 L158 266 L42 250Z', tp, 2) +
      PP(ARM, '#3a6ea8') + PP('M40 150 L64 160 L62 172 L38 162Z', tp, 2) + PP('M36 196 L58 204 L58 214 L36 206Z', tp, 2) +
      hand(skin) +
      P('M138 196 Q146 222 140 244 L146 244 Q152 220 144 194Z', tp, 1.5)
    const head = humanHead(s, {
      skin, hair: 'short', hairColor: pick(HAIRS, v + 1), mood, glasses: v % 2 === 0,
      extra: P('M64 38 Q100 22 136 38 L136 48 Q100 34 64 48Z', tp, 2) + P('M70 92 Q100 120 130 92 L132 102 Q100 128 68 102Z', tp, 2),
    })
    return body + head
  },
  zombie(v, s, mood) {
    const skin = pick(SKINS, v)
    const shirt = '#3b6ea8'
    const legsSvg = legs({ pants: '#4a6a9a', shoe: '#e8e2d2', ragged: true, skin })
    const body =
      legsSvg +
      P(NECK, skin) +
      P(TORSO, shirt) + L('M60 140 L140 140 M60 180 L140 180 M60 220 L140 220 M80 120 V284 M120 120 V284', 2, '#2a527e') +
      P('M66 172 L74 160 L82 174 L76 188Z', '#f2efe6', 2) + P('M120 214 L130 204 L138 220 L128 230Z', '#f2efe6', 2) +
      PP(ARM, shirt) + hand(skin) + S('M38 226 Q44 236 40 244Z', '#7fa86a', 0.9)
    const head = humanHead(s, {
      skin, hair: 'shaggy', hairColor: pick(HAIRS, v), mood, iris: '#3a5a2a',
      extra:
        S('M72 50 Q84 44 92 52 Q86 62 74 58Z', '#7fa86a', 0.85) + S('M110 78 Q124 74 128 86 Q118 94 110 86Z', '#7fa86a', 0.85) +
        L('M116 96 L118 108 M70 60 L68 70', 3, '#c0182a'),
    })
    return body + head
  },
  swamp(v, s, mood) {
    const skin = pick(SKINS, v + 1)
    const hood = '#4f8a3a'
    const weed = '#8ad05a'
    const legsSvg = legs({ pants: '#3f6a2a', shoe: '#e8c23a', boot: '#e8c23a' })
    const body =
      legsSvg +
      P(NECK, skin) +
      P(TORSO, hood) + P('M80 180 Q100 186 120 180 L122 210 Q100 216 78 210Z', shade(hood, -0.15), 2) +
      LL('M92 120 L90 150', 2) +
      PP(ARM, hood) + hand(skin) +
      P('M58 120 Q62 150 56 186 Q62 176 66 192 Q70 156 70 124Z', weed, 2) +
      P('M138 122 Q144 160 138 200 Q144 190 148 206 Q150 160 146 126Z', weed, 2) +
      P('M100 130 Q106 150 100 170 Q106 164 108 176 Q112 150 106 132Z', weed, 2)
    const back = P('M60 70 Q56 12 100 10 Q144 12 140 70 Q138 100 126 114 L74 114 Q62 100 60 70Z', hood)
    const head = humanHead(s, {
      skin, hair: null, hairColor: pick(HAIRS, v + 2), beard: true, mood,
      extra: P('M84 14 Q86 -2 94 6 Q98 -6 104 4 Q112 -4 114 8Z', '#e8a33a', 2) + C(88, 8, 2, INK, 0),
    })
    return back + body + head
  },
  witch(v, s, mood) {
    const skin = pick(SKINS, v)
    const dress = '#1d1b24'
    const trim = '#f0841e'
    const legsSvg = legs({ pants: '#f0841e', shoe: '#141218', stripes: '#141218' })
    const body =
      legsSvg +
      P(NECK, skin) +
      P(TORSO, dress) +
      P('M80 114 L100 150 L120 114 L114 112 L100 138 L86 112Z', trim, 2) +
      P('M44 236 L156 236 L157 250 L43 250Z', trim, 2) + P('M90 234 L110 234 L110 252 L90 252Z', shade(trim, -0.2), 2) +
      PP(ARM, dress) + PP('M37 214 L58 214 L58 222 L37 222Z', trim, 2) + hand(skin) +
      P('M146 284 L172 52 L178 54 L154 284Z', '#8a6036', 2.5)
    const head = humanHead(s, {
      skin, hair: 'bob', hairColor: pick(['#8a3a1a', '#5a3a1e', '#1d1a1e'], v), mood, glasses: true, freckles: true,
      extra:
        P('M30 40 Q100 62 170 40 Q150 26 100 28 Q50 26 30 40Z', '#6b3fa0') +
        P('M68 36 Q84 10 98 -14 Q108 -22 124 -18 Q110 -10 112 6 Q116 22 132 38 Q100 46 68 36Z', '#6b3fa0') +
        P('M66 28 Q100 38 134 30 L132 40 Q100 48 68 38Z', '#79c24a', 2),
    })
    return body + head
  },
  vampire(v, s, mood) {
    const skin = pick(SKINS, v)
    const back = P('M58 124 L36 46 Q60 72 76 100 L100 112 L124 100 Q140 72 164 46 L142 124Z', '#c8102e')
    const legsSvg = legs({ pants: '#18161e', shoe: '#0d0d14' })
    const body =
      legsSvg +
      P(NECK, skin) +
      P(TORSO, '#18161e') +
      P('M84 114 L100 170 L116 114 Q100 122 84 114Z', '#fbfaf6', 2.5) +
      PP('M100 124 L86 117 L86 133Z', INK, 2) + C(100, 125, 3.5, INK, 0) +
      PP('M60 116 Q46 120 42 150 L36 284 L52 284 L50 150 Q54 130 64 122Z', '#c8102e') +
      PP(ARM, '#18161e') + PP('M37 216 L58 216 L58 224 L37 224Z', '#fbfaf6', 2) + hand(skin)
    const head = humanHead(s, { skin, hair: 'slick', hairColor: pick(['#1d1a1e', '#5a3a1e'], v), mood, fangs: true, iris: '#3a2a1a' })
    return back + body + head
  },
  werewolf(v, s, mood) {
    const skin = pick(SKINS, v)
    const fur = '#8a5e36'
    const legsSvg = legs({ pants: '#4a6a9a', shoe: '#6b4a2a', boot: '#8a5e36' })
    const body =
      legsSvg +
      P(NECK, skin) +
      P(TORSO, '#b03a2e') + L('M60 140 L140 140 M60 170 L140 170 M60 200 L140 200 M80 120 V284 M120 120 V284', 2, '#7a2018') +
      PP('M60 116 Q46 122 44 142 L42 284 L80 284 L82 260 L76 250 L82 240 L76 228 L84 216 L78 200 L86 186 L80 168 L88 150 L80 130 Q72 120 60 116Z', fur, 2.5) +
      PP(ARM, '#b03a2e') + hand(skin)
    const head = humanHead(s, {
      skin, hair: 'curly', hairColor: pick(HAIRS, v + 3), mood,
      extra:
        L('M66 40 Q100 4 134 40', 5, '#3a2a1a') +
        PP('M74 30 L62 0 L92 18Z', fur, 2.5) + SS('M74 24 L68 8 L86 18Z', '#c78d6a') +
        C(100, 78, 3.2, INK, 0) + LL('M86 82 L72 80 M86 86 L72 88', 1.2),
    })
    return body + head
  },
  ghost(v, s, mood) {
    const skin = pick(SKINS, v)
    const sheet = '#f6f7fb'
    const legsSvg = legs({ pants: '#2f3550', shoe: '#e8384f' })
    const back = legsSvg + P('M44 404 Q36 260 50 150 Q52 120 60 104 Q52 80 56 56 Q62 10 100 8 Q138 10 144 56 Q148 80 140 104 Q148 120 150 150 Q164 260 156 404 Q146 390 136 404 Q126 390 116 404 Q106 390 96 404 Q86 390 76 404 Q66 390 56 404 Q50 394 44 404Z', sheet) +
      S('M128 30 Q146 60 144 100 Q150 150 156 398 L136 398 Q140 180 136 120 Q138 70 128 30Z', '#c9d3e6', 0.7) +
      PP('M56 136 Q26 168 24 212 Q34 204 40 216 Q46 202 54 212 Q56 184 66 164Z', sheet) +
      L('M74 150 Q68 270 72 392 M126 150 Q132 270 128 392', 2, '#c9d3e6')
    const face = humanHead(s, { skin, hair: 'short', hairColor: pick(HAIRS, v), mood, glasses: v % 3 === 1 })
    return back + `<g>${face}</g>` + P('M64 52 Q66 12 100 12 Q134 12 136 52 Q138 36 128 30 Q100 18 72 30 Q62 36 64 52Z', sheet, 2) + P('M60 96 Q100 132 140 96 L142 108 Q100 140 58 108Z', sheet, 2)
  },
}

// Резиновая маска в руке — после неудачного разоблачения
function maskInHand(id) {
  const col = MONSTERS[id].skin
  return `<g transform="translate(16 208) rotate(-14)">${P('M0 4 Q22 -8 44 4 Q42 34 22 42 Q2 34 0 4Z', col)}${E(13, 14, 4, 5, INK, 0)}${E(31, 14, 4, 5, INK, 0)}${L('M14 30 Q22 34 30 30', 2)}</g>`
}

// =====================================================================
// view — свой кадр (например, портрет по голове для Polaroid), по умолчанию — полный рост
export function figureSvg(id, { mode = 'masked', blink = false, mouthOpen = false, brow = false, variant = 0, mood = 'calm', view = '0 -24 200 470' } = {}) {
  const s = { blink, mouthOpen, brow }
  const M = MONSTERS[id]
  let inner = ''
  if (mode === 'costume') {
    inner = COSTUMES[id](variant, s, mood)
  } else if (mode === 'unmasked') {
    const skin = pick(SKINS, variant)
    inner =
      (M.back ? M.back() : '') +
      M.legs() +
      M.body() +
      humanHead(s, { skin, hair: pick(['short', 'shaggy', 'curly', 'slick'], variant), hairColor: pick(HAIRS, variant), mood: 'angry' }) +
      maskInHand(id)
  } else {
    inner = (mode === 'real' ? AURA : '') + (M.back ? M.back() : '') + M.legs() + M.body() + M.head(mode) + M.face(s, mode)
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${view}" class="fig">${SHADOW}${inner}</svg>`
}
