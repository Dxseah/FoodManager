<template>
    <div class = "signup">
        <router-link to = "/donorsignup"> Sign up as Donor </router-link> <br>
        <router-link to = "/signup"> Sign up as Beneficiary </router-link> <br>
        <button id="forgetpassword" type="button"><router-link to = "/forgetpassword"> Forget Password? </router-link></button>
    </div>
</template>

<style scoped>
div.router-link {
    font-size: 20px;
    color: black;
    font-weight: bold;
}

#forgetpassword {
    background-color:rgb(0, 252, 252);
    padding: 5px;
}
</style>