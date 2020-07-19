import { AppDispatch } from '../store';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export const fetchCalls = () => (dispatch: AppDispatch) => {
  ipcRenderer.send('getCalls');
  ipcRenderer.once('callsSent', (event: any, callObject: any) => {
    dispatch(fetchCallsAction(callObject));
  });
};

const fetchCallsAction = (callObject: any) =>
  ({
    type: 'FETCH_CALLS',
    payload: callObject,
  } as const);

export type CallsAction = ReturnType<typeof fetchCallsAction>;
