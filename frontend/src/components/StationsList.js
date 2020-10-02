import React from 'react';
import styled from 'styled-components/macro';
import MeasuringStands from './MeasuringStands';

const StationWrapper = styled.div`
  width: 80vw;
  margin: 1rem auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 4rem;
`;

const InfoWrapper = styled.div`
  justify-content: space-around;
  width: 70vw;
  margin: 4rem auto;
  border: 3px solid #74a57f;
  border-radius: 4rem;

  h1 {
    position: relative;
    font-size: 3rem;
    height: auto;
    text-align: center;
    color: #c0c0c0;
    justify-content: center;
  }

  p {
    font-size: 3rem;
    height: auto;
    text-align: center;
    color: #c0c0c0;
  }
`;

export default function StationList({ stations }) {
  if (stations.length === 0) {
    return (
      <InfoWrapper>
        <h1>Tips:</h1>
        <p>Enter a name of city or district in search field to focous map on this area</p>
        <p>Click on leaf marker on map to see graphs</p>
      </InfoWrapper>
    );
  }

  return (
    <StationWrapper>
      {stations.map((station) => {
        return (
          <div key={station.id}>
            <h1>{station.name}</h1>
            <MeasuringStands station={station} />
          </div>
        );
      })}
    </StationWrapper>
  );
}
