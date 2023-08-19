<template>
  <button class="base-button" :disabled="isDisabled">
    {{ text }}
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class BaseButton extends Vue {
  @Prop({ default: false }) isDisabled!: boolean
  @Prop({ default: '' }) text!: string
}
</script>

<style lang="scss">
.base-button {
  @extend p;
  min-width: 64px;
  padding: 8px;
  border-radius: 8px;
  background-color: $blue;
  box-shadow: inset 0 0 0 2px $blue;
  color: $black;
  transition-duration: 0.2s;

  &:hover {
    background-color: $white;
  }

  &:disabled {
    background-color: $blue-light;
    box-shadow: none;
    cursor: default;
  }
}
</style>
