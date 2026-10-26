<script setup>
const today = new Date().toLocaleDateString('ru-RU', {
	weekday: 'long',
	day: 'numeric',
	month: 'long'
})
</script>

<template>
	<div class="page">
		<header class="page__header">
			<div class="page__heading">
				<h1 class="page__title">Мои задачи</h1>
				<p class="page__subtitle">{{ today }}</p>
			</div>
		</header>

		<main class="page__main">
			<div class="controls">
				<button type="button" class="btn btn--primary btn--block-mobile">
					<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
						<path d="M12 5v14M5 12h14" />
					</svg>
					Добавить задачу
				</button>
			</div>

			<section class="tasks-section">
				<div class="tasks-section__head">
					<h2 id="list-heading">Список задач</h2>
				</div>
				<ul class="task-list" aria-labelledby="list-heading"></ul>
			</section>
		</main>
	</div>
</template>
