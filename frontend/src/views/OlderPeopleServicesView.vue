<template>
  <div class="services-container">
    <!-- 🧓 Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1>Community Services for Older Adults</h1>
        <p>
          Explore Australian Government programs designed to support wellbeing, social connection, health, and independent living for seniors.
        </p>
      </div>
    </section>

    <!-- ✅ Service Information Sections -->
    <section class="info-section" v-for="(service, index) in services" :key="index">
      <h2>{{ service.name }}</h2>
      <p>{{ service.description }}</p>
      <a :href="service.link" target="_blank" rel="noopener">
        <button class="learn-more">Visit Official Site</button>
      </a>
    </section>
  </div>
</template>


<script setup>
const services = [
  {
    name: "My Aged Care",
    description: "The central portal for accessing government-funded aged care services including assessments, support at home, and service finders.",
    link: "https://www.myagedcare.gov.au/"
  },
  {
    name: "Commonwealth Home Support Programme (CHSP)",
    description: "Entry-level services to help older people stay at home and be active in their community. Includes transport, social support, and meal delivery.",
    link: "https://www.health.gov.au/topics/aged-care/providing-aged-care-services/types-of-services"
  },
  {
    name: "Home Care Packages",
    description: "Coordinated support tailored to people with complex care needs to help them remain living safely at home.",
    link: "https://www.health.gov.au/topics/aged-care/providing-aged-care-services/types-of-services"
  },
  {
    name: "Aged Care Volunteer Visitors Scheme (ACVVS)",
    description: "Supports social connections by pairing older people with volunteer visitors for regular companionship.",
    link: "https://www.health.gov.au/our-work/aged-care-volunteer-visitors-scheme-acvvs/about"
  },
  {
    name: "National Aged Care Advocacy Program (NACAP)",
    description: "Free advocacy to help older Australians understand and exercise their rights when using aged care services.",
    link: "https://www.health.gov.au/our-work/national-aged-care-advocacy-program-nacap"
  },
  {
    name: "Disability Support for Older Australians (DSOA)",
    description: "Continued support for people over 65 who were previously receiving specialist disability services but are not eligible for the NDIS.",
    link: "https://www.health.gov.au/our-work/dsoa"
  },
  {
    name: "Positive Ageing Initiatives",
    description: "Programs that promote healthy and active ageing, lifelong learning, and social engagement for older adults.",
    link: "https://www.health.gov.au/topics/positive-ageing-is-ageing-well"
  },
  {
    name: "Support at Home Program (from July 2025)",
    description: "A new program combining CHSP and Home Care Packages into one flexible in-home support service for seniors.",
    link: "https://agedcareengagement.health.gov.au/reforms/home/"
  },
  {
    name: "Services in Rural and Remote Areas",
    description: "Specialised aged care support and services tailored to the needs of rural and remote communities in Australia.",
    link: "https://www.health.gov.au/topics/aged-care/providing-aged-care-services/support/rural-remote"
  },
  {
    name: "Aged Care Act 2024",
    description: "A major reform aiming to create a simpler, fairer, and more compassionate aged care system in Australia.",
    link: "https://www.health.gov.au/our-work/aged-care-act"
  }
];
</script>


<style scoped>
.services-container {
  font-family: 'Poppins', sans-serif;
  padding: 2rem;
  background-color: #fffefc;
  color: #333;
}

.hero-section {
  text-align: center;
  background-color: #eaf6fb;
  padding: 3rem 2rem;
  border-radius: 10px;
  margin-bottom: 2rem;
}

.hero-content h1 {
  font-size: 2.5rem;
  color: #1A237E;
}

.hero-content p {
  font-size: 1.2rem;
  margin-top: 0.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.info-section {
  margin-bottom: 2rem;
  padding: 1rem 1.5rem;
  background-color: #f9f9f9;
  border-left: 5px solid #1A237E;
  border-radius: 8px;
}

.info-section h2 {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: #0D47A1;
}

.info-section p {
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.learn-more {
  background-color: #0056b3;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
}

.learn-more:hover {
  background-color: #004197;
}
</style>
