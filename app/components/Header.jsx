import styled from "styled-components"
import Link from "next/link"

const StyledHeader = styled.header`
  background-color: rgb(146, 212, 59);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  white-space: nowrap;
  font-size: 2.5rem;
`;

const NavLinks = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin: 0 10px;
`;

const SearchInput = styled.input`
  padding: 10px 25px;
  border: none;
  border-radius: 4px;
  margin-right: 10px;
  width: 200px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>');
  background-repeat: no-repeat;
  background-position: 10px center;
  background-size: 20px 20px;
  padding-left: 35px;
`;

const Icons = styled.svg`
  width: 24px;
  height: 24px;
  margin-right: 5px;
  margin-bottom: 0px;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Logo href={'/'}>Pearls Collections</Logo>

      <div>
        <SearchInput type="text" placeholder="Search products and categories" />
      </div>
      <nav>
        <NavLinks href={'/'}>Home</NavLinks>
        <NavLinks href={'/products'}>All Products</NavLinks>
        <NavLinks href={'/categories'}>Categories</NavLinks>
        <NavLinks href={'/account'}>
          <Icons xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </Icons>
        </NavLinks>
        <NavLinks href={'/cart'}>
          <Icons xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </Icons>
        </NavLinks>
      </nav>
    </StyledHeader>
  )
}

export default Header