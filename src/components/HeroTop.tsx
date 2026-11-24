import { useCallback, useEffect, useRef, useState } from 'react'
import { assets } from '../assets'
import { HERO_SLIDES } from '../data'
import { LogoBank } from './LogoBank'

type Props = {
  onOpenSearch: () => void
  onNotify: () => void
  onScan: () => void
  onLocation: () => void
  /** Guest market header — Figma 609:9443 «Войдите в профиль» */
  isLoggedIn?: boolean
  userName?: string
  onOpenProfile?: () => void
  /**
   * Marketplace card issued on Balance.
   * false → Figma 391:77341 (530h + Halva 654:8738)
   * true  → Figma 698:30267 Variant4 (420h, Halva hidden)
   */
  cardIssued?: boolean
  /** Halva strip → card application — Figma 654:8738 → 716:12621 */
  onOpenCardApplication?: () => void
}

/** Figma 391:77341 overlay — radial purple vignette + black scrim (530h) */
const HERO_VIGNETTE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 375 530' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Crect x='0' y='0' height='100%25' width='100%25' fill='url(%23g)' opacity='1'/%3E%3Cdefs%3E%3CradialGradient id='g' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-0.050005 59.7 -49.766 -0.041684 188 -17)'%3E%3Cstop stop-color='rgba(35%2C25%2C50%2C0)' offset='0.8099'/%3E%3Cstop stop-color='rgba(35%2C25%2C50%2C1)' offset='0.97432'/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E\")"

/** Figma 698:30267 Variant4 vignette (420h) — same gradient, stretched to shorter hero */
const HERO_VIGNETTE_ISSUED =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 375 420' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Crect x='0' y='0' height='100%25' width='100%25' fill='url(%23g)' opacity='1'/%3E%3Cdefs%3E%3CradialGradient id='g' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-0.050005 47.3 -49.766 -0.033 188 -13)'%3E%3Cstop stop-color='rgba(35%2C25%2C50%2C0)' offset='0.8099'/%3E%3Cstop stop-color='rgba(35%2C25%2C50%2C1)' offset='0.97432'/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E\")"

type DragState = {
  pointerId: number
  startX: number
  origin: number
  moved: boolean
}

const AUTO_MS = 4000
const SLIDE_MS = 720
const SLIDE_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'
const SLIDE_COUNT = HERO_SLIDES.length
/** Real slides + clone of the first for seamless forward loop */
const TRACK_SLIDES = [...HERO_SLIDES, HERO_SLIDES[0]]
const TRACK_LEN = TRACK_SLIDES.length

function logicalIndex(offset: number) {
  return ((Math.round(offset) % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT
}

export function HeroTop({
  onOpenSearch,
  onNotify,
  onScan,
  onLocation,
  isLoggedIn = true,
  userName = 'Александр',
  onOpenProfile,
  cardIssued = false,
  onOpenCardApplication,
}: Props) {
  const heroHeight = cardIssued ? 420 : 530
  const vignette = cardIssued ? HERO_VIGNETTE_ISSUED : HERO_VIGNETTE
  const frameRef = useRef<HTMLElement>(null)
  const dragRef = useRef<DragState | null>(null)
  const offsetRef = useRef(0)
  const wrapTimerRef = useRef<number | null>(null)
  const [offset, setOffset] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [paused, setPaused] = useState(false)

  const index = logicalIndex(offset)

  useEffect(() => {
    offsetRef.current = offset
  }, [offset])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden)
    onVisibility()
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  useEffect(() => {
    return () => {
      if (wrapTimerRef.current !== null) window.clearTimeout(wrapTimerRef.current)
    }
  }, [])

  const settleAfterForward = useCallback(
    (target: number) => {
      if (wrapTimerRef.current !== null) {
        window.clearTimeout(wrapTimerRef.current)
        wrapTimerRef.current = null
      }

      setOffset(target)

      if (reduceMotion) {
        setAnimating(false)
        if (target >= SLIDE_COUNT) setOffset(0)
        return
      }

      setAnimating(true)
      wrapTimerRef.current = window.setTimeout(() => {
        if (target >= SLIDE_COUNT) {
          setAnimating(false)
          setOffset(0)
        } else {
          setAnimating(false)
        }
        wrapTimerRef.current = null
      }, SLIDE_MS)
    },
    [reduceMotion],
  )

  const goForward = useCallback(() => {
    if (dragging) return
    if (wrapTimerRef.current !== null) return

    const current = logicalIndex(offsetRef.current)
    settleAfterForward(current + 1)
  }, [dragging, settleAfterForward])

  const goTo = useCallback(
    (next: number) => {
      if (wrapTimerRef.current !== null) {
        window.clearTimeout(wrapTimerRef.current)
        wrapTimerRef.current = null
      }
      const clamped = Math.max(0, Math.min(SLIDE_COUNT - 1, next))
      const current = logicalIndex(offsetRef.current)

      // One-way only: move forward along the loop, never backwards
      if (clamped === current) return
      const stepsForward = (clamped - current + SLIDE_COUNT) % SLIDE_COUNT
      settleAfterForward(current + stepsForward)
    },
    [settleAfterForward],
  )

  useEffect(() => {
    if (dragging || paused || animating || SLIDE_COUNT < 2) return

    const timer = window.setInterval(() => {
      goForward()
    }, AUTO_MS)

    return () => window.clearInterval(timer)
  }, [dragging, paused, animating, goForward, offset])

  const dissolveOpacity = (slideIndex: number) => {
    if (reduceMotion) return slideIndex === index ? 1 : 0

    // Map continuous offset onto the logical ring for crossfade, including wrap  last → first
    const p = offset
    const from = Math.floor(p)
    const t = p - from
    const a = from % SLIDE_COUNT
    const b = (from + 1) % SLIDE_COUNT

    if (slideIndex === a && slideIndex === b) return 1
    if (slideIndex === a) return 1 - t
    if (slideIndex === b) return t
    return 0
  }

  const onSwipePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType === 'mouse') return
    if (wrapTimerRef.current !== null) return

    // Normalize onto the real ring before drag (in case we sit on the clone)
    const origin = logicalIndex(offsetRef.current)
    if (offsetRef.current !== origin) {
      setAnimating(false)
      setOffset(origin)
      offsetRef.current = origin
    }

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      origin,
      moved: false,
    }
    setDragging(true)
    setAnimating(false)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onSwipePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    const frame = frameRef.current
    if (!drag || !frame || drag.pointerId !== event.pointerId) return

    const deltaX = event.clientX - drag.startX
    // Only left → right; reverse swipe is ignored
    if (deltaX <= 0) {
      setOffset(drag.origin)
      return
    }

    if (deltaX > 4) drag.moved = true
    const width = frame.clientWidth || 1
    const advance = Math.min(1, deltaX / width)
    setOffset(drag.origin + advance)
  }

  const endSwipe = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    const frame = frameRef.current
    if (!drag || !frame || drag.pointerId !== event.pointerId) return

    const deltaX = Math.max(0, event.clientX - drag.startX)
    const width = frame.clientWidth || 1
    const shouldAdvance = drag.moved && deltaX > width * 0.2

    dragRef.current = null
    setDragging(false)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    if (!shouldAdvance) {
      if (reduceMotion) {
        setOffset(drag.origin)
      } else {
        setAnimating(true)
        setOffset(drag.origin)
        window.setTimeout(() => setAnimating(false), SLIDE_MS)
      }
      return
    }

    const target = drag.origin + 1
    if (reduceMotion) {
      setOffset(target >= SLIDE_COUNT ? 0 : target)
      return
    }

    setAnimating(true)
    setOffset(target)
    settleAfterForward(target)
  }

  return (
    <section
      ref={frameRef}
      className={`relative w-full shrink-0 overflow-hidden rounded-bl-[36px] rounded-br-[36px] ${
        cardIssued ? 'h-[420px]' : 'h-[530px]'
      }`}
      data-node-id={cardIssued ? '698:30267' : '391:77805'}
      data-name="top"
      data-card-issued={cardIssued ? 'true' : 'false'}
    >
      {/* Gallery images — infinite forward track */}
      <div
        className="absolute inset-0 overflow-hidden rounded-bl-[36px] rounded-br-[36px]"
        aria-roledescription="carousel"
        aria-label="Промо-галерея"
      >
        <div
          className="flex h-full will-change-transform"
          style={{
            width: `${TRACK_LEN * 100}%`,
            transform: `translate3d(-${(offset / TRACK_LEN) * 100}%, 0, 0)`,
            transition:
              animating && !dragging && !reduceMotion
                ? `transform ${SLIDE_MS}ms ${SLIDE_EASE}`
                : undefined,
          }}
        >
          {TRACK_SLIDES.map((item, slideIndex) => {
            const isClone = slideIndex === TRACK_LEN - 1
            const logical = isClone ? 0 : slideIndex
            return (
              <div
                key={isClone ? `${item.id}-clone` : item.id}
                className="relative h-full shrink-0"
                style={{ width: `${100 / TRACK_LEN}%` }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${logical + 1} из ${SLIDE_COUNT}`}
                aria-hidden={logical !== index}
              >
                <img
                  alt=""
                  width={375}
                  height={heroHeight}
                  src={item.image}
                  fetchPriority={slideIndex === 0 ? 'high' : 'auto'}
                  loading={slideIndex === 0 ? 'eager' : 'lazy'}
                  className="pointer-events-none absolute inset-0 size-full max-w-none object-cover select-none"
                  draggable={false}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundImage: `${vignette}, linear-gradient(90deg, rgba(0, 0, 0, ${item.overlay}) 0%, rgba(0, 0, 0, ${item.overlay}) 100%)`,
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Full-bleed swipe surface over the image */}
      <div
        className={`absolute inset-0 z-[5] touch-pan-y ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ touchAction: 'pan-y' }}
        onPointerDown={onSwipePointerDown}
        onPointerMove={onSwipePointerMove}
        onPointerUp={endSwipe}
        onPointerCancel={endSwipe}
        role="presentation"
        aria-hidden="true"
      />

      {/* Fixed overlays — Figma 391:77341 / Variant4 698:30267 */}
      <div
        className={`pointer-events-none absolute inset-0 z-10 flex flex-col items-center gap-6 pt-3 ${
          cardIssued ? 'pb-6' : ''
        }`}
      >
        <div className="flex w-full flex-col gap-6 px-5">
          <div
            className="flex w-full items-center gap-3 overflow-hidden"
            data-node-id="391:77264"
            data-name="Top"
          >
            <div className="flex min-w-0 flex-1 items-center overflow-hidden">
              <div className="flex flex-col items-start justify-center gap-1">
                {isLoggedIn ? (
                  <p className="font-montserrat text-[20px] font-bold leading-[26px] tracking-[-0.4px] text-white">
                    {userName}
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={onOpenProfile}
                    className="pointer-events-auto font-montserrat text-[20px] font-bold leading-[26px] tracking-[-0.4px] text-white"
                  >
                    Войдите в профиль
                  </button>
                )}
                <button
                  type="button"
                  onClick={onLocation}
                  className="pointer-events-auto flex items-center gap-1 rounded-[5px] bg-black/20 py-0.5 pl-2 pr-1"
                  aria-label="Выбрать город: Минск"
                >
                  <span className="text-[11px] font-semibold leading-[14px] tracking-[0.11px] text-white">
                    Минск
                  </span>
                  <span className="flex size-3 rotate-90 items-center justify-center">
                    <img
                      alt=""
                      width={12}
                      height={12}
                      src={assets.chevronRight}
                      className="size-3"
                      aria-hidden="true"
                    />
                  </span>
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={onNotify}
              aria-label="Уведомления"
              className="pointer-events-auto relative h-6 w-[25px] shrink-0"
            >
              <img alt="" width={25} height={24} src={assets.bell} className="absolute inset-0 size-full" />
            </button>
            <button
              type="button"
              onClick={onScan}
              aria-label="Сканировать QR-код"
              className="pointer-events-auto relative size-6 shrink-0"
            >
              <img alt="" width={24} height={24} src={assets.qrcode} className="absolute inset-0 size-full" />
            </button>
          </div>

          <div className="flex w-full flex-col gap-2" data-node-id="391:77587" data-name="Content">
            <div className="flex w-full items-center overflow-hidden" data-node-id="391:77501" data-name="Greeting">
              <div
                className="grid min-w-0 flex-1 overflow-hidden pr-20"
                data-node-id="391:77502"
                data-name="title"
              >
                {HERO_SLIDES.map((item, slideIndex) => {
                  const opacity = dissolveOpacity(slideIndex)
                  const isActive = slideIndex === index
                  return (
                    <p
                      key={item.id}
                      aria-hidden={!isActive}
                      className="col-start-1 row-start-1 whitespace-pre-line font-montserrat text-[20px] font-bold leading-[26px] tracking-[-0.4px] text-white"
                      style={{
                        opacity,
                        transition:
                          reduceMotion || dragging
                            ? undefined
                            : `opacity ${SLIDE_MS}ms ${SLIDE_EASE}`,
                        willChange: 'opacity',
                      }}
                    >
                      {item.title}
                    </p>
                  )
                })}
              </div>
            </div>
            <LogoBank tone="white" />
          </div>
        </div>

        <div
          className="mt-auto flex min-h-0 w-full flex-1 flex-col items-center justify-end gap-2.5 px-5"
          data-node-id="391:77526"
          data-name="Bottom"
        >
          <div
            className="pointer-events-auto flex h-1.5 items-center justify-center gap-0.5"
            role="tablist"
            aria-label="Слайды галереи"
          >
            {HERO_SLIDES.map((item, dotIndex) => {
              const active = dotIndex === index
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`Слайд ${dotIndex + 1}`}
                  onClick={() => goTo(dotIndex)}
                  className={`rounded-full transition-[width,background-color] duration-200 ${
                    active ? 'h-1 w-[18px] bg-[#cdd0d5]' : 'size-1 bg-white'
                  }`}
                />
              )
            })}
          </div>

          <button
            type="button"
            onClick={onOpenSearch}
            className="pointer-events-auto flex h-14 w-full items-center gap-3 overflow-hidden rounded-2xl bg-search-bg px-3 text-left"
            aria-label="Открыть поиск"
          >
            <img
              alt=""
              width={16}
              height={16}
              src={assets.search}
              className="size-4 shrink-0"
              aria-hidden="true"
            />
            <span className="min-w-0 flex-1 text-[16px] font-medium leading-6 text-text-primary">
              Поиск
            </span>
            <span className="h-[19.5px] w-px shrink-0 bg-fill-secondary" aria-hidden="true" />
            <span className="relative size-5 shrink-0" aria-hidden="true">
              <img alt="" width={20} height={20} src={assets.mic} className="absolute inset-0 size-full" />
            </span>
          </button>
        </div>

        {/* Halva — Figma 654:8738; hidden after card issue (Variant4 698:30267) */}
        {!cardIssued ? (
          <button
            type="button"
            onClick={onOpenCardApplication}
            aria-label="Оформить карту"
            className="pointer-events-auto relative flex h-[136px] w-full shrink-0 items-start justify-center overflow-hidden rounded-tl-[36px] rounded-tr-[36px] rounded-bl-2xl rounded-br-2xl px-6 py-3 text-left"
            data-node-id="654:8738"
            data-name="Halva"
          >
            <div
              className="relative z-[1] flex min-w-0 flex-1 items-start justify-center"
              data-node-id="654:8739"
              data-name="MTkard Info"
            >
              <p
                className="w-full text-center text-[12px] font-normal leading-4 whitespace-pre-line text-white"
                data-node-id="654:8742"
              >
                Оформляйте карту
                {'\n'}
                и получайте кэшбэк{' '}
                <span className="text-[14px] font-semibold leading-5">до 20% на счет</span>
              </p>
            </div>

            <div
              className="pointer-events-none absolute top-16 left-1/2 aspect-[322/159] w-[calc(100%-48px)] -translate-x-1/2 overflow-hidden"
              data-node-id="680:9932"
              aria-hidden
            >
              <img
                alt=""
                width={322}
                height={159}
                src={assets.homeHalvaCardLarge}
                className="absolute top-[-9.18%] left-[-4.59%] h-[127.54%] w-[108.47%] max-w-none"
              />
            </div>
          </button>
        ) : null}
      </div>
    </section>
  )
}
