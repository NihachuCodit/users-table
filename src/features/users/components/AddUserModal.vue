<script setup lang="ts">
import BaseModal from '@/components/base/BaseModal.vue'
import UserForm from './UserForm.vue'
import type { CreateUserDto } from '../types'

interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  submit: [dto: CreateUserDto]
}>()

function handleSubmit(dto: CreateUserDto): void {
  emit('submit', dto)
  emit('close')
}
</script>

<template>
  <BaseModal title="Add User" :is-open="props.isOpen" @close="emit('close')">
    <UserForm @submit="handleSubmit" @cancel="emit('close')" />
  </BaseModal>
</template>
