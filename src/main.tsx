import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './Styles/variables.css'
import App from './Components/App.tsx'
import { ThemeProvider } from './assets/ThemeContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
