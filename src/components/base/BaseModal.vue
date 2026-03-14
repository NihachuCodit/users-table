<script setup lang="ts">
import { ref, watch, nextTick, onUnmounted } from 'vue'

interface Props {
  title: string
  isOpen: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const containerRef = ref<HTMLDivElement | null>(null)

function getFocusableElements(): HTMLElement[] {
  if (!containerRef.value) return []
  return Array.from(
    containerRef.value.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ),
  )
}

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    emit('close')
    return
  }

  if (event.key !== 'Tab') return

  const elements = getFocusableElements()
  if (!elements.length) return

  const first = elements.at(0)
  const last = elements.at(-1)

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last?.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first?.focus()
  }
}

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeydown)
      nextTick(() => {
        getFocusableElements().at(0)?.focus()
      })
    } else {
      document.removeEventListener('keydown', handleKeydown)
    }
  },
)

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="props.isOpen"
        class="base-modal__overlay"
        role="dialog"
        aria-modal="true"
        :aria-label="props.title"
        @click.self="emit('close')"
      >
        <div ref="containerRef" class="base-modal__container">
          <header class="base-modal__header">
            <h2 class="base-modal__title">{{ props.title }}</h2>
            <button class="base-modal__close" aria-label="Close modal" @click="emit('close')">
              &#x2715;
            </button>
          </header>
          <div class="base-modal__body">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.base-modal__overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: var(--spacing-4);
}

.base-modal__container {
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
}

.base-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-4) var(--spacing-5);
  border-bottom: 1px solid var(--color-border);
}

.base-modal__title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
}

.base-modal__close {
  background: none;
  border: none;
  font-size: var(--text-lg);
  color: var(--color-text-muted);
  cursor: pointer;
  padding: var(--spacing-1);
  border-radius: var(--radius-md);
  transition: color 0.15s ease, background-color 0.15s ease;
  line-height: 1;
}

.base-modal__close:hover {
  color: var(--color-text-primary);
  background-color: var(--color-surface-alt);
}

.base-modal__body {
  padding: var(--spacing-5);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@media (max-width: 475px) {
  .base-modal__overlay {
    padding: 0;
    align-items: flex-end;
  }

  .base-modal__container {
    max-width: 100%;
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    max-height: 95vh;
  }
}
</style>
