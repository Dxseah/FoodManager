<template>
  <div class="container1" v-if="user">
    <div v-if="exists">
      <div class="card-body">
        <div class="alert alert-success" role="alert">
          You are logged in!
          <!-- <Logout/> -->
        </div>
      </div>

      <table id="currTable">
        <tr>
          <th>Name</th>
          <td> {{user.displayName}} </td>
        </tr>
        <tr>
          <th>User ID</th>
          <td> {{user.uid}} </td>
        </tr>
        <tr>
          <th>Email</th>
          <td> {{user.email}} </td>
        </tr>
        <tr>
          <th>Contact</th>
          <td> Sample Contact </td>   
        </tr>
        <!-- <tr>
          <th>Account Type</th>
          <td v-if="user.data.account==2"> Donor </td>
          <td v-else-if="user.data.account==1"> Beneficiary </td>
        </tr> -->

      </table>
      <br>

      <div>
  <h1 class="header">Food Request History</h1>
  <div v-if="requests.length === 0">You have not made any requests yet!</div>
  <table v-else>
    <thead>
      <tr>
        <th>Bags of Rice</th>
        <th>Canned Food</th>
        <th>Packs of Instant Noodles</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(request, index) in requests" :key="index">
        <td>{{ request.rice }}</td>
        <td>{{ request.cannedFood }}</td>
        <td>{{ request.instantNoodles }}</td>
      </tr>
    </tbody>
  </table>
</div>
      <br>

      <button id="btn" @click="update()">Update Profile Details </button><br>
      <!-- <button id="btn" @click="signOut()" v-if="user"> Logout </button>  -->
      <Logout/>
    </div>
    <div v-else>
    </div>

  </div>

  <div v-else class = "container2"> 
    <div class="alert alert-danger" role="alert">
        You are logged out!
    </div>
  </div>
</template>

<script>
import Details from '@/components/Details.vue'
import Logout from '@/components/Logout.vue';
import firebaseApp from '@/firebase.js';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import router from '@/components/Router/index.js'
import { getDoc, doc, updateDoc, setDoc, collection } from "firebase/firestore"
import { db } from '@/firebase'
import { query, where, getDocs } from 'firebase/firestore';

export default {
  name: "BeneficiaryProfilePage", 
  components: {
    Logout, Details
  }, 

  data() {
    return {
      user: false,
      exists: false,
      requests: []
    }
  }, 

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        const docRef = doc(db, "User", this.user.displayName);
        const docSnap = getDoc(docRef)
          .then((doc) => {
            if (doc.exists()) {
              console.log("Document data:", doc.data());
              this.exists = true;

              // retrieve all instances from DonatedFood where userEmail matches current user's email
              const donatedFoodRef = collection(db, "RequestedFood");
              const q = query(donatedFoodRef, where("userEmail", "==", this.user.email));
              const donatedFoodSnapshot = getDocs(q)
                .then((querySnapshot) => {
                  const data = [];
                  querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    data.push(doc.data());
                  });
                  this.requests = data;
                })
                .catch((error) => {
                  console.log("Error getting donated food documents: ", error);
                });

            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.error("Error getting document:", error);
          });
      }
    })
  },

  methods: {
    update() {
      const auth = getAuth(); 
      const user = auth.currentUser; 
      router.push('/updatebeneficiaryprofile'); 
    },
    signOut() {
      const auth = getAuth(); 
      const user = auth.currentUser; 
      signOut(auth, user);
      router.push('/');
      window.location.reload();
    }
  }
}
</script>

<style scoped>
.container1 {
    background-color: aliceblue;
    width: 100vw;
    height: 100vh;
    align-content: center;
    padding: 100px;
    font-family: Avenir, Arial, Helvetica, sans-serif;
    font-size: 20px;
  }
.container2 {
    background-color: aliceblue;
    width: 100vw;
    height: 100vh;
    align-content: center;
    padding: 100px;
    font-family: Avenir, Arial, Helvetica, sans-serif;
    font-size: 20px;
  }

#currTable {
  text-align: left;
  width: 100%;
  border-collapse: collapse;
  border: 1px solid;
}

#btn {
    text-align: center;
    margin: auto;
} 

#btn:hover {
    color: rgb(243,236,236);
    background-color: rgb(255,94,0);
    box-shadow: 3px 3px grey;
}

.header {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

th, td {
  padding: 0.5rem;
  text-align: center;
  border: 1px solid #ccc;
}

th {
  background-color: #f2f2f2;
}

</style>