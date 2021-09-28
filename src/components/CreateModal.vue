<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <form @submit.prevent="createItem">
        <div class="field">
          <label class="label">ID</label>
          <div class="control">
            <input
              v-model="id"
              class="input"
              type="text"
              placeholder="Task Id Here"
              readonly
            />
          </div>
        </div>

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
      </form>
    </div>
    <button
      class="modal-close is-large"
      @click="closeModal"
      aria-label="close"
    ></button>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, computed } from 'vue'
import { useStore } from '@/store'
import { PhonebookItem } from '@/store/state'
import { MutationType } from '@/store/mutations'
import { useVuelidate } from '@vuelidate/core'
import { email, required, requiredUnless, helpers } from '@vuelidate/validators'
import {ActionTypes} from "@/store/actions";

export default {
  name: 'CreateModal',
  setup() {
    const state = reactive({
      id: Date.now(),
      phoneNumber: '',
      email: '',
      firstName: '',
      lastName: ''
    })
    const store = useStore()
    // validation part:
    const rules = computed(() => ({
      id: { required },
      phoneNumber: { required },
      email: { required, email },
      firstName: { requiredUnless: helpers.withMessage('Either First Name OR Last Name is required',
            requiredUnless(state.lastName))},
      lastName: { requiredUnless: helpers.withMessage('Either First Name OR Last Name is required',
            requiredUnless(state.firstName))}
    }));

    const vuelidator = useVuelidate(rules, state)
    const closeModal = () => {
      store.commit(MutationType.SetCreateModal, false)
      vuelidator.value.$reset();
    }

    function createItem() {
      vuelidator.value.$validate();
      if (vuelidator.value.$error) {
        return;
      }

      const item: PhonebookItem = {
        id: Date.now(),
        phoneNumber: state.phoneNumber,
        email: state.email,
        firstName: state.firstName,
        lastName: state.lastName,
        editing: false
      }
      store.dispatch(ActionTypes.CreateItem, item);
      state.id = Date.now();
      state.phoneNumber = ''
      state.email = ''
      state.firstName = ''
      state.lastName = ''
      closeModal();
    }

    return { closeModal, ...toRefs(state), createItem, vuelidator }
  },
}
</script>
<style scoped>

</style>
