import React from 'react';
import styled from 'styled-components';
import { round } from 'lodash';

import { Chart, Hero, Note, Stat } from '../components/State';
import { formatNum } from '../utils';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: left;
  margin-bottom: 1em;
`;

export default ({ name, covid19Site, data, nickname, notes, population }) => {
  return (
    <>
      <Hero name={name} nickname={nickname} covid19Site={covid19Site} />
      <Container>
        <Stat value={formatNum(data[0].positiveIncrease)} label={'NEW CASES'} />
        <Stat value={formatNum(data[0].positive)} label={'TOTAL CASES'} />
        <Stat value={data[0].deathIncrease} label={'NEW DEATHS'} />
        <Stat value={data[0].death} label={'TOTAL DEATHS'} />
      </Container>

      <Chart data={data} dataKey={['positive', 'negative']} color="red" />

      <Container>
        <Stat
          value={formatNum(round(data[0].total / (population / 100000)))}
          label={'TESTS/100K POPULATION'}
        />
        <Stat
          value={formatNum(round(data[0].positive / (population / 100000)))}
          label={'POSITIVE/100K POPULATION'}
        />
        <Stat value={formatNum(data[0].total)} label={'TOTAL TESTS REPORTED'} />
      </Container>

      <Note label={'DATA NOTES'}>{notes}</Note>
    </>
  );
};
