
<template>
  <h1>FoodBank Repository</h1>
  <div id="app">
    <form>
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username">
      <br>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password">
      <br>
      <button type="submit" v-on:click="login">Login</button>
    </form>
  </div>
</template>

<!-- <template>
    <div id="app">
      <input type="text" v-model="username" placeholder="Username">
      <input type="password" v-model="password" placeholder="Password">
      <button @click="login">Login</button>
    </div>
</template>
  
<script>
    import firebase from 'firebase/app';
    import 'firebase/auth';
    
    export default {
      data() {
        return {
          email: '',
          password: '',
        };
      },
      methods: {
        login() {
          firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(() => {
              this.$router.push('/dashboard');
            })
            .catch((error) => {
              console.error(error);
            });
        },
      },
    };
  </script>
  
  <style>
  </style>
   -->
