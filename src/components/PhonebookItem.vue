<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <h1>View Phonebook Item</h1>
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">ID: {{ item.id }}</p>
              <p class="subtitle is-6"> <label class="label">Phone Number:</label>  {{ item.phoneNumber }}</p>
              <p class="subtitle is-6"> <label class="label">Email:</label>  {{ item.email }}</p>
              <p class="subtitle is-6"> <label class="label">First Name:</label>  {{ item.firstName }}</p>
              <p class="subtitle is-6"> <label class="label">Last Name:</label>  {{ item.lastName }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      class="modal-close is-large"
      @click="closeModal"
      aria-label="close"
    ></button>
  </div>
</template>
<script lang="ts">
import { computed } from "vue";
import { useStore } from "@/store";
import { MutationType } from "@/store/mutations";
export default {
  name: "EditModal",
  props: {
    id: { type: Number, required: true },
  },
  setup(props: any) {
    const store = useStore();

    const item = computed(() => store.getters.getItemById(Number(props.id)));

    const closeModal = () => {
      store.commit(MutationType.SetItemModal, {
        showModal: false,
        itemId: undefined,
      });
    };

    return { closeModal, item };
  },
};
</script>
<style scoped>
h1 {
    color: #ffffff;
    text-align: center;
    font-size: 2rem;
    margin-bottom: 3rem;
}
</style>
