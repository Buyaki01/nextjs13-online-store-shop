'use client'

import { useContext } from "react"
import { CartContext } from "../components/CartContext"

const Cart = () => {
  const { cartProducts } = useContext(CartContext)
  console.log(cartProducts)

  return (
    <>
      {cartProducts?.length > 0 
        ? (
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3 mt-3 border border-solid border-gray-300 rounded-sm p-3">
              <h2 className="text-2xl font-bold mb-3">Cart (2)</h2>
              {/* {fetchedCartProductsIds.map(productId => ( */}
                <div className="mt-3 p-3 grid grid-cols-5 gap-4 border-b-2 border-gray-200 mb-5">
                  <div className="mr-3 border border-r-2 border-solid border-gray-300 flex items-center justify-center"> 
                    <img 
                      src="http://localhost:3000/images/featuredProductHandbag.png" 
                      alt="product name" 
                      className="w-32 h-32 object-contain"
                    />
                  </div>
                  <div className="mr-3 whitespace-nowrap flex items-center justify-center font-bold text-xl">Product Name</div>
                  <div className="mr-3 flex items-center justify-center">
                    <button className="border border-none bg-gray-300 text-xl">-</button>
                    <span className="text-xl mx-2">1</span>
                    <button className="border border-none bg-gray-300 text-xl">+</button>
                  </div>
                  <div className="mr-3 flex flex-col items-center justify-center">
                    <h4 className="text-2xl font-bold">Sh.349</h4>
                    <p className="text-sm whitespace-nowrap">Sh.349/per item</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <button className="bg-red-500 text-white py-2 px-4 rounded-full flex gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg> Remove
                    </button>
                  </div>
                </div>
              {/* ))} */}
            </div>
       
            <div className="col-span-1 mt-3 border border-solid border-gray-200 rounded-sm p-3">
              <h2 className="text-2xl font-bold mb-3">Cart Summary</h2>
              <p className="text-lg mb-3">Subtotal: ksh. 1119</p>
              <button className="text-xl text-white mt-3 py-2 px-4 rounded-full">
                Checkout (ksh. 1119)
              </button>
            </div>
          </div>
        ) 
        : (
          <p className="mt-5 text-2xl text-center">No cart Item</p>
        )
      }
    </>
  )
}
export default Cart