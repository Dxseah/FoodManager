<template>
    <div class='background'>
      <div class="transbox">
        <div class="content">
          <div class="button-container">
              <router-link to="/donorform" class="button">Go to Donor Form</router-link>
            </div>
            <br>
            <h1 class="header"> Track Food Item Progress </h1>
            <h3 class="food">{{  food }}</h3>
            <!-- To Do: Pass in value to next 2 lines -->
            <ProgressBar :percentComplete="percent"/>
            <h3 class="percent">{{ donatedRice }} / {{ requestedRice }} raised</h3>
            <h3 class="percent"> {{ percent }}% completed</h3>
        </div>
      </div>
    </div>
</template>
  
<script>
import { getDefaultEmulatorHostnameAndPort } from '@firebase/util';
import ProgressBar from '../ProgressBar.vue'
import { getDoc, doc, updateDoc, setDoc, collection } from "firebase/firestore"
import { db } from '@/firebase'
import { query, where, getDocs } from 'firebase/firestore';
  
export default { 
  name: "DonorHomePage",
  components:{
          ProgressBar,
      },

  data() {
      return {
           food: "Rice",
           donatedRice: null,
           requestedRice: null,
           percent: null
      };
  },

  async created() {
    const queryDonated = query(collection(db, 'DonatedFood'))
    const queryDonatedSnapshot = await getDocs(queryDonated);
    const sumDonated = queryDonatedSnapshot.docs.map(doc => doc.data().rice);
    this.donatedRice = sumDonated.reduce((acc, val) => acc + val, 0);

    const queryRequested = query(collection(db, 'RequestedFood'));
    const queryRequestedSnapshot = await getDocs(queryRequested);
    const sumRequested = queryRequestedSnapshot.docs.map(doc => doc.data().rice);
    this.requestedRice = sumRequested.reduce((acc, val) => acc + val, 0);

    this.percent = parseFloat(this.donatedRice / this.requestedRice * 100).toFixed(1);
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
        font-weight: bold;
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