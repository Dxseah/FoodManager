<template>
  <div class="container">

        <div v-if="user.loggedIn">
          
            <div class="card-body">
              <div class="alert alert-success" role="alert">
                You are logged in!
                <div class="my-4">
                  <button @click.prevent="signOut" class="btn btn-primary">Log Out</button>
                </div>
              </div>
            </div>

            <table id="currTable">
                <tr>
                    <th>Name</th>
                    <td> {{user.data.displayName}} </td>
                </tr>
                <tr>
                    <th>User ID</th>
                    <td> {{user.data.userID}} </td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td> {{user.data.email}} </td>
                </tr>
                <tr>
                    <th>Contact</th>
                    <td> {{user.data.contact}} </td>   
                </tr>
                <tr>
                    <th>Account Type</th>
                    <td v-if="user.data.account==2"> Donor </td>
                    <td v-else-if="user.data.account==1"> Beneficiary </td>
                </tr>

            </table>
          
        </div>
        <div v-else class="alert alert-danger" role="alert">
          You are not logged in! 
        </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref , computed } from 'vue';
import { auth } from '@/firebase.js'



export default {
  name: "ProfilePage",

  setup() {

    const store = useStore()
    const router = useRouter()
    auth.onAuthStateChanged(user => {
      store.dispatch("fetchUser", user);
    });
    const user = computed(() => {
      store.dispatch("fetchUser", auth.currentUser)
      return store.getters.user;
    });

    const signOut = async () => {
          await store.dispatch('logOut')
          router.push('/')
    }

    return { user, signOut }
 },
  data() {
    return {
      displayName: ''
    };
  },
  beforeCreate() {
    console.log('test')
    
  }

};
</script>

<style scoped>
.container {
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

tr, td {
  border: 1px solid;
}

th {
  font-weight: bold;
}
</style>