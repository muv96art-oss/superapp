import { assets } from '../assets'

type Tone = 'delivery' | 'categories' | 'premium' | 'activation' | 'neutral'

type Props = {
  label: string
  iconSrc: string
  onClick?: () => void
  /** Close control (premium toast) — shows X instead of chevron */
  onDismiss?: () => void
  nodeId?: string
  tone?: Tone
}

const TONE_BG: Record<Tone, string> = {
  delivery: 'bg-[#e0edff]',
  categories: 'bg-[#e0edff]',
  premium: 'bg-[#e1f3d8]',
  activation: 'bg-[#ffefd6]',
  neutral: 'bg-white',
}

/** Status chip row — Figma 687:26579 / 692:27004 / 692:26878 / 692:26710 */
export function BalanceStatusChip({
  label,
  iconSrc,
  onClick,
  onDismiss,
  nodeId = '687:26579',
  tone = 'delivery',
}: Props) {
  const className = [
    'flex h-[60px] w-full shrink-0 items-center gap-3 overflow-hidden rounded-[20px] py-3 pr-3 pl-4 text-left',
    TONE_BG[tone],
  ].join(' ')

  const labelClass =
    tone === 'premium'
      ? 'min-w-0 flex-1 font-inter text-[12px] font-semibold leading-4 text-[#328e02]'
      : 'min-w-0 flex-1 font-inter text-[12px] font-medium leading-4 text-text-primary'

  const trailing = onDismiss ? (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onDismiss()
      }}
      className="relative flex size-5 shrink-0 items-center justify-center"
      aria-label="Закрыть"
      data-name="System Icon"
    >
      <img
        alt=""
        src={assets.balanceStatusClose}
        width={11}
        height={11}
        className="size-[11px] max-w-none"
      />
    </button>
  ) : (
    <span
      className="relative flex size-5 shrink-0 items-center justify-center"
      data-name="Icon/chevron_right"
    >
      <img
        alt=""
        src={assets.balanceChevronRight}
        width={6.25}
        height={11.25}
        className="h-[11px] w-[6px] max-w-none"
      />
    </span>
  )

  const content = (
    <>
      <span className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg">
        <img
          alt=""
          src={iconSrc}
          width={36}
          height={36}
          className="size-9 object-contain"
        />
      </span>
      <p className={labelClass}>{label}</p>
      {trailing}
    </>
  )

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={className}
        data-node-id={nodeId}
        data-name="Статус"
        aria-label={label}
      >
        {content}
      </button>
    )
  }

  return (
    <div className={className} data-node-id={nodeId} data-name="Статус">
      {content}
    </div>
  )
}
