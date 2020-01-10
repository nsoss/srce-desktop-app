import React from 'react';
import { useState, useLayoutEffect } from 'react';
import { fileWrite, fileRead } from '../user_settings/loadUserSettings';

let m = fileRead();
console.log(m.dark_theme)

const ThemeContext = React.createContext({
    dark: m.dark_theme,
    toggle: () => { },
})

export default ThemeContext;

export function ThemeProvider(props) {
    const [dark, setDark] = useState(true);

    useLayoutEffect(() => {
        const lastTheme = dark;

        if (lastTheme == true) {
            applyTheme(darkTheme);
        }

        if (lastTheme == false) {
            applyTheme(lightTheme);
        }
    }, [dark]);

    const applyTheme = theme => {
        const root = document.getElementsByTagName('html')[0];
        root.style.cssText = theme.join(';');
    }

    const toggle = () => {
        m.dark_theme = !dark;
        setDark(!dark);
        fileWrite(m);
        const body = document.getElementsByTagName('body')[0];
        body.style.cssText = 'transition: background .5s ease';
    };

    return <ThemeContext.Provider value={({
        dark,
        toggle,
    })}>
        {props.children}
    </ThemeContext.Provider>
}

const lightTheme = [
    '--text: #000000',
    '--color-nav: #8D63A6',
    '--color-nav-selected: #5B2F76 ',
    '--color-bg: #E5E5E5 ',
    '--text-white: #ffffff',
    '--text-black: #000000',
    '--btn-bg: #98C23D',
    '--calendar-selected: #8D63A6',
    '--form-input-border: #CCCCCC',
    '--form-input-bg:  #F7F7F7',
    '--single-call-panels-border: #8D63A6',
    '--single-call-panels-bg: #ffffff'
];

const darkTheme = [
    '--text: #E5E5E5',
    '--color-nav: #8D63A6',
    '--color-nav-selected: #5B2F76 ',
    '--color-bg: #4d4d4d ',
    '--text-white: #ffffff',
    '--text-black: #000000',
    '--btn-bg: #262626',
    '--calendar-selected: #262626',
    '--form-input-border: #0d0d0d',
    '--form-input-bg: #0d0d0d',
    '--single-call-panels-border: #0d0d0d',
    '--single-call-panels-bg: #333333'
];

