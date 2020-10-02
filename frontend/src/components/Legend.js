import React, { useState } from 'react';
import styled from 'styled-components/macro';
import TableRow from './TableRow';

const LegendWrapper = styled.div`
  width: 80vw;
  margin: 3rem auto;
  padding: 4rem;

  font-size: 17px;

  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  table {
    width: 70vw;
    margin: auto;
    padding: 1rem;
    border: 1px solid black;
    border-radius: 20px;
  }
  h1 {
    text-align: center;
  }

  td {
    text-align: center;
    padding: 0 1rem;
  }
`;

const IndexColor = styled.div`
  height: 3rem;
  width: 3rem;
  background-color: ${(props) => props.indexColor || 'black'};
  margin: 1rem auto;
`;

export default function Legend() {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };
  return (
    <LegendWrapper>
      <h1>Air Quality Index (AQI)</h1>
      <table>
        <thead>
          <tr>
            <th>Daily AQI Color</th> <th>Levels of Concern</th>
          </tr>
        </thead>
        <tbody>
          <TableRow color="green" name="good">
            Air quality is satisfactory, and air pollution poses little or no risk.
          </TableRow>
          <TableRow color="yellow" name="Moderate">
            Air quality is acceptable. However, there may be a risk for some people, particularly
            those who are unusually sensitive to air pollution.
          </TableRow>
          <TableRow color="orange" name="Unhealthy for Sensitive Groups">
            Members of sensitive groups may experience health effects. The general public is less
            likely to be affected.
          </TableRow>
          <TableRow color="red" name="Unhealthy">
            Some members of the general public may experience health effects; members of sensitive
            groups may experience more serious health effects.
          </TableRow>
          <TableRow color="purple" name="Very Unhealthy">
            Health alert: The risk of health effects is increased for everyone.
          </TableRow>
          <TableRow color="maroon" name="Hazardous">
            Health warning of emergency conditions: everyone is more likely to be affected.
          </TableRow>
        </tbody>
      </table>
    </LegendWrapper>
  );
}
