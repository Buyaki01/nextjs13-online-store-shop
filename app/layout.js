import './globals.css'
import CartContextProvider from "./components/CartContext"
import { AuthProvider } from "./Providers"
import { Toaster } from "react-hot-toast"
import Footer from './components/Footer'
import Header from './components/Header'

export const metadata = {
  title: 'Online Store Shop',
  description: 'Created by Ritta Sweta',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body> 
        <Toaster position="top-left" />
        <AuthProvider>
          <CartContextProvider>
            <Header />
            {children}
          </CartContextProvider>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  )
}
