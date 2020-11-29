import classNames from 'classnames';
import React, { ReactNode } from 'react';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import FormLabel from '../components/FormLabel';
import Icons from '../components/Icons';
import Input from '../components/Input';
import strings from '../strings';
import './NewEntry.styles.css';

export default function NewEntry() {
  return (
    <div className='new-entry'>
      <div className='new-entry__actions'>
        <Button>
          <Icons.Save />
          {strings.save}
        </Button>
        <Button>
          <Icons.Edit />
          {strings.edit}
        </Button>
        <Button>
          <Icons.Copy />
          {strings.copy}
        </Button>
        <Button>
          <Icons.Export />
          {strings.exportToCsv}
        </Button>
        <Button danger>
          <Icons.Exit />
          {strings.exit}
        </Button>
      </div>
      <Section title={strings.call}>
        <FormLabel label={strings.ordinalNumber}>
          <Input />
        </FormLabel>
        <FormLabel label={strings.contactType}>
          <PlaceholderDropdown />
        </FormLabel>
        <FormLabel label={strings.callType} required>
          <PlaceholderDropdown />
        </FormLabel>
        <FormLabel label={strings.date} required>
          <Input />
        </FormLabel>
        <FormLabel label={strings.time}>
          <Input />
        </FormLabel>
        <FormLabel label={strings.day}>
          <Input />
        </FormLabel>
        <FormLabel label={strings.duration}>
          <Input />
        </FormLabel>
      </Section>
      <Section title={strings.caller}>
        <FormLabel label={strings.nameOrNickname}>
          <Input />
        </FormLabel>
        <FormLabel label={strings.gender}>
          <PlaceholderDropdown />
        </FormLabel>
        <FormLabel label={strings.age}>
          <PlaceholderDropdown />
        </FormLabel>
        <FormLabel label={strings.maritalStatus}>
          <PlaceholderDropdown />
        </FormLabel>
        <FormLabel label={strings.callOrdinality}>
          <PlaceholderDropdown />
        </FormLabel>
        <FormLabel label={strings.planInvolvement}>
          <PlaceholderDropdown />
        </FormLabel>
        <FormLabel label={strings.volunteer} required>
          <PlaceholderDropdown />
        </FormLabel>
      </Section>
      <Section
        className='new-entry__description-section'
        title={strings.callDescription}>
        <FormLabel label={strings.problemType} required>
          <PlaceholderDropdown />
        </FormLabel>
        <FormLabel label={strings.suicideRisk} required>
          <PlaceholderDropdown />
        </FormLabel>
        <FormLabel label={strings.suicideFactor} required>
          <PlaceholderDropdown />
        </FormLabel>
        <FormLabel label={strings.attempts}>
          <PlaceholderDropdown />
        </FormLabel>
        <FormLabel label={strings.summary}>
          <Input />
        </FormLabel>
        <FormLabel label={strings.note}>
          <Input />
        </FormLabel>
        <FormLabel label={strings.postCallState} required>
          <PlaceholderDropdown />
        </FormLabel>
      </Section>
    </div>
  );
}

function PlaceholderDropdown() {
  return (
    <Dropdown items={[]} itemToLabel={(item) => item} onSelect={() => {}} />
  );
}

interface SectionProps {
  children?: ReactNode;
  className?: string;
  title?: string;
}

function Section({ children, className, title }: SectionProps) {
  return (
    <div className={classNames('new-entry__section', className)}>
      {title && <h1>{title}</h1>}
      {children}
    </div>
  );
}
