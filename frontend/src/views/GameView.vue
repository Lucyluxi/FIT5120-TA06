<template>
  <BackgroundSection>
    <div class="page-wrapper text-center py-4">
      <h2 class="mb-4">🎮 Choose a Game</h2>

      <div class="row justify-content-center g-4">
        <!-- Card 1: Sudoku -->
        <div class="col-md-4">
          <router-link to="/game/sudoku" class="text-decoration-none">
            <div class="game-card">
              <img src="/images/sudoku.jpg" class="img-fluid w-100" style="height: 220px; object-fit: cover;" />
              <h5 class="card-title-overlay">Sudoku</h5>
            </div>
          </router-link>
        </div>

        <!-- Card 2: Memory Match -->
        <div class="col-md-4">
          <router-link to="/game/memory" class="text-decoration-none">
            <div class="game-card">
              <img src="/images/memory.jpg" class="img-fluid w-100" style="height: 220px; object-fit: cover;" />
              <h5 class="card-title-overlay">Memory Match</h5>
            </div>
          </router-link>
        </div>

        <!-- Card 3: Jigsaw Puzzle -->
        <div class="col-md-4">
          <router-link to="/game/puzzle" class="text-decoration-none">
            <div class="game-card">
              <img src="/images/puzzle.jpg" class="img-fluid w-100" style="height: 220px; object-fit: cover;" />
              <h5 class="card-title-overlay">Jigsaw Puzzle</h5>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </BackgroundSection>
</template>

<script>
import BackgroundSection from '@/components/BackgroundSection.vue';

export default {
  name: 'GameView',
  components: {
    BackgroundSection
  }
};
</script>

<style scoped>
/* Outer wrapper to stretch at least to full viewport height */
.page-wrapper {
  min-height: calc(100vh - 100px); /* Adjust if your header height is different */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Game card styling */
.game-card {
  position: relative;
  overflow: hidden;
  border-radius: 0.75rem;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.game-card:hover {
  transform: scale(1.03);
  box-shadow: 0 6px 12px rgba(0,0,0,0.2);
}

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
