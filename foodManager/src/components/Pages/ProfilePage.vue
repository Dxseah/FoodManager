<template>
  <div class="container1" v-if="user">
    <div>
      <div class="card-body">
        <div class="alert alert-success" role="alert">
          You are logged in!
          <!-- <Logout/> -->
        </div>
      </div>

      <table id="currTable">
        <tr>
          <th>Name</th>
          <td> {{user.displayName}} </td>
        </tr>
        <tr>
          <th>User ID</th>
          <td> {{user.uid}} </td>
        </tr>
        <tr>
          <th>Email</th>
          <td> {{user.email}} </td>
        </tr>
        <tr>
          <th>Contact</th>
          <td> sample contact </td>   
        </tr>
        <!-- <tr>
          <th>Account Type</th>
          <td v-if="user.data.account==2"> Donor </td>
          <td v-else-if="user.data.account==1"> Beneficiary </td>
        </tr> -->

      </table>
    </div>
    <button id="btn" @click="signOut()" v-if="user"> Logout </button> 
  </div>

  <div v-else class = "container2"> 
    <div class="alert alert-danger" role="alert">
        You are logged out!
    </div>
  </div>
</template>

<script>
import Logout from '@/components/Logout.vue';
import firebaseApp from '@/firebase.js';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import router from '@/components/Router/index.js'

export default {
  name: "ProfilePage", 
  data() {
    return {
      user: false,
    }
  }, 

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth,(user)=>{
      if (user) {
        this.user = user;
      }
    })
  }, 

  methods: {
    signOut() {
      const auth = getAuth(); 
      const user = auth.currentUser; 
      signOut(auth, user);
      // this$router.push({name:'LoginPage'});   
      router.push('/');
      window.location.reload();
    }
  }
}



// import { useStore } from 'vuex';
// import { useRouter } from 'vue-router';
// import { ref , computed } from 'vue';
// import { auth } from '@/firebase.js'

// export default {
//   name: "ProfilePage",

//   setup() {

//     const store = useStore()
//     const router = useRouter()
//     auth.onAuthStateChanged(user => {
//       store.dispatch("fetchUser", user);
//     });
//     const user = computed(() => {
//       store.dispatch("fetchUser", auth.currentUser)
//       return store.getters.user;
//     });

//     const signOut = async () => {
//           await store.dispatch('logOut')
//           router.push('/')
//     }

//     return { user, signOut }
//  },
//   data() {
//     return {
//       displayName: ''
//     };
//   },
//   beforeCreate() {
//     console.log('test')
    
//   }

// };
</script>

<style scoped>
.container1 {
    background-color: aliceblue;
    width: 100vw;
    height: 100vh;
    align-content: center;
    padding: 100px;
    font-family: Avenir, Arial, Helvetica, sans-serif;
    font-size: 20px;
  }
.container2 {
    background-color: aliceblue;
    width: 100vw;
    height: 100vh;
    align-content: center;
    padding: 100px;
    font-family: Avenir, Arial, Helvetica, sans-serif;
    font-size: 20px;
  }

#currTable {
  text-align: left;
  width: 100%;
  border-collapse: collapse;
  border: 1px solid;
}

#btn {
    text-align: center;
    margin: auto;
} 

#btn:hover {
    color: rgb(243,236,236);
    background-color: rgb(255,94,0);
    box-shadow: 3px 3px grey;
}

tr, td {
  border: 1px solid;
}

th {
  font-weight: bold;
}
</style>