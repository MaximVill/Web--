export function chunkArray<T>(items: readonly T[], chunkSize: number): T[][] {
  // Number.isInteger отсекает NaN, Infinity и дробные значения
  if (!Number.isInteger(chunkSize) || chunkSize <= 0) {
    throw new RangeError(`Размер блока должен быть положительным целым числом, получено: ${chunkSize}`);
  }

  const chunks: T[][] = [];
  for (let start = 0; start < items.length; start += chunkSize) {
    // slice возвращает копию, последний блок может быть короче
    chunks.push(items.slice(start, start + chunkSize));
  }
  return chunks;
}

const numbers: readonly number[] = [1, 2, 3, 4, 5, 6, 7];
const words: readonly string[] = ["alpha", "beta", "gamma", "delta"];

console.log("Числа по 3:", chunkArray(numbers, 3));
console.log("Строки по 2:", chunkArray(words, 2));
console.log("Размер больше длины:", chunkArray(words, 10));
console.log("Пустой массив:", chunkArray([], 3));

// Исходные массивы не изменились
console.log("numbers:", numbers);
console.log("words:", words);

const invalidSizes = [0, -2, 1.5, Number.NaN, Number.POSITIVE_INFINITY];

for (const size of invalidSizes) {
  try {
    chunkArray(numbers, size);
  } catch (error) {
    if (error instanceof RangeError) {
      console.log(`RangeError: ${error.message}`);
    } else {
      throw error;
    }
  }
}
