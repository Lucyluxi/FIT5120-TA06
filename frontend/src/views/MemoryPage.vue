<template>
  <BackgroundSection>
    <div class="text-center py-4">
      <h2 class="mb-4">{{ $t("memoryTitle") }}</h2>
      <p class="mb-3">{{ $t("memoryInstructions") }}</p>

      <!-- Game Grid -->
      <div class="memory-grid mx-auto">
        <div
          v-for="(card, index) in cards"
          :key="index"
          class="memory-card"
          :class="{ flipped: isFlipped(index), matched: matchedIndices.includes(index) }"
          @click="handleCardClick(index)"
        >
          <div class="card-inner">
            <div class="card-front">{{ card }}</div>
            <div class="card-back">❓</div>
          </div>
        </div>
      </div>

      <!-- Reset Button -->
      <div class="mt-4">
        <ActionButton :label="$t('restart')" @click="resetGame" />
      </div>
    </div>
  </BackgroundSection>
</template>

  
  <script>
  import BackgroundSection from '@/components/BackgroundSection.vue';
  import ActionButton from '@/components/ActionButton.vue';
  
  export default {
    name: 'MemoryPage',
    components: { BackgroundSection, ActionButton },
    data() {
      return {
        baseItems: ['🍎', '🍌', '🍇', '🍒', '🍍', '🍉'], // icons for matching
        cards: [],
        flippedIndices: [],
        matchedIndices: [],
        lockBoard: false
      };
    },
    created() {
      this.resetGame();
    },
    methods: {
      shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
      },
      resetGame() {
        const items = this.shuffle([...this.baseItems, ...this.baseItems]);
        this.cards = items;
        this.flippedIndices = [];
        this.matchedIndices = [];
        this.lockBoard = false;
      },
      isFlipped(index) {
        return this.flippedIndices.includes(index) || this.matchedIndices.includes(index);
      },
      handleCardClick(index) {
        if (this.lockBoard || this.flippedIndices.includes(index) || this.matchedIndices.includes(index)) return;
  
        this.flippedIndices.push(index);
  
        // When two cards are flipped
        if (this.flippedIndices.length === 2) {
          const [first, second] = this.flippedIndices;
          if (this.cards[first] === this.cards[second]) {
            this.matchedIndices.push(first, second);
          }
          this.lockBoard = true;
  
          setTimeout(() => {
            this.flippedIndices = [];
            this.lockBoard = false;
          }, 1000);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .memory-grid {
    display: grid;
    grid-template-columns: repeat(4, 100px);
    grid-gap: 20px;
    justify-content: center;
  }
  
  .memory-card {
    width: 100px;
    height: 100px;
    perspective: 800px;
    cursor: pointer;
  }
  
  .card-inner {
    width: 100%;
    height: 100%;
    position: relative;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }
  
  .memory-card.flipped .card-inner {
    transform: rotateY(180deg);
  }
  
  .card-front,
  .card-back {
    position: absolute;
    backface-visibility: hidden;
    width: 100%;
    height: 100%;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    border: 2px solid #e08f55;
    background-color: white;
  }
  
  .card-back {
    background-color: #e08f55;
    color: white;
  }
  
  .card-front {
    transform: rotateY(180deg);
  }
  
  .matched {
    pointer-events: none;
    opacity: 0.6;
  }
  </style>
  