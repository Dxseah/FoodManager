<template>
  <div class="donorCont">
    <h2>Hi, we noticed that you're new! Do fill this up to continue!</h2>
    <form @submit.prevent="submitForm">
      <h3>Personal Details:</h3>
      <br>
      <label for="type">Account Type:</label>
      <select required v-model="type" >
          <option value="don">Donor</option>
          <option value="ben">Beneficiary</option>
      </select>
      <!-- <input type="type" placeholder="Enter Donor/Beneficiary" required v-model="type"> -->
      <br>
      <label for="contact">Contact Number:</label>
      <input type="contact" placeholder="Enter Contact Number" required v-model="contact">
      <br>
      <button id="btn" type="submit"> Submit </button>
    </form>
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
          const docSnap = await setDoc(docRef,
          {
            name: this.user.displayName,
            type: this.type,
            contact: this.contact,
            email: this.user.email
          });
          router.push('/donorprofile')
          window.location.reload()
    }
  }
}
    //   const docRef = doc(db,"User",user.value);
    //     await setDoc(docRef, {
    //       userid: userid.value,
    //       email: email.value,
    //       name: name.value,
    //       contact: contact.value,
    //       organisation: '',
    //       accountType: 2, //1 for beneficiary, 2 for donor
    //     })
      // Save data to Firestore
    //   const docRef = doc(db,"User",);
    //   const docSnap = await getDoc(docRef);
    //   const userData = {
    //     user:this.user,
    //     name: this.name,
    //     type: this.type,
    //     contact: this.contact
    //   };
    //   if (docSnap.exists()) {
    //     await setDoc(docRef, userData, { merge: true });
    //   } else {
    //     await setDoc(docRef, donationData);
    //   }



</script>

<style scoped>
  .donorCont {
    background-color: aliceblue;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  h2 {
    font-family: Avenir, Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 2em;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  label {
    display: block;
    width: 100%;
    text-align: left;
    font-family: Avenir, Arial, Helvetica, sans-serif;
    font-weight: bold;
    padding-bottom: 5px;
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

  #btn {
    display: inline-block;
    text-align: center;
    margin-top: 20px;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    background-color: #4CAF50;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  #btn:hover {
    background-color: #2e8b57;
  }

</style>