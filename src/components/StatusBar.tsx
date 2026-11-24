type Props = {
  /** `dark` — тёмные иконки на светлом фоне; `light` — светлые на тёмном hero */
  tone?: 'dark' | 'light'
}

function CellularIcon() {
  return (
    <svg
      width={16}
      height={11}
      viewBox="0 0 15.9004 10.667"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
      aria-hidden="true"
    >
      <path
        d="M10.5996 2.33398C11.1519 2.33398 11.5996 2.7817 11.5996 3.33398V9.66699C11.5996 10.2193 11.1519 10.667 10.5996 10.667H9.59961C9.04732 10.667 8.59961 10.2193 8.59961 9.66699V3.33398C8.59961 2.7817 9.04732 2.33398 9.59961 2.33398H10.5996ZM14.9004 0C15.4527 0 15.9004 0.447715 15.9004 1V9.66699C15.9002 10.2191 15.4526 10.667 14.9004 10.667H13.9004C13.3482 10.667 12.9006 10.2191 12.9004 9.66699V1C12.9004 0.447715 13.3481 0 13.9004 0H14.9004ZM2 6.66602C2.55228 6.66602 3 7.11373 3 7.66602V9.66602C3 10.2183 2.55228 10.666 2 10.666H1C0.447715 10.666 0 10.2183 0 9.66602V7.66602C0 7.11373 0.447715 6.66602 1 6.66602H2ZM6.2998 4.66602C6.85209 4.66602 7.2998 5.11373 7.2998 5.66602V9.66602C7.2998 10.2183 6.85209 10.666 6.2998 10.666H5.2998C4.74752 10.666 4.2998 10.2183 4.2998 9.66602V5.66602C4.2998 5.11373 4.74752 4.66602 5.2998 4.66602H6.2998Z"
        fill="currentColor"
      />
    </svg>
  )
}

function WifiIcon() {
  return (
    <svg
      width={15}
      height={11}
      viewBox="0 0 15.333 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
      aria-hidden="true"
    >
      <path
        d="M5.44824 8.42676C6.7289 7.34449 8.60508 7.34449 9.88574 8.42676C9.95009 8.48497 9.98748 8.56758 9.98926 8.6543C9.99092 8.74093 9.95644 8.82406 9.89453 8.88477L7.88965 10.9072C7.83087 10.9666 7.7506 11 7.66699 11C7.5834 11 7.5031 10.9666 7.44434 10.9072L5.43848 8.88477C5.37688 8.82407 5.34303 8.74072 5.34473 8.6543C5.34656 8.56762 5.3839 8.48492 5.44824 8.42676ZM2.77246 5.72949C5.5315 3.16537 9.80436 3.1655 12.5635 5.72949C12.6257 5.78958 12.6612 5.87252 12.6621 5.95898C12.663 6.04552 12.6294 6.12904 12.5684 6.19043L11.4092 7.36035C11.2898 7.47981 11.0972 7.48241 10.9746 7.36621C10.0685 6.54644 8.88934 6.0927 7.66699 6.09277C6.44552 6.09328 5.26775 6.54707 4.3623 7.36621C4.23975 7.48256 4.04622 7.47986 3.92676 7.36035L2.76855 6.19043C2.70738 6.12913 2.67301 6.04555 2.67383 5.95898C2.67472 5.87252 2.7102 5.78956 2.77246 5.72949ZM0.0966797 3.03906C4.32849 -1.01301 11.0044 -1.01285 15.2363 3.03906C15.2976 3.09926 15.3325 3.18173 15.333 3.26758C15.3334 3.35334 15.2997 3.43622 15.2393 3.49707L14.0791 4.66699C13.9595 4.78709 13.765 4.78817 13.6436 4.66992C12.0312 3.13852 9.89158 2.28428 7.66699 2.28418C5.4421 2.28419 3.30199 3.13829 1.68945 4.66992C1.56817 4.78829 1.3744 4.7871 1.25488 4.66699L0.09375 3.49707C0.0333193 3.43619 -0.000480886 3.35331 0 3.26758C0.000565275 3.18173 0.0353775 3.09922 0.0966797 3.03906Z"
        fill="currentColor"
      />
    </svg>
  )
}

/** Unified iOS status bar — Figma iPhone X 8:5116 / Right 8:5117 (88×46) */
export function StatusBar({ tone = 'dark' }: Props) {
  const colorClass = tone === 'light' ? 'text-white' : 'text-text-primary'

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-0 z-50 h-[46px] w-full ${colorClass}`}
      data-node-id="8:5116"
      data-name="StatusBar"
      aria-hidden="true"
    >
      <p className="absolute left-[21px] top-[14px] w-[54px] text-center text-[15px] font-semibold leading-none tracking-[-0.3px]">
        9:41
      </p>

      {/* Figma Right frame: flush right, 88×48 — icon offsets measured from file */}
      <div className="absolute right-0 top-0 h-[46px] w-[88px]" data-name="Right">
        <div className="absolute left-[4px] top-[18px] size-[16px] overflow-visible" data-name="Cellular Connection">
          <CellularIcon />
        </div>
        <div className="absolute left-[26px] top-[18px] h-[11px] w-[15px] overflow-visible" data-name="Wifi">
          <WifiIcon />
        </div>
        <div
          className="absolute left-[46.5px] top-[18px] h-[11px] w-[24.5px]"
          data-name="Battery"
        >
          <div className="absolute left-0 top-0 h-[11px] w-[22px] rounded-[3px] border border-current opacity-35" />
          <div className="absolute left-[2px] top-[2px] h-[7px] w-[18px] rounded-[1.5px] bg-current" />
          <svg
            width={2}
            height={4}
            viewBox="0 0 1.32804 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-[23px] top-[3.5px]"
            aria-hidden="true"
          >
            <path
              opacity="0.4"
              d="M0 0V4C0.804731 3.66122 1.32804 2.87313 1.32804 2C1.32804 1.12687 0.804731 0.338777 0 0"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
