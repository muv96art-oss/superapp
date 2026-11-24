import { assets } from '../assets'

type Props = {
  onClick?: () => void
  nodeId?: string
}

/**
 * Premium subscription promo — Figma Halva 698:30143
 * Crown chrome look: Figma export of 698:30148 (Chromatic metal ShaderEffect
 * needs experimental HTML-in-Canvas; live WebGPU effect not used in prototype).
 */
export function BalancePremiumBanner({
  onClick,
  nodeId = '698:30143',
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative h-[92px] w-[327px] shrink-0 overflow-hidden rounded-[20px] px-6 py-4 text-left"
      style={{
        backgroundImage:
          'linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 69.4%), linear-gradient(90deg, #000 0%, #000 100%)',
      }}
      data-node-id={nodeId}
      data-name="Halva"
      aria-label="Получи 10000 BYN на карту и повышенный кэшбэк с Премиум подпиской"
    >
      <div
        className="relative z-[1] flex w-[197px] items-center gap-3"
        data-node-id="698:30144"
      >
        <p className="whitespace-pre-wrap font-inter text-[14px] font-medium leading-5 text-white">
          {'Получи 10000 BYN на карту\nи повышенный кэшбэк\nс Премиум подпиской'}
        </p>
      </div>

      <div
        className="pointer-events-none absolute left-[230px] top-[3px] flex size-[104px] items-center justify-center"
        data-node-id="698:30148"
      >
        <img
          alt=""
          src={assets.balanceCrownChrome}
          width={99}
          height={99}
          className="size-[99px] max-w-none rotate-[2.65deg] object-contain"
        />
      </div>
    </button>
  )
}
