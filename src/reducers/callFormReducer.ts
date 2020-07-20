import callOrdinalities from '../enums/callOrdinalities';
import callTypes from '../enums/callTypes';
import genders from '../enums/genders';
import maritalStatuses from '../enums/maritalStatuses';
import postCallStates from '../enums/postCallStates';
import problemTypes from '../enums/problemTypes';
import suicideFactors from '../enums/suicideFactors';
import suicideRisks from '../enums/suicideRisks';
import { AppAction, AppState } from '../store';

interface FormState {
  dropdowns: {
    [key: string]: DropdownData;
  };
}

function createFakeDropdownData(label: string): DropdownData {
  const items: Array<DropdownItem> = [];
  for (let i = 1; i <= 3; ++i) {
    items.push({
      id: i.toString(),
      label: label + ' ' + i,
    });
  }
  return { items };
}

const initialState: FormState = {
  dropdowns: {
    ages: createFakeDropdownData('Starost'),
    contactTypes: createFakeDropdownData('Vrsta kontakta'),
    days: createFakeDropdownData('Dan'),
    planInvolvements: createFakeDropdownData('Uključenost u plan'),
  },
};

function callFieldsToDropdownData(
  callFields: Array<CallField>,
  translation: any
): DropdownData {
  return {
    items: callFields.map((callField) => ({
      id: callField.id,
      label: translation[callField.value],
    })),
  };
}

export default function callFormReducer(
  state: FormState = initialState,
  action: AppAction
): FormState {
  switch (action.type) {
    case 'INITIAL_DATA_RECEIVED': {
      return {
        ...state,
        dropdowns: {
          ...state.dropdowns,
          callOrdinalities: callFieldsToDropdownData(
            action.initialData.callOrdinalities,
            callOrdinalities
          ),
          callTypes: callFieldsToDropdownData(
            action.initialData.callTypes,
            callTypes
          ),
          genders: callFieldsToDropdownData(
            action.initialData.genders,
            genders
          ),
          maritalStatuses: callFieldsToDropdownData(
            action.initialData.maritalStatuses,
            maritalStatuses
          ),
          postCallStates: callFieldsToDropdownData(
            action.initialData.postCallStates,
            postCallStates
          ),
          problemTypes: callFieldsToDropdownData(
            action.initialData.problemTypes,
            problemTypes
          ),
          suicideFactors: callFieldsToDropdownData(
            action.initialData.suicideFactors,
            suicideFactors
          ),
          suicideRisks: callFieldsToDropdownData(
            action.initialData.suicideRisks,
            suicideRisks
          ),
        },
      };
    }
    case 'DROPDOWN_ITEM_SELECTED': {
      return {
        ...state,
        dropdowns: {
          ...state.dropdowns,
          [action.key]: {
            ...state.dropdowns[action.key],
            selectedId: action.id,
          },
        },
      };
    }
    default:
      return state;
  }
}

export const getDropdown = (state: AppState) => (key: string): DropdownData =>
  state.callForm.dropdowns[key];
