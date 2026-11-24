import { useRef, useState } from 'react'
import { assets } from '../assets'
import {
  CART_MAX,
  getProductById,
  getProductPdp,
  type Product,
} from '../data'
import { BadgeMarketing } from './badges'
import { PaymentMethods, type PaymentSummary } from './PaymentMethods'
import { SiteFooter } from './SiteFooter'

type Props = {
  cart: Record<string, number>
  cartCount: number
  onAdd: (id: string) => void
  onRemove: (id: string) => void
  onDelete: (id: string) => void
  onClear: () => void
  onOpenCatalog: () => void
  onOpenProduct: (id: string) => void
  onToast: (message: string) => void
  toast?: string | null
}

type DeliveryMethod = 'pickup' | 'delivery'

const DELIVERY_FEE = 7
const MIN_ORDER = 30
const FREE_DELIVERY = 80

export function CartScreen({
  cart,
  cartCount: _cartCount,
  onAdd,
  onRemove,
  onDelete,
  onClear,
  onOpenCatalog,
  onOpenProduct,
  onToast,
  toast = null,
}: Props) {
  const [method, setMethod] = useState<DeliveryMethod>('pickup')
  const [paymentSummary, setPaymentSummary] = useState<PaymentSummary>({ kind: 'order' })
  const mainRef = useRef<HTMLElement>(null)
  const [comment, setComment] = useState('Оставить у двери, домофон не работает')

  const lines = Object.entries(cart)
    .filter(([, quantity]) => quantity > 0)
    .flatMap(([id, quantity]) => {
      const product = getProductById(id)
      return product ? [{ product, quantity }] : []
    })

  const goodsTotal = lines.reduce(
    (sum, line) => sum + parsePrice(line.product.price) * line.quantity,
    0,
  )
  const listTotal = lines.reduce((sum, line) => {
    const current = parsePrice(line.product.price)
    const list = line.product.oldPrice ? parsePrice(line.product.oldPrice) : current
    return sum + Math.max(list, current) * line.quantity
  }, 0)
  const discount = Math.max(0, listTotal - goodsTotal)
  const canCheckout = goodsTotal >= MIN_ORDER
  const deliveryFree = method === 'delivery' && goodsTotal >= FREE_DELIVERY
  const deliveryCost = method === 'delivery' && !deliveryFree ? DELIVERY_FEE : 0
  const payable = goodsTotal + deliveryCost
  const empty = lines.length === 0

  if (empty) {
    return (
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-bg-base" data-node-id="532:35393" data-name="Корзина — пусто">
        <main ref={mainRef} className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain pb-[98px] scrollbar-hide">
          <div className="flex min-h-full flex-col gap-6 px-4 pt-6">
          <h1 className="font-montserrat text-[28px] font-bold leading-[34px] tracking-[-0.28px] text-text-primary">
            Корзина
          </h1>
          <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-4">
            <div className="flex w-[311px] max-w-full flex-col items-center gap-2 text-center">
              <p className="font-montserrat text-[20px] font-bold leading-[27px] tracking-[-0.4px] text-basic-primary">
                Ваша корзина пуста
              </p>
              <p className="text-[15px] font-normal leading-5 text-basic-secondary">
                А у нас в каталоге много нового. Посмотрите, может что-нибудь понравится
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenCatalog}
              className="flex h-[52px] w-full items-center justify-center rounded-2xl bg-fill-brand px-5 text-[16px] font-medium leading-6 text-white"
            >
              Перейти в каталог
            </button>
          </div>
          </div>
          <SiteFooter onOpenCatalog={onOpenCatalog} />
        </main>
        {toast ? (
          <div
            role="status"
            aria-live="polite"
            className="pointer-events-none absolute bottom-[110px] left-1/2 z-40 max-w-[85%] -translate-x-1/2 rounded-xl bg-text-primary px-3 py-2 text-center text-[12px] font-medium text-white shadow-lg"
          >
            {toast}
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-bg-base" data-node-id="525:34951" data-name="Корзина — 375">
      <main ref={mainRef} className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain px-4 pb-[260px] pt-4 scrollbar-hide">
        <div className="flex items-center justify-between" data-node-id="525:34954">
          <h1 className="flex items-center gap-3 font-montserrat text-[28px] font-bold leading-[34px] tracking-[-0.28px]">
            <span className="text-text-primary">Корзина</span>
            <span className="text-text-secondary">{lines.length}</span>
          </h1>
          <button
            type="button"
            onClick={onClear}
            className="flex h-8 items-center justify-center rounded-xl bg-surface-secondary px-3 text-[14px] font-medium leading-5 text-text-primary"
            data-node-id="525:34958"
          >
            Очистить
          </button>
        </div>

          <ul className="mt-6 flex flex-col gap-5" data-node-id="525:34960">
            {lines.map(({ product, quantity }) => (
              <CartLine
                key={product.id}
                product={product}
                quantity={quantity}
                maxQuantity={CART_MAX[product.id] ?? 99}
                onAdd={() => onAdd(product.id)}
                onRemove={() => onRemove(product.id)}
                onDelete={() => onDelete(product.id)}
                onOpen={() => onOpenProduct(product.id)}
              />
            ))}
          </ul>

        <div className="mt-8 flex flex-col gap-6" data-node-id="525:34965">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2" data-name="Method_Tabs">
              <button
                type="button"
                onClick={() => setMethod('pickup')}
                aria-pressed={method === 'pickup'}
                className={`flex min-w-0 flex-1 items-center gap-3 rounded-xl border-2 bg-surface-secondary px-4 py-2 ${
                  method === 'pickup' ? 'border-fill-brand' : 'border-transparent'
                }`}
              >
                <img alt="" width={24} height={24} src={assets.cartBox} />
                <span className="text-[16px] font-semibold leading-6 text-text-primary">Самовывоз</span>
              </button>
              <button
                type="button"
                onClick={() => setMethod('delivery')}
                aria-pressed={method === 'delivery'}
                className={`relative flex min-w-0 flex-1 items-center gap-3 rounded-xl border-2 bg-surface-secondary px-4 py-2 ${
                  method === 'delivery' ? 'border-fill-brand' : 'border-transparent'
                }`}
              >
                <img alt="" width={24} height={24} src={assets.cartTruck} />
                <span className="text-[16px] font-semibold leading-6 text-text-primary">Доставка</span>
                <span className="absolute -top-1 -right-1.5 rounded-xl bg-fill-brand px-1.5 py-1 text-[11px] leading-[14px] text-white">
                  +7,0 р
                </span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => onToast('Выберите пункт')}
              className="flex w-full items-center gap-4 text-left"
            >
              <span className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="text-[16px] font-semibold leading-6 text-text-primary">Пункт самовывоза</span>
                <span className="text-[14px] font-medium leading-5 text-text-secondary">Выберите пункт</span>
              </span>
              <img alt="" width={24} height={24} src={assets.cartChevron} />
            </button>

            <label className="flex flex-col gap-1">
              <span className="text-[16px] font-semibold leading-6 text-text-primary">Комментарий к заказу</span>
              <input
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                className="h-[54px] w-full rounded-2xl border border-[#cdd0d5] bg-bg-base px-3 text-[16px] leading-5 text-text-secondary outline-none focus-visible:border-fill-brand"
              />
            </label>
          </div>

          <PaymentMethods amount={payable} onSummary={setPaymentSummary} />

          <button
            type="button"
            onClick={() => onToast('Замена товара')}
            className="flex w-full items-center gap-4 text-left"
          >
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="text-[16px] font-semibold leading-6 text-text-primary">Замена товара</span>
              <span className="text-[14px] font-medium leading-5 text-text-secondary">
                Доставить доступное количество товара
              </span>
            </span>
            <img alt="" width={24} height={24} src={assets.cartChevron} />
          </button>

          <CartSummary
            payment={paymentSummary}
            payable={payable}
            goodsTotal={listTotal}
            discount={discount}
            showDelivery={method === 'delivery'}
            deliveryCost={deliveryCost}
          />
        </div>
        <SiteFooter className="-mx-4" onOpenCatalog={onOpenCatalog} />
      </main>

      {toast ? (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none absolute bottom-[168px] left-1/2 z-40 max-w-[85%] -translate-x-1/2 rounded-xl bg-text-primary px-3 py-2 text-center text-[12px] font-medium text-white shadow-lg"
        >
          {toast}
        </div>
      ) : null}

      {/* Checkout + tab bar zone — Figma 525:34951 / 608:9263 (+ notice from 532:35808) */}
      <div
        className="absolute inset-x-0 bottom-0 z-40 flex flex-col overflow-hidden rounded-t-2xl bg-bg-base shadow-[0_0_1px_0_rgba(214,214,214,0.1),0_-2px_2px_0_rgba(214,214,214,0.09),0_-4px_2px_0_rgba(214,214,214,0.05),0_-7px_3px_0_rgba(214,214,214,0.01),0_-10px_3px_0_rgba(214,214,214,0)]"
        data-node-id="608:9263"
      >
        {/* Section: px-16, notice 36 + button 52; Tab Bar pt-16 creates gap to pills */}
        <div className="w-full shrink-0 px-4">
          <CheckoutNotice
            method={method}
            canCheckout={canCheckout}
            deliveryFree={deliveryFree}
            remaining={Math.max(0, FREE_DELIVERY - goodsTotal)}
          />
          <button
            type="button"
            disabled={!canCheckout}
            onClick={() => onToast('Оформить заказ')}
            className="flex h-[52px] w-full items-center justify-center rounded-2xl bg-fill-brand px-5 text-[16px] font-medium leading-6 text-white disabled:cursor-default"
            style={
              canCheckout
                ? undefined
                : {
                    backgroundImage:
                      'linear-gradient(90deg, rgba(255,255,255,0.32), rgba(255,255,255,0.32)), linear-gradient(90deg, #1b74fd, #1b74fd)',
                  }
            }
          >
            Оформить заказ
          </button>
        </div>
        {/* BottomNav is absolute bottom-0, h ≈ 95 (pt-16 + 54 + pb-25) */}
        <div className="h-[95px] w-full shrink-0" aria-hidden />
      </div>
    </div>
  )
}

function CheckoutNotice({
  method,
  canCheckout,
  deliveryFree,
  remaining,
}: {
  method: DeliveryMethod
  canCheckout: boolean
  deliveryFree: boolean
  remaining: number
}) {
  if (method === 'delivery' && canCheckout && deliveryFree) {
    return (
      <div className="flex w-full items-center justify-center gap-1.5 px-3 py-2">
        <img alt="" width={16} height={16} src={assets.cartDeliveryFree} />
        <span className="text-[11px] font-semibold leading-[14px] tracking-[0.11px] text-static-green">
          Доставка бесплатная
        </span>
      </div>
    )
  }

  if (method === 'delivery' && canCheckout) {
    return (
      <div className="flex w-full items-center gap-3 py-2.5">
        <div className="flex min-w-0 flex-1 items-center gap-1">
          <img alt="" width={16} height={16} src={assets.cartDelivery} />
          <span className="text-[11px] font-semibold leading-[14px] tracking-[0.11px] whitespace-nowrap text-text-primary">
            Доставка {formatMoney(DELIVERY_FEE)}
          </span>
        </div>
        <p className="min-w-0 flex-1 text-right text-[11px] leading-[14px] tracking-[0.11px]">
          <span className="font-medium text-black">До бесплатной</span>
          <span className="font-bold text-fill-brand"> {formatMoney(remaining)}</span>
        </p>
      </div>
    )
  }

  return (
    <div className="flex h-9 w-full items-center justify-center gap-1 py-2.5">
      <img alt="" width={16} height={16} src={assets.cartDelivery} />
      <p className="text-[11px] font-semibold leading-[14px] tracking-[0.11px] text-text-primary">
        Минимальная сумма заказа <span className="text-fill-brand">{formatMoney(MIN_ORDER)}</span>
      </p>
    </div>
  )
}

function CartLine({
  product,
  quantity,
  maxQuantity,
  onAdd,
  onRemove,
  onDelete,
  onOpen,
}: {
  product: Product
  quantity: number
  maxQuantity: number
  onAdd: () => void
  onRemove: () => void
  onDelete: () => void
  onOpen: () => void
}) {
  const atMax = quantity >= maxQuantity
  const linePrice = parsePrice(product.price) * quantity
  const delivery = product.badges?.delivery

  return (
    <li className="flex flex-col gap-3" data-name="Card">
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => {
            if (getProductPdp(product.id)) onOpen()
          }}
          className="relative h-36 w-[136px] shrink-0 overflow-hidden rounded-2xl border border-[rgba(228,231,235,0.4)] bg-bg-base"
          aria-label={product.title}
        >
          <img
            alt=""
            src={product.image}
            className="pointer-events-none absolute inset-[-0.5px] size-[calc(100%+1px)] max-w-none object-contain"
            draggable={false}
          />
          <span className="absolute top-2 left-2 flex flex-wrap gap-1">
            {product.badges?.marketing ? (
              <BadgeMarketing type={product.badges.marketing.type} label={product.badges.marketing.label} />
            ) : null}
          </span>
          {product.badges?.product === 'sale' ? (
            <span className="absolute bottom-2 left-2 inline-flex h-6 items-center rounded-xl bg-fill-brand px-2 py-1 text-[12px] font-semibold leading-4 text-white">
              РАСПРОДАЖА
            </span>
          ) : null}
        </button>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            {delivery ? <CartDelivery type={delivery.type} label={delivery.label} /> : <span />}
            <button
              type="button"
              onClick={onDelete}
              aria-label={`Удалить ${product.title}`}
              className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-surface-secondary"
            >
              <img alt="" width={16} height={16} src={assets.cartTrash} />
            </button>
          </div>
          <p className="line-clamp-2 text-[16px] font-medium leading-6 text-text-primary">{product.title}</p>
          <div className="flex flex-col gap-0.5">
            <p className="font-montserrat text-[20px] font-bold leading-[26px] text-text-primary">
              {formatMoney(linePrice)}
            </p>
            <p className="text-[14px] font-medium leading-5 text-text-secondary">{product.unit}</p>
          </div>
        </div>
      </div>

      <div
        className="flex h-[52px] items-center rounded-2xl bg-surface-secondary"
        role="group"
        aria-label={`Количество: ${quantity} шт`}
        data-name="cartStepper"
      >
        <button
          type="button"
          onClick={onRemove}
          aria-label="Уменьшить количество"
          className="flex h-full w-12 items-center justify-center pr-2 pl-3"
        >
          <img alt="" width={1.5} height={19.8335} src={assets.cartMinusBlue} className="rotate-90" />
        </button>
        <p className="min-w-9 flex-1 text-center text-[16px] font-semibold leading-6 text-text-primary">{quantity} шт</p>
        {atMax ? (
          <span className="flex h-full w-12 items-center justify-center pr-3 pl-2" aria-hidden="true">
            <img alt="" width={19.8335} height={19.8335} src={assets.cartPlusDisabled} />
          </span>
        ) : (
          <button
            type="button"
            onClick={onAdd}
            aria-label="Увеличить количество"
            className="flex h-full w-12 items-center justify-center pr-3 pl-2"
          >
            <img alt="" width={19.8335} height={19.8335} src={assets.cartPlusBlue} />
          </button>
        )}
      </div>
    </li>
  )
}

function CartDelivery({ type, label }: { type: 'express' | 'relative' | 'absolute'; label?: string }) {
  const express = type === 'express'
  const text = label ?? (express ? 'СЕГОДНЯ' : 'ЗАВТРА')
  return (
    <span
      className={`inline-flex h-6 items-center gap-1 rounded-[20px] py-1 pr-3 pl-2 ${
        express ? 'bg-[#fffaf2]' : 'bg-[#e0edff]'
      }`}
    >
      <img
        alt=""
        width={14}
        height={14}
        src={express ? assets.boltBadge : assets.truckPdp}
        className="size-3.5"
      />
      <span
        className={`text-[12px] font-semibold leading-4 ${express ? 'text-text-primary' : 'text-fill-brand-loud'}`}
      >
        {text}
      </span>
    </span>
  )
}

function parsePrice(value: string) {
  const normalized = value.replace(/\s/g, '').replace('р', '').replace(',', '.')
  const amount = Number(normalized)
  return Number.isFinite(amount) ? amount : 0
}

function formatMoney(value: number) {
  const [whole, fraction] = value.toFixed(2).split('.')
  return `${whole},${fraction} р`
}

function CartSummary({
  payment,
  payable,
  goodsTotal,
  discount,
  showDelivery,
  deliveryCost,
}: {
  payment: PaymentSummary
  payable: number
  goodsTotal: number
  discount: number
  showDelivery: boolean
  deliveryCost: number
}) {
  const installment = payment.kind === 'installment'
  const title = installment ? 'Ежемесячный платёж' : 'Итого'
  const titleAmount = installment ? payment.monthly : payable

  return (
    <section
      className="flex flex-col gap-3 rounded-2xl bg-surface-secondary p-4"
      data-node-id="590:8636"
      data-name="Details - Summary"
    >
      <div className="flex items-center gap-3 text-[15px] font-bold leading-5 tracking-[0.15px] text-text-primary">
        <h2 className="min-w-0 flex-1">{title}</h2>
        <p className="shrink-0 whitespace-nowrap">{formatMoney(titleAmount)}</p>
      </div>
      <div className="h-[0.5px] w-full bg-[#cdd0d5]" />
      <div className="flex flex-col gap-1">
        {installment ? (
          <SummaryRow label="Сумма оплаты частями" value={formatMoney(payment.total)} />
        ) : (
          <>
            <SummaryRow label="Стоимость товаров" value={formatMoney(goodsTotal)} />
            {showDelivery ? <SummaryRow label="Стоимость доставки" value={formatMoney(deliveryCost)} /> : null}
            {discount > 0 ? (
              <SummaryRow label="Скидка" value={`-${formatMoney(discount)}`} tone="discount" />
            ) : null}
          </>
        )}
      </div>
    </section>
  )
}

function SummaryRow({
  label,
  value,
  tone = 'default',
}: {
  label: string
  value: string
  tone?: 'default' | 'discount'
}) {
  return (
    <div className="flex items-center gap-3 text-[13px] font-medium leading-4">
      <span className="min-w-0 flex-1 text-text-secondary">{label}</span>
      <span className={`shrink-0 whitespace-nowrap ${tone === 'discount' ? 'text-static-orange' : 'text-text-secondary'}`}>
        {value}
      </span>
    </div>
  )
}
