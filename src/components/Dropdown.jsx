import React from 'react';

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
                        {this.props.data.map(d => {
                            return (
                                <li
                                    className="popup-items"
                                    key={d.id}
                                    onMouseDown={e => this.handleChange(e, d)}
                                >
                                    {d.name || d.first_name}
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
