import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

body {
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.background};
  font-family: 'Baloo Tamma 2', 'Comfortaa', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img {
  max-width: 100%;
  height: auto;
  display: inline-block;
}

svg {
  max-height: 100%;
}

canvas {
  width: 100%;
}

`;
