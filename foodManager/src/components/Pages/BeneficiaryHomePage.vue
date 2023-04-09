<template>
    <div class='background'>
      <div class="transbox">
        <div class="content">
          <div class="button-container">
              <router-link to="/beneficiaryform" class="button">Go to Beneficiary Form</router-link>
            </div>
            <br>
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
    name: "BeneficiaryHomePage",
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
      this.foodItems.push(foodItem);
    });
  }
}
</script>
  
  <style scoped>
    div.background {
      background: url(https://www.efsa.europa.eu/sites/default/files/styles/share_opengraph/public/news/food-donations.jpg?h=82f92a78&itok=3k3shqTm);
      border: 2px solid black;
      background-size: cover;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-repeat: no-repeat;
      height: 100vh;
      width: 100vw;
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
    .button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 16px; /* Add some margin to separate the button from the progress bar */
}

.button {
  display: inline-block;
  padding: 12px 24px;
  background-color: #00bfff;
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
  background-color: #0080ff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
}

/* Add active styles */
.button:active {
  transform: translateY(2px);
  box-shadow: none;
}
  </style>