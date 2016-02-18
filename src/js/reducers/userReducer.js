




const initialState = {
  name: 'Pavel Zagoskin',
  title: 'Lord of the dance',
  loggedIn: false,
  permissions: []
};

export default function(state = initialState, action) {
  switch (action.type) {
  default:
    return {
      ...state
    };
  }
}
