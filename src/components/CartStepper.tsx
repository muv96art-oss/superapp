import { assets } from '../assets'

export type CartStepperType = 'add' | 'stepper' | 'stepperMax'

type Props = {
  type: CartStepperType
  quantityLabel: string
  onAdd: () => void
  onRemove: () => void
  className?: string
}

/** Locked component — Figma cartStepper 2150:57161 (add / stepper / stepperMax) */
export function CartStepper({ type, quantityLabel, onAdd, onRemove, className = '' }: Props) {
  if (type === 'add') {
    return (
      <button
        type="button"
        onClick={onAdd}
        aria-label="Добавить в корзину"
        data-name="cartStepper"
        data-node-id="2150:57162"
        data-type="add"
        className={`flex h-11 w-full shrink-0 items-center justify-center rounded-2xl bg-surface-brand transition-opacity hover:opacity-90 active:opacity-80 ${className}`}
      >
        <img
          alt=""
          width={20}
          height={20}
          src={assets.plus}
          className="size-5"
          aria-hidden="true"
        />
      </button>
    )
  }

  const atMax = type === 'stepperMax'

  return (
    <div
      data-name="cartStepper"
      data-node-id={atMax ? '2180:1164' : '2150:57167'}
      data-type={type}
      className={`flex h-11 w-full shrink-0 items-center rounded-2xl bg-secondary-light ${className}`}
      role="group"
      aria-label={`Количество: ${quantityLabel}`}
    >
      <button
        type="button"
        onClick={onRemove}
        aria-label="Уменьшить количество"
        className="flex h-full w-12 shrink-0 items-center justify-center py-2 pl-3 pr-2"
        data-name="icon"
      >
        <span className="relative flex size-5 items-center justify-center" aria-hidden="true">
          <img
            alt=""
            width={2}
            height={20}
            src={assets.cartMinus}
            className="h-[20px] w-[1.5px] rotate-90"
          />
        </span>
      </button>

      <p className="min-w-9 flex-1 text-center text-[16px] font-semibold leading-6 text-basic-primary">
        {quantityLabel}
      </p>

      {atMax ? (
        <span
          className="flex h-full w-12 shrink-0 items-center justify-center py-2 pl-2 pr-3"
          aria-hidden="true"
          data-name="icon"
        >
          <img
            alt=""
            width={20}
            height={20}
            src={assets.cartStepperPlusDisabled}
            className="size-5"
          />
        </span>
      ) : (
        <button
          type="button"
          onClick={onAdd}
          aria-label="Увеличить количество"
          className="flex h-full w-12 shrink-0 items-center justify-center py-2 pl-2 pr-3"
          data-name="icon"
        >
          <img
            alt=""
            width={20}
            height={20}
            src={assets.cartStepperPlus}
            className="size-5"
            aria-hidden="true"
          />
        </button>
      )}
    </div>
  )
}

export function cartStepperType(quantity: number, maxQuantity: number): CartStepperType {
  if (quantity <= 0) return 'add'
  if (quantity >= maxQuantity) return 'stepperMax'
  return 'stepper'
}
