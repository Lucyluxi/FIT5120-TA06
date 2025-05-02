<script setup>
import { onMounted, watch, nextTick, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

// Props: control whether cursor is enabled and large
const props = defineProps({
  enabled: Boolean,
  isLargeCursor: Boolean
})

const route = useRoute()

let mouseX = 0, mouseY = 0
let dotX = 0, dotY = 0
let cursor = null
let cursorDot = null
let animationFrame1, animationFrame2

// Watch route to re-bind cursor refs if needed
watch(
  () => route.fullPath,
  () => {
    cursor = document.getElementById('customCursor')
    cursorDot = document.getElementById('cursorDot')
  },
  { immediate: true }
)

// When enabled, bind logic after DOM renders
watch(
  () => props.enabled,
  async (active) => {
    if (!active) return
    await nextTick()

    cursor = document.getElementById('customCursor')
    cursorDot = document.getElementById('cursorDot')
    const buttons = document.querySelectorAll('.cursor-button')

    document.addEventListener('mousemove', handleMouseMove)

    function animateDot() {
      dotX += (mouseX - dotX) * 0.17
      dotY += (mouseY - dotY) * 0.17
      if (cursorDot) {
        cursorDot.style.transform = `translate(${dotX - mouseX}px, ${dotY - mouseY}px)`
      }
      animationFrame1 = requestAnimationFrame(animateDot)
    }

    function checkCursorOverlap() {
      const radius = document.body.classList.contains('big-animated-cursor') ? 40 : 25
      const box = {
        top: mouseY - radius,
        bottom: mouseY + radius,
        left: mouseX - radius,
        right: mouseX + radius
      }

      buttons.forEach(button => {
        const rect = button.getBoundingClientRect()
        const hover =
          box.right > rect.left &&
          box.left < rect.right &&
          box.bottom > rect.top &&
          box.top < rect.bottom

        button.classList.toggle('hovered', hover)
        cursor?.classList.toggle('cursor-hover', hover)
      })

      animationFrame2 = requestAnimationFrame(checkCursorOverlap)
    }

    animateDot()
    checkCursorOverlap()
  },
  { immediate: true }
)

function handleMouseMove(e) {
  mouseX = e.clientX
  mouseY = e.clientY
  if (cursor) {
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`
  }
}

// Cleanup on unmount
onBeforeUnmount(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  cancelAnimationFrame(animationFrame1)
  cancelAnimationFrame(animationFrame2)
})
</script>

<template>
  <div v-if="enabled" class="custom-cursor" id="customCursor">
    <div class="custom-cursor-dot" id="cursorDot"></div>
  </div>
</template>

<style scoped>
.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  border: 2px solid #00bcd4;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease-out, background-color 0.3s ease, width 0.3s, height 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-cursor-dot {
  width: 12px;
  height: 12px;
  background-color: #f4b400;
  border-radius: 50%;
  position: absolute;
  transition: transform 0.15s ease-out, width 0.3s ease, height 0.3s ease;
}

.cursor-hover {
  transform: translate(-50%, -50%) scale(1.5);
  background-color: rgba(0, 188, 212, 0.1);
}

body.big-animated-cursor .custom-cursor {
  width: 80px;
  height: 80px;
  border-width: 3px;
}

body.big-animated-cursor .custom-cursor-dot {
  width: 20px;
  height: 20px;
}
</style>
