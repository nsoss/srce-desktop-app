import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './appEntry.css';
import { NavigationProvider } from './contexts/NavigationContext';
import './index.css';
import store from './store';
import './styles/adminStyles.css';
import { ThemeProvider } from './theme/ThemeContext';

const root = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <NavigationProvider>
        <App />
      </NavigationProvider>
    </ThemeProvider>
  </Provider>,
  root
);
