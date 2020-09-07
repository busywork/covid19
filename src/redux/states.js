import axios from 'axios';
import { find, groupBy, pick, map } from 'lodash';

const STATES_CURRENT_API_URL = 'https://api.covidtracking.com/v1/states/current.json';
const STATES_HISTORIC_API_URL = 'https://api.covidtracking.com/v1/states/daily.json';
const STATES_INFO_API_URL = 'https://api.covidtracking.com/v1/states/info.json';

/* -----------------    ACTION TYPES    ------------------ */

const FETCH_STATE = 'FETCH_STATE';
const FETCH_STATE_CURRENT_SUCCESS = 'FETCH_STATE_CURRENT_SUCCESS';
const FETCH_STATE_HISTORIC_SUCCESS = 'FETCH_STATE_HISTORIC_SUCCESS';

/* ------------    ACTION CREATORS      ------------------ */

const fetchData = () => ({ type: FETCH_STATE });
const fetchCurrentSuccess = data => ({ type: FETCH_STATE_CURRENT_SUCCESS, data });
const fetchHistoricSuccess = data => ({ type: FETCH_STATE_HISTORIC_SUCCESS, data });

/* ------------         REDUCER         ------------------ */

export default (state = { isLoading: false }, action) => {
  switch (action.type) {
    case FETCH_STATE:
      return { ...state, isLoading: true };
    case FETCH_STATE_CURRENT_SUCCESS:
      return { ...state, current: action.data, isLoading: false };
    case FETCH_STATE_HISTORIC_SUCCESS:
      return { ...state, historic: action.data, isLoading: false };
    default:
      return state;
  }
};

/* ------------       THUNK CREATORS     ------------------ */

export const getStateCurrent = () => dispatch => {
  let states = require('../utils/states-full.json');
  dispatch(fetchData());
  axios
    .get(STATES_CURRENT_API_URL)
    .then(res => {
      states = states.map(state => pick(state, ['code', 'state', 'population']));
      const continental = map(states, 'code');
      res.data = res.data.filter(({ state }) => continental.includes(state));
      res.data = res.data.map(state => ({
        name: find(states, ['code', state.state]).state,
        population: find(states, ['code', state.state]).population,
        ...state,
      }));
      res.data = res.data.map(
        ({
          state,
          name,
          population,
          positive,
          positiveIncrease,
          hospitalizedCurrently,
          hospitalizedIncrease,
          death,
          deathIncrease,
          total,
        }) => ({
          id: state,
          name,
          population,
          positive,
          positiveIncrease,
          positivePerCapita: positive / (population / 100000),
          hospitalizedCurrently,
          hospitalizedIncrease,
          death,
          deathIncrease,
          deathPerCapita: death / (population / 100000),
          total,
          totalPerCapita: total / (population / 100000),
        })
      );
      dispatch(fetchCurrentSuccess(res.data));
    })
    .catch(err => console.log(err));
};

export const getStateHistoric = () => dispatch => {
  let states = require('../utils/states-full.json');
  dispatch(fetchData());
  axios
    .all([axios.get(STATES_HISTORIC_API_URL), axios.get(STATES_INFO_API_URL)])
    .then(res => {
      const continental = map(states, 'code');
      res[1].data = res[1].data.filter(({ state }) => continental.includes(state));
      res[0].data = groupBy(res[0].data, element => element.state);
      // console.log('RES000', res[0].data);
      // console.log('RES111', res[1].data);
      res[1].data = res[1].data.map(state => ({
        ...find(states, ['code', state.state]),
        data: res[0].data[state.state],
        ...state,
      }));
      dispatch(fetchHistoricSuccess(res[1].data));
    })
    .catch(err => console.log(err));
};
