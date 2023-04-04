<template>
    <div class="donorCont">
      <h2>Update Beneficiary Profile Details</h2>
      <h3>Personal Details</h3>
      <div id="forms"> 
        <form class="form" @submit.prevent="submitForm">
          <div class="formbox">
            <label for="name">Name</label>
            <input type="string" id="name" required v-model="name"/>
          </div>

          <!-- <div class="formbox">
            <label for="email">Email Address</label>
            <input type="string" id="email" v-model.lazy="userEmail"/>
          </div> -->

          <div class="formbox">
            <label for="contact">Contact</label>
            <input type="string" id="contact" required v-model="contact"/>
          </div>
          <button id="btn" @click="submitForm()"> Update Profile Details </button><br>
        </form>
      </div>
      <!-- <table id="currTable">
        <tr>
          <th>Name</th>
          <td>Name</td>
        </tr>
        <tr>
          <th>Email Address</th>
          <td>Email Address</td>
        </tr>
        <tr>
          <th>Contact</th>
          <td>Contact</td>
        </tr>
      </table> -->
    
      <br><br>
      <!-- <h3>Login Details</h3>
      <div id="forms"> 
        <form class="form" @submit.prevent="submitForm">
          <div class="formbox">
            <label for="useriden">User ID</label>
            <input type="string" id="useriden" v-model="useriden"/>
          </div>
          <br>
          <button id="btn" @click="submitForm()"> Update Profile Details </button><br>
        </form>
      </div> -->
      <!-- <table id="currTable2">
        <tr>
          <th>User ID</th>
          <td>User ID</td>
        </tr>
        <tr>
          <th>Password</th>
          <td>Password</td>
        </tr>
      </table> -->
    <button id="btn" @click="back()"> Back to Profile </button> 
    </div>
</template>

<script>
import router from '@/components/Router/index.js'
import { getAuth, onAuthStateChanged } from "firebase/auth"; 
import { db } from '@/firebase';
import { getDoc, doc, updateDoc, setDoc, collection } from "firebase/firestore"; 

export default { 
  name: "UpdateDonorProfilePage",
  data() {
    return {
      // user: false,
      name: " ", 
      contact:" ", 
      useriden:" "
    }
  },

  mounted() {
    const auth = getAuth(); 
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user
      }
    })
  }, 

  methods: {
    async submitForm() {
      const auth = getAuth(); 
      const user = auth.currentUser; 

          const userRef = collection(db, "User"); 
          const curr = user.displayName; 
          const docRef = doc(userRef, curr);
          // const docSnap = await getDoc(docRef); 
          const requestedData = {
            "name": this.name, 
            "contact": this.contact,
            // "useriden": this.useriden
          }; 
          await updateDoc(docRef, requestedData);
          // await updateProfile(user, {
          //   displayName: this.name
          // })
          window.location.reload(); 

          // if (docSnap.exists()) {
          //   await updateDoc(docRef, requestedData); 
          // } else {
          //   await setDoc(docRef, requestedData);
          // }
          // const docSnap = await updateDoc(docRef,
          // {
          //   // name: document.getElementById("name").value,
          //   // contact: document.getElementById("contact").value,
          //   name: this.userName, 
          //   contact: this.userContact
          // });
          // window.location.reload()
    },

    back() {
      router.push('/beneficiaryprofile')
    }
  }
}

</script>

<style scoped>
.donorCont {
    background-color: aliceblue;
    width: 100vw;
    height: 100vh;
    align-content: center;
    padding: 100px;
    font-family: Avenir, Arial, Helvetica, sans-serif;
    font-size: 20px;
    align-items: center;
}

/* #currTable {
  text-align: left;
  width: 100%;
  border-collapse: collapse;
  border: 1px solid;
}

#currTable2 {
  text-align: left;
  width: 100%;
  border-collapse: collapse;
  border: 1px solid;
} */

#forms {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
}

.form {
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 400px;
}

.formbox {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  width: 100%;
}

label {
  margin-bottom: 10px;
  margin-right: 10px;
  font-size: 20px;
  text-align: right;
}

input {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
}

/* tr, td {
  border: 1px solid;
}

th {
  font-weight: bold;
} */
</style>

