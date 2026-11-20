export interface Task {
	id: string
	// id владельца из стора пользователей
	userId: string
	title: string
	done: boolean
}
