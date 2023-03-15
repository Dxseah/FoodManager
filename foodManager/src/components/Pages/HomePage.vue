<template>
    <div class='background'>
      <div class="transbox">
        <div class="content">
            <h1 class="header"> Track Food Item Progress </h1>
            <h3 class="food">{{  food }}</h3>
            <!-- To Do: Pass in value to next 2 lines -->
            <ProgressBar :percentComplete="40"/>
            <h3 class="percent"> 40% Completed </h3>
        </div>
      </div>
    </div>
</template>
  
  <script>
  import ProgressBar from '../ProgressBar.vue'
  
  export default { 
    name: "HomePage",
    components:{
            ProgressBar,
        },

    data() {
        return {
            food: "Rice",
        };
    }
  }
  </script>
  
  <style scoped>
    div.background {
      background: url(https://www.efsa.europa.eu/sites/default/files/styles/share_opengraph/public/news/food-donations.jpg?h=82f92a78&itok=3k3shqTm);
      border: 2px solid black;
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
    .food {
        text-align: left;
        margin-bottom: 8px;
        font-weight: bolder;
        font-size: 30px;
    }

    .percent {
        text-align: right;
        margin-top: 8px;
        font-weight: bolder;
        font-size: 30px;
    }
  </style>