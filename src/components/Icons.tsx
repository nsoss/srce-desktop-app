import { ReactComponent as ArrowBackIcon } from 'ionicons/dist/svg/arrow-back-outline.svg';
import { ReactComponent as ArrowForwardIcon } from 'ionicons/dist/svg/arrow-forward-outline.svg';
import { ReactComponent as CalendarIcon } from 'ionicons/dist/svg/calendar-outline.svg';
import { ReactComponent as CallIcon } from 'ionicons/dist/svg/call-outline.svg';
import { ReactComponent as CopyIcon } from 'ionicons/dist/svg/copy-outline.svg';
import { ReactComponent as DocumentIcon } from 'ionicons/dist/svg/document-outline.svg';
import { ReactComponent as ExitIcon } from 'ionicons/dist/svg/exit-outline.svg';
import { ReactComponent as PencilIcon } from 'ionicons/dist/svg/pencil-outline.svg';
import { ReactComponent as PeopleCircleIcon } from 'ionicons/dist/svg/people-circle-outline.svg';
import { ReactComponent as PersonAddIcon } from 'ionicons/dist/svg/person-add-outline.svg';
import { ReactComponent as PersonRemoveIcon } from 'ionicons/dist/svg/person-remove-outline.svg';
import { ReactComponent as SaveIcon } from 'ionicons/dist/svg/save-outline.svg';
import { ReactComponent as SettingsIcon } from 'ionicons/dist/svg/settings-outline.svg';
import { ReactComponent as StatsChartIcon } from 'ionicons/dist/svg/stats-chart-outline.svg';
import React from 'react';
import './Icons.styles.css';

function AddVolunteer() {
  return <PersonAddIcon className='icon' />;
}

function Admin() {
  return <PeopleCircleIcon className='icon' />;
}

function Back() {
  return <ArrowBackIcon className='icon' />;
}

function Calendar() {
  return <CalendarIcon className='icon' />;
}

function Call() {
  return <CallIcon className='icon' />;
}

function Copy() {
  return <CopyIcon className='icon' />;
}

function DeleteVolunteer() {
  return <PersonRemoveIcon className='icon' />;
}

function Edit() {
  return <PencilIcon className='icon' />;
}

function Exit() {
  return <ExitIcon className='icon' />;
}

function Export() {
  return <DocumentIcon className='icon' />;
}

function Forward() {
  return <ArrowForwardIcon className='icon' />;
}

function Save() {
  return <SaveIcon className='icon' />;
}

function Settings() {
  return <SettingsIcon className='icon' />;
}

function Stats() {
  return <StatsChartIcon className='icon' />;
}

export default {
  AddVolunteer,
  Admin,
  Back,
  Calendar,
  Call,
  Copy,
  DeleteVolunteer,
  Edit,
  Exit,
  Export,
  Forward,
  Save,
  Settings,
  Stats,
};
