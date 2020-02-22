import React from 'react';
import ReactDOM from 'react-dom';
import './appEntry.scss';
import App from './App.jsx';
import { ThemeProvider } from './theme/ThemeContext';
import { Provider } from 'react-redux';
import store from './store';

const app = document.getElementById('app');
ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </Provider>,
    app
);
