<template>

<nav>
  <div v-if="user" id="nav">

    <span v-if="account=='Donor'">
      <router-link to = "/donorhome"> Donor Home </router-link>|
    </span>
    <span v-else-if="account=='Beneficiary'">
      <router-link to = "/beneficiaryhome"> Beneficiary Home </router-link>|
    </span>
    <span v-else-if="account=='Admin'">
      <router-link to = "/adminhome"> Admin Home </router-link> |
    </span>

    <router-link to = "/profile"> Profile </router-link>|
    <router-link to = "/about"> About Us </router-link>|
    <div id='welcometag'>
      <img src="../src/assets/iconwithname.png" alt="Logo">
      <h1 id="displayName">Welcome, {{userData.name}}!</h1>
    </div>
  </div>
  <div v-else id="nav">
    <span>
      <img src="../src/assets/iconwithname.png" alt="Logo" width="150" height="150">
      |<router-link to = "/"> Login </router-link>|
    </span>
    <router-link to = "/about"> About Us </router-link>|
  </div>
  <div id="routerCont">
  <router-view :key="$route.fullPath"/> 
  </div>
</nav>
</template>

<script>
  import router from '@/components/Router/index.js'
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
img {
  height: 5em; width: auto; display: inline-block;
}

#welcometag {
  display: flex;
  align-items: center;
  position:absolute;
  left:50%;
  top:140%;
  transform: translate(-50%, -50%);
}
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  width: 100vw;
}

#nav {
  margin-top: 50px;
  padding: 25px 0px 10px 0px;
  position:absolute;
  left:50%;
  transform: translate(-50%, -50%);
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
#routerCont {
  margin-top: 10%;
}
#displayName {
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;

}
</style>
