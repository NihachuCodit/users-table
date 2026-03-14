<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'

const error = ref<Error | null>(null)

onErrorCaptured((err: Error) => {
  error.value = err
  return false // stop propagation — this boundary handles it
})

function handleRetry(): void {
  error.value = null
}
</script>

<template>
  <slot v-if="!error" />
  <div v-else class="error-boundary" role="alert">
    <div class="error-boundary__content">
      <h2 class="error-boundary__title">Something went wrong</h2>
      <p class="error-boundary__message">{{ error.message }}</p>
      <button class="error-boundary__retry" @click="handleRetry">Try again</button>
    </div>
  </div>
</template>

<style scoped>
.error-boundary {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: var(--spacing-8) var(--spacing-4);
}

.error-boundary__content {
  text-align: center;
  max-width: 400px;
}

.error-boundary__title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-2);
}

.error-boundary__message {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-4);
}

.error-boundary__retry {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  border: none;
  border-radius: var(--radius-md);
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--text-sm);
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.error-boundary__retry:hover {
  background-color: var(--color-primary-hover);
}
</style>
