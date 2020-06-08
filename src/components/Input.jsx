import React from 'react';

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
    };

    render() {
        return (
            <div className="validation-group">
                <label htmlFor={this.props.name} className="form-label">
                    {this.props.title}
                </label>
                <input {...this.props} style={{ width: '100%' }} />
                <div
                    className="validate-massage"
                    style={{
                        color: '#dc3545',
                        visibility: this.state.errorVisibility,
                    }}
                >
                    Polje {this.props.title} ne sme biti prazno!
                </div>
            </div>
        );
    }
}

export default Input;
