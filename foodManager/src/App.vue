

<script>
  import router from '@/components/Router/index.js'
  import {useStore} from "vuex"
  import { auth } from './firebase.js'
  import {computed} from "vue";
  import { signOut,onAuthStateChanged } from 'firebase/auth'
  export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false,
      displayName: ''
    }
  },
  setup() {
    const store = useStore()
    auth.onAuthStateChanged(user => {
    store.dispatch("fetchUser", user);
  });
    const user = computed(() => {
    return store.getters.user;
  });
  const signOut = async () => {
        await store.dispatch('logOut')
        router.push('/')
  }

    return {user,signOut}
 },
  // beforeUpdate() {
  //   if (auth.currentUser) {
  //     console.log('here')
  //     this.isLoggedIn = true
  //     this.displayName = auth.currentUser.displayName
  //   }
  // },
  // methods: {
  //   signOut() {
  //     signOut(auth)
  //     .then(() => {
  //       console.log('signed out')
  //       this.isLoggedIn = false
  //       router.push('/')
  //     })
  //   }
  // }
}
</script>

<template>
<nav>
  <div v-if="user.loggedIn" id="nav">
    
    <router-link to = "/donorhome"> Donor Home </router-link>|
    <router-link to = "/beneficiaryhome"> Beneficiary Home </router-link>|
    <router-link to = "/profile"> Profile </router-link>|
    <router-link to = "/about"> About Us </router-link>|
    <!-- isLoggedIn is buggy, sometimes displayName doesn't load after refreshing page -->
    <h1 id="displayName">Welcome, {{user.data.displayName}}!</h1>
  </div>
  <div v-else id="nav">
    |<router-link to = "/"> Login </router-link>|
    <router-link to = "/about"> About Us </router-link>|
    <h1 id="displayName">Welcome, user!</h1>
  </div>
  <router-view/>
</nav>
</template>

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
