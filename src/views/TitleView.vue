<script setup>
import { go, photoCount } from '../stores/game.js'
import { unlock, click } from '../audio/sfx.js'
function start() {
  unlock()
  click()
  go('hq')
}
</script>

<template>
  <section class="intro">
    <div class="box">
      <h1>Тыква<br />и Тайна<span>сладость или гадость</span></h1>
      <p>
        Десять дверей. За каждой — сосед в костюме или настоящая нечисть, которая притворяется соседом.
        Расспрашивай, лови на оговорках, срывай маски и собери всех восьмерых в Журнал тайн.
      </p>
      <button class="start" @click="start">{{ photoCount ? 'Продолжить' : 'Начать' }}</button>
    </div>
  </section>
</template>

<style scoped>
.intro {
  position: fixed; inset: 0; display: grid; place-items: center; padding: 18px;
  background: radial-gradient(ellipse at center, #31446e 0, #121529 55%, #050610 100%);
}
.intro::before {
  content: ''; position: absolute; inset: 0; opacity: .32;
  background: repeating-linear-gradient(120deg, transparent 0 16px, rgba(202, 224, 255, .18) 17px 18px);
}
.box {
  position: relative; max-width: 660px; padding: 38px 42px; background: #f3dda0; color: #25182a;
  border: 6px solid #11101d; box-shadow: 9px 10px 0 #070712, 0 0 0 4px #c25748; text-align: center; transform: rotate(-1deg);
}
h1 {
  margin: 0; font-family: var(--font-title); font-weight: 700; text-transform: uppercase;
  font-size: clamp(48px, 10vw, 96px); line-height: .95; letter-spacing: 2px; color: #25365f; text-shadow: 4px 4px 0 #d25145;
}
h1 span { display: block; font-family: var(--font-grunge); font-weight: 400; text-transform: lowercase; font-size: .38em; color: #d15142; letter-spacing: 3px; margin-top: 18px; text-shadow: none; }
p { font-weight: 800; line-height: 1.45; font-size: 17px; }
.start {
  border: 4px solid #17121c; background: #e85f46; color: #291423; padding: 13px 28px; box-shadow: 4px 5px #15101a;
  font-family: var(--font-title); font-weight: 700; font-size: 22px; letter-spacing: 2px; text-transform: uppercase; transition: .1s;
}
.start:hover { background: #fa8d4e; transform: translate(-2px, -2px); box-shadow: 6px 7px #15101a; }
</style>
