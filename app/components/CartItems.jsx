import { useMediaQuery } from "react-responsive"
import CartProductImage from "./cart/CartProductImage"
import CartProductName from "./cart/CartProductName"
import IncrementDecrementButtons from "./cart/IncrementDecrementButtons"
import CartProductPrice from "./cart/CartProductPrice"
import RemoveCartItemButton from "./cart/RemoveCartItemButton"

const CartItems = ({fetchCartProductInfo}) => {
  const isSmallScreen = useMediaQuery({ maxDeviceWidth: 576 })

  return (
    <div className="mb-5">
      {fetchCartProductInfo.length > 0 && <div>
        <div className="mt-3 border border-solid border-gray-400 rounded-sm p-3">
          <h2 className="text-2xl font-bold mb-3">Cart</h2>
          {fetchCartProductInfo.map(cartItem => (
            <div key={cartItem.product._id} className="mt-3 grid grid-cols-2 md:grid-cols-5 gap-4 border-b-2 border-gray-400 pb-3 mb-1">
              {!isSmallScreen 
                ? (
                  <>
                    <CartProductImage cartItem={cartItem}/>
                    <CartProductName cartItem={cartItem}/>
                    <IncrementDecrementButtons cartItem={cartItem}/>
                    <CartProductPrice cartItem={cartItem}/>
                    <RemoveCartItemButton cartItem={cartItem}/>
                  </>
                ) 
                : (
                  <>
                    <div>
                      <CartProductImage cartItem={cartItem}/>
                    </div>
                    <div className="flex items-center justify-center">
                      <div>
                        <CartProductName cartItem={cartItem}/>
                        <IncrementDecrementButtons cartItem={cartItem}/>
                        <CartProductPrice cartItem={cartItem}/>
                        <RemoveCartItemButton cartItem={cartItem}/>
                      </div>
                    </div>
                  </>
                )
              }
            </div>
          ))}
        </div> 
      </div>}
    </div>
  )
}

export default CartItems