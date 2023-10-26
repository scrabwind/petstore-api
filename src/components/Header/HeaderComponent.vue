<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { usePetStore } from '@/store/pet'

const store = usePetStore()

const availableStatuses = ['available', 'sold', 'pending']

const selectedStatuses = ref<string[]>(availableStatuses)

const updateList = () => {
  store.dispatch('setPets', selectedStatuses.value)
}

onMounted(() => {
  updateList()
})

const clickHandler = () => {
  updateList()
}
</script>

<template>
  <header class="header">
    <label
      class="header-label"
      :class="{ 'header-label--checked': selectedStatuses.includes(status) }"
      :for="status"
      v-for="status in availableStatuses"
      :key="status"
    >
      <span>
        {{ status }}
      </span>
      <input
        v-show="false"
        type="checkbox"
        :id="status"
        :value="status"
        v-model="selectedStatuses"
        class="checkbox"
      />
    </label>

    <button class="header-filter-button" @click="clickHandler">Filter</button>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: flex-start;

  @media (width <= $breakpoint-l) {
    justify-content: center;
  }

  &-label {
    padding: 0.5rem 1rem;
    border: 2px solid var(--border-primary);
    border-radius: 0.5rem;
    margin-right: 1rem;
    transition: all 0.25s ease-in-out;
    user-select: none;
    cursor: pointer;

    &:hover {
      background-color: var(--table-secondary);
      transform: scale(105%);
    }

    &:has(input:checked) {
      background-color: var(--button);
    }

    @media (width <= $breakpoint-s) {
      padding: 0.25rem 0.75rem;
      margin-right: 0.5rem;
    }
  }

  &-filter-button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    cursor: pointer;
    outline: inherit;
    transition: scale 0.1s ease-in-out;

    &:hover {
      color: var(--button);
      scale: 105%;
    }
  }
}
</style>
