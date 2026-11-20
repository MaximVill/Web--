import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { AuthResult, FormErrors, LoginForm, RegisterField, RegisterForm, User } from '../types/user'
import { createId } from '../utils/id'
import { isUser, parseRecord } from '../utils/guards'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function normalizeEmail(email: string): string {
	return email.trim().toLowerCase()
}

// Учебная авторизация: всё хранится только в браузере (localStorage).
// Это не защита реальных данных, используйте вымышленные email и пароли.
export const useUserStore = defineStore(
	'user',
	() => {
		const users = ref<User[]>([])
		const currentUserId = ref<string | null>(null)

		const currentUser = computed(() => users.value.find(u => u.id === currentUserId.value) ?? null)
		const isAuthenticated = computed(() => currentUser.value !== null)

		function register({ email, password, confirmPassword }: RegisterForm): AuthResult<RegisterField> {
			const errors: FormErrors<RegisterField> = {}
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

		function login({ email, password }: LoginForm): AuthResult<'form'> {
			const normalized = normalizeEmail(email)
			const user = users.value.find(u => u.email === normalized && u.password === password)
			if (!user) {
				return { ok: false, errors: { form: 'Неверный email или пароль' } }
			}
			currentUserId.value = user.id
			return { ok: true }
		}

		// выход не удаляет аккаунты и задачи
		function logout(): void {
			currentUserId.value = null
		}

		return { users, currentUserId, currentUser, isAuthenticated, register, login, logout }
	},
	{
		persist: {
			// ключ и формат те же, что в лабе 7
			key: 'todo_user',
			pick: ['users', 'currentUserId'],
			serializer: {
				serialize: JSON.stringify,
				// записи неверной формы отбрасываются
				deserialize(raw) {
					const data = parseRecord(raw)
					const users = Array.isArray(data.users) ? data.users.filter(isUser) : []
					const id = data.currentUserId
					const currentUserId = typeof id === 'string' && users.some(u => u.id === id) ? id : null
					return { users, currentUserId }
				}
			}
		}
	}
)
