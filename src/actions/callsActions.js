import { FETCH_CALLS } from './type';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export const fetchCalls = () => dispatch => {
    ipcRenderer.send('getCalls');
    ipcRenderer.once('callsSent', (event, callObject) => {
        dispatch({
            type: FETCH_CALLS,
            payload: callObject,
        });
    });
};
