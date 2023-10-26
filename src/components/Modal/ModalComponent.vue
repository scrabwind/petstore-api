<script setup lang="ts">
import { ref } from 'vue'

import { type Pet } from '@/api'
import { usePetStore } from '@/store/pet'
import { isNumber } from '@/helpers/isNumber'

const date = ref<string>()
const quantity = ref<number>(1)
const emits = defineEmits<{ (e: 'close'): void }>()
const props = defineProps<{ pet: Pet }>()
const store = usePetStore()
const order = () => {
  store.dispatch('orderPets', {
    petId: props.pet.id,
    data: date.value,
    quantity: Number(quantity.value)
  })

  emits('close')
}
</script>

<template>
  <Teleport to="body">
    <div class="modal-container">
      <div class="modal-content">
        <label class="modal-label" for="date">
          <span>shipping date: </span>
          <input class="modal-input" id="date" name="date" type="date" v-model="date" />
        </label>
        <label for="quantity">
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
        <label :key="key" v-for="(value, key) in pet" :for="key">
          <span>{{ `${key}: ` }}</span>
          <input class="modal-input" type="text" :name="key" :value="value" :id="key" disabled />
        </label>
        <button class="modal-button modal-submit" @click="order">Place order</button>
        <button class="modal-button modal-cancel" @click="$emit('close')">Cancel</button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.modal {
  &-container {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: var(--modal-background);
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
    background-color: var(--modal-foreground);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
    place-items: flex-start;
    text-wrap: nowrap;
    border-radius: 8px;
  }

  &-input {
    max-width: 100px;
    background-color: var(--modal-input);
    border: 1px solid var(--border-secondary);
    border-radius: 0.2rem;
    margin-left: 0.5rem;
    color: var(--color-text);
    color-scheme: dark;
    text-overflow: ellipsis;
    outline: none;
    padding: 0.5rem;

    &:disabled {
      color: var(--text-disabled);
    }

    &:focus {
      border: 1px solid var(--button);
    }
  }

  &-button {
    place-self: center center;
    padding: 0.5rem 1rem;
    border: 2px solid var(--border-primary);
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
