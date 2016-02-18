
const EMAIL = 'm.wallace@mwindustries.com';
const PASSWORD = 'abc123';


function login(email, pass) {
  return new Promise((r, f) => {
    if (email === EMAIL && pass === PASSWORD) {
      r({
        username: 'M.Wallace',
        email: 'm.wallace@mwindustries.com'
      });
    } else {
      console.log('error');
      f({
        errors: {
          message: 'email and password do not match'
        }
      });
    }
  });
}


function register() {
  return login(EMAIL, PASSWORD);
}


import {ACTION_LOGIN, ACTION_REGISTER} from '../constants/authConsts';
import {LOGIN_PAGE, REGISTER_PAGE} from '../constants/pageConsts';
import {dispatchAction, dispatchError} from './generalActions';





export function loginAsync(email, password) {
  return async dispatch => {
    try {
      console.log('try login');
      const loginData = await login(email, password);
      dispatch(dispatchAction(ACTION_LOGIN, ...loginData));
    } catch (apiError) {
      console.log('error', apiError);
      dispatch(dispatchError(apiError, LOGIN_PAGE));
    }
  };
}


export function registerAsync(email, name, password, device) {
  return async dispatch => {
    try {
      const registerData = register();
      dispatch(dispatchAction(ACTION_REGISTER, ...registerData));
    } catch (apiError) {
      dispatch(dispatchError(apiError, REGISTER_PAGE));
    }
  };
}

