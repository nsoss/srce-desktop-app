import { ipcMain } from 'electron';
import CallFieldModel from './models/CallField';
import CallOrdinality from './models/CallOrdinality';
import CallType from './models/CallType';
import Gender from './models/Gender';
import MaritalStatus from './models/MaritalStatus';
import PostCallState from './models/PostCallState';
import ProblemType from './models/ProblemType';
import SuicideFactor from './models/SuicideFactor';
import SuicideRisk from './models/SuicideRisk';

function callFieldModelToCallField(callFieldModel: CallFieldModel): CallField {
  return {
    id: callFieldModel.id.toString(),
    value: callFieldModel.value,
  };
}

async function getInitialData(): Promise<InitialData> {
  const [
    callOrdinalities,
    callTypes,
    genders,
    maritalStatuses,
    postCallStates,
    problemTypes,
    suicideFactors,
    suicideRisks,
  ] = await Promise.all([
    CallOrdinality.find(),
    CallType.find(),
    Gender.find(),
    MaritalStatus.find(),
    PostCallState.find(),
    ProblemType.find(),
    SuicideFactor.find(),
    SuicideRisk.find(),
  ]);

  return {
    callOrdinalities: callOrdinalities.map(callFieldModelToCallField),
    callTypes: callTypes.map(callFieldModelToCallField),
    genders: genders.map(callFieldModelToCallField),
    maritalStatuses: maritalStatuses.map(callFieldModelToCallField),
    postCallStates: postCallStates.map(callFieldModelToCallField),
    problemTypes: problemTypes.map(callFieldModelToCallField),
    suicideFactors: suicideFactors.map(callFieldModelToCallField),
    suicideRisks: suicideRisks.map(callFieldModelToCallField),
  };
}

function registerListener<TArgs, TResult>(
  channel: IpcChannel,
  handler: (args: TArgs) => Promise<TResult>
) {
  ipcMain.on(channel, async (event, args: TArgs) => {
    event.sender.send(channel, await handler(args));
  });
}

export default function registerIpcListeners() {
  registerListener('get_initial_data', getInitialData);
}
