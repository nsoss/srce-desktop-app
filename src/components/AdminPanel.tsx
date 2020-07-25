import formatDate from 'date-fns/format';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAdmin } from '../actions/adminActions';
import { addVolunteer, deleteVolunteer } from '../actions/volunteersActions';
import { AppState } from '../store';
import Icons from './Icons';
import Modal from './Modal';
import Pagination from './Pagination';
import ValidationForm from './ValidationForm';

interface AdminProps {
  addVolunteer: (volunteer: any) => void;
  admin: boolean;
  deleteVolunteer: (id: any) => void;
  setAdmin: (admin: boolean) => void;
  volunteers: Volunteer[];
}

class Admin extends Component<AdminProps> {
  componentDidMount() {
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
          <Modal>
            <input
              className='form-input-modal'
              type='text'
              name='inputPassword'
              onChange={this.handleChangeInput}
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
                <th scope='col'>Datum dodavanja</th>
                <th scope='col'></th>
              </tr>
            </thead>
            <tbody>
              {this.props.volunteers.map((volunteer) => {
                return (
                  <tr key={volunteer.id}>
                    <td>{volunteer.id}</td>
                    <td>{volunteer.name}</td>
                    <td>{formatDate(volunteer.joinedOn, 'dd.MM.yyyy')}</td>
                    <td className='text-center'>
                      <button
                        className='btn-srce'
                        style={{
                          backgroundColor: '#CC8066',
                        }}
                        onClick={() =>
                          this.handleDeleteVolunteer(volunteer.id)
                        }>
                        {' '}
                        Izbriši &nbsp;
                        <Icons.DeleteVolunteer />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            allData={this.props.volunteers}
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
  addVolunteer,
  deleteVolunteer,
  setAdmin,
})(Admin);
