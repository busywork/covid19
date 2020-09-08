import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.sizes.xxl};
`;

export default ({ name, nickname, covid19Site }) => {
  return (
    <>
      <Container>
        <h2>{name}</h2>
        <h4>{nickname}</h4>
        <div>
          <a href={covid19Site} target="_blank" rel="noopener noreferrer">
            <button type="button" className="btn btn-outline-primary">
              State Health
            </button>
          </a>
        </div>
      </Container>
    </>
  );
};
