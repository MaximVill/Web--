<script setup lang="ts">
import { ref, computed, nextTick, useTemplateRef } from 'vue'
import type { Task } from '../types/todo'
import TodoList from '../components/TodoList.vue'
import AddTodoModal from '../components/AddTodoModal.vue'
import SearchBar from '../components/SearchBar.vue'
import { useTodoStore } from '../stores/todo'

const todoStore = useTodoStore()

const isModalOpen = ref(false)
const editingTask = ref<Task | null>(null)
const search = ref('')
const addButtonEl = useTemplateRef<HTMLButtonElement>('addButton')

const today = new Date().toLocaleDateString('ru-RU', {
	weekday: 'long',
	day: 'numeric',
	month: 'long'
})

// search filter, done tasks go to the bottom
const visibleTasks = computed(() => {
	const query = search.value.trim().toLowerCase()
	return todoStore.tasks
		.filter(t => t.title.toLowerCase().includes(query))
		.sort((a, b) => Number(a.done) - Number(b.done))
})

// for screen readers
const searchMessage = computed(() => search.value ? `Найдено задач: ${visibleTasks.value.length}` : '')

function openModal(task: Task | null = null) {
	editingTask.value = task
	isModalOpen.value = true
}

function closeModal() {
	isModalOpen.value = false
	editingTask.value = null
}

function saveTask(title: string) {
	if (editingTask.value) {
		todoStore.updateTask(editingTask.value.id, title)
	} else {
		todoStore.addTask(title)
	}
	closeModal()
}

async function deleteTask(id: string) {
	todoStore.removeTask(id)

	// move focus to the first task or to the add button
	await nextTick()
	const firstCheckbox = document.querySelector<HTMLInputElement>('.task-item__checkbox')
	if (firstCheckbox) {
		firstCheckbox.focus()
	} else {
		addButtonEl.value?.focus()
	}
}
</script>

<template>
	<div class="page__heading">
		<h1 class="page__title">Мои задачи</h1>
		<p class="page__subtitle">{{ today }}</p>
	</div>

	<div class="controls">
		<SearchBar v-model="search" />
		<button ref="addButton" type="button" class="btn btn--primary btn--block-mobile" @click="openModal()">
			<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
				<path d="M12 5v14M5 12h14" />
			</svg>
			Добавить задачу
		</button>
	</div>

	<section class="tasks-section">
		<div class="tasks-section__head">
			<h2 id="list-heading">Список задач</h2>
			<span v-if="todoStore.tasks.length" class="tasks-section__count">
				Выполнено: {{ todoStore.doneCount }} из {{ todoStore.tasks.length }}
			</span>
		</div>
		<TodoList
			:tasks="visibleTasks"
			:searching="todoStore.tasks.length > 0"
			@toggle="todoStore.toggleTask"
			@edit="openModal"
			@delete="deleteTask"
		/>
	</section>

	<div class="visually-hidden" aria-live="polite">{{ searchMessage }}</div>

	<AddTodoModal
		:open="isModalOpen"
		:task="editingTask"
		@save="saveTask"
		@close="closeModal"
	/>
</template>
