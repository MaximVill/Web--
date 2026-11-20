import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './user.js'

function createId() {
	return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

// Все задачи лежат в одном списке, у каждой есть userId владельца.
// Наружу отдаётся только список текущего пользователя.
export const useTodoStore = defineStore(
	'todo',
	() => {
		const userStore = useUserStore()
		const allTasks = ref([])

		const tasks = computed(() => allTasks.value.filter(t => t.userId === userStore.currentUserId))
		const doneCount = computed(() => tasks.value.filter(t => t.done).length)

		function findOwn(id) {
			return tasks.value.find(t => t.id === id)
		}

		function addTask(title) {
			if (!userStore.currentUserId) return
			allTasks.value.push({ id: createId(), userId: userStore.currentUserId, title, done: false })
		}

		function updateTask(id, title) {
			const task = findOwn(id)
			if (task) task.title = title
		}

		function toggleTask(id) {
			const task = findOwn(id)
			if (task) task.done = !task.done
		}

		function removeTask(id) {
			if (!findOwn(id)) return
			allTasks.value = allTasks.value.filter(t => t.id !== id)
		}

		return { allTasks, tasks, doneCount, addTask, updateTask, toggleTask, removeTask }
	},
	{
		persist: {
			key: 'todo_store',
			pick: ['allTasks']
		}
	}
)
