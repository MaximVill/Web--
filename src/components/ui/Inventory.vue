<script setup>
import Icon from './Icon.vue'
import { ITEMS, ITEM_IDS } from '../../data/items.js'
import { state, canUseItem, useItem } from '../../stores/game.js'

defineProps({ usable: { type: Boolean, default: true } })
</script>

<template>
  <div class="inv">
    <div class="row">
      <button
        v-for="id in ITEM_IDS"
        :key="id"
        class="slot"
        :class="{ empty: !state.inventory[id] }"
        :disabled="!usable || !canUseItem(id)"
        :title="ITEMS[id].name + ' — ' + ITEMS[id].desc"
        @click="useItem(id)"
      >
        <Icon :name="id" :size="30" />
        <span class="qty">{{ state.inventory[id] }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.head { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; opacity: .75; margin-bottom: 6px; }
.row { display: flex; gap: 8px; flex-wrap: wrap; }
.slot {
  position: relative; width: 50px; height: 50px; border: 3px solid var(--ink); border-radius: 12px;
  background: var(--cream); box-shadow: 0 3px 0 var(--ink); padding: 0;
  display: grid; place-items: center; transition: transform .1s;
}
.slot:hover:not(:disabled) { transform: translateY(-2px); }
.slot:disabled { box-shadow: 0 1px 0 var(--ink); }
.slot.empty { opacity: .35; filter: grayscale(1); }
.slot:disabled:not(.empty) { opacity: .7; }
.qty {
  position: absolute; right: -7px; bottom: -7px; font-size: 12px; font-weight: 900; background: var(--orange);
  color: var(--ink); border: 2px solid var(--ink); border-radius: 8px; padding: 0 5px;
}
</style>
