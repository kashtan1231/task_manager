<template>
  <div class="the-header">
    <h1>Task Manager</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TheHeader extends Vue {}
</script>

<style lang="scss">
.the-header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 16px 40px;
  background-color: $blue;
  box-shadow: 0px 0px 6px $black;
}
</style>
