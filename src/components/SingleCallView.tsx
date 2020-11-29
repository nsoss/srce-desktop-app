import React from 'react';
import MaskedInput from 'react-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import * as strings from '../strings';
import CallFormDropdown from './CallFormDropdown';
import Dropdown from './Dropdown';
import Icons from './Icons';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

function timeMask(value: string) {
  const chars = value.split('');
  const hours: Array<RegExp | string> = [
    /[0-2]/,
    chars[0] === '2' ? /[0-3]/ : /[0-9]/,
  ];

  const minutes = [/[0-5]/, /[0-9]/];

  return hours.concat(':').concat(minutes);
}

const autoCorrectedDatePipe = createAutoCorrectedDatePipe('mm/dd/yyyy');

interface SingleCallViewProps {}

interface SingleCallViewState {
  initialData: InitialData;
}

class SingleCallView extends React.Component<
  SingleCallViewProps,
  SingleCallViewState
> {
  constructor(props: SingleCallViewProps) {
    super(props);
    this.state = {
      initialData: {
        volunteers: [],
        callTypes: [],
        genders: [],
        maritalStatuses: [],
        callOrdinalities: [],
        problemTypes: [],
        suicideRisks: [],
        suicideFactors: [],
        postCallStates: [],
      },
    };
  }

  componentDidMount() {
    ipcRenderer.send('get_initial_data');
    ipcRenderer.once('get_initial_data', (_: any, initialData: InitialData) => {
      this.setState({ initialData });
    });
  }

  render() {
    const {
      volunteers,
      callTypes,
      genders,
      maritalStatuses,
      callOrdinalities,
      problemTypes,
      suicideRisks,
      suicideFactors,
      postCallStates,
    } = this.state.initialData;

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
              <CallFormDropdown items={[]} />
            </div>

            <div className='single-call-form-row'>
              <label className='form-label'>Vrsta poziva *</label>
              <CallFormDropdown
                items={callTypes}
                dictionary={strings.callTypes}
              />
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
              <CallFormDropdown items={[]} />
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
              <CallFormDropdown items={genders} dictionary={strings.genders} />
            </div>
            <div className='single-call-form-row'>
              <label className='form-label'>Starost</label>
              <CallFormDropdown items={[]} />
            </div>
            <div className='single-call-form-row'>
              <label className='form-label'>Bračno stanje</label>
              <CallFormDropdown
                items={maritalStatuses}
                dictionary={strings.maritalStatuses}
              />
            </div>
            <div className='single-call-form-row'>
              <label className='form-label'>Koji put zove</label>
              <CallFormDropdown
                items={callOrdinalities}
                dictionary={strings.callOrdinalities}
              />
            </div>
            <div className='single-call-form-row'>
              <label className='form-label'>Uključenost u plan</label>
              <CallFormDropdown items={[]} />
            </div>
            <div className='single-call-form-row'>
              <label className='form-label'>Volonter *</label>
              <Dropdown
                label='Izaberi'
                items={volunteers}
                itemToLabel={(volunteer) => volunteer.name}
                onSelect={() => {}}
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
                <CallFormDropdown
                  items={problemTypes}
                  dictionary={strings.problemTypes}
                />
              </div>
              <div className='single-call-form-row'>
                <label className='form-label'>Suicidalni rizik *</label>
                <CallFormDropdown
                  items={suicideRisks}
                  dictionary={strings.suicideRisks}
                />
              </div>
              <div className='single-call-form-row'>
                <label className='form-label'>Suicidalni faktor *</label>
                <CallFormDropdown
                  items={suicideFactors}
                  dictionary={strings.suicideFactors}
                />
              </div>
              <div className='single-call-form-row'>
                <label className='form-label'>Stanje na kraju poziva</label>
                <CallFormDropdown
                  items={postCallStates}
                  dictionary={strings.postCallStates}
                />
              </div>
            </div>
            <div className='column-details' style={{ marginLeft: '30px' }}>
              <div
                className='single-call-form-row'
                style={{ marginBottom: '10px' }}>
                <label className='form-label'>Kratak sadržaj</label>
                <textarea name='content required' rows={5} />
              </div>
              <div className='single-call-form-row'>
                <label className='form-label'>Napomena</label>
                <textarea name='content' rows={3} />
              </div>
            </div>
          </div>
        </div>

        <div
          style={{ display: 'flex', flexDirection: 'row' }}
          className='single-call-buttons'>
          <button className='btn-srce'>
            <Icons.Save />
            &nbsp;Snimi
          </button>
          <button className='btn-srce'>
            <Icons.Edit />
            &nbsp;Izmeni
          </button>
          <button className='btn-srce'>
            <Icons.Copy />
            &nbsp;Kopiraj
          </button>
          <button className='btn-srce' style={{ width: '135px' }}>
            <Icons.Export />
            &nbsp;Prebaci u CSV
          </button>
          <button className='btn-srce' style={{ backgroundColor: '#CC8066 ' }}>
            <Icons.Exit />
            &nbsp;Izadji
          </button>
        </div>
      </form>
    );
  }
}

export default SingleCallView;
