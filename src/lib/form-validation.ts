export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ValidationErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationErrors
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validateRequired(value: string, fieldName: string): string | undefined {
  if (!value || value.trim().length === 0) {
    return `${fieldName}は必須項目です`
  }
  return undefined
}

export function validateMinLength(value: string, minLength: number, fieldName: string): string | undefined {
  if (value.trim().length < minLength) {
    return `${fieldName}は${minLength}文字以上で入力してください`
  }
  return undefined
}

export function validateMaxLength(value: string, maxLength: number, fieldName: string): string | undefined {
  if (value.trim().length > maxLength) {
    return `${fieldName}は${maxLength}文字以内で入力してください`
  }
  return undefined
}

export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: ValidationErrors = {}

  // 名前のバリデーション
  const nameRequired = validateRequired(data.name, '名前')
  if (nameRequired) {
    errors.name = nameRequired
  } else {
    const nameMaxLength = validateMaxLength(data.name, 50, '名前')
    if (nameMaxLength) {
      errors.name = nameMaxLength
    }
  }

  // メールアドレスのバリデーション
  const emailRequired = validateRequired(data.email, 'メールアドレス')
  if (emailRequired) {
    errors.email = emailRequired
  } else {
    if (!validateEmail(data.email)) {
      errors.email = '正しいメールアドレスを入力してください'
    } else {
      const emailMaxLength = validateMaxLength(data.email, 100, 'メールアドレス')
      if (emailMaxLength) {
        errors.email = emailMaxLength
      }
    }
  }

  // 件名のバリデーション
  const subjectRequired = validateRequired(data.subject, '件名')
  if (subjectRequired) {
    errors.subject = subjectRequired
  } else {
    const subjectMaxLength = validateMaxLength(data.subject, 100, '件名')
    if (subjectMaxLength) {
      errors.subject = subjectMaxLength
    }
  }

  // メッセージのバリデーション
  const messageRequired = validateRequired(data.message, 'メッセージ')
  if (messageRequired) {
    errors.message = messageRequired
  } else {
    const messageMinLength = validateMinLength(data.message, 10, 'メッセージ')
    if (messageMinLength) {
      errors.message = messageMinLength
    } else {
      const messageMaxLength = validateMaxLength(data.message, 1000, 'メッセージ')
      if (messageMaxLength) {
        errors.message = messageMaxLength
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '')
}

export function sanitizeContactForm(data: ContactFormData): ContactFormData {
  return {
    name: sanitizeInput(data.name),
    email: sanitizeInput(data.email),
    subject: sanitizeInput(data.subject),
    message: sanitizeInput(data.message)
  }
}