import { useState, type ReactNode } from 'react'
import { assets } from '../assets'
import { BalanceMarketplaceCard } from './BalanceMarketplaceCard'

type Props = {
  onBack: () => void
  /** Both consents on → issue card (unissued → virtual + Home Variant4) */
  onSubmit: () => void
  onToast?: (message: string) => void
  cardName?: string
}

const DETAILS = [
  { label: 'Тип карты', value: 'Виртуальная', nodeId: '716:12641' },
  { label: 'Стоимость карты', value: 'Комиссия за выпуск 0 BYN', nodeId: '716:12642' },
  { label: 'Обслуживание карты', value: 'Бесплатно', nodeId: '716:12643' },
  {
    label: 'Стоимость услуги SMS-уведомление в месяц',
    value: 'XX.XX BYN',
    nodeId: '716:12644',
  },
] as const

/**
 * Card application — Figma 716:12621
 * Entry: Halva 654:8738, PDP tips 631:7110, PDP Halva 585:8582,
 * Balance issue banner 698:29990, issue CTA 672:9159
 */
export function CardApplicationScreen({
  onBack,
  onSubmit,
  onToast,
  cardName = 'Marketplace',
}: Props) {
  const [agreeContract, setAgreeContract] = useState(false)
  const [agreeMemo, setAgreeMemo] = useState(false)
  const canSubmit = agreeContract && agreeMemo

  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden bg-bg-base"
      data-node-id="716:12621"
      data-name="8.1"
    >

      <div className="flex shrink-0 flex-col" data-node-id="716:12622" data-name="Top">
        <div
          className="flex h-11 items-end px-4 py-3"
          data-node-id="716:12814"
          data-name="Navbar"
        >
          <div className="flex w-full items-center gap-1.5" data-name="Body">
            <button
              type="button"
              onClick={onBack}
              aria-label="Назад"
              className="flex min-w-0 flex-1 items-center gap-1.5 text-left"
              data-name="Arrow, Left Title"
            >
              <span className="relative size-6 shrink-0" data-name="System Icon">
                <img
                  alt=""
                  src={assets.cardApplicationBack}
                  width={9}
                  height={16}
                  className="absolute top-1/2 left-1/2 h-4 w-[9px] max-w-none -translate-x-1/2 -translate-y-1/2"
                />
              </span>
              <span className="min-w-0 flex-1 font-inter text-[20px] font-medium leading-[26px] text-text-primary">
                Оформление карты
              </span>
            </button>
          </div>
        </div>
      </div>

      <main
        className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain scrollbar-hide"
        data-node-id="716:12625"
        data-name="Middle"
      >
        <div className="flex flex-col items-center gap-8 px-4 pt-4 pb-6">
          <div className="flex w-full flex-col items-start gap-6">
            <h1 className="w-full font-inter text-[30px] font-semibold leading-9 text-text-primary">
              Оформите карту
            </h1>
            <p className="w-full font-inter text-[14px] font-normal leading-[18px] text-text-secondary">
              Оформите карту {cardName}, для того, чтобы пользоваться всеми возможностями
            </p>
          </div>

          <div data-node-id="716:12796" data-name="Card" className="w-full shrink-0">
            <BalanceMarketplaceCard aspectWidth={287} aspectHeight={173} />
          </div>

          <div
            className="flex w-full flex-col items-stretch justify-center gap-2 rounded-2xl bg-[#e0edff] p-4"
            data-node-id="716:12640"
            data-name="text"
          >
            {DETAILS.map((row) => (
              <div
                key={row.nodeId}
                className="flex h-10 w-full items-center gap-3"
                data-node-id={row.nodeId}
                data-name="Cell"
              >
                <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-1 text-left">
                  <p className="w-full text-left font-inter text-[12px] font-medium leading-4 text-text-secondary">
                    {row.label}
                  </p>
                  <p className="w-full text-left font-inter text-[16px] font-medium leading-5 text-text-primary">
                    {row.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="flex w-full flex-col items-start gap-3"
            data-node-id="716:12645"
            data-name="Container"
          >
            <ConsentRow
              checked={agreeContract}
              onChange={setAgreeContract}
              nodeId="716:12753"
            >
              Прошу открыть счет и подтверждаю, что ознакомлен(-а) и согласен(-а) с{' '}
              <button
                type="button"
                className="inline p-0 text-left font-inherit text-[length:inherit] leading-[inherit] text-fill-brand"
                onClick={() =>
                  onToast?.('Договор об использовании банковской платежной карточки')
                }
              >
                Договором об использовании банковской платежной карточки
              </button>
            </ConsentRow>

            <ConsentRow
              checked={agreeMemo}
              onChange={setAgreeMemo}
              nodeId="716:12747"
            >
              Я подтверждаю, что открываю счет для личных целей и не действую в интересах
              третьих лиц, а также ознакомлен(-а) с Памяткой{' '}
              <button
                type="button"
                className="inline p-0 text-left font-inherit text-[length:inherit] leading-[inherit] text-fill-brand"
                onClick={() => onToast?.('Памятка «О действиях мошенников»')}
              >
                «О действиях мошенников»
              </button>
            </ConsentRow>
          </div>
        </div>
      </main>

      <div
        className="flex shrink-0 flex-col items-center gap-6 pt-6"
        data-node-id="716:12648"
        data-name="Bottom"
      >
        <div className="w-full px-4" data-node-id="716:12649">
          <button
            type="button"
            disabled={!canSubmit}
            onClick={() => {
              if (!canSubmit) return
              onSubmit()
            }}
            className="flex w-full items-center justify-center rounded-xl bg-fill-brand px-6 py-3 disabled:opacity-40"
            data-node-id="716:12741"
            data-name="button"
          >
            <span className="font-inter text-[16px] font-medium leading-5 text-white">
              Оформить
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

function ConsentRow({
  checked,
  onChange,
  nodeId,
  children,
}: {
  checked: boolean
  onChange: (next: boolean) => void
  nodeId: string
  children: ReactNode
}) {
  return (
    <div
      className="flex w-full items-start gap-3"
      data-node-id={nodeId}
      data-name="Checkbox"
    >
      <div className="flex min-h-6 min-w-0 flex-1 flex-col items-start pt-1 text-left" data-name="text">
        <p className="w-full text-left font-inter text-[14px] font-normal leading-[18px] text-text-primary">
          {children}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label="Согласие"
        onClick={() => onChange(!checked)}
        className={`relative h-[30px] w-[60px] shrink-0 rounded-full transition-colors duration-200 ${
          checked ? 'bg-fill-brand' : 'bg-[#e5e7eb]'
        }`}
        data-name="Selection Controls"
      >
        <span
          className={`absolute top-[2px] size-[26px] rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.12)] transition-[left] duration-200 ${
            checked ? 'left-[32px]' : 'left-[2px]'
          }`}
        />
      </button>
    </div>
  )
}
