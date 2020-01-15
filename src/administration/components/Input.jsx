import React from "react";

class Input extends React.Component {

  constructor(props) {
    super(props);
    this.state = { errorVisibility: 'hidden' };
  }

  handleBlur = event => {
    let value = event.target.value;
    let errorVisibility = 'hidden';

    if (value === '') {
      errorVisibility = 'visible';
    }

    this.setState({ errorVisibility });

  }

  render() {
    return (
      <div style={{ display: "inline-block", width: "542px" }} className="validation-group">
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
        <div className="validate-massage" style={{ color: "#dc3545", visibility: this.state.errorVisibility }}>
          Polje {this.props.fieldName} ne sme biti prazno!
        </div>
      </div>
    )
  };
}

export default Input;
