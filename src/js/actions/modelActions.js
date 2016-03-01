import http from '../tools/http.js';

export function getModel(modelId, cb) {
    //console.log('model');
    //console.log(modelId);
    return (dispatch) => {
        let params = {
            method: 'GET'
        };

        return http(`/api/model/${modelId}`, params).then((data) => {
            let model = data;
            if (data.length === 1) model = data[0];
            cb(data);
            dispatch(loadModel(model));
        });
    };
}

export function saveJson(container) {
    console.log(container);
    let sectionsObject = {};
    let sectionArray = [];
    let divSections = $(container).find('.section');

    for (let n = 0; n < $(divSections).size(); n++) {
        let section = $(divSections).eq(n);
        let obj = {
            category: $(section).find('h3:eq(0)').text()
        };

        let specificationsArray = [];
        let specs = $(section).find('.specsTables').children('div');

        for (let s = 0; s < $(specs).size(); s++) {
            let spec = {};
            spec.trims = [];
            spec.specs = [];

            let cells = $(specs).eq(s).find('th');

            for (let th = 0; th < cells.size(); th++) {
                let thead = $(cells).eq(th);
                if (th === 0) {
                    spec.name = $(thead).text();
                } else {
                    spec.trims = [...spec.trims, $(thead).text()];
                }
            }
            let body = $(specs).eq(s).find('.specRow');
            let features = [];
            for (let row = 0; row < $(body).size(); row++) {
                let bro = $(body).eq(row);
                let feature = {};
                feature.name = '';
                feature.trims = [];

                console.log($(bro).find('td').size());
                for (let col = 0; col < $(bro).find('td').size(); col++) {
                    let column = $(bro).find('td').eq(col);
                    //console.log(column);
                    if (col === 0) {
                        feature.name = $(column).text();
                    } else {
                        feature.trims = [...feature.trims, { name: spec.trims[col - 1], value: $(column).text()}];
                    }
                }
                features = [...features, feature];
            }
            spec.specs = features;
            specificationsArray = [...specificationsArray, spec];
        }

        obj.specifications = specificationsArray;
        sectionArray = [...sectionArray, obj];
    }
    sectionsObject.sections = sectionArray;
    console.log(sectionsObject);
    return (dispatch) => {
        let json = JSON.stringify(sectionsObject);
        let params = {
            method: 'POST',
            body: JSON.stringify({
                json: json // JSON.stringify(sectionsObject)
            })
        };
        return http(`/api/specs/update`, params).then((data) => {
            dispatch({type: 'UPDATE_VALUE', editValue: 'test'});
        });
    };

    //return {type: 'UPDATE_VALUE', editValue: 'test'};
}

export function loadModel(model) {
    return {type: 'LOAD_MODEL', model: model};
}

export function selectType(type) {
    return {type: 'SELECT_TYPE', selectedType: type};
}

export function updateName(name) {
    return {type: 'UPDATE_NAME', name: name};
}

export function selectYear(year) {
    return {type: 'SELECT_YEAR', selectedYear: year};
}

export function updateValue(value) {
    return {type: 'UPDATE_VALUE', editValue: value};
}
