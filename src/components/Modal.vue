<template>
  <div class="modal" @click.self="closeModal">
    <div class="modal__wrapper">
      <h3 class="modal__title">New task</h3>

      <BaseInput v-model="name" class="modal__input" label="Name" />
      <BaseInput v-model="text" class="modal__input" :isTextArea="true" label="Text" />

      <div class="modal__buttons" v-if="!isDeleteStage">
        <BaseButton @click.native="tryToDelete" text="Delete" />
        <BaseButton text="Save" />
      </div>

      <div class="modal__buttons" v-else>
        <p class="modal__buttons-text">Are you sure you want to delete the task?</p>
        <BaseButton @click.native="deleteTask" text="Yes" />
        <BaseButton text="No" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BaseButton from './BaseButton.vue'
import BaseInput from './BaseInput.vue'

@Component({
  components: { BaseButton, BaseInput }
})
export default class Modal extends Vue {
  name = ''
  text = ''
  isDeleteStage = false

  closeModal(): void {
    this.$emit('closeModal')
  }
  tryToDelete(): void {
    this.isDeleteStage = true
  }
  deleteTask(): void {
    this.closeModal()
  }
}
</script>

<style lang="scss">
.modal {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba($blue-dark, 0.5);

  &__wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 520px;
    padding: 16px;
    background-color: $white;
    border-radius: 8px;
    transform: translate(-50%, -50%);
  }

  &__title {
    text-align: center;
    margin-bottom: 16px;
  }

  &__input {
    margin-bottom: 16px;
  }

  &__buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    > :not(:last-child) {
      margin-right: 8px;
    }

    &-text {
      width: 100%;
    }
  }
}
</style>
