import { format } from 'date-fns';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCalls } from '../actions/callsActions';
import CalendarNew from './Calendar';
import Pagination from './Pagination';

class CallsView extends Component {
    constructor(props) {
        super(props);
        this.state.selectedDate = props.onDateSelect;
    }

    state = {
        calls: [],
        selectedDate: '',
        filteredCalls: [],
        dataPerPage: 2,
        currentData: [],
    };

    componentWillMount() {
        this.props.fetchCalls();
    }

    formatDate = datedb => {
        return format(new Date(Date.parse(datedb)), 'dd/MM/yyyy');
    };

    handleChangeTableData = date => {
        let callsByDate = this.props.calls.filter(p => {
            // var str = this.formatDate(p.created_at);
            // return str === format(date, 'dd/MM/yyyy').toString();
            return true;
        });

        this.setState({
            filteredCalls: [...callsByDate],
        });
    };

    handleClick = data => {
        this.setState({
            currentData: data,
        });
    };

    renderTableData() {
        return this.props.calls.map((item, index) => {
            const { id, time, duration, person, type, risk, volonter } = item; //destructuring
            return (
                <tr className="text-center" key={id}>
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
            <>
                <div className="calls-table">
                    {this.state.currentData.length > 0 ? (
                        <table hover className="call-data">
                            <thead>
                                <tr className="text-center">
                                    <th scope="col">ID</th>
                                    <th scope="col">Datum</th>
                                    <th scope="col">Volonter</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.calls.map((c, i) => {
                                    return (
                                        <tr key={i} className="text-center">
                                            <th scope="row">{c.id}</th>
                                            <td>
                                                TODO
                                                {/* {format(
                                                    new Date(
                                                        Date.parse(c.created_at)
                                                    ),
                                                    'dd.MM.yyyy'
                                                )} */}
                                            </td>
                                            <td>{c.volunteerId}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center call-data-msg">
                            Nema poziva na izabrani datum.
                        </p>
                    )}
                    <Pagination
                        allData={this.state.filteredCalls}
                        dataPerPage={this.state.dataPerPage}
                        handleClick={this.handleClick}
                    />
                </div>
                <div className="calls-view">
                    <button
                        className="btn-srce"
                        onClick={() => this.props.handleChangeLocation('call')}
                    >
                        Snimi
                    </button>
                    <button
                        className="btn-srce"
                        style={{ marginTop: '40px' }}
                        onClick={() => this.props.handleChangeLocation('call')}
                    >
                        Izmeni
                    </button>
                    <button className="btn-srce" style={{ marginTop: '40px' }}>
                        Kopiraj
                    </button>
                </div>
                <CalendarNew
                    onDateSelect={date => this.handleChangeTableData(date)}
                />
            </>
        );
    }
}

const mapStateToProps = state => ({
    calls: state.calls.calls,
});

export default connect(mapStateToProps, { fetchCalls })(CallsView);
