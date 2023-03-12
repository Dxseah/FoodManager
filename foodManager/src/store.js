
import { createStore } from 'vuex'

//Firebase imports
import { auth } from './firebase.js'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth'

const store = createStore({
    state: {
        //The user state will initially be null. After login, this state will be updated
        user: {
            loggedIn: false,
            data: null
          }
    },
    getters: {
        user(state){
          return state.user
        }
      },
    mutations: {
        //Mutation to update the user state
        //Takes in two arguments, the state and the payload. When we call this mutation, the payload will be user object from firebase auth
        //When the user logs out, we call the mutation and the payload will be null
        SET_LOGGED_IN(state, value) {
            state.user.loggedIn = value;
          },
        SET_USER(state, data) {
            state.user.data = data;
          }
    },
    actions: {
        async signup(context, { email, password, name}){
            const response = await createUserWithEmailAndPassword(auth, email, password)
            if (response) {
                context.commit('SET_USER', response.user)
                updateProfile(response.user,{displayName: name})
            } else {
                throw new Error('Unable to register user')
            }
        },

        async donorsignup(context, { email, password, name}){
          const response = await createUserWithEmailAndPassword(auth, email, password)
          if (response) {
              context.commit('SET_USER', response.user)
              updateProfile(response.user,{displayName: name})
          } else {
              throw new Error('Unable to register user')
          }
      },
  
        async login(context, { email, password }){
          const response = await signInWithEmailAndPassword(auth, email, password)
          if (response) {
              context.commit('SET_USER', response.user)
          } else {
              throw new Error('login failed')
          }
      },
  
      async logOut(context){
          await signOut(auth)
          context.commit('SET_USER', null)
      },
  
      async fetchUser(context ,user) {
        context.commit("SET_LOGGED_IN", user !== null);
        if (user) {
          context.commit("SET_USER", {
            displayName: user.displayName,
            email: user.email
          });
        } else {
          context.commit("SET_USER", null);
        }
    }
    }

})

// export the store
export default store