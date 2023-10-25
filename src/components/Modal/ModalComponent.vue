<script setup lang="ts">
import { ref } from 'vue'
import { usePetStore } from '@/store/pet'

import { isNumber } from '@/helpers/isNumber'

const date = ref<string>()
const quantity = ref<number>(1)
const emits = defineEmits<{ (e: 'close'): void }>()
const props = defineProps<{ petId: number }>()

const store = usePetStore()

const order = () => {
  // alert(date.value)
  store.dispatch('orderPets', {
    petId: props.petId,
    data: date.value,
    quantity: Number(quantity.value)
  })

  emits('close')

  setTimeout(() => {
    store.commit('clearStatus')
  })
}
</script>

<template>
  <Teleport to="body">
    <div class="modal-container">
      <div class="modal-content">
        <input type="date" v-model="date" />
        <input type="number" v-model="quantity" @keypress="isNumber($event as KeyboardEvent)" />
        <button @click="order">Submit</button>
        <button @click="$emit('close')">Close</button>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss">
.modal {
  &-container {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgb(255 255 255 / 50%);
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-content {
    width: 500px;
    height: 500px;
    background-color: gray;
  }
}
</style>
