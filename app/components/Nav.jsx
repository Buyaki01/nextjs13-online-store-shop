import Link from "next/link"
import UserMenu from "./UserMenu"
import CartIcon from "./CartIcon"
import { useContext } from "react"
import { CartContext } from "./CartContext"

const Nav = () => {
  const { cartProducts } = useContext(CartContext)
  const totalQuantity = cartProducts.reduce((total, item) => total + item.quantity, 0)

  return (
    <nav className="flex items-center gap-1 lg:gap-4">
      <Link className="navLinks" href={'/cart'}>
        <CartIcon />
        {totalQuantity > 0 && 
          <span
            className="bg-primary text-white px-1 text-center rounded-full text-xs absolute top-0 right-10 z-10"
          >
            {totalQuantity}
          </span>}Cart
      </Link>
      <UserMenu />
  </nav>
  )
}

export default Nav