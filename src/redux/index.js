import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import current from './current';
import historic from './historic';
import states from './states';

const reducer = combineReducers({ current, historic, states });

const logger = createLogger({
  predicate: () => process.env.NODE_ENV !== 'production',
});

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk, logger)));
