<script setup lang="ts">
import { ref } from 'vue'

import { type Pet } from '@/api'
import ModalComponent from '@/components/Modal/ModalComponent.vue'
import BuyIcon from '@/assets/svg/buy.svg?component'

const isOpen = ref(false)

defineProps<{ data: Pet }>()
</script>

<template>
  <td class="table-data" :key="key" v-for="(val, key) in data">
    <span class="table-vertical-label">
      {{ `${key}: ` }}
    </span>
    <span>
      {{ val }}
    </span>
  </td>
  <button class="table-data-button" v-if="data.status === 'available'" @click="isOpen = true">
    <BuyIcon fill="white" />
  </button>

  <ModalComponent v-if="isOpen" @close="isOpen = false" :pet="data" />
</template>

<style scoped lang="scss">
.table {
  &-data {
    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;

    &-button {
      display: flex;
      background: none;
      border: none;
      justify-content: center;
      align-items: center;
      padding: 0;
      cursor: pointer;
      place-self: center center;

      @media (width <= $breakpoint-l) {
        grid-column: 1 / -1;
      }
    }
  }

  &-vertical-label {
    @media (width >= $breakpoint-l) {
      display: none;
    }
  }
}
</style>
