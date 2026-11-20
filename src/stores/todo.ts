import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Task } from '../types/todo'
import { useUserStore } from './user'
import { createId } from '../utils/id'
import { isTask, parseRecord } from '../utils/guards'

// Все задачи лежат в одном списке, у каждой есть userId владельца.
// Наружу отдаётся только список текущего пользователя.
export const useTodoStore = defineStore(
  'todo',
  () => {
    const userStore = useUserStore()
    const allTasks = ref<Task[]>([])

    const tasks = computed(() =>
      allTasks.value.filter((t) => t.userId === userStore.currentUserId)
    )
    const doneCount = computed(() => tasks.value.filter((t) => t.done).length)

    function findOwn(id: string): Task | undefined {
      return tasks.value.find((t) => t.id === id)
    }

    function addTask(title: string): void {
      const userId = userStore.currentUserId
      if (!userId) return
      allTasks.value.push({ id: createId(), userId, title, done: false })
    }

    function updateTask(id: string, title: string): void {
      const task = findOwn(id)
      if (task) task.title = title
    }

    function toggleTask(id: string): void {
      const task = findOwn(id)
      if (task) task.done = !task.done
    }

    function removeTask(id: string): void {
      if (!findOwn(id)) return
      allTasks.value = allTasks.value.filter((t) => t.id !== id)
    }

    return {
      allTasks,
      tasks,
      doneCount,
      addTask,
      updateTask,
      toggleTask,
      removeTask
    }
  },
  {
    persist: {
      key: 'todo_store',
      pick: ['allTasks'],
      serializer: {
        serialize: JSON.stringify,
        deserialize(raw) {
          const data = parseRecord(raw)
          return {
            allTasks: Array.isArray(data.allTasks)
              ? data.allTasks.filter(isTask)
              : []
          }
        }
      }
    }
  }
)
