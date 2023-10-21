'use client'

import CartIcon from "@/app/components/CartIcon"
import axios from "axios"
import { useParams } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
import styled from "styled-components"
import AddToCartBtn from "@/app/components/AddToCartBtn"

const Wrapper = styled.div`
  margin-bottom: 50px;

  img{
    max-width: 100%;
    max-height: 350px;
  }
`;

const PriceAddToCartButtonDiv = styled.div`
  display: flex;
  gap: 10px;
`;

const NavLinks = styled(Link)`
  text-decoration: none;
  font-size: 1.0rem;
  color: black;
`;

const FeaturedProduct = () => {
  const [featuredProductInfo, setFeaturedProductInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  const params = useParams()
  const { id } = params

  useEffect(() => {
    const fetchFeaturedProduct = async () => {
      try {
        const response = await axios.get(`/api/featuredProduct/${id}`)
        setFeaturedProductInfo(response.data.featuredProduct)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching product:", error)
      }
    }

    fetchFeaturedProduct()
  }, [id])

  return (
    <Wrapper>
      {loading 
        ? (
            <h1 className="mt-3 text-xl text-center">Loading...</h1>
          ) 
        : (
          <div>
            <div>
              {featuredProductInfo.uploadedImagePaths.length > 0 && (
                <img
                  src={`${featuredProductInfo.uploadedImagePaths[0]}`}
                  alt={featuredProductInfo.productName}
                />
              )}
            </div>

            <div>
              <h2>{featuredProductInfo.productName}</h2>
              <p>{featuredProductInfo.description}</p>
              <PriceAddToCartButtonDiv>
                <h4>shs. {featuredProductInfo.price}</h4>
                <AddToCartBtn>
                  <NavLinks href={'/cart'}>
                    <CartIcon/> Add to cart
                  </NavLinks>
                </AddToCartBtn>
              </PriceAddToCartButtonDiv>
            </div>
          </div>
        )
      }
    </Wrapper>
  )
}

export default FeaturedProduct