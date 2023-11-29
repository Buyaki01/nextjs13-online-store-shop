'use client'

import Link from "next/link"
import CartIcon from "./CartIcon"
import { useContext } from "react"
import { CartContext } from "./CartContext"
import UserMenu from "./UserMenu"

const Header = ({children}) => {
  const { cartProducts } = useContext(CartContext)
  const totalQuantity = cartProducts.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="bg-secondary text-white flex justify-between items-center px-4 py-2 w-full">
      <Link 
        href={'/'}
        className="no-underline text-white whitespace-nowrap text-5xl"
      >
        Pearls Collections
      </Link>

      <div className="relative inline-flex items-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor"
          className="w-8 h-8 absolute left-3 text-gray-500 py-2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>

        <input 
          type="text" 
          placeholder="Search products and categories"
          className="px-4 py-2 pl-10 border-2 border-gray-300 rounded mr-2 w-72 mb-0"
        />
        <button
          className="bg-primary text-white px-4 py-2"
        >
          Search
        </button>
      </div>

      <nav className="flex items-center gap-4">
        <Link className="navLinks" href={'/cart'}>
          <CartIcon/>
          {totalQuantity > 0 && 
            <span
              className="bg-primary text-white px-1 text-center rounded-full text-xs absolute top-0 right-10 z-10"
            >
              {totalQuantity}
            </span>}Cart
        </Link>
        <UserMenu />
      </nav>

      {children}
    </header>
  )
}

export default Header