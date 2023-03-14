<template>
  <div class="container">

          <div v-if="user.loggedIn">

          <div class="card-header">Welcome, {{user.data}}</div>
          <div class="card-body">
            <div class="alert alert-success" role="alert">
            You are logged in!
            <div class="my-4">
                  <button  @click.prevent="signOut" class="btn btn-primary">Log Out</button>
            </div>
             </div>
          </div>

          </div>
            <div v-else class="alert alert-danger" role="alert">
              You are not logged in! 
            </div>
  </div>
</template>

<script>
import { useStore} from "vuex";
import { useRouter } from "vue-router";
import {computed} from "vue";
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
    return store.getters.user;
  });

  const signOut = async () => {
        await store.dispatch('logOut')
        router.push('/')
  }

    return {user,signOut}
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
  }
</style>