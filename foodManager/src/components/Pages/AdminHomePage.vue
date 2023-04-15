<template>
    <div class='background'>
      <div class="transbox">
        <div class="content">
            <h1 class="newHeader">Food Items</h1><br>
            <div class = "foodCont">
              <router-link to="/adminform" class="button">Edit Food Quantities</router-link>
              <router-link to="/adminnewform" class="button">Add New Food Item</router-link>
              <button class="button">Delete Food Item</button><br><br>
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
  
}
.foodCont {
  min-height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
div.transbox {
  margin: 30px;
  background-color: #ffffff;
  border: 1px solid black;
  opacity: 0.8;
}

div.content {
margin: 5%;
font-weight: bold;
color: #000000;
}

.header {
  font-family: Marker Felt, Avenir, Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 3em;
}
.food {
    text-align: left;
    margin-bottom: 8px;
    font-weight: bolder;
    font-size: 30px;
}

.percent {
    text-align: right;
    margin-top: 8px;
    font-weight: bolder;
    font-size: 25px;
}

.button {
margin:5px;
display: inline-block;
padding: 12px 24px;
background-color: #0492C2;
color: #fff;
font-size: 24px; /* Increase the font size */
font-weight: bold;
text-decoration: none;
border: none; /* Remove the border */
border-radius: 8px;
cursor: pointer;
transition: all 0.3s ease;
}

/* Add hover styles */
.button:hover {
background-color: #779ECB;
box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
}

/* Add active styles */
.button:active {
transform: translateY(2px);
box-shadow: none;
}
</style>