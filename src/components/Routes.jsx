import React, { Component } from 'react';
import AdminPanel from './AdminPanel.jsx';
import CallsStatistic from './CallsStatistic.jsx';
import CallsView from './CallsView.jsx';
import Navigation from './Navigation';
import SingleCallsView from './SingleCallView.jsx';

class Routes extends Component {
    state = {
        location: '/',
    };

    handleChangeLocation = newLocation => {
        this.setState({ location: newLocation });
    };

    render() {
        let childComponent;
        switch (this.state.location) {
            case '/':
                childComponent = (
                    <CallsView
                        handleChangeLocation={this.handleChangeLocation}
                    />
                );
                break;
            case 'calls':
                childComponent = (
                    <CallsView
                        handleChangeLocation={this.handleChangeLocation}
                    />
                );
                break;
            case 'call':
                childComponent = (
                    <SingleCallsView
                        handleChangeLocation={this.handleChangeLocation}
                    />
                );
                break;
            case 'calls-statistics':
                childComponent = (
                    <CallsStatistic
                        handleChangeLocation={this.handleChangeLocation}
                    />
                );
                break;
            case 'admin-page':
                childComponent = (
                    <AdminPanel
                        handleChangeLocation={this.handleChangeLocation}
                    />
                );
                break;
            default:
                break;
        }

        return (
            <>
                <Navigation
                    handleChangeLocation={this.handleChangeLocation}
                    location={this.state.location}
                />
                {childComponent}
            </>
        );
    }
}

export default Routes;
