import { ipcMain } from 'electron';
import CallOrdinalityEntity from './entities/CallOrdinalityEntity';
import CallTypeEntity from './entities/CallTypeEntity';
import EnumEntity from './entities/EnumEntity';
import GenderEntity from './entities/GenderEntity';
import MaritalStatusEntity from './entities/MaritalStatusEntity';
import PostCallStateEntity from './entities/PostCallStateEntity';
import ProblemTypeEntity from './entities/ProblemTypeEntity';
import SuicideFactorEntity from './entities/SuicideFactorEntity';
import SuicideRiskEntity from './entities/SuicideRiskEntity';
import VolunteerEntity from './entities/VolunteerEntity';

function volunteerEntityToVolunteer(
  volunteerEntity: VolunteerEntity
): Volunteer {
  return {
    id: volunteerEntity.id,
    name: volunteerEntity.name,
    createdAt: volunteerEntity.createdAt,
  };
}

function enumEntityToEnumOf<TEnum>(
  enumEntity: EnumEntity<TEnum>
): EnumOf<TEnum> {
  return {
    id: enumEntity.id,
    value: enumEntity.value,
  };
}

async function fetchInitialData(): Promise<InitialData> {
  const [
    volunteers,
    callTypes,
    genders,
    maritalStatuses,
    callOrdinalities,
    problemTypes,
    suicideRisks,
    suicideFactors,
    postCallStates,
  ] = await Promise.all([
    (await VolunteerEntity.find()).map(volunteerEntityToVolunteer),
    (await CallTypeEntity.find()).map(enumEntityToEnumOf),
    (await GenderEntity.find()).map(enumEntityToEnumOf),
    (await MaritalStatusEntity.find()).map(enumEntityToEnumOf),
    (await CallOrdinalityEntity.find()).map(enumEntityToEnumOf),
    (await ProblemTypeEntity.find()).map(enumEntityToEnumOf),
    (await SuicideRiskEntity.find()).map(enumEntityToEnumOf),
    (await SuicideFactorEntity.find()).map(enumEntityToEnumOf),
    (await PostCallStateEntity.find()).map(enumEntityToEnumOf),
  ]);

  return {
    volunteers,
    callTypes,
    genders,
    maritalStatuses,
    callOrdinalities,
    problemTypes,
    suicideRisks,
    suicideFactors,
    postCallStates,
  };
}

export function registerHandlers() {
  ipcMain.on('fetch_initial_data', async function (event) {
    const initialData = await fetchInitialData();
    event.sender.send('fetch_initial_data', initialData);
  });
}
