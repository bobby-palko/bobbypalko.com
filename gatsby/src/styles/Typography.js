import { createGlobalStyle } from 'styled-components';

import body from '../assests/fonts/Archer-Medium-Pro.otf';
import headings from '../assests/fonts/Gotham-Condensed-Medium.otf';

const Typography = createGlobalStyle`
  @font-face {
    font-family: Archer;
    src: url(${body});
  }
  @font-face {
    font-family: Gotham;
    src: url(${headings});
  }
  html {
    font-family: Archer, -apple-system, serif;
    color: var(--black);
  }
  h1,h2,h3,h4,h5,h6{
    font-family: Gotham, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

export default Typography;
