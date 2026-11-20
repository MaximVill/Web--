export interface Repository<T extends { id: string }> {
  create(item: T): T;
  findById(id: string): T | undefined;
  update(id: string, changes: Partial<Omit<T, "id">>): T | undefined;
  delete(id: string): boolean;
}

export class MemoryRepository<T extends { id: string }> implements Repository<T> {
  private readonly items = new Map<string, T>();

  create(item: T): T {
    if (this.items.has(item.id)) {
      throw new Error(`Сущность с id "${item.id}" уже существует`);
    }
    // Поверхностная копия, чтобы изменение исходного объекта не влияло на хранилище
    const stored = { ...item };
    this.items.set(stored.id, stored);
    return stored;
  }

  findById(id: string): T | undefined {
    return this.items.get(id);
  }

  update(id: string, changes: Partial<Omit<T, "id">>): T | undefined {
    const existing = this.items.get(id);
    if (existing === undefined) {
      return undefined;
    }
    // id записывается последним и не может быть перезаписан изменениями
    const updated: T = { ...existing, ...changes, id: existing.id };
    this.items.set(id, updated);
    return updated;
  }

  delete(id: string): boolean {
    return this.items.delete(id);
  }
}

interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
}

const books = new MemoryRepository<Book>();

// Create
console.log("create:", books.create({ id: "b1", title: "Мастер и Маргарита", author: "М. Булгаков", year: 1967 }));
console.log("create:", books.create({ id: "b2", title: "Пикник на обочине", author: "А. и Б. Стругацкие", year: 1972 }));

// Повторный id
try {
  books.create({ id: "b1", title: "Дубликат", author: "Неизвестен", year: 2000 });
} catch (error) {
  if (error instanceof Error) {
    console.log(`Error: ${error.message}`);
  } else {
    throw error;
  }
}

// Read
console.log("findById b2:", books.findById("b2"));
console.log("findById b404:", books.findById("b404"));

// Update
console.log("update b1:", books.update("b1", { year: 1966, title: "Мастер и Маргарита (журнальная версия)" }));
console.log("update b404:", books.update("b404", { year: 2024 }));

// Delete
console.log("delete b2:", books.delete("b2"));
console.log("delete b2 повторно:", books.delete("b2"));
console.log("findById b2 после удаления:", books.findById("b2"));

// Ошибка компиляции: id нельзя менять через update
// books.update("b1", { id: "b100" });
// TS2353: Object literal may only specify known properties, and 'id' does not exist in type 'Partial<Omit<Book, "id">>'.
