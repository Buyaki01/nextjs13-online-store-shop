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

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="min-h-screen"> 
        <Toaster position="top-left" />
        <AuthProvider>
          <CartContextProvider>
            <div className="flex flex-col min-h-full">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </CartContextProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout