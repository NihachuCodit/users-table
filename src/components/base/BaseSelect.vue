<script setup lang="ts" generic="TValue extends string = string">
import { useId } from 'vue'

export interface SelectOption<T extends string = string> {
  value: T
  label: string
}

interface Props {
  modelValue: TValue | null
  label: string
  options: SelectOption<TValue>[]
  placeholder?: string
  required?: boolean
  error?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select an option',
  required: false,
  error: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: TValue | null]
}>()

const id = useId()

function handleChange(event: Event): void {
  const value = (event.target as HTMLSelectElement).value
  // Cast is unavoidable: HTMLSelectElement.value is always string,
  // but values are controlled by the options prop, guaranteeing TValue.
  emit('update:modelValue', (value || null) as TValue | null)
}
</script>

<template>
  <div class="base-select">
    <label :for="id" class="base-select__label">
      {{ props.label }}
      <span v-if="props.required" class="base-select__required" aria-hidden="true">*</span>
    </label>
    <select
      :id="id"
      :value="props.modelValue ?? ''"
      :required="props.required"
      :aria-invalid="!!props.error || undefined"
      class="base-select__field"
      :class="{ 'base-select__field--error': props.error }"
      @change="handleChange"
    >
      <option value="">{{ props.placeholder }}</option>
      <template v-for="option in props.options" :key="option.value">
        <option :value="option.value">{{ option.label }}</option>
      </template>
    </select>
    <p v-if="props.error" class="base-select__error" role="alert">{{ props.error }}</p>
  </div>
</template>

<style scoped>
.base-select {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}

.base-select__label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-primary);
}

.base-select__required {
  color: var(--color-danger);
  margin-left: 2px;
}

.base-select__field {
  padding: var(--spacing-2) var(--spacing-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  background-color: var(--color-surface);
  outline: none;
  cursor: pointer;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--spacing-3) center;
  background-size: 16px;
  padding-right: calc(var(--spacing-3) * 2 + 16px);
}

.base-select__field:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-ring);
}

.base-select__field--error {
  border-color: var(--color-danger);
}

.base-select__error {
  font-size: var(--text-xs);
  color: var(--color-danger);
  margin: 0;
}
</style>
