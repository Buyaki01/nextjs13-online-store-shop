import Link from "next/link"

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="mt-5 text-2xl">Your cart is empty!</p>
      <div className="mt-5">
        <Link 
          href={'/'}
          className="text-xl font-bold text-secondary flex gap-1 items-center justify-center hover:underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>Start Shopping
        </Link> 
      </div>
    </div>
  )
}

export default EmptyCart