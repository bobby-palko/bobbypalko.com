/* eslint-disable react/prop-types */
import React from 'react';
import Footer from './Footer';
import Nav from './Nav';
import 'normalize.css';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';

export default function Layout({ children }) {
  return (
    <>
      <GlobalStyles />
      <Typography />
      <Nav />
      {children}
      <Footer />
      <h1>Colors</h1>
      <div
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'var(--black)',
          display: 'inline-block',
        }}
      />
      <div
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'var(--orange)',
          display: 'inline-block',
        }}
      />
      <div
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'var(--blue)',
          display: 'inline-block',
        }}
      />
      <div
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'var(--white)',
          display: 'inline-block',
        }}
      />
      <div
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'var(--darkblue)',
          display: 'inline-block',
        }}
      />
    </>
  );
}
