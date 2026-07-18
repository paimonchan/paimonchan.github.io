/**
 * ErrorBoundary — top-level React error boundary.
 *
 * Class component because React still requires getDerivedStateFromError /
 * componentDidCatch to live on a class. Catches render errors in the subtree
 * and shows a themed fallback instead of a blank white screen.
 */
import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}
interface State {
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ErrorBoundary]', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-ink-950 p-6 text-center">
          <div className="max-w-md">
            <div className="mb-3 text-4xl">⚠️</div>
            <h1 className="mb-2 font-display text-lg font-600 text-ink-50">Something went wrong</h1>
            <p className="mb-4 text-sm text-ink-400">
              The gateway hit an unexpected error while rendering.
            </p>
            <pre className="mb-4 max-h-40 overflow-auto rounded-lg border border-red-500/30 bg-red-500/5 p-3 text-left font-mono text-xs text-red-300">
              {String(this.state.error?.message || this.state.error)}
            </pre>
            <button
              onClick={() => this.setState({ error: null })}
              className="rounded-lg border border-ink-700 bg-ink-800 px-4 py-2 text-sm font-500 text-ink-100 transition-colors hover:border-honey-500/50 hover:text-honey-200"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
