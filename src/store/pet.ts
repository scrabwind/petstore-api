// store.ts
import { type InjectionKey } from 'vue'
import { Store, createStore, useStore as baseUseStore } from 'vuex'

import { type Pet } from '@/api/models/Pet'
import { PetService } from '@/api/services/PetService'
import { StoreService } from '@/api/services/StoreService'

export interface State {
  pets: Pet[]
  orderStatus: 'none' | 'success' | 'failed'
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    pets: [],
    orderStatus: 'none'
  },
  getters: {
    getAllPets({ pets }) {
      return pets?.map((pet) => {
        const { id, name, category, photoUrls, tags, status } = pet

        const nameTags = tags?.map((tag) => tag.name).join(' ')

        return {
          id,
          category: category?.name,
          name,
          photoUrls: photoUrls?.join(' ') || '',
          tags: nameTags || '',
          status
        }
      })
    },
    getPetsLabels({ pets }): string[] {
      if (!pets?.length) return []
      return Object.keys(pets[0])
    }
  },
  mutations: {
    UPDATE_PETS(state, payload) {
      state.pets = payload
    },
    UPDATE_ORDER_STATUS(state, status) {
      state.orderStatus = status
    },
    CLEAR_ORDER_STATUS(state) {
      state.orderStatus = 'none'
    }
  },
  actions: {
    async setPets({ commit }, status: string[]) {
      const fixedStatuses: string = status.join(',') // Api fix since & character doesn't work there
      try {
        const pets = await PetService.findPetsByStatus({ status: [fixedStatuses] })
        commit('UPDATE_PETS', pets)
      } catch (error) {
        console.error(error)
      }
    },
    async orderPets({ commit }, { petId, quantity, date }) {
      try {
        const max = 1_000_000
        const min = 1
        const id = Math.floor(Math.random() * (max - min + 1)) + min

        await StoreService.placeOrder({
          body: { id, petId, quantity, status: 'placed', complete: false, shipDate: date }
        })

        commit('UPDATE_ORDER_STATUS', 'success')
      } catch (error) {
        console.error(error)
        commit('UPDATE_ORDER_STATUS', 'failed')
      } finally {
        setTimeout(() => {
          commit('CLEAR_ORDER_STATUS')
        }, 3000)
      }
    }
  }
})

export function usePetStore() {
  return baseUseStore(key)
}
