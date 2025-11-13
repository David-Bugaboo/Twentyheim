import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded border border-red-500/40 bg-red-900/10 p-6 text-center text-red-200">
          <h2 className="text-lg font-semibold">Algo deu errado.</h2>
          <p className="text-sm text-red-300">
            {this.state.error?.message ?? "Ocorreu um erro inesperado ao renderizar esta seção."}
          </p>
          <button
            type="button"
            onClick={this.handleRetry}
            className="rounded border border-red-400/60 bg-transparent px-4 py-2 text-sm font-semibold uppercase tracking-wide text-red-200 transition hover:border-red-300 hover:bg-red-900/20"
          >
            Tentar novamente
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
