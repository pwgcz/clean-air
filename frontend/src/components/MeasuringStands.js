import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataDiagrams from './DataDiagrams';

export default function MeasuringStands({ station }){
  const [stands, setStands] = useState([]);

  async function fetchStands() {
    try {
      const resonse = await axios.get(`/measuring-stands/${station.id}/`);
      setStands(resonse.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStands()
  }, [station.id]);

  return (
    <>
      {stands.map((stand) => {
        return (
          <div key={stand.id}>
            <h4>
              {stand.name} ({stand.code})
            </h4>
            <div className="stand-card">
              <DataDiagrams stand={stand} />
            </div>
          </div>
        );
      })}
    </>
  );
};
