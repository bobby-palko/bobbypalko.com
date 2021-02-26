/* eslint-disable react/prop-types */
import PortableText from '@sanity/block-content-to-react';
import { graphql } from 'gatsby';
import React from 'react';
import serializers from '../utils/serializers.js';

export default function SinglePostPage({ data }) {
  return (
    <div>
      <h1>{data.post.title}</h1>
      <PortableText blocks={data.post._rawBody} serializers={serializers} />
    </div>
  );
}

export const query = graphql`
  query($slug: String!) {
    post: sanityPost(slug: { current: { eq: $slug } }) {
      title
      id
      _rawBody
      mainImage {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
