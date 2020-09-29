import React, { useState } from 'react';
import styled from 'styled-components';
import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import { Icon, latLngBounds } from 'leaflet';

const MapWrapper = styled.div`
  display: flex;
  margin-top: 4rem;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: static;
`;

export default function GeoMap({ stations, handleStationClick }) {
  const [leafPoint, setLeafPoint] = useState(
    new Icon({
      iconUrl: 'icons8-fallen-leaf-48.png',
      iconSize: [30, 30],
    }),
  );

  const handleStationClick = (event) => {};

  return (
    <MapWrapper>
      <Map
        bounds={
          stations.length === 0
            ? latLngBounds([
                [54.754139, 23.642153],
                [49.293564, 14.382222],
              ])
            : latLngBounds(this.props.stations.map((sta) => [sta.gegrLat, sta.gegrLon]))
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
                  onClick={handleStationClick(stat)}
                >
                  <Popup>{station.name}</Popup>
                  <Tooltip>{station.name}</Tooltip>
                </Marker>
              );
            })
          : null}
      </Map>
    </MapWrapper>
  );
}
