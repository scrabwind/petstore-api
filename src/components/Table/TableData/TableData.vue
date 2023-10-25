<script setup lang="ts">
import type { Pet } from '@/api'
import BuyIcon from '@/assets/buy.svg?component'
import { ref } from 'vue'

import ModalComponent from '@/components/Modal/ModalComponent.vue'

const isOpen = ref(false)

type Props = {
  data: Pet
}

defineProps<Props>()
</script>

<template>
  <td class="table-data" :key="i" v-for="(val, i) in data">
    {{ val }}
  </td>
  <button class="button" v-if="data.status === 'available'" @click="isOpen = true">
    <BuyIcon fill="white" />
  </button>
  <ModalComponent v-if="isOpen" @close="isOpen = false" :pet="data" />
</template>

<style lang="scss">
.table-data {
  overflow: hidden;
  text-wrap: nowrap;
  text-overflow: ellipsis;
}

.button {
  display: flex;
  background: none;
  border: none;
  justify-content: center;
  align-items: center;
  padding: 0;
  cursor: pointer;
}
</style>
