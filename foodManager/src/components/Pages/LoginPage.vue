<template>
  <div class='background'>
    <div class="transbox">
      <div class="content">
      <!-- <LoginInput/> <br> -->
      <div id ="firebaseui-auth-container"></div>
      <LoginFindOutMore/>
      </div>
    </div>
  </div>
</template>

<script>
import LoginFindOutMore from '@/components/LoginFindOutMore.vue'
import firebase from '@/uifire.js'
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css'

export default { 
  name: "LoginPage",
  components:{
          LoginFindOutMore
      },
  mounted() {
    var ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    var uiConfig = {
      signInSuccessUrl: "/profile", //need change this
      signInOptions:[
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    };
    ui.start("#firebaseui-auth-container", uiConfig);
  }
}
</script>

<style scoped>
  div.background {
    background-size: cover;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100vw;
    background-color: #F8F3E8;
  }

  div.transbox {
    margin: 30px;
    background-color: #f9fdfd;
    border: 1px solid black;
    text-align: center;
    border-radius: 25px;
  }

  div.content {
  margin: 5%;
  font-weight: bold;
  color: #2c3e50;
}
</style>