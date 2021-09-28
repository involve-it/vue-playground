import {ActionContext, ActionTree, Commit} from 'vuex'
import Axios from 'axios'
import { Mutations, MutationType } from './mutations'
import {PhonebookItem, State} from './state'

export enum ActionTypes {
  GetTaskItems = 'GET_Phonebook_ITEMS',
  SetCreateModal = 'SET_CREATE_MODAL',
  SetEditModal = 'SET_EDIT_MODAL',
  CreateItem = 'CREATE_ITEM',
  RemoveItem = 'REMOVE_ITEM',
  EditItem = 'EDIT_ITEM',
  UpdateItem = `UPDATE_ITEM`,
}

type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
}


export type Actions = {
  [ActionTypes.GetTaskItems](context: ActionAugments): void;
  [ActionTypes.SetCreateModal](context: ActionAugments): void;
  [ActionTypes.SetEditModal](context: ActionAugments): void;

  [ActionTypes.CreateItem](context: ActionAugments, item: PhonebookItem): void;
  [ActionTypes.RemoveItem](context: ActionAugments, item: Partial<PhonebookItem> & { id: number }): void;
  [ActionTypes.EditItem](context: ActionAugments, item: Partial<PhonebookItem> & { id: number }): void;
  [ActionTypes.UpdateItem](context: ActionAugments, item: Partial<PhonebookItem> & { id: number }): void;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))


async function CrudApiStub(commit: Commit, data: any) {
  console.log('Simulating call to Api server with payload: ', data);
  commit(MutationType.SetLoading, true);
  return new Promise((res, rej) =>
    setTimeout(function() {
      if (!data) {
        rej('404 error');
        commit(MutationType.SetLoading, false);
      } else {
        console.log('...done!');
        commit(MutationType.SetLoading, false);
        res();
      }
    }, 2000)
  )
}

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.GetTaskItems]({ commit }) {
    commit(MutationType.SetLoading, true)
    Axios.get('/data/phonebook.json')
        .then((response: { data: PhonebookItem[] }) => {
          commit(MutationType.SetItems, response.data)
          commit(MutationType.SetLoading, false)
        })
  },

  async [ActionTypes.SetCreateModal]({ commit }) {
    commit(MutationType.SetCreateModal, true)
  },
  async [ActionTypes.SetEditModal]({ commit }) {
    commit(MutationType.SetEditModal, {showModal: true, itemId: 1})
  },

  async [ActionTypes.CreateItem]({ commit }, item) {
    await CrudApiStub(commit, item);
    commit(MutationType.CreateItem, item)
  },
  async [ActionTypes.RemoveItem]({ commit }, item) {
    await CrudApiStub(commit, item);
    commit(MutationType.RemoveItem, item)
  },
  async [ActionTypes.EditItem]({ commit }, item) {
    await CrudApiStub(commit, item);
    commit(MutationType.EditItem, item)
  },
  async [ActionTypes.UpdateItem]({ commit }, item) {
    await CrudApiStub(commit, item);
    commit(MutationType.UpdateItem, item)
  },
}
