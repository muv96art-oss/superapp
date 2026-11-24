import { useLayoutEffect, useRef, useState } from 'react'
import { assets } from '../assets'

type NavId = 'bank' | 'home' | 'balance' | 'catalog' | 'cart'

type Props = {
  active: 'home' | 'balance' | 'catalog' | 'cart'
  onChange: (id: NavId) => void
  cartCount: number
  /** `inline` sits in a parent bar. Other screens keep the fixed bar. */
  placement?: 'fixed' | 'inline'
}

const PILL_TABS: {
  id: Exclude<NavId, 'bank'>
  label: string
  icon: (active: boolean) => string
  size: number
}[] = [
  {
    id: 'home',
    label: 'Главная',
    icon: (active) => (active ? assets.navHomeActive : assets.navHomeInactive),
    size: 24,
  },
  {
    id: 'balance',
    label: 'Баланс',
    icon: (active) => (active ? assets.navBalanceActive : assets.navBalance),
    size: 24,
  },
  {
    id: 'catalog',
    label: 'Каталог',
    icon: (active) => (active ? assets.navCatalogActive : assets.navCatalog),
    size: 18,
  },
  {
    id: 'cart',
    label: 'Корзина',
    icon: (active) => (active ? assets.navCartActive : assets.navCart),
    size: 24,
  },
]

type Indicator = { x: number; width: number; ready: boolean }

/** Market tab bar — Figma 605:8782 */
export function BottomNav({ active, onChange, cartCount, placement = 'fixed' }: Props) {
  const pillRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [indicator, setIndicator] = useState<Indicator>({ x: 0, width: 0, ready: false })
  const [animate, setAnimate] = useState(false)

  useLayoutEffect(() => {
    const measure = (enableMotion: boolean) => {
      const pill = pillRef.current
      const idx = PILL_TABS.findIndex((tab) => tab.id === active)
      const tab = tabRefs.current[idx]
      if (!pill || !tab) return

      const pillRect = pill.getBoundingClientRect()
      const tabRect = tab.getBoundingClientRect()
      // Figma Selection inset: top/bottom 0, right -1.75, left -2
      const x = tabRect.left - pillRect.left - 2
      const width = tabRect.width + 2 + 1.75

      setIndicator((prev) => {
        if (enableMotion && prev.ready && (prev.x !== x || prev.width !== width)) {
          queueMicrotask(() => setAnimate(true))
        }
        return { x, width, ready: true }
      })
    }

    measure(true)
    const pill = pillRef.current
    if (!pill || typeof ResizeObserver === 'undefined') return

    const ro = new ResizeObserver(() => measure(false))
    ro.observe(pill)
    tabRefs.current.forEach((tab) => {
      if (tab) ro.observe(tab)
    })
    return () => ro.disconnect()
  }, [active])

  return (
    <nav
      className={
        placement === 'inline'
          ? 'relative w-full'
          : 'absolute inset-x-0 bottom-0 z-50 w-full'
      }
      data-node-id="605:8782"
      data-name="Tab Bar"
      aria-label="Основная навигация"
    >
      <div className="flex flex-col items-center justify-end px-5 pt-4 pb-[25px]">
        <div
          className="relative flex h-[54px] w-full items-center gap-4 px-1"
          data-node-id="605:8785"
          data-name="Bar"
        >
          <button
            type="button"
            onClick={() => onChange('bank')}
            aria-label="Банк"
            className="relative flex size-[54px] shrink-0 items-center justify-center"
            data-node-id="605:8786"
            data-name="Search"
          >
            <GlassChip />
            <span className="relative flex size-[54px] items-center justify-center px-2 pt-[6px] pb-[7px]">
              <img
                alt=""
                src={assets.navBank}
                width={26}
                height={21}
                className="h-[21px] w-[26px] object-contain"
              />
            </span>
          </button>

          <div
            ref={pillRef}
            className="relative flex h-full min-w-0 flex-1 items-center px-0.5"
            data-node-id="605:8789"
            data-name="Tab Bar Buttons"
          >
            <GlassChip />

            {/* Single Selection — Figma 605:8792, slides with active tab */}
            <span
              aria-hidden
              data-node-id="605:8792"
              data-name="Selection"
              className={`pointer-events-none absolute top-0 z-0 h-full rounded-[100px] bg-[#ededed] ${
                animate
                  ? 'transition-[transform,width] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]'
                  : ''
              }`}
              style={{
                width: indicator.width,
                transform: `translate3d(${indicator.x}px, 0, 0)`,
                opacity: indicator.ready ? 1 : 0,
              }}
            />

            {PILL_TABS.map((item, index) => {
              const isActive = item.id === active
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    tabRefs.current[index] = el
                  }}
                  type="button"
                  onClick={() => onChange(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={
                    item.id === 'cart' && cartCount > 0 ? `${item.label}, ${cartCount}` : item.label
                  }
                  className="relative z-10 flex h-full min-w-0 flex-1 flex-col items-center justify-center px-2 pt-[6px] pb-[7px]"
                  data-name={item.id}
                >
                  <span className="relative size-7 shrink-0">
                    <img
                      alt=""
                      src={item.icon(isActive)}
                      width={item.size}
                      height={item.size}
                      className={
                        item.size === 18
                          ? 'absolute top-1/2 left-1/2 size-[18px] max-w-none -translate-x-1/2 -translate-y-1/2'
                          : 'absolute top-0.5 left-0.5 size-6 max-w-none'
                      }
                    />
                    {item.id === 'cart' && cartCount > 0 ? (
                      <span className="absolute top-0 right-0 flex h-3 min-w-3 items-center justify-center rounded-full bg-fill-accent-red px-0.5 text-[8px] font-bold leading-none text-white">
                        {cartCount}
                      </span>
                    ) : null}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

/** Glass BG — Figma 605:21836 / 605:21839 glass-sync-v6 */
function GlassChip() {
  return (
    <div className="pointer-events-none absolute inset-[-4px]" aria-hidden data-name="BG">
      <div
        className="absolute inset-0 overflow-hidden rounded-full shadow-[1.25px_0_0_-0.75px_#d0d0d0,-1.25px_0_0_-0.75px_#d0d0d0,0_0_0_0.5px_#e8e8e8,0_8px_15px_0_rgba(0,0,0,0.02)]"
        data-name="Fill + Shadow"
        style={{
          backgroundColor: 'rgba(255,255,255,0.25)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
          backdropFilter: 'blur(20px) saturate(1.5)',
        }}
      />
      <div className="absolute inset-0 rounded-full bg-transparent" data-name="Glass Effect" />
    </div>
  )
}
