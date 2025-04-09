<template>
  <div>
    <!-- 🖼️ Hero Section with background image -->
    <section class="hero-image d-flex align-items-center justify-content-center text-center text-white">
      <!-- Text content inside soft translucent background box -->
      <div class="z-index-2 position-relative text-box p-4">
        <h1 class="display-4 fw-bold fade-in-up">Strengthening Communities for Seniors</h1>
        <p class="lead fade-in-up">
          Bringing Together Culturally Diverse Communities and Enhancing Social Connectivity in Australia
        </p>
      </div>
    </section>

    <!-- 📷 Image Cards Section -->
    <section class="py-5" style="background-color: #F4C1A1;">
      <div class="container">
        <div class="row g-4">

          <!-- Card 1 -->
          <div class="col-md-4">
            <div class="card-wrapper">
              <img src="/images/suburb.jpg" class="img-fluid w-100" style="height: 300px; object-fit: cover;" />
              <h5 class="card-title-overlay">Culturally Diverse Suburbs</h5>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="col-md-4">
            <div class="card-wrapper">
              <img src="/images/education.jpg" class="img-fluid w-100" style="height: 300px; object-fit: cover;" />
              <h5 class="card-title-overlay">Educational Communities</h5>
            </div>
          </div>

          <!-- Card 3 with router-link -->
          <div class="col-md-4">
            <router-link to="/activity" class="text-decoration-none">
              <div class="card-wrapper">
                <img src="/images/social.jpg" class="img-fluid w-100" style="height: 300px; object-fit: cover;" />
                <h5 class="card-title-overlay">Social Activities</h5>
              </div>
            </router-link>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* -----------------------------------
   Hero Section with Background Image
------------------------------------ */
.hero-image {
  background-image: url('/images/home.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.hero-image::before {
  /* Gradient overlay */
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.5));
  z-index: 1;
}

/* Text container: translucent box for white text */
.text-box {
  background-color: rgba(0, 0, 0, 0.4); /* translucent dark to boost white contrast */
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 1rem;
  max-width: 800px;
  margin: 0 auto;
  color: #fff;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}

/* Animation: fade-in and slide-up */
.fade-in-up {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 1.2s ease-out forwards;
  animation-delay: 0.3s;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* -----------------------------------
   Card Styling + Animation
------------------------------------ */
.card-wrapper {
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-wrapper:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 12px rgba(0,0,0,0.15);
}

/* Card overlay title */
.card-title-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 1rem;
  padding: 0.5rem 1rem;
  background-color: rgba(0,0,0,0.5);
  color: white;
  border-radius: 0.5rem;
  font-weight: 600;
}
</style>
