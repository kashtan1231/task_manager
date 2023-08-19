<template>
  <div id="app">
    <TheHeader />
    <div class="page">
      <div v-for="task in tasksList" class="task" @click="openModal(task.id)" :key="task.name">
        <h3 class="task__name">{{ task.name }}</h3>

        <div v-if="task.notesList.length > 0" class="task__notes">
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

      <div class="add-task" @click="openModal()">
        <img src="@/assets/add-icon.svg" class="add-task__icon" alt="add-icon" />
      </div>
    </div>

    <Modal v-if="isModalOpened" @closeModal="closeModal" :task="neededTask" />
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
  public unSubscribe!: () => void

  isModalOpened = false
  neededTask = {}

  get tasksList(): ITask[] {
    return this.$store.state.task.tasksList
  }

  openModal(id = -1) {
    if (id >= 0) {
      this.neededTask = this.$store.state.task.tasksList[id]
    }
    document.documentElement.classList.add('no-scroll')
    this.isModalOpened = true
  }
  closeModal() {
    this.neededTask = {}
    document.documentElement.classList.remove('no-scroll')
    this.isModalOpened = false
  }
  synchronizeStateAndStore(): void {
    this.unSubscribe = this.$store.subscribe((mutation, state: any) => {
      localStorage.setItem('store', JSON.stringify({ ...state }))
    })
  }

  created() {
    this.$store.commit('initialiseStore')
  }
  mounted(): void {
    this.synchronizeStateAndStore()
  }
  destroyed(): void {
    if (this.unSubscribe) {
      this.unSubscribe()
    }
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
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
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

.no-scroll {
  overflow: hidden;
}

@media screen and (max-width: 763px) {
  .page {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>
