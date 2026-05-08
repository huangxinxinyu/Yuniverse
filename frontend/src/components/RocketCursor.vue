<template>
  <div class="rocket-cursor-container" :class="{ 'is-active': isVisible }">
    <div class="rocket-cursor" :style="rocketStyle">
      <svg
        :width="props.size"
        :height="props.size"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="rocketBody" x1="18" y1="8" x2="46" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#ffffff" />
            <stop offset="0.38" stop-color="#dff7ff" />
            <stop offset="1" stop-color="#4a8dff" />
          </linearGradient>
          <linearGradient id="rocketWing" x1="11" y1="35" x2="53" y2="55" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#ff3d81" />
            <stop offset="1" stop-color="#8b5cf6" />
          </linearGradient>
          <radialGradient id="rocketWindow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 23) rotate(90) scale(8)">
            <stop offset="0" stop-color="#ffffff" />
            <stop offset="0.45" stop-color="#7df9ff" />
            <stop offset="1" stop-color="#246bfe" />
          </radialGradient>
          <filter id="rocketGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 0 0 0 0.30 0 0 0 0 0.70 0 0 0 0 1 0 0 0 0.85 0"
            />
            <feBlend in="SourceGraphic" mode="screen" />
          </filter>
        </defs>

        <g filter="url(#rocketGlow)">
          <path d="M32 5C42 13 46 25 43 39C40 48 35 55 32 58C29 55 24 48 21 39C18 25 22 13 32 5Z" fill="url(#rocketBody)" />
          <path d="M32 5C36 9 39 14 41 20C38 18 35 17 32 17C29 17 26 18 23 20C25 14 28 9 32 5Z" fill="#ff3d81" />
          <path d="M21 38L9 51L25 48Z" fill="url(#rocketWing)" />
          <path d="M43 38L55 51L39 48Z" fill="url(#rocketWing)" />
          <circle cx="32" cy="25" r="7" fill="#08111f" opacity="0.95" />
          <circle cx="32" cy="25" r="5" fill="url(#rocketWindow)" />
          <path d="M27 50C29 56 31 60 32 62C33 60 35 56 37 50Z" fill="#ffb703" />
          <path d="M30 51C31 56 32 59 32 60C32 59 33 56 34 51Z" fill="#fff176" />
        </g>
      </svg>
    </div>

    <div
      v-for="particle in particles"
      :key="particle.id"
      class="trail-particle"
      :style="particle.style"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: '#38bdf8'
  },
  size: {
    type: Number,
    default: 42
  },
  trail: {
    type: Boolean,
    default: true
  },
  trailLength: {
    type: Number,
    default: 34
  },
  speed: {
    type: Number,
    default: 0.22
  },
  enabled: {
    type: Boolean,
    default: true
  }
})

const pointer = reactive({ x: -100, y: -100, prevX: -100, prevY: -100 })
const velocity = reactive({ x: 0, y: 0 })
const particles = ref([])
const isVisible = ref(false)
const angle = ref(-Math.PI / 2)

let frameId = null
let lastFrame = 0
let lastParticleAt = 0
let cursorStyle = null
let particleId = 0

const rocketCenter = computed(() => {
  const tipOffset = props.size * 0.42

  return {
    x: pointer.x - Math.cos(angle.value) * tipOffset,
    y: pointer.y - Math.sin(angle.value) * tipOffset
  }
})

const rocketStyle = computed(() => ({
  left: `${rocketCenter.value.x}px`,
  top: `${rocketCenter.value.y}px`,
  width: `${props.size}px`,
  height: `${props.size}px`,
  opacity: isVisible.value ? 1 : 0,
  transform: `translate(-50%, -50%) rotate(${angle.value + Math.PI / 2}rad)`
}))

const shortestAngle = (from, to) => {
  let diff = to - from
  while (diff > Math.PI) diff -= Math.PI * 2
  while (diff < -Math.PI) diff += Math.PI * 2
  return diff
}

const handlePointerMove = (event) => {
  pointer.x = event.clientX
  pointer.y = event.clientY
  isVisible.value = true
}

const handlePointerLeave = () => {
  isVisible.value = false
}

const addTrailParticle = (speed) => {
  const tailDistance = props.size * 0.46
  const tailX = rocketCenter.value.x - Math.cos(angle.value) * tailDistance
  const tailY = rocketCenter.value.y - Math.sin(angle.value) * tailDistance
  const drift = Math.min(8, speed * 0.08)

  particles.value.push({
    id: particleId++,
    x: tailX,
    y: tailY,
    vx: -Math.cos(angle.value) * drift + (Math.random() - 0.5) * 1.2,
    vy: -Math.sin(angle.value) * drift + (Math.random() - 0.5) * 1.2,
    life: 1,
    size: 5 + Math.random() * 8,
    hue: Math.random() > 0.45 ? 198 : 36,
    style: {}
  })

  if (particles.value.length > props.trailLength) {
    particles.value.splice(0, particles.value.length - props.trailLength)
  }
}

const updateParticles = (dt) => {
  particles.value.forEach((particle) => {
    particle.life -= dt * 2.4
    particle.x += particle.vx * dt * 60
    particle.y += particle.vy * dt * 60
    particle.vx *= 0.985
    particle.vy *= 0.985

    const life = Math.max(0, particle.life)
    const scale = 0.35 + life * 0.95
    const alpha = life * 0.85
    const blur = (1 - life) * 5

    particle.style = {
      left: `${particle.x}px`,
      top: `${particle.y}px`,
      width: `${particle.size}px`,
      height: `${particle.size}px`,
      opacity: alpha,
      filter: `blur(${blur}px)`,
      transform: `translate(-50%, -50%) scale(${scale})`,
      background: particle.hue === 198
        ? `radial-gradient(circle, rgba(255,255,255,0.95) 0%, ${props.color} 32%, rgba(14,165,233,0.38) 68%, transparent 100%)`
        : 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, #ffe66d 28%, #fb7185 62%, transparent 100%)'
    }
  })

  particles.value = particles.value.filter((particle) => particle.life > 0)
}

const tick = (time) => {
  const dt = Math.min(0.033, (time - lastFrame) / 1000 || 0.016)
  lastFrame = time

  velocity.x = pointer.x - pointer.prevX
  velocity.y = pointer.y - pointer.prevY
  const speed = Math.hypot(velocity.x, velocity.y)

  if (speed > 0.2) {
    const targetAngle = Math.atan2(velocity.y, velocity.x)
    const turnRate = Math.min(1, 0.22 + props.speed)
    angle.value += shortestAngle(angle.value, targetAngle) * turnRate
  }

  if (props.trail && isVisible.value && speed > 1.1 && time - lastParticleAt > 18) {
    addTrailParticle(speed)
    lastParticleAt = time
  }

  updateParticles(dt)

  pointer.prevX = pointer.x
  pointer.prevY = pointer.y
  frameId = requestAnimationFrame(tick)
}

onMounted(() => {
  const shouldDisable = window.matchMedia('(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)').matches
  if (!props.enabled || shouldDisable) return

  cursorStyle = document.createElement('style')
  cursorStyle.dataset.rocketCursor = 'true'
  cursorStyle.textContent = `
    *, *::before, *::after {
      cursor: none !important;
    }
  `
  document.head.appendChild(cursorStyle)

  window.addEventListener('pointermove', handlePointerMove, { passive: true })
  document.addEventListener('mouseleave', handlePointerLeave)
  frameId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  cursorStyle?.remove()
  window.removeEventListener('pointermove', handlePointerMove)
  document.removeEventListener('mouseleave', handlePointerLeave)

  if (frameId) {
    cancelAnimationFrame(frameId)
  }
})
</script>

<style scoped>
.rocket-cursor-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: screen;
}

.rocket-cursor {
  position: fixed;
  pointer-events: none;
  z-index: 10000;
  transform-origin: center center;
  transition: opacity 140ms ease;
  will-change: transform, left, top;
  filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.75)) drop-shadow(0 0 22px rgba(168, 85, 247, 0.45));
}

.rocket-cursor::before {
  position: absolute;
  inset: 18% 26% auto;
  height: 58%;
  content: "";
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.85), transparent 62%);
  opacity: 0.5;
  transform: rotate(-18deg);
}

.trail-particle {
  position: fixed;
  border-radius: 999px;
  pointer-events: none;
  z-index: 9998;
  transform-origin: center center;
  will-change: transform, opacity, left, top, filter;
  box-shadow: 0 0 14px currentColor;
}

@media (hover: none), (pointer: coarse), (prefers-reduced-motion: reduce) {
  .rocket-cursor-container {
    display: none;
  }
}
</style>
