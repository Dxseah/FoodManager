<template>
    <button class="button-upgrade" role="button" @click = "signOut()" v-if="user"> <span class="text">Sign Out</span> </button>
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
    text-align: center;
    margin: auto;
} 

#btn:hover {
    color: rgb(243,236,236);
    background-color: rgb(255,94,0);
    box-shadow: 3px 3px grey;
}
.button-upgrade {
  align-items: center;
  background-image: linear-gradient(135deg, #f34079 40%, #fc894d);
  border: 0;
  border-radius: 12px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-family: "Helvetica",sans-serif;
  font-size: 16px;
  font-weight: 700;
  height: 54px;
  justify-content: center;
  letter-spacing: .4px;
  padding-left: 20px;
  margin-bottom: 5px;
  padding-right: 20px;
  padding-top: 3px;
  text-decoration: none;
  text-transform: uppercase;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-upgrade:active {
  outline: 0;
}

.button-upgrade:hover {
  outline: 0;
}

.button-upgrade span {
  transition: all 250ms;
}

.button-upgrade:hover span {
  transform: scale(.9);
  opacity: .75;
}

@media screen and (max-width: 991px) {
  .button-upgrade {
    font-size: 15px;
    height: 50px;
  }

  .button-upgrade span {
    line-height: 50px;
  }
}

</style>