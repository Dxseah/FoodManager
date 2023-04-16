<template>
    <div class='background'>
      <div class="transbox">
        <div class="content">
            <div class = "foodCont">
              <router-link to="/adminform" class="button">Edit Food Quantities</router-link>
              <router-link to="/adminnewform" class="button">Add New Food Item</router-link>
              <router-link to="/admindelete" class="button">Delete Food Item</router-link>
              <router-link to="/adminshowdonations" class="button">Show All Donations</router-link>
            </div>
            <h1 class="header"> Track Food Item Progress </h1>
            <div class="food-item-list">
              <div v-for="foodItem in foodItems" :key="foodItem.id">
                <ProgressBar
                  :label="foodItem.name"
                  :min="0"
                  :max="foodItem.requested"
                  :value="foodItem.donated"
                />
              </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
import ProgressBar from '../ProgressBar.vue'
import { getDoc, doc, updateDoc, setDoc, collection } from "firebase/firestore"
import { db } from '@/firebase'
import { query, where, getDocs } from 'firebase/firestore';
  
export default { 
  name: "AdminHomePage",
  components:{
          ProgressBar,
      },

  data() {
    return {
      foodItems: []
    };
  },

  async mounted() {
    const foodItemQuery = query(collection(db, 'FoodCollection'));
    const querySnapshot = await getDocs(foodItemQuery);
    querySnapshot.forEach((doc) => {
      const foodItem = doc.data();
      foodItem.id = doc.id;
      foodItem.percentDonated = (foodItem.donated !== 0 && foodItem.requested !== 0) ? (foodItem.donated / foodItem.requested) : 0;
      this.foodItems.push(foodItem);
    });
    this.foodItems.sort((a,b) => a.percentDonated - b.percentDonated);
  }
}
</script>
  
<style scoped>
div.background {
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  background-color: #F8F3E8;
}

div.transbox {
  margin: 30px;
  background-color: #f9fdfd;
  border: 1px solid black;
  opacity: 0.8;
  font-family: Avenir, Arial, Helvetica, sans-serif;
}

div.content {
margin: 5%;
font-weight: bold;
color: #000000;
font-family: Avenir, Arial, Helvetica, sans-serif;
}

.header {
  font-family: Avenir, Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 3em;
  color: #2c3e50;
}

.food {
    text-align: left;
    margin-bottom: 8px;
    font-weight: bold;
    font-size: 30px;
    font-family: Avenir, Arial, Helvetica, sans-serif;
}

.percent {
    text-align: right;
    margin-top: 8px;
    font-weight: bolder;
    font-size: 25px;
    font-family: Avenir, Arial, Helvetica, sans-serif;
}

.foodCont {
  display: flex;
  justify-content: center;
  margin-bottom: 16px; /* Add some margin to separate the button from the progress bar */
}

.button {
  background-color:#779ECB;
  border-radius: 25px;
  margin: 40px 50px 20px 0px;
  display: inline-block;
  padding: 12px 24px;
  font-size: 22px; 
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  font-family: Avenir, Arial, Helvetica, sans-serif;
  opacity: 0.8;
}

.button:hover {
    background-color: #F6C7B3;
    box-shadow: 3px 3px grey;
    color: #2c3e50;
}

.button:active {
  transform: translateY(2px);
  box-shadow: none;
}
</style>