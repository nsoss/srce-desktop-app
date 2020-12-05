import formatDate from 'date-fns/format';
import React, { useState } from 'react';
import Button from '../components/Button';
import Icons from '../components/Icons';
import Input from '../components/Input';
import './VolunteerOverview.styles.css';

interface VolunteerOverviewProps {
  onAdd: (volunteerName: string) => void;
  volunteers: Array<Volunteer>;
}

export default function VolunteerOverview({
  onAdd,
  volunteers,
}: VolunteerOverviewProps) {
  const [name, setName] = useState('');

  return (
    <div className='volunteer-overview__container'>
      <div className='volunteer-overview'>
        <div className='volunteer-overview__form'>
          <Input
            onChange={(e) => setName(e.target.value)}
            placeholder='Ime'
            value={name}
          />
          <Button onClick={() => onAdd(name)}>
            <Icons.AddVolunteer />
            Dodaj
          </Button>
        </div>
        <table className='volunteer-overview__table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ime</th>
              <th>Datum dodavanja</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((volunteer) => (
              <tr key={volunteer.id}>
                <td>{volunteer.id}</td>
                <td>{volunteer.name}</td>
                <td>{formatDate(volunteer.createdAt, 'dd.MM.yyyy.')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
