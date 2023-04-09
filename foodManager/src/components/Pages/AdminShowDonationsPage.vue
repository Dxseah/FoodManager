<template>
        <div class="background">
      <div class="transbox">
        <div class="content">
          <h1 class="header">Check Donated items here</h1>
          <br>
          <div v-bind:key="item" v-for="item in this.donations">
            <img :src="item" alt="No Image" title="Check" />
          </div>
          <router-link to="/adminhome">Back to Home Page</router-link>
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
