import type { ReactNode } from 'react'
import { assets } from '../assets'

type Props = {
  onOpenMarket: () => void
  onToast?: (message: string) => void
  toast?: string | null
}

/** Bank home — Figma 313:36319. Market entry: banner 388:28259 + tab 447:112438. */
export function BankScreen({ onOpenMarket, onToast, toast: toastMessage }: Props) {
  const toast = (message: string) => onToast?.(message)

  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden bg-[#f5f5f8]"
      data-node-id="313:36319"
      data-name="Home page"
    >
      <main className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain pb-[96px] scrollbar-hide">
        <BankTop onToast={toast} />

        <div className="mt-4 flex flex-col gap-4">
          <HistoryRow />

          <div className="flex gap-2 px-4" data-node-id="313:36331" data-name="Баннеры">
            <button
              type="button"
              onClick={() => toast('Обменник')}
              className="relative h-[72px] min-w-0 flex-1 overflow-hidden rounded-2xl text-left"
              data-node-id="388:28258"
              data-name="Баннер Обменник"
              style={{
                backgroundImage:
                  'linear-gradient(76.87deg, rgb(16, 69, 151) 3.72%, rgb(27, 116, 253) 69.03%)',
              }}
            >
              <img
                alt=""
                src={assets.bankExchangeCoins}
                className="pointer-events-none absolute top-[-8px] left-[-28px] h-[88px] w-[118px] -rotate-[18deg] object-contain"
                aria-hidden="true"
              />
              <div className="absolute top-1/2 left-[48px] right-2 flex -translate-y-1/2 flex-col gap-0.5 text-[10px] leading-3 text-white">
                <div className="font-rubik-mono flex gap-[3px] uppercase whitespace-nowrap">
                  <span>Обменник</span>
                  <span>MOBY</span>
                </div>
                <p className="font-normal">Обмен валют по выгодному курсу</p>
              </div>
            </button>

            <button
              type="button"
              onClick={onOpenMarket}
              className="relative flex h-[72px] min-w-0 flex-1 items-center overflow-hidden rounded-2xl bg-gradient-to-r from-[#2a1463] to-[#ff5c39] py-2 pr-2 pl-3 text-left"
              data-node-id="388:28259"
              data-name="Баннер Маркет"
              aria-label="Открыть Маркет MOBY"
            >
              <div className="relative z-10 flex w-[95px] shrink-0 flex-col gap-0.5 text-[10px] leading-3 text-white">
                <div className="font-rubik-mono flex gap-1 uppercase whitespace-nowrap">
                  <span>Маркет</span>
                  <span>MOBY</span>
                </div>
                <p className="font-normal">Товары с быстрой доставкой</p>
              </div>
              <img
                alt=""
                src={assets.bankMarketNesquik}
                className="pointer-events-none absolute top-[-5px] right-[-18px] size-[110px] rotate-[11deg] object-contain"
                aria-hidden="true"
              />
            </button>
          </div>

          <LoyaltyBanner onClick={() => toast('МТбаллы')} />

          <div className="flex flex-col gap-4 px-4 pb-6" data-node-id="313:36341">
            <div className="scrollbar-hide flex w-full gap-3 overflow-x-auto">
              <BelkartWidget />
              <KaktusWidget />
            </div>
            <HalvaWidget />
          </div>
        </div>
      </main>

      <BankTabBar onOpenMarket={onOpenMarket} onToast={toast} />

      {toastMessage ? (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none absolute bottom-[110px] left-1/2 z-40 max-w-[85%] -translate-x-1/2 rounded-xl bg-text-primary px-3 py-2 text-center text-[12px] font-medium text-white shadow-lg"
        >
          {toastMessage}
        </div>
      ) : null}
    </div>
  )
}

function BankTop({ onToast }: { onToast: (message: string) => void }) {
  return (
    <div className="relative isolate flex flex-col" data-node-id="313:36321" data-name="Top">
      <div
        className="relative z-[2] flex flex-col items-center gap-6 rounded-b-[40px] bg-gradient-to-b from-[#0a54c2] from-[13%] to-[#5696f6] px-8 pt-3 pb-8"
        data-node-id="313:36322"
      >
        <div className="flex h-10 w-full items-center gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-1">
            <div className="relative h-10 w-12 shrink-0">
              <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-xl bg-[rgba(249,249,250,0.14)]">
                <img alt="" src={assets.bankUser} width={24} height={24} className="size-6" />
              </div>
              <span className="absolute top-0 right-0 rounded-full bg-fill-accent-red px-1 text-[12px] font-medium leading-4 text-white">
                6
              </span>
            </div>
            <div className="flex min-w-0 flex-col gap-0.5">
              <p className="truncate font-montserrat text-[17px] font-bold leading-[22px] text-white">
                Александр
              </p>
              <span className="w-fit rounded bg-[rgba(249,249,250,0.14)] px-2 py-0.5 text-[10px] font-medium leading-3 text-white">
                Default state
              </span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <div className="flex items-center gap-1 rounded-lg bg-[rgba(249,249,250,0.14)] px-2 py-1">
              <span className="text-[12px] font-bold leading-[18px] text-white">99.99</span>
              <img alt="" src={assets.bankCoins} width={20} height={20} className="size-5" />
            </div>
            <button
              type="button"
              onClick={() => onToast('Профиль')}
              className="flex size-7 items-center justify-center rounded-lg bg-[rgba(249,249,250,0.14)] p-1"
              aria-label="Ещё"
            >
              <img alt="" src={assets.bankIconK} width={20} height={20} className="size-5" />
            </button>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <div className="flex h-6 items-center gap-1">
            <div className="flex items-center gap-1">
              <span className="rounded-lg bg-[rgba(249,249,250,0.14)] px-2 py-1 text-[12px] font-medium leading-4 text-white">
                Kaktus
              </span>
              <span className="rounded-lg bg-[rgba(249,249,250,0.14)] px-2 py-1 text-[12px] font-medium leading-4 text-white">
                4*5783
              </span>
            </div>
            <img alt="" src={assets.bankInfo} width={16} height={16} className="size-4" />
          </div>
          <div className="flex h-[38px] w-full items-center justify-between">
            <div className="flex items-center gap-3">
              <p className="text-[30px] font-semibold leading-9 text-white whitespace-nowrap">
                99 999.99
              </p>
              <p className="text-[30px] font-semibold leading-9 text-white">BYN</p>
            </div>
            <button
              type="button"
              onClick={() => onToast('Скрыть баланс')}
              className="flex size-[38px] items-center justify-center"
              aria-label="Скрыть баланс"
            >
              <img alt="" src={assets.bankHide} width={21} height={21} className="size-[21px]" />
            </button>
          </div>
        </div>

        <div className="flex h-[68px] w-full items-start gap-2">
          {(
            [
              { label: 'Пополнить', icon: assets.bankTopup },
              { label: 'Перевести', icon: assets.bankTransfer },
              { label: 'Оплатить', icon: assets.bankPay },
              { label: 'Баллы', icon: assets.bankGift },
            ] as const
          ).map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => onToast(action.label)}
              className="flex min-w-0 flex-1 flex-col items-center gap-1"
            >
              <span className="flex h-12 w-full items-center justify-center rounded-2xl bg-white p-3">
                <img alt="" src={action.icon} width={24} height={24} className="size-6" />
              </span>
              <span className="w-[66px] text-center text-[12px] font-medium leading-4 text-white">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function HistoryRow() {
  return (
    <div
      className="flex items-center gap-2 overflow-hidden pl-4"
      data-node-id="313:36329"
      data-name="History"
    >
      <div className="relative size-14 shrink-0 rounded-2xl bg-white">
        <img
          alt=""
          src={assets.bankHistoryClock}
          width={24}
          height={24}
          className="absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="scrollbar-hide flex min-w-0 flex-1 gap-1 overflow-x-auto rounded-l-[20px] pr-4">
        <div className="flex w-[min(343px,100%)] min-w-[280px] shrink-0 items-center gap-2 rounded-2xl bg-white p-2">
          <div className="relative shrink-0">
            <img alt="" src={assets.bankHistoryShape} width={40} height={40} className="size-10" />
            <img
              alt=""
              src={assets.bankHistoryBadge}
              width={12}
              height={12}
              className="absolute right-[-6px] bottom-[-2px] size-3"
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1 overflow-hidden">
            <p className="truncate text-[12px] font-medium leading-4 text-text-primary">
              SHOP “SEM PYAT...
            </p>
            <p className="text-[12px] leading-4 text-text-secondary">Simple</p>
          </div>
          <p className="shrink-0 text-[14px] font-medium leading-[18px] text-text-primary whitespace-nowrap">
            999 999.99
          </p>
        </div>
      </div>
    </div>
  )
}

function LoyaltyBanner({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="mx-4 flex flex-col gap-3 rounded-[24px] bg-white p-4"
      data-node-id="313:36339"
    >
      <div className="flex items-start gap-3">
        <img alt="" src={assets.bankLoyalty} width={36} height={36} className="size-9 shrink-0" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="text-[16px] font-medium leading-5 text-text-primary">
            Категории для расчета МТбаллов
          </p>
          <p className="text-[13px] leading-4 text-text-secondary">
            Доступное количество категорий – 3
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onClick}
        className="flex h-11 w-full items-center justify-center rounded-xl bg-fill-brand text-[16px] font-medium leading-5 text-white"
      >
        Получить МТбаллы
      </button>
    </div>
  )
}

/** Belkart product card — Figma 313:36343 */
function BelkartWidget() {
  return (
    <div
      className="flex h-[156px] w-full min-w-full shrink-0 flex-col justify-between overflow-hidden rounded-[24px] bg-white p-4"
      data-node-id="313:36343"
      data-name="item card"
    >
      <div className="flex items-center gap-4">
        <div className="relative h-9 w-14 shrink-0 overflow-hidden rounded-lg">
          <img
            alt=""
            src={assets.bankBelkartPhoto}
            className="absolute inset-0 size-full rounded-[3px] object-cover"
          />
          <img alt="" src={assets.bankBelkartBase} className="absolute inset-0 size-full" />
          <img alt="" src={assets.bankBelkartMask} className="absolute inset-0 size-full" />
          <img
            alt=""
            src={assets.bankBelkartType}
            className="pointer-events-none absolute top-[-13%] left-[-17%] h-[128%] w-[133%] max-w-none"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col items-start">
          <p className="truncate text-[12px] font-bold leading-4 tracking-[0.06px] text-[#b5b9bf] uppercase">
            Белкарт
          </p>
          <div className="flex items-center gap-1">
            <div className="flex items-start gap-1 text-[17px] font-bold leading-[22px] text-text-primary whitespace-nowrap">
              <span>9 999.99</span>
              <span>BYN</span>
            </div>
            <img alt="" src={assets.bankBelkartEye} width={24} height={24} className="size-6" />
          </div>
        </div>
      </div>

      <div className="flex h-6 items-center gap-1">
        <span className="flex h-6 items-center rounded-lg bg-[#e0edff] px-2 text-[12px] font-medium leading-4 text-fill-brand">
          4*5783
        </span>
        <span className="flex h-6 items-end rounded-lg bg-[#e0edff] px-2 py-1">
          <img alt="" src={assets.bankBelkartLogo} width={72} height={16} className="h-4 w-[72px]" />
        </span>
        <img alt="" src={assets.bankBelkartPhone} width={16} height={16} className="size-4" />
      </div>
    </div>
  )
}

function KaktusWidget() {
  return (
    <div className="relative w-full min-w-full shrink-0 overflow-hidden rounded-[24px] bg-white p-4">
      <div className="flex items-start gap-3">
        <img
          alt=""
          src={assets.bankCardKaktus}
          width={72}
          height={44}
          className="h-11 w-[72px] shrink-0 rounded-lg object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-medium uppercase leading-4 tracking-[0.5px] text-text-secondary">
            Kaktus
          </p>
          <div className="mt-1 flex items-center gap-2">
            <p className="text-[20px] font-semibold leading-[26px] text-text-primary">
              9 999.99 BYN
            </p>
            <img alt="" src={assets.bankCardEye} width={20} height={20} className="size-5" />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-fill-secondary px-2 py-1 text-[12px] font-medium text-fill-brand">
              4*5783
            </span>
            <img
              alt=""
              src={assets.bankCardPhone}
              width={20}
              height={20}
              className="ml-auto size-5"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/** Halva product card — Figma 313:36346 */
function HalvaWidget() {
  return (
    <div
      className="relative isolate flex w-full flex-col items-center"
      data-node-id="313:36346"
      data-name="item card"
    >
      <div className="relative z-[2] mb-[-56px] flex w-full flex-col gap-4 overflow-hidden rounded-[24px] bg-white p-4">
        <div className="flex items-start gap-4">
          <div className="relative h-9 w-14 shrink-0 overflow-hidden rounded-lg">
            <img
              alt=""
              src={assets.bankHalvaPhoto}
              className="absolute inset-0 size-full rounded-[3px] object-cover"
            />
            <img alt="" src={assets.bankHalvaBase} className="absolute inset-0 size-full" width={56} height={36} />
            <img alt="" src={assets.bankHalvaMask} className="absolute inset-0 size-full" />
            <div className="absolute top-1/2 left-1/2 h-9 w-14 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-md">
              <img
                alt=""
                src={assets.bankHalvaType}
                className="absolute top-[-28.57%] left-0 h-[157.14%] w-full max-w-none"
              />
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <p className="truncate text-[12px] font-bold leading-4 tracking-[0.06px] text-[#b5b9bf] uppercase">
              Halvamax
            </p>
            <div className="flex flex-col items-start">
              <p className="text-[13px] leading-4 whitespace-nowrap text-text-primary">
                Доступная рассрочка
              </p>
              <div className="flex items-center gap-1">
                <div className="flex items-start gap-1 text-[17px] font-bold leading-[22px] text-text-primary whitespace-nowrap">
                  <span>9 999.99</span>
                  <span>BYN</span>
                </div>
                <img alt="" src={assets.bankHalvaEye} width={24} height={24} className="size-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-1">
          <div className="flex h-6 items-center rounded-lg bg-[#f5fbf2] px-2">
            <p className="text-[12px] font-medium leading-4 whitespace-nowrap text-[#328e02]">
              99 999.99 BYN собственные средства
            </p>
          </div>
          <div className="flex h-6 items-center gap-1">
            <span className="flex h-6 items-center rounded-lg bg-[#e0edff] px-2 text-[12px] font-medium leading-4 text-fill-brand">
              4*5783
            </span>
            <span className="flex h-6 items-center rounded-lg bg-[#e0edff] px-2">
              <img alt="" src={assets.bankHalvaVisa} width={30} height={10} className="h-2.5 w-[30px]" />
            </span>
            <img alt="" src={assets.bankHalvaPhone} width={16} height={16} className="size-4" />
          </div>
        </div>
      </div>

      <div className="relative z-[1] flex h-[100px] w-full shrink-0 items-end justify-center rounded-b-[24px] bg-fill-brand px-4 pt-2 pb-4">
        <div className="flex w-full items-center gap-2">
          <img alt="" src={assets.bankHalvaInfo} width={16} height={16} className="size-4 brightness-0 invert" />
          <div className="flex flex-wrap gap-1 text-[13px] font-medium leading-4 text-white">
            <span>Текущий платеж:</span>
            <span>999.99 BYN</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function BankTabBar({
  onOpenMarket,
  onToast,
}: {
  onOpenMarket: () => void
  onToast: (message: string) => void
}) {
  return (
    <nav
      className="absolute inset-x-0 bottom-0 z-30 flex flex-col overflow-hidden rounded-t-[40px] border-[0.5px] border-[rgba(152,152,152,0.5)] bg-white/95 pt-3 backdrop-blur-[6px]"
      data-node-id="447:112352"
      data-name="Tab Bar"
      aria-label="Банк"
    >
      <div className="flex h-[50px] items-center px-1.5" data-node-id="447:112353">
        <TabItem
          active
          label="Главная"
          icon={<img alt="" src={assets.bankTabMoby} width={26} height={21} className="h-[21px] w-[26px] object-contain" />}
        />
        <TabItem
          label="Продукты"
          icon={<img alt="" src={assets.bankTabProducts} width={20} height={21} className="h-[21px] w-5" />}
          onClick={() => onToast('Продукты')}
        />
        <button
          type="button"
          onClick={onOpenMarket}
          className="relative flex h-[49px] min-w-0 flex-1 flex-col items-center justify-center"
          data-node-id="447:112438"
          data-name="TabBar"
          aria-label="Маркет"
        >
          <img alt="" src={assets.bankTabStore} width={24} height={24} className="size-6" />
          <span className="mt-0.5 text-[10px] font-medium tracking-[-0.24px] text-text-primary">
            Маркет
          </span>
        </button>
        <TabItem
          label="Чат"
          icon={<img alt="" src={assets.bankTabChat} width={24} height={24} className="size-6" />}
          onClick={() => onToast('Чат')}
        />
        <TabItem
          label="Ещё"
          icon={<img alt="" src={assets.bankTabMore} width={24} height={24} className="size-6" />}
          onClick={() => onToast('Ещё')}
        />
      </div>
    </nav>
  )
}

function TabItem({
  label,
  icon,
  active = false,
  onClick,
}: {
  label: string
  icon: ReactNode
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex h-[49px] min-w-0 flex-1 flex-col items-center justify-center"
      aria-current={active ? 'page' : undefined}
    >
      {icon}
      <span
        className={`mt-0.5 text-[10px] font-medium tracking-[-0.24px] ${
          active ? 'text-fill-brand' : 'text-text-primary'
        }`}
      >
        {label}
      </span>
    </button>
  )
}
