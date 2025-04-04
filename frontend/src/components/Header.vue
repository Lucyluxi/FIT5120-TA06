<template>
  <!-- Use container-fluid to make header full-width -->
  <div class="container-fluid">
    <header class="custom-header d-flex flex-wrap justify-content-center align-items-center border-bottom">
      <a href="/" class="d-flex align-items-center me-md-auto link-body-emphasis text-decoration-none">
        <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
        <span class="fs-4">Simple Header</span>
      </a>

      <ul class="nav nav-pills">
        <li class="nav-item"><a href="/" class="nav-link active" aria-current="page">Home</a></li>
        <li class="nav-item"><a href="/activity" class="nav-link">Activities</a></li>
        <!-- <li class="nav-item"><a href="/test" class="nav-link">Pricing</a></li>
        <li class="nav-item"><a href="#" class="nav-link">FAQs</a></li>
        <li class="nav-item"><a href="/about" class="nav-link">About</a></li> -->
      </ul>
    </header>
  </div>
</template>

<style scoped>
/* Full-width header background with transparency */
.custom-header {
  background-color: rgba(252, 235, 213, 0.8); /* soft warm beige/orange with 80% opacity */
  padding: 0.5rem 2rem;
  border-radius: 0 0 0.5rem 0.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

/* Nav links (default) */
.nav-link {
  font-weight: 500;
  font-size: 1rem;
  color: #4b3832; /* warm dark brown */
  background-color: transparent;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.2s;
}

/* Hover effect */
.nav-link:hover {
  background-color: #e08f55; /* Darker orange to ensure better contrast */
  color: #fff; /* Ensure text stays white */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Active state */
.nav-link.active,
.nav-pills .nav-link.active {
  background-color: #eec8aa; /* deeper warm orange */
  color: #000;
  font-weight: 600;
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.05);
}
</style>

