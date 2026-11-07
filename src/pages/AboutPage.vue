<script setup>
import { computed } from 'vue'
import { useUserStore } from '../stores/user.js'
import { useTodoStore } from '../stores/todo.js'

const userStore = useUserStore()
const todoStore = useTodoStore()

// Статистика считается из сторов и относится только к этому браузеру
const stats = computed(() => {
	const all = todoStore.allTasks
	return [
		{ label: 'Аккаунтов в браузере', value: userStore.users.length },
		{ label: 'Задач создано', value: all.length },
		{ label: 'Задач выполнено', value: all.filter((t) => t.done).length },
	]
})

const stack = [
	{ name: 'Vue 3', text: 'Компоненты и Composition API' },
	{ name: 'Pinia', text: 'Сторы пользователей и задач' },
	{ name: 'Vue Router', text: 'Страницы и guard для гостей' },
	{ name: 'persistedstate', text: 'Состояние живёт в localStorage' },
	{ name: 'Vite + Sass', text: 'Сборка и стили' },
]

const history = [
	{ lab: 'Лаба 1', text: 'Портфолио на чистом HTML и CSS.' },
	{ lab: 'Лаба 2', text: 'Добавили jQuery — страница начала шевелиться.' },
	{
		lab: 'Лаба 3',
		text: 'Переехали на Sass: переменные и миксины вместо копипасты.',
	},
	{ lab: 'Лаба 4', text: 'Первый To-Do и доступность A1–A7.' },
	{
		lab: 'Лаба 5–6',
		text: 'Тот же To-Do на Vue 3 и Vite, с модалкой, поиском и темой.',
	},
	{ lab: 'Лаба 7', text: 'Pinia, маршруты и учебная авторизация — вы здесь.' },
]
</script>

<template>
	<article class="about" aria-labelledby="about-title">
		<header class="about__hero">
			<h1 id="about-title">О приложении</h1>
			<p class="about__lead">
				To-Do - это учебный проект, прошедший путь от одной страницы в маленькое
				приложение с аккаунтами. Здесь можно завести задачи и не потерять их
				после перезагрузки.
			</p>
		</header>

		<section class="about__section" aria-labelledby="about-stats">
			<h2 id="about-stats">Статистика</h2>
			<dl class="stats">
				<div v-for="item in stats" :key="item.label" class="stats__item">
					<dt class="stats__label">{{ item.label }}</dt>
					<dd class="stats__value">{{ item.value }}</dd>
				</div>
			</dl>
			<p class="about__hint">
				Цифры считаются по данным этого браузера: сервера у приложения нет.
			</p>
		</section>

		<section class="about__section" aria-labelledby="about-stack">
			<h2 id="about-stack">Из чего сделано</h2>
			<ul class="chips">
				<li v-for="item in stack" :key="item.name" class="chips__item">
					<strong>{{ item.name }}</strong>
					<span class="text-muted">{{ item.text }}</span>
				</li>
			</ul>
		</section>

		<section class="about__section" aria-labelledby="about-history">
			<h2 id="about-history">История разработки</h2>
			<ol class="timeline">
				<li v-for="step in history" :key="step.lab" class="timeline__item">
					<span class="timeline__lab">{{ step.lab }}</span>
					<span>{{ step.text }}</span>
				</li>
			</ol>
		</section>

		<section class="about__section about__note" aria-labelledby="about-auth">
			<h2 id="about-auth">Про безопасность</h2>
			<p>
				Вход здесь учебный: аккаунты и пароли лежат в
				<code>localStorage</code> и видны любому скрипту на странице. Это не
				защита настоящих данных, поэтому используйте только вымышленные email и
				пароли. Настоящая авторизация потребует сервера.
			</p>
		</section>

		<p class="about__footer">
			<RouterLink :to="{ name: 'todo' }" class="link"
				>К списку задач</RouterLink
			>
		</p>
	</article>
</template>
