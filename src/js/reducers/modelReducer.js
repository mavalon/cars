const today = new Date();

const initialState = {
    model: {},
    selectedYear: today.getFullYear(),
    selectedType: 0,
    name: ''
};

export default function(state = initialState, action) {
    /*
    console.log('reducer');
    console.log(action);
    console.log(action.type);
     */
    switch (action.type) {
        case 'LOAD_MODEL':
            return {
                ...state,
                selectedYear: action.model.year,
                selectedType: action.model.type,
                name: action.model.name
            };
        case 'SELECT_TYPE':
            return {
                ...state,
                selectedType: action.selectedType
            };
        case 'SELECT_YEAR':
            return {
                ...state,
                selectedYear: action.selectedYear
            };
        default:
            return {
                ...state
            };
    }
}
