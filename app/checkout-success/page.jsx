import Link from "next/link"
import Header from "../components/Header"

const CheckoutSuccess = () => {
  return (
    <>
      <Header/>
      <div className='min-h-[400px] flex flex-col items-center justify-center gap-y-5'>
        <h2 className="text-4xl font-bold">Your Payment Accepted by Pearls Collections</h2>
        <p>Now you can view your orders or continue shopping with us</p>
        <div>
          <Link 
            href={"/my-orders"}
            className="checkoutSuccessButtons text-white py-2 px-4 w-44 h-12 rounded-full text-base font-semibold duration-300"
          >
            View Orders
          </Link>
          <Link 
            href={"/"}
            className="checkoutSuccessButtons w-44 h-12 rounded-full text-base font-semibold duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </>
  )
}

export default CheckoutSuccess