<script setup lang="ts">
import { computed } from 'vue'

import { usePetStore } from '@/store/pet'
import TableData from './TableData/TableData.vue'

const store = usePetStore()

const pets = computed(() => store.getters.getAllPets)
const petsLabels = computed(() => store.getters.getPetsLabels)
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th :key="label" v-for="label in petsLabels">{{ label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr :key="key" class="table-row" v-for="(value, key) in pets">
        <TableData :data="value" />
      </tr>
    </tbody>
  </table>
</template>

<style scoped lang="scss">
.table {
  width: 100%;
  display: flex;
  flex-direction: column;

  &-headers {
    @media (width <= $breakpoint-l) {
      display: none;
    }
  }

  &-row {
    display: grid;
    grid-template-columns: repeat(6, 1fr) 1.5rem;
    padding: 0.5rem;
    gap: 0.5rem;

    @media (width <= $breakpoint-l) {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(4, 1fr);
      gap: 1rem;
    }

    &:nth-child(even) {
      background-color: var(--table-secondary);
    }
  }
}
</style>
