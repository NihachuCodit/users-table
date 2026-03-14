<script setup lang="ts">
import BaseInput from '@/components/base/BaseInput.vue'
import BaseSelect from '@/components/base/BaseSelect.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { useUserForm } from '../composables/useUserForm'
import type { CreateUserDto, UserRole } from '../types'

const emit = defineEmits<{
  submit: [dto: CreateUserDto]
  cancel: []
}>()

const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: 'administrator', label: 'Administrator' },
  { value: 'manager', label: 'Manager' },
  { value: 'developer', label: 'Developer' },
]

const { form, errors, submit, reset } = useUserForm((dto) => {
  emit('submit', dto)
  reset()
})

function handleCancel(): void {
  reset()
  emit('cancel')
}
</script>

<template>
  <form class="user-form" novalidate @submit.prevent="submit">
    <div class="user-form__fields">
      <BaseInput
        v-model="form.name"
        label="Name"
        placeholder="Enter full name"
        :error="errors.name"
        required
      />
      <BaseInput
        v-model="form.phone"
        label="Phone"
        placeholder="+1 234 567 8900"
        :error="errors.phone"
        required
      />
      <BaseSelect
        v-model="form.role"
        label="Role"
        :options="ROLE_OPTIONS"
        placeholder="Select a role (optional)"
      />
    </div>
    <div class="user-form__actions">
      <BaseButton variant="secondary" type="button" @click="handleCancel">Cancel</BaseButton>
      <BaseButton variant="primary" type="submit">Add User</BaseButton>
    </div>
  </form>
</template>

<style scoped>
.user-form__fields {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-5);
}

.user-form__actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-3);
}
</style>
