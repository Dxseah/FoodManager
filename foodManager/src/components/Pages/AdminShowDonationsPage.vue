<template>
  <div class="background">
    <div class="transbox">
        <div class="content">
          <h1 class="header">Check Donated items here</h1>
          <br>
          <div class="gallery">
          <div v-bind:key="item" class="gallery-panel" v-for="item in this.donations">
            <img :src="item" alt="No Image" title="Check" class="img"/>
          </div>
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
.image{
  max-width: 20%;
  height: 20%;
}
.gallery{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    grid-gap: 1rem;
    max-width: 80rem;
    margin: 5rem auto;
    padding: 0 5rem;
}
.gallery-panel img {
    width: 100%;
    height: 22vw;
    object-fit: cover;
    border-radius: 0.75rem;
}
.imgCont{
  background-color: aqua;
  display: flex;
  flex-direction: row;

}
.content{
    margin-top:10px
}
div.background {
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  
}

div.transbox {
  margin: 30px;
  background-color: #ffffff;
  border: 1px solid black;
  opacity: 0.8;
}

div.content {
margin: 5%;
font-weight: bold;
color: #000000;
}

.header {
  font-family: Marker Felt, Avenir, Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 3em;
}
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