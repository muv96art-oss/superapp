import type { ReactNode } from 'react'
import { assets } from '../assets'

type Props = {
  className?: string
  onOpenCatalog?: () => void
}

const COMPANY = ['Поддержка', 'О нас', 'Поставщикам', 'Вакансии']
const LEGAL = ['Сертификаты', 'Условия кредитования']
const BUYERS = [
  'Каталог',
  'Доставка и оплата',
  'Гарантии и возврат',
  'Пункт выдачи',
  'Сервисные центры',
  'Правила и условия',
  'Акции',
  'Подборки',
]
const BASELINE = [
  'Публичная оферта',
  'Политика обработки персональных данных',
  'Пользовательское соглашение',
  'Политика cookie',
]

export function SiteFooter({ className = '', onOpenCatalog }: Props) {
  return (
    <footer className={`bg-bg-base ${className}`} data-node-id="532:40096" data-name="Футер — 375">
      <div className="flex flex-col gap-4 px-4 pt-6 pb-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-5">
            <LinkGroup title="Компания" items={COMPANY} />
            <LinkGroup title="Юридическая информация" items={LEGAL} />
            <LinkGroup title="Покупателям" items={BUYERS} onOpenCatalog={onOpenCatalog} />
          </div>

          <div className="flex w-full flex-col gap-5 rounded-2xl bg-bg-base p-3 shadow-[0px_10px_3px_0px_rgba(214,214,214,0),0px_7px_3px_0px_rgba(214,214,214,0.01),0px_4px_2px_0px_rgba(214,214,214,0.05),0px_2px_2px_0px_rgba(214,214,214,0.09),0px_0px_1px_0px_rgba(214,214,214,0.1)]">
            <div className="flex flex-col gap-[18px]">
              <div className="flex flex-col gap-2">
                <p className="text-[14px] leading-5 font-normal text-text-secondary">На связи в рабочее время</p>
                <p className="font-montserrat text-[24px] leading-[30px] font-bold tracking-[-0.24px] text-text-primary">
                  Остались вопросы? Напишите нам
                </p>
              </div>
              <button
                type="button"
                className="flex h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-fill-brand px-5 text-[16px] leading-6 font-medium text-[#fffaf2]"
              >
                <img alt="" width={24} height={24} src={assets.footerMail} />
                Написать нам
              </button>
            </div>
            <div className="h-px w-full bg-[#cdd0d5]" />
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 text-[14px] leading-5 font-medium text-text-secondary">
                  <p>пн–чт: 08:30–17:30</p>
                  <p>пт: 08:30–16:15</p>
                  <p>сб–вс: выходные</p>
                </div>
                <div className="flex flex-col gap-2 text-[16px] leading-6 font-semibold text-text-primary">
                  <a href="tel:+375445073770">+375 44 507-37-70</a>
                  <a href="tel:+375298073770">+375 29 807-37-70</a>
                </div>
              </div>
              <div className="flex gap-4">
                <SocialButton label="Instagram" src={assets.footerInstagram} />
                <SocialButton label="Telegram" src={assets.footerTelegram} />
                <SocialButton label="Threads" src={assets.footerThreads} />
                <SocialButton label="TikTok" src={assets.footerTiktok} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-5 border-y border-[#cdd0d5] py-3">
          <div className="flex flex-col gap-2">
            <p className="text-[14px] leading-5 font-normal text-[#28172f]">Принимаем к оплате:</p>
            <div className="flex flex-wrap gap-x-2 gap-y-1.5">
              <PayMark width={40} label="Visa">
                <img alt="" width={24} height={24} src={assets.footerVisa} />
              </PayMark>
              <PayMark width={40} label="Mastercard">
                <img alt="" width={24} height={24} src={assets.footerMastercard} />
              </PayMark>
              <PayMark width={40} label="Карта">
                <img alt="" width={24} height={24} src={assets.footerCard} />
              </PayMark>
              <PayMark width={40} label="Apple Pay">
                <img alt="" width={24} height={24} src={assets.footerApplePay} />
              </PayMark>
              <PayMark width={58} label="bePaid">
                <img alt="" width={42} height={20} className="object-contain" src={assets.footerPayFive} />
              </PayMark>
              <PayMark width={73} label="Халва">
                <img alt="" width={57} height={20} className="object-contain" src={assets.footerPaySix} />
              </PayMark>
              <PayMark width={76} label="Карта покупок">
                <img alt="" width={60} height={16} className="object-contain" src={assets.footerPayBepaid} />
              </PayMark>
              <PayMark width={78} label="ЕРИП">
                <img alt="" width={62} height={13} className="object-contain" src={assets.footerPayHalva} />
              </PayMark>
            </div>
          </div>
          <button
            type="button"
            className="flex h-8 items-center justify-center gap-1 rounded-xl border border-fill-brand bg-bg-base px-3 text-[14px] leading-5 font-medium text-text-primary"
          >
            <img alt="" width={16} height={16} src={assets.footerCookie} />
            Настройка Cookie
          </button>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl bg-bg-base p-3 text-[14px] leading-5">
          <div className="flex flex-col gap-1.5">
            <p className="font-bold text-[#28172f]">ООО «Ретейл Плейс»</p>
            <p className="font-normal text-text-secondary">УНП 193710885</p>
            <p className="font-normal text-text-secondary">Торговый реестр № 577437 от 28.03.2024</p>
          </div>
          <div className="flex flex-col gap-1.5 font-normal text-text-secondary">
            <p>220083, г. Минск, пр-т Дзержинского, 104А, пом. 905</p>
            <p>Регистрация: Мингорисполком, 19.09.2023</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="font-normal text-text-secondary">
              Контакт местного исполнительного органа для рассмотрения обращений покупателей:
            </p>
            <a href="tel:+375172583082" className="font-bold text-[#28172f]">
              +375 17 258-30-82
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-surface-secondary px-6 py-5">
        <p className="text-[13px] leading-[18px] font-semibold text-fill-brand">© name, 2026</p>
        <div className="flex flex-wrap gap-x-4 gap-y-3">
          {BASELINE.map((label) => (
            <button key={label} type="button" className="text-[13px] leading-4 font-medium text-text-secondary">
              {label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  )
}

function LinkGroup({
  title,
  items,
  onOpenCatalog,
}: {
  title: string
  items: string[]
  onOpenCatalog?: () => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[16px] leading-6 font-semibold text-text-primary">{title}</p>
      <div className="flex flex-col gap-2">
        {items.map((label) => (
          <button
            key={label}
            type="button"
            onClick={label === 'Каталог' ? onOpenCatalog : undefined}
            className="text-left text-[14px] leading-5 font-medium text-text-secondary"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

function SocialButton({ label, src }: { label: string; src: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex size-[52px] items-center justify-center rounded-2xl bg-surface-secondary"
    >
      <img alt="" width={24} height={24} src={src} />
    </button>
  )
}

function PayMark({ width, label, children }: { width: number; label: string; children: ReactNode }) {
  return (
    <span
      aria-label={label}
      className="flex h-8 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-[#e7e0e9] bg-white px-2 py-1.5"
      style={{ width }}
    >
      {children}
    </span>
  )
}
