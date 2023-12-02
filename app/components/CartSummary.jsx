import Link from "next/link"

const CartSummary = ({fetchCartProductInfo}) => {
  return (
    <>
      {fetchCartProductInfo.length > 0 && 
        <div className="mt-3 border border-solid border-gray-400 rounded-sm p-3 h-52">
          <h2 className="text-2xl font-semibold mb-3">Cart Summary</h2>
          <p className="text-lg mb-3">Total Amount: <span className="font-semibold text-xl">ksh. {fetchCartProductInfo.reduce((total, item) => total + item.subtotal, 0)}</span></p>
          <div className="text-sm text-gray-600 mb-3">
            (Taxes and Delivery charges will be added in the checkout page)
          </div>

          <div className="text-center">
            <button className="text-white text-lg py-2 px-4 rounded-md focus:outline-none">
              <Link href={'/checkout-address'}>
                Checkout
              </Link>
            </button>
          </div>
       </div>
      }
    </>
  )
}

export default CartSummary