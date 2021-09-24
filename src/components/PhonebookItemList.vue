<template>
  <table class="table">
    <thead>
      <tr>
        <th><label class="label">Id</label></th>
        <th><label class="label">Phone Number</label></th>
        <th><label class="label">Email</label></th>
        <th><label class="label">First Name</label></th>
        <th><label class="label">Last Name</label></th>
      </tr>
    </thead>
    <tbody v-if="items">
      <tr v-for="item in items" :key="item.id">
        <PhonebookListItem  v-bind="item" />
      </tr>
    </tbody>
    <tfoot>
      <CreateModal v-show="showCreateModal"></CreateModal>
      <button class="button is-link" @click="setModal">Add Item</button>
    </tfoot>
  </table>
  <EditModal v-if="showEditModal" :id="editItemId"></EditModal>
  <PhonebookItem v-if="showItemModal" :id="showItemId"></PhonebookItem>
</template>
<script>
import CreateModal from './CreateModal'
import EditModal from './EditModal'
import PhonebookItem from './PhonebookItem'
import PhonebookListItem from './PhonebookListItem'
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { MutationType } from '@/store/mutations'
export default defineComponent({
  name: 'Table',
  components: {
    CreateModal,
    PhonebookListItem,
    PhonebookItem,
    EditModal
  },
  setup() {
    const store = useStore()

    const setModal = () => {
      store.commit(MutationType.SetCreateModal, true)
    }

    const showCreateModal = computed(() => store.state.showCreateModal)
    const showEditModal = computed(() => store.state.showEditModal)
    const editItemId = computed(() => store.state.editModalItemId)
    const showItemModal = computed(() => store.state.showItemModal)
    const showItemId = computed(()=> store.state.showItemId)

    const items = computed(() => {console.log(store.state.items); return store.state.items})
    console.log({ items })
    return { showCreateModal, setModal, items, showEditModal, showItemModal, editItemId, showItemId }
  }
})
</script>
<style scoped>
table {
  width: 100%;
}
.fa {
  font-size: 1.2rem;
  margin-left: 15px;
}
.fa:hover {
  font-size: 1.4rem;
}
</style>
