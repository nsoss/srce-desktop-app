import { combineReducers } from 'redux';
import volunteersReducer from './volunteersReducers';
import callsReducers from './callsReducers';
import formReducers from './formReducers';
import adminReducer from './adminReducers';

export default combineReducers({
    volunteers: volunteersReducer,
    calls: callsReducers,
    formData: formReducers,
    admin: adminReducer,
});
