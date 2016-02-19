import {ACTION_API_ERROR} from '../constants/generalConsts';

export function dispatchAction(action, ...data) {
    return {type: action, ...data};
}

export function dispatchError(apiError, page) {
    return {type: ACTION_API_ERROR, ...apiError, page};
}
