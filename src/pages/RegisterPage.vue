<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'

const userStore = useUserStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errors = reactive({ email: '', password: '', confirmPassword: '' })

function submit() {
	const result = userStore.register({
		email: email.value,
		password: password.value,
		confirmPassword: confirmPassword.value
	})

	errors.email = result.errors?.email ?? ''
	errors.password = result.errors?.password ?? ''
	errors.confirmPassword = result.errors?.confirmPassword ?? ''

	if (result.ok) {
		router.push({ name: 'login' })
	} else {
		// фокус на первое поле с ошибкой
		const first = ['email', 'password', 'confirmPassword'].find(k => errors[k])
		document.getElementById(`register-${first}`)?.focus()
	}
}
</script>

<template>
	<section class="auth-card" aria-labelledby="register-title">
		<h1 id="register-title" class="auth-card__title">Регистрация</h1>
		<p class="auth-card__note">Учебная авторизация без сервера. Используйте только вымышленные данные.</p>

		<form novalidate @submit.prevent="submit">
			<div class="form-group">
				<label for="register-email" class="form-group__label">Email</label>
				<input
					v-model="email"
					id="register-email"
					class="form-group__input"
					type="email"
					name="email"
					autocomplete="username"
					required
					:aria-invalid="errors.email ? 'true' : null"
					:aria-describedby="errors.email ? 'register-email-error' : null"
				/>
				<p v-if="errors.email" id="register-email-error" class="form-error">{{ errors.email }}</p>
			</div>

			<div class="form-group">
				<label for="register-password" class="form-group__label">Пароль</label>
				<input
					v-model="password"
					id="register-password"
					class="form-group__input"
					type="password"
					name="password"
					autocomplete="new-password"
					required
					:aria-invalid="errors.password ? 'true' : null"
					:aria-describedby="errors.password ? 'register-password-error' : 'register-password-hint'"
				/>
				<p v-if="errors.password" id="register-password-error" class="form-error">{{ errors.password }}</p>
				<p v-else id="register-password-hint" class="form-hint">Не короче 6 символов</p>
			</div>

			<div class="form-group">
				<label for="register-confirmPassword" class="form-group__label">Подтверждение пароля</label>
				<input
					v-model="confirmPassword"
					id="register-confirmPassword"
					class="form-group__input"
					type="password"
					name="confirmPassword"
					autocomplete="new-password"
					required
					:aria-invalid="errors.confirmPassword ? 'true' : null"
					:aria-describedby="errors.confirmPassword ? 'register-confirm-error' : null"
				/>
				<p v-if="errors.confirmPassword" id="register-confirm-error" class="form-error">{{ errors.confirmPassword }}</p>
			</div>

			<button type="submit" class="btn btn--primary auth-card__submit">Зарегистрироваться</button>
		</form>

		<p class="auth-card__footer">
			Уже есть аккаунт?
			<RouterLink :to="{ name: 'login' }" class="link">Войти</RouterLink>
		</p>
	</section>
</template>
