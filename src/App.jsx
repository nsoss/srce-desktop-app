import React, { useEffect } from 'react';
import Routes from './components/Routes';

export default function App() {
  useEffect(() => {
    window.localStorage.setItem('route', '/');
  }, []);

  return <Routes />;
}
