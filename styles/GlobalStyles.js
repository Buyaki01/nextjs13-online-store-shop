'use client'

import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

  body{
    padding: 0;
    margin: 0 15px;
    box-sizing: border-box;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: left;
    background-color: #fff;
  }
`;

export default GlobalStyles