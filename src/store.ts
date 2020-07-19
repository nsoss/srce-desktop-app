import { createStore, applyMiddleware, combineReducers, Dispatch } from 'redux';
import thunk from 'redux-thunk';
import adminReducer from './reducers/adminReducer';
import callsReducer from './reducers/callsReducer';
import formReducer from './reducers/formReducer';
import volunteersReducer from './reducers/volunteersReducer';
import { AdminAction } from './actions/adminActions';
import { CallsAction } from './actions/callsActions';
import { FormAction } from './actions/formActions';
import { VolunteersAction } from './actions/volunteersActions';

const rootReducer = combineReducers({
  admin: adminReducer,
  calls: callsReducer,
  form: formReducer,
  volunteers: volunteersReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppAction =
  | AdminAction
  | CallsAction
  | FormAction
  | VolunteersAction;
export type AppDispatch = Dispatch<AppAction>;

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
