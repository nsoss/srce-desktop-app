import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './appEntry.scss';
import store from './store';
import { ThemeProvider } from './theme/ThemeContext';

const { ipcRenderer } = window.require('electron');

ipcRenderer.send('get_version_string');
ipcRenderer.once('get_version_string', (_, version) => {
    document.title += ' ' + version;
});

const app = document.getElementById('app');
ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </Provider>,
    app
);
