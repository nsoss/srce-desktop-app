import React, { Component } from 'react';
import Routes from './Routes.jsx';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = { location: "/" }
    }

    handleLocationParameter(location) {
        this.setState({ location });
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-sm">
                    <div className="navbar-brand link-cursor" onClick={() => this.handleLocationParameter("/")}>
                        Logo
                </div>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item nav-link link-cursor" onClick={() => this.handleLocationParameter("calls")}>
                                Dnevni
                        </li>
                            <li className="nav-item nav-link link-cursor" onClick={() => this.handleLocationParameter("call")}>
                                Pojedinačni
                        </li>
                            <li className="nav-item nav-link link-cursor" onClick={() => this.handleLocationParameter("calls-statistics")}>
                                Pregled
                        </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item nav-link link-cursor" onClick={() => this.handleLocationParameter("admin-page")}>
                                Admin
                        </li>
                        </ul>
                    </div>
                </nav>
                <Routes navState={this.state.location} />
            </div>
        );
    }
}

export default Navigation;
