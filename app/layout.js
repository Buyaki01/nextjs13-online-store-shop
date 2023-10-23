import StyledComponentsRegistry from "@/lib/registry"
import GlobalStyles from "@/styles/GlobalStyles"
import './globals.css'

export const metadata = {
  title: 'Ecommerce Retail Store',
  description: 'Created by Ritta Sweta',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <GlobalStyles />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
