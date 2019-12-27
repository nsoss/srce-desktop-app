import React, { Component } from 'react';
import CallsView from '../../calls/components/CallsView.jsx';
import SingleCallsView from '../../calls/components/SingleCallView.jsx';
import CallsStatistic from '../../calls/components/CallsStatistic.jsx';
import AdminPanel from '../../administration/components/AdminPanel.jsx';
import Navigation from './Navigation';

class Routes extends Component {
    state = {
        location: "/"
    }

    handleChangeLocation = (newLocation) => {
        this.setState({ location: newLocation });
    }

    render() {
        let childComponent;
        switch (this.state.location) {
            case "/":
                childComponent = <CallsView handleChangeLocation={this.handleChangeLocation} />;
                break;
            case "calls":
                childComponent = <CallsView handleChangeLocation={this.handleChangeLocation} />;
                break;
            case "call":
                childComponent = <SingleCallsView handleChangeLocation={this.handleChangeLocation} />;
                break;
            case "calls-statistics":
                childComponent = <CallsStatistic handleChangeLocation={this.handleChangeLocation} />;
                break;
            case "admin-page":
                childComponent = <AdminPanel handleChangeLocation={this.handleChangeLocation} />;
                break;
            default:
                break;
        }

        return (
            <>
                <Navigation handleChangeLocation={this.handleChangeLocation} />
                {childComponent}
            </>
        )
    }
}

export default Routes;
