<template>
    <div class="background">
      <div class="transbox">
        <div class="content">
          <h1 class="header">Add Food Item</h1>
          <form class="form"  @submit.prevent="submitForm">
            <div class="form-group">
              <label for="rice">Rice</label>
              <input type="number" id="rice" v-model.number="riceQuantity" min="0" />
            </div>
            <div class="form-group">
              <label for="canned-food">Canned Food</label>
              <input type="number" id="canned-food" v-model.number="cannedFoodQuantity" min="0" />
            </div>
            <div class="form-group">
              <label for="instant-noodles">Instant Noodles</label>
              <input type="number" id="instant-noodles" v-model.number="instantNoodlesQuantity" min="0" />
            </div>
            <button class="submit-button" v-on:click="submitAlert">Add Food Item</button>
          </form>
        </div>
      </div>
    </div>
  </template>

<script>

export default {
  name: "AdminFormPage",
  data() {
    return {
      riceQuantity: 0,
      cannedFoodQuantity: 0,
      instantNoodlesQuantity: 0,
    };
    }
}   

</script>


<style scoped>
.background {
  background: url(https://images.unsplash.com/photo-1588772351739-cd328260e2b2);
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  background-color: aliceblue;
}

.transbox {
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  padding: 20px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
}

.header {
  font-size: 2rem;
  margin-bottom: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
  width: 100%;
}

label {
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 10px;
}

input[type="number"] {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-size: 1.2em;
  margin-bottom: 20px;
  width: 100%;
}


.submit-button {
  background-color: silver;
}

</style>