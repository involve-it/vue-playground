import { GetterTree } from 'vuex'
import { State, PhonebookItem } from './state'

export type Getters = {
  totalItemsCount(state: State): number;
  getItemById(state: State): (id: number) => PhonebookItem | undefined;
}

export const getters: GetterTree<State, State> & Getters = {
  totalItemsCount(state) {
    return state.items.length
  },
  getItemById: (state) => (id: number) => {
    return state.items.find(task => task.id === id)
  }
}
