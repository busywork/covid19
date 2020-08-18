import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Chart, Label } from '../components/common';
import { formatNum } from '../utils';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Section = styled.div`
  position: relative;
  margin: 1em;
`;

export default () => {
  const { data } = useSelector(state => (state.historic ? state.historic : null));

  if (!data) return null;

  return (
    <Container>
      <Section>
        <Chart data={data} dataKey="positiveIncrease" color="green" />
        <Label value={data[0] ? formatNum(data[0].positiveIncrease) : 0} label="New Cases" />
      </Section>
      <Section>
        <Chart data={data} dataKey="positive" color="yellow" />
        <Label value={data[0] ? formatNum(data[0].positive) : 0} label="Confirmed Cases" />
      </Section>
      <Section>
        <Chart data={data} dataKey="hospitalizedIncrease" color="orange" />
        <Label
          value={data[0] ? formatNum(data[0].hospitalizedIncrease) : 0}
          label="New Hospitalizations"
        />
      </Section>
      <Section>
        <Chart data={data} dataKey="death" color="red" />
        <Label value={data[0] ? formatNum(data[0].death) : 0} label="Confirmed Deaths" />
      </Section>
    </Container>
  );
};
