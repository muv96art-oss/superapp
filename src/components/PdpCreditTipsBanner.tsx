import { assets } from '../assets'

type Props = {
  onClick?: () => void
}

/**
 * PDP credit availability tip — Figma 631:7110
 * Shown on every product detail page directly under breadcrumbs.
 * Click → card application 716:12621
 */
export function PdpCreditTipsBanner({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex h-12 w-full items-center justify-end gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-[#9a73b7] to-[#251b33] p-2 text-left"
      data-node-id="631:7110"
      data-name="Tips"
      aria-label="Вам доступны 3000 BYN на ваши любимые покупки"
    >
      <p
        className="relative z-[1] w-[204px] shrink-0 whitespace-pre-line text-[12px] font-semibold leading-4 text-white"
        data-node-id="631:7111"
      >
        {`Вам доступны 3000 BYN\nна ваши любимые покупки`}
      </p>

      <div
        className="relative z-[1] flex size-[30px] shrink-0 items-center justify-center"
        data-node-id="633:6980"
        aria-hidden
      >
        <img
          alt=""
          width={14}
          height={14}
          src={assets.pdpTipsInfo}
          className="size-3.5"
          data-node-id="633:6971"
        />
      </div>

      <div
        className="pointer-events-none absolute left-[-13.63px] top-[9.77px] flex h-[61.211px] w-[75.978px] items-center justify-center"
        data-node-id="654:8529"
        aria-hidden
      >
        <div className="relative h-[41.556px] w-[65.866px] -rotate-[19.56deg] overflow-hidden rounded-[3.111px]">
          <img
            alt=""
            width={66}
            height={42}
            src={assets.pdpTipsCard}
            className="pointer-events-none size-full max-w-none object-cover"
          />
        </div>
      </div>
    </button>
  )
}
