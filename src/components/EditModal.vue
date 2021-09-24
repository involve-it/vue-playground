<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <form @submit.prevent="updateItem">
        <h1>Edit Modal</h1>
        <div class="field">
          <label :class="{label:true, error:vuelidator.phoneNumber.$error}">Phone Number</label>
          <div class="control">
            <input
                v-model="phoneNumber"
                class="input"
                type="text"
                placeholder="Phone Number"
            />
          </div>
        </div>

        <div class="field">
          <label :class="{label:true, error:vuelidator.email.$error}">Email</label>
          <div class="control">
            <input
                v-model="email"
                class="input"
                type="text"
                placeholder="Enter email"
            />
          </div>
        </div>

        <div class="field">
          <label :class="{label:true, error:vuelidator.firstName.$error}">First Name</label>
          <div class="control">
            <input
                v-model="firstName"
                class="input"
                type="text"
                placeholder="Enter user's first name"
            />
          </div>
        </div>
        <div class="field">
          <label :class="{label:true, error:vuelidator.lastName.$error}">Last Name</label>
          <div class="control">
            <input
                v-model="lastName"
                class="input"
                type="text"
                placeholder="Enter user's last name"
            />
          </div>
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button type="submit" class="button is-link">Submit</button>
          </div>
          <div class="control" @click="closeModal">
            <button class="button is-link is-light">Cancel</button>
          </div>
        </div>
      </form>
      <div class="validator-errors">
        <p
            v-for="(error, index) of vuelidator.$errors"
            :key="index"
        >
          <small>&nbsp; property</small>
          <strong>&nbsp;{{ error.$property }}</strong>
          <small>&nbsp;says:</small>
          <strong>&nbsp;{{ error.$message }}</strong>
        </p>
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
import { reactive, toRefs, computed, onMounted } from 'vue'
import { useStore } from '@/store'
import { PhonebookItem } from '@/store/state'
import { MutationType } from '@/store/mutations'
import {email, helpers, required, requiredUnless} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
export default {
  name: 'EditModal',
  props: {
      id: { type: Number, required: true }
  },
  setup(props: any) {
    const state = reactive({
      phoneNumber: '',
      email: '',
      firstName: '',
      lastName: ''
    })
    const store = useStore()
    // validation part:
    const rules = computed(() => ({
      phoneNumber: { required },
      email: { required, email },
      firstName: { requiredUnless: helpers.withMessage('Either First Name OR Last Name is required',
            requiredUnless(state.lastName))},
      lastName: { requiredUnless: helpers.withMessage('Either First Name OR Last Name is required',
            requiredUnless(state.firstName))}
    }));

    const vuelidator = useVuelidate(rules, state)
    const getItemById = computed(() => store.getters.getItemById(Number(props.id)))
    console.log("item by id", getItemById)



    const setFields = () => {
       const item = store.getters.getItemById(Number(props.id))
       if(item) {
           console.log("item si kolo", item)
           state.phoneNumber = item.phoneNumber
           state.email = item.email
           state.firstName = item.firstName
           state.lastName = item.lastName
       }
    }

    onMounted(() => { setFields() });
    const closeModal = () => {
      store.commit(MutationType.SetEditModal, {showModal: false, itemId: undefined})
      vuelidator.value.$reset();
    }
    const updateItem = () => {
      vuelidator.value.$validate();
      if (vuelidator.value.$error) {
        return;
      }

      const item: PhonebookItem = {
        id: props.id,
        phoneNumber: state.phoneNumber,
        email: state.email,
        firstName: state.firstName,
        lastName: state.lastName,
        editing: false
      }
      store.commit(MutationType.UpdateItem, item)
      state.phoneNumber = ''
      state.email = ''
      state.firstName = ''
      state.lastName = ''
      closeModal();
    }

    return { closeModal, ...toRefs(state), updateItem, vuelidator }
  }
}
</script>
<style scoped>

h1 {
    color: #ffffff;
    text-align: center;
    font-size: 2rem;
    margin-bottom: 3rem;
}
</style>
