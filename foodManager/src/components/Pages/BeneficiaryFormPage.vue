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
  height: 150vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F8F3E8;
}

.transbox {
  background-color: #f9fdfd;
  border-radius: 25px;
  padding: 10px 20px 10px 20px;
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