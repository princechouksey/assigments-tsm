import React from 'react'
import { ThemeProvider } from './ThemeProvider'
import Home from './Home'

const App = () => {
  return (
    <div>
       <ThemeProvider>
      <Home />
      </ThemeProvider>
    </div>
  )
}

export default App