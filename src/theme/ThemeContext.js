import React, { useLayoutEffect, useState } from 'react';
// import { fileWrite, fileRead } from '../user_settings/loadUserSettings';

// let m = fileRead();

const ThemeContext = React.createContext({
    dark: false,
    toggle: () => {},
});

export default ThemeContext;

export function ThemeProvider(props) {
    // const [dark, setDark] = useState(m.dark_theme);
    const [dark, setDark] = useState(false);

    useLayoutEffect(() => {
        const lastTheme = dark;

        if (lastTheme === true) {
            applyTheme(darkTheme);
        }

        if (lastTheme === false) {
            applyTheme(lightTheme);
        }
    }, [dark]);

    const applyTheme = theme => {
        const root = document.getElementsByTagName('html')[0];
        root.style.cssText = theme.join(';');
    };

    const toggle = () => {
        // m.dark_theme = !dark;
        setDark(!dark);
        // fileWrite(m);
        const body = document.getElementsByTagName('body')[0];
        body.style.cssText = 'transition: background .5s ease';
    };

    return (
        <ThemeContext.Provider
            value={{
                dark,
                toggle,
            }}
        >
            {props.children}
        </ThemeContext.Provider>
    );
}

const lightTheme = [
    '--text: #000000',
    '--color-nav: #8D63A6',
    '--color-nav-selected: #5B2F76 ',
    '--color-bg: #E5E5E5 ',
    '--text-white: #ffffff',
    '--text-black: #000000',
    '--btn-bg: #98C23D',
    '--btn-selected: #4F9D3F',
    '--calendar-selected: #8D63A6',
    '--form-input-border: #CCCCCC',
    '--form-input-bg:  #F7F7F7',
    '--form-input-hover:  #e6e6e6',
    '--single-call-panels-border: #8D63A6',
    '--single-call-panels-bg: #ffffff',
    '--admin-accent: #C4C4C4',
];

const darkTheme = [
    '--text: #E5E5E5',
    '--color-nav: #8D63A6',
    '--color-nav-selected: #5B2F76 ',
    '--color-bg: #4d4d4d ',
    '--text-white: #ffffff',
    '--text-black: #000000',
    '--btn-bg: #666666',
    '--btn-selected: #404040',
    '--calendar-selected: #8D63A6',
    '--form-input-border: #0d0d0d',
    '--form-input-bg: #595959',
    '--form-input-hover:  #404040',
    '--single-call-panels-border: #0d0d0d',
    '--single-call-panels-bg: #666666',
    '--admin-accent: #737373',
];
