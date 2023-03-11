<template>
    <form @submit.prevent="signUp">
    <h2>Sign Up</h2>
      <label for="name">Name:</label>
      <input type="name" placeholder="Name" required v-model="name">
      <br>
      <label for="email">Email:</label>
      <input type="email" placeholder="Email"    required v-model="email">
      <br>
      <label for="password">Password:</label>
      <input type="password" placeholder="Password" required v-model="password">
      <br>
      <button>Sign Up</button>
    </form>
  </template>
  

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import router from '@/components/Router/index.js'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const name = ref('')
    const store = useStore()

    const signUp = async () => {
      try {
        await store.dispatch('signup', {
          email: email.value,
          password: password.value,
          name: name.value,
        })
        router.push('/profile')
      }
      catch (err) {
        alert(err.message)
      }
    }

    return { signUp, email, password, name}
  }
}
</script>