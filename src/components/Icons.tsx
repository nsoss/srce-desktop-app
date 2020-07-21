import { ReactComponent as CalendarIcon } from 'ionicons/dist/svg/calendar-outline.svg';
import { ReactComponent as CallIcon } from 'ionicons/dist/svg/call-outline.svg';
import { ReactComponent as PeopleCircleIcon } from 'ionicons/dist/svg/people-circle-outline.svg';
import { ReactComponent as SettingsIcon } from 'ionicons/dist/svg/settings-outline.svg';
import { ReactComponent as StatsChartIcon } from 'ionicons/dist/svg/stats-chart-outline.svg';
import React from 'react';
import './Icons.styles.css';

function Admin() {
  return <PeopleCircleIcon className="icon" />;
}

function Calendar() {
  return <CalendarIcon className="icon" />;
}

function Call() {
  return <CallIcon className="icon" />;
}

function Settings() {
  return <SettingsIcon className="icon" />;
}

function Stats() {
  return <StatsChartIcon className="icon" />;
}

export default {
  Admin,
  Calendar,
  Call,
  Settings,
  Stats,
};
