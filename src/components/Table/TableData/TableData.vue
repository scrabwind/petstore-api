<script setup lang="ts">
import type { Pet } from '@/api'
import BuyIcon from '@/assets/svg/buy.svg?component'
import { onMounted, ref, onUnmounted } from 'vue'

import ModalComponent from '@/components/Modal/ModalComponent.vue'

const isOpen = ref(false)

type Props = {
  data: Pet
}

defineProps<Props>()

const windowWidth = ref<number>(window.innerWidth)

const handleResize = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <td class="table-data" :key="key" v-for="(val, key) in data">
    <span v-show="windowWidth <= 760">
      {{ `${key}: ` }}
    </span>
    <span>
      {{ val }}
    </span>
  </td>
  <button class="button" v-if="data.status === 'available'" @click="isOpen = true">
    <BuyIcon fill="white" />
  </button>

  <ModalComponent v-if="isOpen" @close="isOpen = false" :pet="data" />
</template>

<style scoped lang="scss">
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
  place-self: center center;

  @media (width <= 760px) {
    grid-column: 1 / -1;
  }
}
</style>
