import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchVolunteers, addVolunteer, deleteVolunteer } from '../../actions/volunteersActions';
import {
    Container,
    Row,
    Col,
    Table,
    Form,
    Dropdown,
    DropdownButton,
    ButtonToolbar,
    Button
} from 'react-bootstrap';
import { FaUserMinus, FaUserPlus, FaPencilAlt } from 'react-icons/fa';
import { format } from 'date-fns';
import Modal from './Modal.js';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class Admin extends Component {
    state = {
        inputFirstName: '',
        inputLastName: '',
        isSaveButtonEnabled: false,
        showModal: false,
        password: '123',
        inputPassword: ''
    };
    componentDidMount() {
        this.handleShowModal();
    }
    componentWillMount() {
        this.props.fetchVolunteers();
    }
    handleChangeInput = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({ [name]: value });
    };
    handleAddVolunteer = newVolunteer => {
        this.props.addVolunteer(newVolunteer);
        this.setState({
            inputFirstName: '',
            inputLastName: ''
        });
    };

    passwordCheck = () => {
        if (this.state.inputPassword === this.state.password) {
            this.handleCloseModal();
        } else {
            this.handleShowModal();
        }
    }
    handleShowModal = () => this.setState({ showModal: true })
    handleCloseModal = () => this.setState({ showModal: false })

    handleDeleteVolunteer = id => {
        this.props.deleteVolunteer(id);
        this.setState({
            inputFirstName: '',
            inputLastName: ''
        });
    };
    render() {
        return (
            <React.Fragment>
                <div className="row border-top border-bottom border-green mr-0 pr-0">
                    {this.state.showModal ? (
                        <Modal onClose={this.passwordCheck} onCancel={() => this.props.handleChangeLocation("calls")}>
                            <input
                                className="form-control justify-content-center"
                                type="text"
                                name="inputPassword"
                                value={this.state.inputPassword}
                                onChange={this.handleChangeInput}
                                id="examplePassword"
                            />
                        </Modal>
                    ) : null}
                    <form className="col-12 m-0 pr-0 pl-5 mt-3 mb-3 ">
                        <div className="form-row mr-0 align-items-center">
                            <div className="form-group col-md-5">
                                <label htmlFor="name">Ime</label>
                                <input name="inputFirstName" value={this.state.inputFirstName} type="text" className="form-control" id="name" onChange={this.handleChangeInput} />
                            </div>
                            <div className="form-group col-md-5">
                                <label htmlFor="surname">Prezime</label>
                                <input name="inputLastName" value={this.state.inputLastName} type="text" className="form-control" id="surname" onChange={this.handleChangeInput} />
                            </div>
                            <div className="form-group col-md-1 mt-3 pt-3">
                                <button
                                    className="btn btn-dark-green  ml-2 form-control"
                                    disabled={
                                        !(
                                            this.state.inputFirstName &&
                                            this.state.inputLastName
                                        )
                                    }
                                    onClick={() =>
                                        this.handleAddVolunteer({
                                            first_name: this.state
                                                .inputFirstName,
                                            last_name: this.state
                                                .inputLastName,
                                            created_at: new Date().toISOString()
                                        })
                                    }>
                                    {' '}
                                    Dodaj &nbsp;
                                <FaUserPlus />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="row ml-1 mr-0">
                    <table className="table">
                        <thead striped hover className="call-data table mt-3" >
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Ime</th>
                                <th scope="col">Prezime</th>
                                <th scope="col">Datum dodavanja</th>
                                <th scope="col"> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.volunteers.map((v, i) => {
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
                                                className="btn btn-outline-danger"
                                                onClick={() =>
                                                    this.handleDeleteVolunteer(
                                                        v.volunteer_id
                                                    )
                                                }
                                            >
                                                {' '}
                                                Izbriši &nbsp;
                                            <FaUserMinus />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => ({
    volunteers: state.volunteers.volunteers
});

export default connect(
    mapStateToProps,
    { fetchVolunteers, addVolunteer, deleteVolunteer }
)(Admin);
