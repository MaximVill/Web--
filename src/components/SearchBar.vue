<script setup>
defineProps({
	modelValue: { type: String, default: '' }
})

defineEmits(['update:modelValue'])
</script>

<template>
	<div class="search">
		<label for="task-search" class="visually-hidden">Поиск задач</label>
		<svg class="icon search__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
			<circle cx="11" cy="11" r="6" />
			<path d="M20 20l-4.2-4.2" />
		</svg>
		<input
			type="search"
			id="task-search"
			class="search__input"
			placeholder="Найти задачу"
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
		/>
	</div>
</template>
