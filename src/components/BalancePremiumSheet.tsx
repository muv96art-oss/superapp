import { useEffect, useRef, useState } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  /** After consent + «Подключить» — connect Premium and continue flow */
  onConnect: () => void
  onRulesClick?: () => void
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

const TERMS = [
  { label: 'Обслуживание', value: '8 BYN / месяц' },
  { label: 'Кредитный лимит', value: 'До 10 000 BYN' },
  { label: 'Бесплатная рассрочка', value: '3 месяца' },
  { label: '% на остаток', value: '2.5%' },
  { label: 'Кешбек на маркете', value: 'До 20%' },
  { label: 'Кешбек вне маркета', value: 'До 5%' },
  { label: 'Категории лояльности', value: '1-7' },
  { label: 'Приоритетная поддержка', value: 'Да' },
  { label: 'Бесплатная доставка', value: 'Да' },
  { label: 'Привилегии VISA', value: 'Да' },
] as const

/**
 * Premium subscribe bottom sheet — Figma 716:12084 (screen 716:11902)
 * Banner → sheet → consent toggle → Подключить → premium phase
 */
export function BalancePremiumSheet({
  open,
  onClose,
  onConnect,
  onRulesClick,
}: Props) {
  const [shown, setShown] = useState(false)
  const [dragY, setDragY] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const dragRef = useRef<DragState | null>(null)

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setShown(open)
      if (open) {
        setDragY(0)
        setAgreed(false)
      }
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
    <div
      className="absolute inset-0 z-[80]"
      data-name="premium-bottom-sheet"
      data-node-id="716:11902"
    >
      <button
        type="button"
        aria-label="Закрыть Premium"
        className="absolute inset-0 bg-black/40 transition-opacity duration-300 ease-out motion-reduce:transition-none"
        style={{
          opacity: backdropOpacity,
          transition: dragging ? 'none' : undefined,
        }}
        onClick={onClose}
        data-node-id="716:12027"
        data-name="darkening"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="premium-sheet-title"
        className={`absolute inset-x-0 bottom-0 flex max-h-[calc(100%-44px)] flex-col overflow-hidden rounded-t-[36px] bg-bg-base motion-reduce:transition-none ${
          dragging ? '' : 'transition-transform duration-300 ease-out'
        }`}
        style={{
          transform: shown
            ? `translate3d(0, ${sheetOffset}px, 0)`
            : 'translate3d(0, 100%, 0)',
        }}
        data-node-id="716:12084"
        data-name="Buttom sheet"
      >
        <div
          className="flex h-16 w-full shrink-0 touch-none flex-col items-center px-2.5 pb-8 pt-7"
          style={{ touchAction: 'none', cursor: dragging ? 'grabbing' : 'grab' }}
          data-node-id="716:12085"
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
          className="flex min-h-0 w-full flex-1 flex-col items-center gap-6 overflow-y-auto px-4 pb-6"
          data-node-id="716:12086"
        >
          <div
            className="flex w-full flex-col items-center gap-8"
            data-node-id="716:12087"
          >
            <div
              className="flex w-full flex-col items-start gap-6"
              data-node-id="716:12088"
              data-name="content page"
            >
              <div
                className="flex w-full flex-col items-center gap-3"
                data-node-id="716:12089"
                data-name="Body"
              >
                <div className="flex w-full flex-col items-start gap-2 text-center">
                  <h2
                    id="premium-sheet-title"
                    className="h-[26px] w-full font-inter text-[20px] font-semibold leading-[26px] text-text-primary"
                    data-node-id="716:12093"
                  >
                    Получайте больше
                  </h2>
                  <div
                    className="flex w-full flex-col items-start gap-1 text-[13px] leading-4 text-text-secondary"
                    data-node-id="716:12094"
                  >
                    <p className="w-full font-bold" data-node-id="716:12095">
                      8 BYN / месяц
                    </p>
                    <p className="w-full font-normal" data-node-id="716:12096">
                      Кредитный лимит до 10 000 BYN
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="flex w-full flex-col items-start overflow-hidden rounded-2xl bg-[#e0edff] px-4 py-1 text-[13px] leading-4"
                data-node-id="716:12099"
                data-name="Условия Premium"
              >
                {TERMS.map((row) => (
                  <div
                    key={row.label}
                    className="flex w-full items-center justify-between overflow-hidden py-[7px]"
                    data-name={row.label}
                  >
                    <p className="min-w-0 flex-1 font-normal text-text-secondary">
                      {row.label}
                    </p>
                    <p className="shrink-0 text-right font-semibold whitespace-nowrap text-text-primary">
                      {row.value}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className="flex w-full items-start gap-4"
                data-node-id="716:12130"
                data-name="List"
              >
                <p className="min-w-0 flex-1 font-inter text-[12px] font-normal leading-4 text-[#95a7bf]">
                  Прошу подключить мне Premium подписку и подтверждаю, что
                  ознакомлен(-а) и согласен(-на) с{' '}
                  <button
                    type="button"
                    className="text-fill-brand underline decoration-from-font"
                    onClick={onRulesClick}
                  >
                    Правилами Premium подписки
                  </button>
                </p>
                <button
                  type="button"
                  role="switch"
                  aria-checked={agreed}
                  aria-label="Согласие с правилами Premium"
                  onClick={() => setAgreed((v) => !v)}
                  className={`relative h-[30px] w-[60px] shrink-0 rounded-full transition-colors duration-200 ${
                    agreed ? 'bg-fill-brand' : 'bg-[#e5e7eb]'
                  }`}
                  data-name="Selection Controls"
                  data-node-id="716:12130"
                >
                  <span
                    className={`absolute top-[2px] size-[26px] rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.12)] transition-[left] duration-200 ${
                      agreed ? 'left-[32px]' : 'left-[2px]'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            disabled={!agreed}
            onClick={() => {
              if (!agreed) return
              onConnect()
            }}
            className="flex w-full shrink-0 items-center justify-center rounded-xl bg-fill-brand px-6 py-3 disabled:opacity-40"
            data-node-id="716:12134"
            data-name="button"
          >
            <span className="font-inter text-[16px] font-medium leading-5 text-white">
              Подключить
            </span>
          </button>
        </div>

      </div>
    </div>
  )
}
