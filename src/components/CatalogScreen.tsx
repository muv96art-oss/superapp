import { forwardRef, useImperativeHandle, useRef } from 'react'
import { assets } from '../assets'
import { CATALOG_CATEGORIES } from '../data'
import { SiteFooter } from './SiteFooter'

type Props = {
  cartCount: number
  onOpenSearch: () => void
  onCategorySelect?: (id: string, title: string) => void
  toast?: string | null
}

export type CatalogScreenHandle = {
  scrollToTop: () => void
}

export const CatalogScreen = forwardRef<CatalogScreenHandle, Props>(function CatalogScreen(
  { cartCount: _cartCount, onOpenSearch, onCategorySelect, toast = null },
  ref,
) {
  const mainRef = useRef<HTMLElement>(null)

  useImperativeHandle(ref, () => ({
    scrollToTop: () => {
      mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    },
  }))

  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden bg-bg-base"
      data-node-id="391:111649"
      data-name="Каталог — 1442"
    >

      <header
        className="relative z-20 shrink-0 rounded-b-[20px] bg-bg-base pb-4 shadow-[0px_10px_3px_0px_rgba(214,214,214,0),0px_7px_3px_0px_rgba(214,214,214,0.01),0px_4px_2px_0px_rgba(214,214,214,0.05),0px_2px_2px_0px_rgba(214,214,214,0.09),0px_0px_1px_0px_rgba(214,214,214,0.1)]"
        data-node-id="391:111650"
        data-name="HeaderMobile"
      >
        <div className="flex flex-col gap-3 px-4 pt-3">
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex h-11 w-full items-center gap-2 rounded-xl bg-surface-secondary px-2 text-left"
            aria-label="Поиск"
            data-name="Search Field"
          >
            <img
              alt=""
              width={24}
              height={24}
              src={assets.searchBrand}
              className="size-6 shrink-0"
              aria-hidden="true"
            />
            <span className="min-w-0 flex-1 text-[16px] font-normal leading-6 text-text-secondary">
              Поиск
            </span>
          </button>
        </div>
      </header>

      <main
        ref={mainRef}
        className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain px-5 pb-[98px] pt-5 scrollbar-hide"
        data-node-id="391:111651"
        data-name="Catalog"
      >
        <div className="flex w-full items-center gap-3">
          <h1 className="min-w-0 flex-1 font-montserrat text-[24px] font-bold leading-[30px] tracking-[-0.24px] text-text-primary">
            Каталог
          </h1>
        </div>

        <ul
          className="mt-3 flex flex-col gap-2 pb-6"
          data-node-id="391:111654"
          data-name="CategorieList"
          aria-label="Категории каталога"
        >
          {CATALOG_CATEGORIES.map((category) => (
            <li key={category.id}>
              <button
                type="button"
                onClick={() => onCategorySelect?.(category.id, category.title)}
                className="flex w-full items-center gap-2 overflow-hidden rounded-xl py-2 text-left"
                data-name="Suggestion/category"
              >
                <span className="relative size-[38px] shrink-0 overflow-hidden rounded-lg bg-surface-secondary">
                  <img
                    alt=""
                    src={category.image}
                    width={38}
                    height={38}
                    className="absolute inset-0 size-full object-contain"
                    draggable={false}
                  />
                </span>
                <span className="min-w-0 flex-1 text-[14px] font-medium leading-5 text-text-primary">
                  {category.title}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <SiteFooter className="-mx-5" />
      </main>

      {toast ? (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none absolute bottom-[110px] left-1/2 z-40 max-w-[85%] -translate-x-1/2 rounded-xl bg-text-primary px-3 py-2 text-center text-[12px] font-medium text-white shadow-lg"
        >
          {toast}
        </div>
      ) : null}
    </div>
  )
})
