const KEY = 'todo_tasks'

function isValidTask(task) {
	return task && typeof task.id === 'string' && typeof task.title === 'string' && typeof task.done === 'boolean'
}

export function loadTasks() {
	try {
		const data = JSON.parse(localStorage.getItem(KEY))
		return Array.isArray(data) ? data.filter(isValidTask) : []
	} catch (e) {
		console.error('Error loading from localStorage, resetting to empty list:', e)
		return []
	}
}

export function saveTasks(tasks) {
	try {
		localStorage.setItem(KEY, JSON.stringify(tasks))
	} catch (e) {
		console.error('Error saving to localStorage:', e)
	}
}
