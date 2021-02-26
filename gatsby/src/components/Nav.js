import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const NavStyles = styled.nav`
  ul {
    margin: 10px;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: 1fr repeat(3, minmax(50px, 200px));
    grid-gap: 2rem;
    justify-items: end;
    align-items: end;
  }
  a {
    font-size: 3rem;
    color: var(--white);
    text-decoration: none;
    display: inline;
  }
  h1 {
    font-family: Archer;
    font-size: 5rem;
    color: var(--blue);
    display: inline;
    text-shadow: 5px 5px 10px black;
  }
  .logo {
    justify-self: start;
  }
`;

export default function Nav() {
  return (
    <NavStyles>
      <ul>
        <li className="logo">
          <Link to="/">
            <h1>b|p</h1>
          </Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
      </ul>
    </NavStyles>
  );
}
