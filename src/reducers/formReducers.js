import { FETCH_FORM } from '../actions/type';

const initialState = {
    formData: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_FORM:
            return {
                ...state,
                formData: action.payload,
            };
        default:
            return state;
    }
}
