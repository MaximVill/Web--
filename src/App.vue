<script setup>
import { ref, computed, watch } from 'vue'
import TodoList from './components/TodoList.vue'
import AddTodoModal from './components/AddTodoModal.vue'
import { loadTasks, saveTasks } from './storage.js'

const tasks = ref(loadTasks())
const isModalOpen = ref(false)
const editingTask = ref(null)

const today = new Date().toLocaleDateString('ru-RU', {
	weekday: 'long',
	day: 'numeric',
	month: 'long'
})

// done tasks go to the bottom
const sortedTasks = computed(() => [...tasks.value].sort((a, b) => a.done - b.done))

const doneCount = computed(() => tasks.value.filter(t => t.done).length)

watch(tasks, (value) => saveTasks(value), { deep: true })

function openModal(task = null) {
	editingTask.value = task
	isModalOpen.value = true
}

function closeModal() {
	isModalOpen.value = false
	editingTask.value = null
}

function saveTask(title) {
	if (editingTask.value) {
		editingTask.value.title = title
	} else {
		tasks.value.push({ id: Date.now().toString(), title, done: false })
	}
	closeModal()
}

function toggleTask(id) {
	const task = tasks.value.find(t => t.id === id)
	if (task) task.done = !task.done
}

function deleteTask(id) {
	tasks.value = tasks.value.filter(t => t.id !== id)
}
</script>

<template>
	<div class="page">
		<header class="page__header">
			<div class="page__heading">
				<h1 class="page__title">Мои задачи</h1>
				<p class="page__subtitle">{{ today }}</p>
			</div>
		</header>

		<main class="page__main">
			<div class="controls">
				<button type="button" class="btn btn--primary btn--block-mobile" @click="openModal()">
					<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
						<path d="M12 5v14M5 12h14" />
					</svg>
					Добавить задачу
				</button>
			</div>

			<section class="tasks-section">
				<div class="tasks-section__head">
					<h2 id="list-heading">Список задач</h2>
					<span v-if="tasks.length" class="tasks-section__count">Выполнено: {{ doneCount }} из {{ tasks.length }}</span>
				</div>
				<TodoList
					:tasks="sortedTasks"
					@toggle="toggleTask"
					@edit="openModal"
					@delete="deleteTask"
				/>
			</section>
		</main>

		<AddTodoModal
			:open="isModalOpen"
			:task="editingTask"
			@save="saveTask"
			@close="closeModal"
		/>
	</div>
</template>
