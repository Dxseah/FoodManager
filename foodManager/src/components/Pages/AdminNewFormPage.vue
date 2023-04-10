<template>
    <div class="background">
      <div class="transbox">
        <div class="content">
          <h1 class="header2">Add New Food Item </h1>
          <form class="form2" @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">New Food Item Name</label>
              <input type="string" id="name" v-model.number="name"/>
            </div>
            <div class="form-group">
              <label for="target-quantity">Target Quantity </label>
              <input type="number" id="target-quantity" v-model.number="targetQuantity" min="0" />
            </div>
            <!-- <div class="form-group">
              <label for="measure">Measuring Unit</label>
              <input type="string" id="measure" v-model.number="measure"/>
            </div> -->
            <button class="add-button" v-on:click="addAlert">Add New Food Item</button>
            <br>
            <router-link to="/adminhome" class="button">Back to Home Page</router-link>
          </form>
        </div>
      </div>
    </div>
  </template>

<script>
import { db } from "@/firebase";
import { getDoc, doc, setDoc, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "AdminNewFormPage",
  data() {
    return {
        targetQuantity: 0
    };
    },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },
  methods: {
    async submitForm() {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        // Save data to Firestore
        const foodItemRef = collection(db, 'FoodCollection');
        const docRef = doc(foodItemRef);
        const docSnap = await getDoc(docRef);
        const requestedData = {
            name: this.name,
            donated: 0,
            requested: this.targetQuantity,
        };
        if (docSnap.exists()) {
          await setDoc(doc(db, 'FoodCollection', this.name), requestedData, { merge: true });
        } else {
          await setDoc(doc(db, 'FoodCollection', this.name), requestedData);
        };
        console.log("Form submitted");
    }
    catch (err) {
        alert(err.message)
    }
  },
  async addAlert() {
    alert("New food item is added!")
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

input[type="number"] {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-size: 1.2em;
  margin-bottom: 20px;
  width: 100%;
}

input[type="string"] {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-size: 1.2em;
  margin-bottom: 20px;
  width: 100%;
}

.add-button {
  background-color: silver;
}

</style>