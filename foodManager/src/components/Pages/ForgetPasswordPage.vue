<template>
<div class="forgetCont">
    <h2>Forgot Password?</h2>
    <div v-if="errorMessage"> {{  errorMessage }}</div>
    <div v-else>
      <form @submit.prevent="forgetPassword">
        <label for="email">Email:</label>
        <input type="email" placeholder="Email" required v-model="email">
        <br>
        <button type="submit" id="btn">Forget Password</button>
      </form>
    </div>
</div>
</template>
  

<script>
// import { ref } from 'vue'
// import { useStore } from 'vuex'
import router from '@/components/Router/index.js'
import { auth } from "@/firebase";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default {
  data() {
    return {
      email: '',
      errorMessage: null
    };
  },
  methods: {
    async forgetPassword() {
      try {
        await sendPasswordResetEmail(auth, this.email);
        this.errorMessage = null;
        alert('Please check your email for password reset link!');
        router.push('/');
      } catch (error) {
        this.errorMessage = error.message;
      }
    }
  }
}
</script>

<style scoped>
.forgetCont {
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
    margin-bottom: 25px;
  }

  label {
    display: inline-block;
    text-align: right;
    font-family: Avenir, Arial, Helvetica, sans-serif;
    font-weight: bold;
    margin-bottom: 20px;
    margin-right: 10px;
  }

  input {
    display: inline-block;
    text-align: left;
  }
  
</style>