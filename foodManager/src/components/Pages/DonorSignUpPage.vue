<template>
    <div class="donorCont">
      <h2>Donor Sign Up</h2>
        <form @submit.prevent="donorSignUp">
            <label for="name">Name:</label>
            <input type="name" placeholder="Enter Name" required v-model="name">
            <br><br>
            <label for="email">Email:</label>
            <input type="email" placeholder="Enter Email" required v-model="email">
            <br><br>
            <label for="password">Password:</label>
            <input type="password" placeholder="Enter Password" required v-model="password">
            <br><br>
            <button>Donor Sign Up</button>
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

    const donorSignUp = async () => {
      try {
        await store.dispatch('donorsignup', {
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

    return {donorSignUp, email, password, name}
  }
}
</script>

<style>
.donorCont {
    background-color: aliceblue;
    width: 100vw;
    height: 100vh;
    align-content: center;
    padding: 100px;
  }

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