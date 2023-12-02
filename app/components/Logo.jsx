import Link from "next/link"

const Logo = () => {
  return (
    <div>
      <Link 
        href={'/'}
        className="no-underline text-white whitespace-nowrap text-2xl lg:text-5xl"
      >
        Pearls Collections
      </Link>
  </div>
  )
}

export default Logo