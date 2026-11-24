import { useEffect, useRef, useState, type Ref } from 'react'
import { useDragScroll } from '../hooks/useDragScroll'

type Props = {
  items: readonly string[]
  onNavigate?: (label: string) => void
}

/** Collapses middle crumbs to /.../; expands on tap. Scroll focuses the last crumb. */
export function Breadcrumbs({ items, onNavigate }: Props) {
  const [expanded, setExpanded] = useState(false)
  const scroll = useDragScroll<HTMLElement>()
  const endRef = useRef<HTMLSpanElement>(null)
  const canCollapse = items.length > 2
  const collapsed = canCollapse && !expanded

  useEffect(() => {
    const track = scroll.ref.current
    const end = endRef.current
    if (!track || !end) return
    // Orient to the final crumb (right side)
    const pad = Number.parseFloat(getComputedStyle(track).paddingRight) || 0
    const left = end.offsetLeft + end.offsetWidth - track.clientWidth + pad
    track.scrollTo({ left: Math.max(0, left), behavior: expanded ? 'smooth' : 'auto' })
  }, [expanded, items, scroll.ref])

  return (
    <nav
      ref={scroll.ref}
      className="scrollbar-hide -mx-6 flex cursor-grab gap-1 overflow-x-auto px-6 py-4 text-[14px] font-medium leading-6 text-text-secondary select-none touch-pan-y"
      style={{ touchAction: 'pan-y' }}
      aria-label="Хлебные крошки"
    >
      {collapsed ? (
        <>
          <CrumbLabel label={items[0]} onNavigate={onNavigate} />
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="shrink-0 whitespace-nowrap px-0.5 text-text-secondary"
            aria-label="Показать полный путь"
          >
            /.../
          </button>
          <span
            ref={endRef}
            className="min-w-0 max-w-[58%] truncate whitespace-nowrap text-text-primary"
            title={items[items.length - 1]}
            aria-current="page"
          >
            {items[items.length - 1]}
          </span>
        </>
      ) : (
        items.map((crumb, index) => {
          const current = index === items.length - 1
          return (
            <span key={`${crumb}-${index}`} className="flex shrink-0 items-center gap-1 whitespace-nowrap">
              {index > 0 ? <span aria-hidden>/</span> : null}
              <CrumbLabel
                label={crumb}
                current={current}
                onNavigate={current ? undefined : onNavigate}
                endRef={current ? endRef : undefined}
              />
            </span>
          )
        })
      )}
    </nav>
  )
}

function CrumbLabel({
  label,
  current = false,
  onNavigate,
  endRef,
}: {
  label: string
  current?: boolean
  onNavigate?: (label: string) => void
  endRef?: Ref<HTMLSpanElement>
}) {
  const className = current
    ? 'min-w-0 whitespace-nowrap text-text-primary'
    : 'shrink-0 whitespace-nowrap text-left text-text-secondary'

  if (!onNavigate || current) {
    return (
      <span ref={endRef} className={className} aria-current={current ? 'page' : undefined}>
        {label}
      </span>
    )
  }

  return (
    <button type="button" onClick={() => onNavigate(label)} className={className}>
      {label}
    </button>
  )
}
