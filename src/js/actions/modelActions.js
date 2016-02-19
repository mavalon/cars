import http from '../tools/http.js';

export function getModel(modelId) {
    //console.log('model');
    //console.log(modelId);
    return (dispatch) => {
        let params = {
            method: 'GET'
        };

        return http(`/api/model/${modelId}`, params).then((data) => {
            let model = data;
            if (data.length === 1) model = data[0];
            dispatch(loadModel(model));
        });
    };
}

export function loadModel(model) {
    return {type: 'LOAD_MODEL', model: model};
}

export function selectType(type) {
    return {type: 'SELECT_TYPE', selectedType: type};
}

export function selectYear(year) {
    return {type: 'SELECT_YEAR', selectedYear: year};
}
