<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
	open: { type: Boolean, default: false },
	task: { type: Object, default: null }
})

const emit = defineEmits(['save', 'close'])

const dialog = ref(null)
const title = ref('')

watch(() => props.open, (value) => {
	if (value) {
		title.value = props.task ? props.task.title : ''
		dialog.value.showModal()
	} else if (dialog.value.open) {
		dialog.value.close()
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
