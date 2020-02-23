import React from 'react';
import { FaUserPlus } from 'react-icons/fa';
import Input from './Input';

class ValidationForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            newUser: {
                firstName: '',
                lastName: '',
                errorMessage: '',
            },
        };
    }

    handleChangeInput = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        const regex = /^([A-Za-zŠšĐđČčĆćŽž]+\s)*[A-Za-zŠšĐđČčĆćŽž]*$/;
        if (value === '' || regex.test(value)) {
            this.setState(prevState => ({
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
                className="admin-add-volunteer-form"
                onSubmit={event => {
                    event.preventDefault();
                    this.props.addVolunteerFunc({
                        name: this.state.name,
                    });
                }}
            >
                <Input
                    name={'ime'}
                    title={'Ime'}
                    value={this.state.name}
                    placeholder={'Unesite ime volontera'}
                    onChange={event => {
                        this.setState({ name: event.target.value });
                    }}
                />

                <Input
                    type={'text'}
                    inputName={'lastName'}
                    fieldName={'prezime'}
                    title={'Prezime'}
                    value={this.state.newUser.lastName}
                    placeholder={'Unesite prezime volontera'}
                    handleChange={this.handleChangeInput}
                />

                <button
                    className="btn-srce"
                    style={{
                        backgroundColor: 'var(--admin-accent)',
                        marginRight: '0',
                    }}
                >
                    {' '}
                    Dodaj &nbsp;
                    <FaUserPlus />
                </button>
            </form>
        );
    }
}

export default ValidationForm;
