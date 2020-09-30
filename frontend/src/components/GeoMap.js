import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components/macro';
import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import { Icon, latLngBounds } from 'leaflet';

const LeafletStyles = createGlobalStyle`
  .leaflet-container {
    border-radius: 20px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    width: 100vw;
    height: 50vh;
  }
`;

const MapWrapper = styled.div`
  display: flex;
  margin: 1rem auto;
  justify-content: center;

  width: 50%;

}
`;

export default function GeoMap({ stations, handleStationClick }) {
  const [leafPoint, setLeafPoint] = useState(
    new Icon({
      iconUrl: 'icons8-natural-food-30.png',
      iconSize: [30, 30],
    }),
  );

  return (
    <>
      <LeafletStyles />
      <MapWrapper>
        <Map
          bounds={
            stations.length === 0
              ? latLngBounds([
                  [54.754139, 23.642153],
                  [49.293564, 14.382222],
                ])
              : latLngBounds(stations.map((sta) => [sta.gegrLat, sta.gegrLon]))
          }
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {stations.length !== 0
            ? stations.map((station) => {
                return (
                  <Marker
                    key={station.id}
                    position={[station.gegrLat, station.gegrLon]}
                    icon={leafPoint}
                    onClick={handleStationClick}
                  >
                    <Popup>{station.name}</Popup>
                    <Tooltip>{station.name}</Tooltip>
                  </Marker>
                );
              })
            : null}
        </Map>
      </MapWrapper>
    </>
  );
}
