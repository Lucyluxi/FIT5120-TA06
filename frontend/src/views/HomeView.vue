<template>
  <div>
    <!-- 🎥 Video Background Section -->
    <section class="position-relative">
      <video
        autoplay
        muted
        loop
        playsinline
        class="w-100"
        style="height: 100vh; object-fit: cover;" 
      >
        <source src="/videos/older.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <!-- Optional dark overlay to make the text on top more readable -->
      <div class="position-absolute top-0 start-0 w-100 h-100" style="background-color: rgba(0,0,0,0.4);"></div>
    </section>

    <!-- 📷 Image Cards Section with Custom Light Background -->
    <section class="py-5" style="background-color: #F4C1A1;"> <!-- Light orange background color -->
      <div class="container">
        <div class="row g-4">

          <!-- Card 1: Culturally Diverse Suburbs -->
          <div class="col-md-4">
            <div class="position-relative rounded overflow-hidden shadow">
              <img src="/images/suburb.jpg" class="img-fluid w-100" style="height: 300px; object-fit: cover;" />
              <!-- Card title overlaying the image -->
              <h5 class="position-absolute bottom-0 start-0 m-3 text-white bg-dark bg-opacity-50 px-3 py-2 rounded">
                Culturally Diverse Suburbs
              </h5>
            </div>
          </div>

          <!-- Card 2: Educational Communities -->
          <div class="col-md-4">
            <div class="position-relative rounded overflow-hidden shadow">
              <img src="/images/education.jpg" class="img-fluid w-100" style="height: 300px; object-fit: cover;" />
              <!-- Card title overlaying the image -->
              <h5 class="position-absolute bottom-0 start-0 m-3 text-white bg-dark bg-opacity-50 px-3 py-2 rounded">
                Educational Communities
              </h5>
            </div>
          </div>

          <!-- Card 3: Social Activities -->
          <div class="col-md-4">
            <div class="position-relative rounded overflow-hidden shadow">
              <img src="/images/social.jpg" class="img-fluid w-100" style="height: 300px; object-fit: cover;" />
              <!-- Card title overlaying the image -->
              <h5 class="position-absolute bottom-0 start-0 m-3 text-white bg-dark bg-opacity-50 px-3 py-2 rounded">
                Social Activities
              </h5>
            </div>
          </div>

        </div>
      </div>
    </section>

  </div>
</template>
