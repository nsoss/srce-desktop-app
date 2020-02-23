import React, { useEffect, useState } from 'react';
import Routes from './components/Routes';

export default function App({ updateAvailable, updateDownloaded, update }) {
    useEffect(() => {
        window.localStorage.setItem('route', '/');
    }, []);

    return (
        <React.Fragment>
            {updateAvailable && (
                <UpdateNotification
                    downloaded={updateDownloaded}
                    onClick={update}
                />
            )}
            <Routes />
        </React.Fragment>
    );
}

const UpdateNotification = ({ downloaded, onClick }) => {
    const [hovering, setHovering] = useState(false);

    return (
        <div
            style={{
                backgroundColor: '#cc7f65',
                bottom: '0',
                color: hovering ? '#66b3cc' : '#ffffff',
                fontWeight: 'bold',
                padding: '2em 4em',
                position: 'fixed',
                right: '0',
                textDecoration: 'underline',
            }}
            onClick={onClick}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            {downloaded
                ? 'Nova verzija preuzeta. Restart?'
                : 'Nova verzija je dostupna i upravo se preuzima'}
        </div>
    );
};
