import React from 'react';
import { FaCopy, FaFileCsv, FaPencilAlt, FaSave } from 'react-icons/fa';
import { IoIosExit } from 'react-icons/io';
import MaskedInput from 'react-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import Dropdown from './Dropdown';

const createFakeData = label => {
    const fakeData = [];
    for (let i = 1; i <= 3; ++i) {
        fakeData.push({
            id: i,
            name: label + ' ' + i,
        });
    }
    return fakeData;
};

function timeMask(value) {
    const chars = value.split('');
    const hours = [/[0-2]/, chars[0] === '2' ? /[0-3]/ : /[0-9]/];

    const minutes = [/[0-5]/, /[0-9]/];

    return hours.concat(':').concat(minutes);
}

const autoCorrectedDatePipe = createAutoCorrectedDatePipe('mm/dd/yyyy');

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class SingleCallView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            call: {},
            formData: Array(12).fill([]),
        };
        this.handleChangeInput = this.handleChangeInput.bind(this);
    }

    componentDidMount() {
        ipcRenderer.send('getFormData');
        ipcRenderer.once('formDataSent', (event, formDataObject) => {
            this.setState({ formData: formDataObject });
        });
    }

    handleChangeInput = (event, data) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({ [name]: value });
    };

    render() {
        const callTypes = this.state.formData[2];
        const contactTypes = this.state.formData[3];
        const days = createFakeData('Dan');
        const genders = this.state.formData[5];
        const ages = this.state.formData[11];
        const maritalStatuses = this.state.formData[7];
        const planInvolvements = this.state.formData[8];
        const volunteers = this.state.formData[10];
        const problemTypes = this.state.formData[9];
        const suicideRisks = this.state.formData[0];
        const suicideFactors = this.state.formData[1];
        const attempts = createFakeData('Pokušaj');

        return (
            <div className="m-3 mr-0">
                <form>
                    <div>
                        <p className="single-call-area-label">Poziv</p>
                        <div className="single-call-call ">
                            <div className="column-labels">
                                <label className="form-label">
                                    Redni broj *
                                </label>{' '}
                                <br />
                                <label className="form-label">
                                    Vrsta kontakta *
                                </label>{' '}
                                <br />
                                <label className="form-label">
                                    Vrsta poziva *
                                </label>{' '}
                                <br />
                                <label className="form-label">
                                    Datum *
                                </label>{' '}
                                <br />
                                <label className="form-label">
                                    Vreme *
                                </label>{' '}
                                <br />
                                <label className="form-label">Dan</label> <br />
                                <label className="form-label ">
                                    Trajanje *
                                </label>
                            </div>
                            <div className="column-inputs">
                                <input
                                    type="text"
                                    name="call-number"
                                    className="form-input "
                                    placeholder="Redni broj"
                                    style={{ marginTop: '0' }}
                                />{' '}
                                <br />
                                <Dropdown
                                    data={contactTypes}
                                    handleChange={this.handleChangeInput}
                                    required={true}
                                />
                                <br />
                                <Dropdown
                                    data={callTypes}
                                    handleChange={this.handleChangeInput}
                                    required={true}
                                />{' '}
                                <br />
                                <MaskedInput
                                    name="date"
                                    className="form-input required"
                                    pipe={autoCorrectedDatePipe}
                                    keepCharPositions={true}
                                    mask={[
                                        /\d/,
                                        /\d/,
                                        '/',
                                        /\d/,
                                        /\d/,
                                        '/',
                                        /\d/,
                                        /\d/,
                                        /\d/,
                                        /\d/,
                                    ]}
                                    placeholder="25/09/1970"
                                />
                                <MaskedInput
                                    name="time"
                                    className="form-input required"
                                    mask={timeMask}
                                    placeholder="10:00"
                                />
                                <Dropdown
                                    data={days}
                                    handleChange={this.handleChangeInput}
                                />{' '}
                                <br />
                                <MaskedInput
                                    name="duration"
                                    className="form-input required"
                                    mask={[/\d/, /\d/, ':', /[1-5]/, /\d/]}
                                    placeholder="10:00"
                                />
                            </div>
                        </div>

                        <p className="single-call-area-label">Pozivar</p>
                        <div className="single-call-caller ">
                            <div className="column-labels">
                                <label className="form-label">
                                    Ime ili nadimak
                                </label>{' '}
                                <br />
                                <label className="form-label">Pol</label> <br />
                                <label className="form-label">
                                    Starost
                                </label>{' '}
                                <br />
                                <label className="form-label">
                                    Bračno stanje
                                </label>{' '}
                                <br />
                                <label className="form-label">
                                    Koji put zove
                                </label>{' '}
                                <br />
                                <label className="form-label">
                                    Uključenost u plan
                                </label>{' '}
                                <br />
                                <label className="form-label">Volonter *</label>
                            </div>
                            <div className="column-inputs">
                                <input
                                    type="text"
                                    name="caller-name"
                                    className="form-input"
                                    placeholder="Ime ili nadimak"
                                    style={{ marginTop: '0' }}
                                />{' '}
                                <br />
                                <Dropdown
                                    data={genders}
                                    handleChange={this.handleChangeInput}
                                />{' '}
                                <br />
                                <Dropdown
                                    name="age"
                                    data={ages}
                                    handleChange={this.handleChangeInput}
                                />{' '}
                                <br />
                                <Dropdown
                                    data={maritalStatuses}
                                    handleChange={this.handleChangeInput}
                                />{' '}
                                <br />
                                <input
                                    type="text"
                                    name="number-of-times-called"
                                    className="form-input"
                                    placeholder="Koji put zove"
                                />{' '}
                                <br />
                                <Dropdown
                                    data={planInvolvements}
                                    handleChange={this.handleChangeInput}
                                />{' '}
                                <br />
                                <Dropdown
                                    data={volunteers}
                                    handleChange={this.handleChangeInput}
                                    required={true}
                                />{' '}
                                <br />
                            </div>
                        </div>

                        <p className="single-call-area-label">Opis razgovora</p>
                        <div className="single-call-coversation-details ">
                            <div className="column-details">
                                <div className="column-labels">
                                    <label
                                        className="form-label"
                                        style={{ marginTop: '8px' }}
                                    >
                                        Vrsta problema *
                                    </label>{' '}
                                    <br />
                                    <label className="form-label">
                                        Suicidalni rizik *
                                    </label>{' '}
                                    <br />
                                    <label className="form-label">
                                        Suicidalni faktor *
                                    </label>{' '}
                                    <br />
                                    <label className="form-label">
                                        Pokušaji
                                    </label>{' '}
                                    <br />
                                </div>
                                <div className="column-inputs">
                                    <Dropdown
                                        data={problemTypes}
                                        handleChange={this.handleChangeInput}
                                        required={true}
                                    />{' '}
                                    <br />
                                    <Dropdown
                                        data={suicideRisks}
                                        handleChange={this.handleChangeInput}
                                        required={true}
                                    />{' '}
                                    <br />
                                    <Dropdown
                                        data={suicideFactors}
                                        handleChange={this.handleChangeInput}
                                        required={true}
                                    />{' '}
                                    <br />
                                    <Dropdown
                                        data={attempts}
                                        handleChange={this.handleChangeInput}
                                    />{' '}
                                    <br />
                                </div>
                            </div>
                            <div
                                className="column-details"
                                style={{ marginLeft: '30px' }}
                            >
                                <div className="column-labels">
                                    <label className="form-label">
                                        Kratak sadržaj *
                                    </label>{' '}
                                    <br />
                                    <label
                                        className="form-label"
                                        style={{ marginTop: '55px' }}
                                    >
                                        Napomena
                                    </label>{' '}
                                    <br />
                                </div>
                                <div className="column-inputs">
                                    <textarea
                                        name="content required"
                                        rows="6"
                                    ></textarea>{' '}
                                    <br />
                                    <textarea
                                        name="content"
                                        rows="4"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="single-call-buttons">
                            <button
                                className="btn-srce"
                                onClick={event => {
                                    event.preventDefault();
                                    ipcRenderer.send('insertCall', {
                                        call_number: 'REG-0001',
                                        call_duration: '12:34',
                                        volunteer_id: 1,
                                        contact_type_id: 1,
                                        call_type_id: 1,
                                        problem_type_id: 1,
                                        suicide_risk_id: 1,
                                        suicide_factor_id: 1,
                                        call_resolution_type_id: 1,
                                        note: 'NOTE',
                                        short_content: 'SHORT_CONTENT',
                                        caller_name: 'CALLER_NAME',
                                        age_id: 1,
                                        gender_id: 1,
                                        marital_status_id: 1,
                                        number_of_calls_id: 1,
                                        plan_involvement_id: 1,
                                        created_at: Date.now(),
                                    });
                                }}
                            >
                                <FaSave />
                                &nbsp;Snimi
                            </button>
                            <button
                                className="btn-srce"
                                onClick={this.handleUpdateData}
                            >
                                <FaPencilAlt />
                                &nbsp;Izmeni
                            </button>
                            <button
                                className="btn-srce"
                                onClick={this.handleCopyData}
                            >
                                <FaCopy />
                                &nbsp;Kopiraj
                            </button>
                            <button
                                className="btn-srce"
                                onClick={this.handleExportToExcel}
                                style={{ width: '135px' }}
                            >
                                <FaFileCsv />
                                &nbsp;Prebaci u CSV
                            </button>
                            <button
                                className="btn-srce"
                                style={{ backgroundColor: '#CC8066 ' }}
                                onClick={() =>
                                    this.props.handleChangeLocation('calls')
                                }
                            >
                                <IoIosExit />
                                &nbsp;Izadji
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default SingleCallView;
