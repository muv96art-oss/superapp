import { assets } from '../assets'
import { StatusBar } from './StatusBar'

type Props = {
  onDismiss: () => void
}

/** Figma frame 613:14856 / overlay 613:15590 is 375×812 — map Y to % of shell height */
const FH = 812
const FW = 375
const y = (px: number) => `${(px / FH) * 100}%`
const x = (px: number) => `${(px / FW) * 100}%`
const h = (px: number) => `${(px / FH) * 100}%`
const w = (px: number) => `${(px / FW) * 100}%`

/**
 * NEO card promo — Figma 613:15590 (frame 613:14856)
 * Art uses % of the 812 frame. CTA anchored to bottom with pb-44 (Tabs Mode omitted).
 */
export function NeoOnboardingScreen({ onDismiss }: Props) {
  return (
    <div
      className="absolute inset-0 z-[80] overflow-hidden bg-[#1f0f29]"
      data-node-id="613:15590"
      data-name="Ondoarding 13 & 14 - 6"
    >
      <StatusBar tone="light" />

      {/* Full-bleed promo art — Figma 613:15598 */}
      <div
        className="absolute inset-0 overflow-hidden bg-[#1f0f29]"
        data-node-id="613:15598"
        data-name="NEO — промо новой карты · 375×724"
      >
        <div
          className="absolute right-0"
          style={{ top: y(-88), height: h(900), width: w(467) }}
          data-node-id="628:7001"
          data-name="Абстрактный фон — сиреневые стеклянные ленты"
        >
          <img
            alt=""
            src={assets.authNeoBg}
            className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
          />
        </div>

        <div
          className="absolute"
          style={{ left: x(72), top: y(258), width: w(450), height: h(450) }}
          data-node-id="628:6991"
          data-name="Сиреневое свечение"
        >
          <img alt="" src={assets.authNeoGlow} className="absolute inset-0 size-full max-w-none" />
        </div>

        <div
          className="absolute"
          style={{ left: x(124), top: y(309), width: w(332), height: h(332) }}
          data-node-id="628:6992"
          data-name="Орбита карты"
        >
          <img alt="" src={assets.authNeoOrbit} className="absolute inset-0 size-full max-w-none" />
        </div>

        <div
          className="absolute left-0"
          style={{ top: y(192), height: h(427), width: w(420) }}
          data-node-id="613:15599"
          data-name="Девушка с картой NEO — сиреневая палитра"
        >
          <img
            alt=""
            src={assets.authNeoCard}
            className="pointer-events-none absolute inset-0 size-full max-w-none object-contain"
          />
        </div>

        <div
          className="absolute left-5 font-onest text-[34px] font-bold leading-[35.36px] tracking-[-0.68px] text-white"
          style={{ top: y(98), width: w(330) }}
          data-node-id="628:6995"
        >
          <p className="mb-0">Новая карта.</p>
          <p>Новый ритм.</p>
        </div>

        <div
          className="absolute font-onest text-[14px] font-normal leading-[18.9px] tracking-[-0.28px] text-[#d8cbe1]"
          style={{ left: x(21), top: y(196), width: w(152) }}
          data-node-id="628:6996"
        >
          <p className="mb-0">Для ваших планов.</p>
          <p>На каждый день.</p>
        </div>

        {/* Stretch fade to bottom — CTA sits lower than Figma tabs reservation */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-b from-[rgba(39,29,53,0)] to-[#271d35] to-[47.158%]"
          style={{ top: y(459) }}
          data-node-id="625:7088"
          aria-hidden="true"
        />
      </div>

      {/* Navbar — close only */}
      <div
        className="absolute inset-x-0 top-0 z-10 flex h-[88px] items-end justify-end px-4 py-3"
        data-node-id="613:15591"
        data-name="Navbar"
      >
        <button type="button" onClick={onDismiss} aria-label="Закрыть" className="relative size-6">
          <img alt="" width={24} height={24} src={assets.authCloseWhite} className="size-6" />
        </button>
      </div>

      {/* CTA — bottom-anchored, 44px from screen edge; stretch width, keep h-11 */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-stretch px-8 pb-[44px]">
        <div
          className="mb-4 flex w-full flex-col items-center gap-3"
          data-node-id="613:15593"
        >
          <h1
            className="text-center text-[20px] font-bold leading-[26px] text-white"
            data-node-id="613:15595"
          >
            Оформите карту “название”
          </h1>
          <p
            className="w-full text-center text-[14px] font-normal leading-[18px] text-white"
            data-node-id="613:15597"
          >
            Бесплатное обслуживание, кешбэк до 20% на маркете и 2 месяца бесплатной рассрочки
          </p>
        </div>

        <button
          type="button"
          onClick={onDismiss}
          className="mb-2 flex h-11 w-full shrink-0 items-center justify-center rounded-xl bg-fill-brand px-6 py-3 text-[16px] font-medium leading-5 text-white"
          data-node-id="613:15592"
        >
          Оформить карту
        </button>

        <button
          type="button"
          onClick={onDismiss}
          className="flex h-11 w-full shrink-0 items-center justify-center rounded-xl bg-[rgba(249,249,250,0.08)] px-6 py-3 text-[16px] font-medium leading-5 text-[#838a95]"
          data-node-id="613:15657"
        >
          Позже
        </button>
      </div>
    </div>
  )
}
