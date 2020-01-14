import React, { Component } from 'react';
import { IoMdMore as More } from 'react-icons/io';
import ThemeContext from '../../theme/ThemeContext';
import { fileRead } from '../../user_settings/loadUserSettings';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as IcnDetails } from '../../assets/details.svg';
import { ReactComponent as IcnSettings } from '../../assets/settings.svg';
import { ReactComponent as IcnStatistics } from '../../assets/statistics.svg';

let toggle;
class Navigation extends Component {
    static contextType = ThemeContext;

    constructor(props) {
        super(props);
        this.state = {
            isDropdownShowing: false,
            isDarkThemeActive: fileRead(),
            location: "/"
        }
        this.handleDropdown = this.handleDropdown.bind(this);
    }

    handleLocation(locationParam) {
        this.props.handleChangeLocation(locationParam);
    }

    handleDropdown() {
        this.state.isDropdownShowing ? this.setState({ isDropdownShowing: false }) : this.setState({ isDropdownShowing: true })
    }

    componentDidMount() {
        const context = this.context
        toggle = context.toggle;
    }

    componentDidUpdate() {
        const context = this.context
        toggle = context.toggle;
    }

    render() {
        return (
            <nav className="side-nav">
                <div className="side-nav-item" onClick={() => this.handleLocation("/")}>
                    <Logo />
                </div>
                <div className="side-nav-item" onClick={() => this.handleLocation("call")}>
                    <IcnDetails />
                </div>
                <div className="side-nav-item" onClick={() => this.handleLocation("calls-statistics")}>
                    <IcnStatistics />
                </div>
                <div className="side-nav-item" onClick={() => this.handleLocation("admin-page")}>
                    <IcnSettings />
                </div>
                <div className="side-nav-item dropright m-0" onClick={this.handleDropdown} >
                    <More style={{ fontSize: '32px' }} />
                    <div className="dropdown-menu-srce dropdown-menu" style={{ display: this.state.isDropdownShowing ? 'block' : 'none' }}>
                        <div className="dropdown-item m-0 pr-2 pl-5 " >
                            <input className="pointer mr-1" type="checkbox" id="gridCheck1" onClick={() => { this.setState(prevState => ({ isDropdownShowing: false, isDarkThemeActive: !prevState.isDarkThemeActive })); toggle() }} checked={this.state.isDarkThemeActive}></input>
                            Tamna temaa
                        </div>
                    </div>
                </div>
            </nav>
        );


    }
}

export default Navigation;
