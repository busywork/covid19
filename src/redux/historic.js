import axios from 'axios';

const US_HISTORIC_API_URL = 'https://api.covidtracking.com/v1/us/daily.json';

/* -----------------    ACTION TYPES    ------------------ */

const FETCH_HISTORIC = 'FETCH_HISTORIC';
const FETCH_HISTORIC_SUCCESS = 'FETCH_HISTORIC_SUCCESS';

/* ------------    ACTION CREATORS      ------------------ */

const fetchData = () => ({ type: FETCH_HISTORIC });
const fetchDataSuccess = data => ({ type: FETCH_HISTORIC_SUCCESS, data });

/* ------------         REDUCER         ------------------ */

export default (state = { isLoading: false }, action) => {
  switch (action.type) {
    case FETCH_HISTORIC:
      return { ...state, isLoading: true };
    case FETCH_HISTORIC_SUCCESS:
      return { ...state, data: action.data, isLoading: false };
    default:
      return state;
  }
};

/* ------------       THUNK CREATORS     ------------------ */

export const getHistoricData = () => dispatch => {
  dispatch(fetchData());
  axios
    .get(US_HISTORIC_API_URL)
    .then(res => dispatch(fetchDataSuccess(res.data)))
    .catch(err => console.log(err));
};
