const initialState = {
    specs: {},
    filename: ''
};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'LOAD_SPECS':
            ///console.log(action);
            return {
                ...state,
                specs: action.data.specs,
                filename: action.data.filename
            };
        default:
            return {
                ...state
            };
    }
}
