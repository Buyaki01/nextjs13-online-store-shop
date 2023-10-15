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
  font-weight: normal;
`;

const StyledDescription = styled.h4`
  font-size: 1rem;
  margin-top: 5px;
  color: #eee;
`;

const StyledDivButtons = styled.div`
  display: flex;
  gap: 5px; 
`;

const ViewMoreButton = styled(Link)`
  text-decoration: none;
  display: inline-block; // Make it a block element
  padding: 10px 20px; // Adjust padding as needed
  background-color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.0rem;
  color: black;

  &:hover {
    background-color: rgb(146, 212, 59);
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
  //const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchFeaturedProduct = async () => {
      const response = await axios.get('/api/featuredProduct')
      setFeaturedProduct(response.data.featuredProduct)
      //setLoading(false)
    }
    fetchFeaturedProduct()
  }, [])

  return (
    <StyledDiv>
      <StyledTitleDescriptionGrid>
        <StyledTitle>Leather Travelling Bag</StyledTitle>
        <StyledDescription>Quality handbag just for you</StyledDescription>
          <StyledDivButtons>
            <ViewMoreButton href={"/product/id"}>View More</ViewMoreButton>
            <PrimaryBtn>
              Add to Cart
            </PrimaryBtn>
          </StyledDivButtons>
      </StyledTitleDescriptionGrid>
      <StyledImageGrid>
        <StyledImage src="http://localhost:3000/images/featuredProductHandbag.png" />
      </StyledImageGrid>
    </StyledDiv>
  )
}

export default Featured