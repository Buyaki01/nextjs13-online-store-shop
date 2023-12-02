'use client'

import Link from "next/link"
import CartIcon from "./CartIcon"
import { useContext } from "react"
import { CartContext } from "./CartContext"
import UserMenu from "./UserMenu"
import Logo from "./Logo"
import SearchInput from "./SearchInput"
import Nav from "./Nav"
import { useMediaQuery } from "react-responsive"

const Header = ({children}) => {
  const isSmallScreen = useMediaQuery({ maxDeviceWidth: 992 })

  return (
    <header className="w-full">
      {isSmallScreen 
        ? (
            <div className="bg-secondary text-white py-2 px-1">
              <div className="flex justify-between">
                <Logo />
                <Nav />
              </div>
    
              <div className="flex justify-center mt-3">
                <SearchInput />
              </div>
            </div>
          ) 
        : (
          <div className="bg-secondary text-white flex justify-between items-center px-4 py-2">
            <Logo />
            <SearchInput />  
            <Nav />
          </div>
      )
        
      }

      {children}
    </header>
  )
}

export default Header