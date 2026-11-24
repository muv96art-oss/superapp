import { useEffect, useRef } from 'react'

type DragState = {
  pointerId: number
  startX: number
  startScroll: number
  moved: boolean
  capturing: boolean
}

/** Enables mouse/pointer drag-to-scroll on overflow-x carousels without blocking taps */
export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const dragRef = useRef<DragState | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return
      dragRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startScroll: el.scrollLeft,
        moved: false,
        capturing: false,
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      const drag = dragRef.current
      if (!drag || drag.pointerId !== event.pointerId) return

      const deltaX = event.clientX - drag.startX
      if (!drag.moved && Math.abs(deltaX) > 6) {
        drag.moved = true
        drag.capturing = true
        el.setPointerCapture(event.pointerId)
        el.classList.add('cursor-grabbing')
      }

      if (drag.moved) {
        el.scrollLeft = drag.startScroll - deltaX
        event.preventDefault()
      }
    }

    const endDrag = (event: PointerEvent) => {
      const drag = dragRef.current
      if (!drag || drag.pointerId !== event.pointerId) return

      const wasMoved = drag.moved
      if (drag.capturing && el.hasPointerCapture(event.pointerId)) {
        el.releasePointerCapture(event.pointerId)
      }
      dragRef.current = null
      el.classList.remove('cursor-grabbing')

      // Only suppress click when it was an actual swipe
      if (wasMoved) {
        const blockClick = (e: Event) => {
          e.preventDefault()
          e.stopPropagation()
          el.removeEventListener('click', blockClick, true)
        }
        el.addEventListener('click', blockClick, true)
      }
    }

    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerup', endDrag)
    el.addEventListener('pointercancel', endDrag)

    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', endDrag)
      el.removeEventListener('pointercancel', endDrag)
    }
  }, [])

  return { ref }
}
