<script setup lang="ts">
import type { Pet } from '@/api/models/Pet'
import TableHead from '@/components/Table/TableHead/TableHead.vue'
import TableData from '@/components/Table/TableData/TableData.vue'

type Props = {
  labels?: string[]
  data?: Pet
}

defineProps<Props>()
</script>

<template>
  <tr class="row">
    <TableHead v-if="labels?.length" :data="labels" />
    <TableData v-else-if="data" :data="data" />
    <span v-else>Failed to retrive data</span>
  </tr>
</template>

<style lang="scss">
.row {
  $buy-button-size: 24px;

  display: grid;
  grid-template-columns: repeat(6, calc((100% - $buy-button-size) / 6)) $buy-button-size;
  padding: 8px;
}

.row:nth-child(even) {
  background-color: var(--secondary);
}
</style>
