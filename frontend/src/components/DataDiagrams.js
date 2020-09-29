import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, BarChart, Tooltip, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export const MeasuringData = ({ stand }) => {
  const [data, setData] = useState([]);
  const [quality, setQuality] = useState('');
  let arrData = [];
  let arrQuality = [];
  let tempArrData = Array(5).fill(1);

  async function fetchMeasuringData() {
    try {
      const resonseMeasure = await axios.get(`/measuring-data/${stand.id}`);
      setData(resonseMeasure.data.reverse());
      const resonseIndex = await axios.get(`/quality-indicators/${stand.index_id}`);
      setQuality(resonseIndex.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMeasuringData();
  }, [stand.id, stand.index_id]);

  // object factory vreating object of quality indef limit value
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
  if (quality !== '') {
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p>Value: {payload[0].payload.value ? payload[0].payload.value.toPrecision(3) : null} </p>
          <p>Time: {payload[0].payload.date.slice(11, 16)}</p>
          <p>Date: {payload[0].payload.date.slice(0, 10)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="95%" height={300}>
      <BarChart
        data={barData}
        className="chart-wrapper"
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />
        <XAxis height={50} dataKey="date" tickFormatter={formatXAxis} />
        <YAxis width={100} dataKey="value" label={{ value: stand.code + '[ug/m3]', angle: -90 }} />

        <Tooltip content={<CustomTooltip />} />
        <Bar stackId="pollution" dataKey="very_good" fill="#33FF57" />
        <Bar stackId="pollution" dataKey="good" fill="#DBFF33" />
        <Bar stackId="pollution" dataKey="moderate" fill="#FFBD33" />
        <Bar stackId="pollution" dataKey="sufficient" fill="#FF5733" />
        <Bar stackId="pollution" dataKey="bad" fill="#900C3F " />
        <Bar stackId="pollution" dataKey="very_bad" fill="##581845  " />
      </BarChart>
    </ResponsiveContainer>
  );
};
