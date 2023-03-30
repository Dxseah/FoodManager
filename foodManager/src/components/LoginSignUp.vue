<template>
    <div class = "signup">
        <router-link to = "/donorsignup"><label> Sign up as a Donor </label></router-link> <br>
        <router-link to = "/beneficiarysignup"><label>  Sign up as a Beneficiary </label></router-link> <br><br>
        <button id="forgetpassword" type="button"><router-link to = "/forgetpassword"><label> Forgot Password? </label></router-link></button>
    </div>
</template>

<style scoped>

label {
    color:chocolate;
    text-decoration: none;
    padding: 10px;
}

div.router-link {
    font-size: 20px;
    color: black;
    font-weight: bold;
}

#forgetpassword {
    background-color:cornsilk;
    padding: 5px;
}
</style>