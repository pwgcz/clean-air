import React from 'react';
import styled from 'styled-components/macro';

const StationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

const InfoWrapper = styled.div`
  justify-content: space-around;
  margin: 1.5rem;
  border: 3px solid #74a57f;
  border-radius: 4rem;
  height: 100vh;
`;

export default function SeaStationList({ stations }) {
  if (stations.length === 0) {
    return (
      <InfoWrapper>
        <h1>
          <h1>Tips:</h1>
          <q>Enter a name of city or district in search field to focous map on this area</q>
          <q>Click on leaf marker on map to see graphs</q>
        </h1>
      </InfoWrapper>
    );
  }

  return (
    <StationWrapper>
      {this.props.station.map((sta) => {
        return (
          <div key={sta.id} className="station-card">
            <h1>{sta.name}</h1>
            <Stands station={sta} />
          </div>
        );
      })}
    </StationWrapper>
  );
}
