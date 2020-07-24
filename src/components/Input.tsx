import React from 'react';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  title: string;
}

interface InputState {
  errorVisibility: 'hidden';
}

class Input extends React.Component<InputProps, InputState> {
  constructor(props: InputProps) {
    super(props);
    this.state = { errorVisibility: 'hidden' };
  }

  render() {
    return (
      <div className='validation-group'>
        <label htmlFor={this.props.name} className='form-label'>
          {this.props.title}
        </label>
        <input {...this.props} style={{ width: '100%' }} />
        <div
          className='validate-massage'
          style={{
            color: '#dc3545',
            visibility: this.state.errorVisibility,
          }}>
          Polje {this.props.title} ne sme biti prazno!
        </div>
      </div>
    );
  }
}

export default Input;
