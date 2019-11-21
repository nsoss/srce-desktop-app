import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    Dropdown,
    DropdownButton,
    ButtonToolbar,
    Button
} from 'react-bootstrap';

class SingleCallsView extends Component {
    state = {
        // Call
        callNo: 0,
        contactType: 'Vrsta kontakta',
        callDate: '',
        callDay: 0,
        callTime: 0,
        callDur: 0,
        callType: 'Vrsta poziva',

        // Caller
        name: '',
        gender: 'Pol',
        age: 'Starost',
        maritalStatus: 'Bracno stanje',
        numOfCall: 'Koji put zove',
        planInvolvement: 'Ukljucenost u plan',
        volunteer: 'Volonter',

        // Call Desc
        problemType: 'Vrsta problema',
        suicideRisk: 'Suicidni rizik',
        suicidFactor: 'Suicidni faktor',
        lastSuicidTry: 'Prethodni pokusaji suicida',
        shortContent: '',
        note: ''
    };

    // Call
    handleChangeCallNo = event => {
        this.setState({ callNo: event.target.value });
    };

    handleChangeContactType = event => {
        this.setState({ contactType: event.target.textContent });
    };

    handleChangeCallDate = event => {
        this.setState({ callDate: event.target.value });
    };

    handleChangeCallDay = event => {
        this.setState({ callDay: event.target.value });
    };

    handleChangeCallTime = event => {
        this.setState({ callTime: event.target.value });
    };

    handleChangeCallDur = event => {
        this.setState({ callDur: event.target.value });
    };

    handleChangeCallType = event => {
        this.setState({ callType: event.target.textContent });
    };

    // Caller
    handleChangeName = event => {
        this.setState({ name: event.target.value });
    };

    handleChangeGender = event => {
        this.setState({ gender: event.target.textContent });
    };

    handleChangeAge = event => {
        this.setState({ age: event.target.textContent });
    };

    handleChangeMaritalStatus = event => {
        this.setState({ maritalStatus: event.target.textContent });
    };

    handleChangeNumOfCall = event => {
        this.setState({ numOfCall: event.target.textContent });
    };

    handleChangePlanInvolvement = event => {
        this.setState({ planInvolvement: event.target.textContent });
    };

    handleChangeVolunteer = event => {
        this.setState({ volunteer: event.target.textContent });
    };

    // Call Desc
    handleChangeProblemType = event => {
        this.setState({ problemType: event.target.textContent });
    };

    handleChangeSuicidRisk = event => {
        this.setState({ suicideRisk: event.target.textContent });
    };

    handleChangeSuicidFactor = event => {
        this.setState({ suicidFactor: event.target.textContent });
    };

    handleChangeLastSuicidTry = event => {
        this.setState({ lastSuicidTry: event.target.textContent });
    };

    handleChangeShortContent = event => {
        this.setState({ shortContent: event.target.value });
    };

    handleChangeNote = event => {
        this.setState({ note: event.target.value });
    };

    // Buttons
    handleSaveData = () => {
        console.log('Save');
    };

    handleUpdateData = () => {
        console.log('Update');
    };

    handleCopyData = () => {
        console.log('Copy');
    };

    handleExportToExcel = () => {
        console.log('ExportToExcel');
    };

    handleExit = () => {
        console.log('Exit');
    };

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <Form.Text className="text-muted">Poziv</Form.Text>

                            <Form.Group controlId="formBasicCallNo">
                                <Form.Label>Redni broj poziva</Form.Label>
                                <Form.Control
                                    onChange={this.handleChangeCallNo}
                                    type="text"
                                    placeholder="Unesite redni broj poziva"
                                />
                            </Form.Group>

                            <DropdownButton
                                variant="light"
                                id="dropdown-basic-button"
                                title={this.state.contactType}
                            >
                                <Dropdown.Item
                                    onClick={this.handleChangeContactType}
                                >
                                    Vrsta1
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={this.handleChangeContactType}
                                >
                                    Vrsta2
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={this.handleChangeContactType}
                                >
                                    Vrsta3
                                </Dropdown.Item>
                            </DropdownButton>

                            <Form.Group controlId="formBasicCallDate">
                                <Form.Label>Datum poziva</Form.Label>
                                <Form.Control
                                    onChange={this.handleChangeCallDate}
                                    type="text"
                                    placeholder="Unesite datum poziva"
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicDay">
                                <Form.Label>Dan</Form.Label>
                                <Form.Control
                                    onChange={this.handleChangeCallDay}
                                    type="text"
                                    placeholder="Unesite dan"
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicCallTime">
                                <Form.Label>Vreme poziva</Form.Label>
                                <Form.Control
                                    onChange={this.handleChangeCallTime}
                                    type="text"
                                    placeholder="Unesite vreme poziva"
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicCallDuration">
                                <Form.Label>Trajanje poziva</Form.Label>
                                <Form.Control
                                    onChange={this.handleChangeCallDur}
                                    type="text"
                                    placeholder="Unesite trajanje poziva"
                                />
                            </Form.Group>

                            <DropdownButton
                                variant="light"
                                id="dropdown-basic-button"
                                title={this.state.callType}
                            >
                                <Dropdown.Item
                                    onClick={this.handleChangeCallType}
                                >
                                    Vrsta1
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={this.handleChangeCallType}
                                >
                                    Vrsta2
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={this.handleChangeCallType}
                                >
                                    Vrsta3
                                </Dropdown.Item>
                            </DropdownButton>
                        </Form>
                    </Col>

                    <Col>
                        <Form>
                            <Form.Text className="text-muted">
                                Pozivar
                            </Form.Text>

                            <Form.Group controlId="formBasicName">
                                <Form.Label>Ime ili nadimak</Form.Label>
                                <Form.Control
                                    onChange={this.handleChangeName}
                                    type="text"
                                    placeholder="Unesite ime ili nadimak"
                                />
                            </Form.Group>

                            <DropdownButton
                                variant="light"
                                id="dropdown-basic-button"
                                title={this.state.gender}
                            >
                                <Dropdown.Item
                                    onClick={this.handleChangeGender}
                                >
                                    Pol1
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={this.handleChangeGender}
                                >
                                    Pol2
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={this.handleChangeGender}
                                >
                                    Pol3
                                </Dropdown.Item>
                            </DropdownButton>

                            <DropdownButton
                                variant="light"
                                id="dropdown-basic-button"
                                title={this.state.age}
                            >
                                <Dropdown.Item onClick={this.handleChangeAge}>
                                    St1
                                </Dropdown.Item>
                                <Dropdown.Item onClick={this.handleChangeAge}>
                                    St2
                                </Dropdown.Item>
                                <Dropdown.Item onClick={this.handleChangeAge}>
                                    St3
                                </Dropdown.Item>
                            </DropdownButton>

                            <DropdownButton
                                variant="light"
                                id="dropdown-basic-button"
                                title={this.state.maritalStatus}
                            >
                                <Dropdown.Item
                                    onClick={this.handleChangeMaritalStatus}
                                >
                                    Bs1
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={this.handleChangeMaritalStatus}
                                >
                                    Bs2
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={this.handleChangeMaritalStatus}
                                >
                                    Bs3
                                </Dropdown.Item>
                            </DropdownButton>

                            <DropdownButton
                                variant="light"
                                id="dropdown-basic-button"
                                title={this.state.numOfCall}
                            >
                                <Dropdown.Item
                                    onClick={this.handleChangeNumOfCall}
                                >
                                    Prvi
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={this.handleChangeNumOfCall}
                                >
                                    Drugi
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={this.handleChangeNumOfCall}
                                >
                                    Treci
                                </Dropdown.Item>
                            </DropdownButton>

                            <DropdownButton
                                variant="light"
                                id="dropdown-basic-button"
                                title={this.state.planInvolvement}
                            >
                                <Dropdown.Item
                                    onClick={this.handleChangePlanInvolvement}
                                >
                                    Plan1
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={this.handleChangePlanInvolvement}
                                >
                                    Plan2
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={this.handleChangePlanInvolvement}
                                >
                                    Plan3
                                </Dropdown.Item>
                            </DropdownButton>

                            <DropdownButton
                                variant="light"
                                id="dropdown-basic-button"
                                title={this.state.volunteer}
                            >
                                <Dropdown.Item
                                    onClick={this.handleChangeVolunteer}
                                >
                                    Vol1
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={this.handleChangeVolunteer}
                                >
                                    Vol2
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={this.handleChangeVolunteer}
                                >
                                    Vol3
                                </Dropdown.Item>
                            </DropdownButton>
                        </Form>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form>
                            <Form.Text className="text-muted">
                                Opis razgovora
                            </Form.Text>

                            <DropdownButton
                                variant="light"
                                id="dropdown-basic-button"
                                title={this.state.problemType}
                            >
                                <Dropdown.Item
                                    onClick={this.handleChangeProblemType}
                                >
                                    Prob1
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={this.handleChangeProblemType}
                                >
                                    Prob2
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={this.handleChangeProblemType}
                                >
                                    Prob3
                                </Dropdown.Item>
                            </DropdownButton>

                            <DropdownButton
                                variant="light"
                                id="dropdown-basic-button"
                                title={this.state.suicideRisk}
                            >
                                <Dropdown.Item
                                    onClick={this.handleChangeSuicidRisk}
                                >
                                    s1
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={this.handleChangeSuicidRisk}
                                >
                                    s2
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={this.handleChangeSuicidRisk}
                                >
                                    s3
                                </Dropdown.Item>
                            </DropdownButton>

                            <DropdownButton
                                variant="light"
                                id="dropdown-basic-button"
                                title={this.state.suicidFactor}
                            >
                                <Dropdown.Item
                                    onClick={this.handleChangeSuicidFactor}
                                >
                                    sf1
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={this.handleChangeSuicidFactor}
                                >
                                    sf2
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={this.handleChangeSuicidFactor}
                                >
                                    sf3
                                </Dropdown.Item>
                            </DropdownButton>

                            <DropdownButton
                                variant="light"
                                id="dropdown-basic-button"
                                title={this.state.lastSuicidTry}
                            >
                                <Dropdown.Item
                                    onClick={this.handleChangeLastSuicidTry}
                                >
                                    p1
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={this.handleChangeLastSuicidTry}
                                >
                                    p2
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={this.handleChangeLastSuicidTry}
                                >
                                    p3
                                </Dropdown.Item>
                            </DropdownButton>
                        </Form>
                    </Col>

                    <Col>
                        <Form>
                            <Form.Group controlId="exampleForm.ControlDescription">
                                <Form.Label>Kratak sadrzaj</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="2"
                                    onChange={this.handleChangeShortContent}
                                />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlNote">
                                <Form.Label>Napomena</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    onChange={this.handleChangeNote}
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <ButtonToolbar>
                            <Button
                                onClick={this.handleSaveData}
                                variant="primary"
                            >
                                Snimi
                            </Button>
                            <Button
                                onClick={this.handleUpdateData}
                                variant="secondary"
                            >
                                Izmeni
                            </Button>
                            <Button
                                onClick={this.handleCopyData}
                                variant="warning"
                            >
                                Kopiraj
                            </Button>
                            <Button
                                onClick={this.handleExportToExcel}
                                variant="success"
                            >
                                Prebaci u .xls
                            </Button>
                            <Button onClick={this.handleExit} variant="danger">
                                Izadji
                            </Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default SingleCallsView;
