import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
          <div className="max-w-lg w-full bg-white shadow-lg rounded-2xl p-8 text-center border border-red-200">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              ⚠️ Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">
              We're sorry, an unexpected error occurred. Please try refreshing
              the page or contact support if the issue persists.
            </p>

            <h1 className="text-sm text-gray-500 bg-gray-50 rounded-lg p-4 mb-6 text-left">
              {this.state.error && this.state.error.toString()}
            </h1>

            <button
              onClick={this.handleReload}
              className="px-6 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-all shadow-md"
            >
              🔄 Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
