'use client'

import Link from "next/link"

const NotFoundPage = () => {
  return (
    <>
      <div className='min-h-[400px] flex flex-col items-center justify-center gap-y-5'>
        <h2 className="text-4xl font-bold">Page Not Found</h2>
        <p className="text-base my-2">Could not find requested resource</p>
        <p>
          <Link 
            href={'/'}
            className="flex gap-2 items-center justify-center bg-primary text-white py-2 px-4 rounded-md text-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
             Go back {/* I would want that if user was on http://localhost:3000/cart and then they entered a URL that does not exist i.e http://localhost:3000/checkout-success, when user clicks on the Go Back button they should be taken back to the http://localhost:3000/cart page instead of the homepage.  */}
          </Link>
        </p>
      </div>
    </>
  )
}

export default NotFoundPage