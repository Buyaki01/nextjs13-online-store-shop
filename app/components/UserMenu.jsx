'use client'

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useCallback, useState } from "react"
import { AiFillCaretDown } from "react-icons/ai"
import BackDrop from "./BackDrop"
import { useMediaQuery } from "react-responsive"

const UserMenu = () => {
  const isSmallScreen = useMediaQuery({ maxDeviceWidth: 992 })

  const { data: session } = useSession()

  const [isOpen, setIsOpen] = useState(false)

  // useCallback is used in this case to create a memoized event handler function that remains constant between renders, reducing unnecessary re-renders of components that use this function as an event handler.
  // Common use cases include memoizing event handlers, like click or change handlers, to prevent child components from re-rendering when the parent component re-renders.
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  return (
    <>
      <div className="relative z-30">
        {session?.user && session?.user?.name
          ? <div onClick={toggleOpen}>  
              <div className="navLinks avatar" href={'/account'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                </svg>
                {!isSmallScreen 
                  ? (<span className="inline-block"> Hi, {session?.user?.name}</span>) 
                  : (<span className="hidden"> Hi, {session?.user?.name}</span>)
                }
                <div><AiFillCaretDown className="inline-block"/></div>
              </div>
            </div>
          : <div onClick={toggleOpen}>  
              <div className="navLinks avatar" href={'/account'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                </svg>
                {!isSmallScreen 
                  ? (<span className="inline-block">Account</span>) 
                  : (<span className="hidden">Account</span>)
                }
                <div><AiFillCaretDown className="inline-block"/></div>
              </div>
            </div>
        }

        {isOpen && (
          <div
            className="
              absolute
              rounded-md
              w-[170px]
              bg-primary
              overflow-hidden
              right-0
              top-12
              text-sm
              flex
              flex-col
              cursor-pointer
            "
          >
            {session?.user 
              ? <div>
                  <Link href={"/orders"}>
                    <div 
                      className="link-container px-4 py-3 transition"
                      onClick={toggleOpen}
                    >
                      Orders
                    </div>
                  </Link>
                  <hr />
                  <div 
                    className="link-container px-4 py-3 transition"
                    onClick={() => {
                      toggleOpen()
                      signOut()
                    }}
                  >
                    Logout
                  </div>
                </div>
              : <div>
                  <Link href={"/login"}>
                    <div 
                      className="link-container px-4 py-3 transition"
                      onClick={toggleOpen}
                    >
                      Login
                    </div>
                  </Link>
                  <Link href={"/register"}>
                    <div 
                      className="link-container px-4 py-3 transition"
                      onClick={toggleOpen}
                    >
                      Register
                    </div>
                  </Link>
                </div>
            }
          </div>
        )}
      </div>

      {isOpen ? <BackDrop onClick={toggleOpen} /> : null }
    </>
  )
}

export default UserMenu