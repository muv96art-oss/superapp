import type { Product } from '../data'
import { installmentFromPrice, showsInstallment } from '../data'
import { assets } from '../assets'
import {
  BadgeDelivery,
  BadgeMarketing,
  BadgeOrder,
  BadgeProduct,
  BadgeStatus,
} from './badges'
import { CartStepper, cartStepperType } from './CartStepper'
import { PriceDetails } from './PriceDetails'

type Props = {
  product: Product
  quantity: number
  maxQuantity?: number
  onAdd: () => void
  onRemove: () => void
  onOpen?: () => void
}

const DEFAULT_MAX = 99

export function ProductCard({
  product,
  quantity,
  maxQuantity = DEFAULT_MAX,
  onAdd,
  onRemove,
  onOpen,
}: Props) {
  const badges = product.badges
  const isSale = badges?.product === 'sale'
  const outOfStock = badges?.status === 'outOfStock'
  const type = outOfStock ? 'add' : cartStepperType(quantity, maxQuantity)
  const quantityLabel = `${quantity}`
  const installment = showsInstallment(product.id)
    ? {
        amount: installmentFromPrice(product.price).amount.replace(/\.$/, ''),
        months: '3 мес',
      }
    : undefined

  const hasCornerBadges = Boolean(badges?.marketing || badges?.status)

  return (
    <article className="flex h-full flex-col items-stretch gap-3" data-name="Card/Catalog">
      <div
        className={`flex w-full flex-1 flex-col gap-2 ${onOpen ? 'cursor-pointer' : ''}`}
        onClick={onOpen}
        onKeyDown={
          onOpen
            ? (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  onOpen()
                }
              }
            : undefined
        }
        role={onOpen ? 'link' : undefined}
        tabIndex={onOpen ? 0 : undefined}
        aria-label={onOpen ? `Открыть ${product.title}` : undefined}
      >
        <div className="relative w-full shrink-0">
          <div className="relative aspect-[230/240] overflow-hidden rounded-2xl bg-bg-base">
            <img
              alt=""
              width={230}
              height={240}
              src={product.image}
              className="pointer-events-none absolute inset-0 size-full max-w-none object-contain"
              loading="lazy"
            />
          </div>

          {hasCornerBadges ? (
            <div className="absolute left-3 top-3 flex flex-wrap gap-1" data-name="Badges">
              {badges?.marketing ? (
                <BadgeMarketing type={badges.marketing.type} label={badges.marketing.label} />
              ) : null}
              {badges?.status ? <BadgeStatus type={badges.status} /> : null}
            </div>
          ) : null}

          {badges?.product ? (
            <div className="absolute bottom-[11.5px] left-3">
              <BadgeProduct type={badges.product} />
            </div>
          ) : null}
        </div>

        <div className="flex w-full flex-col gap-1.5">
          <div className="flex w-full flex-col gap-3">
            <PriceDetails
              type={isSale ? 'sale' : 'default'}
              price={product.price}
              oldPrice={product.oldPrice}
              unit={product.unit}
              installment={installment}
            />

            <div className="flex w-full flex-col gap-2">
              {(badges?.delivery || badges?.order) && (
                <div className="flex flex-wrap items-center gap-1" data-name="container">
                  {badges.delivery ? (
                    <BadgeDelivery type={badges.delivery.type} label={badges.delivery.label} />
                  ) : null}
                  {badges.order ? <BadgeOrder label={badges.order.label} /> : null}
                </div>
              )}
              <p className="text-[12px] font-normal leading-4 text-text-primary">{product.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <img alt="" width={24} height={24} src={assets.star} className="size-6" aria-hidden="true" />
            <div className="flex items-center gap-1 text-[12px] font-medium leading-4 text-text-secondary">
              <span>{product.rating}</span>
              <span>{product.reviews}</span>
            </div>
          </div>
        </div>
      </div>

      <div onClick={(event) => event.stopPropagation()}>
        {outOfStock ? (
          <div
            className="flex h-11 w-full shrink-0 items-center justify-center rounded-2xl bg-secondary-light text-[14px] font-semibold text-basic-secondary"
            aria-disabled="true"
          >
            Нет в наличии
          </div>
        ) : (
          <CartStepper
            type={type}
            quantityLabel={quantityLabel}
            onAdd={onAdd}
            onRemove={onRemove}
          />
        )}
      </div>
    </article>
  )
}
