const problemTypes = {
  LOSS: 'Gubitak',
  LONELINESS: 'Usamljenost',
  PARTNER: 'Partnerski',
  FAMILY: 'Porodični (sa roditeljima ili članovima porodice)',
  SCHOOL_OR_WORK: 'Problem na radnom mestu, školi ili fakultetu',
  EXISTENTIAL:
    'Egzistencijalni problemi (nezaposlenost, siromaštvo, nemanje perspektive, opšte nezadovoljstvo životom,...)',
  ADDICTION_ALCOHOLISM: 'Bolest zavisnosti: Alkoholizam',
  ADDICTION_NARCOMANIA: 'Bolest zavisnosti: Narkomanija',
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

export default problemTypes;
