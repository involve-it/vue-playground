<template>
  <th>{{ id }}</th>
  <td>{{ phoneNumber }}</td>
  <td>{{ email }}</td>
  <td>{{ firstName }}</td>
  <td>{{ lastName }}</td>
  <td>
    <span class="icon" @click="viewItem()">
      <i class="fa fa-eye"></i>
    </span>
    <span class="icon" @click="editItem()">
      <i class="fa fa-edit"></i>
    </span>
    <span class="icon" @click="removeItem()">
      <i class="fa fa-trash"></i>
    </span>
  </td>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import { MutationType } from '@/store/mutations'
import {ActionTypes} from "@/store/actions";

export default defineComponent({
  props: {
    id: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
  },
  components: {

  },
  setup(props) {
    const store = useStore()

    const removeItem = () => {
      store.dispatch(ActionTypes.RemoveItem, {
        id: props.id
      })
    }

    const viewItem = () => {
      store.commit(MutationType.SetItemModal, {showModal:true, itemId:props.id})
    }

    const editItem = () => {
      store.commit(MutationType.SetEditModal, {showModal:true, itemId: props.id})
    }

    return { removeItem, editItem, viewItem }
  }
})
</script>
