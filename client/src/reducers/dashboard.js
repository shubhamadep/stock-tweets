import { 
  DASHBOARD_GET_DATA, 
} from '../actions/types';

const DEFAULT_STATE = {
  name:'',
  profileUrl:''
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case DASHBOARD_GET_DATA:
      return { ...state, secret: action.payload.name, methods: action.payload.profileUrl }
    default:
      return state
  }
}