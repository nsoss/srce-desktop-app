import React, { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.styles.css';
import CallsStatistic from './components/CallsStatistic';
import CallsView from './components/CallsView';
import NavigationBar from './components/NavigationBar';
import SingleCallView from './components/SingleCallView';
import { Location } from './contexts/NavigationContext';
import useNavigation from './hooks/useNavigation';
import VolunteerOverviewContainer from './pages/VolunteerOverview.container';
import { getInitialData } from './store';

const locationToScreen: Record<Location, ReactNode> = {
  admin: <VolunteerOverviewContainer />,
  calendar: <CallsView />,
  call: <SingleCallView />,
  settings: <VolunteerOverviewContainer />,
  stats: <CallsStatistic />,
};

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInitialData());
  }, [dispatch]);
  const { location } = useNavigation();

  return (
    <div className='app'>
      <NavigationBar />
      {locationToScreen[location]}
    </div>
  );
}
