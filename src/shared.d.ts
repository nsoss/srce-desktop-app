interface CallField {
  id: string;
  value: string;
}

interface InitialData {
  callOrdinalities: Array<CallField>;
  callTypes: Array<CallField>;
  genders: Array<CallField>;
  maritalStatuses: Array<CallField>;
  postCallStates: Array<CallField>;
  problemTypes: Array<CallField>;
  suicideFactors: Array<CallField>;
  suicideRisks: Array<CallField>;
}

type IpcChannel = 'get_initial_data';
