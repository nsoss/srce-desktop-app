import { format } from 'date-fns';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCalls } from '../actions/callsActions';
import { AppState } from '../store';
import CalendarNew from './Calendar';
import Pagination from './Pagination';

interface CallsViewProps {
  onDateSelect?: () => void;
  fetchCalls: () => void;
  calls: Array<any>;
}

class CallsView extends Component<CallsViewProps> {
  constructor(props: CallsViewProps) {
    super(props);
    this.state.selectedDate = props.onDateSelect;
  }

  state = {
    calls: [],
    selectedDate: '',
    filteredCalls: [],
    dataPerPage: 2,
    currentData: [],
  } as any;

  componentDidMount() {
    this.props.fetchCalls();
  }

  formatDate = (datedb: string) => {
    return format(new Date(Date.parse(datedb)), 'dd/MM/yyyy');
  };

  handleChangeTableData: any = () => {
    this.setState({
      filteredCalls: this.props.calls,
    });
  };

  handleClick = (data: any) => {
    this.setState({
      currentData: data,
    });
  };

  renderTableData() {
    return this.props.calls.map((item) => {
      const { id, time, duration, person, type, risk, volonter } = item;
      return (
        <tr className='text-center' key={id}>
          <td>{id}</td>
          <td>{time}</td>
          <td>{duration}</td>
          <td>{person}</td>
          <td>{type}</td>
          <td>{risk}</td>
          <td>{volonter} </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className='calls-container'>
        <div className='calls-table'>
          {this.state.currentData.length > 0 ? (
            <table className='call-data'>
              <thead>
                <tr className='text-center'>
                  <th scope='col'>ID</th>
                  <th scope='col'>Datum</th>
                  <th scope='col'>Volonter</th>
                </tr>
              </thead>
              <tbody>
                {this.props.calls.map((c, i) => {
                  return (
                    <tr key={i} className='text-center'>
                      <th scope='row'>{c.id}</th>
                      <td>TODO</td>
                      <td>{c.volunteerId}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className='text-center call-data-msg'>
              Nema poziva na izabrani datum.
            </p>
          )}
          <Pagination
            allData={this.state.filteredCalls}
            dataPerPage={this.state.dataPerPage}
            handleClick={this.handleClick}
          />
        </div>
        <div className='calls-side-info'>
          <div style={{ flex: 1 }}>
            <CalendarNew
              onDateSelect={(date: any) => this.handleChangeTableData(date)}
            />
          </div>
          <div className='calls-buttons'>
            <button className='btn-srce'>Snimi</button>
            <button className='btn-srce'>Izmeni</button>
            <button className='btn-srce'>Kopiraj</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  calls: state.calls.calls,
});

export default connect(mapStateToProps, { fetchCalls })(CallsView);
