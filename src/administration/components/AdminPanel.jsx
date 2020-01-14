import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchVolunteers, addVolunteer, deleteVolunteer } from '../../actions/volunteersActions';
import { FaUserMinus } from 'react-icons/fa';
import { format } from 'date-fns';
import Modal from './Modal.js';
import Pagination from '../../pagination/components/Pagination';

class Admin extends Component {
    state = {
        inputFirstName: '',
        inputLastName: '',
        isSaveButtonEnabled: false,
        showModal: false,
        password: '123',
        inputPassword: '',
        dataPerPage: 2,
        currentData: []
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

    handleClick = data => {
        console.log(data)
        this.setState({
            currentData: data
        });
    }

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
            <div className="admin-panel">
                {this.state.showModal ? (
                    <Modal onClose={this.passwordCheck} onCancel={() => this.props.handleChangeLocation("calls")} >
                        <input
                            className="form-input-modal"
                            type="text"
                            name="inputPassword"
                            value={this.state.inputPassword}
                            onChange={this.handleChangeInput}
                            id="examplePassword"
                        />
                    </Modal>
                ) : null}
                <div className="admin-add-volunteer-form">
                    <label>Ime</label>
                    <input type="text" name="inputFirstName" value={this.state.inputFirstName} onChange={this.handleChangeInput} />
                    <label>Prezime</label>
                    <input type="text" name="inputLastName" value={this.state.inputLastName} onChange={this.handleChangeInput} style={{ marginRight: '20px' }} />
                    <button
                        className="btn-srce"
                        style={{ backgroundColor: 'var(--admin-accent)', marginRight: '0' }}
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
                    >Dodaj
                        </button>
                </div>
                <div className="admin-table">
                    <table className="volunteer-data">
                        <thead striped hover className="volunteer-data mt-3" >
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Ime</th>
                                <th scope="col">Prezime</th>
                                <th scope="col">Datum dodavanja</th>
                                <th scope="col"> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.currentData.map((v, i) => {
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
                                        <td className="text-center">
                                            <button
                                                className="btn-srce"
                                                style={{ backgroundColor: "#CC8066" }}
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
                    <Pagination allData={this.props.volunteers} dataPerPage={this.state.dataPerPage} handleClick={this.handleClick} />
                </div>
            </div>
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
