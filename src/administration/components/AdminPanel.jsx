import React, { Component } from 'react';
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
        volunteers: [],
        inputFirstName: '',
        inputLastName: '',
        isSaveButtonEnabled: false,
        showModal: false,
        password: '123',
        inputPassword: ''
    };
    componentDidMount() {
        ipcRenderer.send('getVolunteers');
        ipcRenderer.once('volunteersSent', (event, volunteers) => {
            this.setState({ volunteers: volunteers });
        });
        this.handleShowModal();
    }
    handleChangeInput = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({ [name]: value });
    };
    handleAddVolunteer = newVolunteer => {
        ipcRenderer.send('insertVolunteer', newVolunteer);
        ipcRenderer.once('volunteerInserted', (event, insertedID) => {
            if (insertedID) {
                newVolunteer.volunteer_id = insertedID;
                this.setState({
                    volunteers: [...this.state.volunteers, newVolunteer],
                    inputFirstName: '',
                    inputLastName: ''
                });
            } else {
                console.log('Something went wrong...');
            }
        });
    };


    passwordCheck = () => {
        if (this.state.inputPassword === this.state.password) {
            this.handleCloseModal();
        }else{
            this.handleShowModal();
        }
    }
    handleShowModal = () => this.setState({showModal: true})
    handleCloseModal = () => this.setState({showModal: false})
    handleDeleteVolunteer = id => {
        ipcRenderer.send('deleteVolunteer', id);
        ipcRenderer.once('volunteerDeleted', (event, isDeleted) => {
            if (isDeleted) {
                this.setState({
                    volunteers: this.state.volunteers.filter(
                        v => v.volunteer_id !== id
                    ),
                    inputFirstName: '',
                    inputLastName: ''
                });
            } else {
                console.log('Volunteer with id: ' + id + ' does not exists.');
            }
        });
    };
    render() {
        return (
            
            <Container fluid>
                    {this.state.showModal ? (
                        <Modal onClose={this.passwordCheck}>
                            <input
                                type="text"
                                name="inputPassword"
                                value={this.state.inputPassword}
                                onChange={this.handleChangeInput}
                                className="form-control"
                                id="examplePassword"
                                placeholder="Unesite sifru"
                            />
                        </Modal>
                    ) : null}
                <Table>
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
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() =>
                                                this.handleDeleteVolunteer(
                                                    v.volunteer_id
                                                )
                                            }
                                        >
                                            {' '}
                                            Izbriši &nbsp;
                                            <FaUserMinus />
                                        </Button>
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
                                <Form>
                                    <Form.Group controlId="formBasicFirstName">
                                        <Form.Label>Ime</Form.Label>
                                        <input
                                            type="text"
                                            name="inputFirstName"
                                            value={this.state.inputFirstName}
                                            onChange={this.handleChangeInput}
                                            className="form-control"
                                            id="exampleInputFirstName1"
                                            placeholder="Unesite ime volontera"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicLastName">
                                        <Form.Label>Prezime</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="inputLastName"
                                            value={this.state.inputLastName}
                                            onChange={this.handleChangeInput}
                                            className="form-control"
                                            placeholder="Unesite prezime volontera"
                                        />
                                    </Form.Group>
                                    <Button
                                        variant="success"
                                        size="sm"
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
                                        }
                                    >
                                        Dodaj &nbsp;
                                        <FaUserPlus />
                                    </Button>
                                </Form>
                            </td>
                        </tr>
                    </tbody>
                </Table>
              
            </Container>
        );
    }
}

export default Admin;
