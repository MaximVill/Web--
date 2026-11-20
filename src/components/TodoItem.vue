<script setup lang="ts">
import type { Task } from '../types/todo'

defineProps<{
	task: Task
}>()

defineEmits<{
	toggle: [id: string]
	edit: [task: Task]
	delete: [id: string]
}>()
</script>

<template>
	<li class="task-item" :class="{ 'task-item--done': task.done }">
		<input
			:id="'check-' + task.id"
			type="checkbox"
			class="task-item__checkbox"
			:checked="task.done"
			@change="$emit('toggle', task.id)"
		/>
		<label :id="'title-' + task.id" :for="'check-' + task.id" class="task-item__title">{{ task.title }}</label>
		<div class="task-item__actions">
			<button
				:id="'edit-btn-' + task.id"
				type="button"
				class="btn-icon btn-icon--edit"
				:aria-labelledby="`edit-btn-${task.id} title-${task.id}`"
				@click="$emit('edit', task)"
			>
				<span class="visually-hidden">Редактировать задачу</span>
				<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
					<path d="M16.5 4.5a2.12 2.12 0 0 1 3 3L8 19l-4 1 1-4L16.5 4.5z" />
				</svg>
			</button>
			<button
				:id="'del-btn-' + task.id"
				type="button"
				class="btn-icon btn-icon--delete"
				:aria-labelledby="`del-btn-${task.id} title-${task.id}`"
				@click="$emit('delete', task.id)"
			>
				<span class="visually-hidden">Удалить задачу</span>
				<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
					<path d="M5 7h14M10 11v6M14 11v6M6 7l1 12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-12M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
				</svg>
			</button>
		</div>
	</li>
</template>
