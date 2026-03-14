<script setup lang="ts">
import { useId } from 'vue'

interface Props {
  modelValue: string
  label: string
  placeholder?: string
  error?: string
  type?: string
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  error: '',
  type: 'text',
  required: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const id = useId()
</script>

<template>
  <div class="base-input">
    <label :for="id" class="base-input__label">
      {{ props.label }}
      <span v-if="props.required" class="base-input__required" aria-hidden="true">*</span>
    </label>
    <input
      :id="id"
      :type="props.type"
      :value="props.modelValue"
      :placeholder="props.placeholder"
      :required="props.required"
      :aria-invalid="!!props.error || undefined"
      :aria-describedby="props.error ? `${id}-error` : undefined"
      class="base-input__field"
      :class="{ 'base-input__field--error': props.error }"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <p
      v-if="props.error"
      :id="`${id}-error`"
      class="base-input__error"
      role="alert"
    >
      {{ props.error }}
    </p>
  </div>
</template>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}

.base-input__label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-primary);
}

.base-input__required {
  color: var(--color-danger);
  margin-left: 2px;
}

.base-input__field {
  padding: var(--spacing-2) var(--spacing-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  background-color: var(--color-surface);
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.base-input__field:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-ring);
}

.base-input__field--error {
  border-color: var(--color-danger);
}

.base-input__field--error:focus {
  box-shadow: 0 0 0 3px var(--color-danger-ring);
}

.base-input__error {
  font-size: var(--text-xs);
  color: var(--color-danger);
  margin: 0;
}
</style>
