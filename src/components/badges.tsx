import { assets } from '../assets'
import type {
  DeliveryBadgeType,
  MarketingBadgeType,
  ProductBadgeType,
  StatusBadgeType,
} from '../data'

/** Locked badge set — Figma Badges 2140:1745
 *  Delivery and «Новинка»: Inter Bold 11/14, tracking 0.22 (Figma 578:8338)
 */

export type {
  DeliveryBadgeType,
  MarketingBadgeType,
  ProductBadgeType,
  StatusBadgeType,
}

export function BadgeDelivery({
  type,
  label,
  tone = 'default',
  iconSize = 14,
}: {
  type: DeliveryBadgeType
  label?: string
  tone?: 'default' | 'calm'
  /** PDP badge 569:8252 is 18. Listing cards stay 14. */
  iconSize?: 14 | 18
}) {
  const isExpress = type === 'express'
  const text =
    label ?? (type === 'absolute' ? '27 СЕНТЯБРЯ' : type === 'relative' ? 'ЗАВТРА' : 'СЕГОДНЯ')
  const calm = tone === 'calm' && !isExpress

  return (
    <div
      data-name="Badge/Delivery"
      data-type={type}
      className={`inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-[20px] py-1 pl-2 pr-3 ${
        iconSize === 14 ? 'h-6' : ''
      } ${isExpress ? 'bg-static-beige' : calm ? 'bg-[#e0edff]' : 'bg-static-light-blue'}`}
    >
      <img
        alt=""
        width={iconSize}
        height={iconSize}
        src={isExpress ? assets.boltBadge : iconSize === 18 ? assets.truckPdp18 : calm ? assets.truckPdp : assets.truck}
        className={`${iconSize === 18 ? 'size-[18px]' : 'size-[14px]'} shrink-0`}
        aria-hidden="true"
      />
      <span
        className={`text-[11px] font-bold leading-[14px] tracking-[0.22px] uppercase whitespace-nowrap ${
          isExpress ? 'text-static-black' : calm ? 'text-fill-brand-loud' : 'text-static-dark-violet'
        }`}
      >
        {text}
      </span>
    </div>
  )
}

export function BadgeProduct({ type }: { type: ProductBadgeType }) {
  const text = type === 'popular' ? 'ХИТ' : type === 'new' ? 'НОВИНКА' : 'РАСПРОДАЖА'
  const bg =
    type === 'popular' ? 'bg-static-orange' : type === 'new' ? 'bg-static-green' : 'bg-static-violet'

  return (
    <div
      data-name="Badge/Product"
      data-type={type}
      className={`inline-flex h-6 w-fit shrink-0 items-center justify-center rounded-xl px-2 py-1 ${bg}`}
    >
      <span
        className={`whitespace-nowrap text-static-white ${
          type === 'new'
            ? 'text-[11px] font-bold leading-[14px] tracking-[0.22px] uppercase'
            : 'text-[12px] font-semibold leading-4'
        }`}
      >
        {text}
      </span>
    </div>
  )
}

export function BadgeMarketing({
  type,
  label,
}: {
  type: MarketingBadgeType
  label?: string
}) {
  const text = type === '1+1' ? '1+1' : (label ?? '– 17%')

  return (
    <div
      data-name="Badge/Marketing"
      data-type={type}
      className={`inline-flex h-7 w-fit shrink-0 items-center justify-center rounded-[20px] px-3 py-1.5 ${
        type === '1+1' ? 'bg-static-black' : 'bg-static-red'
      }`}
    >
      <span className="text-[14px] font-bold leading-5 whitespace-nowrap text-static-white">
        {text}
      </span>
    </div>
  )
}

export function BadgeStatus({ type, large = false }: { type: StatusBadgeType; large?: boolean }) {
  const text = type === 'deliveryOnly' ? 'Только доставка' : 'Распродан'

  return (
    <div
      data-name="Badge/Status"
      data-type={type}
      className={`inline-flex w-fit shrink-0 items-center justify-center rounded-[20px] bg-static-black ${
        large ? 'h-8 px-2 py-1.5' : 'h-7 px-2 py-1.5'
      }`}
    >
      <span
        className={`font-medium whitespace-nowrap text-static-white ${
          large ? 'text-[14px] leading-5' : 'text-[13px] leading-4'
        }`}
      >
        {text}
      </span>
    </div>
  )
}

export function BadgeOrder({ label = 'ПО 5 ШТ' }: { label?: string }) {
  return (
    <div
      data-name="Badge/Order"
      data-type="multiplicity"
      className="inline-flex h-[22px] w-fit shrink-0 items-center justify-center gap-1 rounded-[20px] bg-static-light-blue px-3 py-1"
    >
      <span className="text-center text-[11px] font-semibold leading-[14px] tracking-[0.11px] whitespace-nowrap text-static-dark-violet">
        {label}
      </span>
    </div>
  )
}
