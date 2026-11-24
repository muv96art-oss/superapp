type Props = {
  checked: boolean
  disabled?: boolean
  className?: string
}

/**
 * Toggle switch — FIG Marketplace 2243:5238
 * Variants: On/Off × Default/Hover/Disabled
 * Colors kept from Super App (fill-brand / fill-secondary)
 */
export function Switch({ checked, disabled = false, className = '' }: Props) {
  return (
    <span
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ease-out ${
        disabled
          ? checked
            ? 'bg-fill-brand/40'
            : 'bg-fill-secondary/50'
          : checked
            ? 'bg-fill-brand hover:brightness-95'
            : 'bg-fill-secondary hover:brightness-95'
      } ${disabled ? 'cursor-not-allowed' : ''} ${className}`}
      data-name="Toggle"
      data-node-id="2243:5238"
      data-on={checked ? 'True' : 'False'}
      data-state={disabled ? 'Disabled' : 'Default'}
      aria-hidden="true"
    >
      {/* Hover ring — Figma On+Hover expands ~46×26 */}
      <span
        className={`pointer-events-none absolute -inset-px rounded-full border-2 transition-opacity duration-200 ${
          checked && !disabled
            ? 'border-fill-brand/25 opacity-0 group-hover:opacity-100'
            : 'border-transparent opacity-0'
        }`}
      />
      <span
        className={`absolute top-0.5 size-5 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.12)] transition-transform duration-200 ease-out will-change-transform ${
          checked ? 'translate-x-[22px]' : 'translate-x-0.5'
        } ${disabled ? 'opacity-80' : ''}`}
      />
    </span>
  )
}
