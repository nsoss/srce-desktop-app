import { SET_ADMIN } from '../actions/type';

const initialState = { admin: false };

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_ADMIN:
            return {
                ...state,
                admin: action.payload,
            };
        default:
            return state;
    }
}
