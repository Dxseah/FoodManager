<template>
  <div class='overall'>

  <div class='container'>
  <LoginInput/>
  <LoginSignUp/>
  </div>

  <div class='container2'>
  <LoginFindOutMore/>
  </div>

  </div>

  <div class="bg-container">
  </div>

</template>
<script>
import LoginFindOutMore from '@/components/LoginFindOutMore.vue'
import LoginInput from '@/components/LoginInput.vue'
import LoginSignUp from '@/components/LoginSignUp.vue'

export default { 
  name: "LoginPage",
  components:{
          LoginFindOutMore,LoginInput,LoginSignUp
      },
}
</script>

<style>
  .bg-container {
    background-image: url(https://www.efsa.europa.eu/sites/default/files/styles/share_opengraph/public/news/food-donations.jpg?h=82f92a78&itok=3k3shqTm);
    width:100vw;
    height:100vh; 
  }
</style>