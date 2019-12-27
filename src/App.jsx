import React, { Component } from 'react';
import Routes from './navigation/components/Routes'

class App extends Component {

    render() {
        window.localStorage.setItem("route", "/");
        return (
            <React.Fragment >
                <Routes />
            </React.Fragment>
        );
    }
};

export default App;
