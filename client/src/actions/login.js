import axios from 'axios';
import { 
  AUTH_SIGN_OUT, 
  AUTH_SIGN_IN,
  AUTH_SIGN_UP,
  AUTH_ERROR,
  DASHBOARD_GET_DATA } from './types';

  export const oauthGoogle = data => {
    return async dispatch => {
       try {
         debugger;
        await axios.post('./users/oauth/google', {
        access_token: data
      });
 debugger;
      dispatch({
        type: AUTH_SIGN_IN
      });
    } catch(error){
       debugger;
      dispatch({
        type: AUTH_ERROR
      });
    }
      
    };
  }
  

  

  

  
  export const oauthFacebook = data => {
    return async dispatch => {
      await axios.post('./users/oauth/facebook', {
        access_token: data
      });
  
      dispatch({
        type: AUTH_SIGN_IN
      });
    };
  }
  

  
 
  export const checkAuth = () => {
    return async dispatch => {
      try {
        await axios.get('./users/status');
  
        dispatch({
          type: AUTH_SIGN_IN
        });
  
        console.log('user is auth-ed')
      } catch(err) {
        console.log('error', err)
      }
    };
  }
  
  export const getDashboard = () => {
    return async dispatch => {
      try {
        const res = await axios.get('./users/dashboard')
        debugger;
        console.log(res.data)
        dispatch({
          type: DASHBOARD_GET_DATA,
          payload: res.data
        })
  
      } catch(err) {
        console.error('err', err)
      }
    }
  }
  
  export const signOut = () => {
    return async dispatch => {
      await axios.get('./users/signout');
  
      dispatch({
        type: AUTH_SIGN_OUT
      })
    };
  }

  export const signUp = data => {
    return async dispatch => {
      try {
        await axios.post('./users/signup', data);
  
        dispatch({
          type: AUTH_SIGN_UP
        });
      } catch(err) {
        dispatch({
          type: AUTH_ERROR,
          payload: 'Already Registered'
        })
      }
    };
  }
  

  export const signIn = data => {
    return async dispatch => {
      debugger;
      try {
       
        await axios.post('./users/signin', data);
  
        dispatch({
          type: AUTH_SIGN_IN
        });
      } catch(err) {
        dispatch({
          type: AUTH_ERROR,
          payload: 'Incorrect Details'
        })
      }
    };
  }