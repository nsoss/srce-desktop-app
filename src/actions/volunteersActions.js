import { ADD_VOLUNTEER, DELETE_VOLUNTEER, FETCH_VOLUNTEERS } from './type';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export const fetchVolunteers = () => dispatch => {
    ipcRenderer.send('getVolunteers');
    ipcRenderer.once('volunteersSent', (event, volunteers) => {
        dispatch({
            type: FETCH_VOLUNTEERS,
            payload: volunteers,
        });
    });
};

export const addVolunteer = newVolunteer => dispatch => {
    ipcRenderer.send('insertVolunteer', newVolunteer);
    ipcRenderer.once('volunteerInserted', (_, volunteer) => {
        dispatch({
            type: ADD_VOLUNTEER,
            payload: volunteer,
        });
    });
};

export const deleteVolunteer = id => dispatch => {
    ipcRenderer.send('deleteVolunteer', id);
    ipcRenderer.once('volunteerDeleted', (event, isDeleted) => {
        if (isDeleted) {
            dispatch({
                type: DELETE_VOLUNTEER,
                payload: id,
            });
        } else {
        }
    });
};
