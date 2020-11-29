export const callOrdinalities: Record<CallOrdinality, string> = {
  FIRST: 'Prvi put',
  SUBSEQUENT: '2 i više',
} as const;

export const callTypes: Record<CallType, string> = {
  SILENT: 'Ćuteći',
  INFORMATIONAL: 'Informativni',
  CHRONIC: 'Hronični',
  SUPPORT: 'Podrška',
} as const;

export const genders: Record<Gender, string> = {
  MALE: 'Muški',
  FEMALE: 'Ženski',
} as const;

export const maritalStatuses: Record<MaritalStatus, string> = {
  SINGLE: 'Samac nema partnera',
  MARRIED: 'Udata/oženjen',
  DIVORCED: 'Razveden/a',
  WIDOWED: 'Udovac/udovica',
  COHABITATED: 'Samac ima partnera',
} as const;

export const postCallStates: Record<PostCallState, string> = {
  UNDETERMINED: 'Neutvrđeno',
  UNCHANGED: 'Isto (nepromenjeno)',
  BETTER: 'Bolje',
  WORSE: 'Gore',
} as const;

export const problemTypes: Record<ProblemType, string> = {
  LOSS: 'Gubitak',
  LONELINESS: 'Usamljenost',
  PARTNER: 'Partnerski',
  FAMILY: 'Porodični (sa roditeljima ili članovima porodice)',
  SCHOOL_OR_WORK: 'Problem na radnom mestu, školi ili fakultetu',
  EXISTENTIAL:
    'Egzistencijalni problemi (nezaposlenost, siromaštvo, nemanje perspektive, opšte nezadovoljstvo životom,...)',
  ALCOHOL_ADDICTION: 'Bolest zavisnosti: Alkoholizam',
  DRUG_ADDICTION: 'Bolest zavisnosti: Narkomanija',
  MENTAL_DISORDER: 'Mentalni (psihički) poremećaj',
  SEXUAL_DISORDER:
    'Problem seksualne prirode (sex. disfunkcija, masturbacija, frigidnost, nimfomanija, promiskuitet, veličina polnog organa, fetišizam, incest, voajerizam, strah od odnosa,...)',
  SEXUAL_ORIENTATION_ISSUE:
    'Problem usled sex. Orijentacije (homoseksualnost, biseksualnost, transseksualnost, transvestiti)',
  PHYSICAL_ILLNESS: 'Telesna bolest',
  DISABILITY: 'Invaliditet',
  ABUSE: 'Zlostavljanje (svi vidovi zlostavljanja)',
  CALL_FOR_A_THIRD_PARTY: 'Poziv za treću osobu',
  MANIPULATIVE: 'Manipulativni',
  OTHER:
    'DRUGO (obavezno dopisati u napomeni i u vel registru koja vrsta problema!)',
} as const;

export const suicideFactors: Record<SuicideFactor, string> = {
  MENTAL_DISORDER: 'Mentalni (psihički) poremećaj',
  ADDICTION: 'Bolest zavisnosti',
  CRISIS: 'Psihička kriza',
  PHYSICAL_ILLNESS: 'Fizičko oboljenje',
  TRAUMA_OR_ABUSE: 'Trauma ili zlostavljanje',
  EARLIER_ATTEMPTS: 'Raniji pokušaj suicida',
  SUICIDE_OF_FAMILY_MEMBER: 'Suicid člana porodice',
} as const;

export const suicideRisks: Record<SuicideRisk, string> = {
  UNDETERMINED: 'Nije utvrđen',
  NONE: 'Nema suicidalne misli',
  THOUGHT: 'Ima suicidalne misli, nema plan',
  PLAN: 'Ima plan samoubistva i ozbiljno razmišlja o tome',
  IMMEDIATE: 'Postoji neposredan rizik da će osoba izvršiti samoubistvo',
} as const;
