import StyledComponentsRegistry from "@/lib/registry"
import GlobalStyles from "@/styles/GlobalStyles"
import './globals.css'
import CartContextProvider from "./components/CartContext"
import { AuthProvider } from "./Providers"

export const metadata = {
  title: 'Online Store Shop',
  description: 'Created by Ritta Sweta',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartContextProvider>
            <StyledComponentsRegistry>
              <GlobalStyles />
              {children}
            </StyledComponentsRegistry>
          </CartContextProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
