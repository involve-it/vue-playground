<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import PhonebookItemList from './components/PhonebookItemList.vue'
import { useStore } from './store'
import { ActionTypes } from './store/actions'

export default defineComponent({
  components: { PhonebookItemList },
  setup() {
    const store = useStore()

    const loading = computed(() => store.state.loading)
    onMounted(() => store.dispatch(ActionTypes.GetTaskItems))

    const totalCount = computed(() => store.getters.totalItemsCount)

    return { loading, totalCount }
  }
})
</script>

<template>
  <div class="container mx-auto mt-4">
    <h1 class="is-size-3 has-text-centered p-2 has-text-weight-bold">
      PhoneBook
    </h1>

    <div v-if="loading">
      <h3 class="has-text-centered mt-4">Loading...</h3>
    </div>
    <div v-else>
      <p class="has-text-centered mt-2">
        Total {{ totalCount }} phonebook items.
      </p>
      <PhonebookItemList/>
    </div>
  </div>
</template>
<style>
@import '~bulma/css/bulma.css';
.modal-background {
  background-color: white;
}
.modal-close {
  background-color: #ff862e;
}
label.label {
  color: #ff862e;
}
label.label.error {
  color: rgba(255, 0, 0, 0.87);
}
input:invalid {
  color: red;
}
.validator-errors strong {
  color: red;
}
</style>
