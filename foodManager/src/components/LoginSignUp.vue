<template>
    <div class = "signup">
        <router-link to = "/donorsignup"><a> Sign up as Donor </a></router-link> <br>
        <router-link to = "/signup"><b>  Sign up as Beneficiary </b></router-link> <br>
        <button id="forgetpassword" type="button"><router-link to = "/forgetpassword"><p> Forget Password? </p></router-link></button>
    </div>
</template>

<style scoped>

a, b, c {
  color:chocolate;
 text-decoration: none;
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