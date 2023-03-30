<template>
  <div class="donorCont">
    <h2>Sign Up as a Donor!</h2>
    <form @submit.prevent="donorSignUp">
      <h3>Personal Details</h3>
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
      <label for="password">Password:</label>
      <input type="password" placeholder="Enter Password" required v-model="password">
      <br>
      <label for="confirmPassword">Confirm Password:</label>
      <input type="password" placeholder="Confirm Password" required v-model="confirmPassword">
      <br><br>
      <button id="btn">Donor Sign Up</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import router from '@/components/Router/index.js'
import { db } from '@/firebase'
import {getDoc, doc, updateDoc, setDoc} from "firebase/firestore"

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const name = ref('')
    const userid = ref('')
    const contact = ref('')

    const store = useStore()

    const donorSignUp = async () => {
      try {
        // Validate the contact number
        const contactNumber = parseInt(contact.value)
        if (isNaN(contactNumber) || contact.value.length != 8) {
          alert('Please enter a valid 8 digit Singapore contact number.')
          return
        }

        // Validate the password and confirm password
        if (!/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}$/.test(password.value)) {
          alert('Please enter a password that is alphanumeric and at least 6 characters long.')
          return
        }
        if (password.value !== confirmPassword.value) {
          alert('Please make sure your password and confirmation match.')
          return
        }

        await store.dispatch('signup', {
          email: email.value,
          password: password.value,
          name: name.value,
        })
        router.push('/donorhome')

        const docRef = doc(db,"User",userid.value);
        await setDoc(docRef, {
          userid: userid.value,
          email: email.value,
          name: name.value,
          contact: contact.value,
          organisation: '',
          accountType: 2, //1 for beneficiary, 2 for donor
        })

        console.log("Document written by ID: " + userid.value)
        window.location.reload()
      }
      catch (err) {
        alert(err.message)
      }
    }
    return {
      donorSignUp,
      email,
      password,
      confirmPassword,
      name,
      userid,
      contact
    }
  }
}
</script>

<style scoped>
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
    margin-bottom: 20px;
  }

  label{
    display: inline-block;
    clear: left;
    width: 150px;
    text-align: right;
    font-family: Avenir, Arial, Helvetica, sans-serif;
    font-weight: bold;
    padding-right: 5px;
    padding-bottom: 5px;
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