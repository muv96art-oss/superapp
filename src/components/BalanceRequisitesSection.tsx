import { assets } from '../assets'

type CardProps = {
  title: string
  subtitle: string
  limit?: { amount: string; label: string }
  nodeId: string
  onClick?: () => void
}

function RequisiteCard({ title, subtitle, limit, nodeId, onClick }: CardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[110px] min-w-0 flex-1 flex-col items-start justify-between overflow-hidden rounded-3xl bg-white p-3 text-left"
      data-node-id={nodeId}
      aria-label={`${title}. ${subtitle}`}
    >
      <div className="flex w-full items-start gap-2.5" data-name="Top">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#e0edff]">
          <img
            alt=""
            src={assets.balanceTileCard}
            width={24}
            height={24}
            className="size-6 max-w-none"
          />
        </span>
        {limit ? (
          <div
            className="flex min-w-0 flex-1 flex-col items-end justify-center text-right font-inter text-[11px] font-normal leading-[14px] text-text-secondary"
            data-node-id="716:9720"
          >
            <p className="w-full" data-node-id="716:9721">
              {limit.amount}
            </p>
            <p className="w-full" data-node-id="716:9722">
              {limit.label}
            </p>
          </div>
        ) : null}
      </div>
      <div className="flex w-full flex-col items-start justify-center gap-0.5 text-text-primary">
        <p className="w-full font-inter text-[12px] font-semibold leading-4">{title}</p>
        <p className="w-full font-inter text-[11px] font-normal leading-[14px]">{subtitle}</p>
      </div>
    </button>
  )
}

type Props = {
  onCardClick?: (id: string, label: string) => void
}

/** Requisites & settings — Figma 716:9702 */
export function BalanceRequisitesSection({ onCardClick }: Props) {
  return (
    <section
      className="flex w-full shrink-0 flex-col items-center gap-2.5"
      data-node-id="716:9702"
    >
      <div className="flex w-full items-center justify-center" data-name="Title">
        <p className="min-w-0 flex-1 font-montserrat text-[20px] font-bold leading-[26px] text-text-primary">
          Реквизиты и настройки
        </p>
      </div>

      <div
        className="flex w-full items-start justify-center gap-2"
        data-name="Быстрые получатели"
      >
        <RequisiteCard
          title="Пластиковая"
          subtitle="Новая дата доставки"
          nodeId="716:9706"
          onClick={() => onCardClick?.('plastic', 'Пластиковая')}
        />
        <RequisiteCard
          title="Цифровая"
          subtitle="Карта 0027"
          limit={{ amount: '3000 р', label: 'лимит' }}
          nodeId="716:9716"
          onClick={() => onCardClick?.('digital', 'Цифровая')}
        />
      </div>
    </section>
  )
}
