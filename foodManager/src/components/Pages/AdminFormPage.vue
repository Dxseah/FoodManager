<template>
    <div class="background">
      <div class="transbox">
        <div class="content">
          <h1 class="header">Add Food Item</h1>
          <form class="form"  @submit.prevent="submitForm">
            <div class="food-item-list">
              <div v-for="foodItem in foodItems" :key="foodItem.id">
                  <label for="target-quantity">{{ foodItem.name }} </label>
                  <input type="number" id="donated-quantity" v-model.number="foodItem.donated" min="0" :placeholder="[[foodItem.donated]]"/>
                  <input type="number" id="requested-quantity" v-model.number="foodItem.requested" min="0" :placeholder="[[foodItem.requested]]"/>
              </div>
            </div>
            <button class="submit-button" v-on:click="submitAlert">Add Food Item</button>
          </form>
            <br>
            <router-link to="/adminhome">Back to Home Page</router-link>
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

.submit-button {
  background-color: silver;
}

</style>