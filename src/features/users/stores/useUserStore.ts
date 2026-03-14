import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { User } from '@/types'
import type { CreateUserDto } from '../types'

const STORAGE_KEY = 'users'

const VALID_ROLES = new Set(['administrator', 'manager', 'developer'])

function isUser(value: unknown): value is User {
  if (typeof value !== 'object' || value === null) return false
  const u = value as Record<string, unknown>
  return (
    typeof u['id'] === 'string' &&
    typeof u['name'] === 'string' &&
    typeof u['phone'] === 'string' &&
    (u['role'] === null || VALID_ROLES.has(u['role'] as string))
  )
}

function loadFromStorage(): User[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter(isUser) : []
  } catch {
    return []
  }
}

function generateId(): string {
  if (typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  // Fallback using crypto.getRandomValues — available in all modern browsers
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  bytes[6] = ((bytes[6] ?? 0) & 0x0f) | 0x40 // version 4
  bytes[8] = ((bytes[8] ?? 0) & 0x3f) | 0x80 // variant RFC 4122
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

export const useUserStore = defineStore('users', () => {
  const users = ref<User[]>(loadFromStorage())

  watch(
    users,
    (value) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    },
    { deep: true },
  )

  function addUser(dto: CreateUserDto): void {
    const user: User = {
      id: generateId(),
      name: dto.name,
      phone: dto.phone,
      role: dto.role,
    }
    users.value.push(user)
  }

  function deleteUser(id: string): void {
    users.value = users.value.filter((u) => u.id !== id)
  }

  return { users, addUser, deleteUser }
})
