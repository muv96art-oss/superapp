import { forwardRef, useImperativeHandle, useRef } from 'react'
import { PRODUCTS, type ListingCategoryId } from '../data'
import { SiteFooter } from './SiteFooter'
import { HeroTop } from './HeroTop'
import { ListingBanner } from './ListingBanner'
import { ProductCard } from './ProductCard'
import { PromoBlock } from './PromoBlock'

const LISTING_BANNER_AFTER = 4

type Props = {
  cart: Record<string, number>
  cartCount: number
  onAddToCart: (id: string, title: string) => void
  onRemoveFromCart: (id: string) => void
  onOpenProduct: (id: string) => void
  onOpenSearch: () => void
  onOpenCatalog: () => void
  onOpenCategoryListing: (id: ListingCategoryId) => void
  active: boolean
  toast: string | null
  onToast: (message: string) => void
  isLoggedIn?: boolean
  onOpenProfile?: () => void
  /** Card issued on Balance → Home hero Variant4 698:30267 (no Halva strip) */
  cardIssued?: boolean
  /** Halva strip 654:8738 → card application 716:12621 */
  onOpenCardApplication?: () => void
}

export type HomeScreenHandle = {
  scrollToTop: () => void
}

export const HomeScreen = forwardRef<HomeScreenHandle, Props>(function HomeScreen(
  {
    cart,
    cartCount: _cartCount,
    onAddToCart,
    onRemoveFromCart,
    onOpenProduct,
    onOpenSearch,
    onOpenCatalog,
    onOpenCategoryListing,
    active: _active,
    toast,
    onToast,
    isLoggedIn = true,
    onOpenProfile,
    cardIssued = false,
    onOpenCardApplication,
  },
  ref,
) {
  const mainRef = useRef<HTMLElement>(null)

  useImperativeHandle(ref, () => ({
    scrollToTop: () => {
      mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    },
  }))

  return (
    <div className="relative h-full w-full overflow-hidden bg-bg-base">

      <main
        ref={mainRef}
        className="h-full overflow-x-hidden overflow-y-auto overscroll-y-contain pb-[98px] scrollbar-hide"
      >
        <HeroTop
          onOpenSearch={onOpenSearch}
          onNotify={() => onToast('Уведомления')}
          onScan={() => onToast('QR-сканер')}
          onLocation={() => onToast('Выбор города')}
          isLoggedIn={isLoggedIn}
          onOpenProfile={onOpenProfile}
          cardIssued={cardIssued}
          onOpenCardApplication={onOpenCardApplication}
        />

        <section
          className="relative z-10 flex flex-col gap-6 rounded-t-[36px] bg-surface-secondary px-5 pb-5"
          data-node-id="391:76799"
          data-name="body"
        >
          <PromoBlock onOpenCategoryListing={onOpenCategoryListing} />

          <h1 className="font-montserrat text-[20px] font-bold leading-[26px] text-text-primary">
            Рекомендуем
          </h1>

          <div
            className="flex flex-col gap-6"
            data-node-id="391:76801"
            data-name="Frame 2131327269"
          >
            <div className="grid grid-cols-2 gap-x-3 gap-y-5" data-name="Listing">
              {PRODUCTS.slice(0, LISTING_BANNER_AFTER).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={cart[product.id] ?? 0}
                  maxQuantity={99}
                  onAdd={() => onAddToCart(product.id, product.title)}
                  onRemove={() => onRemoveFromCart(product.id)}
                  onOpen={() => onOpenProduct(product.id)}
                />
              ))}
            </div>

            <ListingBanner onClick={() => onToast('Выберите свой iPhone')} />

            <div className="grid grid-cols-2 gap-x-3 gap-y-5" data-name="Listing">
              {PRODUCTS.slice(LISTING_BANNER_AFTER).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={cart[product.id] ?? 0}
                  maxQuantity={99}
                  onAdd={() => onAddToCart(product.id, product.title)}
                  onRemove={() => onRemoveFromCart(product.id)}
                  onOpen={() => onOpenProduct(product.id)}
                />
              ))}
            </div>
          </div>
        </section>
        <SiteFooter onOpenCatalog={onOpenCatalog} />
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
