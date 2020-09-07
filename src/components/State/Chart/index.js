import React from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { orderBy } from 'lodash';

const Container = styled.div`
  display: flex;
  margin-bottom: 1em;
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
            data: sorted.map(e => e[dataKey[0]]),
            label: dataKey[0],
          },
          {
            fill: false,
            backgroundColor: 'transparent',
            borderColor: 'blue',
            borderCapStyle: 'round',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'round',
            borderWidth: 3,
            pointRadius: 0,
            data: sorted.map(e => e[dataKey[1]]),
            label: dataKey[1],
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: true,
        legend: { display: false },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
                display: true,
                callback: value => moment(value, 'YYYYMMDD').format('MM/DD'),
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                display: true,
              },
            },
          ],
        },
      }}
    />
  ) : null;

  return <Container>{lineChart}</Container>;
};
