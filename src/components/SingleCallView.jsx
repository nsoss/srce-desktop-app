import React from 'react';
import { FaCopy, FaFileCsv, FaPencilAlt, FaSave } from 'react-icons/fa';
import { IoIosExit } from 'react-icons/io';
import MaskedInput from 'react-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import Dropdown from './Dropdown';
import callOrdinalitiesEnum from '../enums/callOrdinalities';
import callTypesEnum from '../enums/callTypes';
import gendersEnum from '../enums/genders';
import maritalStatusesEnum from '../enums/maritalStatuses';
import postCallStatesEnum from '../enums/postCallStates';
import problemTypesEnum from '../enums/problemTypes';
import suicideFactorsEnum from '../enums/suicideFactors';
import suicideRisksEnum from '../enums/suicideRisks';

const createFakeData = (label) => {
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
            formData: {
                callTypes: [],
                problemTypes: [],
                suicideRisks: [],
                suicideFactors: [],
                postCallStates: [],
                genders: [],
                maritalStatuses: [],
                callOrdinalities: [],
                volunteers: [],
            },
        };
        this.handleChangeInput = this.handleChangeInput.bind(this);
    }

    componentDidMount() {
        ipcRenderer.send('getFormData');
        ipcRenderer.once('formDataSent', (_, formData) => {
            this.setState({ formData });
        });
    }

    handleChangeInput = (event, data) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({ [name]: value });
    };

    render() {
        const {
            callTypes,
            problemTypes,
            suicideRisks,
            suicideFactors,
            postCallStates,
            genders,
            maritalStatuses,
            callOrdinalities,
            volunteers,
        } = this.state.formData;

        return (
            <form className="single-call-container">
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginBottom: '30px',
                    }}>
                    <div
                        className="single-call-area "
                        style={{ marginRight: '30px' }}>
                        <p className="single-call-area-label">Poziv</p>
                        <div className="single-call-form-row">
                            <label className="form-label">Redni broj</label>
                            <input
                                type="text"
                                name="call-number"
                                className="form-input "
                                placeholder="Redni broj"
                                style={{ marginTop: '0' }}
                            />
                        </div>
                        <div className="single-call-form-row">
                            <label className="form-label">Vrsta kontakta</label>
                            <Dropdown
                                label={
                                    this.state.formData.contactType?.name ||
                                    'Izaberi'
                                }
                                items={createFakeData('Vrsta kontakta')}
                                itemToLabel={(item) => item.name}
                                onSelect={(item) => {
                                    this.setState({
                                        formData: {
                                            ...this.state.formData,
                                            contactType: item,
                                        },
                                    });
                                }}
                            />
                        </div>

                        <div className="single-call-form-row">
                            <label className="form-label">Vrsta poziva *</label>
                            <Dropdown
                                label={
                                    this.state.formData.callType
                                        ? callTypesEnum[
                                              this.state.formData.callType.value
                                          ]
                                        : 'Izaberi'
                                }
                                items={callTypes}
                                itemToLabel={(callType) =>
                                    callTypesEnum[callType.value]
                                }
                                onSelect={(item) => {
                                    this.setState({
                                        formData: {
                                            ...this.state.formData,
                                            callType: item,
                                        },
                                    });
                                }}
                            />
                        </div>

                        <div className="single-call-form-row">
                            <label className="form-label">Datum</label> <br />
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
                        </div>
                        <div className="single-call-form-row">
                            <label className="form-label">Vreme</label> <br />
                            <MaskedInput
                                name="time"
                                className="form-input required"
                                mask={timeMask}
                                placeholder="10:00"
                            />
                        </div>
                        <div className="single-call-form-row">
                            <label className="form-label">Dan</label> <br />
                            <Dropdown
                                label={
                                    this.state.formData.day?.name || 'Izaberi'
                                }
                                items={createFakeData('Dan')}
                                itemToLabel={(item) => item.name}
                                onSelect={(item) => {
                                    this.setState({
                                        formData: {
                                            ...this.state.formData,
                                            day: item,
                                        },
                                    });
                                }}
                            />
                        </div>
                        <div className="single-call-form-row">
                            <label className="form-label ">Trajanje</label>
                            <MaskedInput
                                name="duration"
                                className="form-input required"
                                mask={[/\d/, /\d/, ':', /[1-5]/, /\d/]}
                                placeholder="10:00"
                            />
                        </div>
                    </div>

                    <div className="single-call-area ">
                        <p className="single-call-area-label">Pozivar</p>
                        <div className="single-call-form-row">
                            <label className="form-label">
                                Ime ili nadimak
                            </label>
                            <input
                                type="text"
                                name="caller-name"
                                className="form-input"
                                placeholder="Ime ili nadimak"
                                style={{ marginTop: '0' }}
                            />
                        </div>
                        <div className="single-call-form-row">
                            <label className="form-label">Pol</label>
                            <Dropdown
                                label={
                                    this.state.formData.gender
                                        ? gendersEnum[
                                              this.state.formData.gender.value
                                          ]
                                        : 'Izaberi'
                                }
                                items={genders}
                                itemToLabel={(gender) =>
                                    gendersEnum[gender.value]
                                }
                                onSelect={(item) => {
                                    this.setState({
                                        formData: {
                                            ...this.state.formData,
                                            gender: item,
                                        },
                                    });
                                }}
                            />
                        </div>
                        <div className="single-call-form-row">
                            <label className="form-label">Starost</label>
                            <Dropdown
                                label={
                                    this.state.formData.age?.name || 'Izaberi'
                                }
                                items={createFakeData('Starost')}
                                itemToLabel={(item) => item.name}
                                onSelect={(item) => {
                                    this.setState({
                                        formData: {
                                            ...this.state.formData,
                                            age: item,
                                        },
                                    });
                                }}
                            />
                        </div>
                        <div className="single-call-form-row">
                            <label className="form-label">Bračno stanje</label>
                            <Dropdown
                                label={
                                    this.state.formData.maritalStatus
                                        ? maritalStatusesEnum[
                                              this.state.formData.maritalStatus
                                                  .value
                                          ]
                                        : 'Izaberi'
                                }
                                items={maritalStatuses}
                                itemToLabel={(maritalStatus) =>
                                    maritalStatusesEnum[maritalStatus.value]
                                }
                                onSelect={(item) => {
                                    this.setState({
                                        formData: {
                                            ...this.state.formData,
                                            maritalStatus: item,
                                        },
                                    });
                                }}
                            />
                        </div>
                        <div className="single-call-form-row">
                            <label className="form-label">Koji put zove</label>
                            <Dropdown
                                label={
                                    this.state.formData.callOrdinality
                                        ? callOrdinalitiesEnum[
                                              this.state.formData.callOrdinality
                                                  .value
                                          ]
                                        : 'Izaberi'
                                }
                                items={callOrdinalities}
                                itemToLabel={(callOrdinality) =>
                                    callOrdinalitiesEnum[callOrdinality.value]
                                }
                                onSelect={(item) => {
                                    this.setState({
                                        formData: {
                                            ...this.state.formData,
                                            callOrdinality: item,
                                        },
                                    });
                                }}
                            />
                        </div>
                        <div className="single-call-form-row">
                            <label className="form-label">
                                Uključenost u plan
                            </label>
                            <Dropdown
                                label={
                                    this.state.formData.planInvolvement?.name ||
                                    'Izaberi'
                                }
                                items={createFakeData('Uključenost u plan')}
                                itemToLabel={(item) => item.name}
                                onSelect={(item) => {
                                    this.setState({
                                        formData: {
                                            ...this.state.formData,
                                            planInvolvement: item,
                                        },
                                    });
                                }}
                            />
                        </div>
                        <div className="single-call-form-row">
                            <label className="form-label">Volonter *</label>
                            <Dropdown
                                label={
                                    this.state.formData.volunteers
                                        ? this.state.formData.volunteer?.name
                                        : 'Izaberi'
                                }
                                items={volunteers}
                                itemToLabel={(volunteer) => volunteer.name}
                                onSelect={(item) => {
                                    this.setState({
                                        formData: {
                                            ...this.state.formData,
                                            volunteer: item,
                                        },
                                    });
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex' }}>
                    <div className="single-call-coversation-details ">
                        <p className="single-call-area-label">Opis razgovora</p>
                        <div className="column-details">
                            <div className="single-call-form-row">
                                <label
                                    className="form-label"
                                    style={{ marginTop: '8px' }}>
                                    Vrsta problema *
                                </label>
                                <Dropdown
                                    label={
                                        this.state.formData.problemType
                                            ? problemTypesEnum[
                                                  this.state.formData
                                                      .problemType.value
                                              ]
                                            : 'Izaberi'
                                    }
                                    items={problemTypes}
                                    itemToLabel={(problemType) =>
                                        problemTypesEnum[problemType.value]
                                    }
                                    onSelect={(item) => {
                                        this.setState({
                                            formData: {
                                                ...this.state.formData,
                                                problemType: item,
                                            },
                                        });
                                    }}
                                />
                            </div>
                            <div className="single-call-form-row">
                                <label className="form-label">
                                    Suicidalni rizik *
                                </label>
                                <Dropdown
                                    label={
                                        this.state.formData.suicideRisk
                                            ? suicideRisksEnum[
                                                  this.state.formData
                                                      .suicideRisk.value
                                              ]
                                            : 'Izaberi'
                                    }
                                    items={suicideRisks}
                                    itemToLabel={(suicideRisk) =>
                                        suicideRisksEnum[suicideRisk.value]
                                    }
                                    onSelect={(item) => {
                                        this.setState({
                                            formData: {
                                                ...this.state.formData,
                                                suicideRisk: item,
                                            },
                                        });
                                    }}
                                />
                            </div>
                            <div className="single-call-form-row">
                                <label className="form-label">
                                    Suicidalni faktor *
                                </label>
                                <Dropdown
                                    label={
                                        this.state.formData.suicideFactor
                                            ? suicideFactorsEnum[
                                                  this.state.formData
                                                      .suicideFactor.value
                                              ]
                                            : 'Izaberi'
                                    }
                                    items={suicideFactors}
                                    itemToLabel={(suicideFactor) =>
                                        suicideFactorsEnum[suicideFactor.value]
                                    }
                                    onSelect={(item) => {
                                        this.setState({
                                            formData: {
                                                ...this.state.formData,
                                                suicideFactor: item,
                                            },
                                        });
                                    }}
                                />
                            </div>
                            <div className="single-call-form-row">
                                <label className="form-label">Pokušaji</label>
                                <Dropdown
                                    label={
                                        this.state.formData.postCallState
                                            ? postCallStatesEnum[
                                                  this.state.formData
                                                      .postCallState.value
                                              ]
                                            : 'Izaberi'
                                    }
                                    items={postCallStates}
                                    itemToLabel={(postCallState) =>
                                        postCallStatesEnum[postCallState.value]
                                    }
                                    onSelect={(item) => {
                                        this.setState({
                                            formData: {
                                                ...this.state.formData,
                                                postCallState: item,
                                            },
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        <div
                            className="column-details"
                            style={{ marginLeft: '30px' }}>
                            <div
                                className="single-call-form-row"
                                style={{ marginBottom: '10px' }}>
                                <label className="form-label">
                                    Kratak sadržaj
                                </label>
                                <textarea name="content required" rows="5" />
                            </div>
                            <div className="single-call-form-row">
                                <label className="form-label">Napomena</label>
                                <textarea name="content" rows="3" />
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    style={{ display: 'flex', flexDirection: 'row' }}
                    className="single-call-buttons">
                    <button
                        className="btn-srce"
                        onClick={(event) => {
                            event.preventDefault();
                            ipcRenderer.send('insertCall', this.state.call);
                        }}>
                        <FaSave />
                        &nbsp;Snimi
                    </button>
                    <button
                        className="btn-srce"
                        onClick={this.handleUpdateData}>
                        <FaPencilAlt />
                        &nbsp;Izmeni
                    </button>
                    <button className="btn-srce" onClick={this.handleCopyData}>
                        <FaCopy />
                        &nbsp;Kopiraj
                    </button>
                    <button
                        className="btn-srce"
                        onClick={this.handleExportToExcel}
                        style={{ width: '135px' }}>
                        <FaFileCsv />
                        &nbsp;Prebaci u CSV
                    </button>
                    <button
                        className="btn-srce"
                        style={{ backgroundColor: '#CC8066 ' }}
                        onClick={() =>
                            this.props.handleChangeLocation('calls')
                        }>
                        <IoIosExit />
                        &nbsp;Izadji
                    </button>
                </div>
            </form>
        );
    }
}

export default SingleCallView;
