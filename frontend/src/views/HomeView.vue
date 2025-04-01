<template>
  <div class="parallax-section" v-for="(section, index) in sections" :key="index" :style="getSectionStyle(section)">
    <div class="section-content">
      <h1>{{ section.title }}</h1>
      <p>{{ section.text }}</p>
    </div>
  </div>
</template>

<script setup>
import suburbsImage from '@/images/suburbs.jpg'
import educationImage from '@/images/education.jpg'
import activitiesImage from '@/images/activities.jpg'

const sections = [
  {
    image: suburbsImage,
    title: 'Explore Culturally Diverse Suburbs',
    text: 'Discover Melbourne’s vibrant suburbs that celebrate various cultural backgrounds and offer inclusive communities for older adults.'
  },
  {
    image: educationImage,
    title: 'Educational Communities',
    text: 'Lifelong learning opportunities empower seniors. From digital literacy to language exchange, explore educational hubs made for you.'
  },
  {
    image: activitiesImage,
    title: 'Social Activities for Seniors in Melbourne',
    text: 'Join group walks, coffee meetups, art workshops, and game nights — stay active, social, and connected in your community.'
  }
]

const getSectionStyle = (section) => ({
  backgroundImage: `url(${section.image})`
})
</script>

<style scoped>
.parallax-section {
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  text-align: center;
  padding: 2rem;
  position: relative;
}

.section-content {
  background-color: rgba(0, 0, 0, 0.4);
  padding: 2rem;
  border-radius: 12px;
  max-width: 800px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}

.section-content h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.section-content p {
  font-size: 1.2rem;
  line-height: 1.6;
}
</style>
