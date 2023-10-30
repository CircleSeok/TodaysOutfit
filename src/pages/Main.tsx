import React from 'react';
import Weather from '../components/Weather';
import Clothes from './Clothes';
import Trip from './Trip';

export default function Main() {
  return (
    <>
      <Weather />
      <Clothes />
      <Trip />
    </>
  );
}
