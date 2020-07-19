import React from 'react';
import problemTypes from '../enums/problemTypes';

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowing: false,
            chosenValue: this.props.date ? this.props.date : 'Izaberi',
        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = () => {
        this.setState({ isShowing: false });
    };

    handleClick = () => {
        this.setState({ isShowing: true });
    };

    handleChange = (e, data) => {
        e.stopPropagation();
        this.setState({ chosenValue: data });
        this.props.handleChange(e, data);
    };

    render() {
        return (
            <div className="input-with-arrrow">
                <input
                    type="text"
                    className="form-input toggle-popup"
                    value={this.state.chosenValue}
                    onClick={this.handleClick}
                />
                <div
                    className="popup"
                    style={{ display: this.state.isShowing ? 'block' : 'none' }}
                >
                    <ul>
                        {this.props.data.map((d) => {
                            // TODO: Handle volunteers.
                            // const data =
                            //     typeof d === 'object'
                            //         ? d.first_name || d.name
                            //         : d;

                            return (
                                <li
                                    className="popup-items"
                                    key={d.id}
                                    onMouseDown={(e) => this.handleChange(e, d)}
                                >
                                    {/* // TODO: Don't hard-code this particular enum. */}
                                    {problemTypes[d.id]}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Dropdown;
