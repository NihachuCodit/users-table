<script setup lang="ts">
import UserRow from './UserRow.vue'
import type { User } from '@/types'

interface Props {
  users: User[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  deleteUser: [id: string]
}>()
</script>

<template>
  <div class="user-table">
    <table v-if="props.users.length > 0" class="user-table__table" aria-label="Users">
      <thead class="user-table__head">
        <tr>
          <th class="user-table__th" scope="col">Name</th>
          <th class="user-table__th" scope="col">Phone</th>
          <th class="user-table__th" scope="col">Role</th>
          <th class="user-table__th user-table__th--actions" scope="col">Actions</th>
        </tr>
      </thead>
      <TransitionGroup name="user-row" tag="tbody">
        <UserRow
          v-for="user in props.users"
          :key="user.id"
          :user="user"
          @delete="(id) => emit('deleteUser', id)"
        />
      </TransitionGroup>
    </table>
    <div v-else class="user-table__empty" role="status" aria-live="polite">
      <p class="user-table__empty-text">No users yet. Add one to get started.</p>
    </div>
  </div>
</template>

<style scoped>
.user-table {
  width: 100%;
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background-color: var(--color-surface);
}

.user-table__table {
  width: 100%;
  border-collapse: collapse;
}

.user-table__head {
  background-color: var(--color-surface-alt);
}

.user-table__th {
  padding: var(--spacing-3) var(--spacing-4);
  text-align: left;
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid var(--color-border);
}

.user-table__th--actions {
  text-align: right;
}

@media (max-width: 475px) {
  .user-table__th {
    padding: var(--spacing-2) var(--spacing-2);
  }
}

.user-table__empty {
  padding: var(--spacing-10) var(--spacing-4);
  text-align: center;
}

.user-table__empty-text {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  margin: 0;
}

/* :deep() is required — TransitionGroup applies these classes to <tr> elements
   that are owned by UserRow and carry its scoped attribute, not UserTable's. */
:deep(.user-row-leave-active) {
  transition: opacity 0.25s ease;
}

:deep(.user-row-leave-to) {
  opacity: 0;
}
</style>
