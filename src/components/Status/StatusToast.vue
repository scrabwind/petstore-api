<script setup lang="ts">
import { usePetStore } from '@/store/pet'
import { computed } from 'vue'

const store = usePetStore()

const status = computed(() => store.state.orderStatus)
</script>

<template>
  <Transition name="toast">
    <div class="toast-container" v-if="!(status === 'none')">
      <div v-if="status === 'success'" class="toast-success">Successfuly placed an order</div>
      <div v-else class="toast-failed">Something went wrong</div>
    </div>
  </Transition>
</template>

<style lang="scss">
.toast {
  &-container {
    position: absolute;
    top: 1rem;
    right: 2rem;
    width: fit-content;
    height: fit-content;
    text-wrap: nowrap;
  }

  &-success {
    width: 100%;
    height: 100%;
    background-color: var(--primary);
    border-radius: 0.2rem;
    padding: 0.5rem 12px;
  }

  &-failed {
    width: 100%;
    height: 100%;
    background-color: var(--destructive);
    border-radius: 0.2rem;
    padding: 0.5rem 12px;
  }
}

.toast-enter-active,
.toast-leave-active {
  transition: transform 0.5s ease-in-out;
}

.toast-enter-from,
.toast-leave-to {
  transform: translateY(calc(-100% - 1rem));
}
</style>
