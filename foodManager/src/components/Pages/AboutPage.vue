<template>
  <div class="about">
    <h1>{{ orgName }}</h1>
    <h2> Our Vision </h2>
    <p>{{ orgDescription }}</p>
    <h2>Our Mission</h2>
    <p>{{ orgMission }}</p>
    <h2>Our Team</h2>
    <ul>
      <li v-for="(member, index) in team" :key="index">
        <h3>{{ member.name }}</h3>
        <p>{{ member.position }}</p>
        <p>{{ member.bio }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orgName: "FoodManager",
      orgDescription: "We aim to help non-profit organisations with their inventory system and donation management",
      orgMission: "Our mission is to work towards a zero wastage system for donations through non-profit organisations.",
      team: [
        {
          name: "Brian Liew",
          position: "Product Owner",
          bio: "Brian has over 5 years of experience in managing inventory items through donations and is committed to making a difference in the community.",
        },
        {
          name: "Mi Nanfang",
          position: "Scrum Master",
          bio: "Nanfang has a knack for task management and is dedicated to making a difference in the community through her expertise.",
        },
        {
          name: "Demi Tan",
          position: "Developer",
          bio: "Demi has accumulated many years of experience in developing websites and management systems with the team and is passionate in creating an impact in the society.",
        },
        {
          name: "Seah Ding Xuan", 
          position: "Developer", 
          bio: "Ding Xuan has a proven track record of creating websites and developing an inventory management system for many organizations and is dedicated to supporting our mission."
        }, 
        {
          name: "Lim Yi Han", 
          position: "Developer", 
          bio: "Yi Han is a skilled developer and dedicates his utmost effort into his work to help the community."
        }
      ],
    };
  },
};
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

h2 {
  font-size: 36px;
  margin-top: 40px;
  margin-bottom: 20px;
}

h3 {
  font-size: 24px;
  margin-top: 40px;
  margin-bottom: 20px;
}

p {
  font-size: 18px;
  margin-bottom: 20px;
}
</style>
