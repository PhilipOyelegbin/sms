const InitialState = {}

const UserReducer = (state, action) => {
  switch (action.type) {
    case 'GET_USER':
      return action.payload
    default:
      return state;
  }
}

export {UserReducer, InitialState}