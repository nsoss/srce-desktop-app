import { AppAction } from '../store';

interface VolunteersState {
  volunteers: Volunteer[];
}

const initialState: VolunteersState = {
  volunteers: [],
};

export default function volunteersReducer(
  state = initialState,
  action: AppAction
) {
  switch (action.type) {
    case 'INITIAL_DATA_RECEIVED':
      return {
        ...state,
        volunteers: action.initialData.volunteers,
      };
    case 'FETCH_VOLUNTEERS':
      return {
        ...state,
        volunteers: action.payload,
      };
    case 'ADD_VOLUNTEER':
      return {
        ...state,
        volunteers: [...state.volunteers, action.payload],
      };
    case 'DELETE_VOLUNTEER':
      return {
        ...state,
        volunteers: [
          ...state.volunteers.filter(function (obj) {
            return obj.id !== action.payload;
          }),
        ],
      };
    default:
      return state;
  }
}
