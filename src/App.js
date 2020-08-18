import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import Daily from './containers/Daily';
import Map from './containers/Map';

import { GlobalStyle, theme } from './styles';
import { getCurrentData } from './redux/current';
import { getHistoricData } from './redux/historic';
import { getStateCurrentData } from './redux/states';

export default () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHistoricData());
    dispatch(getCurrentData());
    dispatch(getStateCurrentData());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme.default}>
      <GlobalStyle />
      <div className="container">
        <div className="row">
          <div className="col">
            <Daily />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Map />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};
