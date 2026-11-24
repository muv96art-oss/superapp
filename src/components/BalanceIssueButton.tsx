import { assets } from '../assets'

type Props = {
  onClick?: () => void
  className?: string
}

/** Issue CTA on unissued card — Figma 672:9159 */
export function BalanceIssueButton({ onClick, className }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'inline-flex h-6 w-[92px] items-center justify-center gap-1 rounded-[12px] bg-static-black px-1.5 py-1',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      data-node-id="672:9159"
      data-name="Оформить"
      aria-label="Оформить"
    >
      <span
        className="relative size-[14px] shrink-0"
        data-node-id="672:9191"
        data-name="System Icon"
      >
        <img
          alt=""
          src={assets.balanceIssuePlus}
          width={14}
          height={14}
          className="absolute inset-0 size-full max-w-none"
        />
      </span>
      <span
        className="w-[62px] shrink-0 font-inter text-[12px] font-medium leading-4 text-static-white"
        data-node-id="672:9158"
      >
        Оформить
      </span>
    </button>
  )
}
