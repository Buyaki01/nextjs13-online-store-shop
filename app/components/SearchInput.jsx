const SearchInput = () => {
  return (
    <div className="relative inline-flex items-center gap-2 sm:gap-0 mb-2 lg:mb-0">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor"
        className="w-8 h-8 absolute left-3 text-gray-500 py-2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>

      <div>
        <input 
          type="text" 
          placeholder="Search products and categories"
          className="px-4 py-2 pl-10 border-2 border-gray-300 rounded mr-2 w-full mb-0"
        />
      </div>
          
      <button
        className="bg-primary text-white px-4 py-2"
      >
        Search
      </button>
    </div>
  )
}

export default SearchInput