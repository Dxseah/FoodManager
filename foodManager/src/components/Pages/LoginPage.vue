<template>
  <div class='background'>
    <div class="transbox">
      <div class="content">
      <!-- <LoginInput/> <br> -->
      <div id ="firebaseui-auth-container"></div>
      <LoginSignUp/> <br><br>
      <LoginFindOutMore/>
      </div>
    </div>
  </div>
</template>

<script>
import LoginSignUp from '@/components/LoginSignUp.vue'
import LoginFindOutMore from '@/components/LoginFindOutMore.vue'
import firebase from '@/uifire.js'
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css'

export default { 
  name: "LoginPage",
  components:{
          LoginSignUp,LoginFindOutMore
      },
  mounted() {
    var ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui =new firebaseui.auth.AuthUI(firebase.auth());
    }
    var uiConfig = {
      signInSuccessUrl: "/about",
      signInOptions:[
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    };
    ui.start("#firebaseui-auth-container",uiConfig);
  }
}
</script>

<style scoped>
  div.background {
    background: url(https://www.efsa.europa.eu/sites/default/files/styles/share_opengraph/public/news/food-donations.jpg?h=82f92a78&itok=3k3shqTm);
    /* background: url(http://www.sru.edu//images/news/2019/January/011619b-Inline.jpg); */
    border: 2px solid black;
    background-size: cover;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100vw;
  }

  div.transbox {
    margin: 30px;
    background-color: #ffffff;
    border: 1px solid black;
    opacity: 0.8;
  }

  div.content {
  margin: 5%;
  font-weight: bold;
  color: #000000;
}
</style>