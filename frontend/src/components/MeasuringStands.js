import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataDiagrams from './DataDiagrams';
import styled from 'styled-components/macro';

const DiagramWrapper = styled.div`
  border: 1px solid black;
  border-radius: 20px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);


}
`;

export default function MeasuringStands({ station }) {
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
    fetchStands();
  }, [station.id]);

  return (
    <>
      {stands.map((stand) => {
        return (
          <div key={stand.id}>
            <h4>
              {stand.name} ({stand.code})
            </h4>
            <DiagramWrapper>
              <DataDiagrams stand={stand} />
            </DiagramWrapper>
          </div>
        );
      })}
    </>
  );
}
