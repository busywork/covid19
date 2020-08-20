import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
  &:checked + label span {
    left: calc(100%);
    transform: translateX(-100%);
  }
`;

const StyledLabel = styled.label`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  width: 32px;
  height: 14px;
  background: ${({ theme }) => theme.colors.alt};
  border-radius: 1em;
  cursor: pointer;
  transition: background-color 0.2s;
`;

const StyledSpan = styled.span`
  position: absolute;
  top: -1px;
  left: 0px;
  width: 16px;
  height: 16px;
  border-radius: 1em;
  transition: 0.2s;
  background: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.6);
  content: '';
`;

export default ({ checked, onChange, onColor }) => {
  return (
    <>
      <StyledInput checked={checked} onChange={onChange} id={`toggle-switch`} type="checkbox" />
      <StyledLabel style={{ background: checked && onColor }} htmlFor={`toggle-switch`}>
        <StyledSpan />
      </StyledLabel>
    </>
  );
};
