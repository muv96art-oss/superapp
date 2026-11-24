type Tile = {
  id: string
  label: string
  iconSrc: string
  nodeId?: string
}

type Props = {
  title: string
  tiles: readonly Tile[]
  /** Outer section node — Figma 716:8577 / 716:8578 / 716:8793 */
  nodeId: string
  onTileClick?: (id: string, label: string) => void
}

/** Action tiles block — Figma Перевести / Оплатить / Шаблоны */
export function BalanceActionSection({
  title,
  tiles,
  nodeId,
  onTileClick,
}: Props) {
  return (
    <section
      className="flex w-full shrink-0 flex-col items-center gap-2.5"
      data-node-id={nodeId}
    >
      <div className="flex w-full items-center justify-center" data-name="Title">
        <p className="min-w-0 flex-1 font-montserrat text-[20px] font-bold leading-[26px] text-text-primary">
          {title}
        </p>
      </div>

      {/*
        Figma 716:8581 — overflow-clip on card edge; tiles start at x=24 and
        paint through the right padding so they clip at the section border.
      */}
      <div
        className="relative w-full overflow-hidden rounded-3xl bg-white py-6"
        data-name="Карточка перевода"
      >
        <div
          className="flex w-full items-stretch gap-1 overflow-x-auto px-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          data-name="Быстрые получатели"
        >
          {tiles.map((tile) => (
            <button
              key={tile.id}
              type="button"
              onClick={() => onTileClick?.(tile.id, tile.label)}
              className="flex h-[110px] w-[calc((100%-8px)/3)] shrink-0 flex-col items-start justify-between overflow-hidden rounded-2xl bg-surface-secondary p-2 text-left"
              data-node-id={tile.nodeId}
              data-name={tile.label}
              aria-label={tile.label}
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#e0edff]">
                <img
                  alt=""
                  src={tile.iconSrc}
                  width={24}
                  height={24}
                  className="size-6 max-w-none"
                />
              </span>
              <p className="w-full font-inter text-[12px] font-semibold leading-4 text-text-primary">
                {tile.label}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
