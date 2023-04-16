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
            <router-link to="/adminhome" class="routerbutton">Back to Home Page</router-link>
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
  padding: 10px 20px 10px 20px;
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

.header2 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #2c3e50;
  font-family: Avenir, Arial, Helvetica, sans-serif;
  font-weight: bold;
}

.form2 {
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
  margin-right: 10px;
}

select#name {
  height: 40px;
  font-size: 15px;
  font-family: Avenir, Arial, Helvetica, sans-serif;
  border-radius: 25px;
  margin-bottom: 20px;
}

.add-button {
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

.routerbutton {
  background-color:#779ECB;
  border-radius: 25px;
  margin: 0px 0px 20px 0px;
  display: inline-block;
  padding: 12px 24px;
  font-size: 18px; 
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  font-family: Avenir, Arial, Helvetica, sans-serif;
}

.routerbutton:hover {
    background-color: #F6C7B3;
    box-shadow: 3px 3px grey;
    color: #2c3e50;
}

.routerbutton:active {
  transform: translateY(2px);
  box-shadow: none;
}

</style>
