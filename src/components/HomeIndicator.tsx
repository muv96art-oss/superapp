type Props = {
  className?: string
}

/** iOS Home Indicator — Figma 608:8906 */
export function HomeIndicator({ className = '' }: Props) {
  return (
    <div
      className={`pointer-events-none h-[34px] w-full shrink-0 ${className}`}
      data-node-id="608:8906"
      data-name="Home Indicator"
      aria-hidden="true"
    >
      <div
        className="absolute bottom-2 left-1/2 h-[5px] w-[131px] -translate-x-1/2 rounded-[100px] bg-text-primary opacity-90"
        data-name="Home Indicator"
      />
    </div>
  )
}
