const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const Sequelize = require('sequelize');

const databasePath = app.getAppPath() + '/srce.db';
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: databasePath,
});

/*********************************** models ***********************************/

const Age = sequelize.define(
    'Age',
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Age',
        timestamps: false,
    }
);
Age.associate = models => {
    Age.belongsTo(models.Call, { foreignKey: models.Call.id });
};

const Call_resolution_type = sequelize.define(
    'Call_resolution_type',
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Call_resolution_type',
        timestamps: false,
    }
);
Call_resolution_type.associate = models => {
    Call_resolution_type.belongsTo(models.Call, {
        foreignKey: models.Call.id,
    });
};

const Call_type = sequelize.define(
    'Call_type',
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Call_type',
        timestamps: false,
    }
);
Call_type.associate = models => {
    Call_type.belongsTo(models.Call, { foreignKey: models.Call.id });
};

const Call = sequelize.define(
    'Call',
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            default: new Date(),
        },
        call_number: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        call_duration: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        volunteer_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: {
                model: 'Volunteers',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
        contact_type_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: {
                model: 'Contact_types',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
        call_type_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: {
                model: 'Call_types',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
        problem_type_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: {
                model: 'Problem_types',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
        suicide_risk_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: {
                model: 'Suicide_risks',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
        suicide_factor_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: {
                model: 'Suicide_factors',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
        call_resolution_type_id: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            references: {
                model: 'Call_resolution_types',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
        note: {
            type: Sequelize.STRING,
        },
        short_content: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        caller_name: {
            type: Sequelize.STRING,
        },
        age_id: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            references: {
                model: 'Ages',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
        gender_id: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            references: {
                model: 'Genders',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
        marital_status_id: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            references: {
                model: 'Marital_statuses',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
        number_of_calls_id: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            references: {
                model: 'Number_of_calls',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
        plan_involvement_id: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            references: {
                model: 'Plan_involvements',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
    },
    {
        sequelize,
        modelName: 'Call',
        timestamps: false,
    }
);

const Contact_type = sequelize.define(
    'Contact_type',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        name: {
            type: Sequelize.STRING,
        },
    },
    {
        sequelize,
        modelName: 'Contact_type',
        timestamps: false,
    }
);
Contact_type.associate = models => {
    Contact_type.belongsTo(models.Call, { foreignKey: models.Call.id });
};

const Gender = sequelize.define(
    'Gender',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        name: {
            type: Sequelize.STRING,
        },
    },
    {
        sequelize,
        modelName: 'Gender',
        timestamps: false,
    }
);
Gender.associate = models => {
    Gender.belongsTo(models.Call, { foreignKey: models.Call.id });
};

const Marital_status = sequelize.define(
    'Marital_status',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        name: {
            type: Sequelize.STRING,
        },
    },
    {
        sequelize,
        modelName: 'Marital_status',
        timestamps: false,
    }
);
Marital_status.associate = models => {
    Marital_status.belongsTo(models.Call, { foreignKey: models.Call.id });
};

const Number_of_calls = sequelize.define(
    'Number_of_calls',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        name: {
            type: Sequelize.STRING,
        },
    },
    {
        sequelize,
        modelName: 'Number_of_calls',
        timestamps: false,
    }
);
Number_of_calls.associate = models => {
    Number_of_calls.belongsTo(models.Call, { foreignKey: models.Call.id });
};

const Plan_involvement = sequelize.define(
    'Plan_involvement',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        name: {
            type: Sequelize.STRING,
        },
    },
    {
        sequelize,
        modelName: 'Plan_involvement',
        timestamps: false,
    }
);
Plan_involvement.associate = models => {
    Plan_involvement.belongsTo(models.Call, { foreignKey: models.Call.id });
};

const Problem_type = sequelize.define(
    'Problem_type',
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Problem_type',
        timestamps: false,
    }
);
Problem_type.associate = models => {
    Problem_type.belongsTo(models.Call, { foreignKey: models.Call.id });
};

const Suicide_factor = sequelize.define(
    'Suicide_factor',
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Suicide_factor',
        timestamps: false,
    }
);
Suicide_factor.associate = models => {
    Suicide_factor.belongsTo(models.Call, { foreignKey: models.Call.id });
};

const Suicide_risk = sequelize.define(
    'Suicide_risk',
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Suicide_risk',
        timestamps: false,
    }
);
Suicide_risk.associate = models => {
    Suicide_risk.belongsTo(models.Call, { foreignKey: models.Call.id });
};

const Volunteer = sequelize.define(
    'Volunteer',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            default: new Date(),
        },
    },
    {
        sequelize,
        modelName: 'Volunteer',
        timestamps: false,
    }
);
Volunteer.associate = models => {
    Volunteer.belongsTo(models.Call, { foreignKey: models.Call.id });
};

/********************************** dbHelper **********************************/

const VolunteerModel = Volunteer;
const CallModel = Call;
const ContactTypeModel = Contact_type;
const CallTypeModel = Call_type;
const ProblemTypeModel = Problem_type;
const SuicideRiskModel = Suicide_risk;
const SuicideFactorModel = Suicide_factor;
const CallResolutionTypeModel = Call_resolution_type;
const GenderModel = Gender;
const MaritalStatusModel = Marital_status;
const NumberOfCallsModel = Number_of_calls;
const PlanInvolvementModel = Plan_involvement;
const AgeModel = Age;

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

const checkIfDatabaseExists = () => {
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

const getVolunteers = () => {
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

const deleteVolunteer = id => {
    const isDeleted = volunteer
        .destroy({
            where: { id: id },
        })
        .then(console.log('Deleted volunteer with id: ' + id));
    return isDeleted;
};

const insertVolunteer = v => {
    const insertedID = volunteer.create(v).then(row => {
        return row.dataValues.id;
    });
    return insertedID;
};

const getCalls = () => {
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

const deleteCall = id => {
    const isDeleted = call
        .destroy({
            where: { id: id },
        })
        .then(console.log('Deleted call with id: ' + id));
    return isDeleted;
};

const insertCall = c => {
    const insertedCall = call.create(c).then(row => {
        return row.dataValues.id;
    });
    return insertedCall;
};

const getContactTypes = () => {
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

const getCallTypes = () => {
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

const getProblemTypes = () => {
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

const getGenders = () => {
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

const getAges = () => {
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

const getCallResolutionTypes = () => {
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

const getNumberOfCalls = () => {
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

const getMaritalStatuses = () => {
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

const getPlanInvolvements = () => {
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

const getSuicideRisks = () => {
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

const getSuicideFactors = () => {
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

const foo = () => {
    return Promise.all(
        [
            getSuicideRisks(),
            getSuicideFactors(),
            getCallTypes(),
            getContactTypes(),
            getCallResolutionTypes(),
            getGenders(),
            getNumberOfCalls(),
            getMaritalStatuses(),
            getPlanInvolvements(),
            getProblemTypes(),
            getVolunteers(),
            getAges(),
        ].map(handleRejection)
    );
};

const getFormData = () => {
    const suicide_risks = [];
    const suicide_factors = [];
    const call_types = [];
    const contact_types = [];
    const call_resolution_types = [];
    const genders = [];
    const numbers_of_calls = [];
    const marital_statuses = [];
    const plan_involvements = [];
    const problem_types = [];
    const volunteers = [];
    const ages = [];
    const rows = foo().then(results => {
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

/******************************************************************************/

let window;

function createWindow() {
    // Menu
    const menu = Menu.buildFromTemplate([
        {
            // TODO: Remove duplicate object keys.
            // label: 'Main',
            // submenu: [
            //     {
            //         label: 'Exit',
            //         click() {
            //             app.quit();
            //         },
            //     },
            // ],
            label: 'Tools',
            submenu: [
                {
                    label: 'Toggle Developer Tools',
                    accelerator: 'Ctrl+Shift+I',
                    click: (item, focusedWindow) => {
                        if (focusedWindow) {
                            focusedWindow.toggleDevTools();
                        }
                    },
                },
            ],
        },
    ]);

    Menu.setApplicationMenu(menu);

    window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
        },
    });
    window.maximize();
    window.loadURL('http://localhost:3000');

    window.on('closed', () => {
        window = null;
    });

    ipcMain.on('getVolunteers', async function() {
        const result = await getVolunteers();
        window.webContents.send('volunteersSent', result);
    });

    ipcMain.on('deleteVolunteer', async (event, id) => {
        const result = await deleteVolunteer(id);
        window.webContents.send('volunteerDeleted', result);
    });

    ipcMain.on('insertVolunteer', async (event, volunteer) => {
        const insertedID = await insertVolunteer(volunteer);
        window.webContents.send('volunteerInserted', insertedID);
    });

    ipcMain.on('insertCall', async (event, call) => {
        const insertedCall = await insertCall(call);
        window.webContents.send('callInserted', insertedCall);
    });

    ipcMain.on('getCalls', async function() {
        const results = await getCalls();
        window.webContents.send('callsSent', results);
    });

    ipcMain.on('getFormData', async function() {
        const results = await getFormData();
        window.webContents.send('formDataSent', results);
    });

    window.setMenu(menu);
}
function databaseOperations() {
    checkIfDatabaseExists();
}

app.on('ready', databaseOperations);
app.on('ready', createWindow);
