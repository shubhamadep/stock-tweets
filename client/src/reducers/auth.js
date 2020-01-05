import { 
  AUTH_SIGN_OUT, 
  AUTH_SIGN_IN,
  AUTH_SIGN_UP, 
  AUTH_ERROR } from '../actions/types';

const DEFAULT_STATE = {
  isAuthenticated: false,
  errorMessage: '',
  showPricingPage: false
}

export default (state = DEFAULT_STATE, action) => {
  debugger;
  switch(action.type) {
    case AUTH_SIGN_IN:
      return { ...state, isAuthenticated: true, errorMessage: '',showPricingPage:true} //For Debugging Purporse
    case AUTH_SIGN_OUT:
      return { ...state, isAuthenticated: false, errorMessage: '' }
    case AUTH_SIGN_UP:
      return { ...state, isAuthenticated: true, errorMessage: '',showPricingPage:true}
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload }
    default:
      return state
  }
}