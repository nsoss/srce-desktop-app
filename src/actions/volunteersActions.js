import { FETCH_VOLUNTEERS, ADD_VOLUNTEER, DELETE_VOLUNTEER } from './type';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export const fetchVolunteers = () => dispatch => {
    ipcRenderer.send('getVolunteers');
    ipcRenderer.once('volunteersSent', (event, volunteers) => {
        dispatch({
            type: FETCH_VOLUNTEERS,
            payload: volunteers
        })
    });
};

export const addVolunteer = (newVolunteer) => dispatch => {
    ipcRenderer.send('insertVolunteer', newVolunteer);
    ipcRenderer.once('volunteerInserted', (event, insertedID) => {
        if (insertedID) {
            newVolunteer.volunteer_id = insertedID;
            dispatch({
                type: ADD_VOLUNTEER,
                payload: newVolunteer
            })
        } else {
            console.log('Something went wrong...');
        }
    });
};

export const deleteVolunteer = (id) => dispatch => {
    ipcRenderer.send('deleteVolunteer', id);
    ipcRenderer.once('volunteerDeleted', (event, isDeleted) => {
        if (isDeleted) {
            dispatch({
                type: DELETE_VOLUNTEER,
                payload: id
            })
        } else {
            console.log('Volunteer with id: ' + id + ' does not exists.');
        }
    });
};
