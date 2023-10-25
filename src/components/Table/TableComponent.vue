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
    <TableRow :is-table-header="true" :data="petsLabels" />
    <TableRow :key="i" v-for="(value, i) in pets.slice(0, 20)" :data="value" />
  </table>
</template>

<style scoped lang="scss">
.table {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
@/store/pet
