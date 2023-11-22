import axios from "axios"
import { useEffect, useState } from "react"

const ProductsCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get('/api/categories')
      setCategories(response.data.categories)
      setLoading(false)
    }
    fetchCategories()
  }, [])

  console.log("These are the categories: ", categories)

  return (
    <div className="mt-10">
      {loading 
          ? (
              <div className="text-center mt-10">
                <p className="text-xl text-bold">Loading...</p>
              </div>
            ) 
          : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {categories.length > 0 &&
                categories.map((category) => (
                  <li
                    key={category._id}
                    className="flex justify-center items-center border border-gray-400 rounded-md h-32 overflow-hidden bg-white hover:shadow-lg transition duration-300"
                  >
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                    </div>
                  </li>
                ))}
            </ul>
          )}
    </div>
  )
}

export default ProductsCategories