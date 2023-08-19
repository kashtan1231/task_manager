<template>
  <div id="app">
    <TheHeader />
    <div class="page">
      <div v-for="task in tasksList" class="task" :key="task.name">
        <h3 class="task__name">{{ task.name }}</h3>

        <div class="task__notes">
          <div v-for="note in task.notesList" class="note" :key="note.id">
            <img
              :src="require(`@/assets/${note.isMarked ? '' : 'un'}checked-icon.svg`)"
              class="note__icon"
              alt="check-icon"
            />
            <p class="note__text">{{ note.text }}</p>
          </div>
        </div>

        <p class="task__description">{{ task.description }}</p>
      </div>

      <div class="add-task" @click="openModal">
        <img src="@/assets/add-icon.svg" class="add-task__icon" alt="add-icon" />
      </div>
    </div>

    <Modal v-if="isModalOpened" @closeModal="closeModal" />
  </div>
</template>

<script lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import Modal from './components/Modal.vue'
import { Component, Vue } from 'vue-property-decorator'
import { ITask } from './models'

@Component({
  components: {
    TheHeader,
    Modal
  }
})
export default class App extends Vue {
  isModalOpened = false

  get tasksList(): ITask[] {
    return this.$store.state.task.tasksList
  }

  openModal() {
    this.isModalOpened = true
  }
  closeModal() {
    this.isModalOpened = false
  }
}
</script>

<style lang="scss">
#app {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  font-family: $font-family-default;
  font-style: normal;
  font-weight: 400;
  color: $black;
}

.page {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(248px, 1fr));
  gap: 32px;
  min-height: 100vh;
  width: 100%;
  padding: calc($header-height + 60px) 40px 60px;
  background-color: $blue-light;

  .add-task {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 0 4px $black;
    height: 248px;
    background-color: $white;
    transition-duration: 0.2s;
    cursor: pointer;

    &:hover {
      transform: translateY(-10px);
      box-shadow: inset 0 0 0 1px $black, 0 0 4px $black;
    }

    &__icon {
      height: 100px;
      width: 100px;
      user-select: none;
    }
  }

  .task {
    display: flex;
    flex-direction: column;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 0 4px $black;
    height: 496px;
    background-color: $white;
    transition-duration: 0.2s;
    cursor: pointer;

    &:hover {
      transform: translateY(-10px);
      box-shadow: inset 0 0 0 1px $black, 0 0 4px $black;
    }

    &__name {
      text-align: center;
      margin-bottom: 32px;
    }

    &__notes {
      margin-bottom: 16px;

      > :not(:last-child) {
        margin-bottom: 8px;
      }

      .note {
        display: flex;

        &__icon {
          width: 24px;
          height: 24px;
          margin-right: 8px;
        }
      }
    }
  }
}
</style>
