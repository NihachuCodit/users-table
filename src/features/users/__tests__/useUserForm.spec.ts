import { describe, it, expect, vi } from 'vitest'
import { useUserForm } from '../composables/useUserForm'

describe('useUserForm', () => {
  describe('validation', () => {
    it('requires name', () => {
      const { form, errors, submit } = useUserForm(vi.fn())
      form.phone = '+1 234 567 8900'
      submit()
      expect(errors.name).toBe('Name is required')
    })

    it('requires phone', () => {
      const { form, errors, submit } = useUserForm(vi.fn())
      form.name = 'Alice'
      submit()
      expect(errors.phone).toBe('Phone is required')
    })

    it('rejects phone with invalid characters', () => {
      const { form, errors, submit } = useUserForm(vi.fn())
      form.name = 'Alice'
      form.phone = 'abc-def'
      submit()
      expect(errors.phone).not.toBe('')
    })

    it('rejects phone with too few digits', () => {
      const { form, errors, submit } = useUserForm(vi.fn())
      form.name = 'Alice'
      form.phone = '123'
      submit()
      expect(errors.phone).not.toBe('')
    })

    it('rejects phone with too many digits', () => {
      const { form, errors, submit } = useUserForm(vi.fn())
      form.name = 'Alice'
      form.phone = '+1 234 567 890 123 456'
      submit()
      expect(errors.phone).not.toBe('')
    })

    it('accepts a valid international phone', () => {
      const onSubmit = vi.fn()
      const { form, errors, submit } = useUserForm(onSubmit)
      form.name = 'Alice'
      form.phone = '+1 234 567 8900'
      submit()
      expect(errors.phone).toBe('')
      expect(onSubmit).toHaveBeenCalledOnce()
    })
  })

  describe('submit', () => {
    it('calls onSubmit with trimmed values', () => {
      const onSubmit = vi.fn()
      const { form, submit } = useUserForm(onSubmit)
      form.name = '  Alice  '
      form.phone = ' +1 234 567 8900 '
      submit()
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'Alice',
        phone: '+1 234 567 8900',
        role: null,
      })
    })

    it('does not call onSubmit when validation fails', () => {
      const onSubmit = vi.fn()
      const { submit } = useUserForm(onSubmit)
      submit()
      expect(onSubmit).not.toHaveBeenCalled()
    })

    it('resets form state when caller invokes reset after submit', () => {
      // The composable does not auto-reset — the caller is responsible (see UserForm.vue)
      const { form, submit, reset } = useUserForm(vi.fn())
      form.name = 'Alice'
      form.phone = '+1 234 567 8900'
      submit()
      reset()
      expect(form.name).toBe('')
      expect(form.phone).toBe('')
      expect(form.role).toBeNull()
    })
  })

  describe('reset', () => {
    it('clears form fields and errors', () => {
      const { form, errors, submit, reset } = useUserForm(vi.fn())
      form.name = 'Alice'
      submit() // triggers errors.phone
      reset()
      expect(form.name).toBe('')
      expect(errors.phone).toBe('')
    })
  })
})
