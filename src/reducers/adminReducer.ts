import { AppAction } from '../store';

interface AdminState {
  admin: boolean;
}

const initialState: AdminState = {
  admin: false,
};

export default function adminReducer(state = initialState, action: AppAction) {
  switch (action.type) {
    case 'SET_ADMIN':
      return {
        ...state,
        admin: action.payload,
      };
    default:
      return state;
  }
}
