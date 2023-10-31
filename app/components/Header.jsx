'use client'

import styled from "styled-components"
import Link from "next/link"
import CartIcon from "./CartIcon"
import { useContext } from "react"
import { CartContext } from "./CartContext"
import UserMenu from "./UserMenu"

const StyledHeader = styled.header`
  background-color: rgb(146, 212, 59);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  white-space: nowrap;
  font-size: 3rem;
`;

const SearchInput = styled.input`
  padding: 10px 15px;
  border: 2px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  width: 200px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>');
  background-repeat: no-repeat;
  background-position: 10px center;
  background-size: 20px 20px;
  padding-left: 35px;
  font-size: 1.2rem;
  color: #333;
  width: 300px;

  ::placeholder {
    font-size: 1.2rem;
  }
`;

const SearchButton = styled.button`
  padding: 10px 15px;
  background-color: #d40d9a;
  border: none;
  border-radius: 4px;
  font-size: 1.0rem;
  color: black;
  cursor: pointer;
  
  &:hover {
    background-color: #a00a7c;
  }
`;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CartItemsCount = styled.span`
  background-color: #d40d9a;
  color: white;
  padding: 1px 6px;
  border-radius: 50%;
  font-size: 0.7rem;
  position: absolute;
  top: 25px;
  right: 55px;
  z-index: 1;
`;

const Header = ({children}) => {
  const { cartProducts } = useContext(CartContext)
  const totalQuantity = cartProducts.reduce((total, item) => total + item.quantity, 0)

  return (
    <StyledHeader>
      <Logo href={'/'}>Pearls Collections</Logo>

      <SearchInputContainer>
        <SearchInput type="text" placeholder="Search products and categories" />
        <SearchButton>Search</SearchButton>
      </SearchInputContainer>

      <nav className="flex items-center gap-4">
        <UserMenu />
        <Link className="navLinks" href={'/cart'}>
          <CartIcon/>
          {totalQuantity > 0 && <CartItemsCount>{totalQuantity}</CartItemsCount>}Cart
        </Link>
      </nav>

      {children}
    </StyledHeader>
  )
}

export default Header