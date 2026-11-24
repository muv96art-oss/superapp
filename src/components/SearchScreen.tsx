import { useEffect, useMemo, useState } from 'react'
import { assets } from '../assets'
import {
  PRODUCTS,
  SEARCH_CATEGORIES,
  SEARCH_CHIPS,
  SEARCH_PRODUCTS,
  SEARCH_QUERIES,
  SEARCH_SUGGESTION_TO_PRODUCT,
} from '../data'
import { ProductCard } from './ProductCard'
import { SiteFooter } from './SiteFooter'
import { StatusBar } from './StatusBar'

type Props = {
  onCancel: () => void
  onOpenProduct: (id: string) => void
  cart: Record<string, number>
  onAddToCart: (id: string, title: string) => void
  onRemoveFromCart: (id: string) => void
  onOpenCatalog?: () => void
  initialQuery?: string
}

function highlightMatch(text: string, query: string) {
  const q = query.trim().toLowerCase()
  if (!q || !text.toLowerCase().startsWith(q)) {
    return <span>{text}</span>
  }
  return (
    <>
      <span className="font-semibold">{text.slice(0, q.length)}</span>
      <span>{text.slice(q.length)}</span>
    </>
  )
}

export function SearchScreen({
  onCancel,
  onOpenProduct,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onOpenCatalog,
  initialQuery = '',
}: Props) {
  const [query, setQuery] = useState(initialQuery)
  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])
  const q = query.trim().toLowerCase()
  const hasQuery = q.length > 0

  const chips = useMemo(() => {
    if (!hasQuery) return SEARCH_CHIPS
    return SEARCH_CHIPS.filter((chip) => chip.toLowerCase().includes(q))
  }, [hasQuery, q])

  const suggestions = useMemo(() => {
    if (!hasQuery) return []
    const pool = [...SEARCH_QUERIES, ...SEARCH_PRODUCTS]
    const matched = pool.filter((item) => item.toLowerCase().includes(q))
    const seen = new Set<string>()
    return matched
      .sort((a, b) => a.length - b.length)
      .filter((item) => {
        const key = item.toLowerCase()
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
      .slice(0, 6)
  }, [hasQuery, q])

  const productResults = useMemo(() => {
    if (!hasQuery) return []
    return PRODUCTS.filter((product) => product.title.toLowerCase().includes(q))
  }, [hasQuery, q])

  const categories = useMemo(() => {
    if (!hasQuery) return SEARCH_CATEGORIES
    return SEARCH_CATEGORIES.filter((item) => item.title.toLowerCase().includes(q))
  }, [hasQuery, q])

  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden bg-bg-base"
      data-node-id="462:3304"
      data-name="Search"
    >
      <StatusBar />

      <header
        className="relative z-20 shrink-0 rounded-b-[20px] bg-bg-base pb-4 shadow-[0px_10px_3px_0px_rgba(214,214,214,0),0px_7px_3px_0px_rgba(214,214,214,0.01),0px_4px_2px_0px_rgba(214,214,214,0.05),0px_2px_2px_0px_rgba(214,214,214,0.09),0px_0px_1px_0px_rgba(214,214,214,0.1)]"
        data-name="HeaderMobile"
      >
        <div className="flex items-center gap-2 px-4 pt-[52px]">
          <label className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-xl bg-secondary-light p-2">
            <img
              alt=""
              width={25}
              height={25}
              src={assets.searchBrand}
              className="size-[25px] shrink-0"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-w-0 flex-1 border-0 bg-transparent text-[16px] font-normal leading-6 text-basic-primary outline-none ring-0 focus:outline-none focus:ring-0"
              aria-label="Поиск"
              autoCapitalize="off"
              autoCorrect="off"
              enterKeyHint="search"
            />
          </label>
          <button
            type="button"
            onClick={onCancel}
            className="shrink-0 rounded-md px-2 py-1.5 text-[14px] font-semibold leading-5 text-fill-brand"
          >
            Отменить
          </button>
        </div>
      </header>

      <main className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-4 pb-6 scrollbar-hide">
        {chips.length > 0 ? (
          <div className="flex flex-wrap gap-2 py-3" data-name="ChipsGroup">
            {chips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setQuery(chip)}
                className="inline-flex h-[42px] items-center justify-center rounded-[20px] bg-secondary-light px-4 text-[16px] font-medium leading-6 text-basic-primary"
              >
                {chip}
              </button>
            ))}
          </div>
        ) : null}

        {suggestions.length > 0 ? (
          <ul className="flex flex-col" aria-label="Подсказки поиска">
            {suggestions.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => {
                    const productId = SEARCH_SUGGESTION_TO_PRODUCT[item]
                    if (productId) {
                      onOpenProduct(productId)
                      return
                    }
                    setQuery(item)
                  }}
                  className="flex w-full items-start gap-2 py-[13px] text-left"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white bg-[rgba(245,245,248,0.8)] p-2">
                    <img
                      alt=""
                      width={16}
                      height={16}
                      src={assets.searchSuggest}
                      className="size-4"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="min-w-0 pt-0.5 text-[16px] font-normal leading-6 text-basic-primary">
                    {highlightMatch(item, query)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        {productResults.length > 0 ? (
          <section className="pt-2" aria-label="Товары">
            <h2 className="py-2.5 text-[14px] font-medium leading-5 text-basic-secondary">Товары</h2>
            <div className="grid grid-cols-2 gap-x-3 gap-y-5 pb-4">
              {productResults.map((product) => (
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
          </section>
        ) : null}

        {categories.length > 0 ? (
          <section className="pt-1">
            <h2 className="py-2.5 text-[14px] font-medium leading-5 text-basic-secondary">Категории</h2>
            <ul className="flex flex-col">
              {categories.map((category) => (
                <li key={category.title}>
                  <button
                    type="button"
                    onClick={() => setQuery(category.title)}
                    className="flex w-full items-start gap-2 py-3.5 text-left"
                  >
                    <span className="relative size-11 shrink-0 overflow-hidden rounded-lg border border-white bg-[rgba(245,245,248,0.8)]">
                      {'image' in category && category.image ? (
                        <img
                          alt=""
                          src={category.image}
                          className="absolute inset-[-8px] size-[60px] max-w-none object-contain"
                          draggable={false}
                        />
                      ) : null}
                      {'images' in category && category.images?.length === 4 ? (
                        <>
                          <img
                            alt=""
                            src={category.images[0]}
                            className="absolute -left-2 top-2 size-14 object-contain opacity-90"
                            draggable={false}
                          />
                          <img
                            alt=""
                            src={category.images[2]}
                            className="absolute -right-3 -top-1 size-16 object-contain"
                            draggable={false}
                          />
                          <img
                            alt=""
                            src={category.images[1]}
                            className="absolute left-2 top-2 size-10 object-contain"
                            draggable={false}
                          />
                          <img
                            alt=""
                            src={category.images[3]}
                            className="absolute bottom-0 right-1 size-9 object-contain"
                            draggable={false}
                          />
                        </>
                      ) : null}
                      {'images' in category && category.images?.length === 2 ? (
                        <>
                          <img
                            alt=""
                            src={category.images[0]}
                            className="absolute left-[20%] top-0 h-11 w-10 object-cover"
                            draggable={false}
                          />
                          <img
                            alt=""
                            src={category.images[1]}
                            className="absolute bottom-0 left-[10%] h-9 w-5 object-cover"
                            draggable={false}
                          />
                        </>
                      ) : null}
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="text-[16px] font-normal leading-6 text-basic-primary">
                        {highlightMatch(category.title, query)}
                      </span>
                      <span className="text-[14px] font-normal leading-5 text-basic-secondary">
                        {category.path}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        <SiteFooter className="-mx-4" onOpenCatalog={onOpenCatalog} />
      </main>
    </div>
  )
}
