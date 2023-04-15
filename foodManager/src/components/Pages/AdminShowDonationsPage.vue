<template>
  <div class="background">
    <div class="transbox">
        <div class="content">
          <h1 class="header">Check Donated items here</h1>
          <br>
          <div v-bind:key="item" v-for="item in this.donations">
            <img :src="item" alt="No Image" title="Check" />
          </div>
          <router-link to="/adminhome" class="routerbutton">Back to Home Page</router-link>
        </div>
    </div>
  </div>
</template>
<script>
import { getDoc, doc, updateDoc, setDoc, collection } from "firebase/firestore"
import { db } from '@/firebase'
import { query, where, getDocs } from 'firebase/firestore';
import { getStorage, ref ,listAll,getDownloadURL} from "firebase/storage";

export default {
  name: "AdminFormPage",
  data() {
    return {
      donations: []
    };
  },

  async mounted() {
      const storage = getStorage();
      const Ref = ref(storage,'donations/');
      console.log('test')
      listAll(Ref).then((res)=>{
          //console.log('here')
        //   res.prefixes.forEach((folderRef) => {
        //     //console.log(folderRef)
        //     console.log('here')

        //   });
          res.items.forEach((itemRef) => {
            getDownloadURL(itemRef).then(
                (url)=> {
                    this.donations.push(url);
                }
            )
          });
      }).catch((error) => {
          console.log(error)
      });
    console.log(this.donations)
  }
}
</script>

<style>
.routerbutton {
  background-color:#779ECB;
  border-radius: 25px;
  margin: 0px 0px 20px 0px;
  display: inline-block;
  padding: 12px 24px;
  font-size: 18px; 
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  font-family: Avenir, Arial, Helvetica, sans-serif;
}

.routerbutton:hover {
    background-color: #F6C7B3;
    box-shadow: 3px 3px grey;
    color: #2c3e50;
}

.routerbutton:active {
  transform: translateY(2px);
  box-shadow: none;
}
</style>