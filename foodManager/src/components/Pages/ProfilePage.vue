<template>
  <div class="container1" v-if="user">
    <div class="cont" v-if="exists">
        <div class="card-body">
          <div class="alert alert-success" role="alert">
            You are logged in!
            <!-- <Logout/> -->
            <!-- HTML !-->
          </div>
        </div>

        <table id="currTable">
          <tr>
            <th>Name</th>
            <td> {{userData.name}} </td>
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
        <table class="requestHist">
          <tr>
            <th> Items </th>
            <th> Quantity </th>
          </tr>
          <tr>
            <td>{{ key }}</td>
            <td> {{ value }} </td>
          </tr>
        </table>
        <!-- <p>{{ key }}: {{ value }}</p> -->
      </template>
    </div>
    <hr>
    </div>
  </div>
  <br>

      </div>
      <div v-if = "account=='Beneficiary'">
        <br>
        <h1 class="header">Food Request History</h1>
        <div class="noReq" v-if="requests.length === 0">You have not made any requests yet!</div>
        <div v-else>
        <div v-for="(request, index) in requests" :key="index">
        <div v-for="(value, key) in request" :key="key">
        <template v-if="key !== 'userEmail'">
          <table class="requestHist">
          <tr>
            <th> Items </th>
            <th> Quantity </th>
          </tr>
          <tr>
            <td>{{ key }}</td>
            <td> {{ value }} </td>
          </tr>
        </table>
        </template>
      </div>
    <hr>

    </div>
  </div>
  <br>

      </div>
      <br>
      <div class="butCont">
      <button id="btn" @click="update()">Update Profile Details </button><br>
      <Logout/>
      </div>

    </div>
    <span v-else-if = "!exists">
        <Details/>
    </span>
    
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
  name: "ProfilePage", 
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
      } else if (this.userData.type == "Beneficiary") {
        router.push('/updatebeneficiaryprofile')
      } else {
        router.push('/updateadminprofile')
      }
      
    },

  }
}
</script>

<style scoped>
.container1 {

    border: 1px solid black;
    text-align: center; 
    padding-top: 10px;
    background-size: cover;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-repeat: no-repeat;
    height: auto;
    width: 100vw;
    background-color: #f9fdfd;
    opacity: 0.8;
    font-size: 20px;
    color: #2c3e50;
    align-content: center;
    font-family: Avenir, Arial, Helvetica, sans-serif;  
    border-radius: 25px;
  }

.butCont{
  align-items: center;
  justify-content: center;

}
/* .cont {
  align-content: center;
} */

#currTable {
  text-align: center;
  margin:auto;
  width: 80%;
  border-collapse: collapse;
  border: 1px solid;
}

#btn {
  background-color:#779ECB;
  border-radius: 25px;
  margin: 5px;
  display: inline-block;
  padding: 12px 24px;
  font-size: 20px; 
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
}

#btn:hover {
    background-color: #F6C7B3;
    box-shadow: 3px 3px grey;
    color: #2c3e50;
}

#btn:active {
  transform: translateY(2px);
  box-shadow: none;
}

.header {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.alert {
  text-align: center;
  margin-bottom: 10px;
  font-weight: bold;
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
  background-color: #CDE8E6 ;
  font-weight: bold;
}

.requestHist {
  table-layout: fixed;
  width: 100%;
  margin: auto;
  text-align: center;
}

.requestHist th,
.requestHist td {
  text-align: center;
  width: 50%;
}

</style>