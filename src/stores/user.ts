import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function normalizeEmail(email) {
	return String(email ?? '').trim().toLowerCase()
}

function createId() {
	return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

// Учебная авторизация: всё хранится только в браузере (localStorage).
// Это не защита реальных данных — используйте вымышленные email и пароли.
export const useUserStore = defineStore(
	'user',
	() => {
		const users = ref([])
		const currentUserId = ref(null)

		const currentUser = computed(() => users.value.find(u => u.id === currentUserId.value) ?? null)
		const isAuthenticated = computed(() => currentUser.value !== null)

		// Возвращают { ok: true } или { ok: false, errors: { поле: 'сообщение' } }
		function register({ email, password, confirmPassword }) {
			const errors = {}
			const normalized = normalizeEmail(email)

			if (!normalized) {
				errors.email = 'Введите email'
			} else if (!EMAIL_RE.test(normalized)) {
				errors.email = 'Некорректный формат email'
			} else if (users.value.some(u => u.email === normalized)) {
				errors.email = 'Пользователь с таким email уже существует'
			}

			if (!password) {
				errors.password = 'Введите пароль'
			} else if (password.length < 6) {
				errors.password = 'Пароль должен быть не короче 6 символов'
			}

			if (!confirmPassword) {
				errors.confirmPassword = 'Повторите пароль'
			} else if (password !== confirmPassword) {
				errors.confirmPassword = 'Пароли не совпадают'
			}

			if (Object.keys(errors).length) return { ok: false, errors }

			users.value.push({ id: createId(), email: normalized, password })
			return { ok: true }
		}

		function login({ email, password }) {
			const normalized = normalizeEmail(email)
			const user = users.value.find(u => u.email === normalized && u.password === password)
			if (!user) {
				return { ok: false, errors: { form: 'Неверный email или пароль' } }
			}
			currentUserId.value = user.id
			return { ok: true }
		}

		// выход не удаляет аккаунты и задачи
		function logout() {
			currentUserId.value = null
		}

		return { users, currentUserId, currentUser, isAuthenticated, register, login, logout }
	},
	{
		persist: {
			key: 'todo_user',
			pick: ['users', 'currentUserId']
		}
	}
)
