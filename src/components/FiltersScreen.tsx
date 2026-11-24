import { useState } from 'react'
import { assets } from '../assets'
import { Switch } from './Switch'

const CATEGORIES = ['Ассорти и чайные наборы', 'Кофе', 'Пакетированный чай'] as const

const BRANDS = [
  'Название',
  'Среднее название',
  'Длинное название какого-то бренда',
  'Очень длинное название какого-то бренда',
] as const

const PACKS = BRANDS

type Props = {
  totalCount: number
  saleCount: number
  discountOnly: boolean
  onClose: () => void
  onApply: (discountOnly: boolean) => void
}

export function FiltersScreen({ totalCount, saleCount, discountOnly, onClose, onApply }: Props) {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>(CATEGORIES[0])
  const [saleOnly, setSaleOnly] = useState(discountOnly)
  const [brands, setBrands] = useState<string[]>([])
  const [packs, setPacks] = useState<string[]>([])
  const [extra, setExtra] = useState<string[]>([])

  const toggle = (list: string[], setList: (next: string[]) => void, value: string) => {
    setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value])
  }

  return (
    <div
      className="relative flex h-full w-full flex-col bg-bg-base"
      data-node-id="491:29661"
      data-name="Фильтры — 375 / Moby"
    >
      <header
        className="flex shrink-0 items-center gap-2.5 border-b border-[#cdd0d5] p-5"
        data-node-id="491:29703"
        data-name="Header"
      >
        <h1 className="min-w-0 flex-1 font-montserrat text-[20px] font-bold leading-[26px] text-text-primary">
          Фильтры
        </h1>
        <button type="button" onClick={onClose} className="flex size-6 shrink-0 items-center justify-center" aria-label="Закрыть">
          <img alt="" width={24} height={24} src={assets.filterClose} className="size-6" />
        </button>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-4 py-4 pb-[132px]">
        <section className="flex w-full flex-col gap-2" data-name="Categories">
          <h2 className="font-montserrat text-[17px] font-semibold leading-[22px] text-text-primary">Категория</h2>
          <div className="flex w-full flex-col gap-0.5">
            {CATEGORIES.map((item) => {
              const selected = category === item
              return (
                <button
                  key={item}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setCategory(item)}
                  className="flex h-11 w-full items-center gap-2 text-left"
                >
                  <img
                    alt=""
                    width={24}
                    height={24}
                    src={selected ? assets.filterRadioOn : assets.filterRadioOff}
                    className="size-6 shrink-0"
                  />
                  <span className="min-w-0 flex-1 text-[16px] font-normal leading-6 text-text-secondary">{item}</span>
                </button>
              )
            })}
            <button type="button" className="flex h-11 items-center gap-1 text-fill-brand" aria-expanded={false}>
              <span className="text-[16px] font-normal leading-6">Показать все</span>
              <img alt="" width={24} height={24} src={assets.filterArrow} className="size-6" />
            </button>
          </div>
        </section>

        <button
          type="button"
          role="switch"
          aria-checked={saleOnly}
          onClick={() => setSaleOnly((value) => !value)}
          className="flex w-full items-center gap-2 rounded-2xl border border-fill-brand bg-surface-secondary px-3 py-4"
          data-name="Sale switch block"
        >
          <span className="min-w-0 flex-1 text-left text-[16px] font-normal leading-6 text-fill-brand">
            Только товары со скидкой
          </span>
          <Switch checked={saleOnly} />
        </button>

        <ChipBlock
          title="Бренд"
          items={BRANDS}
          selected={brands}
          onToggle={(value) => toggle(brands, setBrands, value)}
          showAll
        />
        <ChipBlock title="Упаковка" items={PACKS} selected={packs} onToggle={(value) => toggle(packs, setPacks, value)} />
        <ChipBlock
          title="Пример очень длинного названия фильтра в 2 строки"
          items={BRANDS}
          selected={extra}
          onToggle={(value) => toggle(extra, setExtra, value)}
          showAll
        />
      </div>

      <footer
        className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-surface-secondary px-4 pb-5 pt-3 shadow-[0px_-4px_2px_0px_rgba(214,214,214,0.05),0px_-2px_2px_0px_rgba(214,214,214,0.09),0px_0px_1px_0px_rgba(214,214,214,0.1)]"
        data-name="Footer/Sticky"
      >
        <p className="text-center text-[14px] font-medium leading-5 text-text-secondary">
          Товаров найдено: {saleOnly ? saleCount : totalCount}
        </p>
        <button
          type="button"
          onClick={() => onApply(saleOnly)}
          className="mt-3 flex h-[52px] w-full items-center justify-center rounded-2xl bg-fill-brand text-[16px] font-medium leading-6 text-white"
        >
          Применить
        </button>
      </footer>
    </div>
  )
}

function ChipBlock({
  title,
  items,
  selected,
  onToggle,
  showAll = false,
}: {
  title: string
  items: readonly string[]
  selected: string[]
  onToggle: (value: string) => void
  showAll?: boolean
}) {
  return (
    <section className="flex w-full flex-col gap-4">
      <h2 className="font-montserrat text-[17px] font-semibold leading-[22px] text-text-primary">{title}</h2>
      <div className="flex flex-wrap gap-3">
        {items.map((item, index) => {
          const active = selected.includes(item)
          const wide = index === items.length - 1
          return (
            <button
              key={item}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(item)}
              className={`flex h-9 items-center justify-center rounded-[20px] px-4 text-[16px] font-medium leading-6 ${
                wide ? 'min-w-0 max-w-full flex-1' : ''
              } ${active ? 'bg-fill-brand text-white' : 'bg-surface-secondary text-text-primary'}`}
            >
              <span className={wide ? 'truncate' : 'whitespace-nowrap'}>{item}</span>
            </button>
          )
        })}
      </div>
      {showAll ? (
        <button
          type="button"
          className="flex h-9 w-fit items-center gap-2 rounded-[20px] bg-surface-secondary px-4 text-[16px] font-medium leading-6 text-fill-brand"
        >
          Показать все
          <img alt="" width={24} height={24} src={assets.filterArrowChip} className="size-6" />
        </button>
      ) : null}
    </section>
  )
}
