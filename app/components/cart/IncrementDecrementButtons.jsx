import { useContext } from "react"
import { CartContext } from "../CartContext"

const IncrementDecrementButtons = ({cartItem}) => {
  const { addItemToCart, decrementItemInCart, removeItemFromCart } = useContext(CartContext)

  return (
    <div className="w-full flex items-center justify-center pb-3 md:pb-0 mr-0 md:mr-3">
      <button 
        className="border text-2xl px-2 text-white w-9 h-9 flex justify-center rounded"
        onClick={() => {
          decrementItemInCart(cartItem.product._id)
        }}
      >
        -
      </button>
      <span className="text-xl mx-2">{cartItem.itemQuantity}</span>
      <button 
        className="border text-2xl px-2 text-white w-9 h-9 flex justify-center rounded"
        onClick={() => {
          addItemToCart(cartItem.product._id)
        }}
      >
        +
      </button>
    </div>
  )
}

export default IncrementDecrementButtons