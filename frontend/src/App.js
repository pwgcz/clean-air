import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import Navbar from './components/Navbar';
import Search from './components/Search';
import GeoMap from './components/GeoMap';
import axios from 'axios';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Overpass';
    background: #F8F8FF;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export default function App() {
  const [stationGraph, setStationGraph] = useState([]);
  const [stations, setStations] = useState([]);
  const [isInDatabase, setIsInDatabase] = useState(true);

  async function fetchStations() {
    try {
      const response = await axios.get(`/stations`);
      setStations(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStations();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Search />
      <GeoMap />
    </>
  );
}
