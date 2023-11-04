'use client'

import Link from "next/link"
import Header from "./components/Header"

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <div className='min-h-[400px] flex flex-col items-center justify-center gap-y-5'>
        <h2 className="text-4xl font-bold">Not Found</h2>
        <p>Could not find requested resource</p>
        <p>
          <Link 
            href={'/'}
            className="checkoutSuccessButtons text-white py-2 px-4 w-44 h-12 rounded-full text-base font-semibold duration-300"
          >
            Go back to the Home Page
          </Link>
        </p>
      </div>
    </>
  )
}

export default NotFoundPage