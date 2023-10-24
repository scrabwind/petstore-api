<script setup lang="ts">
type Props = {
  data: string[]
}

defineProps<Props>()
</script>

<template>
  <th :key="i" v-for="(value, i) in data">{{ value }}</th>
</template>
