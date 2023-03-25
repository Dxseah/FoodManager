<template>
    <div class="donorCont">
      <h2>Update Profile Details</h2>
      <h3>Personal Details</h3>
      <table id="currTable">
        <tr>
          <th>Name</th>
          <td>Name</td>
        </tr>
        <tr>
          <th>Email Address</th>
          <td>Email Address</td>
        </tr>
        <tr>
          <th>Contact</th>
          <td>Contact</td>
        </tr>
      </table>
      <br><br>
      <h3>Login Details</h3>
      <table id="currTable2">
        <tr>
          <th>User ID</th>
          <td>User ID</td>
        </tr>
        <tr>
          <th>Password</th>
          <td>Password</td>
        </tr>
      </table>
      <br>
      <button id="btn"> Update Profile Details </button><br>
    <button id="btn" @click="back()"> Back to Profile </button> 
    </div>
</template>

<script>
import router from '@/components/Router/index.js'

export default { 
  name: "UpdateProfilePage",
  data() {
    return {
      user: false,
    }
  },
  methods: {
    back() {
      router.push('/profile')
    }
  }
}

</script>

<style scoped>
.donorCont {
    background-color: aliceblue;
    width: 100vw;
    height: 100vh;
    align-content: center;
    padding: 100px;
    font-family: Avenir, Arial, Helvetica, sans-serif;
    font-size: 20px;
}

#currTable {
  text-align: left;
  width: 100%;
  border-collapse: collapse;
  border: 1px solid;
}

#currTable2 {
  text-align: left;
  width: 100%;
  border-collapse: collapse;
  border: 1px solid;
}

tr, td {
  border: 1px solid;
}

th {
  font-weight: bold;
}
</style>

