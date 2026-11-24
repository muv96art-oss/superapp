import { assets } from '../assets'

/** Цветной МТБанк — Figma 585:8622. Белый на баннере — Figma 391:77554. */
const COLOR_LAYERS = [
  { src: assets.logoBank1, inset: '34.42% 21.81% 22.06% 69.1%' },
  { src: assets.logoBank2, inset: '17.33% 31.51% 22.58% 58.19%' },
  { src: assets.logoBank3, inset: '21.03% 54.6% 23.33% 30.87%' },
  { src: assets.logoBank4, inset: '21.03% 42.38% 23.33% 46.62%' },
  { src: assets.logoBank5, inset: '34.91% 11.51% 23.33% 79.77%' },
  { src: assets.logoBank6, inset: '34.91% 0.28% 23.33% 90.12%' },
  { src: assets.logoBank7, inset: '0.01% 75.32% 43.52% 4.85%' },
  { src: assets.logoBank8, inset: '58.88% 77.46% 0.05% 0.43%' },
  { src: assets.logoBank9, inset: '31.09% 76.2% 23.33% 0' },
  { src: assets.logoBank10, inset: '8.94% 75.49% 33.03% 0' },
] as const

const WHITE_LAYERS = [
  { src: assets.vector1, inset: '34.43% 21.64% 22.06% 69.25%', mask: '-89.328px -10.672px' },
  { src: assets.vector2, inset: '17.29% 31.36% 22.58% 58.32%', mask: '-75.235px -5.36px' },
  { src: assets.vector3, inset: '21.04% 54.51% 23.34% 30.94%', mask: '-39.908px -6.521px' },
  { src: assets.vector4, inset: '21.04% 42.26% 23.34% 46.72%', mask: '-60.266px -6.521px' },
  { src: assets.vector5, inset: '34.92% 11.31% 23.34% 79.95%', mask: '-103.139px -10.827px' },
  { src: assets.vector6, inset: '34.92% 0.06% 23.34% 90.32%', mask: '-116.517px -10.827px' },
  { src: assets.vector7, inset: '0 75.26% 43.54% 4.87%', mask: '-6.277px 0px' },
  { src: assets.vector8, inset: '58.89% 77.41% 0.05% 0.44%', mask: '-0.563px -18.255px' },
  { src: assets.vector9, inset: '31.1% 76.15% 23.33% 0', mask: '0px -9.641px' },
  { src: assets.vector10, inset: '8.94% 75.43% 33.02% 0', mask: '0px -2.772px' },
] as const

export function LogoBank({
  className = 'h-[44px] w-[130px]',
  tone = 'color',
}: {
  className?: string
  tone?: 'color' | 'white'
}) {
  if (tone === 'white') {
    return (
      <div className={`relative shrink-0 ${className}`} data-node-id="391:77554" data-name="Logo Bank" aria-label="МТБанк">
        <div className="absolute top-[15.91%] bottom-[13.64%] left-[calc(50%+0.5px)] aspect-[1369/330] -translate-x-1/2 overflow-hidden">
          {WHITE_LAYERS.map((layer) => (
            <div
              key={layer.src}
              className="absolute"
              style={{
                inset: layer.inset,
                maskImage: `url("${assets.vectorMask}")`,
                WebkitMaskImage: `url("${assets.vectorMask}")`,
                maskSize: '128.921px 30.986px',
                WebkitMaskSize: '128.921px 30.986px',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: layer.mask,
                WebkitMaskPosition: layer.mask,
              }}
            >
              <img alt="" src={layer.src} className="absolute inset-0 block size-full max-w-none" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`relative shrink-0 ${className}`} data-node-id="585:8622" data-name="Logo Bank" aria-label="МТБанк">
      <div className="absolute top-[calc(50%+0.5px)] right-[0.38%] left-[0.38%] aspect-[649/156] -translate-y-1/2 overflow-hidden">
        {COLOR_LAYERS.map((layer) => (
          <div key={layer.src} className="absolute" style={{ inset: layer.inset }}>
            <img alt="" src={layer.src} className="absolute inset-0 block size-full max-w-none" />
          </div>
        ))}
      </div>
    </div>
  )
}
