import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './fonts.css'
import './widerLayout.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Routes'
import { AuthContextProvider } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'
import { Toaster } from 'react-hot-toast'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <Toaster />
      <LanguageProvider>
        <RouterProvider router={router} />
      </LanguageProvider>
    </AuthContextProvider>
  </StrictMode>,
)
