import { useEffect, useRef, useState } from 'react'
import { assets } from '../assets'

type Props = {
  open: boolean
  onClose: () => void
  onLoginMoby: () => void
}

type DragState = {
  pointerId: number
  startY: number
  lastY: number
  lastTs: number
  velocity: number
}

const DISMISS_PX = 88
const DISMISS_VELOCITY = 0.55

/**
 * Market login bottom sheet — Figma 613:11151 / overlay 609:9443
 * Swipe zone 613:11152 — swipe down closes the sheet
 */
export function LoginBottomSheet({ open, onClose, onLoginMoby }: Props) {
  const [shown, setShown] = useState(false)
  const [dragY, setDragY] = useState(0)
  const [dragging, setDragging] = useState(false)
  const dragRef = useRef<DragState | null>(null)

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setShown(open)
      if (open) setDragY(0)
    })
    return () => cancelAnimationFrame(frame)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const onSwipePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return
    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = {
      pointerId: event.pointerId,
      startY: event.clientY,
      lastY: event.clientY,
      lastTs: performance.now(),
      velocity: 0,
    }
    setDragging(true)
  }

  const onSwipePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    const now = performance.now()
    const dy = Math.max(0, event.clientY - drag.startY)
    const dt = Math.max(1, now - drag.lastTs)
    drag.velocity = (event.clientY - drag.lastY) / dt
    drag.lastY = event.clientY
    drag.lastTs = now
    setDragY(dy)
  }

  const endSwipe = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    const dy = Math.max(0, event.clientY - drag.startY)
    const shouldClose = dy >= DISMISS_PX || drag.velocity >= DISMISS_VELOCITY
    dragRef.current = null
    setDragging(false)
    if (shouldClose) {
      setDragY(0)
      onClose()
      return
    }
    setDragY(0)
  }

  if (!open && !shown) return null

  const sheetOffset = shown ? dragY : 0
  const backdropOpacity = shown ? Math.max(0, 1 - dragY / 280) : 0

  return (
    <div className="absolute inset-0 z-[70]" data-name="login-bottom-sheet" data-node-id="609:9443">
      <button
        type="button"
        aria-label="Закрыть вход"
        className="absolute inset-0 bg-black/40 transition-opacity duration-300 ease-out motion-reduce:transition-none"
        style={{
          opacity: backdropOpacity,
          transition: dragging ? 'none' : undefined,
        }}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-sheet-title"
        className={`absolute inset-x-0 bottom-0 flex flex-col overflow-hidden rounded-t-[36px] bg-bg-base motion-reduce:transition-none ${
          dragging ? '' : 'transition-transform duration-300 ease-out'
        }`}
        style={{
          transform: shown
            ? `translate3d(0, ${sheetOffset}px, 0)`
            : 'translate3d(0, 100%, 0)',
        }}
        data-node-id="613:11151"
        data-name="Buttom sheet"
      >
        {/* Swipe zone — Figma 613:11152 / 609:10073 */}
        <div
          className="flex h-16 w-full shrink-0 touch-none flex-col items-center px-2.5 pb-8 pt-7"
          style={{ touchAction: 'none', cursor: dragging ? 'grabbing' : 'grab' }}
          data-node-id="613:11152"
          data-name="Swipe zone for buttom sheet"
          onPointerDown={onSwipePointerDown}
          onPointerMove={onSwipePointerMove}
          onPointerUp={endSwipe}
          onPointerCancel={endSwipe}
          role="presentation"
          aria-label="Потяните вниз, чтобы закрыть"
        >
          <div className="h-1 w-9 rounded-[2px] bg-[#cdd0d5]" aria-hidden="true" />
        </div>

        <div
          className="flex w-full flex-col items-center justify-center gap-6 pb-6"
          data-node-id="613:11153"
        >
          <div className="flex w-full flex-col items-center gap-8" data-node-id="613:11154">
            <div className="flex w-full flex-col items-center gap-3 px-6" data-node-id="613:11155">
              <h2
                id="login-sheet-title"
                className="text-center text-[20px] font-bold leading-[26px] text-text-primary"
                data-node-id="613:11157"
              >
                Войдите в приложение
              </h2>
              <p
                className="w-full text-center text-[14px] font-normal leading-[18px] text-text-secondary"
                data-node-id="613:11159"
              >
                Чтобы делать покупки, следить за статусом заказов, использовать бонусы
              </p>
            </div>

            <div
              className="flex w-full flex-col items-center gap-3 px-5"
              data-node-id="613:11160"
            >
              <p
                className="w-full text-center text-[14px] leading-[18px] text-text-secondary"
                data-node-id="625:6868"
              >
                По аккаунту Moby
              </p>

              <button
                type="button"
                onClick={onLoginMoby}
                className="flex w-full items-center gap-4 rounded-xl bg-surface-secondary p-3 text-left"
                data-node-id="625:6839"
                data-name="Log Moby"
              >
                <span
                  className="flex size-[52px] shrink-0 items-center justify-center rounded-xl bg-surface-brand"
                  data-node-id="625:6840"
                  data-name="Avatar"
                >
                  <img
                    alt=""
                    width={24}
                    height={24}
                    src={assets.authMobySign}
                    className="size-6"
                  />
                </span>

                <span className="flex min-w-0 flex-1 flex-col gap-1" data-node-id="625:6842">
                  <span className="truncate text-[14px] font-semibold leading-5 text-text-primary">
                    Черкиза Александр Александрович
                  </span>
                  <span className="text-[14px] font-medium leading-5 text-text-secondary">
                    +375 (29) ***-**-80
                  </span>
                </span>

                <span className="flex shrink-0 items-center self-stretch pl-4">
                  <img
                    alt=""
                    width={22}
                    height={22}
                    src={assets.authChevronRight}
                    className="size-[22px]"
                    aria-hidden="true"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="h-[34px] w-full shrink-0" aria-hidden="true" data-node-id="613:11168" />
      </div>
    </div>
  )
}
