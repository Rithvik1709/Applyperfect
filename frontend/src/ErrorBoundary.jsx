import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, info: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    this.setState({ error, info })
    // You could also log to an external service here
    console.error('Unhandled error caught by ErrorBoundary', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
          <div className="max-w-3xl w-full bg-white border rounded-lg p-6 shadow">
            <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
            <p className="text-sm text-gray-700 mb-4">The application encountered an error. See details below.</p>
            <pre className="text-xs overflow-auto bg-gray-100 p-3 rounded text-red-700">{this.state.error && this.state.error.toString()}</pre>
            {this.state.info && <pre className="text-xs overflow-auto bg-gray-100 p-3 rounded mt-3">{this.state.info.componentStack}</pre>}
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
