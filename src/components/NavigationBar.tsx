import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { Location } from '../contexts/NavigationContext';
import useNavigation from '../hooks/useNavigation';
import Icons from './Icons';
import './NavigationBar.styles.css';

export default function NavigationBar() {
  return (
    <div className='navigation-bar'>
      <div>
        <Item location='calendar' />
        <Item location='call' />
        <Item location='stats' />
      </div>
      <div>
        <Item location='admin' />
        <Item location='settings' />
      </div>
    </div>
  );
}

interface ItemProps {
  location: Location;
}

const locationToIcon: Record<Location, ReactNode> = {
  admin: <Icons.Admin />,
  calendar: <Icons.Calendar />,
  call: <Icons.Call />,
  settings: <Icons.Settings />,
  stats: <Icons.Stats />,
};

function Item({ location }: ItemProps) {
  const { location: currentLocation, navigate } = useNavigation();

  const className = classNames({
    'navigation-bar__item': true,
    'navigation-bar__item--active': currentLocation === location,
  });

  return (
    <div className={className} onClick={() => navigate(location)}>
      {locationToIcon[location]}
    </div>
  );
}
