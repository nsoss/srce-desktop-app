const { ipcRenderer } = window.require('electron');

export function fetchInitialData(cb: (initialData: InitialData) => void) {
  ipcRenderer.send('fetch_initial_data');
  ipcRenderer.once('fetch_initial_data', (_: any, initialData: InitialData) => {
    cb(initialData);
  });
}
