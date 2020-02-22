import { FETCH_CALLS } from '../actions/type';

const initialState = {
    calls: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_CALLS:
            return {
                ...state,
                calls: action.payload,
            };
        default:
            return state;
    }
}
