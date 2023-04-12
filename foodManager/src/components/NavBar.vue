<template>
<nav>
  <div v-if="user" id="nav">
    <!-- <p> {{user.data}}</p> -->
    <router-link to = "/donorhome"> Donor Home </router-link>|
    <router-link to = "/beneficiaryhome"> Beneficiary Home </router-link>|
    <router-link to = "/adminhome"> Admin Home </router-link> |
    <router-link to = "/donorprofile"> Donor Profile </router-link>|
    <router-link to = "/beneficiaryprofile"> Beneficiary Profile </router-link>|
    <router-link to = "/about"> About Us </router-link>|
    <!-- isLoggedIn is buggy, sometimes displayName doesn't load after refreshing page -->
    <h1 id="displayName">Welcome, {{user.displayName}}!</h1>
  </div>
  <div v-else id="nav">
    |<router-link to = "/"> Login </router-link>|
    <router-link to = "/about"> About Us </router-link>|
    <!-- <h1 id="displayName">Welcome!</h1> -->
  </div>
  <router-view :key="$route.fullPath"/> 
</nav>
</template>
<script>
  import router from '@/components/Router/index.js'
  // import { useStore } from "vuex"
  // import { computed } from "vue";
  import firebaseApp from '@/firebase.js';
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import { getDoc, doc, updateDoc, setDoc, collection } from "firebase/firestore"
  import { db } from '@/firebase'
  export default {
    name: "App", 
    data() {
      return {
        user: false,
        account:false
      }
    }, 

    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth,(user)=>{
        if (user) {
          this.user = user;
          const docRef = doc(db, "User", this.user.displayName);
          const docSnap = getDoc(docRef)
          .then((doc) => {
            if (doc.exists()) {
              console.log("Document data:", doc.data());
              // retrieve all instances from DonatedFood where userEmail matches current user's email
              this.account = doc.data().type;
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.error("Error getting document:", error);
          });
      }
    })
  }
  }

</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
}

#nav {
  padding: 30px; 
  /* background-color: antiquewhite; */
}
#nav a {
  font-weight: bold;
  color:#2c3e50;
  font-size: 20px;
}
#nav a.router-link-exact-active{
  color:chocolate;
  font-weight: bold;
}

#displayName {
  font-size: 25px;
  font-weight: bold;
}
</style>
