import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import Navbar from './components/Navbar';
import Search from './components/Search';
import GeoMap from './components/GeoMap';
import StationsList from './components/StationsList';
import Legend from './components/Legend';
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

  async function getSearchResult(event) {
    try {
      event.preventDefault();
      const search = event.target.elements[0].value;
      const response = await axios.get(`/cities-stations/?search=${search}`);
      setStations(response.data);
      setIsInDatabase(true);
      if (response.data.length === 0) {
        setIsInDatabase(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStations();
  }, []);

  const onClickStation = (data) => {
    setStationGraph([data]);
  };

  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Search getSearchResult={getSearchResult} isInDatabase={isInDatabase} />
      <GeoMap stations={stations} onClickStation={onClickStation} />
      <StationsList stations={stationGraph} />
      <Legend />
    </>
  );
}
