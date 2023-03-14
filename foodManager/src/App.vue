

<script>
  import router from '@/components/Router/index.js'
  import { auth } from './firebase.js'
  import { signOut,onAuthStateChanged } from 'firebase/auth'
  export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false,
      displayName: ''
    }
  },
  beforeUpdate() {
    if (auth.currentUser) {
      console.log('here')
      this.isLoggedIn = true
      this.displayName = auth.currentUser.displayName
    }
  },
  methods: {
    signOut() {
      signOut(auth)
      .then(() => {
        console.log('signed out')
        this.isLoggedIn = false
        router.push('/')
      })
    }
  }
}
</script>

<template>
<nav>
  <div id="nav">
    |<router-link to = "/"> Login </router-link>|
    <router-link to = "/home"> Home </router-link>|
    <router-link to = "/profile"> Profile </router-link>|
    <router-link to = "/about"> About Us </router-link>|
    <!-- isLoggedIn is buggy, sometimes displayName doesn't load after refreshing page -->
    <h1 v-if=isLoggedIn id="displayName">Welcome, {{displayName}}!</h1>
    <h1 v-else id="displayName">Welcome, user!</h1>
    <!-- <router-link to = "/signup"> Beneficiary Sign Up </router-link>|
    <router-link to = "/donorsignup"> Donor Sign Up </router-link>| -->
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
  color:#20be77;
  font-weight: bold;
}

#displayName {
  font-size: 25px;
  font-weight: bold;
}
</style>
