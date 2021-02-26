/* eslint-disable react/prop-types */
import React from 'react';
import Img from 'gatsby-image';
import { getFluidGatsbyImage } from 'gatsby-source-sanity';

function Code({ node }) {
  return (
    <pre data-language={node.language}>
      <code>{node.code}</code>
    </pre>
  );
}

function Image({ node }) {
  const fluidImg = getFluidGatsbyImage(
    node.asset._ref,
    { maxWidth: 800 },
    { projectId: 'p75cllr7', dataset: 'production' }
  );
  return <Img fluid={fluidImg} alt={node.alt} />;
  // return JSON.stringify(node, null, 2);
}

const serializers = {
  types: {
    code: Code,
    image: Image,
  },
};

export default serializers;
