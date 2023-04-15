<template>
  <div class="container1" v-if="user">
    <div class="cont" v-if="exists">
        <div class="card-body">
          <div class="alert alert-success" role="alert">
            You are logged in!
            <!-- <Logout/> -->
          </div>
        </div>

        <table id="currTable">
          <tr>
            <th>Name</th>
            <td> {{userData.name}} </td>
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
            <td> {{userData.contact}} </td>   
          </tr>

      </table>

      <br>

      <div class="donHist" v-if = "account=='Donor'">
         <h1 class="header">Food Donation History</h1>
        <div v-if="donations.length === 0">You have not made any donations yet!</div>
        <div v-else>
      <div v-for="(donation, index) in donations" :key="index">
      <div v-for="(value, key) in donation" :key="key">
      <template v-if="key !== 'userEmail'">
        <p>{{ key }}: {{ value }}</p>
      </template>
    </div>
    <hr>
    </div>
  </div>
  <br>

      </div>
      <div v-else>
        <br>
        <h1 class="header">Food Request History</h1>
        <div class="noReq" v-if="requests.length === 0">You have not made any requests yet!</div>
        <div v-else>
        <div v-for="(request, index) in requests" :key="index">
        <div v-for="(value, key) in request" :key="key">
        <template v-if="key !== 'userEmail'">
          <p>{{ key }}: {{ value }}</p>
        </template>
      </div>
    <hr>
    </div>
  </div>
  <br>

        
      </div>
      <br>
      
      <button id="btn" @click="update()">Update Profile Details </button><br>
      <!-- <button id="btn" @click="signOut()" v-if="user"> Logout </button>  -->
      <Logout/>
      
    </div>
  
    <div v-else-if = "!exists">
        <Details/>
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
  name: "DonorProfilePage", 
  components: {
    Logout, Details
  }, 

  data() {
    return {
      user: false,
      exists: false,
      donations: [],
      userData: false,
      account: false,
      requests: []
    }
  }, 

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        const docRef = doc(db, "User", this.user.displayName);
        // const docName = doc.name; 
        const docSnap = getDoc(docRef)
          .then((doc) => {
            if (doc.exists()) {
              console.log("Document data:", doc.data());
              this.exists = true;
              this.userData = doc.data();
              // retrieve all instances from DonatedFood where userEmail matches current user's email
              
              this.account = this.userData.type;
              if (this.account=="Donor") {
              const donatedFoodRef = collection(db, "DonatedFood");
              const q = query(donatedFoodRef, where("userEmail", "==", this.user.email));
              const donatedFoodSnapshot = getDocs(q)
                .then((querySnapshot) => {
                  const data = [];
                  querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    data.push(doc.data());
                  });
                  this.donations = data;
                })                
                .catch((error) => {
                  console.log("Error getting donated food documents: ", error);
                });
              } else {
                const requestedFoodRef = collection(db, "RequestedFood");
                const q = query(requestedFoodRef, where("userEmail", "==", this.user.email));
                const requestedFoodSnapshot = getDocs(q)
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
              }
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
      if (this.userData.type == "Donor") {
        router.push('/updatedonorprofile')
      } else {
        router.push('/updatebeneficiaryprofile')
      }
      
    },

  }
}
</script>

<style scoped>
.container1 {
    background-color: #F8F3E8;
    width: 100vw;
    height: 105vh;
    align-content: center;
    padding: 100px;
    font-family: Avenir, Arial, Helvetica, sans-serif;
    font-size: 20px;
    color: #2c3e50;

  }
.container2 {
    background-color: #F8F3E8;
    width: 100vw;
    height: 100vh;
    align-content: center;
    padding: 100px;
    font-family: Avenir, Arial, Helvetica, sans-serif;
    font-size: 20px;
  }

.cont {
  align-content: center;
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
  align-content: center;
  background-color:#779ECB;
  border-radius: 25px;
}

#btn:hover {
    background-color: #F6C7B3;
    box-shadow: 3px 3px grey;
}

.header {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.alert {
  text-align: center;
}

.donHist {
  text-align: center;
}

.noReq {
  text-align: center;
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