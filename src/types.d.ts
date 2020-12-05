interface Entry {
  id: number;
  handledBy: Volunteer;
  call: Call;
  caller: Caller;
  description?: string;
  assessment: Assessment;
  note?: string;
}

interface Volunteer {
  id: number;
  name: string;
  createdAt: Date;
}

type VolunteerPayload = Omit<Volunteer, 'id' | 'createdAt'>;

interface Call {
  type: CallType;
  contactType?: ContactType;
  date: Date;
  time: boolean;
  duration?: number;
}

type CallType = 'SILENT' | 'INFORMATIONAL' | 'CHRONIC' | 'SUPPORT';

type ContactType = unknown;

interface Caller {
  name?: string;
  gender?: Gender;
  age?: Age;
  maritalStatus?: MaritalStatus;
  callOrdinality?: CallOrdinality;
  plan?: Plan;
}

type Gender = 'MALE' | 'FEMALE';

type Age = unknown;

type MaritalStatus =
  | 'SINGLE'
  | 'MARRIED'
  | 'DIVORCED'
  | 'WIDOWED'
  | 'COHABITATED';

type CallOrdinality = 'FIRST' | 'SUBSEQUENT';

type Plan = unknown;

interface Assessment {
  problemType: ProblemType;
  suicideRisk: SuicideRisk;
  suicideFactor: SuicideFactor;
  postCallState: PostCallState;
}

type ProblemType =
  | 'LOSS'
  | 'LONELINESS'
  | 'PARTNER'
  | 'FAMILY'
  | 'SCHOOL_OR_WORK'
  | 'EXISTENTIAL'
  | 'ALCOHOL_ADDICTION'
  | 'DRUG_ADDICTION'
  | 'MENTAL_DISORDER'
  | 'SEXUAL_DISORDER'
  | 'SEXUAL_ORIENTATION_ISSUE'
  | 'PHYSICAL_ILLNESS'
  | 'DISABILITY'
  | 'ABUSE'
  | 'CALL_FOR_A_THIRD_PARTY'
  | 'MANIPULATIVE'
  | 'OTHER';

type SuicideRisk = 'UNDETERMINED' | 'NONE' | 'THOUGHT' | 'PLAN' | 'IMMEDIATE';

type SuicideFactor =
  | 'MENTAL_DISORDER'
  | 'ADDICTION'
  | 'CRISIS'
  | 'PHYSICAL_ILLNESS'
  | 'TRAUMA_OR_ABUSE'
  | 'EARLIER_ATTEMPTS'
  | 'SUICIDE_OF_FAMILY_MEMBER';

type PostCallState = 'UNDETERMINED' | 'UNCHANGED' | 'BETTER' | 'WORSE';

type EnumOf<T> = {
  id: number;
  value: T;
};

interface InitialData {
  volunteers: Array<Volunteer>;
  callTypes: Array<EnumOf<CallType>>;
  genders: Array<EnumOf<Gender>>;
  maritalStatuses: Array<EnumOf<MaritalStatus>>;
  callOrdinalities: Array<EnumOf<CallOrdinality>>;
  problemTypes: Array<EnumOf<ProblemType>>;
  suicideRisks: Array<EnumOf<SuicideRisk>>;
  suicideFactors: Array<EnumOf<SuicideFactor>>;
  postCallStates: Array<EnumOf<PostCallState>>;
}
