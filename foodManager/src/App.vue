

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

    <router-link to = "/"> LoginPage </router-link>|
    <router-link to = "/profile"> ProfilePage </router-link>|
    <router-link to = "/about"> AboutPage </router-link>|
    <router-link to = "/signup"> BeneficiarySignUpPage </router-link>|
    <router-link to = "/donorsignup"> DonorSignUpPage </router-link>|
    
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
  margin-top:30px;
}
#nav {
  padding: 30px
}
#nav a {
  font-weight: bold;
  color:#2c3e50;
}
#nav a.router-link-exact-active{
  color:#42b983
}
</style>
