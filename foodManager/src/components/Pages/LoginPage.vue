<template>
  <div class='background'>
    <div class="transbox">
      <div class="content">
      <LoginInput/> <br>
      <LoginSignUp/> <br><br>
      <LoginFindOutMore/>
      </div>
    </div>
  </div>
</template>
<script>
import LoginInput from '@/components/LoginInput.vue'
import LoginSignUp from '@/components/LoginSignUp.vue'
import LoginFindOutMore from '@/components/LoginFindOutMore.vue'

export default { 
  name: "LoginPage",
  components:{
          LoginInput,LoginSignUp,LoginFindOutMore
      },
}
</script>

<style scoped>
  div.background {
    background: url(https://www.efsa.europa.eu/sites/default/files/styles/share_opengraph/public/news/food-donations.jpg?h=82f92a78&itok=3k3shqTm);
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