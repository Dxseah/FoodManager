<template>
<div class="mainDiv">
  <div class="compSign">
    <h2>Beneficiary Sign Up</h2>
    <form @submit.prevent="signUp">
      <h3> Personal Details </h3>
      <br>
      <label for="name">Name:</label>
      <input type="name" placeholder="Enter Name" required v-model="name">
      <br>
      <label for="email">Email:</label>
      <input type="email" placeholder="Enter Email" required v-model="email">
      <br>
      <label for="contact">Contact Number:</label>
      <input type="contact" placeholder="Enter Contact Number" required v-model="contact">
      <br><br>
      <h3> Login Details </h3>
      <br>
      <label for="userid">User ID:</label>
      <input type="userid" placeholder="Enter User ID" required v-model="userid">
      <br>
      <label for="organisation">Organisation Name:</label>
      <input type="organisation" placeholder="Enter Organisation Name" required v-model="organisation">
      <br>
      <label for="password">Password:</label>
      <input type="password" placeholder="Enter Password" required v-model="password">
      <br>
      <button id="btn">Beneficiary Sign Up</button>
    </form>
  </div>
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

<style scoped>
  .mainDiv {
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
    margin-bottom: 20px;
  }

  label{
    display: inline-block;
    clear: left;
    width: 150px;
    text-align: right;
    font-family: Avenir, Arial, Helvetica, sans-serif;
    font-weight: bold;
  }

  input {
    display: inline-block;
    margin-left: 5px;
  }

  #btn {
    display: inline-block;
    text-align: center;
    margin-top: 20px;
  }
  
</style>