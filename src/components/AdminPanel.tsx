import React, { Component } from 'react';
import { FaUserMinus } from 'react-icons/fa';
import { connect } from 'react-redux';
import { setAdmin } from '../actions/adminActions';
import {
  addVolunteer,
  deleteVolunteer,
  fetchVolunteers,
} from '../actions/volunteersActions';
import { AppState } from '../store';
import Modal from './Modal';
import Pagination from './Pagination';
import ValidationForm from './ValidationForm';

interface AdminProps {
  addVolunteer: (volunteer: any) => void;
  admin: boolean;
  deleteVolunteer: (id: any) => void;
  fetchVolunteers: () => void;
  setAdmin: (admin: boolean) => void;
  volunteers: Array<any>;
}

class Admin extends Component<AdminProps> {
  state = {
    inputFirstName: '',
    inputLastName: '',
    isSaveButtonEnabled: false,
    password: '123',
    inputPassword: '',
    dataPerPage: 9,
    currentData: [],
  } as any;

  componentDidMount() {
    this.props.fetchVolunteers();
    this.handleShowModal();
  }

  handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({ [name]: value });
  };

  handleAddVolunteer = (newVolunteer: any) => {
    this.props.addVolunteer(newVolunteer);
    this.setState({
      inputFirstName: '',
      inputLastName: '',
    });
  };

  handleShowModal = () => {
    return this.props.admin;
  };

  handleClick = (data: any) => {
    this.setState({
      currentData: data,
    });
  };

  passwordCheck = () => {
    if (this.state.inputPassword === this.state.password) {
      this.props.setAdmin(true);
    }
  };

  handleDeleteVolunteer = (id: any) => {
    this.props.deleteVolunteer(id);
    this.setState({
      inputFirstName: '',
      inputLastName: '',
    });
  };
  render() {
    return (
      <div className='admin-panel'>
        {false ? (
          <Modal onClose={this.passwordCheck}>
            <input
              className='form-input-modal'
              type='text'
              name='inputPassword'
              value={this.state.inputPassword}
              onChange={this.handleChangeInput}
              onKeyDown={this.passwordCheck}
              id='examplePassword'
            />
          </Modal>
        ) : null}

        <ValidationForm addVolunteerFunc={this.handleAddVolunteer} />

        <div className='admin-table'>
          <table className='volunteer-data'>
            <thead className='volunteer-data mt-3'>
              <tr>
                <th scope='col'>ID</th>
                <th scope='col'>Ime</th>
                <th scope='col'>Prezime</th>
                <th scope='col'>Datum dodavanja</th>
                <th scope='col'> </th>
              </tr>
            </thead>
            <tbody>
              {this.state.currentData.map((v: any, i: number) => {
                return (
                  <tr key={i}>
                    <td>{v.id}</td>
                    <td>{v.name}</td>
                    <td>TODO</td>
                    <td>TODO</td>
                    <td className='text-center'>
                      <button
                        className='btn-srce'
                        style={{
                          backgroundColor: '#CC8066',
                        }}
                        onClick={() => this.handleDeleteVolunteer(v.id)}>
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
          <Pagination
            allData={this.props.volunteers}
            dataPerPage={this.state.dataPerPage}
            handleClick={this.handleClick}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: AppState) => ({
  volunteers: state.volunteers.volunteers,
  admin: state.admin.admin,
});

export default connect(mapStateToProps, {
  fetchVolunteers,
  addVolunteer,
  deleteVolunteer,
  setAdmin,
})(Admin);
