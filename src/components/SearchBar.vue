<script setup lang="ts">
// v-model родителя, строка поиска
const query = defineModel<string>({ required: true })
</script>

<template>
  <div class="search">
    <label for="task-search" class="visually-hidden">Поиск задач</label>
    <svg
      class="icon search__icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4.2-4.2" />
    </svg>
    <input
      id="task-search"
      v-model="query"
      type="search"
      class="search__input"
      placeholder="Найти задачу"
    />
  </div>
</template>
