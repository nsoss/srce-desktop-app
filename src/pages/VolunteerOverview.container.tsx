import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { addVolunteer } from '../reducers/volunteersReducer';
import { AppAction, AppState } from '../store';
import VolunteerOverview from './VolunteerOverview';

interface VolunteerOverviewPropsFromState {
  volunteers: Array<Volunteer>;
}

function mapStateToProps(state: AppState): VolunteerOverviewPropsFromState {
  return { volunteers: state.volunteers.volunteers };
}

interface VolunteerOverviewPropsFromDispatch {
  onAdd: (volunteerName: string) => void;
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<AppState, void, AppAction>
): VolunteerOverviewPropsFromDispatch {
  return {
    onAdd: (volunteerName) => {
      dispatch(addVolunteer({ name: volunteerName }));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VolunteerOverview);
