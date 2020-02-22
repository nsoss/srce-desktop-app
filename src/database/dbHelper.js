const { app } = require('electron');
const databasePath = app.getAppPath() + '/srce.db';

const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const DBHelper = require('./dbHelper');
const Sequelize = require('sequelize');

const VolunteerModel = require('./models/volunteer');
const CallModel = require('./models/call');
const ContactTypeModel = require('./models/contact_type');
const CallTypeModel = require('./models/call_type');
const ProblemTypeModel = require('./models/problem_type');
const SuicideRiskModel = require('./models/suicide_risk');
const SuicideFactorModel = require('./models/suicide_factor');
const CallResolutionTypeModel = require('./models/call_resolution_type');
const GenderModel = require('./models/gender');
const MaritalStatusModel = require('./models/marital_status');
const NumberOfCallsModel = require('./models/number_of_calls');
const PlanInvolvementModel = require('./models/plan_involvement');
const AgeModel = require('./models/age');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: databasePath,
});

const testConnection = async () => {
    await sequelize.authenticate();
    await sequelize.sync();

    const existingCallTypes = await call_type.findAll();
    if (!existingCallTypes.length) {
        await call_type.bulkCreate([
            { id: 1, name: 'Ćuteći' },
            { id: 2, name: 'Informativni' },
            { id: 3, name: 'Hronični' },
            { id: 4, name: 'Podrška' },
        ]);
    }

    const existingContactTypes = await contact_type.findAll();
    if (!existingContactTypes.length) {
        await contact_type.bulkCreate([
            { id: 1, name: 'Nepoznat' },
            { id: 2, name: 'Poznat' },
        ]);
    }

    const existingProblemTypes = await problem_type.findAll();
    if (!existingProblemTypes.length) {
        await problem_type.bulkCreate([
            { id: 1, name: 'Gubitak' },
            { id: 2, name: 'Usamljenost' },
            { id: 3, name: 'Partnerski' },
            {
                id: 4,
                name: 'Porodični (sa roditeljima ili članovima porodice)',
            },
            { id: 5, name: 'Problem na radnom mestu, školi ili fakultetu' },
            {
                id: 6,
                name:
                    'Egzistencijalni problemi (nezaposlenost, siromaštvo, nemanje perspektive, opšte nezadovoljstvo životom,...)',
            },
            { id: 7, name: 'Bolest zavisnosti: Alkoholizam' },
            { id: 8, name: 'Bolest zavisnosti: Narkomanija' },
            { id: 9, name: 'Mentalni (psihički) poremećaj' },
            {
                id: 10,
                name:
                    'Problem seksualne prirode (sex. disfunkcija, masturbacija, frigidnost, nimfomanija, promiskuitet, veličina polnog organa, fetišizam, incest, voajerizam, strah od odnosa,...)',
            },
            {
                id: 11,
                name:
                    'Problem usled sex. Orijentacije (homoseksualnost, biseksualnost, transseksualnost, transvestiti)',
            },
            { id: 12, name: 'Telesna bolest' },
            { id: 13, name: 'Invaliditet' },
            { id: 14, name: 'Zlostavljanje (svi vidovi zlostavljanja)' },
            { id: 15, name: 'Poziv za treću osobu' },
            { id: 16, name: 'Manipulativni' },
            {
                id: 17,
                name:
                    'DRUGO (obavezno dopisati u napomeni i u vel registru koja vrsta problema!)',
            },
        ]);
    }

    const existingSuicideRisks = await suicide_risk.findAll();
    if (!existingSuicideRisks.length) {
        await suicide_risk.bulkCreate([
            { id: 1, name: 'Nije utvrđen' },
            { id: 2, name: 'Nema suicidalne misli' },
            { id: 3, name: 'Ima suicidalne misli, nema plan' },
            { id: 4, name: 'Ima plan samoubistva i ozbiljno razmišlja o tome' },
            {
                id: 5,
                name:
                    'Postoji neposredan rizik da će osoba izvršiti samoubistvo',
            },
        ]);
    }

    const existingSuicideFactors = await suicide_factor.findAll();
    if (!existingSuicideFactors.length) {
        await suicide_factor.bulkCreate([
            { id: 1, name: 'Mentalni (psihički) poremećaj' },
            { id: 2, name: 'Bolest zavisnosti' },
            { id: 3, name: 'Psihička kriza' },
            { id: 4, name: 'Fizičko oboljenje' },
            { id: 5, name: 'Trauma ili zlostavljanje' },
            { id: 6, name: 'Raniji pokušaj suicida' },
            { id: 7, name: 'Suicid člana porodice' },
        ]);
    }

    const existingCallResolutionTypes = await call_resolution_type.findAll();
    if (!existingCallResolutionTypes.length) {
        await call_resolution_type.bulkCreate([
            { id: 1, name: 'Bolje' },
            { id: 2, name: 'Isto (nepromenjeno)' },
            { id: 3, name: 'Gore' },
            { id: 4, name: 'Neutvrđeno' },
        ]);
    }

    const existingGenders = await gender.findAll();
    if (!existingGenders.length) {
        await gender.bulkCreate([
            { id: 1, name: 'Muški' },
            { id: 2, name: 'Ženski' },
        ]);
    }

    const existingMaritalStatuses = await marital_status.findAll();
    if (!existingMaritalStatuses.length) {
        await marital_status.bulkCreate([
            { id: 1, name: 'Udata/oženjen' },
            { id: 2, name: 'Razveden/a' },
            { id: 3, name: 'Udovac/udovica' },
            { id: 4, name: 'Samac ima partnera' },
            { id: 5, name: 'Samac nema partnera' },
            { id: 6, name: 'Neutvrđeno' },
        ]);
    }

    const existingNumbersOfCalls = await number_of_calls.findAll();
    if (!existingNumbersOfCalls.length) {
        await number_of_calls.bulkCreate([
            { id: 1, name: 'Prvi put' },
            { id: 2, name: '2 i više' },
        ]);
    }

    const existingPlanInvolvements = await plan_involvement.findAll();
    if (!existingPlanInvolvements.length) {
        await plan_involvement.bulkCreate([
            { id: 1, name: 'Plan 1' },
            { id: 2, name: 'Plan 2' },
            { id: 3, name: 'Plan 3' },
        ]);
    }

    const existingAges = await age.findAll();
    if (!existingAges.length) {
        await age.bulkCreate([
            { id: 1, name: 'Godina 1' },
            { id: 2, name: 'Godina 2' },
            { id: 3, name: 'Godina 3' },
        ]);
    }
};

exports.checkIfDatabaseExists = () => {
    fs.access(databasePath, fs.F_OK, e => {
        if (e) {
            createDatabase();
        } else {
            console.log('Already created db srce.');
            testConnection();
        }
    });
};

function createDatabase() {
    // eslint-disable-next-line no-unused-vars
    const db = new sqlite3.Database(databasePath, e => {
        if (e) {
            console.error(e.message);
        } else {
            console.log('Created new db!');
        }
    });
}

const volunteer = VolunteerModel(sequelize, Sequelize);
const call = CallModel(sequelize, Sequelize);
const contact_type = ContactTypeModel(sequelize, Sequelize);
const call_type = CallTypeModel(sequelize, Sequelize);
const problem_type = ProblemTypeModel(sequelize, Sequelize);
const suicide_risk = SuicideRiskModel(sequelize, Sequelize);
const suicide_factor = SuicideFactorModel(sequelize, Sequelize);
const call_resolution_type = CallResolutionTypeModel(sequelize, Sequelize);
const gender = GenderModel(sequelize, Sequelize);
const marital_status = MaritalStatusModel(sequelize, Sequelize);
const number_of_calls = NumberOfCallsModel(sequelize, Sequelize);
const plan_involvement = PlanInvolvementModel(sequelize, Sequelize);
const age = AgeModel(sequelize, Sequelize);

sequelize.sync();

exports.getVolunteers = () => {
    const rows = volunteer
        .findAll({
            attributes: ['id', 'first_name', 'last_name', 'created_at'],
            raw: true,
        })
        .then(volunteers => {
            return volunteers;
        });
    return rows;
};

exports.deleteVolunteer = id => {
    const isDeleted = volunteer
        .destroy({
            where: { id: id },
        })
        .then(console.log('Deleted volunteer with id: ' + id));
    return isDeleted;
};

exports.insertVolunteer = v => {
    const insertedID = volunteer.create(v).then(row => {
        return row.dataValues.id;
    });
    return insertedID;
};

exports.getCalls = () => {
    const rows = call
        .findAll({
            attributes: ['id', 'created_at', 'volunteer_id'],
            raw: true,
        })
        .then(calls => {
            return calls;
        });
    return rows;
};

exports.deleteCall = id => {
    const isDeleted = call
        .destroy({
            where: { id: id },
        })
        .then(console.log('Deleted call with id: ' + id));
    return isDeleted;
};

exports.insertCall = c => {
    const insertedCall = call.create(c).then(row => {
        return row.dataValues.id;
    });
    return insertedCall;
};

exports.getContactTypes = () => {
    const rows = contact_type
        .findAll({
            attributes: ['id', 'name'],
            raw: true,
        })
        .then(contact_types => {
            return contact_types;
        });
    return rows;
};

exports.getCallTypes = () => {
    const rows = call_type
        .findAll({
            attributes: ['id', 'name'],
            raw: true,
        })
        .then(call_types => {
            return call_types;
        });
    return rows;
};

exports.getProblemTypes = () => {
    const rows = problem_type
        .findAll({
            attributes: ['id', 'name'],
            raw: true,
        })
        .then(problem_types => {
            return problem_types;
        });
    return rows;
};

exports.getGenders = () => {
    const rows = gender
        .findAll({
            attributes: ['id', 'name'],
            raw: true,
        })
        .then(genders => {
            return genders;
        });
    return rows;
};

exports.getAges = () => {
    const rows = age
        .findAll({
            attributes: ['id', 'name'],
            raw: true,
        })
        .then(ages => {
            return ages;
        });
    return rows;
};

exports.getCallResolutionTypes = () => {
    const rows = call_resolution_type
        .findAll({
            attributes: ['id', 'name'],
            raw: true,
        })
        .then(call_resolution_types => {
            return call_resolution_types;
        });
    return rows;
};

exports.getNumberOfCalls = () => {
    const rows = number_of_calls
        .findAll({
            attributes: ['id', 'name'],
            raw: true,
        })
        .then(numbers_of_calls => {
            return numbers_of_calls;
        });
    return rows;
};

exports.getMaritalStatuses = () => {
    const rows = marital_status
        .findAll({
            attributes: ['id', 'name'],
            raw: true,
        })
        .then(marital_statuses => {
            return marital_statuses;
        });
    return rows;
};

exports.getPlanInvolvements = () => {
    const rows = plan_involvement
        .findAll({
            attributes: ['id', 'name'],
            raw: true,
        })
        .then(plan_involvements => {
            return plan_involvements;
        });
    return rows;
};

exports.getSuicideRisks = () => {
    const rows = suicide_risk
        .findAll({
            attributes: ['id', 'name'],
            raw: true,
        })
        .then(suicide_risks => {
            return suicide_risks;
        });
    return rows;
};

exports.getSuicideFactors = () => {
    const rows = suicide_factor
        .findAll({
            attributes: ['id', 'name'],
            raw: true,
        })
        .then(suicide_factors => {
            return suicide_factors;
        });
    return rows;
};

function handleRejection(p) {
    return p.catch(err => ({ error: err }));
}

exports.foo = arr => {
    return Promise.all(
        [
            this.getSuicideRisks(),
            this.getSuicideFactors(),
            this.getCallTypes(),
            this.getContactTypes(),
            this.getCallResolutionTypes(),
            this.getGenders(),
            this.getNumberOfCalls(),
            this.getMaritalStatuses(),
            this.getPlanInvolvements(),
            this.getProblemTypes(),
            this.getVolunteers(),
            this.getAges(),
        ].map(handleRejection)
    );
};

exports.getFormData = () => {
    (suicide_risks = []),
        (suicide_factors = []),
        (call_types = []),
        (contact_types = []),
        (call_resolution_types = []),
        (genders = []),
        (numbers_of_calls = []),
        (marital_statuses = []),
        (plan_involvements = []),
        (problem_types = []),
        (volunteers = []),
        (ages = []);
    const rows = this.foo().then(results => {
        return [
            suicide_risks.concat(results[0]),
            suicide_factors.concat(results[1]),
            call_types.concat(results[2]),
            contact_types.concat(results[3]),
            call_resolution_types.concat(results[4]),
            genders.concat(results[5]),
            numbers_of_calls.concat(results[6]),
            marital_statuses.concat(results[7]),
            plan_involvements.concat(results[8]),
            problem_types.concat(results[9]),
            volunteers.concat(results[10]),
            ages.concat(results[11]),
        ];
    });
    return rows;
};
