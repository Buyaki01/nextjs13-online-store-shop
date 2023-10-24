import StyledComponentsRegistry from "@/lib/registry"
import GlobalStyles from "@/styles/GlobalStyles"
import './globals.css'
import { CartContextProvider } from "./components/CartContext"

export const metadata = {
  title: 'Ecommerce Retail Store',
  description: 'Created by Ritta Sweta',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartContextProvider>
          <StyledComponentsRegistry>
            <GlobalStyles />
            {children}
          </StyledComponentsRegistry>
        </CartContextProvider>
      </body>
    </html>
  )
}
