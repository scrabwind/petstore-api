<script setup lang="ts">
import TableComponent from './components/Table/TableComponent.vue'
import StatusToast from '@/components/Status/StatusToast.vue'
import HeaderComponent from '@/components/Header/HeaderComponent.vue'
</script>

<template>
  <div class="container">
    <HeaderComponent />
    <main class="main">
      <TableComponent />
    </main>
    <StatusToast />
  </div>
</template>

<style scoped lang="scss">
.container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem;

  @media (width <= 450px) {
    padding: 2rem 1rem;
  }
}

.main {
  width: 100%;
  padding-top: 2rem;
  text-align: left;
}
</style>
