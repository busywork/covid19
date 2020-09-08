import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { Home, State } from './pages';
import { Navigation } from './components';

import { GlobalStyle, theme } from './styles';
import { getHistoricData } from './redux/historic';
import { getStateCurrent, getStateHistoric } from './redux/states';

export default () => {
  const dispatch = useDispatch();

  useEffect(() => {
    Promise.all([
      dispatch(getHistoricData()),
      dispatch(getStateCurrent()),
      dispatch(getStateHistoric()),
    ]);
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme.default}>
      <GlobalStyle />
      <Navigation />
      <Switch>
        <Route path="/:id" component={State} />
        <Route exact path="/" component={Home} />
      </Switch>
    </ThemeProvider>
  );
};
