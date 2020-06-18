import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './appEntry.css';
import './styles/adminStyles.css';
import store from './store';
import { ThemeProvider } from './theme/ThemeContext';

const { ipcRenderer } = window.require('electron');

ipcRenderer.send('get_version_string');
ipcRenderer.once('get_version_string', (_, version) => {
    document.title += ' ' + version;
});

let updateAvailable = false;
ipcRenderer.once('update_available', () => {
    updateAvailable = true;
});

let updateDownloaded = false;
ipcRenderer.once('update_downloaded', () => {
    updateDownloaded = true;
});

const update = () => {
    ipcRenderer.send('update');
};

const app = document.getElementById('app');
ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider>
            <App
                updateAvailable={updateAvailable}
                updateDownloaded={updateDownloaded}
                update={update}
            />
        </ThemeProvider>
    </Provider>,
    app
);
