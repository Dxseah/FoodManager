<template>
  <div class="background">
    <div class="transbox">
      <div class="content">
        <h1 class="header">Check Donated items here</h1>
        <br>
        <div class="gallery">
          <div v-bind:key="item" class="gallery-panel" v-for="(item, index) in this.donations">
            <img :src="item" alt="No Image" class="img" @click="showImage(index)">
            <p >{{extractValue(item)}}</p>
          </div>
        </div>
        <router-link to="/adminhome" class="routerbutton">Back to Home Page</router-link>
      </div>
      <div class="modal" v-if="modalOpen" @click="closeModal">
        <img :src="selectedImage" alt="Enlarged Image" class="modal-content">
        <span class="modalcont">
        <p class = "modal-text">{{extractValue(selectedImage)}}</p>
        <router-link to="/adminform" class="routerbutton">Edit Food Quantities</router-link>
        </span>

      </div>
    </div>
  </div>
</template>

<script>

import { getStorage, ref ,listAll,getDownloadURL} from "firebase/storage";

export default {
  name: "AdminFormPage",
  data() {
    return {
      donations: [],
      modalOpen: false,
      selectedImage: null,
      imageTitle: ""
    };
  },

  async mounted() {
      const storage = getStorage();
      const Ref = ref(storage,'donations/');
      console.log('test')
      listAll(Ref).then((res)=>{

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
  },

  methods: {
    showImage(index) {
      this.selectedImage = this.donations[index];
      this.modalOpen = true;
      // Use the 'split' method to split the 'item' value using the regular expression pattern
    },

    closeModal() {
      this.modalOpen = false;
      this.selectedImage = null;
    },
    extractValue(url) {
      // Regular expression pattern to extract the value
      const regex = /\/donations%2F([^?]+)/;
      // Use the 'split' method to split the 'item' value using the regular expression pattern
      console.log(url.match(regex)[1].replace(/%40/g, '@'))
      return url.match(regex)[1].replace(/%40/g, '@')
    }
  }
}
</script>

<style>
.modalcont{
    display: flex;
    flex-direction: column;
}
.modal-text{
    color: white;
    margin: 5px
}
.image {
  max-width: 20%;
  height: 20%;
}

.gallery {
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
  cursor: pointer;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  max-width: 60%;
  max-height: 90%;
  min-width: 50%;
  min-height: 50%;
  object-fit: contain;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
}

.modal-close:hover {
  color: #aaa;
}
content{
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