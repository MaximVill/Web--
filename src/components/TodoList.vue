<script setup>
import TodoItem from './TodoItem.vue'

defineProps({
	tasks: { type: Array, required: true },
	searching: { type: Boolean, default: false }
})

defineEmits(['toggle', 'edit', 'delete'])
</script>

<template>
	<ul v-if="tasks.length" class="task-list" aria-labelledby="list-heading">
		<TodoItem
			v-for="task in tasks"
			:key="task.id"
			:task="task"
			@toggle="$emit('toggle', $event)"
			@edit="$emit('edit', $event)"
			@delete="$emit('delete', $event)"
		/>
	</ul>

	<div v-else class="empty-state">
		<svg class="empty-state__art" viewBox="0 0 112 88" fill="none" aria-hidden="true" focusable="false">
			<rect x="14" y="8" width="84" height="72" rx="8" fill="currentColor" opacity="0.1" />
			<rect x="14" y="8" width="84" height="72" rx="8" stroke="currentColor" stroke-width="2" />
			<circle cx="32" cy="30" r="7" stroke="currentColor" stroke-width="2" />
			<path d="M29 30l2.2 2.2L35.5 28" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M48 30h34" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
			<circle cx="32" cy="52" r="7" stroke="currentColor" stroke-width="2" />
			<path d="M48 52h24" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
		</svg>
		<h3 class="empty-state__title">{{ searching ? 'Ничего не найдено' : 'Пока нет задач' }}</h3>
		<p class="empty-state__text">
			{{ searching ? 'Попробуйте изменить запрос или очистить поиск.' : 'Добавьте первую задачу, она сохранится в этом браузере.' }}
		</p>
	</div>
</template>
