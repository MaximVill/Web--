import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '../stores/user.js'
import TodoPage from '../pages/TodoPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import AboutPage from '../pages/AboutPage.vue'

// Hash-режим: прямые ссылки и обновление страницы работают на GitHub Pages
// без перенаправления на index.html.
const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{ path: '/', name: 'todo', component: TodoPage, meta: { requiresAuth: true, title: 'Мои задачи' } },
		{ path: '/login', name: 'login', component: LoginPage, meta: { guestOnly: true, title: 'Вход' } },
		{ path: '/register', name: 'register', component: RegisterPage, meta: { guestOnly: true, title: 'Регистрация' } },
		{ path: '/about', name: 'about', component: AboutPage, meta: { title: 'О приложении' } },
		{ path: '/:pathMatch(.*)*', redirect: { name: 'todo' } }
	]
})

// Срабатывает и при переходах по ссылкам, и при прямом открытии / обновлении.
// Учебная проверка на клиенте: реальные данные она не защищает.
router.beforeEach((to) => {
	const userStore = useUserStore()
	if (to.meta.requiresAuth && !userStore.isAuthenticated) {
		return { name: 'login' }
	}
	if (to.meta.guestOnly && userStore.isAuthenticated) {
		return { name: 'todo' }
	}
})

router.afterEach((to) => {
	document.title = to.meta.title ? `${to.meta.title} — To-Do` : 'To-Do'
})

export default router
