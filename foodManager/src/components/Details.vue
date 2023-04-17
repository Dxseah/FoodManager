<template>
  <div class="donorCont">
    <div class="transbox">
      <div class="content">
        <h2 class="header">Hi, we noticed that you're new! Do fill this up to continue!</h2>
        <form @submit.prevent="submitForm" class="form">
        <h3>Personal Details:</h3>
        <br>
        <label for="type">Account Type:</label>
        <select required v-model="type" >
            <option value="Donor">Donor</option>
            <option value="Beneficiary">Beneficiary</option>
        </select>
        <!-- <input type="type" placeholder="Enter Donor/Beneficiary" required v-model="type"> -->
        <br>
        <label for="contact">Contact Number:</label>
        <input type="contact" placeholder="Enter Contact Number" required v-model="contact">
        <br>
        <button id="submit-button" type="submit"> Submit </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from '@/firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc, updateDoc, setDoc, collection } from "firebase/firestore"
import { db } from '@/firebase'
import router from '@/components/Router/index.js'

export default {
  name: "Details", 

  data() {
    return {
      user: false,
      type: "",
      contact: "",
    }
  }, 

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth,(user)=>{
      if (user) {
        this.user = user;
        console.log(user.displayName)
      }
    })
  },

  methods:{
    async submitForm() {
          const docRef = doc(db, "User", this.user.displayName);
                      // Check if contact has exactly 8 digits
          if (!/^\d{8}$/.test(this.contact)|| this.contact < 80000000 || this.contact > 99999999) {
              alert('Please enter a valid 8 digit Singapore contact number.');
              return;
            }

          const docSnap = await setDoc(docRef,
          {
            name: this.user.displayName,
            type: this.type,
            contact: this.contact,
            email: this.user.email
          });
          router.push('/donorprofile')
          window.location.reload();
        }
      }
    }
</script>

<style scoped>

  h2 {
    font-family: Avenir, Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 2em;
    margin-bottom: 20px;
    color: #2c3e50;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  label {
  /* font-weight: bold; */
  font-size: 1.2em;
  margin-bottom: 10px;
  color: #2c3e50;
}

  input,
  select {
    display: block;
    margin-bottom: 10px;
    width: 100%;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid gray;
  }

#submit-button {
  background-color:#779ECB;
  border-radius: 25px;
  margin: 40px 0px 20px 0px;
  display: inline-block;
  padding: 12px 24px;
  font-size: 20px; 
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  font-family: Avenir, Arial, Helvetica, sans-serif;
}

button:hover {
    background-color: #F6C7B3;
    box-shadow: 3px 3px grey;
    color: #2c3e50;
}

button:active {
  transform: translateY(2px);
  box-shadow: none;
}

</style>