import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataDiagrams } from './DataDiagrams';

export const MeasuringStands = ({ station }) => {
  const [stands, setStands] = useState([]);

  async function fetchStands() {
    try {
      const resonse = await axios.get(`/measuring-stands/${station.id}`);
      setStands(resonse.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStands();
  }, [station.id]);

  return (
    <>
      {stands.map((sta) => {
        return (
          <div key={sta.id}>
            <h4>
              {sta.name} ({sta.code})
            </h4>
            <div className="stand-card">
              <DataDiagrams stand={sta} />
            </div>
          </div>
        );
      })}
    </>
  );
};
