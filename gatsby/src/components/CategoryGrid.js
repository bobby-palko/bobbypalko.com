/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const StyledCategoryGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: auto auto auto auto;
`;

const StyledCategoryTag = styled.div`
  background-color: var(--black);
  font-size: 1.2rem;
  margin: 0 0 5px 5px;
  padding: 2px;
  border-radius: 5px;
`;

export default function CategoryGrid({ categories }) {
  return (
    <StyledCategoryGrid>
      {categories.map((category) => (
        <StyledCategoryTag>{category.title}</StyledCategoryTag>
      ))}
    </StyledCategoryGrid>
  );
}
