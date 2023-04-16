<template>
  <div class="background">
    <div class="transbox">
      <div class="content">
        <h1 class="header">Donor Form</h1>
        <form class="form" @submit.prevent="submitForm">
          <div v-for="foodItem in foodItems" :key="foodItem.id">
                  <h2>{{ foodItem.name }}</h2>
                  <div class="food-form">
                    <label>Donated Quantity: </label>
                    <input type="number" id="donated-quantity" v-model.number="foodItem.donatedQuantity" min="0" required>
                  </div>
          </div>
          <label for="image-upload">Upload Image</label>
          <input type="file" id="image-upload" accept="image/*" @change="handleImageUpload" required />
          <button class="submit-button" v-on:click="submitAlert">Submit Donation</button>
        </form> 
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";
import { getDoc, doc, setDoc, collection, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import router from '@/components/Router/index.js'
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { query, where, getDocs } from 'firebase/firestore';

// import { firestore } from 'firebase-admin';

export default {
  name: "DonorFormPage",
  data() {
    return {
      foodItems: [],
      imageFile: null,
    };
  },

  async mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
    const foodItemQuery = query(collection(db, 'FoodCollection'));
    const querySnapshot = await getDocs(foodItemQuery);
    querySnapshot.forEach((doc) => {
      const foodItem = doc.data();
      foodItem.id = doc.id;
      this.foodItems.push(foodItem);
    });
  },

  methods: {
    async submitForm() {
    try {
      const auth = getAuth();
      const storage = getStorage();
      const user = auth.currentUser;
      console.log(this.imageFile)

      const batch = [];
      const donationData = {};
      this.foodItems.forEach((foodItem) => {
        batch.push(updateDoc(doc(db, 'FoodCollection', foodItem.id), {
          donated: foodItem.donated + (foodItem.donatedQuantity ? foodItem.donatedQuantity : 0),
        }));
      });
      await Promise.all(batch);

      // Save data to Firestore
      const foodItemRef = collection(db, "DonatedFood");
      const docRef = doc(foodItemRef);
      const docSnap = await getDoc(docRef);

      this.foodItems.forEach((foodItem) => {
        if (foodItem.donatedQuantity && foodItem.donatedQuantity > 0) {
          donationData[foodItem.name] = foodItem.donatedQuantity;
        }
      });

      donationData.userEmail = user.email;

      if (docSnap.exists()) {
        await setDoc(docRef, donationData, { merge: true });
      } else {
        await setDoc(docRef, donationData);
      }
      
      const form = document.querySelector('form');
      const formInputs = form.querySelectorAll('input, select, textarea');

      let isFormValid = true;
      formInputs.forEach(input => {
        if (!input.value) {
          isFormValid = false;
        }
      });
      if (!this.imageFile) {
        alert("Please upload an image of your donation.");
        return;
      };

      const storageRef = ref(storage, '/donations/'+user.email);
      // 'file' comes from the Blob or File API
      uploadBytesResumable(storageRef, this.imageFile).then(() => {
        console.log('Uploaded a blob or file!');
      });
      console.log("Form submitted");
      router.push("/donorhome");
    } catch (err) {
      alert(err.message);
    }
  },


  async submitAlert() {
    if (!this.imageFile || !isFormValid) {
      alert("Please fill out all form fields and upload an image of your donation.");
      return;
    };
    alert("Donation Form is submitted!")
    },
      handleImageUpload(event) {
        console.log(event.target.files)
        this.imageFile = event.target.files[0];
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
  margin-top: 40px;
  margin-bottom: 30px;
}

.header {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #2c3e50;
  font-family: Avenir, Arial, Helvetica, sans-serif;
  font-weight: bold;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  color: #2c3e50;
  font-family: Avenir, Arial, Helvetica, sans-serif;
}

/* .form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
  width: 100%;
} */

label {
  /* font-weight: bold; */
  font-size: 1.2em;
  margin-bottom: 10px;
  color: #2c3e50;
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

h2 {
  color: #2c3e50;
  font-weight: bold;
}

.submit-button {
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