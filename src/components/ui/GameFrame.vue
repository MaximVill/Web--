<script setup>
// Раскладка «как в комиксе»: шапка с логотипом и плашками, большая сцена, панель выбора справа.
// Всё помещается в экран — ничего не надо прокручивать.
defineProps({
  heading: { type: String, default: '' },
  sub: { type: String, default: '' },
})
</script>

<template>
  <div class="frame">
    <header class="top">
      <div class="logo">
        Тыква и Тайна
        <small>сладость или гадость</small>
      </div>
      <div class="hud"><slot name="hud" /></div>
    </header>
    <div class="body">
      <main class="stagebox"><slot name="stage" /></main>
      <aside class="side paper">
        <div v-if="heading" class="head">
          <h2>{{ heading }}</h2>
          <span v-if="sub" class="mono">{{ sub }}</span>
        </div>
        <div class="content"><slot name="side" /></div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.frame { position: fixed; inset: 0; display: flex; flex-direction: column; padding: clamp(10px, 1.3vw, 20px); gap: 12px; max-width: 1560px; margin: 0 auto; }
.top { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex: none; }
.logo {
  font-family: var(--font-title); font-weight: 700; text-transform: uppercase;
  font-size: clamp(22px, 2.6vw, 38px); letter-spacing: 2px; line-height: 1;
  color: #eef8b6; text-shadow: 3px 3px 0 #253451, 5px 5px 0 #070814; transform: rotate(-1deg);
}
.logo small {
  display: block; font-family: var(--font-grunge); font-size: .48em; letter-spacing: 3px; color: #f2aa50;
  text-transform: lowercase; margin: 4px 0 0 3px; text-shadow: 2px 2px 0 #070814;
}
.hud { display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-end; }
.body { flex: 1; min-height: 0; display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 18px; }
.stagebox { min-width: 0; min-height: 0; container-type: size; display: grid; place-items: center; }
.side { min-height: 0; overflow: auto; display: flex; flex-direction: column; }
.head { position: relative; padding: 14px 16px 12px; background: #27365f; color: #fff6cb; border-bottom: 4px solid #171527; transform: skewY(-1deg); margin-top: -2px; }
.head h2 { margin: 0; font-family: var(--font-title); font-weight: 700; font-size: 26px; letter-spacing: 2px; text-transform: uppercase; line-height: 1; }
.head span { display: block; margin-top: 6px; font-size: 11px; color: #b7dc77; }
.content { position: relative; padding: 14px; display: flex; flex-direction: column; gap: 10px; }
@media (max-width: 900px) {
  .frame { position: absolute; min-height: 100%; bottom: auto; }
  .body { grid-template-columns: 1fr; }
  .stagebox { container-type: inline-size; }
  .side { overflow: visible; }
}
</style>
