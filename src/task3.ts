// Брендированный тип: обычную строку нельзя передать как UserId без проверки
export type UserId = string & { readonly brand: unique symbol };

export interface UserProfile {
  id: UserId;
  name: string;
  email: string;
}

// UUID 8-4-4-4-12, версия не проверяется
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUserId(value: unknown): value is UserId {
  return typeof value === "string" && UUID_PATTERN.test(value);
}

export function getUserProfile(id: UserId): UserProfile {
  return {
    id,
    name: "Демо-пользователь",
    email: "demo@example.com",
  };
}

const inputs: unknown[] = [
  "3f2504e0-4f89-11d3-9a0c-0305e82c3301",
  "3F2504E0-4F89-11D3-9A0C-0305E82C3301",
  "not-a-uuid",
  "3f2504e0-4f89-11d3-9a0c-0305e82c330",
  42,
  null,
  { id: "3f2504e0-4f89-11d3-9a0c-0305e82c3301" },
];

for (const input of inputs) {
  // После сторожа input имеет тип UserId
  if (isUserId(input)) {
    console.log("Профиль:", getUserProfile(input));
  } else {
    console.log("Некорректный UserId:", JSON.stringify(input));
  }
}

// Ошибка компиляции: string не является UserId без проверки
// getUserProfile("3f2504e0-4f89-11d3-9a0c-0305e82c3301");
// TS2345: Argument of type 'string' is not assignable to parameter of type 'UserId'.
