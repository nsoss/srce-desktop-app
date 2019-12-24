import React, { Component } from 'react';
import CalendarNew from './Calendar';
import { format } from 'date-fns';
import { IoMdList } from 'react-icons/io';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class CallsView extends Component {

    constructor(props) {
        super(props);
        this.state.selectedDate = props.onDateSelect;
    }

    state = {
        calls: [],
        selectedDate: '',
        filteredCalls: []
    };

    componentDidMount() {
        ipcRenderer.send('getCalls');
        ipcRenderer.once('callsSent', (event, callObject) => {
            this.setState({ calls: callObject });
        });
    }

    formatDate = datedb => {
        return format(new Date(Date.parse(datedb)), 'dd/MM/yyyy');
    }

    handleChangeTableData = date => {

        let callsByDate = this.state.calls.filter(p => {
            var str = this.formatDate(p.created_at);
            return str === format(date, 'dd/MM/yyyy').toString();
        });

        this.setState({
            filteredCalls: [...callsByDate]
        });

    };

    renderTableData() {
        return this.state.calls.map((item, index) => {
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
            <React.Fragment>
                <CalendarNew onDateSelect={date => this.handleChangeTableData(date)} />
                <div className="row mr-0">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <h4 className="text-center bg-dirty-green mt-3">
                            &nbsp;Lista poziva
                        </h4>
                        {this.state.calls.length > 0 ? (
                            <table striped hover className="call-data table">
                                <thead className="bg-light">
                                    <tr className="text-center">
                                        <th scope="col">ID</th>
                                        <th scope="col">Datum</th>
                                        <th scope="col">Volonter</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.filteredCalls.map((c, i) => {
                                        return (
                                            <tr key={i}>
                                                <th scope="row">{c.call_id}</th>
                                                <td>
                                                    {format(
                                                        new Date(Date.parse(c.created_at)),
                                                        'dd.MM.yyyy'
                                                    )}
                                                </td>
                                                <td>{c.volunteerId}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>) : (
                                <p className="text-center call-data-msg">
                                    Nema poziva na izabrani datum.
                            </p>
                            )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default CallsView;
