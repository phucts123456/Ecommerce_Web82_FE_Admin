import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
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
  session: sessionReducer
});

export default rootReducer;