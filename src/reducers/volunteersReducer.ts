import * as ipc from '../ipc';
import { AppAction, AppDispatch } from '../store';

interface VolunteersState {
  volunteers: Volunteer[];
}

const initialState: VolunteersState = {
  volunteers: [],
};

const volunteerAdded = (volunteer: Volunteer) =>
  ({
    type: 'VOLUNTEER_ADDED',
    volunteer,
  } as const);

export const addVolunteer = (payload: VolunteerPayload) => (
  dispatch: AppDispatch
) => {
  ipc.addVolunteer(payload, (volunteer) => {
    dispatch(volunteerAdded(volunteer));
  });
};

export type VolunteersAction = ReturnType<typeof volunteerAdded>;

export default function volunteersReducer(
  state = initialState,
  action: AppAction
): VolunteersState {
  switch (action.type) {
    case 'INITIAL_DATA_RECEIVED':
      return {
        ...state,
        volunteers: action.initialData.volunteers,
      };
    case 'VOLUNTEER_ADDED':
      return {
        ...state,
        volunteers: [...state.volunteers, action.volunteer],
      };
    default:
      return state;
  }
}
