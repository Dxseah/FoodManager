<template>
  <div class="background">
    <div class="transbox">
      <div class="content">
        <h1 class="header">Check Donated items here</h1>
        <br>
        <div class="gallery">
          <div v-bind:key="item" class="gallery-panel" v-for="(item, index) in this.donations">
            <img :src="item" alt="No Image" title="Check" class="img" @click="showImage(index)">
          </div>
        </div>
        <router-link to="/adminhome" class="routerbutton">Back to Home Page</router-link>
      </div>
      <div class="modal" v-if="modalOpen" @click="closeModal">
        <img :src="selectedImage" alt="Enlarged Image" class="modal-content">
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
      donations: [],
      modalOpen: false,
      selectedImage: null
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
  },

  methods: {
    showImage(index) {
      this.selectedImage = this.donations[index];
      this.modalOpen = true;
    },

    closeModal() {
      this.modalOpen = false;
      this.selectedImage = null;
    }
  }
}
</script>

<style>
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

.modal-image {
  max-width: 90%;
  max-height: 90%;
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

</style>