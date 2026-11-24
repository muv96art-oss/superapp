import { assets } from '../assets'

type Props = {
  /** Amount string without currency icon, e.g. "00,00" or "57,00" */
  amount?: string
  nodeId?: string
}

/** Operations status row — Figma 698:30212 */
export function BalanceOperationsCard({
  amount = '00,00',
  nodeId = '698:30212',
}: Props) {
  return (
    <div
      className="flex h-16 w-full shrink-0 items-center gap-3 overflow-hidden rounded-[20px] bg-white py-3 pr-3 pl-4"
      data-node-id={nodeId}
      data-name="Статус"
    >
      <div
        className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#dcd6ff]"
        data-node-id="698:30230"
      >
        <img
          alt=""
          src={assets.balanceCartFilled}
          width={24}
          height={24}
          className="size-6"
          data-node-id="698:30231"
        />
      </div>
      <div
        className="flex min-w-0 flex-1 flex-col items-start justify-center gap-1"
        data-node-id="698:30224"
        data-name="text"
      >
        <p className="w-full font-inter text-[12px] font-semibold leading-4 text-text-primary">
          Операции
        </p>
        <div className="flex w-full items-center gap-0.5">
          <p className="whitespace-nowrap font-inter text-[12px] font-medium leading-4 text-text-primary">
            {`Траты в октябре ${amount} `}
          </p>
          <span className="inline-flex size-4 items-center justify-center" aria-hidden>
            <img
              alt=""
              src={assets.balanceBynIcon}
              width={10}
              height={12}
              className="h-3 w-2.5 object-cover"
            />
          </span>
        </div>
      </div>
    </div>
  )
}
