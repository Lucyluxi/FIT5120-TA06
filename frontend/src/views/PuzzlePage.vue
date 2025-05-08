<template>
  <BackgroundSection>
    <div class="text-center py-4">
      <h2 class="mb-4">{{ $t("puzzleTitle") }}</h2>
      <p class="mb-3">{{ $t("puzzleInstructions") }}</p>

      <div class="puzzle-grid mx-auto">
        <div
          v-for="(tile, index) in tiles"
          :key="index"
          class="puzzle-tile"
          :style="tileStyle(tile)"
          @click="handleTileClick(index)"
        ></div>
      </div>

      <p v-if="isCompleted" class="mt-4 complete-message">
        🎉 {{ $t("puzzleCompleted") }}
      </p>

      <div class="mt-4">
        <ActionButton :label="$t('shuffle')" @click="shuffleTiles" />
      </div>
    </div>
  </BackgroundSection>
</template>

  
  <script>
  import BackgroundSection from '@/components/BackgroundSection.vue';
  import ActionButton from '@/components/ActionButton.vue';
  
  export default {
    name: 'PuzzlePage',
    components: { BackgroundSection, ActionButton },
    data() {
      return {
        gridSize: 3,
        imageUrl: '/images/puzzleImage.jpg',
        tiles: [],
        selectedIndex: null,
        isCompleted: false,
      };
    },
    created() {
      this.shuffleTiles();
    },
    methods: {
      generateTiles() {
        const total = this.gridSize * this.gridSize;
        return Array.from({ length: total }, (_, i) => i);
      },
      shuffleTiles() {
        this.tiles = this.generateTiles().sort(() => Math.random() - 0.5);
        this.selectedIndex = null;
        this.isCompleted = false;
      },
      tileStyle(tileIndex) {
        const row = Math.floor(tileIndex / this.gridSize);
        const col = tileIndex % this.gridSize;
        const percent = 100 / (this.gridSize - 1);
  
        return {
          backgroundImage: `url(${this.imageUrl})`,
          backgroundSize: `${this.gridSize * 100}%`,
          backgroundPosition: `${col * percent}% ${row * percent}%`,
        };
      },
      handleTileClick(index) {
        if (this.selectedIndex === null) {
          this.selectedIndex = index;
        } else {
          // Swap tiles
          const temp = this.tiles[index];
          this.tiles[index] = this.tiles[this.selectedIndex];
          this.tiles[this.selectedIndex] = temp;
          this.selectedIndex = null;
  
          this.checkCompletion();
        }
      },
      checkCompletion() {
        const isSolved = this.tiles.every((tile, i) => tile === i);
        this.isCompleted = isSolved;
      }
    }
  };
  </script>
  
  <style scoped>
  .puzzle-grid {
    width: 300px;
    height: 300px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
    margin: auto;
    border: 2px solid #e08f55;
    background-color: #fff;
  }
  
  .puzzle-tile {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    cursor: pointer;
    border: 1px solid #ddd;
    transition: transform 0.2s ease;
  }
  
  .puzzle-tile:hover {
    transform: scale(1.03);
  }
  
  .complete-message {
    font-weight: bold;
    color: green;
    font-size: 1.2rem;
  }
  </style>
  