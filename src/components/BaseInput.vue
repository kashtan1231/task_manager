<template>
  <div class="base-input">
    <label :class="['base-input__label', { 'move-label': isInputFocused || value }]">{{
      label
    }}</label>
    <div class="base-input__wrapper">
      <input
        v-if="!isTextArea"
        class="base-input__field-input"
        @input="onInput"
        @focus="focusInput"
        @blur="unfocusInput"
        :value="value"
      />

      <textarea
        v-else
        class="base-input__field-input text-area"
        @input="onInput"
        @focus="focusInput"
        @blur="unfocusInput"
        :value="value"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class BaseInput extends Vue {
  @Prop({ default: '' }) value!: string
  @Prop({ default: '' }) label!: string
  @Prop({ default: false }) isTextArea!: boolean

  isInputFocused = false

  focusInput(): void {
    this.isInputFocused = true
  }
  unfocusInput(): void {
    this.isInputFocused = false
  }
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement
    const regex = /[^0-9a-zA-Z]/u

    target.value = target.value.replace(regex, '')

    this.$emit('input', target.value)
  }
}
</script>

<style lang="scss" scoped>
.base-input {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;

  &__label {
    @extend p;
    position: absolute;
    top: 14px;
    left: 16px;
    padding: 0 4px;
    border-radius: 30px;
    background-color: $white;
    color: $black;
    transition-duration: 0.2s;
    user-select: none;
    pointer-events: none;
  }

  &__wrapper {
    display: flex;
    box-shadow: inset 0 0 0 1px $black;
    border-radius: 8px;
  }

  &__field-input {
    @extend p;
    padding: 14px 16px;
    min-width: 100%;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type='number'] {
      -moz-appearance: textfield;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
      -webkit-text-fill-color: $black;
      transition: background-color 5000s ease-in-out 0s;
    }

    &::-webkit-calendar-picker-indicator {
      opacity: 0;
    }
  }

  .text-area {
    min-height: 128px;
  }

  .move-label {
    top: -7px;
    left: 12px;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
  }
}
</style>
