<template>
  <BackgroundSection>
    <div class="sudoku-container text-center">
      <h2 class="mb-3">{{ $t("sudokuTitle") }}</h2>
      <p class="mb-4">⏱️ {{ $t("timeElapsed") }}: {{ elapsedTime }} {{ $t("seconds") }}</p>

      <!-- Sudoku Grid -->
      <div class="grid mx-auto mb-4">
        <div v-for="(row, rowIndex) in userBoard" :key="rowIndex" class="row">
          <input
            v-for="(cell, colIndex) in row"
            :key="colIndex"
            type="text"
            class="cell"
            maxlength="1"
            :value="getCellValue(rowIndex, colIndex)"
            :readonly="isPreFilled(rowIndex, colIndex)"
            :class="{ 'error-cell': isIncorrect(rowIndex, colIndex) }"
            @input="handleInput($event, rowIndex, colIndex)"
          />
        </div>
      </div>

      <!-- Buttons -->
      <div class="button-group d-flex justify-content-center gap-3">
        <ActionButton :label="$t('checkAnswers')" @click="checkAnswers" />
        <ActionButton :label="$t('newPuzzle')" @click="resetGame" />
      </div>

      <!-- Completion message -->
      <p v-if="isCompleted" class="complete-message mt-4">
        🎉 {{ $t("congratulations") }} {{ elapsedTime }} {{ $t("seconds") }}.
      </p>
    </div>
  </BackgroundSection>
</template>

  
  <script>
  import BackgroundSection from "@/components/BackgroundSection.vue";
  import ActionButton from "@/components/ActionButton.vue";
  
  export default {
    name: "GameView",
    components: {
      BackgroundSection,
      ActionButton,
    },
    data() {
      return {
        fullSolution: [],
        originalBoard: [],
        userBoard: [],
        startTime: null,
        elapsedTime: 0,
        timer: null,
        isCompleted: false,
        incorrectCells: new Set(),
      };
    },
    created() {
      this.resetGame();
    },
    methods: {
      generateSolution() {
        // Backtracking generation
        const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
  
        const isSafe = (row, col, num) => {
          for (let i = 0; i < 9; i++) {
            if (
              grid[row][i] === num ||
              grid[i][col] === num ||
              grid[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + (i % 3)] === num
            ) {
              return false;
            }
          }
          return true;
        };
  
        const fillGrid = () => {
          for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
              if (grid[row][col] === 0) {
                const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
                for (let num of nums) {
                  if (isSafe(row, col, num)) {
                    grid[row][col] = num;
                    if (fillGrid()) return true;
                    grid[row][col] = 0;
                  }
                }
                return false;
              }
            }
          }
          return true;
        };
  
        fillGrid();
        return grid;
      },
      removeCells(grid, count = 40) {
        const puzzle = grid.map(row => row.slice());
        let removed = 0;
        while (removed < count) {
          const r = Math.floor(Math.random() * 9);
          const c = Math.floor(Math.random() * 9);
          if (puzzle[r][c] !== 0) {
            puzzle[r][c] = 0;
            removed++;
          }
        }
        return puzzle;
      },
      resetGame() {
        this.isCompleted = false;
        this.incorrectCells.clear();
        this.elapsedTime = 0;
        this.fullSolution = this.generateSolution();
        this.originalBoard = this.removeCells(this.fullSolution);
        this.userBoard = this.originalBoard.map(row => row.map(cell => (cell === 0 ? "" : cell)));
        this.startTimer();
      },
      isPreFilled(row, col) {
        return this.originalBoard[row][col] !== 0;
      },
      getCellValue(row, col) {
        return this.userBoard[row][col];
      },
      handleInput(event, row, col) {
        const value = event.target.value;
        if (/^[1-9]$/.test(value)) {
          this.userBoard[row][col] = value;
          this.incorrectCells.delete(`${row}-${col}`);
        } else {
          this.userBoard[row][col] = "";
        }
      },
      startTimer() {
        clearInterval(this.timer);
        this.startTime = Date.now();
        this.timer = setInterval(() => {
          this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
        }, 1000);
      },
      stopTimer() {
        clearInterval(this.timer);
      },
      checkAnswers() {
        this.incorrectCells.clear();
        let isCorrect = true;
        for (let r = 0; r < 9; r++) {
          for (let c = 0; c < 9; c++) {
            if (this.userBoard[r][c] != this.fullSolution[r][c]) {
              this.incorrectCells.add(`${r}-${c}`);
              isCorrect = false;
            }
          }
        }
        if (isCorrect) {
          this.isCompleted = true;
          this.stopTimer();
        }
      },
      isIncorrect(row, col) {
        return this.incorrectCells.has(`${row}-${col}`);
      },
    },
  };
  </script>
  
  <style scoped>
  .sudoku-container {
    padding: 2rem 0;
  }
  
  .grid {
    display: inline-block;
  }
  
  .row {
    display: flex;
  }
  
  .cell {
    width: 40px;
    height: 40px;
    font-size: 20px;
    text-align: center;
    margin: 1px;
    border: 1px solid #ccc;
  }
  
  .cell[readonly] {
    background-color: #f0f0f0;
    font-weight: bold;
    color: #555;
  }
  
  .error-cell {
    background-color: rgba(255, 0, 0, 0.15);
  }
  
  .complete-message {
    font-weight: bold;
    color: green;
    font-size: 1.2rem;
  }
  </style>
  