<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TableComponent from './components/Table/TableComponent.vue'
import StatusToast from '@/components/Status/StatusToast.vue'

import { usePetStore } from '@/store/pet'

const store = usePetStore()

const selectedStatuses = ref<string[]>(['available', 'sold', 'pending'])

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
  <div class="container">
    <header>
      <input type="checkbox" id="available" value="available" v-model="selectedStatuses" />
      <input type="checkbox" id="pending" value="pending" v-model="selectedStatuses" />
      <input type="checkbox" id="sold" value="sold" v-model="selectedStatuses" />

      <button @click="clickHandler">Click</button>
    </header>

    <main class="main">
      <!-- <table class="table">
        <tr class="nazwy rows">
          <th>id</th>
          <th>Name</th>
          <th>Photo urls</th>
          <th>Category</th>
          <th>tags</th>
          <th>status</th>
        </tr>
        <tr :key="i" v-for="(pet, i) in pets" class="rows">
          <th>{{ pet.id }}</th>
          <th>{{ pet.name }}</th>
          <th>{{ Array.isArray(pet.photoUrls) ? pet.photoUrls.join(' ') : pet.photoUrls }}</th>
          <th>{{ pet.category?.name }}</th>
          <th>{{ pet.tags?.map((x) => x.name).join(' ') }}</th>
          <th>{{ pet.status }}</th>
          <th>
            <button v-show="pet.status === 'available'">
              <BuyIcon />
            </button>
          </th>
        </tr>
      </table> -->
      <TableComponent />
    </main>

    <StatusToast />
  </div>
</template>

<style scoped lang="scss">
.container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main {
  width: 100%;
  padding-top: 2rem;
  text-align: left;
}

.nazwy {
  border-bottom: 1px white solid;
  border-radius: 2px;
  padding-bottom: 0.25rem;
  margin-bottom: 0.25rem;
}

// .rows {
//   display: grid;
//   grid-template-columns: repeat(6, 1fr) 80px;
//   padding: 8px;
// }

// .rows:nth-child(even) {
//   background-color: gray;
// }
</style>
@/store/pet
