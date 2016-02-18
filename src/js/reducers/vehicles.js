const initialState = {
    years: [],
    models: [],
    trims: [],
    selectedModel: 0,
    selectedTrim: 0
};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_YEARS':
            return {
                ...state,
                years: action.years
            };
        case 'UPDATE_MODELS':
            return {
                ...state,
                models: action.models
            };
        case 'UPDATE_TRIMS':
            return {
                ...state,
                trims: action.trims
            };
        case 'SELECT_MODEL':
            return {
                ...state,
                selectedModel: action.selectedModel
            };
        case 'SELECT_TRIM':
            return {
                ...state,
                selectedTrim: action.selectedTrim
            };
        default:
            return {
                ...state
            };
    }
}
