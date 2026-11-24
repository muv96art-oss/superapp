import { assets } from '../assets'

export type PriceDetailsType = 'default' | 'sale'

type InstallmentLine = {
  amount: string
  months: string
}

type Props = {
  type: PriceDetailsType
  price: string
  oldPrice?: string
  unit: string
  /** Card installment line — Figma 603:7688. Only when PDP shows parts calculation. */
  installment?: InstallmentLine
}

/** Product cards — Figma 447:112770 / 458:113503. Price is Inter Bold 16/24. */
export function PriceDetails({ type, price, oldPrice, unit, installment }: Props) {
  const installmentRow = installment ? (
    <div
      className="flex items-center gap-1"
      data-node-id="603:7688"
      data-name="Price"
    >
      <p className="truncate text-[14px] font-bold leading-5 text-[#ffa404] whitespace-nowrap">
        {installment.amount}
      </p>
      <img
        alt=""
        width={5.7358}
        height={6.54545}
        src={assets.installmentMarkOrange}
        className="block shrink-0"
        aria-hidden="true"
      />
      <p className="text-[14px] font-bold leading-5 text-[#ffa404] whitespace-nowrap">
        {installment.months}
      </p>
    </div>
  ) : null

  if (type === 'sale') {
    return (
      <div
        className="flex w-full flex-col items-start gap-0.5"
        data-name=".PriceDetails"
        data-node-id="2144:2715"
        data-type="sale"
      >
        {installmentRow}
        <div className="flex w-full items-center gap-2" data-name="Price Info">
          <div className="flex items-center gap-2 whitespace-nowrap" data-name="Price and Quantity">
            <p className="truncate text-[16px] font-bold leading-6 text-static-red">
              {price}
            </p>
            {oldPrice ? (
              <p className="text-[12px] font-medium leading-4 text-text-secondary line-through decoration-solid">
                {oldPrice}
              </p>
            ) : null}
          </div>
        </div>
        <p className="text-[12px] font-medium leading-4 text-basic-secondary">{unit}</p>
      </div>
    )
  }

  return (
    <div
      className="flex flex-col items-start gap-0.5"
      data-name=".PriceDetails"
      data-node-id="2144:2713"
      data-type="default"
    >
      {installmentRow}
      <div className="flex items-center gap-2" data-name="Price">
        <p className="truncate text-[16px] font-bold leading-6 text-text-primary">
          {price}
        </p>
      </div>
      <p className="text-[12px] font-medium leading-4 text-text-secondary">{unit}</p>
    </div>
  )
}
