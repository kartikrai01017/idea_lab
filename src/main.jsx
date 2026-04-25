import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDom from 'react-dom/client'
import App from './App.jsx'
import './styles/main.css' // This imports themes.css internally
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
