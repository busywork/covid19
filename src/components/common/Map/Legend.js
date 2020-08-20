import React from 'react';
import styled from 'styled-components';
import { last, max, min, round } from 'lodash';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
`;

const Swatch = styled.div`
  display: inline-block;
  padding: 1em;
  margin: 0 0.5em;
  background-color: ${props => props.bg};
`;

const Value = styled.span`
  display: block;
  margin-bottom: -0.5em;
`;

const Label = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.sizes.xs};
`;

export default ({ dataKey, colorRange, total }) => (
  <Container>
    <div className="text-right mr-2">
      <Value>
        {round(min(total))}
        {dataKey === 'positivePerCapita' || dataKey === 'totalPerCapita' ? '/ 100k' : null}
      </Value>
      <Label>LEAST</Label>
    </div>
    <Swatch bg={colorRange[0]} />
    <Swatch bg={colorRange[3]} />
    <Swatch bg={colorRange[5]} />
    <Swatch bg={colorRange[7]} />
    <Swatch bg={last(colorRange)} />
    <div className="ml-2">
      <Value>
        {round(max(total))}
        {dataKey === 'positivePerCapita' || dataKey === 'totalPerCapita' ? '/ 100k' : null}
      </Value>
      <Label>MOST</Label>
    </div>
  </Container>
);
