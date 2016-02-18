import http from '../tools/http.js';

export function updateYears() {
    return {type: 'UPDATE_YEARS', years: [3000, 5000]};
}


export function getYears(view) {
    return (dispatch) => {
        let params = {
            method: 'GET'
        };

        return http('/api/years', params).then((data) => {
            dispatch(initYears(data.years));
        });
    };
}

export function getModels(year) {
    if (!year) {
        let d = new Date();
        year = d.getFullYear();
    }
    return (dispatch) => {
        let params = {
            method: 'GET'
        };

        return http(`/api/models/${year}`, params).then((data) => {
            // dispatch(selectTrim(0));
            //dispatch(selectModel(0));
            dispatch(initModels(data));
        });
    };
}
export function getTrims(modelId) {
    return (dispatch) => {
        let params = {
            method: 'GET'
        };

        return http(`/api/trims/${modelId}`, params).then((data) => {
            //dispatch(selectTrim(0));
            dispatch(initTrims(data));
        });
    };
}

export function initYears(years) {
    return {type: 'UPDATE_YEARS', years: years};
}
export function initModels(models) {
    return {type: 'UPDATE_MODELS', models: models};
}
export function initTrims(trims) {
    return {type: 'UPDATE_TRIMS', trims: trims};
}
export function selectModel(modelId) {
    return {type: 'SELECT_MODEL', selectedModel: modelId};
}
export function selectTrim(trimId) {
    return {type: 'SELECT_TRIM', selectedTrim: trimId};
}
