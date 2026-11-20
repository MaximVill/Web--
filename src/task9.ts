// Массивы становятся ReadonlyArray, объекты получают readonly на каждом уровне
export type DeepReadonly<T> = T extends readonly (infer Item)[]
  ? ReadonlyArray<DeepReadonly<Item>>
  : T extends object
    ? { readonly [Key in keyof T]: DeepReadonly<T[Key]> }
    : T;

export function deepFreeze<T>(obj: T): DeepReadonly<T> {
  // Примитивы и null возвращаются как есть
  if (obj !== null && typeof obj === "object") {
    // Сначала вложенные объекты и массивы, затем сам объект
    for (const value of Object.values(obj)) {
      deepFreeze(value);
    }
    Object.freeze(obj);
  }
  // Утверждение корректно: все объекты и массивы внутри obj заморожены рекурсивно,
  // а примитивы и null совпадают со своим DeepReadonly
  return obj as DeepReadonly<T>;
}

const config = deepFreeze({
  appName: "typescript-lab-8",
  version: 1,
  server: {
    host: "localhost",
    port: 3000,
    tls: {
      enabled: false,
      certPath: null,
    },
  },
  users: [
    { id: "u1", name: "Анна", roles: ["admin", "editor"] },
    { id: "u2", name: "Иван", roles: ["viewer"] },
  ],
});

console.log("config:", config);
console.log("isFrozen config:", Object.isFrozen(config));
console.log("isFrozen config.server:", Object.isFrozen(config.server));
console.log("isFrozen config.server.tls:", Object.isFrozen(config.server.tls));
console.log("isFrozen config.users:", Object.isFrozen(config.users));
console.log("isFrozen config.users[0]:", Object.isFrozen(config.users[0]));
console.log("isFrozen config.users[0].roles:", Object.isFrozen(config.users[0].roles));

// Проверка при выполнении: Reflect.set возвращает false для замороженного объекта
console.log("Reflect.set server.port:", Reflect.set(config.server, "port", 8080));
console.log("server.port после попытки:", config.server.port);

// Ошибки компиляции: все уровни доступны только для чтения

// config.appName = "other";
// TS2540: Cannot assign to 'appName' because it is a read-only property.

// config.server.tls.enabled = true;
// TS2540: Cannot assign to 'enabled' because it is a read-only property.

// config.users.push({ id: "u3", name: "Олег", roles: [] });
// TS2339: Property 'push' does not exist on type 'readonly { readonly id: string; readonly name: string; readonly roles: readonly string[]; }[]'.

// config.users[0].roles[0] = "guest";
// TS2542: Index signature in type 'readonly string[]' only permits reading.
