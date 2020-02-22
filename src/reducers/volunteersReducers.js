import {
    FETCH_VOLUNTEERS,
    ADD_VOLUNTEER,
    DELETE_VOLUNTEER,
} from '../actions/type';

const initialState = {
    volunteers: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_VOLUNTEERS:
            return {
                ...state,
                volunteers: action.payload,
            };
        case ADD_VOLUNTEER:
            return {
                ...state,
                volunteers: [...state.volunteers, action.payload],
            };
        case DELETE_VOLUNTEER:
            return {
                ...state,
                volunteers: [
                    ...state.volunteers.filter(function(obj) {
                        return obj.id !== action.payload;
                    }),
                ],
            };
        default:
            return state;
    }
}
