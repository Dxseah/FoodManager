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
  background-color:#779ECB;
  border-radius: 25px;
  margin: 5px;
  display: inline-block;
  padding: 12px 24px;
  font-size: 20px; 
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
}

#btn:hover {
    background-color: #F6C7B3;
    box-shadow: 3px 3px grey;
    color: #2c3e50;
}

#btn:active {
  transform: translateY(2px);
  box-shadow: none;
}


</style>