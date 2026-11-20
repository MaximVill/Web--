import type { Task } from '../types/todo'
import type { User } from '../types/user'

// Данные из localStorage приходят как unknown: TypeScript их при выполнении не проверяет

export function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function isUser(value: unknown): value is User {
	return (
		isRecord(value) &&
		typeof value.id === 'string' &&
		typeof value.email === 'string' &&
		typeof value.password === 'string'
	)
}

export function isTask(value: unknown): value is Task {
	return (
		isRecord(value) &&
		typeof value.id === 'string' &&
		typeof value.userId === 'string' &&
		typeof value.title === 'string' &&
		typeof value.done === 'boolean'
	)
}

// Битый JSON считается пустым состоянием
export function parseRecord(raw: string): Record<string, unknown> {
	try {
		const data: unknown = JSON.parse(raw)
		return isRecord(data) ? data : {}
	} catch {
		return {}
	}
}
