<script setup lang="ts">
import { computed } from 'vue'
import type { Pet } from '@/api/models/Pet'
import TableHead from '@/components/Table/TableHead/TableHead.vue'
import TableData from '@/components/Table/TableData/TableData.vue'

type Props = {
  isTableHeader?: boolean
  data: Pet | string[]
}

withDefaults(defineProps<Props>(), { isTableHeader: false })
</script>

<template>
  <tr class="row">
    <TableHead v-if="isTableHeader" :data="data as string[]" />
    <TableData v-else :data="data as Pet" />
  </tr>
</template>

<style lang="scss">
.nazwy {
  border-bottom: 1px white solid;
  border-radius: 2px;
  padding-bottom: 4px;
  margin-bottom: 4px;
}

.row {
  display: grid;
  grid-template-columns: repeat(6, 1fr) 80px;
  padding: 8px;
}

.row:nth-child(even) {
  background-color: gray;
}
</style>
