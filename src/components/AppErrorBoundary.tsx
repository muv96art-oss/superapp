import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { error: Error | null }

/** Prevents a single runtime crash from leaving Safari on a blank white page. */
export class AppErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('App crashed', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-white p-6 text-center">
          <p className="font-inter text-[18px] font-semibold text-text-primary">
            Не удалось открыть прототип
          </p>
          <p className="max-w-sm font-inter text-[13px] leading-5 text-text-secondary">
            {this.state.error.message}
          </p>
          <button
            type="button"
            className="rounded-xl bg-fill-brand px-4 py-2 text-[14px] font-medium text-white"
            onClick={() => window.location.reload()}
          >
            Обновить
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
