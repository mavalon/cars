import {ACTION_API_ERROR} from '../constants/generalConsts';

const initialState = {

};

export default function(state = initialState, action) {
  switch (action.type) {
  case ACTION_API_ERROR :
    console.log(action.errors);
    return {
      ...state,
      [action.page]: {...action.errors}
    };
  default:
    return {
      ...state
    };
  }
}
