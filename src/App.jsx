import React, { Component } from 'react';
import Navigation from './navigation/components/Navigation.jsx';
import Routes from './Routes.jsx';

class App extends Component {
    render () {
        return (
            <div className='container-fluid'>
                <div className="row">
                <Navigation/>
                <Routes />
                </div>
            </div>
        );
    }
};

export default App;
