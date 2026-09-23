import { useEffect, useRef, useState, type CSSProperties } from 'react'

type PetPose = 'rest' | 'look' | 'reach'
type PetDirection = 'left' | 'center' | 'right'

type PetState = {
  direction: PetDirection
  pose: PetPose
  x: number
  y: number
  tilt: number
}

const restingState: PetState = {
  direction: 'center',
  pose: 'rest',
  x: 0,
  y: 0,
  tilt: 0,
}

function clamp(value: number, limit: number) {
  return Math.max(-limit, Math.min(limit, value))
}

export function BlogDeskPet() {
  const petRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<PetState>(restingState)

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const followPointer = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || !petRef.current) {
        return
      }

      const bounds = petRef.current.getBoundingClientRect()
      const dx = event.clientX - (bounds.left + bounds.width / 2)
      const dy = event.clientY - (bounds.top + bounds.height / 2)
      const distance = Math.hypot(dx, dy)

      if (distance > 340) {
        setState(restingState)
        return
      }

      setState({
        direction: dx < -24 ? 'left' : dx > 24 ? 'right' : 'center',
        pose: distance < 180 ? 'reach' : 'look',
        x: clamp(dx / 18, 13),
        y: clamp(dy / 28, 8),
        tilt: clamp(dx / 38, 7),
      })
    }

    window.addEventListener('pointermove', followPointer, { passive: true })
    return () => window.removeEventListener('pointermove', followPointer)
  }, [])

  const petStyle = {
    '--pet-x': `${state.x}px`,
    '--pet-y': `${state.y}px`,
    '--pet-tilt': `${state.tilt}deg`,
  } as CSSProperties

  return (
    <div
      className="blog-desk-pet"
      data-direction={state.direction}
      data-pose={state.pose}
      data-testid="blog-desk-pet"
      ref={petRef}
      style={petStyle}
    >
      <div className="blog-desk-pet-art">
        <img
          alt="白色小狗趴在红色木碗里"
          className="blog-desk-pet-rest"
          draggable="false"
          height="588"
          src="/images/blog/desk-pet-rest.png"
          width="760"
        />
        <img
          alt=""
          aria-hidden="true"
          className="blog-desk-pet-reach"
          draggable="false"
          height="588"
          src="/images/blog/desk-pet-reach.png"
          width="760"
        />
      </div>
    </div>
  )
}
