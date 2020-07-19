import { AppDispatch } from '../store';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export const fetchForm = () => (dispatch: AppDispatch) => {
    ipcRenderer.send('getFormData');
    ipcRenderer.once('formDataSent', (event: any, formDataObject: any) => {
        dispatch(fetchFormAction(formDataObject));
    });
};

const fetchFormAction = (formDataObject: any) =>
    ({
        type: 'FETCH_FORM',
        payload: formDataObject,
    } as const);

export type FormAction = ReturnType<typeof fetchFormAction>;
