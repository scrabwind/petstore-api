<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { PetService } from '@/api/services/PetService'
import type { Pet } from '@/api/models/Pet'
import BuyIcon from '@/assets/buy.svg?component'
import TableComponent from './components/Table/TableComponent.vue'

const pets = ref<Pet[]>([])

const selectedStatuses = ref<string[]>(['available', 'sold', 'pending'])

const updateList = async () => {
  return PetService.findPetsByStatus({ status: [selectedStatuses.value.join(',')] }) // workaround because api is bugged when it comes to query string array
}

onMounted(async () => {
  pets.value = await updateList()
})

const clickHandler = async () => {
  pets.value = await updateList()
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
      <TableComponent :data="pets"></TableComponent>
    </main>
  </div>
</template>

<style scoped lang="scss">
.container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main {
  width: 100%;
  padding-top: 32px;
  text-align: left;
}

.nazwy {
  border-bottom: 1px white solid;
  border-radius: 2px;
  padding-bottom: 4px;
  margin-bottom: 4px;
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
