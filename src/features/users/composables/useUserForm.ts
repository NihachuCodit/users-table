import { reactive } from 'vue'
import { parsePhoneNumberWithError, ParseError } from 'libphonenumber-js'
import type { CreateUserDto, UserRole } from '../types'

interface FormState {
  name: string
  phone: string
  role: UserRole | null
}

interface FormErrors {
  name: string
  phone: string
}

function isValidPhone(value: string): boolean {
  try {
    return parsePhoneNumberWithError(value).isValid()
  } catch (e) {
    if (e instanceof ParseError) return false
    throw e
  }
}

export function useUserForm(onSubmit: (dto: CreateUserDto) => void) {
  const form = reactive<FormState>({
    name: '',
    phone: '',
    role: null,
  })

  const errors = reactive<FormErrors>({
    name: '',
    phone: '',
  })

  function validate(): boolean {
    errors.name = ''
    errors.phone = ''

    if (!form.name.trim()) {
      errors.name = 'Name is required'
    }

    if (!form.phone.trim()) {
      errors.phone = 'Phone is required'
    } else if (!isValidPhone(form.phone.trim())) {
      errors.phone = 'Enter a valid international phone number (e.g. +1 234 567 8900)'
    }

    return !errors.name && !errors.phone
  }

  function submit(): void {
    if (!validate()) return

    onSubmit({
      name: form.name.trim(),
      phone: form.phone.trim(),
      role: form.role,
    })
  }

  function reset(): void {
    form.name = ''
    form.phone = ''
    form.role = null
    errors.name = ''
    errors.phone = ''
  }

  return { form, errors, submit, reset }
}
