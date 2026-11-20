type Step<In, Out> = (value: In) => Out;

// Перегрузки связывают выход каждого шага со входом следующего
export function applyPipeline<A, B>(input: A, step1: Step<A, B>): B;
export function applyPipeline<A, B, C>(input: A, step1: Step<A, B>, step2: Step<B, C>): C;
export function applyPipeline<A, B, C, D>(
  input: A,
  step1: Step<A, B>,
  step2: Step<B, C>,
  step3: Step<C, D>,
): D;

// Реализация не видна снаружи, вызвать её можно только через перегрузки.
// Утверждение as never корректно: перегрузки гарантируют, что acc имеет тип входа текущего шага.
export function applyPipeline(input: unknown, ...steps: Step<never, unknown>[]): unknown {
  return steps.reduce<unknown>((acc, step) => step(acc as never), input);
}

const double = (value: number): number => value * 2;
const toLabel = (value: number): string => `Результат: ${value}`;
const shout = (value: string): string => value.toUpperCase();
const countChars = (value: string): number => value.length;

// number, number, string, string
const label = applyPipeline(21, double, toLabel, shout);
console.log("Три шага:", label);

// Один шаг
const doubled = applyPipeline(10, double);
console.log("Один шаг:", doubled);

// Два шага со сменой типа string, number
const length = applyPipeline("  pipeline  ", (value: string) => value.trim(), countChars);
console.log("Два шага:", length);

// Ошибка компиляции: double возвращает number, а shout ожидает string
// applyPipeline(5, double, shout);
// TS2345: Argument of type '(value: number) => number' is not assignable to parameter of type 'Step<5, string>'.
