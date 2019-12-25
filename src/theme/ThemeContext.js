import React from 'react';
import { useState, useLayoutEffect } from 'react';
import { fileWrite, fileRead } from '../user_settings/loadUserSettings';

let m = fileRead();

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
    '--color-srce-green: #BFD630 ',
    '--color-srce-purple: #8D5FA8 ',
    '--text: #000000',
    '--text-dark: #000000',
    '--bg: #ffffff',
    '--border-color: #dee2e6'
];

const darkTheme = [
    '--color-srce-green: #98a264 ',
    '--color-srce-purple: #776581',
    '--text: #b3b3b3',
    '--text-dark: #262626',
    '--bg: #262626',
    '--border-color: #737373'
];

