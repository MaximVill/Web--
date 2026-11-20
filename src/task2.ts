export type RGBColor = [number, number, number];

export enum ColorName {
  Red = "Red",
  Green = "Green",
  Blue = "Blue",
  Orange = "Orange",
  Navy = "Navy",
}

// Record требует значение для каждого члена enum
const COLOR_TABLE: Record<ColorName, RGBColor> = {
  [ColorName.Red]: [255, 0, 0],
  [ColorName.Green]: [0, 128, 0],
  [ColorName.Blue]: [0, 0, 255],
  [ColorName.Orange]: [255, 165, 0],
  [ColorName.Navy]: [0, 0, 128],
};

// Канал: целое число от 0 до 255
function assertChannel(channel: number): void {
  if (!Number.isInteger(channel) || channel < 0 || channel > 255) {
    throw new RangeError(`Канал RGB должен быть целым числом от 0 до 255, получено: ${channel}`);
  }
}

export function rgbToHex(color: RGBColor): string {
  color.forEach(assertChannel);
  // padStart добавляет ведущий ноль для значений меньше 16
  const hex = color.map((channel) => channel.toString(16).padStart(2, "0")).join("");
  return `#${hex}`;
}

export function getColor(name: ColorName): { rgb: RGBColor; hex: string } {
  const rgb = COLOR_TABLE[name];
  return { rgb, hex: rgbToHex(rgb) };
}

// Все цвета enum
for (const name of Object.values(ColorName)) {
  const { rgb, hex } = getColor(name);
  console.log(`${name}: rgb(${rgb.join(", ")}) ${hex}`);
}

// Ведущие нули
console.log("rgbToHex([0, 8, 15]):", rgbToHex([0, 8, 15])); // #00080f

// Некорректные каналы
const invalidColors: RGBColor[] = [
  [256, 0, 0],
  [-1, 100, 100],
  [12.5, 0, 0],
  [Number.NaN, 0, 0],
];

for (const color of invalidColors) {
  try {
    rgbToHex(color);
  } catch (error) {
    if (error instanceof RangeError) {
      console.log(`RangeError: ${error.message}`);
    } else {
      throw error;
    }
  }
}

// Ошибка компиляции: кортеж ожидает ровно три числа
// rgbToHex([255, 0]);
// TS2345: Argument of type '[number, number]' is not assignable to parameter of type 'RGBColor'.
