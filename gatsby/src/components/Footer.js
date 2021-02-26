import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.div`
  footer {
    background-color: var(--black);
    width: 100%;
    text-align: center;
    color: var(--blue);
  }
`;

export default function Footer() {
  return (
    <StyledFooter>
      <footer>
        <p>&copy; Bobby Palko {new Date().getFullYear()}</p>
      </footer>
    </StyledFooter>
  );
}
