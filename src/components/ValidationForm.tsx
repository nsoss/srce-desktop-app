import React from 'react';
import Icons from './Icons';
import Input from './Input';

class ValidationForm extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      name: '',
      newUser: {
        firstName: '',
        lastName: '',
        errorMessage: '',
      },
    };

    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    const regex = /^([A-Za-zŠšĐđČčĆćŽž]+\s)*[A-Za-zŠšĐđČčĆćŽž]*$/;
    if (value === '' || regex.test(value)) {
      this.setState((prevState: any) => ({
        newUser: {
          ...prevState.newUser,
          [name]: value,
        },
      }));
    }
  };

  render() {
    return (
      <form
        className='admin-add-volunteer-form'
        onSubmit={(event) => {
          event.preventDefault();
          this.props.addVolunteerFunc({
            name: this.state.name,
          });
        }}>
        <Input
          name={'ime'}
          title={'Ime'}
          value={this.state.name}
          placeholder={'Unesite ime volontera'}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({ name: event.target.value });
          }}
        />

        <Input
          type={'text'}
          name='prezime'
          title={'Prezime'}
          value={this.state.newUser.lastName}
          placeholder={'Unesite prezime volontera'}
          onChange={this.handleChangeInput}
        />

        <button
          className='btn-srce'
          style={{
            backgroundColor: 'var(--admin-accent)',
            marginRight: '0',
          }}>
          {' '}
          Dodaj &nbsp;
          <Icons.AddVolunteer />
        </button>
      </form>
    );
  }
}

export default ValidationForm;
