const { ipcRenderer } = window.require('electron');

export function fetchInitialData(cb: (initialData: InitialData) => void) {
  ipcRenderer.send('fetch_initial_data');
  ipcRenderer.once('fetch_initial_data', (_: any, initialData: InitialData) => {
    cb(initialData);
  });
}

export function addVolunteer(
  payload: VolunteerPayload,
  cb: (volunteer: Volunteer) => void
) {
  ipcRenderer.send('add_volunteer', payload);
  ipcRenderer.once('add_volunteer', (_: any, volunteer: Volunteer) => {
    cb(volunteer);
  });
}
