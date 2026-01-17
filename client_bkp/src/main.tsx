import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { ThemeProvider } from './components/theme-provider'
import '@/index.css'
import { Toaster } from './components/ui/toaster'
import RoutesConfig from '@/routes/router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <RoutesConfig />
      <Toaster />
    </ThemeProvider>
  </StrictMode>
)
