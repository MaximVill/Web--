<script setup>
import { onMounted } from 'vue'
import { state, toggleMute } from './stores/game.js'
import { unlock } from './audio/sfx.js'
import Icon from './components/ui/Icon.vue'
import HeadquartersView from './views/HeadquartersView.vue'
import StreetView from './views/StreetView.vue'
import DoorView from './views/DoorView.vue'
import EscapeView from './views/EscapeView.vue'
import JournalView from './views/JournalView.vue'
import WinView from './views/WinView.vue'
import TitleView from './views/TitleView.vue'

const views = {
  title: TitleView,
  hq: HeadquartersView,
  street: StreetView,
  door: DoorView,
  escape: EscapeView,
  journal: JournalView,
  win: WinView,
}

onMounted(() => window.addEventListener('pointerdown', unlock, { once: true }))
</script>

<template>
  <Transition name="fade" mode="out-in">
    <component :is="views[state.screen]" :key="state.screen" />
  </Transition>
  <button class="mute btn small" @click="toggleMute" :title="state.muted ? 'Включить звук' : 'Выключить звук'">
    <Icon :name="state.muted ? 'mute' : 'sound'" :size="22" />
  </button>
  <div class="crt"></div>
</template>

<style>
.btn.mute { position: fixed; bottom: 10px; left: 10px; z-index: 50; opacity: .8; padding: 4px 6px; }
</style>
