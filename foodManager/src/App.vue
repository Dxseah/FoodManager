<template>
  <!-- trying to add website icon -->
  <!-- <link rel="icon" type="png" img :src="'../src/assets/icon.png'"> -->
<nav>
  <div v-if="user" id="nav">
    <!-- <p> {{user.data}}</p> -->
    <span v-if="account=='Donor'">
      <img src="../src/assets/iconwithname.png" alt="Logo" width="250" height="250">
      <router-link to = "/donorhome"> Donor Home </router-link>|
    </span>
    <span v-else-if="account=='Beneficiary'">
      <img src="../src/assets/iconwithname.png" alt="Logo" width="250" height="250">
      <router-link to = "/beneficiaryhome"> Beneficiary Home </router-link>|
    </span>
    <span v-else-if="account=='Admin'">
      <img src="../src/assets/iconwithname.png" alt="Logo" width="250" height="250">
      <router-link to = "/adminhome"> Admin Home </router-link> |
    </span>
    <!-- <span v-else>
      {{userData}}
    </span> -->
    <router-link to = "/profile"> Profile </router-link>|
    <!-- <router-link to = "/beneficiaryprofile"> Beneficiary Profile </router-link>| -->
    <router-link to = "/about"> About Us </router-link>|
    <!-- isLoggedIn is buggy, sometimes displayName doesn't load after refreshing page -->
    <h1 id="displayName">Welcome, {{userData.name}}!</h1>
  </div>
  <div v-else id="nav">
    <span>
      <img src="../src/assets/iconwithname.png" alt="Logo" width="150" height="150">
      |<router-link to = "/"> Login </router-link>|
    </span>
    <!-- |<router-link to = "/"> Login </router-link>| -->
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
  import { db } from '@/firebase'
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import { getDoc, doc, updateDoc, setDoc, collection } from "firebase/firestore"
  export default {
    name: "App", 
    data() {
      return {
        user: false,
        account:false,
        userData:false
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
              this.account = doc.data().type;
              this.userData=doc.data();
              console.log(this.account)
            } else {
              console.log("No such document!");
              // window.location.reload();
            }
          })
          .catch((error) => {
            console.error("Error getting document:", error);
          });
      }
    })
  },

  }

</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  width: 100vw;
}

#nav {
  padding: 20px 0px 10px 0px;
  /* background-color: antiquewhite; */
  text-align: center;
  align-items: center;
}
#nav a {
  font-weight: bold;
  color:#2c3e50;
  font-size: 20px;
  /* text-align: center; */
}
#nav a.router-link-exact-active{
  color:#5B96A9;
  /* font-weight: bold; */
}

#displayName {
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;

}
</style>
