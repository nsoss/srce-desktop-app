import React, { Component } from 'react';
import Calendar from './Calendar';
import {
    Container,
    Row,
    Col,
    Button,
    Table,
    ButtonGroup
} from 'react-bootstrap';
import { format } from 'date-fns';
import { IoMdList } from 'react-icons/io';


const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class CallsView extends Component {

    constructor(props) {
        super(props);
        this.state.selectedDate = props.onDateSelect;
    }

    state = {
        calls: [],
        selectedDate: '',
        filteredCalls: []
    };

    componentDidMount() {
        ipcRenderer.send('getCalls');
        ipcRenderer.once('callsSent', (event, callObject) => {
            this.setState({ calls: callObject});
        });
    }

    formatDate = datedb => {
        return format(new Date(Date.parse(datedb)), 'dd/MM/yyyy');
    }

    handleChangeTableData = date => { 

        let callsByDate = this.state.calls.filter(p => {
            var str = this.formatDate(p.created_at);
            return str === format(date, 'dd/MM/yyyy').toString();
        });

        this.setState({
            filteredCalls: [...callsByDate]
        });
        
    };

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <ButtonGroup className="call-actions-menu" vertical size="sm">
                            <Button variant="outline-dark">
                                Detalji poziva
                            </Button>
                            <br></br>
                            <Button variant="outline-success">
                                Unos poziva
                            </Button>
                            <Button variant="outline-danger">
                                Brisanje poziva
                            </Button>
                        </ButtonGroup>
                    </Col>
                    <Col>
                        <Calendar
                            onDateSelect={date =>
                                this.handleChangeTableData(date)
                            }
                        />
                        <br></br>
                        <h3 className="text-center bg-warning call-data-header">
                            <IoMdList />
                            &nbsp;Lista poziva
                        </h3>
                            <Table striped hover className="call-data">
                                <thead className="bg-light">
                                    <tr className="text-center">
                                        <th scope="col">ID</th>
                                        <th scope="col">Datum</th>
                                        <th scope="col">Volonter</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.filteredCalls.map((c, i) => {
                                    return(
                                        <tr key={i}>
                                            <th scope="row">{c.call_id}</th>
                                            <td>
                                                {format(
                                                    new Date(Date.parse(c.created_at)),
                                                'dd.MM.yyyy'
                                            )}
                                            </td>
                                            <td>{c.volunteerId}</td>
                                        </tr>
                                    );
                                })}
                                </tbody>    
                            </Table>
                            <p className="text-center call-data-msg">
                                Nema poziva na izabrani datum.
                            </p>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default CallsView;
