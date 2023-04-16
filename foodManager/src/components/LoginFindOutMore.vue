<template>
    <div class="findOutMoreCont">
        <h1>Find out more about FoodManager</h1>
        <router-link to="/about" class="button">HERE</router-link>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
h1 {
    font-family: 'Avenir', Helvetica, Arial,  sans-serif;
    font-weight: bold;
    font-size: 2em;
}

a:hover {
    background-color: #F6C7B3;
    box-shadow: 3px 3px grey;
    color: #2c3e50;
}

.button {
  background-color:#779ECB;
  border-radius: 25px;
  margin: 40px 50px 20px 0px;
  display: inline-block;
  padding: 12px 24px;
  font-size: 22px; 
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  font-family: Avenir, Arial, Helvetica, sans-serif;
}

.button:hover {
    background-color: #F6C7B3;
    box-shadow: 3px 3px grey;
    color: #2c3e50;
}

.button:active {
  transform: translateY(2px);
  box-shadow: none;
}

</style>