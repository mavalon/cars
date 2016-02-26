import { combineReducers } from 'redux';
import user from '../reducers/userReducer';
import messages from '../reducers/messagesReducer';
import vehicles from '../reducers/vehiclesReducer';
import model from '../reducers/modelReducer';
import notifications from '../reducers/notificationsReducer';
import apiErrors from '../reducers/apiErrorsReducer';
import specifications from '../reducers/specsReducer';

const rootReducer = combineReducers({
    user,
    messages,
    notifications,
    apiErrors,
    vehicles,
    model,
    specifications
});

export default rootReducer;
