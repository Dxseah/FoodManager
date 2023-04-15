<template>
    <div class="background">
      <div class="transbox">
        <div class="content">
          <h1 class="header2">Delete Food Item</h1>
          <form class="form2" @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">Food Item Name</label>
              <select id="name" v-model="selectedFoodItemId">
                <option disabled value="">Please select a food item</option>
                <option v-for="foodItem in foodItems" :key="foodItem.id" :value="foodItem.id">{{ foodItem.name }}</option>
              </select>
            </div>
            <button class="add-button" v-on:click="deleteFoodItem(selectedFoodItemId)">Delete Food Item</button>
            <br>
            <router-link to="/adminhome" class="button">Back to Home Page</router-link>
          </form>
        </div>
      </div>
    </div>
</template>
  
<script>
import { db } from "@/firebase";
import { getDoc, doc, setDoc, collection, deleteDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { query, onSnapshot } from "firebase/firestore";

  
export default {
   name: "AdminDeletePage",
   data() {
    return {
        foodItems: [],
        selectedFoodItemId: ""
    };
    },
    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
            this.user = user;
            const foodItemQuery = query(collection(db, "FoodCollection"));
            onSnapshot(foodItemQuery, (querySnapshot) => {
                this.foodItems = querySnapshot.docs.map((doc) => {
                const foodItem = doc.data();
                foodItem.id = doc.id;
                return foodItem;
                });
            });
            }
        });
    },
    methods: {
      async submitForm() {
        // Handle form submission
      },
      async deleteFoodItem(foodItemId) {
        try {
          await deleteDoc(doc(db, "FoodCollection", foodItemId));
          alert("Food item deleted successfully!");
        } catch (error) {
          console.error("Error deleting food item: ", error);
          alert("Error deleting food item: " + error.message);
        }
      }
    }
};
</script>
  
<style scoped>
.background {
  background: url(https://images.unsplash.com/photo-1588772351739-cd328260e2b2);
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-repeat: no-repeat;
  height: 150vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  background-color: aliceblue;
}

.transbox {
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  padding: 20px;
}

.content {
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
}

.header2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.form2 {
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

select#name {
  height: 40px;
  font-size: 1.2em;
}

.add-button {
    background-color: #F6C7B3;
    box-shadow: 3px 3px grey;
}

</style>
