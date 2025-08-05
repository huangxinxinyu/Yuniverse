<template>
  <div class="rocket-cursor-container">
    <!-- Rocket cursor -->
    <div
        ref="rocketRef"
        class="rocket-cursor"
        :style="rocketStyle"
    >
      <svg
          width="50"
          height="50"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Rocket body (red) -->
        <ellipse cx="20" cy="15" rx="5" ry="10" fill="#ff4444"/>

        <!-- Rocket nose (darker red) -->
        <path d="M20 5 L15 10 L25 10 Z" fill="#cc2222"/>

        <!-- Rocket fins -->
        <path d="M15 20 L10 25 L15 25 Z" fill="#ff6666"/>
        <path d="M25 20 L30 25 L25 25 Z" fill="#ff6666"/>

        <!-- Window -->
        <circle cx="20" cy="12.5" r="2.5" fill="#87ceeb"/>

        <!-- Flame (yellow/orange) -->
        <path d="M17.5 25 Q20 35 20 35 Q22.5 35 22.5 25 Q21.25 30 20 32.5 Q18.75 30 17.5 25 Z" fill="#ffa500"/>
        <path d="M18.75 25 Q20 32.5 20 32.5 Q21.25 32.5 21.25 25 Q20.625 28.75 20 31.25 Q19.375 28.75 18.75 25 Z" fill="#ffff00"/>
      </svg>
    </div>

    <!-- Trail particles -->
    <div
        v-for="(particle, index) in particles"
        :key="`particle-${index}`"
        class="trail-particle"
        :style="particle.style"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue'

// Props
const props = defineProps({
  color: {
    type: String,
    default: '#ffa500'
  },
  size: {
    type: Number,
    default: 40
  },
  trail: {
    type: Boolean,
    default: true
  },
  trailLength: {
    type: Number,
    default: 25
  },
  speed: {
    type: Number,
    default: 0.15
  },
  enabled: {
    type: Boolean,
    default: true
  }
})

// Refs
const rocketRef = ref(null)

// Reactive data
const mousePos = reactive({ x: 0, y: 0 })
const rocketPos = reactive({ x: 0, y: 0 })
const particles = ref([])
const isMoving = ref(false)
const velocity = reactive({ x: 0, y: 0 })

// Computed styles
const rocketStyle = computed(() => ({
  left: `${rocketPos.x}px`,
  top: `${rocketPos.y}px`,
  width: `${props.size}px`,
  height: `${props.size}px`,
  transform: `rotate(${Math.atan2(velocity.y, velocity.x) + Math.PI / 2}rad) translate(-50%, -50%)`,
  opacity: isMoving.value ? 1 : 0
}))

// Animation frame ID
let animationFrame = null

// Mouse move handler
const handleMouseMove = (e) => {
  mousePos.x = e.clientX
  mousePos.y = e.clientY
  isMoving.value = true
}

// Mouse enter handler
const handleMouseEnter = () => {
  isMoving.value = true
}

// Mouse leave handler
const handleMouseLeave = () => {
  isMoving.value = false
}

// Update rocket position with smooth following
const updateRocketPosition = () => {
  const dx = mousePos.x - rocketPos.x
  const dy = mousePos.y - rocketPos.y

  // Calculate velocity for rotation
  velocity.x = dx * props.speed
  velocity.y = dy * props.speed

  // Smooth following with easing
  rocketPos.x += dx * props.speed
  rocketPos.y += dy * props.speed

  // Add trail particles if enabled and moving fast enough
  if (props.trail && isMoving.value && (Math.abs(velocity.x) > 0.5 || Math.abs(velocity.y) > 0.5)) {
    addTrailParticle()
  }

  // Clean up old particles
  particles.value = particles.value.filter(particle => particle.life > 0)

  // Update particles with slight random movement
  particles.value.forEach((particle, index) => {
    particle.life -= 0.025
    const fadeOut = Math.max(0, particle.life)
    const scale = fadeOut * (0.8 + Math.random() * 0.4)

    // Add slight random drift to particles
    const drift = index * 0.5
    particle.style.opacity = fadeOut
    particle.style.transform = `translate(-50%, -50%) scale(${scale})`

    // Parse current position and add drift
    const currentLeft = parseFloat(particle.style.left)
    const currentTop = parseFloat(particle.style.top)
    particle.style.left = `${currentLeft + (Math.random() - 0.5) * drift}px`
    particle.style.top = `${currentTop + (Math.random() - 0.5) * drift}px`
  })

  animationFrame = requestAnimationFrame(updateRocketPosition)
}

// Add trail particle
const addTrailParticle = () => {
  if (particles.value.length < props.trailLength) {
    // Calculate rocket tail position based on rotation
    const angle = Math.atan2(velocity.y, velocity.x) + Math.PI / 2
    const tailOffset = 20 // Distance from rocket center to tail
    const tailX = rocketPos.x - Math.sin(angle) * tailOffset
    const tailY = rocketPos.y + Math.cos(angle) * tailOffset

    const particle = {
      id: Date.now() + Math.random(),
      life: 1,
      style: {
        left: `${tailX}px`,
        top: `${tailY}px`,
        opacity: 1,
        transform: 'translate(-50%, -50%) scale(1)'
      }
    }
    particles.value.push(particle)
  }
}

// Initialize cursor
onMounted(() => {
  if (!props.enabled) return

  // Hide default cursor globally
  const style = document.createElement('style')
  style.textContent = `
    *, *::before, *::after {
      cursor: none !important;
    }
    a, button, [role="button"], input, textarea, select {
      cursor: none !important;
    }
  `
  document.head.appendChild(style)

  // Add event listeners
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseenter', handleMouseEnter)
  document.addEventListener('mouseleave', handleMouseLeave)

  // Start animation loop
  updateRocketPosition()
})

// Cleanup
onUnmounted(() => {
  if (!props.enabled) return

  // Restore default cursor by removing our style
  const styles = document.head.querySelectorAll('style')
  styles.forEach(style => {
    if (style.textContent.includes('cursor: none !important')) {
      style.remove()
    }
  })

  // Remove event listeners
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseenter', handleMouseEnter)
  document.removeEventListener('mouseleave', handleMouseLeave)

  // Cancel animation frame
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})
</script>

<style scoped>
.rocket-cursor-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}

.rocket-cursor {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transition: opacity 0.2s ease;
  transform-origin: center center;
}

.trail-particle {
  position: fixed;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transition: opacity 0.05s ease;
  transform-origin: center center;
  background: radial-gradient(circle, #ffff00 0%, #ffa500 40%, #ff6600 80%, transparent 100%);
}

/* Hide cursor on touch devices */
@media (hover: none) and (pointer: coarse) {
  .rocket-cursor-container {
    display: none;
  }
}
</style>