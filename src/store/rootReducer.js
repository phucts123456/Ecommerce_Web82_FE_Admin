import { combineReducers } from 'redux';

const initialState = {
  loginUser: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        loginUser: {
          token: action.payload
        },
      }
      
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;