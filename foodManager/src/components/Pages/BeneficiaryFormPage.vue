<template>
  <div class="background">
    <div class="transbox">
      <div class="content">
        <h1 class="header">Beneficiary Form</h1>
        <form class="form">
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
          <div class="form-group">
            <label for="image-upload">Upload Image</label>
            <input type="file" id="image-upload" @change="handleImageUpload" />
          </div>
          <button class="submit-button" @click.prevent="submitForm">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BeneficiaryFormPage",
  data() {
    return {
      riceQuantity: 0,
      cannedFoodQuantity: 0,
      instantNoodlesQuantity: 0,
      imageFile: null,
    };
  },
  methods: {
    submitForm() {
      // Implement submitForm method here to submit the form data and uploaded image
      console.log("Form submitted with data:", {
        rice: this.riceQuantity,
        cannedFood: this.cannedFoodQuantity,
        instantNoodles: this.instantNoodlesQuantity,
        image: this.imageFile,
      });
    },
    handleImageUpload(event) {
      this.imageFile = event.target.files[0];
    },
  },
};
</script>

<style scoped>
.background {
  background: url(https://images.unsplash.com/photo-1588772351739-cd328260e2b2);
  background-size: cover;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5; 
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

input[type="file"] {
  margin-top: 5px;
}

.submit-button {
  background-color: silver;
}

</style>