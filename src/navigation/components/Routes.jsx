import React, { Component } from 'react';
import CallsView from '../../calls/components/CallsView.jsx';
import SingleCallsView from '../../calls/components/SingleCallView.jsx';
import CallsStatistic from '../../calls/components/CallsStatistic.jsx';
import AdminPanel from '../../administration/components/AdminPanel.jsx';

class Routes extends Component {
    
    render() {
        switch (this.props.navState) {
            case "/":
                return (<CallsView />);
            case "calls":
                return (<CallsView />);
            case "call":
                return (<SingleCallsView />);
            case "calls-statistics":
                return (<CallsStatistic />);
            case "admin-page":
                return (<AdminPanel />);
            default:
                break;
        }
    }
}

export default Routes;
