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
  <td :key="i" v-for="(val, i) in data">
    {{ val }}
  </td>
  <button v-if="data.status === 'available'" @click="isOpen = true">
    <BuyIcon />
  </button>
  <ModalComponent v-if="isOpen" @close="isOpen = false" :pet-id="data.id || 0" />
</template>
