<template>
       <button id='btn' @click = "signOut()" v-if="user"> Logout </button>
</template>

<script>
import router from '@/components/Router/index.js'
import { getAuth,onAuthStateChanged,signOut } from "firebase/auth";

export default {
    name: "Logout",
    data() {
        return {
            user: false
        }
    },
    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user)=>{
            if (user) {
                this.user=user;
            }
        })
    },
    methods: {
        signOut() {
        const auth = getAuth(); 
        const user = auth.currentUser; 
        signOut(auth, user).then(()=>{console.log("signout");window.location.reload();});
        router.push('/');
        
        }
    }
}

</script>

<style scoped>

#btn {
margin:5px;
display: inline-block;
padding: 12px 24px;
background-color: #0492C2;
color: #fff;
font-size: 24px; /* Increase the font size */
font-weight: bold;
text-decoration: none;
border: none; /* Remove the border */
border-radius: 8px;
cursor: pointer;
transition: all 0.3s ease;
}

/* Add hover styles */
#btn:hover {
background-color: #779ECB;
box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
}

/* Add active styles */
#btn:active {
transform: translateY(2px);
box-shadow: none;
}


</style>