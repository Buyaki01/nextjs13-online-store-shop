import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-secondary hover:bg-secondary hover:text-white text-white p-2 font-bold text-lg">
      <div className='flex justify-center'>
        <p>&copy; {new Date().getFullYear()} Pearls Collections. All Rights Reserved.</p>
      </div>
    
      <div className="flex justify-center gap-2 mt-3 text-2xl">
        <Link 
          href="#"
          className='hover:text-primary'
        >
          <FaTwitter />
        </Link>
        <Link 
          href="#"
          className='hover:text-primary'
        >
          <FaFacebook />
        </Link>
        <Link
          href="#"
          className='hover:text-primary'
        >
          <FaInstagram />
        </Link>
      </div>
    </footer>
  )
}

export default Footer