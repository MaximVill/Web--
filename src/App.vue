<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import ThemeToggle from './components/ThemeToggle.vue'
import { useUserStore } from './stores/user.js'

const userStore = useUserStore()
const router = useRouter()

// initial theme is set in index.html before first paint
const theme = ref(document.documentElement.getAttribute('data-theme') || 'light')

watch(theme, (value) => {
	document.documentElement.setAttribute('data-theme', value)
	try {
		localStorage.setItem('theme', value)
	} catch (e) {
		console.error('Error saving theme:', e)
	}
})

function toggleTheme() {
	theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

function logout() {
	userStore.logout()
	router.push({ name: 'login' })
}
</script>

<template>
	<div class="page">
		<a href="#main" class="skip-link" @click.prevent="$refs.main.focus()">Перейти к содержимому</a>

		<header class="site-header">
			<nav class="site-nav" aria-label="Основная навигация">
				<ul class="site-nav__list">
					<template v-if="userStore.isAuthenticated">
						<li><RouterLink :to="{ name: 'todo' }" class="site-nav__link">Задачи</RouterLink></li>
					</template>
					<template v-else>
						<li><RouterLink :to="{ name: 'login' }" class="site-nav__link">Вход</RouterLink></li>
						<li><RouterLink :to="{ name: 'register' }" class="site-nav__link">Регистрация</RouterLink></li>
					</template>
					<li><RouterLink :to="{ name: 'about' }" class="site-nav__link">О приложении</RouterLink></li>
				</ul>
			</nav>

			<div class="site-header__actions">
				<template v-if="userStore.isAuthenticated">
					<span class="site-header__user">{{ userStore.currentUser.email }}</span>
					<button type="button" class="btn btn--secondary" @click="logout">Выйти</button>
				</template>
				<ThemeToggle :is-dark="theme === 'dark'" @toggle="toggleTheme" />
			</div>
		</header>

		<main id="main" ref="main" class="page__main" tabindex="-1">
			<RouterView />
		</main>
	</div>
</template>
