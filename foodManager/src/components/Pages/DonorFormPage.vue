<template>
  <div class="background">
    <div class="transbox">
      <div class="content">
        <h1 class="header">Donor Form</h1>
        <form class="form"  @submit.prevent="submitForm">
          <div class="form-group">
            <label for="rice">Rice</label>
            <input type="number" id="rice" v-model.number="riceQuantity" min="0" />
          </div>
          <div class="form-group">
            <label for="canned-food">Canned Food</label>
            <input type="number" id="canned-food" v-model.number="cannedFoodQuantity" min="0" />
          </div>
          <div class="form-group">
            <label for="instant-noodles">Instant Noodles</label>
            <input type="number" id="instant-noodles" v-model.number="instantNoodlesQuantity" min="0" />
          </div>
          <div class="form-group">
            <label for="image-upload">Upload Image</label>
            <input type="file" id="image-upload" @change="handleImageUpload" />
          </div>
          <button class="submit-button" v-on:click="submitAlert">Submit Donation</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import router from '@/components/Router/index.js'
import { db } from '@/firebase'
import { getDoc, doc, updateDoc, setDoc, collection } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "DonorFormPage",
  data() {
    return {
      riceQuantity: 0,
      cannedFoodQuantity: 0,
      instantNoodlesQuantity: 0,
      imageFile: null,
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth,(user)=>{
      if (user) {
        this.user = user;
      }
    })
  }, 

  methods: {
    async submitForm() {
      try {
      const auth = getAuth(); 
      const user = auth.currentUser;

      // Save data to Firestore
      // const userId = store.getters['auth/user'].id;
      const foodItemRef = collection(db, 'DonatedFood');
      const docRef = doc(foodItemRef);
      const docSnap = await getDoc(docRef);
      const donationData = {
        rice: this.riceQuantity,
        cannedFood: this.cannedFoodQuantity,
        instantNoodles: this.instantNoodlesQuantity,
        // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userEmail: user.email
      };
      if (docSnap.exists()) {
        await setDoc(docRef, donationData, { merge: true });
      } else {
        await setDoc(docRef, donationData);
      }
      console.log("Form submitted")

    }
    catch (err) {
        alert(err.message)
    }
  },

  async submitAlert() {
    // image = this.imageFile
    // if (image === null) {
    //   alert("Image is not submitted! Please submit a photo of the donation.")
    //   return
    // }
    alert("Donation Form is submitted!")
  }

    // handleImageUpload(event) {
    //     this.imageFile = event.target.files[0];
    // } 
  }
}
</script>

<style scoped>
.background {
  background: url(https://images.unsplash.com/photo-1588772351739-cd328260e2b2);
  background-size: cover;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5; 
}

.transbox {
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  padding: 20px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
}

.header {
  font-size: 2rem;
  margin-bottom: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
  width: 100%;
}

label {
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 10px;
}

input[type="number"] {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-size: 1.2em;
  margin-bottom: 20px;
  width: 100%;
}

input[type="file"] {
  margin-top: 5px;
}

.submit-button {
  background-color: silver;
}

</style>