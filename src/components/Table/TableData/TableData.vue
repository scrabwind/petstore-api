<script setup lang="ts">
import type { Pet } from '@/api'
import BuyIcon from '@/assets/buy.svg?component'

type Props = {
  data: Pet
}

defineProps<Props>()
</script>

<template>
  <td :key="i" v-for="(val, i) in data">{{ val }}</td>
  <button v-if="data.status === 'available'"></button>
</template>
