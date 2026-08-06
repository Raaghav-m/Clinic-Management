import { Component, type ErrorInfo, type ReactNode } from 'react'

import { ErrorState } from '@/components/common/ErrorState'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled application error:', error, info)
  }

  private handleRetry = () => {
    this.setState({ hasError: false })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-svh items-center justify-center p-6">
          <ErrorState
            title="Something went wrong"
            message="An unexpected error occurred. Reload the page to try again."
            onRetry={this.handleRetry}
            className="max-w-lg"
          />
        </div>
      )
    }

    return this.props.children
  }
}
