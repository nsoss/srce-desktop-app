import React from 'react';
import { FaSave, FaPencilAlt, FaCopy, FaFileCsv } from 'react-icons/fa';
import { IoIosExit } from 'react-icons/io';
import Dropdown from './Dropdown'

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class SingleCallView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            call: {},
            formData: []
        }
        this.handleChangeInput = this.handleChangeInput.bind(this);
    }

    componentDidMount() {
        ipcRenderer.send('getFormData');
        ipcRenderer.once('formDataSent', (event, formDataObject) => {
            this.setState({ formData: formDataObject });
        });
    }

    handleChangeInput = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({ [name]: value });
    };

    render() {
        return (
            <div className="m-3 mr-0">
                <form >
                    <div >
                        <p className="single-call-area-label">Poziv</p>
                        <div className="single-call-call ">
                            <div className="column-labels">
                                <label className="form-label">Redni broj *</label> <br />
                                <label className="form-label">Vrsta kontakta</label> <br />
                                <label className="form-label">Vrsta poziva</label> <br />
                                <label className="form-label">Datum *</label> <br />
                                <label className="form-label">Vreme</label> <br />
                                <label className="form-label">Dan</label> <br />
                                <label className="form-label">Trajanje</label>
                            </div>
                            <div className="column-inputs">
                                <input type="text" name="call-number" className="form-input" placeholder="Redni broj" style={{ marginTop: '0' }} /> <br />
                                <Dropdown data={["nesto", "nesto drugo"]} />
                                <br />
                                <Dropdown data={["nesto", "nesto trece"]} /> <br />
                                <input type="date" name="date" className="form-input" placeholder="dd/mm/gggg" /> <br />
                                <input type="time" name="time" className="form-input" placeholder="00:00" /> <br />
                                <Dropdown data={["nesto", "uspeh?"]} /> <br />
                                <input type="time" name="duration" className="form-input" placeholder="00:00" /> <br />
                            </div>
                        </div>

                        <p className="single-call-area-label">Pozivar</p>
                        <div className="single-call-caller ">
                            <div className="column-labels">
                                <label className="form-label">Ime ili nadimak</label> <br />
                                <label className="form-label">Pol</label> <br />
                                <label className="form-label">Starost</label> <br />
                                <label className="form-label">Bračno stanje</label> <br />
                                <label className="form-label">Koji put zove</label> <br />
                                <label className="form-label">Uključenost u plan</label> <br />
                                <label className="form-label">Volonter</label>
                            </div>
                            <div className="column-inputs">
                                <input type="text" name="caller-name" className="form-input" placeholder="Ime ili nadimak" style={{ marginTop: '0' }} /> <br />
                                <Dropdown data={["jafa", "kinder"]} /> <br />
                                <select className="form-input" name="age">
                                    <option selected >Izaberi</option>
                                    <option >Izaberi</option>
                                </select> <br />
                                <Dropdown data={["jabuka", "cimet"]} /> <br />
                                <input type="text" name="number-of-times-called" className="form-input" placeholder="Koji put zove" /> <br />
                                <Dropdown data={["kohi", "kafa"]} /> <br />
                                <Dropdown data={["nesto", "nesto drugo"]} /> <br />
                            </div>
                        </div>

                        <p className="single-call-area-label">Opis razgovora</p>
                        <div className="single-call-coversation-details ">
                            <div className="column-details">
                                <div className="column-labels">
                                    <label className="form-label" style={{ marginTop: '8px' }}>Vrsta problema</label> <br />
                                    <label className="form-label">Suicidalni rizik</label> <br />
                                    <label className="form-label">Suicidalni faktor</label> <br />
                                    <label className="form-label">Pokušaji</label> <br />
                                </div>
                                <div className="column-inputs">
                                    <Dropdown data={["a", "b"]} /> <br />
                                    <Dropdown data={["c", "q"]} /> <br />
                                    <Dropdown data={["h", "d"]} /> <br />
                                    <Dropdown data={["t", "ttt"]} /> <br />
                                </div>
                            </div>
                            <div className="column-details" style={{ marginLeft: "30px" }}>
                                <div className="column-labels">
                                    <label className="form-label">Kratak sadržaj</label> <br />
                                    <label className="form-label" style={{ marginTop: '55px' }}>Napomena</label> <br />
                                </div>
                                <div className="column-inputs">
                                    <textarea name="content" rows="6"></textarea> <br />
                                    <textarea name="content" rows="4"></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="single-call-buttons">
                            <button
                                className="btn-srce"
                                onClick={this.handleSaveData}
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
                                style={{ backgroundColor: '#4F9D3F' }}
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
                                style={{ marginLeft: '60px', backgroundColor: '#CC8066 ' }}
                                onClick={() => this.props.handleChangeLocation("calls")}
                            >
                                <IoIosExit />
                                &nbsp;Izadji
                            </button>
                        </div>

                    </div >
                </form>
            </div >
        )
    }
}

export default SingleCallView;
