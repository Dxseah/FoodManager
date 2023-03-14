<template>
  <div class='overall'>
  <LoginInput/> <br>
  <LoginSignUp/> <br><br>
  <LoginFindOutMore/>
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

<style>
  .overall {
    background-image: url(https://www.efsa.europa.eu/sites/default/files/styles/share_opengraph/public/news/food-donations.jpg?h=82f92a78&itok=3k3shqTm);
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100vw;
  }
</style>