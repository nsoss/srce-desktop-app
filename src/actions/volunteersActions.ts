import { AppDispatch } from '../store';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

const fetchVolunteersAction = (volunteers: any) =>
  ({
    type: 'FETCH_VOLUNTEERS',
    payload: volunteers,
  } as const);

export const addVolunteer = (newVolunteer: any) => (dispatch: AppDispatch) => {
  ipcRenderer.send('insertVolunteer', newVolunteer);
  ipcRenderer.once('volunteerInserted', (event: any, volunteer: any) => {
    dispatch(addVolunteerAction(volunteer));
  });
};

const addVolunteerAction = (volunteer: any) =>
  ({
    type: 'ADD_VOLUNTEER',
    payload: volunteer,
  } as const);

export const deleteVolunteer = (id: any) => (dispatch: AppDispatch) => {
  ipcRenderer.send('deleteVolunteer', id);
  ipcRenderer.once('volunteerDeleted', (event: any, isDeleted: any) => {
    if (isDeleted) {
      dispatch(deleteVolunteerAction(id));
    }
  });
};

const deleteVolunteerAction = (id: any) =>
  ({
    type: 'DELETE_VOLUNTEER',
    payload: id,
  } as const);

export type VolunteersAction =
  | ReturnType<typeof fetchVolunteersAction>
  | ReturnType<typeof addVolunteerAction>
  | ReturnType<typeof deleteVolunteerAction>;
