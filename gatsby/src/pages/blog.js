/* eslint-disable react/prop-types */
import React from 'react';
import { graphql } from 'gatsby';
import PostList from '../components/PostList';

export default function BlogPage({ data }) {
  const blogPosts = data.posts.nodes;

  return <PostList posts={blogPosts} />;
}

export const query = graphql`
  query blogQuery {
    posts: allSanityPost {
      nodes {
        title
        id
        slug {
          current
        }
        author {
          name
        }
        categories {
          title
        }
        mainImage {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
