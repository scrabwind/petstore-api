<script setup lang="ts">
import type { Pet } from '@/api'
import TableRow from './TableRow/TableRow.vue'

type Props = {
  data: Pet[]
}

defineProps<Props>()
</script>

<template>
  <table class="table">
    <TableRow
      :is-table-header="true"
      :data="['id', 'category', 'name', 'photoUrl', 'tags', 'status']"
    />
    <TableRow :key="i" v-for="(value, i) in data" :data="value" />
  </table>
</template>

<style scoped lang="scss">
.table {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
