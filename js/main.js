class StorageService {
    static KEY = 'todo_tasks';

    static save(tasks) {
        try {
            localStorage.setItem(this.KEY, JSON.stringify(tasks));
        } catch (e) {
            console.error('Error saving to localStorage:', e);
        }
    }

    static load() {
        try {
            const data = localStorage.getItem(this.KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Error loading from localStorage, resetting to empty list:', e);
            return [];
        }
    }
}

class TaskController {
    constructor() {
        this.tasks = StorageService.load();
        this.elements = {
            list: document.querySelector('.js-task-list'),
            dialog: document.querySelector('.js-task-dialog'),
            addBtn: document.querySelector('.js-add-task'),
            closeBtn: document.querySelector('.js-close-dialog'),
            form: document.querySelector('.modal__form'),
            input: document.querySelector('#task-title'),
            search: document.querySelector('.js-search'),
            themeToggle: document.querySelector('.js-theme-toggle')
        };

        this.editingId = null;
        this.init();
    }

    init() {
        this.render();
        this.setupEventListeners();
        this.initTheme();
        this.setupLiveRegion();
    }

    setupLiveRegion() {
        // Create an aria-live region for announcing search results
        this.liveRegion = document.createElement('div');
        this.liveRegion.className = 'visually-hidden';
        this.liveRegion.setAttribute('aria-live', 'polite');
        document.body.appendChild(this.liveRegion);
    }

    setupEventListeners() {
        this.elements.addBtn.addEventListener('click', () => this.openModal());
        this.elements.closeBtn.addEventListener('click', () => this.elements.dialog.close());

        this.elements.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveTask();
            this.elements.dialog.close();
        });

        this.elements.search.addEventListener('input', () => {
            this.render();
            this.announceResults();
        });

        this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    announceResults() {
        const count = this.elements.list.children.length;
        const query = this.elements.search.value;
        if (query) {
            this.liveRegion.textContent = `Найдено задач: ${count}`;
        } else {
            this.liveRegion.textContent = '';
        }
    }

    openModal(id = null) {
        this.editingId = id;
        if (id) {
            const task = this.tasks.find(t => t.id === id);
            this.elements.input.value = task ? task.title : '';
            document.querySelector('#dialog-title').textContent = 'Редактировать задачу';
        } else {
            this.elements.input.value = '';
            document.querySelector('#dialog-title').textContent = 'Новая задача';
        }
        this.elements.dialog.showModal();
    }

    saveTask() {
        const title = this.elements.input.value.trim();
        if (!title) return;

        if (this.editingId) {
            this.tasks = this.tasks.map(t =>
                t.id === this.editingId ? { ...t, title } : t
            );
        } else {
            const newTask = {
                id: Date.now().toString(),
                title: title,
                done: false
            };
            this.tasks.push(newTask);
        }

        StorageService.save(this.tasks);
        this.render();
    }

    toggleTask(id) {
        this.tasks = this.tasks.map(t =>
            t.id === id ? { ...t, done: !t.done } : t
        );
        StorageService.save(this.tasks);
        this.render();
    }

    deleteTask(id) {
        const itemToRemove = this.elements.list.querySelector(`[data-id="${id}"]`);

        this.tasks = this.tasks.filter(t => t.id !== id);
        StorageService.save(this.tasks);
        this.render();

        this.manageFocusAfterDelete(itemToRemove);
    }

    manageFocusAfterDelete(removedElement) {
        const tasks = [...document.querySelectorAll('.task-item')];

        if (tasks.length === 0) {
            this.elements.addBtn.focus();
            return;
        }

        // Try to focus the task that was immediately after the deleted one
        // Since the DOM was already re-rendered by this.render(),
        // we simply look for the first task if we don't have complex index tracking.
        // To be more precise, we can focus the first task in the current filtered view.
        const firstTaskInput = tasks[0].querySelector('input');
        if (firstTaskInput) {
            firstTaskInput.focus();
        } else {
            this.elements.addBtn.focus();
        }
    }

    initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeIcon(newTheme);
    }

    updateThemeIcon(theme) {
        this.elements.themeToggle.querySelector('.theme-toggle__icon').textContent =
            theme === 'light' ? '🌙' : '☀️';
    }

    render() {
        const query = this.elements.search.value.toLowerCase();
        const filteredTasks = this.tasks.filter(t =>
            t.title.toLowerCase().includes(query)
        );

        const sortedTasks = [...filteredTasks].sort((a, b) => a.done - b.done);

        this.elements.list.innerHTML = '';

        sortedTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.done ? 'task-item--done' : ''}`;
            li.dataset.id = task.id;

            const checkboxId = `check-${task.id}`;
            const titleId = `title-${task.id}`;

            li.innerHTML = `
                <input type="checkbox" class="task-item__checkbox" id="${checkboxId}" ${task.done ? 'checked' : ''}>
                <label for="${checkboxId}" class="task-item__title" id="${titleId}">${this.escapeHtml(task.title)}</label>
                <div class="task-item__actions">
                    <button type="button" class="btn-icon btn-icon--edit" aria-labelledby="edit-${task.id} ${titleId}">
                        <span id="edit-${task.id}" class="visually-hidden">Редактировать задачу</span>
                        ✎
                    </button>
                    <button type="button" class="btn-icon btn-icon--delete" aria-labelledby="del-${task.id} ${titleId}">
                        <span id="del-${task.id}" class="visually-hidden">Удалить задачу</span>
                        ✕
                    </button>
                </div>
            `;

            li.querySelector('input').addEventListener('change', () => this.toggleTask(task.id));
            li.querySelector('label').addEventListener('click', () => this.toggleTask(task.id));
            li.querySelector('.btn-icon--edit').addEventListener('click', () => this.openModal(task.id));
            li.querySelector('.btn-icon--delete').addEventListener('click', () => this.deleteTask(task.id));

            this.elements.list.appendChild(li);
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TaskController();
});
