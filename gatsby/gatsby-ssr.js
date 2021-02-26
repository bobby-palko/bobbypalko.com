/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Layout from './src/components/Layout';

export function wrapPageElement({ element, props }) {
  // wrap all our pages in our Layout component
  return <Layout {...props}>{element}</Layout>;
}
