import { useMemo, useState } from 'react'
import { assets } from '../assets'
import { getProductPdp, installmentFromPrice, PDP_RECOMMENDED } from '../data'
import { useDragScroll } from '../hooks/useDragScroll'
import { BadgeDelivery, BadgeProduct, BadgeStatus } from './badges'
import { Breadcrumbs } from './Breadcrumbs'
import { PdpCreditTipsBanner } from './PdpCreditTipsBanner'
import { ProductCard } from './ProductCard'
import { ProductDetailsSheet } from './ProductDetailsSheet'
import { SiteFooter } from './SiteFooter'

type Props = {
  productId: string
  onBack: () => void
  onAddToCart: () => void
  onRemoveFromCart: () => void
  onBuyNow: () => void
  cart: Record<string, number>
  onAddRecommended: (id: string, title: string) => void
  onRemoveRecommended: (id: string) => void
  onCrumb: (label: string) => void
  onOpenCatalog?: () => void
  /** PDP tips 631:7110 / Halva 585:8582 → card application 716:12621 */
  onOpenCardApplication?: () => void
}

export function ProductDetailScreen({
  productId,
  onBack,
  onAddToCart,
  onRemoveFromCart,
  onBuyNow,
  cart,
  onAddRecommended,
  onRemoveRecommended,
  onCrumb,
  onOpenCatalog,
  onOpenCardApplication,
}: Props) {
  const pdp = useMemo(() => getProductPdp(productId), [productId])
  const [activeImage, setActiveImage] = useState(0)
  const [detailsMounted, setDetailsMounted] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const thumbs = useDragScroll<HTMLDivElement>()
  const reviews = useDragScroll<HTMLDivElement>()
  const recommended = useDragScroll<HTMLDivElement>()

  if (!pdp) return null

  const quantity = cart[productId] ?? 0
  const installment = pdp.installment ?? installmentFromPrice(pdp.price)
  const ratingBlock = pdp.ratingBlock ?? {
    score: pdp.rating,
    reviews: `${pdp.reviews.replace(/[()]/g, '').trim()} отзывов`,
  }

  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden bg-bg-base"
      data-node-id="569:6849"
      data-name="Страница товара — 375 / Moby"
    >

      <header
        className="relative z-20 shrink-0 rounded-b-[20px] bg-bg-base pb-4 shadow-[0px_10px_3px_0px_rgba(214,214,214,0),0px_7px_3px_0px_rgba(214,214,214,0.01),0px_4px_2px_0px_rgba(214,214,214,0.05),0px_2px_2px_0px_rgba(214,214,214,0.09),0px_0px_1px_0px_rgba(214,214,214,0.1)]"
        data-name="HeaderMobile"
      >
        <div className="flex flex-col gap-3 px-4 pt-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onBack}
              className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-surface-secondary"
              aria-label="Назад"
            >
              <svg
                width={12}
                height={12}
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-3"
                aria-hidden="true"
              >
                <path
                  d="M8.42383 1.57617C8.18951 1.34186 7.81049 1.34186 7.57617 1.57617L3.57617 5.57617C3.34186 5.81049 3.34185 6.18951 3.57617 6.42383L7.57617 10.4238C7.81049 10.6581 8.18951 10.6581 8.42383 10.4238C8.65814 10.1895 8.65814 9.81049 8.42383 9.57617L4.84765 6L8.42383 2.42383C8.65814 2.18951 8.65814 1.81049 8.42383 1.57617Z"
                  fill="#0D0E0F"
                />
              </svg>
            </button>
            <label className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-xl bg-surface-secondary px-2">
              <img alt="" width={16} height={16} src={assets.search} className="size-4 shrink-0" aria-hidden="true" />
              <span className="text-[16px] font-normal leading-6 text-text-primary">Поиск</span>
            </label>
          </div>
        </div>
      </header>

      <main className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain px-6 pb-[104px] scrollbar-hide">
        <Breadcrumbs items={pdp.breadcrumbs} onNavigate={onCrumb} />
        <div className="mt-3 mb-5">
          <PdpCreditTipsBanner onClick={onOpenCardApplication} />
        </div>

        <section className="flex flex-col gap-5" data-name="product-main-section">
          <div className="flex flex-col gap-4" data-name="images-column">
            <div className="relative h-[360px] w-full overflow-hidden rounded-2xl border border-[#cdd0d5] bg-bg-base">
              <img
                alt=""
                src={pdp.images[activeImage]}
                className="pointer-events-none absolute left-1/2 top-1/2 size-[480px] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain"
                draggable={false}
              />
              {pdp.badgeStatus ? (
                <div className="absolute top-[15px] left-[15px]">
                  <BadgeStatus type={pdp.badgeStatus} large />
                </div>
              ) : null}
            </div>

            <div
              ref={thumbs.ref}
              className="scrollbar-hide -mx-6 flex cursor-grab gap-2 overflow-x-auto px-6 select-none touch-pan-y"
              style={{ touchAction: 'pan-y' }}
              role="listbox"
              aria-label="Миниатюры товара"
            >
              {pdp.images.map((src, index) => {
                const selected = index === activeImage
                const isLast = index === pdp.images.length - 1
                return (
                  <button
                    key={src}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    aria-label={`Фото ${index + 1}`}
                    onClick={(event) => {
                      setActiveImage(index)
                      // Selected thumb snaps to the left; last thumb keeps current scroll
                      if (isLast) return
                      const track = thumbs.ref.current
                      const thumb = event.currentTarget
                      if (!track) return
                      const pad = Number.parseFloat(getComputedStyle(track).paddingLeft) || 0
                      track.scrollTo({
                        left: Math.max(0, thumb.offsetLeft - pad),
                        behavior: 'smooth',
                      })
                    }}
                    className={`relative box-border size-20 shrink-0 overflow-hidden rounded-xl bg-bg-base ${
                      selected ? 'border-2 border-[#1b74fd]' : 'border border-[#cdd0d5]'
                    }`}
                  >
                    <img
                      alt=""
                      src={src}
                      className="pointer-events-none absolute inset-0 size-full object-cover"
                      draggable={false}
                    />
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col gap-5" data-name="details-column">
            <div className="flex flex-col gap-2" data-name="title-and-badges-wrapper">
              <div className="flex items-center gap-2" data-node-id="578:8338" data-name="badges-row">
                {pdp.badgeProduct ? <BadgeProduct type={pdp.badgeProduct} /> : null}
                <BadgeDelivery
                  type={pdp.deliveryType ?? 'absolute'}
                  label={pdp.deliveryLabel}
                  tone="calm"
                  iconSize={18}
                />
              </div>
              <h1 className="font-montserrat text-[17px] font-semibold leading-[22px] text-text-primary">
                {pdp.title}
              </h1>
            </div>

            <div className="flex flex-col gap-3" data-name="Cost">
              <div className="rounded-2xl bg-surface-secondary p-2" data-name="purchase-card-wrapper">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1 px-2">
                    {pdp.priceSale ? (
                      <div className="flex items-baseline gap-2">
                        <p className="font-montserrat text-[24px] font-bold leading-[30px] tracking-[-0.24px] text-static-red">
                          {pdp.price}
                        </p>
                        {pdp.oldPrice ? (
                          <p className="text-[12px] font-medium leading-4 text-text-secondary line-through">
                            {displayPrice(pdp.oldPrice)}
                          </p>
                        ) : null}
                      </div>
                    ) : (
                      <p className="font-montserrat text-[24px] font-bold leading-[30px] tracking-[-0.24px] text-text-primary">
                        {pdp.price}
                      </p>
                    )}
                    <p className="text-[14px] font-medium leading-5 text-text-secondary">
                      {pricePerMeasure(pdp.price, pdp.unit) ?? pdp.unit}
                    </p>
                  </div>
                  {pdp.showInstallment ? (
                    <div className="flex w-full items-center gap-2 rounded-xl bg-[#ffe571] px-3 py-2" data-name="installment">
                      <p className="font-montserrat text-[20px] font-bold leading-[26px] whitespace-nowrap text-text-primary">
                        {installment.amount}
                      </p>
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-0.5">
                          <img
                            alt=""
                            width={5.7358}
                            height={6.54545}
                            src={assets.installmentMark}
                            className="block shrink-0"
                            aria-hidden="true"
                          />
                          <p className="text-[12px] font-medium leading-4 whitespace-nowrap text-text-secondary">
                            {installment.months}
                          </p>
                        </div>
                        <p className="text-[12px] leading-4 font-normal whitespace-nowrap text-text-secondary">
                          {installment.now}
                        </p>
                      </div>
                      <img
                        alt=""
                        width={22}
                        height={22}
                        src={assets.installmentChevron}
                        className="ml-auto block size-[22px] shrink-0"
                        aria-hidden="true"
                      />
                    </div>
                  ) : null}
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenCardApplication}
                aria-label="Получите кэшбэк в размере 10% от покупки любимых товаров"
                className="relative flex h-[112px] w-full items-start gap-2.5 overflow-hidden rounded-[20px] px-6 py-4 text-left"
                data-node-id="585:8582"
                data-name="Halva"
              >
                <img
                  alt=""
                  aria-hidden
                  src={assets.pdpHalvaBg}
                  className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[20px] object-cover"
                />
                <div
                  className="relative flex h-full w-[168px] shrink-0 items-center gap-3"
                  data-node-id="585:8583"
                  data-name="MTkard Info"
                >
                  <p
                    className="min-w-0 flex-1 text-[14px] font-bold leading-5 text-text-inverted"
                    data-node-id="585:8586"
                  >
                    Получите кэшбэк
                    <br />
                    в размере 10%
                    <br />
                    от покупки любимых товаров
                  </p>
                </div>
                <div
                  aria-hidden
                  className="pointer-events-none absolute top-[-3.57%] right-[-11px] bottom-[-74.11%] w-[195px]"
                  data-node-id="633:6981"
                  data-name="Девушка с картой NEO — сиреневая палитра"
                >
                  <img
                    alt=""
                    src={assets.pdpHalvaCard}
                    className="absolute inset-0 size-full max-w-none object-contain"
                  />
                </div>
              </button>
            </div>

            <div
              className="flex items-center gap-3 rounded-2xl bg-surface-secondary px-4 py-2"
              data-name="RatingBlock"
            >
              <span className="text-[15px] font-bold leading-5 tracking-[0.15px] text-text-primary">
                {ratingBlock.score}
              </span>
              <div className="flex flex-col">
                <span className="flex items-center py-1" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, index) => (
                    <img key={index} alt="" width={16} height={16} src={assets.starPdp} className="size-4" />
                  ))}
                </span>
                <span className="text-[11px] font-medium leading-[14px] tracking-[0.11px] text-text-secondary">
                  {ratingBlock.reviews}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2" data-name="info">
              <h2 className="font-montserrat text-[20px] font-bold leading-[26px] text-text-primary">О товаре</h2>
              <p className="text-[16px] font-medium leading-6 text-text-primary">{pdp.about}</p>
              <button
                type="button"
                onClick={() => {
                  setDetailsMounted(true)
                  setDetailsOpen(true)
                }}
                aria-expanded={detailsOpen}
                aria-haspopup="dialog"
                className="flex h-11 w-full items-center justify-center rounded-xl bg-surface-secondary text-[14px] font-medium leading-5 text-fill-brand"
              >
                Все детали
              </button>
            </div>
          </div>
        </section>

        <section className="mt-8 flex flex-col gap-6" data-name="reviews">
          <div className="flex items-end gap-6">
            <h2 className="font-montserrat text-[24px] font-bold leading-[30px] tracking-[-0.24px] text-text-primary">
              Отзывы
            </h2>
            <div className="flex items-center gap-1 pb-0.5">
              <span className="font-montserrat text-[17px] font-semibold leading-[22px] text-text-primary">
                {pdp.rating}
              </span>
              <span className="text-[16px] font-medium leading-6 text-text-secondary">{pdp.reviews}</span>
            </div>
          </div>

          <div
            ref={reviews.ref}
            className="scrollbar-hide -mx-6 flex cursor-grab items-stretch gap-4 overflow-x-auto px-6 select-none touch-pan-y"
            style={{ touchAction: 'pan-y' }}
          >
            {pdp.reviewsList.map((review) => (
              <article
                key={review.author}
                className="flex h-[300px] w-[270px] shrink-0 flex-col gap-3 rounded-2xl border border-[#cdd0d5] p-4"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <p className="font-montserrat text-[17px] font-semibold leading-[22px] text-text-primary">
                      {review.author}
                    </p>
                    <div className="flex gap-0.5" aria-label="5 из 5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <img key={i} alt="" width={16} height={16} src={assets.star} className="size-4" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[16px] font-medium leading-6 text-text-secondary">{review.date}</p>
                </div>
                <p className="whitespace-pre-line text-[16px] font-medium leading-6 text-text-primary">{review.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6 pt-[72px] pb-6" data-name="recommended">
          <h2 className="font-montserrat text-[24px] font-bold leading-[30px] tracking-[-0.24px] text-text-primary">
            Рекомендуем
          </h2>
          <div
            ref={recommended.ref}
            className="scrollbar-hide -mx-6 flex cursor-grab gap-4 overflow-x-auto px-6 select-none touch-pan-y"
            style={{ touchAction: 'pan-y' }}
          >
            {PDP_RECOMMENDED.map((product) => (
              <div key={product.id} className="w-[212px] shrink-0">
                <ProductCard
                  product={product}
                  quantity={cart[product.id] ?? 0}
                  onAdd={() => onAddRecommended(product.id, product.title)}
                  onRemove={() => onRemoveRecommended(product.id)}
                />
              </div>
            ))}
          </div>
        </section>
        <SiteFooter className="-mx-6" onOpenCatalog={onOpenCatalog} />
      </main>

      <div
        className={`absolute inset-x-0 bottom-0 z-30 flex flex-col rounded-t-2xl bg-bg-base pt-4 shadow-[0px_-10px_3px_0px_rgba(214,214,214,0),0px_-7px_3px_0px_rgba(214,214,214,0.01),0px_-4px_2px_0px_rgba(214,214,214,0.05),0px_-2px_2px_0px_rgba(214,214,214,0.09),0px_0px_1px_0px_rgba(214,214,214,0.1)] ${quantity > 0 ? 'h-[104px]' : 'h-[102px]'}`}
        data-node-id="316:26230"
        data-name="Navigation"
      >
        {quantity > 0 ? (
          <div className="flex h-[54px] w-full shrink-0 items-center gap-4 px-6" data-node-id="544:6832">
            <button
              type="button"
              onClick={onBuyNow}
              className="flex h-[54px] min-w-0 flex-1 items-center justify-center rounded-2xl bg-fill-brand px-3 text-[13px] leading-4 font-semibold text-white"
            >
              Купить сразу
            </button>
            <div
              className="flex h-[54px] w-[155px] shrink-0 items-center rounded-2xl bg-bg-base"
              role="group"
              aria-label={`Количество: ${quantity} шт`}
            >
              <button
                type="button"
                onClick={onRemoveFromCart}
                aria-label="Уменьшить количество"
                className="flex h-full w-[54px] items-center justify-center"
              >
                <img alt="" width={18} height={18} src={assets.pdpBuyMinus} />
              </button>
              <p className="min-w-0 flex-1 text-center text-[15px] leading-5 font-medium text-text-primary">{quantity} шт</p>
              <button
                type="button"
                onClick={onAddToCart}
                aria-label="Увеличить количество"
                disabled={quantity >= 99}
                className="flex h-full w-[54px] items-center justify-center disabled:opacity-40"
              >
                <img alt="" width={18} height={18} src={assets.pdpBuyPlus} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex h-[52px] w-full shrink-0 flex-col px-6">
            <button
              type="button"
              onClick={onAddToCart}
              className="flex h-[52px] w-full items-center justify-center rounded-2xl bg-surface-brand text-[16px] leading-6 font-medium text-[#fffaf2]"
              data-node-id="316:26233"
            >
              Добавить в корзину
            </button>
          </div>
        )}
      </div>

      {detailsMounted ? (
        <ProductDetailsSheet
          pdp={pdp}
          open={detailsOpen}
          onClose={() => setDetailsOpen(false)}
          onExited={() => setDetailsMounted(false)}
        />
      ) : null}
    </div>
  )
}

function displayPrice(price: string) {
  return price.replace(/р\.\s*$/u, 'р')
}

function parseMoney(price: string) {
  const compact = price.replace(/\s/g, '').replace(/[^\d,.]/g, '')
  const normalized = compact.includes(',')
    ? compact.replace(/\./g, '').replace(',', '.')
    : compact.replace(/\.+$/, '')
  const value = Number(normalized)
  return Number.isFinite(value) ? value : null
}

/** Package weight or volume → «28,20 р за 1 кг/л». */
function pricePerMeasure(price: string, unit: string) {
  const value = parseMoney(price)
  const match = unit.trim().toLowerCase().match(/(\d+(?:[.,]\d+)?)\s*(кг|г|л|мл)/)
  if (!match || value == null) return null
  const amount = Number(match[1].replace(',', '.'))
  const perBase = match[2] === 'кг' || match[2] === 'л' ? amount : amount / 1000
  if (!perBase) return null
  const formatted = (value / perBase).toFixed(2).replace('.', ',')
  return `${formatted} р за 1 кг/л`
}

