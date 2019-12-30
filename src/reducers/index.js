import { combineReducers } from 'redux';
import volunteersReducer from './volunteersReducers';
import callsReducers from './callsReducers'

export default combineReducers({
    volunteers: volunteersReducer,
    calls: callsReducers
});
