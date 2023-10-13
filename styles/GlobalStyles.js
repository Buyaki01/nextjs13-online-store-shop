'use client'

import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

  body{
    padding: 0;
    margin: 0 15px;
    font-family: 'Poppins', sans-serif;
    box-sizing: border-box;
  }
`;

export default GlobalStyles