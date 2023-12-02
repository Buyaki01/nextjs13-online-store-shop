import Link from "next/link"

const CartProductName = ({cartItem}) => {
  return (
    <div className="flex items-center w-full h-full pb-3 md:pb-0 mr-0 md:mr-3">
      <Link 
        href={`/products/${cartItem.product._id}`}
        className="hover:underline w-full"
      >
        <h3 className="font-bold text-xl px-1 text-center truncate">
          {cartItem.product.productName}
        </h3>
      </Link>
    </div>
  )
}

export default CartProductName