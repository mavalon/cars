import http from '../tools/http.js';

export function getSpecifications(filename, cb) {
    //console.log('model');
    //console.log(modelId);
    return (dispatch) => {
        let params = {
            method: 'GET'
        };

        // read not get
        return http(`/api/specs/${filename}`, params).then((data) => {
            dispatch(loadSpecifications(filename, data));
        });
    };
}

export function loadSpecifications(filename, specifications) {
    return {type: 'LOAD_SPECS', data: {filename: filename, specs: specifications}};
}

