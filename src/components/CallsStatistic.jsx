import React, { Component } from 'react';
import BarChart from './BarChart';

class CallsStatistic extends Component {
    render() {
        return (
            <div
                style={{
                    position: 'absolute',
                    left: '200px',
                    width: '350px',
                    top: '50px',
                }}
            >
                <BarChart size={[500, 400]} />
            </div>
        );
    }
}
export default CallsStatistic;
