<script setup>
defineProps({
	isDark: { type: Boolean, default: false }
})

defineEmits(['toggle'])
</script>

<template>
	<button
		type="button"
		class="theme-toggle"
		aria-label="Тёмная тема"
		:aria-pressed="String(isDark)"
		@click="$emit('toggle')"
	>
		<svg class="icon theme-toggle__icon theme-toggle__icon--moon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
			<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
		</svg>
		<svg class="icon theme-toggle__icon theme-toggle__icon--sun" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
			<circle cx="12" cy="12" r="4" />
			<path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" />
		</svg>
	</button>
</template>
