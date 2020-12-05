import { action } from '@storybook/addon-actions';
import React from 'react';
import VolunteerOverview from './VolunteerOverview';

export default {
  title: 'Pages/Volunteer overview',
  component: VolunteerOverview,
};

const mockVolunteers: Array<Volunteer> = [
  { id: 1, name: 'Miroslav', createdAt: new Date() },
  { id: 2, name: 'Vladimir', createdAt: new Date() },
  { id: 3, name: 'Zoran', createdAt: new Date() },
  { id: 4, name: 'Ljubomir', createdAt: new Date() },
  { id: 5, name: 'Vesna', createdAt: new Date() },
  { id: 6, name: 'Radmila', createdAt: new Date() },
  { id: 7, name: 'Milica', createdAt: new Date() },
  { id: 8, name: 'Svetlana', createdAt: new Date() },
  { id: 9, name: 'Slavica', createdAt: new Date() },
];

export function Empty() {
  return (
    <VolunteerOverview onAdd={action('volunteer_added')} volunteers={[]} />
  );
}

export function OneVolunteer() {
  return (
    <VolunteerOverview
      onAdd={action('volunteer_added')}
      volunteers={[mockVolunteers[0]]}
    />
  );
}

export function ManyVolunteers() {
  return (
    <VolunteerOverview
      onAdd={action('volunteer_added')}
      volunteers={mockVolunteers}
    />
  );
}
