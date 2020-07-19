import { AppAction } from '../store';

interface FormState {
  formData: Array<any>;
}

const initialState: FormState = {
  formData: [],
};

export default function formReducer(state = initialState, action: AppAction) {
  switch (action.type) {
    case 'FETCH_FORM':
      return {
        ...state,
        formData: action.payload,
      };
    default:
      return state;
  }
}
