// Сравнение тегов с учётом регистра

export function addTag(tags: readonly string[], tag: string): string[] {
  // Повтор не добавляется, но результат всегда новый массив
  return tags.includes(tag) ? [...tags] : [...tags, tag];
}

export function removeTag(tags: readonly string[], tag: string): string[] {
  // Удаляются все вхождения
  return tags.filter((current) => current !== tag);
}

export function mergeTags(first: readonly string[], second: readonly string[]): string[] {
  // Set сохраняет порядок первого появления
  return [...new Set([...first, ...second])];
}

const tags: readonly string[] = ["typescript", "node", "lab"];
const otherTags: readonly string[] = ["node", "Lab", "npm", "typescript", "esm"];
const tagsWithRepeats: readonly string[] = ["draft", "lab", "draft", "node", "draft"];

console.log("addTag новый:", addTag(tags, "strict"));
console.log("addTag повтор:", addTag(tags, "node"));
console.log("addTag регистр:", addTag(tags, "Node"));

console.log("removeTag все вхождения:", removeTag(tagsWithRepeats, "draft"));
console.log("removeTag отсутствующий:", removeTag(tags, "vue"));

console.log("mergeTags:", mergeTags(tags, otherTags));

// Исходные массивы не изменились
console.log("tags:", tags);
console.log("otherTags:", otherTags);
console.log("tagsWithRepeats:", tagsWithRepeats);

// Новый массив, а не ссылка на исходный
console.log("addTag вернул копию:", addTag(tags, "node") !== tags); // true

// Ошибка компиляции: readonly массив нельзя изменять
// tags.push("vue");
// TS2339: Property 'push' does not exist on type 'readonly string[]'.
