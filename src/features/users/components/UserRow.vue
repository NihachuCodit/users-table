<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
import type { User, UserRole } from '@/types'

interface Props {
  user: User
}

const props = defineProps<Props>()

const emit = defineEmits<{
  delete: [id: string]
}>()

const ROLE_LABELS: Record<UserRole, string> = {
  administrator: 'Administrator',
  manager: 'Manager',
  developer: 'Developer',
}
</script>

<template>
  <tr class="user-row">
    <td class="user-row__cell">{{ props.user.name }}</td>
    <td class="user-row__cell">{{ props.user.phone }}</td>
    <td class="user-row__cell">
      <span
        v-if="props.user.role"
        :class="['user-row__role-badge', `user-row__role-badge--${props.user.role}`]"
      >
        {{ ROLE_LABELS[props.user.role] }}
      </span>
      <span v-else class="user-row__role-empty">—</span>
    </td>
    <td class="user-row__cell user-row__cell--actions">
      <BaseButton variant="danger" @click="emit('delete', props.user.id)">Delete</BaseButton>
    </td>
  </tr>
</template>

<style scoped>
.user-row {
  border-bottom: 1px solid var(--color-border);
  transition: background-color 0.1s ease;
}

.user-row:hover {
  background-color: var(--color-surface-alt);
}

.user-row__cell {
  padding: var(--spacing-3) var(--spacing-4);
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  vertical-align: middle;
}

.user-row__cell--actions {
  text-align: right;
}

.user-row__role-badge {
  display: inline-block;
  padding: 2px var(--spacing-2);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 600;
}

.user-row__role-badge--administrator {
  background-color: #fef3c7;
  color: #92400e;
}

.user-row__role-badge--manager {
  background-color: #dbeafe;
  color: #1e40af;
}

.user-row__role-badge--developer {
  background-color: #d1fae5;
  color: #065f46;
}

.user-row__role-empty {
  color: var(--color-text-muted);
}

@media (max-width: 475px) {
  .user-row__cell {
    padding: var(--spacing-2) var(--spacing-2);
    font-size: var(--text-xs);
  }
}
</style>
