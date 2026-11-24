import { assets } from '../assets'

type Props = {
  onClick?: () => void
}

/** Mid-listing promo — Figma 447:112473 */
export function ListingBanner({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative h-[103px] w-full overflow-hidden rounded-2xl text-left"
      aria-label="Выберите свой iPhone"
      data-node-id="447:112473"
      data-name="Реклама · Выберите свой iPhone"
    >
      <img
        alt=""
        width={335}
        height={127}
        src={assets.iphoneBanner}
        className="pointer-events-none absolute left-0 top-0 h-[127px] w-full rounded-2xl object-cover"
        draggable={false}
        loading="lazy"
      />
      <div className="absolute left-[21px] top-[26px] w-[195px] font-onest text-[21px] font-bold leading-[25px] tracking-[-0.2653px] text-white">
        <p className="mb-0">Выберите</p>
        <p>свой iPhone</p>
      </div>
      <p className="absolute left-[18px] top-[77px] whitespace-nowrap font-onest text-[11px] font-normal leading-normal text-[#0d0e0f]">
        Смартфон для ваших планов
      </p>
    </button>
  )
}
