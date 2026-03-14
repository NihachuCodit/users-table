import { describe, it, expect, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '../stores/useUserStore'

describe('useUserStore', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('starts with an empty list', () => {
    const store = useUserStore()
    expect(store.users).toHaveLength(0)
  })

  it('adds a user with a generated id', () => {
    const store = useUserStore()
    store.addUser({ name: 'Alice', phone: '+1 234 567 8900', role: 'developer' })
    expect(store.users).toHaveLength(1)
    expect(store.users[0]?.name).toBe('Alice')
    expect(store.users[0]?.id).toBeTruthy()
  })

  it('deletes a user by id', () => {
    const store = useUserStore()
    store.addUser({ name: 'Alice', phone: '+1 234 567 8900', role: null })
    const id = store.users[0]?.id ?? ''
    store.deleteUser(id)
    expect(store.users).toHaveLength(0)
  })

  it('only deletes the targeted user', () => {
    const store = useUserStore()
    store.addUser({ name: 'Alice', phone: '+1 000 000 0001', role: null })
    store.addUser({ name: 'Bob', phone: '+1 000 000 0002', role: null })
    const aliceId = store.users[0]?.id ?? ''
    store.deleteUser(aliceId)
    expect(store.users).toHaveLength(1)
    expect(store.users[0]?.name).toBe('Bob')
  })

  it('persists users to localStorage on add', async () => {
    const store = useUserStore()
    store.addUser({ name: 'Alice', phone: '+1 234 567 8900', role: 'manager' })
    await nextTick()
    const stored = JSON.parse(localStorage.getItem('users') ?? '[]') as unknown[]
    expect(stored).toHaveLength(1)
  })

  it('restores users from localStorage on init', () => {
    const existing = [{ id: '1', name: 'Bob', phone: '+1 234 567 8900', role: null }]
    localStorage.setItem('users', JSON.stringify(existing))
    setActivePinia(createPinia())
    const store = useUserStore()
    expect(store.users).toHaveLength(1)
    expect(store.users[0]?.name).toBe('Bob')
  })
})
