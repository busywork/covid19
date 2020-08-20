import React from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { orderBy } from 'lodash';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

export default ({ data, dataKey, color }) => {
  const sorted = orderBy(data, 'date', 'asc');

  const lineChart = data[0] ? (
    <Line
      data={{
        labels: sorted.map(({ date }) => date),
        datasets: [
          {
            fill: false,
            backgroundColor: 'transparent',
            borderColor: color,
            borderCapStyle: 'round',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'round',
            borderWidth: 3,
            pointRadius: 0,
            data: sorted.map(e => e[dataKey]),
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: true,
        legend: { display: false },
        scales: {
          xAxes: [
            {
              display: false,
              ticks: {
                beginAtZero: true,
                display: false,
              },
            },
          ],
          yAxes: [
            {
              display: false,
              ticks: {
                beginAtZero: true,
                display: false,
              },
            },
          ],
        },
      }}
    />
  ) : null;

  return <Container>{lineChart}</Container>;
};
