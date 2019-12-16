import React from "react";

class Input extends React.Component {

  constructor(props) {
    super(props);
    this.state = { errorVisibility: 'hidden'};
  }
  
  handleBlur = event => {
    let value = event.target.value;
    let errorVisibility = 'hidden';
    
    if (value === '') {
        errorVisibility = 'visible';
    }

    this.setState({ errorVisibility });

  }

  render () {
    return (
      <div className="admin-add-volunteer-form">
        <label htmlFor={this.props.inputName} className="form-label">
          {this.props.title}
        </label>
        <input
          id={this.props.inputName}
          name={this.props.inputName}
          type={this.props.type}
          value={this.props.value}
          onChange={this.props.handleChange}
          onBlur={this.handleBlur}
          //{...this.props}
        />
        <div className="" style={{ color: "#dc3545", visibility: this.state.errorVisibility}}>
          <strong>Polje {this.props.fieldName} ne sme biti prazno!</strong>
        </div>
      </div>
    )
  };
}

export default Input;
