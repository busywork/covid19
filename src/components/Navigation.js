import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Logo } from './icons';

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 1em;
`;

const StyledH2 = styled.h2`
  margin-bottom: 0;
  font-weight: bold;
`;

export default () => (
  <StyledNav>
    <Link to={'/'}>
      <StyledH2>
        COVID19
        <Logo />
        BACKLOGGED
      </StyledH2>
    </Link>
  </StyledNav>
);
