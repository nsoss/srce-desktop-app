interface InitialData {
  callOrdinalities: CallField[];
  callTypes: CallField[];
  genders: CallField[];
  maritalStatuses: CallField[];
  postCallStates: CallField[];
  problemTypes: CallField[];
  suicideFactors: CallField[];
  suicideRisks: CallField[];
  volunteers: Volunteer[];
}

interface CallField {
  id: string;
  value: string;
}

interface Volunteer {
  id: string;
  name: string;
  joinedOn: Date;
}

type IpcChannel = 'get_initial_data';
