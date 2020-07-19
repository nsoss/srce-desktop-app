const suicideRisks = {
  UNDETERMINED: 'Nije utvrđen',
  NONE: 'Nema suicidalne misli',
  THOUGHT: 'Ima suicidalne misli, nema plan',
  PLAN: 'Ima plan samoubistva i ozbiljno razmišlja o tome',
  IMMEDIATE: 'Postoji neposredan rizik da će osoba izvršiti samoubistvo',
} as const;

export default suicideRisks;
