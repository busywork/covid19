import axios from 'axios';
import { find, map, pick } from 'lodash';

const STATES_CURRENT_API_URL = 'https://api.covidtracking.com/v1/states/current.json';

/* -----------------    ACTION TYPES    ------------------ */

const FETCH_STATE_CURRENT = 'FETCH_STATE_CURRENT';
const FETCH_STATE_CURRENT_SUCCESS = 'FETCH_STATE_CURRENT_SUCCESS';

/* ------------    ACTION CREATORS      ------------------ */

const fetchData = () => ({ type: FETCH_STATE_CURRENT });
const fetchDataSuccess = data => ({ type: FETCH_STATE_CURRENT_SUCCESS, data });

/* ------------         REDUCER         ------------------ */

export default (state = { isLoading: false }, action) => {
  switch (action.type) {
    case FETCH_STATE_CURRENT:
      return { ...state, isLoading: true };
    case FETCH_STATE_CURRENT_SUCCESS:
      return { ...state, data: action.data, isLoading: false };
    default:
      return state;
  }
};

/* ------------       THUNK CREATORS     ------------------ */

export const getStateCurrentData = () => dispatch => {
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
      dispatch(fetchDataSuccess(res.data));
    })
    .catch(err => console.log(err));
};
