const CartProductPrice = ({cartItem}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center pb-3 md:pb-0 mr-0 md:mr-3">
      <h4 className="text-2xl font-bold">Ksh.{ cartItem.product.productPrice * cartItem.itemQuantity }</h4>
      <p className="text-sm whitespace-nowrap"><span className="font-bold">Ksh.{cartItem.product.productPrice}</span>/per item</p>
    </div>
  )
}

export default CartProductPrice