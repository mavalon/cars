import { combineReducers } from 'redux';
import user from '../reducers/userReducer';
import messages from '../reducers/messagesReducer';
import vehicles from '../reducers/vehicles';
import notifications from '../reducers/notificationsReducer';
import apiErrors from '../reducers/apiErrorsReducer';

const rootReducer = combineReducers({
  user,
  messages,
  notifications,
  apiErrors,
  vehicles
});

export default rootReducer;
