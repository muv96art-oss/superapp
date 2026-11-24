import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { assets } from '../assets'
import { LogoBank } from './LogoBank'

type Timing = 'receipt' | 'now' | 'parts'
type ReceiptMethod = 'cash' | 'card'

export type PaymentSummary =
  | { kind: 'order' }
  | { kind: 'installment'; monthly: number; total: number }

const FIRST_CARD = '**** 9999'

export function PaymentMethods({
  amount,
  onSummary,
}: {
  amount: number
  onSummary?: (summary: PaymentSummary) => void
}) {
  const [timing, setTiming] = useState<Timing>('receipt')
  const [receiptMethod, setReceiptMethod] = useState<ReceiptMethod>('cash')
  const [cards, setCards] = useState<string[]>([])
  const [selectedCard, setSelectedCard] = useState(0)
  const [installmentMonths, setInstallmentMonths] = useState(1)
  const showInstallments = timing === 'parts'
  const [sheetOpen, setSheetOpen] = useState(false)

  useEffect(() => {
    if (!onSummary) return
    if (timing !== 'parts') {
      onSummary({ kind: 'order' })
      return
    }
    onSummary({
      kind: 'installment',
      monthly: installmentMonths > 0 ? amount / installmentMonths : 0,
      total: amount,
    })
  }, [amount, installmentMonths, onSummary, timing])

  function addCard() {
    if (cards.length === 0) {
      setCards([FIRST_CARD])
      setSelectedCard(0)
      return
    }
    setSheetOpen(true)
  }

  function confirmCard(number: string) {
    const digits = number.replace(/\D/g, '')
    const last4 = digits.slice(-4)
    if (!last4 || cards.length >= 2) {
      setSheetOpen(false)
      return
    }
    setCards((current) => [...current, `**** ${last4}`])
    setSelectedCard(cards.length)
    setSheetOpen(false)
  }

  return (
    <section
      className="flex w-full flex-col rounded-[24px] bg-surface-secondary p-4"
      data-node-id="532:37315"
      data-name="Details - Payment"
    >
      <div className="flex w-full flex-col gap-4 rounded-[20px]">
      <h2 className="text-[16px] font-semibold leading-6 text-text-primary">
        Способы оплаты
      </h2>
      <div className="flex w-full gap-1" role="group" aria-label="Когда оплатить">
        <TimingChip label="При получении" selected={timing === 'receipt'} className="w-[110px] shrink-0" onClick={() => setTiming('receipt')} />
        <TimingChip label="Сразу" selected={timing === 'now'} className="w-[110px] shrink-0" onClick={() => setTiming('now')} />
        <TimingChip label="Оплатить частями" selected={timing === 'parts'} className="min-w-0 flex-1" onClick={() => setTiming('parts')} />
      </div>
      <div className="flex w-full gap-1 overflow-hidden" role="group" aria-label="Способ оплаты">
        {timing === 'receipt' ? (
          <>
            <MethodChip
              label="Наличными"
              icon={assets.payCash}
              selected={receiptMethod === 'cash'}
              onClick={() => setReceiptMethod('cash')}
            />
            <MethodChip
              label="Картой"
              icon={assets.payCard}
              selected={receiptMethod === 'card'}
              onClick={() => setReceiptMethod('card')}
            />
          </>
        ) : null}
        {timing === 'now' ? (
          <>
            {cards.map((label, index) => (
              <MethodChip
                key={label}
                label={label}
                icon={assets.payCardLogo}
                selected={selectedCard === index}
                onClick={() => setSelectedCard(index)}
              />
            ))}
            <MethodChip label="Добавить карту" icon={assets.payAdd} selected={cards.length === 0} onClick={addCard} />
          </>
        ) : null}
        {timing === 'parts' ? (
          <MethodChip
            label="Оплата частями"
            icon={assets.payParts}
            selected
            onClick={() => undefined}
          />
        ) : null}
      </div>
      <div
        className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out motion-reduce:transition-none ${
          showInstallments ? 'mt-0 grid-rows-[1fr] opacity-100' : 'pointer-events-none -mt-4 grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden" inert={!showInstallments}>
          <InstallmentForm months={installmentMonths} onMonths={setInstallmentMonths} />
        </div>
      </div>
      </div>
      {sheetOpen ? <AddCardSheet onClose={() => setSheetOpen(false)} onAdd={confirmCard} /> : null}
    </section>
  )
}

const INSTALLMENT_MONTHS = [1, 2, 3]

function InstallmentForm({ months, onMonths }: { months: number; onMonths: (value: number) => void }) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl bg-bg-base p-4" data-node-id="532:39973">
      <h3 className="font-montserrat text-[20px] font-bold leading-[27px] tracking-[-0.4px] text-text-primary opacity-80">
        Условия оплаты
      </h3>
      <p className="text-[11px] font-normal leading-[14px] tracking-[0.11px] text-static-orange">
        Оплата частями на условиях кредитного договора с банком оформляется онлайн. Программа лояльности не действует
      </p>
      <div className="flex w-full flex-col gap-2">
        <p className="text-[15px] font-medium leading-5 text-text-primary">Период оплаты, месяц</p>
        <div className="flex w-full gap-2" role="group" aria-label="Период оплаты, месяц">
          {INSTALLMENT_MONTHS.map((value) => (
            <CreditOption
              key={value}
              value={value}
              selected={months === value}
              selectedClassName="bg-fill-brand text-[#e0edff]"
              onClick={() => onMonths(value)}
            />
          ))}
        </div>
      </div>
      <div className="flex w-full items-center gap-3">
        <p className="min-w-0 flex-1 text-[15px] font-medium leading-5 text-text-primary">Банк</p>
        <LogoBank className="h-5 w-[59px]" />
      </div>
    </div>
  )
}

function CreditOption({
  value,
  selected,
  onClick,
  selectedClassName = 'bg-fill-brand text-white',
}: {
  value: number
  selected: boolean
  onClick: () => void
  selectedClassName?: string
}) {
  return (
    <div className="flex min-w-0 flex-1 py-1">
      <button
        type="button"
        aria-pressed={selected}
        onClick={onClick}
        className={`flex w-full items-center justify-center rounded-lg px-1 py-3 text-[13px] font-medium leading-4 ${
          selected ? selectedClassName : 'bg-[#e0edff] text-text-primary'
        }`}
      >
        {value}
      </button>
    </div>
  )
}

function TimingChip({
  label,
  selected,
  className,
  onClick,
}: {
  label: string
  selected: boolean
  className: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`flex h-9 items-center justify-center overflow-hidden rounded-lg border-[1.5px] bg-bg-base px-3 py-2 ${className} ${
        selected ? 'border-fill-brand' : 'border-transparent'
      }`}
    >
      <span className="w-full truncate text-center text-[11px] font-semibold leading-[14px] tracking-[0.11px] text-text-primary">
        {label}
      </span>
    </button>
  )
}

function MethodChip({
  label,
  icon,
  selected,
  onClick,
}: {
  label: string
  icon: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`flex h-[76px] w-[132px] shrink-0 flex-col items-start justify-end gap-1.5 overflow-hidden rounded-xl border-2 bg-bg-base p-3 ${
        selected ? 'border-fill-brand' : 'border-transparent'
      }`}
    >
      <img alt="" width={20} height={20} src={icon} className="size-5 shrink-0" />
      <span className="w-full truncate text-left text-[11px] font-semibold leading-[14px] tracking-[0.11px] text-text-primary">
        {label}
      </span>
    </button>
  )
}

function AddCardSheet({ onClose, onAdd }: { onClose: () => void; onAdd: (number: string) => void }) {
  const probe = useRef<HTMLSpanElement>(null)
  const [host, setHost] = useState<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)
  const [drag, setDrag] = useState(0)
  const [dragging, setDragging] = useState(false)
  const closing = useRef(false)
  const dragOrigin = useRef({ y: 0, pointer: -1, active: false })
  const dialogRef = useRef<HTMLDivElement>(null)
  const [number, setNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [holder, setHolder] = useState('')
  const ready = number.trim() !== '' && expiry.trim() !== '' && cvc.trim() !== '' && holder.trim() !== ''

  useEffect(() => {
    const node = probe.current?.closest('[data-name="Корзина — 375"]')
    if (node instanceof HTMLElement) setHost(node)
  }, [])

  useEffect(() => {
    if (!host) return
    let second = 0
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setShown(true))
    })
    return () => {
      cancelAnimationFrame(first)
      cancelAnimationFrame(second)
    }
  }, [host])

  const requestClose = () => {
    if (closing.current) return
    closing.current = true
    setDragging(false)
    setDrag(0)
    setShown(false)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) onClose()
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') requestClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const sheet = (
    <div className="absolute inset-0 z-[70]" data-node-id="532:37409">
      <button
        type="button"
        aria-label="Закрыть добавление карты"
        className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          shown ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={requestClose}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-card-title"
        className={`absolute inset-x-0 bottom-0 flex max-h-full touch-pan-y flex-col overflow-y-auto rounded-t-[20px] bg-bg-base shadow-[0px_4px_12px_0px_rgba(44,56,67,0.1),0px_12px_30px_0px_rgba(44,55,66,0.06)] motion-reduce:transition-none ${
          dragging ? 'transition-none' : 'transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]'
        }`}
        style={{ transform: shown ? `translate3d(0, ${drag}px, 0)` : 'translate3d(0, 100%, 0)' }}
        onTransitionEnd={(event) => {
          if (event.target !== event.currentTarget || event.propertyName !== 'transform' || !closing.current) return
          onClose()
        }}
        onPointerDown={(event) => {
          if (event.button !== 0 || closing.current) return
          const target = event.target
          if (!(target instanceof Element) || target.closest('input, textarea, button')) return
          if ((dialogRef.current?.scrollTop ?? 0) > 0) return
          dragOrigin.current = { y: event.clientY, pointer: event.pointerId, active: true }
          setDragging(true)
          try {
            event.currentTarget.setPointerCapture(event.pointerId)
          } catch {
            // The gesture still follows the pointer without capture.
          }
        }}
        onPointerMove={(event) => {
          if (!dragOrigin.current.active || event.pointerId !== dragOrigin.current.pointer) return
          setDrag(Math.max(0, event.clientY - dragOrigin.current.y))
        }}
        onPointerUp={(event) => {
          if (!dragOrigin.current.active || event.pointerId !== dragOrigin.current.pointer) return
          const distance = event.clientY - dragOrigin.current.y
          dragOrigin.current.active = false
          setDragging(false)
          if (distance > 72) requestClose()
          else setDrag(0)
        }}
        onPointerCancel={() => {
          dragOrigin.current.active = false
          setDragging(false)
          setDrag(0)
        }}
      >
        <div className="relative flex w-full flex-col items-center gap-1.5 rounded-t-[20px] bg-bg-base pt-1.5 pb-4">
          <div className="h-1 w-[62px] rounded-[6px] bg-[#e4e7eb]" aria-hidden="true" />
          <button
            type="button"
            onClick={requestClose}
            aria-label="Закрыть"
            className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-2xl bg-secondary-light"
          >
            <img alt="" width={16} height={16} src={assets.payClose} />
          </button>
          <div className="w-full pt-4 pr-12 pl-4">
            <h2
              id="add-card-title"
              className="font-montserrat text-[20px] font-bold leading-[27px] tracking-[-0.4px] text-basic-primary"
            >
              Добавление карты
            </h2>
          </div>
        </div>
        <form
          className="flex flex-col gap-2 px-4 pt-2 pb-6"
          onSubmit={(event) => {
            event.preventDefault()
            if (ready) onAdd(number)
          }}
        >
          <CardField value={number} onChange={setNumber} placeholder="Номер карты" inputMode="numeric" autoComplete="cc-number" />
          <div className="flex w-full gap-2">
            <CardField className="min-w-0 flex-1" value={expiry} onChange={setExpiry} placeholder="Срок действия" inputMode="numeric" autoComplete="cc-exp" />
            <CardField className="min-w-0 flex-1" value={cvc} onChange={setCvc} placeholder="CVC2/CVV2/CID" inputMode="numeric" autoComplete="cc-csc" />
          </div>
          <CardField value={holder} onChange={setHolder} placeholder="Имя держателя карты" autoComplete="cc-name" />
        </form>
        <div className="px-4 pb-8">
          <button
            type="button"
            disabled={!ready}
            onClick={() => onAdd(number)}
            className="flex h-[52px] w-full items-center justify-center rounded-2xl bg-fill-brand px-5 text-[16px] font-medium leading-6 text-white disabled:cursor-default"
            style={
              ready
                ? undefined
                : {
                    backgroundImage:
                      'linear-gradient(90deg, rgba(255,255,255,0.32), rgba(255,255,255,0.32)), linear-gradient(90deg, #1b74fd, #1b74fd)',
                  }
            }
          >
            Добавить карту
          </button>
        </div>
        <div className="flex flex-col gap-3 px-4 pb-6">
          <div className="flex items-center justify-center gap-[22px]">
            <img alt="Mastercard" width={23} height={14} src={assets.payMastercard} />
            <img alt="МИР" width={47} height={13} src={assets.payMir} />
            <img alt="Mastercard" width={23} height={14} src={assets.payMastercard} />
            <img alt="Visa" width={50} height={16} src={assets.payVisa} />
          </div>
          <p className="text-center text-[11px] font-medium leading-[14px] tracking-[0.11px] text-basic-secondary">
            Платёж безопасен. Мы не храним данные карт, все операции проводит BePaid — платёжная система, сертифицированная по международному стандарту безопасности PCI DSS
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <span ref={probe} className="hidden" />
      {host ? createPortal(sheet, host) : null}
    </>
  )
}

function CardField({
  value,
  onChange,
  placeholder,
  inputMode,
  autoComplete,
  className = 'w-full',
}: {
  value: string
  onChange: (value: string) => void
  placeholder: string
  inputMode?: 'numeric' | 'text'
  autoComplete?: string
  className?: string
}) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      inputMode={inputMode}
      autoComplete={autoComplete}
      className={`box-border h-[54px] shrink-0 appearance-none rounded-xl border border-[#e4e7eb] bg-bg-base py-2 pr-3 pl-4 text-[13px] font-semibold leading-4 text-text-primary outline-none placeholder:font-semibold placeholder:leading-4 placeholder:text-basic-secondary focus-visible:border-fill-brand ${className}`}
    />
  )
}
