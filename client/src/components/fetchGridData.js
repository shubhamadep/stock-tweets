import { getGridDataPending, getGridDataSuccess } from '../actions/getactions';
import axios from 'axios';


function fetchGridData() {
  return dispatch => {
    dispatch(getGridDataPending);
    axios.get('/get_grid_data')
      .then(res => {
          dispatch(getGridDataSuccess(res['data']));
          return res['data'];
      })
      .catch(err => console.log(err))
  }
}

export default fetchGridData;
