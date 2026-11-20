// Перегрузки
export function formatInput(value: number): string;
export function formatInput(value: string): string;
export function formatInput(value: Date): string;

// Реализация
export function formatInput(value: number | string | Date): string {
  if (value instanceof Date) {
    return value.toISOString();
  }

  // После instanceof тип сужен до number | string
  switch (typeof value) {
    case "number":
      return value.toFixed(2);
    case "string":
      return value.trim();
    default: {
      // Проверка полноты: сюда попадает только never
      const unreachable: never = value;
      throw new TypeError(`Неподдерживаемое значение: ${String(unreachable)}`);
    }
  }
}

console.log("number:", formatInput(3.14159)); // 3.14
console.log("number:", formatInput(42)); // 42.00
console.log("string:", JSON.stringify(formatInput("   Hello, TypeScript!   "))); // "Hello, TypeScript!"
console.log("Date:  ", formatInput(new Date(Date.UTC(2026, 10, 20, 12, 30, 0)))); // 2026-11-20T12:30:00.000Z

// Ошибка компиляции: нет перегрузки для boolean
// formatInput(true);
// TS2769: No overload matches this call.
