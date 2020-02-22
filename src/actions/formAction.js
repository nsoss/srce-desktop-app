import { FETCH_FORM } from './type';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export const fetchForm = () => dispatch => {
    ipcRenderer.send('getFormData');
    ipcRenderer.once('formDataSent', (event, formDataObject) => {
        dispatch({
            type: FETCH_FORM,
            payload: formDataObject,
        });
    });
};
