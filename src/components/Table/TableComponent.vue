<script setup lang="ts">
import { computed } from 'vue'
import TableRow from './TableRow/TableRow.vue'

import { usePetStore } from '@/store/pet'

const store = usePetStore()

const pets = computed(() => store.getters.getPets)
const petsLabels = computed(() => store.getters.getPetsLabels)
</script>

<template>
  <table class="table">
    <TableRow class="table-headers" :data="petsLabels" />
    <TableRow :key="i" v-for="(value, i) in pets" :data="value" />
  </table>
</template>

<style scoped lang="scss">
.table {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.table-headers {
  @media (width <= 760px) {
    display: none;
  }
}
</style>
