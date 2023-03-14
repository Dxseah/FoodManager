

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
    <h1>{{displayName}}</h1>

    <router-link to = "/"> Login Page </router-link>|
    <router-link to = "/profile"> Profile Page </router-link>|
    <router-link to = "/about"> About Page </router-link>|
    <router-link to = "/signup"> Beneficiary Sign Up </router-link>|
    <router-link to = "/donorsignup"> Donor Sign Up </router-link>|
    
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
  height: 100vh;
}
#nav {
  padding: 30px; 
  background-color: antiquewhite;
}
#nav a {
  font-weight: bold;
  color:#2c3e50;
}
#nav a.router-link-exact-active{
  color:#42b983
}
</style>
