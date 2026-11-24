import { useEffect, useState } from 'react'
import { assets } from '../assets'
import { BalanceActionSection } from './BalanceActionSection'
import { BalanceIssueBanner } from './BalanceIssueBanner'
import { BalanceIssueButton } from './BalanceIssueButton'
import { BalanceMarketplaceCard } from './BalanceMarketplaceCard'
import { BalanceOperationsCard } from './BalanceOperationsCard'
import { BalancePremiumBanner } from './BalancePremiumBanner'
import { BalancePremiumSheet } from './BalancePremiumSheet'
import { BalanceRequisitesSection } from './BalanceRequisitesSection'
import { BalanceStatusChip } from './BalanceStatusChip'
import { BalanceTransferCard } from './BalanceTransferCard'

type Props = {
  isLoggedIn: boolean
  userName?: string
  onOpenProfile?: () => void
  onToast?: (message: string) => void
  toast?: string | null
  /** When true (Balance tab visible), always restore collapsed Figma 667:8794 */
  active?: boolean
  /** Synced from App after card application submit — advances unissued → virtual */
  cardIssued?: boolean
  /** Issue CTAs open application page 716:12621 instead of immediate issue */
  onRequestIssue?: () => void
}

/** Card issue flow — Figma 698:29960 → 687:6573 → 692:26673 / 692:26841 */
type CardPhase = 'unissued' | 'virtual' | 'activation' | 'premium'

const ACTIONS = [
  { id: 'topup', label: 'Пополнить', icon: assets.balanceActionTopup, nodeId: '679:9847' },
  { id: 'transfer', label: 'Перевести', icon: assets.balanceActionTransfer, nodeId: '679:9850' },
  { id: 'pay', label: 'Оплатить', icon: assets.balanceActionPay, nodeId: '679:9854' },
] as const

/** Issued sheet — Figma 716:8578 Оплатить (y=554) */
const PAY_TILES = [
  { id: 'mobile', label: 'Мобильная связь', iconSrc: assets.balanceTileMobile, nodeId: '716:8583' },
  { id: 'erip', label: 'ЕРИП', iconSrc: assets.balanceTileErip, nodeId: '716:8590' },
  { id: 'loan', label: 'Погашение кредита', iconSrc: assets.balanceTileLoan, nodeId: '716:8594' },
  { id: 'arbitrary', label: 'Произвольный платеж', iconSrc: assets.balanceTileTopup, nodeId: '716:8598' },
  { id: 'qr', label: 'QR оплата', iconSrc: assets.balanceTileQr, nodeId: '716:8602' },
] as const

/** Issued sheet — Figma 716:8577 Перевести (y=772) */
const TRANSFER_TILES = [
  { id: 'card', label: 'По номеру карты и счета', iconSrc: assets.balanceTileCard, nodeId: '715:8335' },
  { id: 'phone', label: 'По номеру телефона', iconSrc: assets.balanceTilePhone, nodeId: '715:8342' },
  { id: 'sbp', label: 'Мгновенный платеж', iconSrc: assets.balanceTileSbp, nodeId: '715:8346' },
] as const

/** Issued sheet — Figma 716:8793 Шаблоны (y=990) */
const TEMPLATE_TILES = [
  { id: 'add', label: 'Добавить', iconSrc: assets.balanceTileAdd, nodeId: '716:8798' },
] as const

/** Market balance / card — Figma 667:8794 → expand 676:9544 + issue states */
export function BalanceScreen({
  isLoggedIn,
  userName = 'Александр',
  onOpenProfile,
  onToast,
  toast: toastMessage,
  active = false,
  cardIssued = false,
  onRequestIssue,
}: Props) {
  const [sheetExpanded, setSheetExpanded] = useState(false)
  const [phase, setPhase] = useState<CardPhase>(cardIssued ? 'virtual' : 'unissued')
  const [premiumStatusVisible, setPremiumStatusVisible] = useState(true)
  const [premiumSheetOpen, setPremiumSheetOpen] = useState(false)
  const toast = (message: string) => onToast?.(message)
  const displayName = isLoggedIn ? userName : 'Войдите в профиль'

  const cardTapEnabled = phase !== 'unissued'
  const showBonus = phase === 'activation' || phase === 'premium'
  const bonusValue = phase === 'activation' ? '0' : '25'

  // Every visit to Balance tab → collapsed (card overlapped), Figma 679:9843
  useEffect(() => {
    if (active) setSheetExpanded(false)
  }, [active])

  // After CardApplicationScreen submit — App sets cardIssued
  useEffect(() => {
    if (cardIssued && phase === 'unissued') {
      setPhase('virtual')
      setSheetExpanded(false)
    }
  }, [cardIssued, phase])

  const requestIssue = () => onRequestIssue?.()

  const goActivation = () => {
    setPhase('activation')
    setSheetExpanded(false)
  }

  const openPremiumSheet = () => setPremiumSheetOpen(true)

  const connectPremium = () => {
    setPremiumSheetOpen(false)
    setPhase('premium')
    setPremiumStatusVisible(true)
    setSheetExpanded(false)
  }

  const onActionTile = (_id: string, label: string) => toast(label)

  const issuedActionSections = (
    <>
      <BalanceActionSection
        title="Оплатить"
        tiles={PAY_TILES}
        nodeId="716:8578"
        onTileClick={onActionTile}
      />
      <BalanceActionSection
        title="Перевести"
        tiles={TRANSFER_TILES}
        nodeId="716:8577"
        onTileClick={onActionTile}
      />
      <BalanceActionSection
        title="Шаблоны"
        tiles={TEMPLATE_TILES}
        nodeId="716:8793"
        onTileClick={onActionTile}
      />
      <BalanceRequisitesSection onCardClick={onActionTile} />
    </>
  )

  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden bg-bg-base"
      data-node-id={
        phase === 'unissued'
          ? '698:29960'
          : phase === 'virtual'
            ? '687:6573'
            : phase === 'activation'
              ? '692:26673'
              : '692:26841'
      }
      data-name="Каталог — Balance"
      data-phase={phase}
    >
      <main className="flex min-h-0 flex-1 flex-col overflow-hidden pb-[96px]">
        {/* Top — fixed; page scrolls below — Figma 667:9037 */}
        <header
          className="relative z-20 flex shrink-0 flex-col items-center rounded-bl-[36px] rounded-br-[36px] bg-surface-secondary px-8 pt-3 pb-3"
          data-node-id="667:9037"
          data-name="Top"
        >
          <div
            className="flex w-full items-center gap-3 overflow-hidden"
            data-node-id="672:9198"
          >
            <div className="flex min-w-0 flex-1 items-center overflow-hidden" data-node-id="672:9199">
              {isLoggedIn ? (
                <p className="truncate font-montserrat text-[20px] font-bold leading-[26px] tracking-[-0.4px] text-text-primary">
                  {displayName}
                </p>
              ) : (
                <button
                  type="button"
                  onClick={onOpenProfile}
                  className="truncate text-left font-montserrat text-[20px] font-bold leading-[26px] tracking-[-0.4px] text-text-primary"
                >
                  {displayName}
                </button>
              )}
            </div>

            {showBonus ? (
              <div
                className="flex shrink-0 items-center gap-0.5 rounded-lg bg-[#0d0e0f] py-1 pr-1.5 pl-1"
                data-node-id="676:9737"
                data-name="bonus"
                aria-label={`Бонусы ${bonusValue}`}
              >
                <img
                  alt=""
                  src={assets.balanceBonusCrown}
                  width={14}
                  height={14}
                  className="size-[14px] shrink-0"
                />
                <span className="text-[11px] font-bold leading-[14px] tracking-[0.22px] text-white uppercase">
                  {bonusValue}
                </span>
              </div>
            ) : null}

            <button
              type="button"
              onClick={onOpenProfile}
              className="relative size-8 shrink-0 overflow-hidden rounded-full"
              data-node-id="672:9228"
              data-name="Avatar"
              aria-label="Профиль"
            >
              <img
                alt=""
                src={assets.balanceAvatar}
                width={32}
                height={32}
                className="size-8"
              />
            </button>
          </div>
        </header>

        {/* Full page scroll under fixed header — card + sheet content */}
        <div
          className="relative min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain scrollbar-hide"
          data-node-id="679:9843"
          data-name="Card"
        >
          {/* Card above sheet — Figma 687:6573 overlap: info y=131 vs card bottom ~215 */}
          <div
            className="relative z-10 flex flex-col items-center px-0 pt-6"
            data-node-id="679:9844"
            data-name="card"
          >
            <div
              className="relative w-full max-w-full px-8"
              data-node-id="679:9845"
              data-name="Card"
            >
              {cardTapEnabled ? (
                <button
                  type="button"
                  onClick={() => setSheetExpanded((open) => !open)}
                  aria-expanded={sheetExpanded}
                  aria-label={
                    sheetExpanded
                      ? 'Скрыть действия карты'
                      : 'Показать карту и действия'
                  }
                  className="relative w-full cursor-pointer"
                >
                  <BalanceMarketplaceCard balance="00.00" />
                </button>
              ) : (
                <div className="relative w-full">
                  <BalanceMarketplaceCard />
                  <BalanceIssueButton
                    onClick={requestIssue}
                    className="absolute top-[14px] right-[14px] z-[1]"
                  />
                </div>
              )}
            </div>

            <div
              className={`grid w-full transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                sheetExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
              data-node-id="679:9846"
              data-name="Tabs"
            >
              <div className="min-h-0 overflow-hidden">
                <div className="flex w-full items-center justify-center gap-6 px-8 pt-6 pb-2">
                  {ACTIONS.map((action) => (
                    <button
                      key={action.id}
                      type="button"
                      onClick={() => toast(action.label)}
                      tabIndex={sheetExpanded ? 0 : -1}
                      className="flex flex-col items-center justify-center gap-1 rounded-xl bg-[rgba(249,249,250,0.92)] p-2"
                      data-node-id={action.nodeId}
                      data-name="tab"
                    >
                      <span className="relative flex size-8 items-center justify-center">
                        <img
                          alt=""
                          src={action.icon}
                          width={action.id === 'pay' ? 16 : 32}
                          height={action.id === 'pay' ? 20 : 32}
                          className={
                            action.id === 'pay' ? 'h-5 w-4 object-contain' : 'size-8 max-w-none'
                          }
                        />
                      </span>
                      <span className="whitespace-nowrap text-[12px] leading-4 text-text-primary">
                        {action.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className={`relative z-0 flex flex-col items-center gap-6 rounded-tl-[36px] rounded-tr-[36px] bg-surface-secondary px-6 pb-8 shadow-[0px_-3px_14px_rgba(0,0,0,0.07)] transition-[margin,padding] duration-300 ease-out motion-reduce:transition-none ${
              sheetExpanded ? '-mt-6 pt-8' : '-mt-[84px] pt-[100px]'
            }`}
            data-node-id="679:9859"
            data-name="info"
          >
            {phase === 'unissued' ? (
              <>
                <BalanceIssueBanner onClick={requestIssue} />
                <BalanceOperationsCard amount="00,00" nodeId="698:30212" />
                <BalanceTransferCard nodeId="698:30001" />
              </>
            ) : null}

            {phase === 'virtual' ? (
              <>
                <BalancePremiumBanner onClick={openPremiumSheet} nodeId="698:30143" />
                <BalanceStatusChip
                  label="Выпускаем карту — доставим 16 декабря к 22:00"
                  iconSrc={assets.balanceCalendarIcon}
                  onClick={goActivation}
                  nodeId="687:26579"
                  tone="delivery"
                />
                <BalanceOperationsCard amount="57,00" nodeId="698:30223" />
                <BalanceTransferCard showRecipients nodeId="692:27202" />
                {issuedActionSections}
              </>
            ) : null}

            {phase === 'activation' ? (
              <>
                <BalancePremiumBanner onClick={openPremiumSheet} nodeId="692:26703" />
                <BalanceStatusChip
                  label="Выберите категории на декабрь"
                  iconSrc={assets.balanceStatusHeart}
                  nodeId="692:27065"
                  tone="categories"
                  onClick={() => toast('Категории')}
                />
                <BalanceStatusChip
                  label="Активируйте карту — одна минута и можно платить"
                  iconSrc={assets.balanceStatusWallet}
                  nodeId="692:26710"
                  tone="activation"
                  onClick={() => toast('Активация карты')}
                />
                <BalanceOperationsCard amount="57,00" nodeId="698:30245" />
                <BalanceTransferCard showRecipients nodeId="692:27203" />
                {issuedActionSections}
              </>
            ) : null}

            {phase === 'premium' ? (
              <>
                {premiumStatusVisible ? (
                  <BalanceStatusChip
                    label="Вы подключили максимальный уровень"
                    iconSrc={assets.balanceStatusParty}
                    nodeId="692:27004"
                    tone="premium"
                    onDismiss={() => setPremiumStatusVisible(false)}
                  />
                ) : null}
                <BalanceStatusChip
                  label="Выберите категории на декабрь"
                  iconSrc={assets.balanceStatusHeart}
                  nodeId="692:26878"
                  tone="categories"
                  onClick={() => toast('Категории')}
                />
                <BalanceOperationsCard amount="57,00" nodeId="698:30256" />
                <BalanceTransferCard showRecipients nodeId="692:27204" />
                {issuedActionSections}
              </>
            ) : null}
          </div>
        </div>
      </main>

      {toastMessage ? (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none absolute bottom-[110px] left-1/2 z-40 max-w-[85%] -translate-x-1/2 rounded-xl bg-text-primary px-3 py-2 text-center text-[12px] font-medium text-white shadow-lg"
        >
          {toastMessage}
        </div>
      ) : null}

      <BalancePremiumSheet
        open={premiumSheetOpen}
        onClose={() => setPremiumSheetOpen(false)}
        onConnect={connectPremium}
        onRulesClick={() => toast('Правила Premium подписки')}
      />
    </div>
  )
}
