'use client'

import styled from "styled-components"
import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"

const StyledDiv = styled.div`
  background-color: rgb(146, 212, 59);
  padding: 30px 0px;
  color: white;
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 1fr;
  grid-template-rows: 450px;
  gap: 20px;
  justify-content: center;
  align-items: center;
  max-width: 100%;
`;

const StyledTitleDiv = styled.div`
  h2{
    white-space: nowrap;
    font-size: 2rem;
    margin-bottom: 10px;
    font-weight: bold;
    color: #FAFAFA;
  }
`;

const StyledDescription = styled.p`
  font-weight: normal;
  margin-top: 5px; 
  color: #F8F8FF;
  font-size: 1.2rem;
`;

const StyledTitleDescriptionGrid = styled.div`
  grid-row: 1;
  grid-column: 2;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const ViewMoreButton = styled(Link)`
  text-decoration: none;
  display: inline-block;
  padding: 10px 20px;
  background-color: #d40d9a;
  border: none;
  border-radius: 5px;
  font-size: 1.0rem;
  color: black;

  &:hover {
   background-color: #a00a7c;
  }
`;

const StyledImageGrid = styled.div`
  grid-row: 1;
  grid-column: 3;
  padding: 20px;

  img{
    max-width: 100%;
    max-height: 450px;
  }
`;

const StyledImage = styled.img`
  background-color: transparent;
`;

const LoadingMessage = styled.p`
  grid-column: 1 / span 4;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: #F8F8FF;
  padding: 15px;
  margin: 0;
  min-height: 450px;
`;

const Featured = () => {
  const [featuredProduct, setFeaturedProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProduct = async () => {
      const response = await axios.get('/api/featuredProduct')
      setFeaturedProduct(response.data)
      setLoading(false)
    }

    fetchFeaturedProduct()
  }, [])

  return (
    <StyledDiv>
      {loading 
        ? ( <LoadingMessage>Loading...</LoadingMessage> ) 
        : featuredProduct 
          ? (
              <>
                <StyledTitleDescriptionGrid>
                  <StyledTitleDiv>
                    <h2>{featuredProduct[0].productName}</h2>
                  </StyledTitleDiv>
                  <StyledDescription>{featuredProduct[0].description}</StyledDescription>
                  <div>
                    <ViewMoreButton href={`/featuredProduct/${featuredProduct[0]._id}`}>View More</ViewMoreButton>
                  </div>
                </StyledTitleDescriptionGrid>
                <StyledImageGrid>
                  {featuredProduct[0].uploadedImagePaths.length > 0 && (
                    <StyledImage
                      src={`${featuredProduct[0].uploadedImagePaths[0]}`}
                      alt={featuredProduct[0].productName}
                    />
                  )}
                </StyledImageGrid>
              </>
            ) 
          : ( <LoadingMessage>No featured product available.</LoadingMessage> )
      }
    </StyledDiv>
  )
}

export default Featured