import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UserTable from '../components/UserTable.vue'
import UserRow from '../components/UserRow.vue'
import type { User } from '@/types'

const ALICE: User = { id: '1', name: 'Alice', phone: '+1 234 567 8900', role: 'developer' }
const BOB: User = { id: '2', name: 'Bob', phone: '+1 987 654 3210', role: null }

describe('UserTable', () => {
  it('shows the empty state when there are no users', () => {
    const wrapper = mount(UserTable, { props: { users: [] } })
    expect(wrapper.text()).toContain('No users yet')
    expect(wrapper.find('table').exists()).toBe(false)
  })

  it('renders a row for each user', () => {
    const wrapper = mount(UserTable, { props: { users: [ALICE, BOB] } })
    expect(wrapper.findAllComponents(UserRow)).toHaveLength(2)
  })

  it('displays user name, phone, and role', () => {
    const wrapper = mount(UserTable, { props: { users: [ALICE] } })
    expect(wrapper.text()).toContain('Alice')
    expect(wrapper.text()).toContain('+1 234 567 8900')
    expect(wrapper.text()).toContain('Developer')
  })

  it('shows a dash for users without a role', () => {
    const wrapper = mount(UserTable, { props: { users: [BOB] } })
    expect(wrapper.text()).toContain('—')
  })

  it('emits deleteUser with the correct id when Delete is clicked', async () => {
    const wrapper = mount(UserTable, { props: { users: [ALICE] } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('deleteUser')?.[0]).toEqual(['1'])
  })
})
