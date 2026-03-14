export type UserRole = 'administrator' | 'manager' | 'developer'

export interface User {
  id: string
  name: string
  phone: string
  role: UserRole | null
}
