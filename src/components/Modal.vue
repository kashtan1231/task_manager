<template>
  <div class="modal" @click.self="closeModal">
    <div class="modal__wrapper">
      <h3 class="modal__title">New task</h3>

      <BaseInput v-model="name" class="modal__input" label="Name*" />

      <div class="todo-list">
        <transition-group name="bounce" tag="div">
          <TodoItem
            v-for="item of notesList"
            @save="saveNote"
            @delete="deleteNote"
            @mark="markNote"
            :key="item.id"
            :text="item.text"
            :isMarked="item.isMarked"
            :id="item.id"
            class="todo-list__item"
          />
        </transition-group>
      </div>

      <BaseInput
        v-model="description"
        class="modal__input"
        :isTextArea="true"
        label="Description"
      />

      <div class="modal__buttons" v-if="!isDeleteStage">
        <BaseButton @click.native="addNote" text="Add note" />
        <BaseButton class="modal__buttons-delete" @click.native="tryToDelete" text="Delete" />
        <BaseButton @click.native="saveTask" :isDisabled="isSaveButtonDisabled" text="Save" />
      </div>

      <div class="modal__buttons" v-else>
        <p class="modal__buttons-text">Are you sure you want to delete the task?</p>
        <BaseButton @click.native="noDelete" text="No" />
        <BaseButton class="modal__buttons-delete" @click.native="deleteTask" text="Yes" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import BaseButton from './BaseButton.vue'
import BaseInput from './BaseInput.vue'
import TodoItem from './TodoItem.vue'
import { INote } from '@/models'

@Component({
  components: { BaseButton, BaseInput, TodoItem }
})
export default class Modal extends Vue {
  @Prop({ default: {} }) task!: any

  isDeleteStage = false
  name = ''
  description = ''
  notesList: INote[] = []

  get isExistedTask(): boolean {
    return this.task.id >= 0
  }
  get isSaveButtonDisabled(): boolean {
    return this.name === ''
  }

  closeModal(): void {
    this.$emit('closeModal')
  }
  addNote(): void {
    this.notesList.push({ text: '', isMarked: false, id: this.notesList.length })
  }
  saveNote(payload: any): void {
    this.notesList[payload.id].text = payload.localText
  }
  markNote(id: number): void {
    this.notesList[id].isMarked = !this.notesList[id].isMarked
  }
  deleteNote(id: number): void {
    this.notesList.splice(id, 1)
  }
  saveTask(): void {
    if (this.isExistedTask) {
      this.$store.commit('task/editTask', {
        name: this.name,
        description: this.description,
        notesList: this.notesList,
        id: this.task.id
      })
    } else {
      this.$store.commit('task/addTask', {
        name: this.name,
        description: this.description,
        notesList: this.notesList
      })
    }

    this.closeModal()
  }
  tryToDelete(): void {
    this.isDeleteStage = true
  }
  noDelete(): void {
    this.isDeleteStage = false
  }
  deleteTask(): void {
    if (this.isExistedTask) this.$store.commit('task/deleteTask', this.task.id)
    this.closeModal()
  }

  created(): void {
    if (this.isExistedTask) {
      this.name = this.task.name
      this.description = this.task.description
      this.notesList = [...this.task.notesList]
    }
  }
}
</script>

<style lang="scss">
.modal {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
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
    box-shadow: 0 0 17px 0px rgba($black, 0.5);
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

  .todo-list {
    max-height: 275px;
    overflow: auto;
    margin-bottom: 16px;

    > :not(:last-child) {
      margin-bottom: 8px;
    }
  }

  &__buttons {
    display: flex;
    align-items: center;

    > :not(:last-child) {
      margin-right: 8px;
    }

    &-delete {
      margin-left: auto;
    }

    &-text {
      width: 100%;
    }
  }
}

.bounce-enter-active {
  animation: bounce-in 0.2s;
  background-color: $blue;
}
.bounce-leave-active {
  animation: bounce-in 0.2s reverse;
  background-color: transparent;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
