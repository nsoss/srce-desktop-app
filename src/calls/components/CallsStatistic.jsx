import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import BarChart from '../../charts/BarChart';

class CallsStatistic extends Component {
    render() {
        return (
            <Container>
                <BarChart size={[500, 400]} />
            </Container>
        );
    }
}
export default CallsStatistic;
