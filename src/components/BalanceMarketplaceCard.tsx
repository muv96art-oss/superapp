import { ShaderFill } from '@figma/expressive-components'
import { assets } from '../assets'
import {
  halvaCardMeshParams,
  manifest as meshManifest,
  render as meshRender,
  setup as meshSetup,
} from '../lib/meshGradientShader'

type Props = {
  /** When set — Figma Variant3 balance (672:9429); omit for unissued + issue CTA overlay */
  balance?: string
  className?: string
  /** Outer size — Balance 311×187; application page 287×173 (716:12796) */
  width?: number
  height?: number
}

/** Marketplace card — Figma 672:9410 (Variant3) / instance 311×187 on Balance */
export function BalanceMarketplaceCard({
  balance,
  className,
  width = 311,
  height = 187,
}: Props) {
  return (
    <div
      className={['relative overflow-hidden rounded-[24px]', className]
        .filter(Boolean)
        .join(' ')}
      style={{ width, height }}
      data-node-id="672:9410"
      data-name="Card"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[24px]">
        <div className="absolute inset-0 rounded-[24px] bg-white" />
        <ShaderFill
          className="absolute inset-0 rounded-[24px] opacity-40"
          width={width}
          height={height}
          shader={{
            setup: meshSetup,
            render: meshRender,
            params: halvaCardMeshParams,
            manifest: meshManifest,
          }}
        />
      </div>

      <img
        alt=""
        src={assets.balanceCardEllipse}
        className="pointer-events-none absolute inset-[-41.04%_-22.65%_42.77%_63.41%] max-w-none"
        data-node-id="672:9411"
      />

      <div
        className="absolute inset-x-0 bottom-0 h-[14px] bg-gradient-to-r from-[#7c36d6] to-[#e4b3ff]"
        data-node-id="672:9412"
      />

      <div
        className="absolute inset-[71.68%_69.69%_13.87%_3.48%]"
        data-node-id="672:9413"
        data-name="Visa"
      >
        <img
          alt=""
          src={assets.balanceVisaWhite}
          className="absolute inset-0 size-full max-w-none object-contain object-left"
        />
      </div>

      <p
        className="absolute top-[14px] left-[14px] font-inter text-[14px] font-black leading-5 whitespace-nowrap text-text-primary"
        data-node-id="672:9414"
      >
        MARKETPLACE
      </p>

      {balance != null ? (
        <div
          className="absolute top-[14px] right-[14px] flex items-center justify-end gap-1"
          data-node-id="672:9429"
        >
          <p
            className="shrink-0 text-right font-inter text-[14px] font-semibold leading-5 text-text-primary"
            data-node-id="672:9428"
          >
            {balance}
          </p>
          <span
            className="relative flex size-4 shrink-0 items-center justify-center"
            data-node-id="672:9457"
            data-name="Icon"
          >
            <img
              alt=""
              src={assets.balanceBynIcon}
              width={10}
              height={12}
              className="h-3 w-2.5 max-w-none object-contain"
              data-node-id="672:9437"
            />
          </span>
        </div>
      ) : null}
    </div>
  )
}
