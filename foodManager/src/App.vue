<<<<<<< Updated upstream

<script>
import LoginPage from './components/Pages/LoginPage.vue'

export default {
  name: 'App'

}
</script>

<template>
<div>
  <div id="nav">
    <LoginPage/>
    <router-link to = "/"> LoginPage </router-link>|
    <router-link to = "/about"> AboutPage </router-link>|
    <!-- <router-link to = "/profit"> Profit </router-link> -->
  </div>
  <router-view/>
</div>
</template>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top:30px;
=======
<script setup>
import LoginInput from './components/LoginInput.vue'
</script>

<template>
  <div>
    <LoginInput></LoginInput>
    <LoginSignUp>
  </div>
</template>

<script>
  import firebase from './firebase';
  
  export default {
    name: 'App',
    created() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.$router.push('/dashboard');
        } else {
          this.$router.push('/login');
        }
      });
    },
  };
</script>

<style>
</style>


<style scoped>
header {
  line-height: 1.5;
>>>>>>> Stashed changes
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
