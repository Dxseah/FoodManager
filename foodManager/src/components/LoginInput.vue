
<template>
  <h1>FoodBank Repository</h1>
  <div id="app">
    <form @submit.prevent='login'>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required v-model="email">
      <br>
      <label for="password">Password:</label>
      <input type="password" id="password"  name="password" required v-model="password">
      <br>
      <button type="submit" >Login</button>
    </form>
  </div>
</template>

<script>
  import router from '@/components/Router/index.js'
  import { useStore } from 'vuex'
  import { ref } from 'vue'
  export default {

    setup() {
    const email = ref('')
    const password = ref('')
    const store = useStore()
    
    const login = async () => {
      console.log(email)
      console.log(password)
      try {
        await store.dispatch('login', {
          email: email.value,
          password: password.value
        })
        router.push('/profile')
      }
      catch (err) {
        alert(err.message)
      }
    }
    return { login, email, password }
  }
    // methods: {
    //   async login() {
    //     // login user
    //       const store = useStore()

    //       await store.dispatch('login', {
    //       email: this.email,
    //       password: this.password
    //     })
    //     router.push('/')
    //     console.log('Successfully logged in!');
    //   }
    // }
  }
  </script>

