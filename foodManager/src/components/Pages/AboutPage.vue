<template>
  <div class="about">
    <h1>{{ orgName }}</h1>
    <div class="description">
      <p class="lead">{{ orgDescription }}</p>
    </div>
    <div class="mission">
      <h2>Our Mission</h2>
      <p>{{ orgMission }}</p>
    </div>
    <div class="team">
      <h2>Our Team</h2>
      <ul>
        <li v-for="(member, index) in team" :key="index">
          <div class="member">
            <div class="member__image">
              <img :src="member.image" :alt="member.name" />
            </div>
            <div class="member__info">
              <h3 class="member__name">{{ member.name }}</h3>
              <p class="member__position">{{ member.position }}</p>
              <p class="member__bio">{{ member.bio }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
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
          image: "../src/assets/brian.jpg",
        },
        {
          name: "Mi Nanfang",
          position: "Scrum Master",
          bio: "Nanfang has a knack for task management and is dedicated to making a difference in the community through her expertise.",
          image: "../src/assets/nanfang.jpg",
          
        },
        {
          name: "Demi Tan",
          position: "Developer",
          bio: "Demi has accumulated many years of experience in developing websites and management systems with the team and is passionate in creating an impact in the society.",
          image: "https://via.placeholder.com/150",
        },
        {
          name: "Seah Ding Xuan", 
          position: "Developer", 
          bio: "Ding Xuan has a proven track record of creating websites and developing an inventory management system for many organizations and is dedicated to supporting our mission.",
          image: "../src/assets/dingxuan.jpg",
        }, 
        {
          name: "Lim Yi Han", 
          position: "Developer", 
          bio: "Yi Han is a skilled developer and with a wealth of experience and knowledge, he dedicates his utmost effort into his work to help the community.",
          image: "https://via.placeholder.com/150",
        }
      ],
    };
  },
};
</script>

<style scoped>
.about {
  background-color: #f6f6f6;
  padding: 100px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  font-family: "Open Sans", sans-serif;
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #373737;
}

h2 {
  font-family: "Open Sans", sans-serif;
  font-size: 36px;
  margin-top: 40px;
  margin-bottom: 20px;
  text-align: center;
  color: #373737;
}

h3 {
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
  font-size: 24px;
  margin-top: 40px;
  margin-bottom: 20px;
  text-align: center;
  color: #373737;
}

p {
  font-family: "Open Sans", sans-serif;
  font-size: 18px;
  margin-bottom: 20px;
  text-align: center;
  color: #555555;
  line-height: 1.5;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

li {
  margin: 20px;
  width: 300px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
}

li:hover {
  transform: scale(1.05);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16);
}

img {
  width: 80%;
  margin-bottom: 20px;
  border-radius: 50%;
}

@media (max-width: 768px) {
  .about {
    padding: 50px;
  }

  h1 {
    font-size: 36px;
  }

  h2 {
    font-size: 28px;
  }

  h3 {
    font-size: 20px;
  }

  li {
    margin: 10px;
    width: 250px;
    padding: 15px;
  }
}
</style>