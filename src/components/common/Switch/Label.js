import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  margin: 0 0.25em;
  line-height: 0.875em;
`;

export default ({ checked, onClick, label }) => {
  return (
    <StyledButton
      type="button"
      className={`btn ${checked ? 'btn-primary' : 'btn-secondary'} btn-sm`}
      onClick={onClick}
    >
      {label}
    </StyledButton>
  );
};
