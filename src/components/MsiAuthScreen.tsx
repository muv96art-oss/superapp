import { useState } from 'react'
import { assets } from '../assets'
import { StatusBar } from './StatusBar'

type Props = {
  onBack: () => void
  onComplete: () => void
}

/** MSI authentication — Figma 613:14799 */
export function MsiAuthScreen({ onBack, onComplete }: Props) {
  const [idNumber, setIdNumber] = useState('1111111A111AA1')
  const [phone, setPhone] = useState('+375')

  return (
    <div
      className="absolute inset-0 z-[80] overflow-y-auto overflow-x-hidden bg-white scrollbar-hide"
      data-node-id="613:14799"
      data-name="MSI auth"
    >
      <StatusBar tone="dark" />

      <div className="relative z-10 flex items-end gap-[15px] px-4 pb-3 pt-[50px]">
        <button type="button" onClick={onBack} aria-label="Назад" className="pb-1">
          <svg width={9} height={16} viewBox="0 0 9 16" fill="none" aria-hidden="true">
            <path
              d="M8 1 1.5 8 8 15"
              stroke="#222"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="min-w-0 flex-1 text-[20px] font-medium leading-[26px] text-[#222]">
          Аутентификация в МСИ
        </h1>
      </div>

      <div className="relative h-[102px] w-full bg-[#244c14]">
        <div className="absolute inset-x-7 top-[11px] flex flex-col items-center gap-1">
          <img
            alt=""
            src={assets.authMsiLogo}
            width={51}
            height={24}
            className="h-6 w-[51px] object-cover"
          />
          <p className="w-full text-center text-[18px] font-semibold leading-[26px] uppercase text-white">
            Межбанковская система идентификации
          </p>
        </div>
      </div>

      <div className="relative mx-auto mt-1.5 h-[120px] w-[268px]">
        <img
          alt=""
          src={assets.authMsiEmblem}
          width={268}
          height={120}
          className="size-full object-cover"
        />
      </div>

      <p className="mx-auto mt-1 w-[343px] text-center text-[32px] font-bold uppercase leading-none text-[#f29700]">
        Аутентификация в мси
      </p>

      <p className="mx-auto mt-8 w-[343px] text-center text-[18px] font-light leading-[26px] text-[#222]">
        Для входа в информационную систему ЗАО “МТБанк”
      </p>

      <div className="mx-auto mt-10 flex w-[343px] flex-col gap-[5px]">
        <label className="text-[16px] font-semibold leading-[26px] text-[#244c14]">
          Введите идентификационный (личный) номер
          <input
            value={idNumber}
            onChange={(event) => setIdNumber(event.target.value.toUpperCase())}
            className="mt-[5px] h-[54px] w-full bg-[#fcf7e3] px-3 text-[16px] font-light leading-[26px] text-[#5a5a5a] outline-none"
          />
        </label>
        <p className="mt-3 text-[14px] font-light leading-[22px] text-[#5a5a5a]">
          Идентификационный (личный) номер в формате 1111111A111AA1, используя числа и латинский
          алфавит в верхнем регистре (заглавными)
        </p>
      </div>

      <div className="mx-auto mt-8 flex w-[343px] flex-col gap-[5px]">
        <label className="text-[16px] font-semibold leading-[26px] text-[#244c14]">
          Введите номер телефона
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="mt-[5px] h-[54px] w-full bg-[#fcf7e3] px-3 text-[16px] font-light leading-[26px] text-[#5a5a5a] outline-none"
          />
        </label>
      </div>

      <div className="mx-auto mt-8 flex w-[343px] gap-[9px] pb-4">
        <button
          type="button"
          onClick={onComplete}
          className="flex h-12 w-[121px] items-center justify-center rounded-[26px] border-2 border-[#f29700] px-9 text-[14px] font-semibold uppercase leading-[26px] text-[#f29700]"
        >
          Войти
        </button>
        <button
          type="button"
          onClick={onBack}
          className="flex h-12 items-center justify-center rounded-[26px] border-2 border-[#c3bdb1] px-9 text-[14px] font-semibold uppercase leading-[26px] text-[#222]"
        >
          Отменить
        </button>
      </div>

      <div className="mt-auto flex h-[94px] items-start justify-center bg-[#f29700] pt-4">
        <p className="text-[16px] font-light leading-[26px] text-white">Правила регистрации в МСИ</p>
      </div>
    </div>
  )
}
