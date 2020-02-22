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
    storage: databasePath
});

function testConnection() {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            if (!fs.existsSync(databasePath)) {
                console.log('Connection will be created.');
                DBHelper.checkIfDatabaseExists();
            } else {
                console.error('Unable to connect to the database:', err);
            }
        });
}

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
            raw: true
        })
        .then(volunteers => {
            return volunteers;
        });
    return rows;
};

exports.deleteVolunteer = id => {
    const isDeleted = volunteer
        .destroy({
            where: { id: id }
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
            raw: true
        })
        .then(calls => {
            return calls;
        });
    return rows;
};

exports.deleteCall = id => {
    const isDeleted = call
        .destroy({
            where: { id: id }
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
            raw: true
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
            raw: true
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
            raw: true
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
            raw: true
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
            raw: true
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
            raw: true
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
            raw: true
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
            raw: true
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
            raw: true
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
            raw: true
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
            raw: true
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
            this.getAges()
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
            volunteers.concat(results[10], ages.concat(results[11]))
        ];
    });
    return rows;
};
