import axios from 'axios';

const US_CURRENT_API_URL = 'https://api.covidtracking.com/v1/us/current.json';

/* -----------------    ACTION TYPES    ------------------ */

const FETCH_CURRENT = 'FETCH_CURRENT';
const FETCH_CURRENT_SUCCESS = 'FETCH_CURRENT_SUCCESS';

/* ------------    ACTION CREATORS      ------------------ */

const fetchData = () => ({ type: FETCH_CURRENT });
const fetchDataSuccess = data => ({ type: FETCH_CURRENT_SUCCESS, data });

/* ------------         REDUCER         ------------------ */

export default (state = { isLoading: false }, action) => {
  switch (action.type) {
    case FETCH_CURRENT:
      return { ...state, isLoading: true };
    case FETCH_CURRENT_SUCCESS:
      return { ...state, data: action.data, isLoading: false };
    default:
      return state;
  }
};

/* ------------       THUNK CREATORS     ------------------ */

export const getCurrentData = () => dispatch => {
  dispatch(fetchData());
  axios
    .get(US_CURRENT_API_URL)
    .then(res => dispatch(fetchDataSuccess(res.data)))
    .catch(err => console.log(err));
};
