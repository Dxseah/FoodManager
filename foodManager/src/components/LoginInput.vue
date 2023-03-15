
<template>
  <h1>FoodBank Repository</h1><br>
  <div class="app">
    <form @submit.prevent='login'>
      <label for="email"> Email: </label>
      <input type="email" id="email" name="email" required v-model="email">
      <br>
      <label for="password"> Password: </label>
      <input type="password" id="password"  name="password" required v-model="password">
      <br><br>
      <button id="btn" type="submit" >Login</button>
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
  }, 
    methods: {
      login() {
        // Check if email and password are valid
        if (this.email === 'user@example.com' && this.password === 'password') {
          // Successful login
          console.log('Successful login');
        } else {
          // Display error message
          this.error = 'Wrong email or password! Please try again!';
          alert(this.error)
        }
      }
    }
  }
  </script>

<style scoped>
  h1 {
      font-family: Marker Felt, Avenir, Arial, Helvetica, sans-serif;
      font-weight: bold;
      font-size: 4em;
  }

  /* label {
    font-family: Avenir, Arial, Helvetica, sans-serif;
    font-weight: bold;
  } */
  
  label{
    display: inline-block;
    clear: left;
    width: 80px;
    text-align: right;
    font-size: 15px;
  }

  input {
    display: inline-block;
    margin-left: 5px;
  }

  .app {
    align-content: center;
  }
 
</style>