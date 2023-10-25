<script setup lang="ts">
import { ref } from 'vue'
import { usePetStore } from '@/store/pet'

import { isNumber } from '@/helpers/isNumber'
import type { Pet } from '@/api'

const date = ref<string>()
const quantity = ref<number>(1)
const emits = defineEmits<{ (e: 'close'): void }>()
const props = defineProps<{ pet: Pet }>()

const store = usePetStore()

const order = () => {
  // alert(date.value)
  store.dispatch('orderPets', {
    petId: props.pet.id,
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
        <label class="label" for="date">
          <span>shipping date: </span>
          <input class="modal-input" id="date" name="date" type="date" v-model="date" />
        </label>
        <label class="label" for="quantity">
          <span>quantity: </span>
          <input
            class="modal-input"
            id="quantity"
            name="quantity"
            type="number"
            v-model="quantity"
            @keypress="isNumber($event as KeyboardEvent)"
          />
        </label>
        <label class="label" :key="key" v-for="(value, key) in pet" :for="key">
          <span>{{ `${key}: ` }}</span>
          <input class="modal-input" type="text" :name="key" :value="value" :id="key" disabled />
        </label>
        <button class="modal-button modal-submit" @click="order">Place order</button>
        <button class="modal-button modal-cancel" @click="$emit('close')">Cancel</button>
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
    background-color: rgb(var(--popover) 50%);
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-content {
    padding: 2rem;
    width: 500px;
    height: 500px;
    background-color: var(--card);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
    place-items: flex-start flex-start;
    text-wrap: nowrap;
  }

  &-input {
    max-width: 100px;
    background-color: var(--popover);
    border: 1px solid var(--border);
    border-radius: 0.2rem;
    margin-left: 0.5rem;
    color: var(--color-text);
    padding: 0.25rem 0.5rem;
    color-scheme: dark;
    text-overflow: ellipsis;
    outline: none;

    &:focus {
      border: 1px solid var(--button);
    }
  }

  &-button {
    place-self: center center;
    padding: 0.5rem 1rem;
    border: 2px solid var(--accent);
    border-radius: 0.5rem;
    margin-right: 1rem;
    transition: all 0.25s ease-in-out;
    user-select: none;
    color: var(--color-text);
    background-color: var(--button);
    cursor: pointer;

    &:hover {
      transform: scale(102%);
    }
  }
}
</style>
