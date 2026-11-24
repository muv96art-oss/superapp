import { assets } from '../assets'

type Props = {
  /** When true — tall card with Себе / Контакты. Figma 692:27202 */
  showRecipients?: boolean
  nodeId?: string
}

/** Transfer-by-phone card — Figma 692:27072 / 698:30001 / 692:27202 */
export function BalanceTransferCard({
  showRecipients = false,
  nodeId = '698:30001',
}: Props) {
  return (
    <div
      className="flex w-[327px] shrink-0 flex-col items-start gap-3 overflow-hidden rounded-3xl bg-white p-6"
      data-node-id={nodeId}
      data-name="Карточка перевода"
    >
      <div className="flex w-full items-center gap-2 overflow-hidden" data-node-id="692:26654">
        <p className="whitespace-nowrap font-inter text-[16px] font-bold leading-6 text-text-primary">
          Перевод по телефону
        </p>
      </div>
      <div className="flex h-11 w-full flex-col items-start" data-node-id="692:27073" data-name="Search Field">
        <div className="flex min-h-0 w-full flex-1 items-center rounded-xl bg-surface-secondary px-2 py-2">
          <p className="min-w-0 flex-1 font-inter text-[14px] font-normal leading-5 text-text-secondary">
            Введите номер или имя
          </p>
        </div>
      </div>
      {showRecipients ? (
        <div
          className="flex w-full items-start gap-1 overflow-hidden"
          data-node-id="692:26659"
          data-name="Быстрые получатели"
        >
          <div
            className="flex w-16 shrink-0 flex-col items-center gap-2 overflow-hidden"
            data-node-id="692:26660"
            data-name="Себе"
          >
            <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-surface-secondary">
              <img
                alt=""
                src={assets.balanceAvatarSelf}
                width={48}
                height={48}
                className="absolute inset-0 size-full object-cover object-[center_20%]"
              />
            </div>
            <p className="w-full text-center font-inter text-[11px] font-normal leading-[14px] text-text-primary">
              Себе
            </p>
          </div>
          <div
            className="flex w-16 shrink-0 flex-col items-center gap-2 overflow-hidden"
            data-node-id="692:27115"
            data-name="Контакты"
          >
            <div
              className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-fill-brand"
              data-node-id="692:27116"
            >
              <span className="font-inter text-[18px] font-normal leading-7 text-white">К</span>
            </div>
            <p className="w-full text-center font-inter text-[11px] font-normal leading-[14px] text-text-primary">
              Контакты
            </p>
          </div>
        </div>
      ) : null}
    </div>
  )
}
