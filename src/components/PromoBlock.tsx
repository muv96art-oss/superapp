import { HOME_CATEGORIES, PROMO_CATEGORIES, type ListingCategoryId } from '../data'
import { useDragScroll } from '../hooks/useDragScroll'

type Props = {
  onOpenCategoryListing?: (id: ListingCategoryId) => void
}

export function PromoBlock({ onOpenCategoryListing }: Props) {
  const promoScroll = useDragScroll<HTMLDivElement>()

  return (
    <div className="flex w-full flex-col gap-6" data-node-id="391:77222">
      {/* Categories 2×2 — Figma 445:111855; MainBannersLine hidden in prototype */}
      <div
        className="grid w-full grid-cols-2 gap-x-3 gap-y-4"
        data-node-id="445:111855"
        data-name="Categories"
      >
        {HOME_CATEGORIES.map((category) => (
          <button
            key={category.title}
            type="button"
            onClick={() => onOpenCategoryListing?.(category.listingId)}
            className="flex w-full flex-col items-center gap-2 text-center"
            aria-label={category.title}
            data-name={`Category / ${category.title}`}
          >
            <div className="relative h-[118px] w-full max-w-[161px]" data-name="Media">
              <div
                className="absolute left-0 top-12 h-[70px] w-full rounded-[35px] bg-[#ececee]"
                data-name="Pill"
                aria-hidden
              />
              <img
                alt=""
                width={120}
                height={120}
                src={category.image}
                className="pointer-events-none absolute left-1/2 top-1.5 size-[120px] max-w-none -translate-x-1/2 object-contain"
                draggable={false}
                loading="lazy"
              />
            </div>
            <span className="w-full text-[13px] font-medium leading-4 text-[#0d0d0d]">
              {category.title}
            </span>
          </button>
        ))}
      </div>

      <div
        ref={promoScroll.ref}
        className="scrollbar-hide -mx-5 flex cursor-grab gap-2 overflow-x-auto px-5 select-none touch-pan-y"
        style={{ touchAction: 'pan-y' }}
        data-node-id="391:77248"
        data-name="Promo"
      >
        {PROMO_CATEGORIES.map((promo) => {
          const hasOverlay = 'overlayImage' in promo && promo.overlayImage
          const fadeTo = promo.fadeTo
          const backgroundSize =
            'backgroundSize' in promo && promo.backgroundSize ? promo.backgroundSize : undefined

          return (
            <button
              key={promo.title}
              type="button"
              className="relative flex h-[178px] w-[140px] shrink-0 flex-col items-start overflow-hidden rounded-xl px-3 py-2 text-left"
              aria-label={promo.title.replace(/\n/g, ' ')}
              data-name="Promo Categorie Banner"
              data-node-id={hasOverlay ? '654:8702' : undefined}
            >
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-xl">
                {backgroundSize ? (
                  <div
                    className="absolute inset-0 rounded-xl bg-left-top bg-no-repeat"
                    style={{
                      backgroundImage: `url(${promo.image})`,
                      backgroundSize,
                    }}
                  />
                ) : (
                  <img
                    alt=""
                    width={140}
                    height={178}
                    src={promo.image}
                    className="absolute size-full rounded-xl object-cover"
                    style={
                      'objectPosition' in promo && typeof promo.objectPosition === 'string'
                        ? { objectPosition: promo.objectPosition }
                        : undefined
                    }
                    loading="lazy"
                    draggable={false}
                  />
                )}
                {hasOverlay ? (
                  <div className="absolute inset-0 overflow-hidden rounded-xl">
                    <img
                      alt=""
                      width={178}
                      height={178}
                      src={promo.overlayImage}
                      className="absolute left-[-5.87%] top-[21.56%] h-full w-[127.14%] max-w-none"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                ) : null}
                {fadeTo ? (
                  <div
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: `linear-gradient(to bottom, var(--color-fill-brand-loud) 0%, rgba(27,116,253,0) ${fadeTo})`,
                    }}
                  />
                ) : null}
              </div>
              <p className="relative z-10 w-full overflow-hidden text-ellipsis whitespace-pre-line text-[12px] font-semibold leading-4 text-white">
                {promo.title}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
