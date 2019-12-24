import React, { Component } from 'react';
import Navigation from './navigation/components/Navigation.jsx';
import Routes from './Routes.jsx';

class App extends Component {
    render () {
        return (
            <React.Fragment >
                <Navigation/>
                <Routes />
            </React.Fragment>
        );
    }
};

export default App;
