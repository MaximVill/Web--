// randomUUID есть только в безопасном контексте (https или localhost)
export function createId(): string {
	return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`
}
