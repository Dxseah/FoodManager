<template>
    <div class="donorCont">
      <h2>Update Donor Profile Details</h2>
      <h3>Personal Details</h3>
      <div id="forms"> 
        <form class="form" @submit.prevent="submitForm">
          <div class="formbox">
            <label for="name">Name</label>
            <input type="string" id="name" required v-model="name"/>
          </div>

          <div class="formbox">
            <label for="contact">Contact</label>
            <input type="string" id="contact" required v-model="contact"/>
          </div>
          <button id="btn" @click="submitForm()"> Update Profile Details </button><br>
        </form>
      </div>
    
      <br><br>

    <button id="btn" @click="back()"> Back to Profile </button> 
    </div>
</template>

<script>
import router from '@/components/Router/index.js'
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth"; 
import { db } from '@/firebase';
import { getDoc, doc, updateDoc, setDoc, collection } from "firebase/firestore"; 

export default { 
  name: "UpdateDonorProfilePage",
  data() {
    return {
      name: " ", 
      contact:" ", 
      useriden:" "
    }
  },

  mounted() {
    const auth = getAuth(); 
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user
      }
    })
  }, 

  methods: {
    async submitForm() {
      const auth = getAuth(); 
      const user = auth.currentUser; 

          const userRef = collection(db, "User"); 
          const curr = user.displayName; 
          const docRef = doc(userRef, curr);

          // Check for empty fields
            if (this.name == " " || this.contact == " ") {
            alert('Please fill in all fields');
            return;
          }

            // Check if contact has exactly 8 digits
            if (!/^\d{8}$/.test(this.contact)|| this.contact < 80000000 || this.contact > 99999999) {
              alert('Please enter a valid 8 digit Singapore contact number.');
              return;
            }

          const requestedData = {
            "name": this.name, 

            "contact": this.contact,
          }; 
          await updateDoc(docRef, requestedData);


          window.location.reload(); 

    },

    back() {
      router.push('/donorprofile')
    }
  }
}

</script>

<style scoped>
.donorCont {
  background-color: aliceblue;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  padding: 100px;
  font-family: Avenir, Arial, Helvetica, sans-serif;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#forms {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

.form {
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 400px;
}

.formbox {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
  width: 100%;
}

label {
  margin-bottom: 10px;
  font-size: 20px;
  text-align: left;
}

input {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
}
button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 20px;
}
button:hover {
  background-color: #4CAF50;
}
</style>