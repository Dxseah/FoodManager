<template>
    <div class="background">
      <div class="transbox">
        <div class="content">
          <h1 class="header">Update Beneficiary Profile Details</h1>
          <h3>Personal Details</h3>
          <form class="form" @submit.prevent="submitForm">
              <label for="name">Name</label>
              <input type="string" id="name" required v-model="name"/>
              <label for="contact">Contact</label>
              <input type="string" id="contact" required v-model="contact"/>
            
              <button role="button" class="submit-button"> Update Profile Details </button><br>
            <button role="button" class="btn-back-button" @click="back()"> Back to Profile </button> 
          </form>
        </div>
      </div>
    </div>
</template>

<script>
import router from '@/components/Router/index.js'
import { getAuth, onAuthStateChanged } from "firebase/auth"; 
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
      router.push('/profile')
    }
  }
}

</script>

<style scoped>
.background {
  height: auto;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F8F3E8;
}

.transbox {
  background-color: #f9fdfd;
  border-radius: 25px;
  padding: 10px;
  width: 30%;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.header {
  font-size: 2rem;
  margin-bottom: 0px;
  color: #2c3e50;
  font-family: Avenir, Arial, Helvetica, sans-serif;
  font-weight: bold;
}

h3 {
  color: #2c3e50;
  font-family: Avenir, Arial, Helvetica, sans-serif;
  font-weight: bold;
  margin-bottom: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  color: #2c3e50;
  font-family: Avenir, Arial, Helvetica, sans-serif;
}

label {
  /* font-weight: bold; */
  font-size: 1.2em;
  margin-bottom: 10px;
  color: #2c3e50;
}

input {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-size: 1.2em;
  margin-bottom: 20px;
  width: 100%;
}

.submit-button {
  background-color:#779ECB;
  border-radius: 25px;
  margin: 20px 0px 0px 0px;
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

.submit-button:hover {
  background-color: #F6C7B3;
  box-shadow: 3px 3px grey;
  color: #2c3e50;
}

.submit-button:active {
  transform: translateY(2px);
  box-shadow: none;
}

.btn-back-button {
  background-color:#779ECB;
  border-radius: 25px;
  margin: 0px 0px 10px 0px;
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

.btn-back-button:hover {
  background-color: #F6C7B3;
  box-shadow: 3px 3px grey;
  color: #2c3e50;
}

.btn-back-button:active {
  transform: translateY(2px);
  box-shadow: none;
}
</style>
