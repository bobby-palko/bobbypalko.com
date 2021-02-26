/* eslint-disable react/prop-types */
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { Link } from 'gatsby';
import CategoryGrid from './CategoryGrid.js';

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const PostStyles = styled.div`
  display: grid;
  grid-template-rows: 1fr auto auto;
  gap: 1rem;

  background-color: var(--darkblue);
  border-radius: 15px;
  box-shadow: 5px 5px 10px black;

  h2,
  p {
    margin: 0;
    padding: 0 10px;
    color: var(--white);
    text-shadow: 1px 1px 0 var(--black);
  }
  p {
    font-size: 1.6rem;
    padding-bottom: 10px;
  }
  img {
    border-radius: 15px 15px 0px 0px;
  }
`;

function SinglePost({ post }) {
  console.log(post.categories);
  return (
    <Link to={`/blog/${post.slug.current}`}>
      <PostStyles>
        <Img fluid={post.mainImage.asset.fluid} alt={post.title} />
        <h2>{post.title}</h2>
        <CategoryGrid categories={post.categories} />
      </PostStyles>
    </Link>
  );
}

export default function PostList({ posts }) {
  console.log(posts);
  return (
    <PostGrid>
      {posts.map((post) => (
        <SinglePost key={post.id} post={post} />
      ))}
    </PostGrid>
  );
}
