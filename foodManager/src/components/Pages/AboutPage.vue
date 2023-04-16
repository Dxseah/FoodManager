<template>
  <div class="about">
    <img :src="'../src/assets/icon.png'" alt="Image description">
    <h1>{{ orgName }}</h1>
    <div class="mission">
      <h2>Our Mission</h2>
      <p>Our mission is to help non-profit organizations in Singapore achieve zero food waste by offering an inventory and donation management solution. With our innovative system, we can track food donations from start to finish, ensuring that every donation is utilized effectively, and reducing the amount of food that ends up in landfills. We believe that creating a zero food wastage system is crucial for Singapore's sustainable future and work closely with non-profit organizations to tailor our services to their specific needs. Let's work together to make a positive impact on those in need and create a better future by managing food donations effectively.</p>
    </div>
    <div class="description">
      <h2>Our Key Values</h2>
      <p> <h3>Compassion:</h3> <p>We prioritize empathy and concern for those who are food insecure or in need.</p> <br> <h3>Sustainability:</h3> <p>We promote environmentally sustainable practices, such as reducing food waste and promoting composting.</p> <br> <h3>Equality:</h3> <p>We value the fair and equitable distribution of food to those in need, regardless of their race, religion, or social status.</p> <br> <h3>Transparency:</h3> <p>We value transparency in their operations, including reporting on the impact of their efforts and being open about their processes and decision-making.</p> </p>
    </div>
    <div class="team">
      <h2>Our Team</h2>
      <ul>
        <li v-for="(member, index) in team" :key="index">
          <div class="member">
            <div class="member__image">
              <img :src="member.image" :alt="member.name" height="250"/>
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
          image: "../src/assets/demi.jpg",
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
          bio: "Yi Han is a skilled developer and with a wealth of knowledge and experience in web development, he dedicates his utmost effort into his work to help the community. ",
          image: "../src/assets/yihan.jpg",
        }
      ],
    };
  },
};
</script>

<style scoped>
.about {
  background-color: #f9fdfd;
  padding: 100px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  text-align: center; /* add this line */
  border-radius: 25px;
  opacity: 0.8;
}

h1 {
  font-family: Avenir, Arial, Helvetica, sans-serif;  
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #373737;
}

h2 {
  font-family: Avenir, Arial, Helvetica, sans-serif;
  font-size: 36px;
  font-size: 42px;
  margin-top: 40px;
  margin-bottom: 20px;
  text-align: center;
  color: #373737;
  font-style: oblique;
}

h3 {
  font-family: Avenir, Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 24px;
  margin-top: 40px;
  margin-bottom: 0px;
  text-align: center;
  color: #373737;
}

p {
  font-family: Avenir, Arial, Helvetica, sans-serif;
  font-size: 24px;
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
  align-items: top;
}

li {
  margin: 20px;
  width: 300px;
  padding: 35px;
  border-radius: 8px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-items: center; */
  background-color: #F8F3E8 ;
}

li:hover {
  transform: scale(1.05);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16);
}

img {
  /* width: 80%; */
  margin-bottom: 20px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
}

.member__image {
  align-content: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .about {
    padding: 50px;
  }

  h1 {
    font-size: 36px;
  }
}

.member__image img {
  height: 220px;
  width: 220px;
}
</style>
