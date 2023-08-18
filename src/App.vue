<template>
  <div id="app">
    <TheHeader />
    <div class="page">
      <div class="add-task" @click="openModal">
        <img src="@/assets/add-icon.svg" class="add-task__icon" alt="add-icon" />
      </div>
    </div>

    <Modal v-if="isModaOpened" @closeModal="closeModal" />
  </div>
</template>

<script lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import Modal from './components/Modal.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    TheHeader,
    Modal
  }
})
export default class App extends Vue {
  isModaOpened = false

  openModal() {
    this.isModaOpened = true
  }
  closeModal() {
    this.isModaOpened = false
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
}
</style>
