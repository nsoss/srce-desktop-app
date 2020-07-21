import React, { useState } from 'react';

export type Location = 'admin' | 'calendar' | 'call' | 'settings' | 'stats';

interface NavigationState {
  location: Location;
  navigate: (location: Location) => void;
}

const initialState: NavigationState = {
  location: 'admin',
  navigate: () => {},
};

const NavigationContext = React.createContext(initialState);

export const NavigationProvider: React.FunctionComponent = ({ children }) => {
  const [location, setLocation] = useState<Location>('calendar');

  return (
    <NavigationContext.Provider
      value={{
        location,
        navigate: setLocation,
      }}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationContext;
