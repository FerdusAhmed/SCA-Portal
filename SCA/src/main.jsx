import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './Router/RootRouter.jsx'
import AuthProvider from './AuthContext/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);