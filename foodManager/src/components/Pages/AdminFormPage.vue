<template>
    <div class="background">
      <div class="transbox">
        <div class="content">
          <h1 class="header">Update Food Item Quantities</h1>
          <form class="form"  @submit.prevent="submitForm">
              <div v-for="foodItem in foodItems" :key="foodItem.id">
                  <h2>{{ foodItem.name }}</h2>
                  <div class="food-form">
                    <label>Donated Quantity: </label>
                    <input type="number" id="donated-quantity" v-model.number="foodItem.donated" min="0" :placeholder="[[foodItem.donated]]"/>
                    <label>Requested Quantity: </label>
                    <input type="number" id="requested-quantity" v-model.number="foodItem.requested" min="0" :placeholder="[[foodItem.requested]]"/>
                  </div>
            </div>
            <button class="submit-button" v-on:click="submitAlert">Add Food Item</button>
          </form>
            <br>
            <router-link to="/adminhome" class="routerbutton">Back to Home Page</router-link>
        </div>
      </div>
    </div>
</template>

<script>
import { getDoc, doc, updateDoc, setDoc, collection } from "firebase/firestore"
import { db } from '@/firebase'
import { query, where, getDocs } from 'firebase/firestore';

export default {
  name: "AdminFormPage",
  data() {
    return {
      foodItems: []
    };
  },

  methods: {
    async submitForm() {
      const batch = [];
      this.foodItems.forEach((foodItem) => {
      batch.push(updateDoc(doc(db, 'FoodCollection', foodItem.id), {
        donated: foodItem.donated,
        requested: foodItem.requested
      }));
  });
    await Promise.all(batch);
    alert('Food items have been added!');
}},

  async mounted() {
    const foodItemQuery = query(collection(db, 'FoodCollection'));
    const querySnapshot = await getDocs(foodItemQuery);
    querySnapshot.forEach((doc) => {
      const foodItem = doc.data();
      foodItem.id = doc.id;
      this.foodItems.push(foodItem);
    });
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
  border-radius: 20px;
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