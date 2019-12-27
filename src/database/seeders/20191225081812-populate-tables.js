'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
      return [
      await queryInterface.bulkInsert('Call_types', [{
        call_type_id: 1,
        name: 'Ćuteći'
      }, 
      {
        call_type_id: 2,
        name: 'Informativni'
      }, 
      {
        call_type_id: 3,
        name: 'Hronični'
      },
      {
        call_type_id: 4,
        name: 'Podrška'
      }
    ], {}),
      await queryInterface.bulkInsert('Contact_types', [{
        contact_type_id: 1,
        name: 'Nepoznat'
      }, 
      {
        contact_type_id: 2,
        name: 'Poznat'
      }
    ], {}),
      await queryInterface.bulkInsert('Problem_types', [{
        problem_type_id: 1,
        name: 'Gubitak'
      }, 
      {
        problem_type_id: 2,
        name: 'Usamljenost'
      }, 
      {
        problem_type_id: 3,
        name: 'Partnerski'
      },
      {
        problem_type_id: 4,
        name: 'Porodični (sa roditeljima ili članovima porodice)'
      },
      {
        problem_type_id: 5,
        name: 'Problem na radnom mestu, školi ili fakultetu'
      },
      {
        problem_type_id: 6,
        name: 'Egzistencijalni problemi (nezaposlenost, siromaštvo, nemanje perspektive, opšte nezadovoljstvo životom,...)'
      },
      {
        problem_type_id: 7,
        name: 'Bolest zavisnosti: Alkoholizam'
      },
      {
        problem_type_id: 8,
        name: 'Bolest zavisnosti: Narkomanija'
      },
      {
        problem_type_id: 9,
        name: 'Mentalni (psihički) poremećaj'
      },
      {
        problem_type_id: 10,
        name: 'Problem seksualne prirode (sex. disfunkcija, masturbacija, frigidnost, nimfomanija, promiskuitet, veličina polnog organa, fetišizam, incest, voajerizam, strah od odnosa,...)'
      },
      {
        problem_type_id: 11,
        name: 'Problem usled sex. Orijentacije (homoseksualnost, biseksualnost, transseksualnost, transvestiti)'
      },
      {
        problem_type_id: 12,
        name: 'Telesna bolest'
      },
      {
        problem_type_id: 13,
        name: 'Invaliditet'
      },
      {
        problem_type_id: 14,
        name: 'Zlostavljanje (svi vidovi zlostavljanja)'
      },
      {
        problem_type_id: 15,
        name: 'Poziv za treću osobu'
      },
      {
        problem_type_id: 16,
        name: 'Manipulativni'
      },
      {
        problem_type_id: 17,
        name: 'DRUGO (obavezno dopisati u napomeni i u vel registru koja vrsta problema!)'
      }
    ], {}),
      await queryInterface.bulkInsert('Suicide_risks', [{
        suicide_risk_id: 1,
        name: 'Nije utvrđen'
      }, 
      {
        suicide_risk_id: 2,
        name: 'Nema suicidalne misli'
      }, 
      {
        suicide_risk_id: 3,
        name: 'Ima suicidalne misli, nema plan'
      },
      {
        suicide_risk_id: 4,
        name: 'Ima plan samoubistva i ozbiljno razmišlja o tome'
      },
      {
        suicide_risk_id: 5,
        name: 'Postoji neposredan rizik da će osoba izvršiti samoubistvo'
      }
    ], {}),
      await queryInterface.bulkInsert('Suicide_factors', [{
        suicide_factor_id: 1,
        name: 'Mentalni (psihički) poremećaj'
      }, 
      {
        suicide_factor_id: 2,
        name: 'Bolest zavisnosti'
      }, 
      {
        suicide_factor_id: 3,
        name: 'Psihička kriza'
      },
      {
        suicide_factor_id: 4,
        name: 'Fizičko oboljenje'
      },
      {
        suicide_factor_id: 5,
        name: 'Trauma ili zlostavljanje'
      },
      {
        suicide_factor_id: 6,
        name: 'Raniji pokušaj suicida'
      },
      {
        suicide_factor_id: 7,
        name: 'Suicid člana porodice'
      }
    ], {}),
      await queryInterface.bulkInsert('Call_resolution_types', [{
        call_resolution_type_id: 1,
        name: 'Bolje'
      }, 
      {
        call_resolution_type_id: 2,
        name: 'Isto (nepromenjeno)'
      }, 
      {
        call_resolution_type_id: 3,
        name: 'Gore'
      },
      {
        call_resolution_type_id: 4,
        name: 'Neutvrđeno'
      }
    ], {}),
      await queryInterface.bulkInsert('Genders', [{
        gender_id: 1,
        name: 'Muški'
      }, 
      {
        gender_id: 2,
        name: 'Ženski'
      }
    ], {}),
      await queryInterface.bulkInsert('Marital_statuses', [{
        marital_status_id: 1,
        name: 'Udata/oženjen'
      }, 
      {
        marital_status_id: 2,
        name: 'Razveden/a'
      }, 
      {
        marital_status_id: 3,
        name: 'Udovac/udovica'
      },
      {
        marital_status_id: 4,
        name: 'Samac ima partnera'
      },
      {
        marital_status_id: 5,
        name: 'Samac nema partnera'
      },
      {
        marital_status_id: 6,
        name: 'Neutvrđeno'
      }
    ], {}),
      await queryInterface.bulkInsert('Number_of_calls', [{
        number_of_calls_id: 1,
        name: 'Prvi put'
      }, 
      {
        number_of_calls_id: 2,
        name: '2 i više'
      }
    ], {}),
      await queryInterface.bulkInsert('Plan_involvements', [{
        plan_involvement_id: 1,
        name: 'Plan 1'
      }, 
      {
        plan_involvement_id: 2,
        name: 'Plan 2'
      }, 
      {
        plan_involvement_id: 3,
        name: 'Plan 3'
      }
    ], {})
  ];
  },

  down: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.bulkDelete('Call_types', null, {}),
      await queryInterface.bulkDelete('Contact_types', null, {}),
      await queryInterface.bulkDelete('Problem_types', null, {}),
      await queryInterface.bulkDelete('Suicide_risks', null, {}),
      await queryInterface.bulkDelete('Suicide_factors', null, {}),
      await queryInterface.bulkDelete('Call_resolution_types', null, {}),
      await queryInterface.bulkDelete('Genders', null, {}),
      await queryInterface.bulkDelete('Marital_statuses', null, {}),
      await queryInterface.bulkDelete('Number_of_calls', null, {}),
      await queryInterface.bulkDelete('Plan_involvements', null, {})
      ];
  }
};
