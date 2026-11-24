import { useEffect, useState } from 'react'
import { StatusBar } from './StatusBar'

type Props = {
  phone: string
  onBack: () => void
  onComplete: () => void
}

const KEYS: { label: string; sub?: string; value?: string }[][] = [
  [
    { label: '1', value: '1' },
    { label: '2', sub: 'ABC', value: '2' },
    { label: '3', sub: 'DEF', value: '3' },
  ],
  [
    { label: '4', sub: 'GHI', value: '4' },
    { label: '5', sub: 'JKL', value: '5' },
    { label: '6', sub: 'MNO', value: '6' },
  ],
  [
    { label: '7', sub: 'PQRS', value: '7' },
    { label: '8', sub: 'TUV', value: '8' },
    { label: '9', sub: 'WXYZ', value: '9' },
  ],
]

function formatPhoneLabel(phone: string) {
  const digits = phone.replace(/\D/g, '')
  const local = digits.startsWith('375') ? digits.slice(3) : digits
  if (local.length < 9) return phone
  return `+375 (${local.slice(0, 2)}) ${local.slice(2, 5)}-${local.slice(5, 7)}-${local.slice(7, 9)}`
}

/** SMS code — Figma 613:14514 */
export function SmsAuthScreen({ phone, onBack, onComplete }: Props) {
  const [code, setCode] = useState('')

  useEffect(() => {
    if (code.length >= 4) {
      const timer = window.setTimeout(onComplete, 280)
      return () => window.clearTimeout(timer)
    }
  }, [code, onComplete])

  const pushDigit = (digit: string) => {
    setCode((prev) => (prev.length >= 4 ? prev : `${prev}${digit}`))
  }

  const backspace = () => setCode((prev) => prev.slice(0, -1))

  return (
    <div
      className="absolute inset-0 z-[80] flex flex-col bg-bg-base"
      data-node-id="613:14514"
      data-name="Login - SMS"
    >
      <StatusBar tone="dark" />

      <div className="relative z-10 flex h-[88px] shrink-0 items-end px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5"
          aria-label="Назад ко входу"
        >
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M14.5 5.5 8 12l6.5 6.5"
              stroke="#0d0e0f"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[20px] font-medium leading-[26px] text-text-primary">Вход</span>
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center gap-8 px-5 pt-[40px]">
        <div className="flex w-full flex-col items-center gap-6">
          <div className="flex w-full flex-col items-center gap-3">
            <h1 className="text-[20px] font-bold leading-[26px] text-text-primary">SMS-код</h1>
            <p className="w-[220px] text-center text-[14px] leading-[18px] text-text-secondary">
              SMS-код был отправлен на номер {formatPhoneLabel(phone)}
            </p>
          </div>

          <div className="relative flex items-center gap-2" aria-label="Код из SMS">
            {[0, 1, 2, 3].map((index) => {
              const filled = code[index]
              const active = index === code.length && code.length < 4
              return (
                <div
                  key={index}
                  className={`relative flex h-16 w-11 items-center justify-center rounded-xl border border-solid bg-bg-base ${
                    active ? 'border-fill-brand' : 'border-[#cdd0d5]'
                  }`}
                >
                  {filled ? (
                    <span className="text-[26px] font-bold leading-8 text-text-primary">{filled}</span>
                  ) : active ? (
                    <span className="animate-pulse text-[26px] font-bold leading-8 text-text-primary">
                      |
                    </span>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>

        <button
          type="button"
          className="text-[17px] font-normal leading-[22px] text-fill-brand"
          onClick={() => setCode('')}
        >
          Получить новый код
        </button>
      </div>

      <div
        className="shrink-0 bg-[rgba(204,206,211,0.76)] px-1.5 pb-[34px] pt-1.5 backdrop-blur-[10px]"
        data-name="iOS Numeric Keyboard"
      >
        <div className="flex flex-col gap-[7px]">
          {KEYS.map((row) => (
            <div key={row[0].label} className="flex gap-1.5">
              {row.map((key) => (
                <button
                  key={key.label}
                  type="button"
                  onClick={() => key.value && pushDigit(key.value)}
                  className="flex h-[46px] flex-1 flex-col items-center justify-center rounded-[5px] bg-white shadow-[0_1px_0_#898a8d]"
                >
                  <span className="text-[25px] leading-[30px] text-black">{key.label}</span>
                  {key.sub ? (
                    <span className="text-[10px] font-bold leading-3 tracking-[2px] text-black">
                      {key.sub}
                    </span>
                  ) : (
                    <span className="h-3" />
                  )}
                </button>
              ))}
            </div>
          ))}
          <div className="flex gap-1.5">
            <div className="flex-1" />
            <button
              type="button"
              onClick={() => pushDigit('0')}
              className="flex h-[46px] flex-1 flex-col items-center justify-center rounded-[5px] bg-white shadow-[0_1px_0_#898a8d]"
            >
              <span className="text-[25px] leading-[30px] text-black">0</span>
              <span className="h-3" />
            </button>
            <button
              type="button"
              onClick={backspace}
              aria-label="Удалить"
              className="flex h-[46px] flex-1 items-center justify-center rounded-[4.6px] text-[22px] text-[#50555c]"
            >
              ⌫
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
