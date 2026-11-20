// Учебный аккаунт: пароль хранится открытым текстом в localStorage
export interface User {
  id: string
  email: string
  password: string
}

export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm extends LoginForm {
  confirmPassword: string
}

export type RegisterField = keyof RegisterForm

// Ошибки по полям формы, form означает ошибку всей формы
export type FormErrors<Field extends string> = Partial<Record<Field, string>>

export type AuthResult<Field extends string> =
  { ok: true } | { ok: false; errors: FormErrors<Field> }
