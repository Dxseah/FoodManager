<template>
    <h2>Beneficiary Sign Up</h2>
    <div>
      <form @submit.prevent="signUp">
        <label for="name">Name:</label>
        <input type="name" placeholder="Name" required v-model="name">
        <br>
        <label for="email">Email:</label>
        <input type="email" placeholder="Email"    required v-model="email">
        <br>
        <label for="password">Password:</label>
        <input type="password" placeholder="Password" required v-model="password">
        <br>
        <button id="btn">Beneficiary Sign Up</button>
      </form>
    </div>
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

    return {signUp, email, password, name}
  }
}
</script>

<style>
  h2 {
    font-family: Avenir, Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 2em;
  }

  label {
    display: inline-block;
    text-align: right;
    font-family: Avenir, Arial, Helvetica, sans-serif;
    font-weight: bold;
  }

  input {
    display: inline-block;
    text-align: left;
  }

  #btn {
    display: inline-block;
    text-align: center;
  }
  
</style>