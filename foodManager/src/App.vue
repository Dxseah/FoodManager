<template>
<nav>
  <div v-if="user" id="nav">
    <!-- <p> {{user.data}}</p> -->
    <router-link to = "/donorhome"> Donor Home </router-link>|
    <router-link to = "/beneficiaryhome"> Beneficiary Home </router-link>|
    <router-link to = "/profile"> Profile </router-link>|
    <router-link to = "/about"> About Us </router-link>|
    <!-- isLoggedIn is buggy, sometimes displayName doesn't load after refreshing page -->
    <h1 id="displayName">Welcome, {{user.displayName}}!</h1>
  </div>
  <div v-else id="nav">
    |<router-link to = "/"> Login </router-link>|
    <router-link to = "/about"> About Us </router-link>|
    <h1 id="displayName">Welcome!</h1>
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

  export default {
    name: "App", 
    data() {
      return {
        user: false,
      }
    }, 

    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth,(user)=>{
        if (user) {
          this.user = user;
        }
      })
    }
  }

  // export default {
  // name: 'App',
//   setup() {
//     const store = useStore()
//     auth.onAuthStateChanged(user => {
//     console.log('here3')
//     store.dispatch("fetchUser", user);
//   });
//     const user = computed(() => {

//     return store.getters.user;
//   });
//   const signOut = async () => {
//         await store.dispatch('logOut')
//         router.push('/')
//   }
//     return {user,signOut}
//  },
// }

// // copy to all the pages
// import firebaseApp from '@/firebase.js';
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// export default {
//   name: "ProfilePage", 
//   data() {
//     return {
//       user: false,
//     }
//   }, 

//   mounted() {
//     const auth = getAuth();
//     onAuthStateChanged(auth,(user)=>{
//       if (user) {
//         this.user = user;
//       }
//     })
//   }
// }
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
  background-color: antiquewhite;
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
