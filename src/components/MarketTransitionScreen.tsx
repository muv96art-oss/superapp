import { assets } from '../assets'

type Props = {
  onBack: () => void
  onContinue: () => void
  onSecurityInfo?: () => void
}

/**
 * Partner marketplace disclaimer — Figma 645:6802
 * CTA «Понятно, перейти» 645:6841 → existing auth flow.
 */
export function MarketTransitionScreen({ onBack, onContinue, onSecurityInfo }: Props) {
  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden bg-[#1a1c1e]"
      data-node-id="645:6802"
      data-name="Moby · Переход в WhiteBird"
    >

      <div
        className="relative z-10 flex h-14 shrink-0 items-center px-4"
        data-node-id="645:6804"
        data-name="Навигация"
      >
        <button
          type="button"
          onClick={onBack}
          aria-label="Назад"
          className="flex size-11 items-center justify-center"
          data-node-id="645:6836"
          data-name="Назад"
        >
          <img alt="" width={24} height={24} src={assets.marketBack} className="size-6" />
        </button>
      </div>

      <div
        className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 overflow-hidden px-4 pt-4"
        data-node-id="645:6805"
        data-name="Основной блок"
      >
        <div
          className="relative h-[180px] w-[150px] shrink-0 overflow-hidden"
          data-node-id="645:6814"
          data-name="Щит Moby · исходная иллюстрация"
        >
          <img
            alt=""
            src={assets.marketMobyShield}
            width={150}
            height={180}
            className="pointer-events-none absolute inset-0 size-full max-w-none object-contain"
          />
        </div>

        <h1
          className="w-full text-center font-montserrat text-[26px] font-semibold leading-8 text-white"
          data-node-id="645:6839"
        >
          Переход в партнерский
          <br />
          маркетплейс
        </h1>

        <p
          className="w-full text-center text-[16px] font-normal leading-5 text-[#b5b9bf]"
          data-node-id="645:6840"
        >
          Вы переходите в сервис Маркет для совершения операций. Все действия осуществляются между
          вами и Маркет. МТБанк не несет ответственности за исполнение этих операций или за условия,
          предоставляемые сервисом.
        </p>
      </div>

      <div
        className="flex h-[160px] shrink-0 flex-col items-center gap-4 overflow-hidden px-4 pt-4"
        data-node-id="645:6806"
        data-name="Действия"
      >
        <button
          type="button"
          onClick={onContinue}
          className="flex h-[52px] w-full items-center justify-center rounded-xl bg-fill-brand text-[16px] font-medium leading-5 text-white"
          data-node-id="645:6841"
          data-name="Понятно, перейти"
        >
          Понятно, перейти
        </button>

        <button
          type="button"
          onClick={onSecurityInfo}
          className="flex h-[52px] w-full items-center justify-center rounded-xl text-[14px] font-medium leading-[18px] text-[#76acfe]"
          data-node-id="645:6843"
          data-name="Подробнее о безопасности"
        >
          Подробнее о безопасности
        </button>
      </div>
    </div>
  )
}
