import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from './rootReducer';
import { sessionService } from 'redux-react-session';
const store = createStore(rootReducer, applyMiddleware(thunk));
const validateSession = (session) => {
    // check if your session is still valid with a server check, through axios for instance
    return api.invokeRemoteSessionValidationThroughAxios(session).then(response => response.isSessionValid);
  }
  const options = { refreshOnCheckAuth: true, redirectPath: '/', driver: 'COOKIES', validateSession };
sessionService.initSessionService(store, options);
export default store;