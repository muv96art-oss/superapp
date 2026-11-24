import { useEffect, useRef, useState } from 'react'
import { assets } from '../assets'
import { Switch } from './Switch'

type Props = {
  onClose: () => void
  onContinue: (phone: string) => void
}

function formatPhoneDigits(raw: string) {
  const digits = raw.replace(/\D/g, '').slice(0, 9)
  const parts = [digits.slice(0, 2), digits.slice(2, 5), digits.slice(5, 7), digits.slice(7, 9)].filter(
    Boolean,
  )
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0]
  if (parts.length === 2) return `(${parts[0]}) ${parts[1]}`
  if (parts.length === 3) return `(${parts[0]}) ${parts[1]}-${parts[2]}`
  return `(${parts[0]}) ${parts[1]}-${parts[2]}-${parts[3]}`
}

/** Phone login — Figma 613:11228; close 613:13619 */
export function PhoneLoginScreen({ onClose, onContinue }: Props) {
  const [digits, setDigits] = useState('')
  const [accepted, setAccepted] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => inputRef.current?.focus(), 120)
    return () => window.clearTimeout(timer)
  }, [])

  const display = formatPhoneDigits(digits)
  const canContinue = accepted && digits.length >= 9

  return (
    <div
      className="absolute inset-0 z-[80] flex flex-col bg-bg-base"
      data-node-id="613:11228"
      data-name="Log in phone"
    >

      <div
        className="relative z-10 flex h-11 shrink-0 items-end justify-end px-4 py-3"
        data-node-id="613:13619"
        data-name="Navbar"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="relative size-6"
        >
          <img alt="" width={24} height={24} src={assets.authClose} className="size-6" />
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center px-5 pt-[82px]">
        <div className="flex w-full flex-col items-center gap-6">
          <div className="flex w-full flex-col items-center gap-3">
            <h1 className="text-center text-[20px] font-bold leading-[26px] text-text-primary">
              Введите номер телефона
            </h1>
            <p className="w-[220px] text-center text-[14px] leading-[18px] text-text-secondary">
              Чтобы войти в приложение
              <br />
              или стать клиентом
            </p>
          </div>

          <div className="flex w-full max-w-[335px] flex-col items-center gap-6">
            <label className="flex h-[52px] w-full cursor-text items-center rounded-xl bg-surface-secondary px-4">
              <span className="shrink-0 text-[18px] leading-6 text-text-primary">+375</span>
              <input
                ref={inputRef}
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                aria-label="Номер телефона"
                value={display}
                onChange={(event) => {
                  const next = event.target.value.replace(/\D/g, '')
                  const local = next.startsWith('375') ? next.slice(3) : next
                  setDigits(local.slice(0, 9))
                }}
                className="ml-1 min-w-0 flex-1 bg-transparent text-[18px] leading-6 text-text-primary outline-none"
              />
            </label>

            <button
              type="button"
              disabled={!canContinue}
              onClick={() => onContinue(`+375${digits}`)}
              className={`flex h-11 w-[311px] items-center justify-center rounded-xl px-6 py-3 text-[16px] font-medium leading-5 text-white transition-colors ${
                canContinue ? 'bg-fill-brand' : 'bg-[#a4c7fe]'
              }`}
            >
              Продолжить
            </button>
          </div>
        </div>

        <div
          className="mt-auto mb-10 flex w-full items-end justify-between px-3 pb-6"
          data-node-id="613:13718"
          data-name="Privacy"
        >
          <p className="text-[13px] leading-[18px] text-[#222]">
            Ознакомился с{' '}
            <span className="text-fill-brand underline decoration-from-font">Публичной офертой</span>
            <br />
            и{' '}
            <span className="text-fill-brand underline decoration-from-font">
              Политикой конфиденциальности
            </span>
          </p>
          <button
            type="button"
            role="switch"
            aria-checked={accepted}
            aria-label="Принять условия"
            onClick={() => setAccepted((value) => !value)}
            className="group shrink-0"
          >
            <Switch checked={accepted} />
          </button>
        </div>
      </div>
    </div>
  )
}
