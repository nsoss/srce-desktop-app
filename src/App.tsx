import React, { ReactNode } from 'react';
import './App.styles.css';
import AdminPanel from './components/AdminPanel';
import CallsStatistic from './components/CallsStatistic';
import CallsView from './components/CallsView';
import NavigationBar from './components/NavigationBar';
import SingleCallView from './components/SingleCallView';
import { Location } from './contexts/NavigationContext';
import useNavigation from './hooks/useNavigation';

const locationToScreen: Record<Location, ReactNode> = {
  admin: <AdminPanel />,
  calendar: <CallsView />,
  call: <SingleCallView />,
  settings: <AdminPanel />,
  stats: <CallsStatistic />,
};

export default function App() {
  const { location } = useNavigation();

  return (
    <div className='app'>
      <NavigationBar />
      {locationToScreen[location]}
    </div>
  );
}
