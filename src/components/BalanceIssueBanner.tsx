import { ShaderFill } from '@figma/expressive-components'
import { assets } from '../assets'
import {
  halvaCardMeshParams,
  manifest as meshManifest,
  render as meshRender,
  setup as meshSetup,
} from '../lib/meshGradientShader'

type Props = {
  onClick?: () => void
}

/** Issue-card promo — Figma Halva 698:29990 */
export function BalanceIssueBanner({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative h-[72px] w-[327px] shrink-0 overflow-hidden rounded-[20px] bg-gradient-to-r from-[#4d1d63] to-[#f48ebd] px-6 py-4 text-left"
      data-node-id="698:29990"
      data-name="Halva"
      aria-label="Оформи карту и получи 3000 BYN на счет"
    >
      <div
        className="relative z-[1] flex w-[197px] items-center gap-3"
        data-node-id="698:29991"
        data-name="MTkard Info"
      >
        <p className="font-inter text-[14px] font-medium leading-5 text-white">
          Оформи карту и получи 3000 BYN на счет
        </p>
      </div>

      {/* Card — Figma 698:29995, rotate 22.25° */}
      <div
        className="pointer-events-none absolute left-[218px] top-2 flex h-[95.431px] w-[117.568px] items-center justify-center"
        data-node-id="698:29995"
      >
        <div className="flex-none rotate-[22.25deg]">
          <div
            className="relative h-[61.423px] w-[101.898px] overflow-hidden rounded-[8.521px]"
            data-name="Card"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[8.521px]">
              <div className="absolute inset-0 rounded-[8.521px] bg-white" />
              <ShaderFill
                className="absolute inset-0 rounded-[8.521px] opacity-40"
                width={102}
                height={61}
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
              className="absolute inset-[-41.04%_-22.65%_42.77%_63.41%] max-w-none"
              data-node-id="698:29996"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-[4.971px] bg-gradient-to-r from-[#7c36d6] to-[#e4b3ff]"
              data-node-id="698:29997"
            />
            <img
              alt=""
              src={assets.balanceVisaWhite}
              width={28.66}
              height={8.72}
              className="absolute bottom-[13.87%] left-[3.49%] h-[8.72px] w-[28.66px] max-w-none"
              data-node-id="698:29998"
            />
            <p
              className="absolute left-[4.97px] top-[4.97px] font-inter text-[4.971px] font-black leading-[7.101px] text-text-primary"
              data-node-id="698:29999"
            >
              MARKETPLACE
            </p>
          </div>
        </div>
      </div>
    </button>
  )
}
