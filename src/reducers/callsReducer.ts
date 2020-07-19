import { AppAction } from '../store';

interface CallsState {
    calls: Array<any>;
}

const initialState: CallsState = {
    calls: [],
};

export default function callsReducer(state = initialState, action: AppAction) {
    switch (action.type) {
        case 'FETCH_CALLS':
            return {
                ...state,
                calls: action.payload,
            };
        default:
            return state;
    }
}
