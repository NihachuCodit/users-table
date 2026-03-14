<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore, UserTable, AddUserModal } from '@/features/users'
import BaseButton from '@/components/base/BaseButton.vue'
import ErrorBoundary from '@/components/ErrorBoundary.vue'
import type { CreateUserDto } from '@/features/users'

const userStore = useUserStore()
const isModalOpen = ref(false)

function handleAddUser(dto: CreateUserDto): void {
  userStore.addUser(dto)
}
</script>

<template>
  <ErrorBoundary>
    <main class="users-page">
      <header class="users-page__header">
        <h1 class="users-page__title">Users</h1>
        <BaseButton variant="primary" @click="isModalOpen = true">+ Add User</BaseButton>
      </header>
      <UserTable :users="userStore.users" @delete-user="userStore.deleteUser" />
      <AddUserModal
        :is-open="isModalOpen"
        @close="isModalOpen = false"
        @submit="handleAddUser"
      />
    </main>
  </ErrorBoundary>
</template>

<style scoped>
.users-page {
  max-width: 900px;
  margin: 0 auto;
  padding: var(--spacing-8) var(--spacing-4);
}

.users-page__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-6);
}

.users-page__title {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
}

@media (max-width: 475px) {
  .users-page {
    padding: var(--spacing-4) var(--spacing-3);
  }

  .users-page__title {
    font-size: var(--text-lg);
  }
}
</style>
