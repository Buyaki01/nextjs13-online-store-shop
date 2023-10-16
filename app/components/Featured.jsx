'use client'

import styled from "styled-components"
import PrimaryBtn from "./PrimaryBtn"
import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"

const StyledDiv = styled.div`
  background-color: rgb(146, 212, 59);
  padding: 30px 0px;
  color: white;
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 1fr;
  gap: 20px;
`;

const StyledTitle = styled.h2`
  white-space: nowrap;
  font-size: 2rem;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
`;

const StyledDescription = styled.p`
  font-weight: normal;
  margin-top: 10px; 
  color: #504e4e;
  font-size: 1.2rem;
`;

const StyledDivButtons = styled.div`
  display: flex;
  gap: 5px; 
`;

const ViewMoreButton = styled(Link)`
  text-decoration: none;
  display: inline-block;
  padding: 10px 20px;
  background-color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.0rem;
  color: black;

  &:hover {
    background-color: white;
  }
`;

const StyledTitleDescriptionGrid = styled.div`
  grid-row: 1;
  grid-column: 2;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledImageGrid = styled.div`
  grid-row: 1;
  grid-column: 3;
  padding: 20px;
  background-color: transparent;
`;

const StyledImage = styled.img`
  background-color: transparent;
`;

const Featured = () => {

  const [featuredProduct, setFeaturedProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProduct = async () => {
      const featuredProductId = '651e93a9bbd864c78bbac92d'
      const response = await axios.get(`/api/featuredProduct/${featuredProductId}`)
      setFeaturedProduct(response.data.featuredProduct)
      setLoading(false)
    }

    fetchFeaturedProduct()
  }, [])

  return (
    <StyledDiv>
      {loading 
        ? ( <p>Loading...</p> ) 
        : featuredProduct 
          ? (
              <>
                <StyledTitleDescriptionGrid>
                  <StyledTitle>{featuredProduct.productName}</StyledTitle>
                  <StyledDescription>{featuredProduct.description}</StyledDescription>
                  <StyledDivButtons>
                    <ViewMoreButton href={`/featuredProduct/${featuredProduct.id}`}>View More</ViewMoreButton>
                    <PrimaryBtn>Add to Cart</PrimaryBtn>
                  </StyledDivButtons>
                </StyledTitleDescriptionGrid>
                <StyledImageGrid>
                  {featuredProduct.uploadedImagePaths.length > 0 && (
                    <StyledImage
                      src={`${featuredProduct.uploadedImagePaths[0]}`}
                      alt={featuredProduct.productName}
                    />
                  )}
                </StyledImageGrid>
              </>
            ) 
          : ( <p>No featured product available.</p> )
      }
    </StyledDiv>
  )
}

export default Featured