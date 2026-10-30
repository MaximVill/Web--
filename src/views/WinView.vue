<script setup>
import Polaroid from '../components/art/Polaroid.vue'
import { MONSTERS } from '../data/monsters.js'
import { go } from '../stores/game.js'
</script>

<template>
  <section class="win">
    <div class="box">
      <h1>Дело<br />раскрыто!<span>конец серии</span></h1>
      <p>«И я бы сорвал все маски, если бы не этот настырный мелкий сыщик с тыквой!»</p>
      <div class="strip">
        <div v-for="(m, i) in MONSTERS" :key="m.id"><Polaroid :id="m.id" :tilt="i % 2 ? 3 : -3" /></div>
      </div>
      <button class="start" @click="go('hq')">Ещё конфет!</button>
    </div>
  </section>
</template>

<style scoped>
.win { position: fixed; inset: 0; overflow: auto; display: grid; place-items: center; padding: 18px; background: radial-gradient(ellipse at center, #6b2a3a 0, #1a1229 60%, #050610 100%); }
.box { max-width: 820px; padding: 30px 34px; background: #f3dda0; color: #25182a; border: 6px solid #11101d; box-shadow: 9px 10px 0 #070712, 0 0 0 4px #c25748; text-align: center; transform: rotate(-1deg); }
h1 { margin: 0; font-family: var(--font-title); font-weight: 700; text-transform: uppercase; font-size: clamp(44px, 9vw, 84px); line-height: .85; color: #25365f; text-shadow: 4px 4px 0 #d25145; }
h1 span { display: block; font-family: var(--font-grunge); font-weight: 400; text-transform: lowercase; font-size: .36em; color: #d15142; letter-spacing: 3px; margin-top: 14px; text-shadow: none; }
p { font-weight: 800; font-style: italic; font-size: 17px; }
.strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin: 16px 0 22px; }
.start { border: 4px solid #17121c; background: #e85f46; color: #291423; padding: 13px 28px; box-shadow: 4px 5px #15101a; font-family: var(--font-title); font-weight: 700; font-size: 22px; letter-spacing: 2px; text-transform: uppercase; }
</style>
