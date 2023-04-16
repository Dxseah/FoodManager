<template>

<nav class="appCont">
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
    <Logout/>
    <div id='welcometag'>
      <img src="../src/assets/iconwithname.png" alt="Logo">

      <h1 id="displayName">Welcome {{userData.name}}!</h1>
      <img src="../src/assets/iconwithname.png" alt="Logo">
    </div>
  </div>
  <div v-else id="nav">
    <span id='welcometag'>
      <img src="../src/assets/iconwithname.png" alt="Logo">
      |<router-link to = "/"> Login </router-link> 
      <h1 id='here'> &nbsp;&nbsp; </h1>
      <router-link to = "/about"> About Us </router-link>|
      <img src="../src/assets/iconwithname.png" alt="Logo">

    </span>

  </div>
  <div id="routerCont">
  <router-view class="router-view" :key="$route.fullPath"/> 
  </div>
</nav>
</template>

<script>
  import router from '@/components/Router/index.js'
  import firebaseApp from '@/firebase.js';
  import Logout from '@/components/Logout.vue';
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
    components: {
        Logout
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
  height: 8em; width: auto; display: inline-block;
}
/* 
.router-view {
  margin-top: 100px;
} */
#welcometag {
  display: flex;
  align-items: center;
  justify-content: center;

} 
#here {
  color:#2c3e50;
  font-size: 35px;
  font-weight: bold;

}
#welcometag h1 {
  white-space: nowrap;
  display: inline-block;
}

#app {
  font-family: Avenir, Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  width: 100vw;
}
#appCont{
  display: flex;
  flex-direction: column;
}
#nav {
  padding: 25px 0px 10px 0px;
  transform: scale();
  /* background-color: antiquewhite; */
  text-align: center;
  align-items: center;
}
#nav a {
  font-weight: bold;
  color:#2c3e50;
  font-size: 35px;
  /* text-align: center; */
}

#nav a:hover {
  background-color: #F6C7B3;
  box-shadow: 3px 3px grey;
  color: #2c3e50;
}

#nav a.router-link-exact-active{
  color:#5B96A9;
  /* font-weight: bold; */
}
#routerCont {
  margin-top: 1%;
}
#displayName {
  font-size: 30px;
  font-weight: bold;
  color: #2c3e50;
}
</style>
