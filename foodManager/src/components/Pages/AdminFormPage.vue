<template>
    <div class="background">
      <div class="transbox">
        <div class="content">
          <h1 class="header">Add Food Item</h1>
          <form class="form"  @submit.prevent="submitForm">
            <button class="submit-button" v-on:click="submitAlert">Add Food Item</button>
          </form>
            <br>
            <router-link to="/adminhome">Back to Home Page</router-link>
        </div>
      </div>
    </div>
  </template>

<script>
import { db } from "@/firebase";
import { getDoc, doc, setDoc, collection, QuerySnapshot, query } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "AdminFormPage",
  data() {
    return {
      FoodCollection: []
    };
    },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
    this.fetchFoodCollection();
  },
  
  methods: {
    async fetchFoodCollection() {
      const foodItemRef = collection(db, "FoodCollection");
      const docRef = doc(foodItemRef);
      const docSnap = await getDoc(docRef)
        .then((querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            data.push(doc.data());
          });
          this.FoodCollection = data;
        })
    },

    async submitAlert() {
      alert("Food item is added!")
    }
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