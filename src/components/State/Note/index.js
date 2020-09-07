import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
`;

const Label = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  text-decoration: underline;
`;

const Value = styled.div`
  font-size: ${({ theme }) => theme.sizes.md};
`;

export default ({ label, children }) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Value>
        <ReactMarkdown source={children} />
      </Value>
    </Container>
  );
};
