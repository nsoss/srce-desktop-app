import React from 'react';
import Input from './Input';
import { FaUserPlus } from 'react-icons/fa';

class ValidationForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            newUser: {
                firstName: "",
                lastName: "",
                errorMessage: "",
            },
        }
    }

    handleChangeInput = event => {
        console.log(event.target);
        const target = event.target;
        const name = target.name;
        const value = target.value;
        
        const regex = /^([A-Za-zŠšĐđČčĆćŽž]+\s)*[A-Za-zŠšĐđČčĆćŽž]*$/;
        if (value === '' || regex.test(value)) {
            this.setState( prevState => ({
                newUser: {
                    ...prevState.newUser,
                    [name]: value
                }
            }));
        }
    }

    render() {
        return (
            <form className="admin-add-volunteer-form" >
               
                <Input
                    type={"text"}
                    inputName={"firstName"}
                    fieldName={"ime"}
                    title={"Ime"}
                    value={this.state.newUser.firstName}
                    placeholder={"Unesite ime volontera"}
                    handleChange={this.handleChangeInput}
                />

                <Input
                    type={"text"}
                    inputName={"lastName"}
                    fieldName={"prezime"}
                    title={"Prezime"}
                    value={this.state.newUser.lastName}
                    placeholder={"Unesite prezime volontera"}
                    handleChange={this.handleChangeInput}
                />
                
                    <button
                        className="btn-srce"
                        style={{ backgroundColor: 'var(--admin-accent)', marginRight: '0' }}
                        disabled={
                            !(
                                this.state.newUser.firstName &&
                                this.state.newUser.lastName
                            )
                        }
                        onClick={() =>
                            this.props.addVolunteerFunc({
                                first_name: this.state.newUser.firstName,
                                last_name: this.state.newUser.lastName,
                                created_at: new Date().toISOString()
                            })
                        }>{' '} Dodaj &nbsp;
                        <FaUserPlus /></button>
            </form>
        );
    }
}

export default ValidationForm;
