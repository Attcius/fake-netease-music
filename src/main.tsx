import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/reset.less'
import './index.less'
import AppRouter from './router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)