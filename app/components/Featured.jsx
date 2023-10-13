import styled from "styled-components"

const StyledDiv = styled.div`
  background-color: rgb(146, 212, 59);
  padding: 20px;
  color: white;
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 1fr;
  gap: 20px;
`;

const StyledTitle = styled.h2`
  white-space: nowrap;
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const StyledDescription = styled.h4`
  font-size: 1rem;
  margin-top: 5px;
  color: #eee;
`;

const StyledTitleDescriptionGrid = styled.div`
  grid-row: 1;
  grid-column: 2;
  padding: 20px;
`;

const StyledImageGrid = styled.div`
  grid-row: 1;
  grid-column: 3;
  padding: 20px;
`;

const Featured = () => {
  return (
    <StyledDiv>
      <StyledTitleDescriptionGrid>
        <StyledTitle>Leather Travelling Bag</StyledTitle>
        <StyledDescription>Quality handbag just for you</StyledDescription>
      </StyledTitleDescriptionGrid>
      <StyledImageGrid>
        <img src="#" />
      </StyledImageGrid>
    </StyledDiv>
  )
}

export default Featured