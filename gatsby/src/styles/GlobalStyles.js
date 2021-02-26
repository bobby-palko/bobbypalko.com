import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --white: #C0CAF5;
    --black: #1A1D2A;
    --blue: #7AA2F7;
    --darkblue: #4C6192;
    --orange: #de8b5b;
  }
  html {
    background-color: var(--black);
    font-size: 10px;
  }
  body {
    font-size: 2rem;
    color: var(--white);
  }
  a {
    text-decoration: none;
    color: var(--blue);
  }
`;

export default GlobalStyles;
