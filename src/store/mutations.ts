import { MutationTree } from 'vuex'
import { State, PhonebookItem } from './state'

export enum MutationType {
  CreateItem = 'CREATE_ITEM',
  SetItems = 'SET_ITEMS',
  RemoveItem = 'REMOVE_ITEM',
  EditItem = 'EDIT_ITEM',
  UpdateItem = `UPDATE_ITEM`,

  SetLoading = 'SET_LOADING',
  SetCreateModal = 'SET_CREATE_MODAL',
  SetEditModal = 'SET_EDIT_MODAL',
  SetItemModal = 'SET_ITEM_MODAL'
}

export type Mutations = {

  [MutationType.CreateItem](state: State, item: PhonebookItem): void;
  [MutationType.SetItems](state: State, items: PhonebookItem[]): void;
  [MutationType.RemoveItem](
    state: State,
    item: Partial<PhonebookItem> & { id: number }
  ): void;
  [MutationType.EditItem](
    state: State,
    item: Partial<PhonebookItem> & { id: number }
  ): void;
  [MutationType.UpdateItem](
    state: State,
    item: Partial<PhonebookItem> & { id: number }
  ): void;

  [MutationType.SetLoading](state: State, value: boolean): void;
  [MutationType.SetCreateModal](state: State, value: boolean): void;
  [MutationType.SetEditModal](state: State, value: {showModal: boolean; itemId: number|undefined}): void;
  [MutationType.SetItemModal](state: State, value: {showModal: boolean; itemId: number|undefined}): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.CreateItem](state, item) {
    state.items.unshift(item)
  },
  [MutationType.SetItems](state, items) {
    state.items = items
  },
  [MutationType.RemoveItem](state, item) {
    const itemIndex = state.items.findIndex(element => element.id === item.id)
    if (itemIndex === -1) return
    //If item exist in the state, remove it
    state.items.splice(itemIndex, 1)
  },
  [MutationType.EditItem](state, item) {
    const itemIndex = state.items.findIndex(element => element.id === item.id)
    if (itemIndex === -1) return
    //If item exist in the state, toggle the editing property
    state.items[itemIndex] = { ...state.items[itemIndex], editing: !state.items[itemIndex].editing }
    console.log('item index#', state.items[itemIndex])
  },
  [MutationType.UpdateItem](state, item) {
    state.items = state.items.map(element => {
      if(element.id === item.id) {
        return {...element, ...item}
      }
      return element;
    })
  },

  [MutationType.SetLoading](state, value) {
    state.loading = value
    console.log('I am loading...')
  },
  [MutationType.SetCreateModal](state, value) {
    state.showCreateModal = value
  },
  [MutationType.SetEditModal](state, value) {
    state.showEditModal = value.showModal
    state.editModalItemId = value.itemId
  },
  [MutationType.SetItemModal](state, {showModal, itemId}) {
    state.showItemModal = showModal
    state.showItemId = itemId
  }
}
