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