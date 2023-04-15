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
            <button class="add-button" v-on:click="addAlert">Add New Food Item</button>
            <br>
            <router-link to="/adminhome" class="routerbutton">Back to Home Page</router-link>
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

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
  width: 100%;
}

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

input[type="string"] {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-size: 1.2em;
  margin-bottom: 20px;
  width: 100%;
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