import React, { Component } from 'react';
import { FaUserMinus, FaUserPlus, FaPencilAlt } from 'react-icons/fa';
import { format } from 'date-fns';

const electron = window.require('electron');
const fs = electron.remote.require('fs');
const ipcRenderer = electron.ipcRenderer;

class Admin extends Component {
    state = {
        volunteers: [],
        inputFirstName: '',
        inputLastName: '',
        isSaveButtonEnabled: false
    };
    componentDidMount() {
        ipcRenderer.send('getVolunteers');
        ipcRenderer.on('volunteersSent', (event, volunteers) => {
            this.setState({ volunteers: volunteers });
        });
    }
    handleChangeInput = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({ [name]: value });
    };
    handleAddVolunteer = newVolunteer => {
        ipcRenderer.send('insertVolunteer', newVolunteer);
        ipcRenderer.on('volunteerInserted', (event, insertedID) => {
            console.log(insertedID);
            if (insertedID) {
                let updatedVolunteers = this.state.volunteers;
                updatedVolunteers.push({
                    volunteer_id: insertedID,
                    first_name: newVolunteer.first_name,
                    last_name: newVolunteer.last_name,
                    created_at: newVolunteer.created_at
                });
                this.setState({
                    volunteers: updatedVolunteers,
                    inputFirstName: '',
                    inputLastName: ''
                });
            } else {
                console.log('Something went wrong...');
            }
        });
    };
    handleDeleteVolunteer = id => {
        ipcRenderer.send('deleteVolunteer', id);
        ipcRenderer.on('volunteerDeleted', (event, isDeleted) => {
            if (isDeleted) {
                this.setState({
                    volunteers: this.state.volunteers.filter(
                        v => v.volunteer_id !== id
                    )
                });
                this.state.inputFirstName = '';
                this.state.inputLastName = '';
            } else {
                console.log('Volunteer with id: ' + id + ' does not exists.');
            }
        });
    };
    render() {
        return (
            <div className="container-fluid col-lg-12">
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Ime</th>
                            <th scope="col">Prezime</th>
                            <th scope="col">Datum dodavanja</th>
                            <th scope="col"> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.volunteers.map((v, i) => {
                            return (
                                <tr key={i}>
                                    <th scope="row">{v.volunteer_id}</th>
                                    <td>{v.first_name}</td>
                                    <td>{v.last_name}</td>
                                    <td>
                                        {format(
                                            new Date(Date.parse(v.created_at)),
                                            'dd.MM.yyyy'
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                this.handleDeleteVolunteer(
                                                    v.volunteer_id
                                                )
                                            }
                                        >
                                            Izbriši &nbsp;
                                            <FaUserMinus />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        <tr>
                            <td colSpan="5">
                                <div className="border-top my-3"></div>
                                <h4 className="text-muted">
                                    <FaPencilAlt /> &nbsp;Unos novog volontera
                                </h4>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputFirstName">
                                            Ime
                                        </label>
                                        <input
                                            type="text"
                                            name="inputFirstName"
                                            value={this.state.inputFirstName}
                                            onChange={this.handleChangeInput}
                                            className="form-control"
                                            id="exampleInputFirstName1"
                                            placeholder="Unesite ime volontera"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputLastName">
                                            Prezime
                                        </label>
                                        <input
                                            type="text"
                                            name="inputLastName"
                                            value={this.state.inputLastName}
                                            onChange={this.handleChangeInput}
                                            className="form-control"
                                            id="exampleInputLastName1"
                                            placeholder="Unesite prezime volontera"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        disabled={
                                            !(
                                                this.state.inputFirstName &&
                                                this.state.inputLastName
                                            )
                                        }
                                        className="btn btn-success btn-sm"
                                        onClick={() =>
                                            this.handleAddVolunteer({
                                                first_name: this.state
                                                    .inputFirstName,
                                                last_name: this.state
                                                    .inputLastName,
                                                created_at: new Date().toISOString()
                                            })
                                        }
                                    >
                                        Dodaj &nbsp;
                                        <FaUserPlus />
                                    </button>
                                </form>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Admin;
