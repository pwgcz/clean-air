import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Bar,
  BarChart,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Brush,
} from 'recharts';
import styled from 'styled-components/macro';

const StyledCustomTooltip = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  background-color: rgba(87, 81, 81, 0.68);
  border-radius: 6px;
  color: white;
  text-align: center;
  p {
    height: 2px;
    margin: 15px;
    padding: 0;
  }
`;

export default function MeasuringData({ stand }) {
  const [data, setData] = useState([]);
  const [quality, setQuality] = useState([]);
  let arrData = [];
  let arrQuality = [];
  let tempArrData = Array(5).fill(1);

  async function fetchMeasuringData() {
    try {
      const resonseMeasure = await axios.get(`/measuring-data/${stand.id}/`);

      setData(resonseMeasure.data.reverse());
      const resonseIndex = await axios.get(`/quality-indicators/${stand.indexes}/`);
      setQuality(resonseIndex.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMeasuringData();
  }, [stand.id, stand.index_id]);

  console.log({ data, quality });
  // object factory wreating object of quality index limit value
  const dataFacroty = (arr) => {
    return {
      very_good: arr[0],
      good: arr[1],
      moderate: arr[2],
      sufficient: arr[3],
      bad: arr[4],
      very_bad: arr[5],
    };
  };

  // slice data value of each parameter in arrray depending on quality index value
  if (quality.length !== 0) {
    arrQuality = [
      0,
      quality.very_good,
      quality.good,
      quality.moderate,
      quality.sufficient,
      quality.bad,
    ];

    arrData = data.map((dataItem) => {
      return dataFacroty(
        tempArrData.map((item, i) => {
          if (dataItem.value >= arrQuality[i + 1]) {
            return arrQuality[i + 1] - arrQuality[i];
          } else if (dataItem.value >= arrQuality[i] && dataItem.value <= arrQuality[i + 1]) {
            return dataItem.value - arrQuality[i];
          } else {
            return 0;
          }
        }),
      );
    });
  }

  const barData = data.map((item, i) => {
    return Object.assign(item, arrData[i]);
  });

  const formatXAxis = (tickItem) => {
    return '';
  };

  const dateFormater = (param) => {
    return new Intl.DateTimeFormat('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    }).format(new Date(param));
  };
  const timeFormater = (param) => {
    return new Intl.DateTimeFormat('pl-PL', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(new Date(param));
  };
  // double if topotect from to quick passed mouse cursor on barchart
  const CustomTooltip = ({ payload, label, active }) => {
    if (active && payload) {
      if (payload[0]) {
        return payload[0].payload ? (
          <StyledCustomTooltip>
            <p>
              Value: {payload[0].payload.value ? payload[0].payload.value.toPrecision(3) : null}
            </p>
            <p>Time: {timeFormater(payload[0].payload.date)}</p>
            <p>{dateFormater(payload[0].payload.date)}</p>
          </StyledCustomTooltip>
        ) : null;
      }
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={barData}
        margin={{
          top: 40,
          right: 40,
          left: 0,
          bottom: 40,
        }}
        barSize={20}
      >
        <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />
        <XAxis height={50} dataKey="date" tickFormatter={formatXAxis} />
        <YAxis width={100} dataKey="value" label={{ value: stand.code + '[ug/m3]', angle: -90 }} />

        <Tooltip content={<CustomTooltip />} />
        <Bar stackId="pollution" dataKey="very_good" fill="green" />
        <Bar stackId="pollution" dataKey="good" fill="yellow" />
        <Bar stackId="pollution" dataKey="moderate" fill="orange" />
        <Bar stackId="pollution" dataKey="sufficient" fill="red" />
        <Bar stackId="pollution" dataKey="bad" fill="purple" />
        <Bar stackId="pollution" dataKey="very_bad" fill="maroon" />
        <Brush
          startIndex={barData.length - 25}
          endIndex={barData.length - 1}
          dataKey="date"
          tickFormatter={timeFormater}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
