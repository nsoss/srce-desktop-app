'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
      return [
      await queryInterface.bulkInsert('Call_types', [{
        id: 1,
        name: 'Ćuteći'
      }, 
      {
        id: 2,
        name: 'Informativni'
      }, 
      {
        id: 3,
        name: 'Hronični'
      },
      {
        id: 4,
        name: 'Podrška'
      }
    ], {}),
      await queryInterface.bulkInsert('Contact_types', [{
        id: 1,
        name: 'Nepoznat'
      }, 
      {
        id: 2,
        name: 'Poznat'
      }
    ], {}),
      await queryInterface.bulkInsert('Problem_types', [{
        id: 1,
        name: 'Gubitak'
      }, 
      {
        id: 2,
        name: 'Usamljenost'
      }, 
      {
        id: 3,
        name: 'Partnerski'
      },
      {
        id: 4,
        name: 'Porodični (sa roditeljima ili članovima porodice)'
      },
      {
        id: 5,
        name: 'Problem na radnom mestu, školi ili fakultetu'
      },
      {
        id: 6,
        name: 'Egzistencijalni problemi (nezaposlenost, siromaštvo, nemanje perspektive, opšte nezadovoljstvo životom,...)'
      },
      {
        id: 7,
        name: 'Bolest zavisnosti: Alkoholizam'
      },
      {
        id: 8,
        name: 'Bolest zavisnosti: Narkomanija'
      },
      {
        id: 9,
        name: 'Mentalni (psihički) poremećaj'
      },
      {
        id: 10,
        name: 'Problem seksualne prirode (sex. disfunkcija, masturbacija, frigidnost, nimfomanija, promiskuitet, veličina polnog organa, fetišizam, incest, voajerizam, strah od odnosa,...)'
      },
      {
        id: 11,
        name: 'Problem usled sex. Orijentacije (homoseksualnost, biseksualnost, transseksualnost, transvestiti)'
      },
      {
        id: 12,
        name: 'Telesna bolest'
      },
      {
        id: 13,
        name: 'Invaliditet'
      },
      {
        id: 14,
        name: 'Zlostavljanje (svi vidovi zlostavljanja)'
      },
      {
        id: 15,
        name: 'Poziv za treću osobu'
      },
      {
        id: 16,
        name: 'Manipulativni'
      },
      {
        id: 17,
        name: 'DRUGO (obavezno dopisati u napomeni i u vel registru koja vrsta problema!)'
      }
    ], {}),
      await queryInterface.bulkInsert('Suicide_risks', [{
        id: 1,
        name: 'Nije utvrđen'
      }, 
      {
        id: 2,
        name: 'Nema suicidalne misli'
      }, 
      {
        id: 3,
        name: 'Ima suicidalne misli, nema plan'
      },
      {
        id: 4,
        name: 'Ima plan samoubistva i ozbiljno razmišlja o tome'
      },
      {
        id: 5,
        name: 'Postoji neposredan rizik da će osoba izvršiti samoubistvo'
      }
    ], {}),
      await queryInterface.bulkInsert('Suicide_factors', [{
        id: 1,
        name: 'Mentalni (psihički) poremećaj'
      }, 
      {
        id: 2,
        name: 'Bolest zavisnosti'
      }, 
      {
        id: 3,
        name: 'Psihička kriza'
      },
      {
        id: 4,
        name: 'Fizičko oboljenje'
      },
      {
        id: 5,
        name: 'Trauma ili zlostavljanje'
      },
      {
        id: 6,
        name: 'Raniji pokušaj suicida'
      },
      {
        id: 7,
        name: 'Suicid člana porodice'
      }
    ], {}),
      await queryInterface.bulkInsert('Call_resolution_types', [{
        id: 1,
        name: 'Bolje'
      }, 
      {
        id: 2,
        name: 'Isto (nepromenjeno)'
      }, 
      {
        id: 3,
        name: 'Gore'
      },
      {
        id: 4,
        name: 'Neutvrđeno'
      }
    ], {}),
      await queryInterface.bulkInsert('Genders', [{
        id: 1,
        name: 'Muški'
      }, 
      {
        id: 2,
        name: 'Ženski'
      }
    ], {}),
      await queryInterface.bulkInsert('Marital_statuses', [{
        id: 1,
        name: 'Udata/oženjen'
      }, 
      {
        id: 2,
        name: 'Razveden/a'
      }, 
      {
        id: 3,
        name: 'Udovac/udovica'
      },
      {
        id: 4,
        name: 'Samac ima partnera'
      },
      {
        id: 5,
        name: 'Samac nema partnera'
      },
      {
        id: 6,
        name: 'Neutvrđeno'
      }
    ], {}),
      await queryInterface.bulkInsert('Number_of_calls', [{
        id: 1,
        name: 'Prvi put'
      }, 
      {
        id: 2,
        name: '2 i više'
      }
    ], {}),
      await queryInterface.bulkInsert('Plan_involvements', [{
        id: 1,
        name: 'Plan 1'
      }, 
      {
        id: 2,
        name: 'Plan 2'
      }, 
      {
        id: 3,
        name: 'Plan 3'
      }
    ], {}),
    await queryInterface.bulkInsert('Ages', [{
      id: 1,
      name: 'Godina 1'
    }, 
    {
      id: 2,
      name: 'Godina 2'
    }, 
    {
      id: 3,
      name: 'Godina 3'
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
      await queryInterface.bulkDelete('Plan_involvements', null, {}),
      await queryInterface.bulkDelete('Ages', null, {})
      ];
  }
};
