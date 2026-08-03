export function digitsOnly(value: string, maxLength: number): string {
  return value.replace(/\D/g, '').slice(0, maxLength)
}

export function isPhone11(value: string): boolean {
  return /^\d{11}$/.test(value)
}
