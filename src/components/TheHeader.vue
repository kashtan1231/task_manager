<template>
  <div class="the-header">
    <h1 class="the-header__title">Task Manager</h1>
    <button class="the-header__undo" @click="undoAction" :disabled="isUndoDisabled">
      <img src="@/assets/undo-icon.svg" class="the-header__undo-icon" alt="undo-icon" />
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TheHeader extends Vue {
  get isUndoDisabled(): boolean {
    return (
      JSON.stringify(this.$store.state.task.tasksList) ==
      JSON.stringify(this.$store.state.task.prevTasksList)
    )
  }

  undoAction(): void {
    this.$store.commit('task/undoAction')
  }
}
</script>

<style lang="scss">
.the-header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 16px 40px;
  background-color: $blue;
  box-shadow: 0px 0px 6px $black;

  &__undo {
    position: absolute;
    right: 40px;
    top: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    background-color: $green;
    box-shadow: inset 0 0 0 2px $green;

    height: 40px;
    width: 40px;
    border-radius: 8px;
    transition-duration: 0.2s;

    &:hover {
      background-color: $white;

      .the-header__undo-icon {
        rotate: -360deg;
      }
    }

    &:disabled {
      background-color: $blue-light;
      box-shadow: none;
      cursor: default;

      &:hover {
        .the-header__undo-icon {
          rotate: 0deg;
        }
      }
    }

    &-icon {
      width: 20px;
      height: 20px;
      transition-duration: 0.5s;
    }
  }
}

@media screen and (max-width: 763px) {
  .the-header {
    padding-left: 16px;
    padding-right: 16px;

    &__undo {
      right: 16px;
    }
  }
}
</style>
