import React from 'react';
import MaskedInput from 'react-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import labels, * as strings from '../strings';
import Button from './Button';
import Dropdown from './Dropdown';
import Icons from './Icons';
import Input from './Input';

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
            <p className='single-call-area-label'>{labels.call}</p>
            <div className='single-call-form-row'>
              <label className='form-label'>{labels.ordinalNumber}</label>
              <input
                type='text'
                name='call-number'
                placeholder={labels.ordinalNumber}
                style={{ marginTop: '0' }}
              />
            </div>
            <div className='single-call-form-row'>
              <label className='form-label'>{labels.contactType}</label>
              <PlaceholderDropdown />
            </div>
            <div className='single-call-form-row'>
              <label className='form-label'>{labels.callType}</label>
              <Dropdown
                items={callTypes}
                itemToLabel={(item) => strings.callTypes[item.value]}
              />
            </div>
            <div className='single-call-form-row'>
              <label className='form-label'>{labels.date}</label> <br />
              <MaskedInput
                name='date'
                className='input required'
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
              <label className='form-label'>{labels.time}</label> <br />
              <MaskedInput
                name='time'
                className='input required'
                mask={timeMask}
                placeholder='10:00'
              />
            </div>
            <div className='single-call-form-row'>
              <label className='form-label'>{labels.day}</label> <br />
              <PlaceholderDropdown />
            </div>
            <div className='single-call-form-row'>
              <label className='form-label'>{labels.duration}</label>
              <MaskedInput
                name='duration'
                className='input required'
                mask={[/\d/, /\d/, ':', /[1-5]/, /\d/]}
                placeholder='10:00'
              />
            </div>
          </div>
          <div className='single-call-area '>
            <p className='single-call-area-label'>{labels.caller}</p>
            <div className='single-call-form-row'>
              <label className='form-label'>{labels.nameOrNickname}</label>
              <Input
                type='text'
                name='caller-name'
                placeholder={labels.nameOrNickname}
                style={{ marginTop: '0' }}
              />
            </div>
            <div className='single-call-form-row'>
              <label className='form-label'>{labels.gender}</label>
              <Dropdown
                items={genders}
                itemToLabel={(item) => strings.genders[item.value]}
              />
            </div>
            <div className='single-call-form-row'>
              <label className='form-label'>{labels.age}</label>
              <PlaceholderDropdown />
            </div>
            <div className='single-call-form-row'>
              <label className='form-label'>{labels.maritalStatus}</label>
              <Dropdown
                items={maritalStatuses}
                itemToLabel={(item) => strings.maritalStatuses[item.value]}
              />
            </div>
            <div className='single-call-form-row'>
              <label className='form-label'>{labels.callOrdinality}</label>
              <Dropdown
                items={callOrdinalities}
                itemToLabel={(item) => strings.callOrdinalities[item.value]}
              />
            </div>
            <div className='single-call-form-row'>
              <label className='form-label'>{labels.planInvolvement}</label>
              <PlaceholderDropdown />
            </div>
            <div className='single-call-form-row'>
              <label className='form-label'>{labels.volunteer}</label>
              <Dropdown
                items={volunteers}
                itemToLabel={(volunteer) => volunteer.name}
              />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div className='single-call-coversation-details '>
            <p className='single-call-area-label'>{labels.callDescription}</p>
            <div className='column-details'>
              <div className='single-call-form-row'>
                <label className='form-label' style={{ marginTop: '8px' }}>
                  {labels.problemType}
                </label>
                <Dropdown
                  items={problemTypes}
                  itemToLabel={(item) => strings.problemTypes[item.value]}
                />
              </div>
              <div className='single-call-form-row'>
                <label className='form-label'>{labels.suicideRisk}</label>
                <Dropdown
                  items={suicideRisks}
                  itemToLabel={(item) => strings.suicideRisks[item.value]}
                />
              </div>
              <div className='single-call-form-row'>
                <label className='form-label'>{labels.suicideFactor}</label>
                <Dropdown
                  items={suicideFactors}
                  itemToLabel={(item) => strings.suicideFactors[item.value]}
                />
              </div>
              <div className='single-call-form-row'>
                <label className='form-label'>{labels.postCallState}</label>
                <Dropdown
                  items={postCallStates}
                  itemToLabel={(item) => strings.postCallStates[item.value]}
                />
              </div>
            </div>
            <div className='column-details' style={{ marginLeft: '30px' }}>
              <div
                className='single-call-form-row'
                style={{ marginBottom: '10px' }}>
                <label className='form-label'>{labels.summary}</label>
                <textarea name='content required' rows={5} />
              </div>
              <div className='single-call-form-row'>
                <label className='form-label'>{labels.note}</label>
                <textarea name='content' rows={3} />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'row' }}
          className='single-call-buttons'>
          <Button>
            <Icons.Save />
            {labels.save}
          </Button>
          <Button>
            <Icons.Edit />
            {labels.edit}
          </Button>
          <Button>
            <Icons.Copy />
            {labels.copy}
          </Button>
          <Button>
            <Icons.Export />
            {labels.exportToCsv}
          </Button>
          <Button danger>
            <Icons.Exit />
            {labels.exit}
          </Button>
        </div>
      </form>
    );
  }
}

function PlaceholderDropdown() {
  return <Dropdown items={[]} itemToLabel={() => ''} />;
}

export default SingleCallView;
