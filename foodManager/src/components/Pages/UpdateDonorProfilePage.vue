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

          <button role="button"  class="btn-back-button" @click="submitForm()"> Update Profile Details </button><br>
        </form>
          <button role="button"  class="btn-back-button" @click="back()"> Back to Profile </button> 
      </div>
    
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
      router.push('/profile')
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
  padding: 5%;
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
  margin-bottom: 10px;
  width: 100%;
}

label {
  margin-bottom: 5px;
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
/* button {
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
} */
.btn-back-button {
  padding: 10px;
  margin: 5px;
  appearance: none;
  backface-visibility: hidden;
  background-color: #27ae60;
  border-radius: 8px;
  border:0;
  box-shadow: rgba(39, 174, 96, .15) 0 4px 9px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-family: Helvetica,Arial,sans-serif;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: normal;
  height: 40px;
  outline: none;
  overflow: hidden;
  padding: 10px;
  text-align: center;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: top;
  white-space: nowrap;

  justify-content: center;
  letter-spacing: .4px;
  margin-bottom: 2px;
}

.btn-back-button:hover {
  background-color: #1e8449;
  opacity: 1;
  transition-duration: 250ms;
}

.btn-back-button:active {
  transition-duration: 250ms;
}

.btn-back-button:hover {
  box-shadow: rgba(39, 174, 96, .2) 0 6px 12px;
}
</style>

