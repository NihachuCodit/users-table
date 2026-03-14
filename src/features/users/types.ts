import type { User, UserRole } from '@/types'

export type { User, UserRole }

export interface CreateUserDto {
  name: string
  phone: string
  role: UserRole | null
}
