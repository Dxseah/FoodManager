<template>
    <div class='background'>
      <div class="transbox">
        <div class="content">
            <h1 class="newHeader">Food Items</h1><br>
            <router-link to="/adminform" class="button">Add Food Item</router-link><br><br>
            <router-link to="/adminnewform" class="button">Add New Food Item</router-link>
            <h1 class="header"> Track Food Item Progress </h1>
            <h3 class="food">Rice</h3>
            <ProgressBar :percentComplete="displayRice"/>
            <h3 class="percent">{{ donatedRice }} / {{ requestedRice }} raised</h3>
            <h3 class="percent"> {{ percentRice }}% completed</h3>
            <h3 class="food">Canned Food</h3>
            <ProgressBar :percentComplete="displayCannedFood"/>
            <h3 class="percent">{{ donatedCannedFood }} / {{ requestedCannedFood }} raised</h3>
            <h3 class="percent"> {{ percentCannedFood }}% completed</h3>
            <h3 class="food">Instant Noodles</h3>
            <ProgressBar :percentComplete="displayInstantNoodles"/>
            <h3 class="percent">{{ donatedInstantNoodles }} / {{ requestedInstantNoodles }} raised</h3>
            <h3 class="percent"> {{ percentInstantNoodles }}% completed</h3>
        </div>
        <div class>
            <button id="saveChangesBtn">Save Changes</button>
            <button id="deleteBtn">Delete Food Item</button>
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
    //  food: "Rice",
      donatedRice: null,
      requestedRice: null,
      percentRice: null,
      displayRice: null,
      donatedCannedFood: null,
      requestedCannedFood: null,
      percentCannedFood: null,
      displayCannedFood: null,
      donatedInstantNoodles: null,
      requestedInstantNoodles: null,
      percentInstantNoodles: null,
      displayInstantNoodles: null,
  }
},

  async created() {
    const queryDonated = query(collection(db, 'DonatedFood'))
    const queryDonatedSnapshot = await getDocs(queryDonated);

    const queryRequested = query(collection(db, 'RequestedFood'));
    const queryRequestedSnapshot = await getDocs(queryRequested);

    const sumDonatedRice = queryDonatedSnapshot.docs.map(doc => doc.data().rice);
    this.donatedRice = sumDonatedRice.reduce((acc, val) => acc + val, 0);
    const sumRequestedRice = queryRequestedSnapshot.docs.map(doc => doc.data().rice);
    this.requestedRice = sumRequestedRice.reduce((acc, val) => acc + val, 0);
    this.percentRice = parseFloat(this.donatedRice / this.requestedRice * 100).toFixed(1);
    this.displayRice = Math.min(this.percentRice, 100);

    const sumDonatedCannedFood = queryDonatedSnapshot.docs.map(doc => doc.data().cannedFood);
    this.donatedCannedFood = sumDonatedCannedFood.reduce((acc, val) => acc + val, 0);
    const sumRequestedCannedFood = queryRequestedSnapshot.docs.map(doc => doc.data().cannedFood);
    this.requestedCannedFood = sumRequestedCannedFood.reduce((acc, val) => acc + val, 0);
    this.percentCannedFood = parseFloat(this.donatedCannedFood / this.requestedCannedFood * 100).toFixed(1);
    this.displayCannedFood = Math.min(this.percentCannedFood, 100);

    const sumDonatedInstantNoodles = queryDonatedSnapshot.docs.map(doc => doc.data().instantNoodles);
    this.donatedInstantNoodles = sumDonatedInstantNoodles.reduce((acc, val) => acc + val, 0);
    const sumRequestedInstantNoodles = queryRequestedSnapshot.docs.map(doc => doc.data().instantNoodles);
    this.requestedInstantNoodles = sumRequestedInstantNoodles.reduce((acc, val) => acc + val, 0);
    this.percentInstantNoodles = parseFloat(this.donatedInstantNoodles / this.requestedInstantNoodles * 100).toFixed(1);
    this.displayInstantNoodles = Math.min(this.percentInstantNoodles, 100);
  },
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
      font-weight: bolder;
      font-size: 3em;
    }

    .newHeader {
      font-family: Marker Felt, Avenir, Arial, Helvetica, sans-serif;
      font-weight: bolder;
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

#saveChangesBtn, .button {
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
#saveChangesBtn:hover , .button:hover {
  background-color: #0080ff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
}

/* Add active styles */
#saveChangesBtn:active, .button:active{
  transform: translateY(2px);
  box-shadow: none;
}

#deleteBtn {
  display: inline-block;
  padding: 12px 24px;
  background-color: crimson;
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
#deleteBtn:hover {
  background-color: darkred;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
}

/* Add active styles */
#deleteBtn:active {
  transform: translateY(2px);
  box-shadow: none;
}
  </style>