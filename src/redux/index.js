import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import current from './current';
import historic from './historic';
import states from './states';

const reducer = combineReducers({ current, historic, states });

export default createStore(reducer, applyMiddleware(thunk, logger));
