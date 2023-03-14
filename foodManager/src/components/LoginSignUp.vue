<template>
    <div class = "signup">
        <router-link to = "/donorsignup"> Sign up as Donor </router-link> <br><br> 
        <router-link to = "/signup"> Sign up as Beneficiary </router-link> <br><br>
        <button id="forgetpassword" type="button"><router-link to = "/forgetpassword"> Forget Password? </router-link></button>
    </div>
</template>

<style>
#forgetpassword {
    background-color:aqua;
    padding: 5px;
}
</style>