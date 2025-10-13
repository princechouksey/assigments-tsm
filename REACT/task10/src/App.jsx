import React from 'react'
import ErrorBoundries from './ErrorBoundries'
import ErrorBoundary from '../../reacthookform/src/errors'

const App = () => {
  return (
    <div>
      <ErrorBoundary>
        <ErrorBoundries />
      </ErrorBoundary>
    </div>
  )
}

export default App 