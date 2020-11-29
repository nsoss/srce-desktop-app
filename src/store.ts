import { IpcRendererEvent } from 'electron';
import { applyMiddleware, combineReducers, createStore, Dispatch } from 'redux';
import thunk from 'redux-thunk';
import { AdminAction } from './actions/adminActions';
import { CallFormAction } from './actions/callFormActions';
import { CallsAction } from './actions/callsActions';
import { FormAction } from './actions/formActions';
import { VolunteersAction } from './actions/volunteersActions';
import adminReducer from './reducers/adminReducer';
import callsReducer from './reducers/callsReducer';
import formReducer from './reducers/formReducer';
import volunteersReducer from './reducers/volunteersReducer';

const { ipcRenderer } = window.require('electron');

function invokeIpc<TResult>(
  channel: IpcChannel,
  handler: (result: TResult) => void
) {
  ipcRenderer.send(channel);
  ipcRenderer.once(channel, (_: IpcRendererEvent, result: TResult) => {
    handler(result);
  });
}

const rootReducer = combineReducers({
  admin: adminReducer,
  calls: callsReducer,
  form: formReducer,
  volunteers: volunteersReducer,
});

const initialDataReceived = (initialData: InitialData) =>
  ({
    type: 'INITIAL_DATA_RECEIVED',
    initialData,
  } as const);

export const getInitialData = () => (dispatch: AppDispatch) => {
  invokeIpc<InitialData>('get_initial_data', (initialData) => {
    dispatch(initialDataReceived(initialData));
  });
};

export type AppState = ReturnType<typeof rootReducer>;
export type AppAction =
  | ReturnType<typeof initialDataReceived>
  | AdminAction
  | CallFormAction
  | CallsAction
  | FormAction
  | VolunteersAction;
export type AppDispatch = Dispatch<AppAction>;

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
