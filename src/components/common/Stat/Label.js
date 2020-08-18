import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
`;

const Value = styled.span`
  display: block;
  margin-bottom: -0.5em;
  font-size: ${({ theme }) => theme.sizes.xxxl};
  letter-spacing: -0.05em;
`;

const Label = styled.span`
  font-weight: bold;
  text-transform: uppercase;
`;

export default ({ value, label }) => {
  return (
    <Wrapper>
      <Value>{value}</Value>
      {label && <Label children={label} />}
    </Wrapper>
  );
};
