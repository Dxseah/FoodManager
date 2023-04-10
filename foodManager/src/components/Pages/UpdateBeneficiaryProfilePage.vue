<template>
  <div class="donorCont">
    <h2 class="title">Update Beneficiary Profile Details</h2>
    <div class="form-container">
      <form class="form" @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name" class="form-label">Name</label>
          <input type="string" id="name" required class="form-input" v-model="name" />
        </div>

        <div class="form-group">
          <label for="contact" class="form-label">Contact</label>
          <input type="string" id="contact" required class="form-input" v-model="contact" />
        </div>
        <button class="btn" type="submit"> Update Profile Details </button>
      </form>
    </div>

    <button class="btn back-btn" @click="back()"> Back to Profile </button>
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
      router.push('/beneficiaryprofile')
    }
  }
}

</script>

<style scoped>
  .donorCont {
    background-color: #f9f9f9;
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

  .title {
    margin-bottom: 30px;
    font-size: 32px;
    font-weight: 600;
    color: #333;
    text-align: center;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-content: center;
    width: 400px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    width: 100%;
  }

  .form-label {
    margin-bottom: 10px;
    margin-right: 10px;
    font-size: 20px;
    color: #333;
    text-align: left;
  }

  .form-input {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 20px;
    width: 100%;
    font-size: 18px;
  }

  .btn {
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 12px 24px;
    cursor: pointer;
    font-size: 20px;
    transition: all 0.2s ease-in-out;
  }

  .btn:hover {
    background-color: #3e8e41;
  }

  .back-btn {
    margin-top: 20px;
    font-size: 18px;
    background-color: transparent;
    color: #4CAF50;
    border: 1px solid #4CAF50;
  }

  .back-btn:hover {
    background-color: #4CAF50;
    color: white;
  }
</style>