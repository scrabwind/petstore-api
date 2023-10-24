<script setup lang="ts"></script>

<template>
  <Teleport to="#app">
    <div class="modal">MODAL</div>
  </Teleport>
</template>

<style lang="scss">
.modal {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgb(255 255 255 / 50%);
}
</style>
