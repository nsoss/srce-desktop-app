import React from 'react';
import { FaCopy, FaFileCsv, FaPencilAlt, FaSave } from 'react-icons/fa';
import { IoIosExit } from 'react-icons/io';
import { connect } from 'react-redux';
import MaskedInput from 'react-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import { getInitialData } from '../store';
import CallFormDropdown from './CallFormDropdown';
import Dropdown from './Dropdown';

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
        volunteers: [],
      },
    };
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  componentDidMount() {
    this.props.getInitialData();
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
    const { volunteers } = this.state.formData;

    return (
      <form className='single-call-container'>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '30px',
          }}>
          <div className='single-call-area ' style={{ marginRight: '30px' }}>
            <p className='single-call-area-label'>Poziv</p>
            <div className='single-call-form-row'>
              <label className='form-label'>Redni broj</label>
              <input
                type='text'
                name='call-number'
                className='form-input '
                placeholder='Redni broj'
                style={{ marginTop: '0' }}
              />
            </div>
            <div className='single-call-form-row'>
              <label className='form-label'>Vrsta kontakta</label>
              <CallFormDropdown dropdownKey='contactTypes' />
            </div>

            <div className='single-call-form-row'>
              <label className='form-label'>Vrsta poziva *</label>
              <CallFormDropdown dropdownKey='callTypes' />
            </div>

            <div className='single-call-form-row'>
              <label className='form-label'>Datum</label> <br />
              <MaskedInput
                name='date'
                className='form-input required'
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
                placeholder='25/09/1970'
              />
            </div>
            <div className='single-call-form-row'>
              <label className='form-label'>Vreme</label> <br />
              <MaskedInput
                name='time'
                className='form-input required'
                mask={timeMask}
                placeholder='10:00'
              />
            </div>
            <div className='single-call-form-row'>
              <label className='form-label'>Dan</label> <br />
              <CallFormDropdown dropdownKey='days' />
            </div>
            <div className='single-call-form-row'>
              <label className='form-label '>Trajanje</label>
              <MaskedInput
                name='duration'
                className='form-input required'
                mask={[/\d/, /\d/, ':', /[1-5]/, /\d/]}
                placeholder='10:00'
              />
            </div>
          </div>

          <div className='single-call-area '>
            <p className='single-call-area-label'>Pozivar</p>
            <div className='single-call-form-row'>
              <label className='form-label'>Ime ili nadimak</label>
              <input
                type='text'
                name='caller-name'
                className='form-input'
                placeholder='Ime ili nadimak'
                style={{ marginTop: '0' }}
              />
            </div>
            <div className='single-call-form-row'>
              <label className='form-label'>Pol</label>
              <CallFormDropdown dropdownKey='genders' />
            </div>
            <div className='single-call-form-row'>
              <label className='form-label'>Starost</label>
              <CallFormDropdown dropdownKey='ages' />
            </div>
            <div className='single-call-form-row'>
              <label className='form-label'>Bračno stanje</label>
              <CallFormDropdown dropdownKey='maritalStatuses' />
            </div>
            <div className='single-call-form-row'>
              <label className='form-label'>Koji put zove</label>
              <CallFormDropdown dropdownKey='callOrdinalities' />
            </div>
            <div className='single-call-form-row'>
              <label className='form-label'>Uključenost u plan</label>
              <CallFormDropdown dropdownKey='planInvolvements' />
            </div>
            <div className='single-call-form-row'>
              <label className='form-label'>Volonter *</label>
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
          <div className='single-call-coversation-details '>
            <p className='single-call-area-label'>Opis razgovora</p>
            <div className='column-details'>
              <div className='single-call-form-row'>
                <label className='form-label' style={{ marginTop: '8px' }}>
                  Vrsta problema *
                </label>
                <CallFormDropdown dropdownKey='problemTypes' />
              </div>
              <div className='single-call-form-row'>
                <label className='form-label'>Suicidalni rizik *</label>
                <CallFormDropdown dropdownKey='suicideRisks' />
              </div>
              <div className='single-call-form-row'>
                <label className='form-label'>Suicidalni faktor *</label>
                <CallFormDropdown dropdownKey='suicideFactors' />
              </div>
              <div className='single-call-form-row'>
                <label className='form-label'>Pokušaji</label>
                <CallFormDropdown dropdownKey='postCallStates' />
              </div>
            </div>
            <div className='column-details' style={{ marginLeft: '30px' }}>
              <div
                className='single-call-form-row'
                style={{ marginBottom: '10px' }}>
                <label className='form-label'>Kratak sadržaj</label>
                <textarea name='content required' rows='5' />
              </div>
              <div className='single-call-form-row'>
                <label className='form-label'>Napomena</label>
                <textarea name='content' rows='3' />
              </div>
            </div>
          </div>
        </div>

        <div
          style={{ display: 'flex', flexDirection: 'row' }}
          className='single-call-buttons'>
          <button
            className='btn-srce'
            onClick={(event) => {
              event.preventDefault();
              ipcRenderer.send('insertCall', this.state.call);
            }}>
            <FaSave />
            &nbsp;Snimi
          </button>
          <button className='btn-srce' onClick={this.handleUpdateData}>
            <FaPencilAlt />
            &nbsp;Izmeni
          </button>
          <button className='btn-srce' onClick={this.handleCopyData}>
            <FaCopy />
            &nbsp;Kopiraj
          </button>
          <button
            className='btn-srce'
            onClick={this.handleExportToExcel}
            style={{ width: '135px' }}>
            <FaFileCsv />
            &nbsp;Prebaci u CSV
          </button>
          <button
            className='btn-srce'
            style={{ backgroundColor: '#CC8066 ' }}
            onClick={() => this.props.handleChangeLocation('calls')}>
            <IoIosExit />
            &nbsp;Izadji
          </button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = {
  getInitialData,
};

export default connect(null, mapDispatchToProps)(SingleCallView);
