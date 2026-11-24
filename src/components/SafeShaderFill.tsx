import { Component, type ErrorInfo, type ReactNode, useState } from 'react'
import { ShaderFill } from '@figma/expressive-components'
import type { ComponentProps } from 'react'

type ShaderFillProps = ComponentProps<typeof ShaderFill>

type Props = ShaderFillProps & {
  /** Shown when WebGPU is unavailable or ShaderFill throws (Safari etc.) */
  fallbackClassName?: string
}

function supportsWebGpu() {
  return typeof navigator !== 'undefined' && 'gpu' in navigator && navigator.gpu != null
}

class ShaderErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('ShaderFill failed; using CSS fallback', error, info)
  }

  render() {
    if (this.state.failed) return this.props.fallback
    return this.props.children
  }
}

/**
 * ShaderFill with Safari-safe path: no WebGPU → CSS mesh fallback, never blank the app.
 */
export function SafeShaderFill({
  fallbackClassName = 'absolute inset-0 opacity-40',
  className,
  ...props
}: Props) {
  const [enabled] = useState(supportsWebGpu)

  const fallback = (
    <div
      aria-hidden
      className={fallbackClassName}
      style={{
        background: `
          radial-gradient(120% 80% at 0% 0%, #ff6b6b 0%, transparent 55%),
          radial-gradient(100% 80% at 100% 0%, #ffd166 0%, transparent 50%),
          radial-gradient(90% 90% at 0% 100%, #d69ae0 0%, transparent 55%),
          radial-gradient(110% 90% at 100% 100%, #1290b3 0%, #d69ae0 45%, transparent 70%),
          #ffffff
        `,
      }}
    />
  )

  if (!enabled) return fallback

  return (
    <ShaderErrorBoundary fallback={fallback}>
      <ShaderFill className={className} {...props} />
    </ShaderErrorBoundary>
  )
}
