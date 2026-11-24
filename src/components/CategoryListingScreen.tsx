import { useMemo, useRef, useState } from 'react'
import { assets } from '../assets'
import { getCategoryListing, type ListingCategoryId } from '../data'
import { SiteFooter } from './SiteFooter'
import { ProductCard } from './ProductCard'
import { FiltersScreen } from './FiltersScreen'
import { Switch } from './Switch'

type Props = {
  categoryId: ListingCategoryId
  cart: Record<string, number>
  cartCount: number
  onOpenHome: () => void
  onOpenSearch: () => void
  onOpenCatalog: () => void
  onAddToCart: (id: string, title: string) => void
  onRemoveFromCart: (id: string) => void
  onOpenProduct?: (id: string) => void
  onToast?: (message: string) => void
  toast?: string | null
}

export function CategoryListingScreen({
  categoryId,
  cart,
  cartCount: _cartCount,
  onOpenHome,
  onOpenSearch,
  onOpenCatalog,
  onAddToCart,
  onRemoveFromCart,
  onOpenProduct,
  onToast,
  toast = null,
}: Props) {
  const [discountOnly, setDiscountOnly] = useState(false)
  const mainRef = useRef<HTMLElement>(null)
  const [filtersMounted, setFiltersMounted] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const openFilters = () => {
    setFiltersMounted(true)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setFiltersOpen(true))
    })
  }

  const closeFilters = (saleOnly?: boolean) => {
    if (saleOnly !== undefined) setDiscountOnly(saleOnly)
    setFiltersOpen(false)
  }
  const listing = getCategoryListing(categoryId)

  const products = useMemo(() => {
    if (!discountOnly) return listing.products
    return listing.products.filter(
      (product) =>
        product.badges?.marketing?.type === 'discount' ||
        product.badges?.marketing?.type === '1+1' ||
        Boolean(product.oldPrice) ||
        product.badges?.product === 'sale',
    )
  }, [discountOnly, listing.products])

  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden bg-bg-base"
      data-node-id="458:113474"
      data-name="Листинг - 1921"
    >

      <header
        className="relative z-20 shrink-0 rounded-b-[20px] bg-bg-base pb-4 shadow-[0px_10px_3px_0px_rgba(214,214,214,0),0px_7px_3px_0px_rgba(214,214,214,0.01),0px_4px_2px_0px_rgba(214,214,214,0.05),0px_2px_2px_0px_rgba(214,214,214,0.09),0px_0px_1px_0px_rgba(214,214,214,0.1)]"
        data-node-id="458:113519"
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
        className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain px-4 pb-[98px] pt-5 scrollbar-hide"
        data-node-id="458:113482"
        data-name="Content"
      >
        <nav
          className="flex flex-wrap items-center gap-1 text-[16px] font-normal leading-6 text-[rgba(65,45,78,0.4)]"
          data-node-id="289:25531"
          data-name="Breadcrumbs"
          aria-label="Навигация"
        >
          <button type="button" onClick={onOpenHome} className="shrink-0">
            Главная
          </button>
          <span className="shrink-0" aria-hidden="true">
            /
          </span>
          <button type="button" onClick={onOpenCatalog} className="shrink-0">
            Каталог
          </button>
          <span className="shrink-0" aria-hidden="true">
            /
          </span>
          <span className="shrink-0" aria-current="page">
            {listing.breadcrumb}
          </span>
        </nav>

        <div className="mt-5 flex w-full flex-col gap-4" data-name="Content">
          <h1
            className="font-montserrat text-[20px] font-bold leading-[26px] text-text-primary"
            data-node-id="458:113484"
          >
            {listing.title}
          </h1>

          <ul
            className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-hide"
            data-node-id="458:113485"
            data-name="Categories"
            aria-label="Подкатегории"
          >
            {listing.subcategories.map((sub) => (
              <li key={sub.id} className="w-[161px] shrink-0">
                <button
                  type="button"
                  onClick={() => onToast?.(sub.title)}
                  className="flex w-full flex-col items-center gap-2 text-center"
                  data-name="CategorieCard"
                >
                  <span className="relative h-[118px] w-full" data-name="Media">
                    <span
                      className="absolute left-0 top-12 h-[70px] w-full rounded-[35px] bg-[#ececee]"
                      data-name="Pill"
                      aria-hidden
                    />
                    <img
                      alt=""
                      width={120}
                      height={120}
                      src={sub.image}
                      className="pointer-events-none absolute left-1/2 top-1.5 size-[120px] max-w-none -translate-x-1/2 object-contain"
                      draggable={false}
                    />
                  </span>
                  <span className="line-clamp-2 w-full text-[13px] font-medium leading-4 text-[#0d0d0d]">
                    {sub.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex w-full flex-col gap-6" data-node-id="458:113492" data-name="Listing">
            <div className="flex w-full flex-col gap-4" data-node-id="458:113493" data-name="Filters">
              <div
                className="flex w-full items-center justify-between gap-2"
                data-node-id="458:113500"
                data-name="ChipsGroup"
              >
                <button
                  type="button"
                  onClick={() => onToast?.('По популярности')}
                  className="flex h-10 items-center justify-center gap-2 rounded-xl bg-surface-secondary px-4"
                  data-name="Chips"
                >
                  <img
                    alt=""
                    width={24}
                    height={24}
                    src={assets.foodSort}
                    className="size-6 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="whitespace-nowrap text-[16px] font-medium leading-6 text-text-primary">
                    По популярности
                  </span>
                </button>
                <button
                  type="button"
                  onClick={openFilters}
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-secondary"
                  aria-label="Фильтры"
                  data-name="Chips"
                >
                  <img
                    alt=""
                    width={24}
                    height={24}
                    src={assets.foodFilters}
                    className="size-6"
                    aria-hidden="true"
                  />
                </button>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={discountOnly}
                onClick={() => setDiscountOnly((value) => !value)}
                className="group flex h-10 w-full items-center gap-2 rounded-[20px] border border-fill-brand border-r-2 border-b-2 bg-surface-secondary pl-3 pr-[13px]"
                data-node-id="458:113501"
              >
                <span className="min-w-0 flex-1 text-left text-[16px] font-normal leading-6 text-fill-brand">
                  Только со скидкой
                </span>
                <Switch checked={discountOnly} />
              </button>
            </div>

            <div
              className="grid grid-cols-2 gap-x-3 gap-y-8"
              data-node-id="458:113503"
              data-name="Listing"
            >
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={cart[product.id] ?? 0}
                  onAdd={() => onAddToCart(product.id, product.title)}
                  onRemove={() => onRemoveFromCart(product.id)}
                  onOpen={onOpenProduct ? () => onOpenProduct(product.id) : undefined}
                />
              ))}
            </div>
          </div>
        </div>
        <SiteFooter className="-mx-4" onOpenCatalog={onOpenCatalog} />
      </main>

      {filtersMounted ? (
        <div
          className="absolute inset-0 z-[60] bg-bg-base shadow-[-8px_0_24px_rgba(13,14,15,0.08)] transition-transform duration-300 ease-out motion-reduce:transition-none"
          style={{ transform: filtersOpen ? 'translate3d(0,0,0)' : 'translate3d(100%,0,0)' }}
          onTransitionEnd={(event) => {
            if (event.target !== event.currentTarget || event.propertyName !== 'transform') return
            if (!filtersOpen) setFiltersMounted(false)
          }}
        >
          <FiltersScreen
            totalCount={listing.products.length}
            saleCount={
              listing.products.filter(
                (product) =>
                  product.badges?.marketing?.type === 'discount' ||
                  product.badges?.marketing?.type === '1+1' ||
                  Boolean(product.oldPrice) ||
                  product.badges?.product === 'sale',
              ).length
            }
            discountOnly={discountOnly}
            onClose={() => closeFilters()}
            onApply={(saleOnly) => closeFilters(saleOnly)}
          />
        </div>
      ) : null}

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
}
