import styled from "styled-components"

const StyledButton = styled.button`
  background-color: #d40d9a;
  padding: 10px 15px;
  border: none;
  box-shadow: none;
  border-radius: 5px;
  font-size: 1.0rem;

  &:hover {
    background-color: #a00a7c;
  }
`;

const PrimaryBtn = ({children}) => {
  return (
    <StyledButton>{children}</StyledButton>
  )
}

export default PrimaryBtn