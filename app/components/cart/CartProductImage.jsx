import Link from "next/link"

const CartProductImage = ({cartItem}) => {
  return (
    <div className="p-3 mr-3 border border-r-2 border-solid border-gray-300 flex items-center justify-center"> 
      <Link href={`/products/${cartItem.product._id}`}>
        <img 
          src={cartItem.product.uploadedImagePaths[0]} 
          alt={cartItem.product.productName} 
          className="w-24 h-24 object-contain"
        />
      </Link>
    </div>
  )
}

export default CartProductImage