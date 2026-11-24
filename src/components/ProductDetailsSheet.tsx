import { useEffect, useState } from 'react'
import { assets } from '../assets'
import type { ProductPdp } from '../data'

type Nutrition = NonNullable<ProductPdp['nutrition']>

type Props = {
  pdp: ProductPdp
  open: boolean
  onClose: () => void
  onExited: () => void
}

export function ProductDetailsSheet({ pdp, open, onClose, onExited }: Props) {
  const [shown, setShown] = useState(false)
  const [showAllSpecs, setShowAllSpecs] = useState(false)
  const hiddenSpecs = Math.max(0, pdp.specs.length - 5)
  const specs = showAllSpecs || hiddenSpecs === 0 ? pdp.specs : pdp.specs.slice(0, 5)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setShown(open))
    return () => cancelAnimationFrame(frame)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <div className="absolute inset-0 z-40" data-name="product-details-sheet">
      <button
        type="button"
        aria-label="Закрыть детали товара"
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ease-out motion-reduce:transition-none ${
          shown ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-details-title"
        className="absolute inset-x-0 top-10 bottom-0 flex flex-col overflow-hidden rounded-t-[20px] bg-bg-base transition-transform duration-300 ease-out motion-reduce:transition-none"
        style={{ transform: shown ? 'translate3d(0,0,0)' : 'translate3d(0,100%,0)' }}
        onTransitionEnd={(event) => {
          if (event.propertyName === 'transform' && !open) onExited()
        }}
      >
        <div className="relative h-[75px] shrink-0">
          <div
            className="absolute top-1.5 left-1/2 h-1 w-[62px] -translate-x-1/2 rounded-[6px] bg-[#e4e7eb]"
            aria-hidden="true"
          />
          <h2
            id="product-details-title"
            className="absolute top-8 right-12 left-4 font-montserrat text-[20px] font-bold leading-[27px] tracking-[-0.02em] text-text-primary"
          >
            О товаре
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="absolute top-4 right-4 flex size-8 items-center justify-center"
          >
            <img alt="" width={16} height={16} src={assets.sheetClose} className="size-4" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 pb-6">
          <section className="flex flex-col gap-2">
            <h3 className="text-[13px] font-semibold leading-4 text-text-primary">Характеристики</h3>
            {pdp.nutrition ? <NutritionCard nutrition={pdp.nutrition} /> : null}
            <div className={`flex flex-col gap-3 ${pdp.nutrition ? 'mt-2' : ''}`}>
              {specs.map((row) => (
                <div key={row.label} className="flex items-start gap-2.5">
                  <p className="w-[200px] shrink-0 text-[14px] font-medium leading-5 text-text-secondary">
                    {row.label}
                  </p>
                  <p className="w-[133px] shrink-0 text-[14px] font-semibold leading-5 text-text-primary">
                    {row.value}
                  </p>
                </div>
              ))}
              {hiddenSpecs === 0 || !showAllSpecs ? (
                <button
                  type="button"
                  onClick={() => {
                    if (hiddenSpecs > 0) setShowAllSpecs(true)
                  }}
                  className="flex h-8 w-fit items-center rounded-xl bg-surface-secondary px-3 text-[14px] font-medium leading-5 text-text-primary"
                >
                  Показать все (+{hiddenSpecs > 0 ? hiddenSpecs : 4})
                </button>
              ) : null}
            </div>
          </section>

          <section className="flex flex-col gap-2">
            <h3 className="text-[16px] font-semibold leading-6 text-text-primary">О товаре</h3>
            <p className="text-[16px] font-normal leading-6 text-text-secondary">{pdp.about}</p>
          </section>

          <section className="flex flex-col gap-1">
            <h3 className="text-[13px] font-semibold leading-4 text-text-primary">Описание</h3>
            <p className="text-[16px] font-normal leading-6 text-text-secondary">{pdp.about}</p>
          </section>

          <section className="flex flex-col gap-2">
            <h3 className="text-[16px] font-semibold leading-6 text-text-primary">Состав</h3>
            <p className="text-[16px] font-normal leading-6 text-text-secondary">{pdp.composition}</p>
          </section>

          <section className="flex flex-col gap-2">
            <h3 className="text-[16px] font-semibold leading-6 text-text-primary">Условия и сроки хранения</h3>
            <p className="text-[16px] font-normal leading-6 text-text-secondary">{pdp.storage}</p>
          </section>

          {pdp.trade.map((row) => (
            <section key={row.label} className="flex flex-col gap-2">
              <h3 className="text-[14px] font-medium leading-5 text-text-secondary">{row.label}</h3>
              <p className="text-[14px] font-normal leading-5 text-text-primary">{row.value}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

function NutritionCard({ nutrition }: { nutrition: Nutrition }) {
  return (
    <div className="rounded-2xl bg-surface-secondary p-3" data-name="Nutritional Value">
      <div className="flex flex-col gap-3">
        <p className="text-[11px] font-medium leading-[14px] text-text-primary">
          Пищевая ценность ({nutrition.basis})
        </p>
        <div className="flex items-center gap-5">
          <NutritionItem value={nutrition.calories} unit="ккал" label="Калории" emphasize />
          <span className="h-[38px] w-px shrink-0 bg-text-secondary" aria-hidden="true" />
          <NutritionItem value={nutrition.protein} unit="г" label="Белки" />
          <span className="h-[38px] w-px shrink-0 bg-text-secondary" aria-hidden="true" />
          <NutritionItem value={nutrition.fat} unit="г" label="Жиры" />
          <span className="h-[38px] w-px shrink-0 bg-text-secondary" aria-hidden="true" />
          <NutritionItem value={nutrition.carbs} unit="г" label="Углеводы" />
        </div>
      </div>
    </div>
  )
}

function NutritionItem({
  value,
  unit,
  label,
  emphasize = false,
}: {
  value: string
  unit: string
  label: string
  emphasize?: boolean
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <span
          className={`text-[15px] leading-5 text-text-primary ${emphasize ? 'font-bold' : 'font-medium'}`}
        >
          {value}
        </span>
        <span className="text-[11px] font-medium leading-[14px] text-text-secondary">{unit}</span>
      </div>
      <span className="text-[11px] font-medium leading-[14px] text-text-secondary">{label}</span>
    </div>
  )
}
