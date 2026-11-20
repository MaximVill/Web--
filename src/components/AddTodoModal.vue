<script setup lang="ts">
import { ref, watch, useTemplateRef } from 'vue'
import type { Task } from '../types/todo'

// task равен null при создании новой задачи
const props = defineProps<{
	open: boolean
	task: Task | null
}>()

const emit = defineEmits<{
	save: [title: string]
	close: []
}>()

const dialogEl = useTemplateRef<HTMLDialogElement>('dialog')
const title = ref('')

watch(() => props.open, (value) => {
	const dialog = dialogEl.value
	if (!dialog) return
	if (value) {
		title.value = props.task?.title ?? ''
		dialog.showModal()
	} else if (dialog.open) {
		dialog.close()
	}
})

function submit() {
	const text = title.value.trim()
	if (!text) return
	emit('save', text)
}
</script>

<template>
	<dialog ref="dialog" class="modal" aria-labelledby="dialog-title" @close="emit('close')">
		<form method="dialog" class="modal__form" @submit.prevent="submit">
			<h2 id="dialog-title" class="modal__title">{{ task ? 'Редактировать задачу' : 'Новая задача' }}</h2>

			<div class="form-group">
				<label for="task-title" class="form-group__label">Название задачи</label>
				<input
					v-model="title"
					type="text"
					id="task-title"
					class="form-group__input"
					name="title"
					required
					autofocus
					autocomplete="off"
					placeholder="Например, подготовить отчёт"
				/>
			</div>

			<div class="modal__actions">
				<button type="button" class="btn btn--secondary" @click="emit('close')">Отмена</button>
				<button type="submit" class="btn btn--primary">Сохранить</button>
			</div>
		</form>
	</dialog>
</template>
