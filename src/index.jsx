import React from 'react';
import ReactDOM from "react-dom";
import './appEntry.scss';
import App from './App.jsx';
import './Helpers.css'
import { ThemeProvider } from './theme/ThemeContext';

const app = document.getElementById('app');
ReactDOM.render(<ThemeProvider><App /></ThemeProvider>, app);
