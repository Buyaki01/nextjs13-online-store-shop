const CheckoutButton = () => {
  const handleCheckout = () => {
    console.log("Hello")
  }

  return (
    <button 
      className="text-white text-lg py-2 px-4 rounded-md focus:outline-none"
      onClick={handleCheckout}
    >
      Checkout
    </button>
  )
}

export default CheckoutButton