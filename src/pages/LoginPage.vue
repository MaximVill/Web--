<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'

const userStore = useUserStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const formError = ref('')

function submit() {
	const result = userStore.login({ email: email.value, password: password.value })
	if (result.ok) {
		router.push({ name: 'todo' })
	} else {
		formError.value = result.errors.form
	}
}
</script>

<template>
	<section class="auth-card" aria-labelledby="login-title">
		<h1 id="login-title" class="auth-card__title">Вход</h1>
		<p class="auth-card__note">Учебная авторизация без сервера. Используйте только вымышленные данные.</p>

		<form novalidate @submit.prevent="submit">
			<p v-if="formError" class="form-error form-error--box" role="alert">{{ formError }}</p>

			<div class="form-group">
				<label for="login-email" class="form-group__label">Email</label>
				<input
					v-model="email"
					id="login-email"
					class="form-group__input"
					type="email"
					name="email"
					autocomplete="username"
					required
				/>
			</div>

			<div class="form-group">
				<label for="login-password" class="form-group__label">Пароль</label>
				<input
					v-model="password"
					id="login-password"
					class="form-group__input"
					type="password"
					name="password"
					autocomplete="current-password"
					required
				/>
			</div>

			<button type="submit" class="btn btn--primary auth-card__submit">Войти</button>
		</form>

		<p class="auth-card__footer">
			Нет аккаунта?
			<RouterLink :to="{ name: 'register' }" class="link">Зарегистрироваться</RouterLink>
		</p>
	</section>
</template>
