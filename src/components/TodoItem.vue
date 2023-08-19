<template>
  <div class="todo-item" @mouseenter="isDeleteShown = true" @mouseleave="isDeleteShown = false">
    <img
      :src="require(`@/assets/${isMarked ? '' : 'un'}checked-icon.svg`)"
      class="todo-item__check"
      @click="mark"
      alt="unchecked-icon"
    />
    <input class="todo-item__input" v-model="localText" @blur="saveNote" type="text" />

    <img
      src="@/assets/delete-icon.svg"
      :class="['todo-item__delete', { active: isDeleteShown }]"
      @click="deleteNote"
      alt="delete-icon"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TodoItem extends Vue {
  @Prop({ default: false }) isMarked!: boolean
  @Prop({ default: '' }) text!: string
  @Prop({ default: null }) id!: number

  isDeleteShown = false
  localText = ''

  mark() {
    this.$emit('mark', this.id)
  }
  saveNote() {
    this.$emit('save', { localText: this.localText, id: this.id })
  }
  deleteNote() {
    this.$emit('delete', this.id)
  }

  created(): void {
    this.localText = this.text
  }
}
</script>

<style lang="scss" scoped>
.todo-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  transition-duration: 0.2s;

  &:hover {
    background-color: $blue-light;
  }

  &__check {
    margin-right: 8px;
    width: 32px;
    height: 32px;
    cursor: pointer;
  }

  &__input {
    @extend p;
    width: 100%;
    padding: 0 8px;

    &:focus {
      box-shadow: inset 0 -1px $black;
    }
  }

  &__delete {
    width: 20px;
    height: 20px;
    margin-left: 8px;
    opacity: 0;
    cursor: pointer;
    transition-duration: 0.2s;
  }

  .active {
    opacity: 1;
  }
}
</style>
