<template>
    <section class="background-section py-5">
      <div class="container">
        <slot />
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: "BackgroundSection"
  };
  </script>
  
  <style scoped>
  .background-section {
    background-color: rgba(253, 253, 253, 0.8); /* soft warm beige */
  }
  </style>
  