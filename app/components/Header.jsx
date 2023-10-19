import styled from "styled-components"
import Link from "next/link"
import CartIcon from "./CartIcon";

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
  font-size: 3rem;
`;

const NavLinks = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin: 0 10px;
  font-size: 1.2rem;
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

  ::placeholder {
    font-size: 1.2rem;
  }
`;

const Icons = styled.svg`
  width: 24px;
  height: 24px;
  margin-right: 5px;
  margin-bottom: 0px;
`;

const SearchInputContainer = styled.div`
  display: flex;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Logo href={'/'}>Pearls Collections</Logo>

      <SearchInputContainer>
        <SearchInput type="text" placeholder="Search products and categories" />
        <button>Search</button>
      </SearchInputContainer>

      <nav>
        <NavLinks href={'/account'}>
          <Icons xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </Icons>Account
        </NavLinks>
        <NavLinks href={'/cart'}>
          <CartIcon/>Cart
        </NavLinks>
      </nav>
    </StyledHeader>
  )
}

export default Header