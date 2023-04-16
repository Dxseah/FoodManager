<template>
    <div class="findOutMoreCont">
        <h1>Find out more about FoodManager</h1>
        <router-link to = "/about"><a> HERE</a></router-link>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
h1 {
    font-family: Avenir, Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 2em;
}

a {
    color:#779ECB;
    text-decoration: none;
    font-size: 1.5em;
    font-style: italic;
    text-decoration-line: underline;
}

a:hover {
    background-color: #F6C7B3;
    box-shadow: 3px 3px grey;
    color: #2c3e50;
}

router-link {
    font-family: Avenir, Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 2em;
}
</style>