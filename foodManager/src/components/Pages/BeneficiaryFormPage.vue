<template>
  <div class="background">
    <div class="transbox">
      <div class="content">
        <h1 class="header">Beneficiary Form</h1>
        <form class="form"  @submit.prevent="submitForm">
          <div class="form-group">
            <div v-for="foodItem in foodItems" :key="foodItem.id">
                  <h2>{{ foodItem.name }}</h2>
                  <div class="food-form">
                    <label>Requested Quantity: </label>
                    <input type="number" id="requested-quantity" v-model.number="foodItem.requestedQuantity" min="0">
                  </div>
            </div>
          </div>
          <button class="submit-button" v-on:click="submitAlert">Submit Request</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase'
import { getDoc, doc, updateDoc, setDoc, collection } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import router from '@/components/Router/index.js'
import { query, where, getDocs } from 'firebase/firestore';

export default {
  name: "BeneficiaryFormPage",
  data() {
    return {
      foodItems: []
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
      const user = auth.currentUser;

      const batch = [];
      const requestData = {};
      this.foodItems.forEach((foodItem) => {
        batch.push(updateDoc(doc(db, 'FoodCollection', foodItem.id), {
          requested: foodItem.requested + (foodItem.requestedQuantity ? foodItem.requestedQuantity : 0),
        }));
      });
      await Promise.all(batch);

      // Save data to Firestore
      const foodItemRef = collection(db, "RequestedFood");
      const docRef = doc(foodItemRef);
      const docSnap = await getDoc(docRef);

      this.foodItems.forEach((foodItem) => {
        if (foodItem.requestedQuantity && foodItem.requestedQuantity > 0) {
          requestData[foodItem.name] = foodItem.requestedQuantity;
        }
      });

      requestData.userEmail = user.email;

      if (docSnap.exists()) {
        await setDoc(docRef, requestData, { merge: true });
      } else {
        await setDoc(docRef, requestData);
      }

      console.log("Form submitted")
      router.push("/beneficiaryhome")
    }
    catch (err) {
        alert(err.message)
    }
  },
  async submitAlert() {
    alert("Request Form is submitted!")
  }
  }
}
</script>

<style scoped>
.background {
  background: url(https://images.unsplash.com/photo-1588772351739-cd328260e2b2);
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  background-color: #F8F3E8;
}

.transbox {
  background-color: #E6F8F6;
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
  color: black;
  font-family: Avenir, Arial, Helvetica, sans-serif;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  color: black;
  font-family: Avenir, Arial, Helvetica, sans-serif;
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
  color: black;
}

input[type="number"] {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-size: 1.2em;
  margin-bottom: 20px;
  width: 100%;
}

.submit-button {
  background-color:#779ECB;
}

button:hover {
  color: #F6C7B3;

}

</style>