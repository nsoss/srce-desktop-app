import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import isDev from 'electron-is-dev';
import { autoUpdater } from 'electron-updater';
import fs from 'fs';
import path from 'path';
import {
    createConnection,
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';
import url from 'url';
import Call from './models/Call';
import CallOrdinality from './models/CallOrdinality';
import CallType from './models/CallType';
import Gender from './models/Gender';
import MaritalStatus from './models/MaritalStatus';
import PostCallState from './models/PostCallState';
import ProblemType from './models/ProblemType';
import SuicideFactor from './models/SuicideFactor';
import SuicideRisk from './models/SuicideRisk';
import Volunteer from './models/Volunteer';

/********************************* seed data **********************************/

const callTypes = [
    // Vrste poziva
    'Ćuteći',
    'Informativni',
    'Hronični',
    'Podrška',
];

const problemTypes = [
    // Vrste problema
    'Gubitak',
    'Usamljenost',
    'Partnerski',
    'Porodični (sa roditeljima ili članovima porodice)',
    'Problem na radnom mestu, školi ili fakultetu',
    'Egzistencijalni problemi (nezaposlenost, siromaštvo, nemanje perspektive, opšte nezadovoljstvo životom,...)',
    'Bolest zavisnosti: Alkoholizam',
    'Bolest zavisnosti: Narkomanija',
    'Mentalni (psihički) poremećaj',
    'Problem seksualne prirode (sex. disfunkcija, masturbacija, frigidnost, nimfomanija, promiskuitet, veličina polnog organa, fetišizam, incest, voajerizam, strah od odnosa,...)',
    'Problem usled sex. Orijentacije (homoseksualnost, biseksualnost, transseksualnost, transvestiti)',
    'Telesna bolest',
    'Invaliditet',
    'Zlostavljanje (svi vidovi zlostavljanja)',
    'Poziv za treću osobu',
    'Manipulativni',
    'DRUGO (obavezno dopisati u napomeni i u vel registru koja vrsta problema!)',
];

const suicideRisks = [
    // Suicidalni rizik
    'Nije utvrđen',
    'Nema suicidalne misli',
    'Ima suicidalne misli, nema plan',
    'Ima plan samoubistva i ozbiljno razmišlja o tome',
    'Postoji neposredan rizik da će osoba izvršiti samoubistvo',
];

const suicideFactors = [
    // Suicidalni faktor
    'Mentalni (psihički) poremećaj',
    'Bolest zavisnosti',
    'Psihička kriza',
    'Fizičko oboljenje',
    'Trauma ili zlostavljanje',
    'Raniji pokušaj suicida',
    'Suicid člana porodice',
];

const postCallStates = [
    // Stanje na kraju poziva
    'Bolje',
    'Isto (nepromenjeno)',
    'Gore',
    'Neutvrđeno',
];

const genders = [
    // Pol
    'Muški',
    'Ženski',
];

const maritalStatuses = [
    // Bračno stanje
    'Udata/oženjen',
    'Razveden/a',
    'Udovac/udovica',
    'Samac ima partnera',
    'Samac nema partnera',
    'Neutvrđeno',
];

const callOrdinalities = [
    // Koji put zove
    'Prvi put',
    '2 i više',
];

/********************************** dbHelper **********************************/

const getVolunteers = async (): Promise<Volunteer[]> => await Volunteer.find();

const deleteVolunteer = async (id: number): Promise<void> => {
    await Volunteer.delete({ id });
};

// TODO
const insertVolunteer = async (): Promise<void> => {
    const volunteer = new Volunteer();

    volunteer.name = 'TEST_VOLUNTEER';

    await volunteer.save();
};

const getCalls = async (): Promise<Call[]> => await Call.find();

interface CallData {
    callTypeId: number;
    volunteerId: number;
    problemTypeId: number;
    suicideRiskId: number;
    suicideFactorId: number;
}

const insertCall = async (callData: CallData): Promise<void> => {
    const call = new Call();

    const {
        callTypeId,
        volunteerId,
        problemTypeId,
        suicideRiskId,
        suicideFactorId,
    } = callData;

    const callType = await CallType.findOne({ id: callTypeId });
    const volunteer = await Volunteer.findOne({ id: volunteerId });
    const problemType = await ProblemType.findOne({ id: problemTypeId });
    const suicideRisk = await SuicideRisk.findOne({ id: suicideRiskId });
    const suicideFactor = await SuicideFactor.findOne({
        id: suicideFactorId,
    });

    call.callType = callType;
    call.volunteer = volunteer;
    call.problemType = problemType;
    call.suicideRisk = suicideRisk;
    call.suicideFactor = suicideFactor;

    await call.save();
};

const getCallTypes = async (): Promise<CallType[]> => await CallType.find();

const getProblemTypes = async (): Promise<ProblemType[]> =>
    await ProblemType.find();

const getSuicideRisks = async (): Promise<SuicideRisk[]> =>
    await SuicideRisk.find();

const getSuicideFactors = async (): Promise<SuicideFactor[]> =>
    await SuicideFactor.find();

const getPostCallStates = async (): Promise<PostCallState[]> =>
    await PostCallState.find();

const getGenders = async (): Promise<Gender[]> => await Gender.find();

const getMaritalStatuses = async (): Promise<MaritalStatus[]> =>
    await MaritalStatus.find();

const getCallOrdinalities = async (): Promise<CallOrdinality[]> =>
    await CallOrdinality.find();

const getFormData = async () => {
    const [
        callTypes,
        problemTypes,
        suicideRisks,
        suicideFactors,
        postCallStates,
        genders,
        maritalStatuses,
        callOrdinalities,
        volunteers,
    ] = await Promise.all([
        getCallTypes(),
        getProblemTypes(),
        getSuicideRisks(),
        getSuicideFactors(),
        getPostCallStates(),
        getGenders(),
        getMaritalStatuses(),
        getCallOrdinalities(),
        getVolunteers(),
    ]);

    return {
        callTypes,
        problemTypes,
        suicideRisks,
        suicideFactors,
        postCallStates,
        genders,
        maritalStatuses,
        callOrdinalities,
        volunteers,
    };
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
                            // @ts-ignore
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
        const insertedID = await insertVolunteer();
        window.webContents.send('volunteerInserted', insertedID);
    });

    ipcMain.on('getCalls', async function() {
        const results = await getCalls();
        window.webContents.send('callsSent', results);
    });

    window.setMenu(menu);
}

const createDropdownTable = async (
    queryRunner: QueryRunner,
    tableName: string,
    foreignKeyName: string
): Promise<void> => {
    await queryRunner.createTable(
        new Table({
            name: tableName,
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                },
                {
                    name: 'name',
                    type: 'text',
                    isNullable: false,
                },
            ],
        })
    );
    await queryRunner.createForeignKey(
        'Calls',
        new TableForeignKey({
            columnNames: [foreignKeyName],
            referencedColumnNames: ['id'],
            referencedTableName: tableName,
        })
    );
};

class CreateVolunteer1582466752001 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'Volunteers',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'text',
                    },
                ],
            })
        );
        await queryRunner.createTable(
            new Table({
                name: 'Calls',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'callTypeId',
                        type: 'integer',
                    },
                    {
                        name: 'problemTypeId',
                        type: 'integer',
                    },
                    {
                        name: 'suicideRiskId',
                        type: 'integer',
                    },
                    {
                        name: 'suicideFactorId',
                        type: 'integer',
                    },
                    {
                        name: 'postCallStateId',
                        type: 'integer',
                        isNullable: true,
                    },
                    {
                        name: 'genderId',
                        type: 'integer',
                        isNullable: true,
                    },
                    {
                        name: 'maritalStatusId',
                        type: 'integer',
                        isNullable: true,
                    },
                    {
                        name: 'callOrdinalityId',
                        type: 'integer',
                        isNullable: true,
                    },
                    {
                        name: 'volunteerId',
                        type: 'integer',
                    },
                ],
            })
        );
        await queryRunner.createForeignKey(
            'Calls',
            new TableForeignKey({
                columnNames: ['volunteerId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'Volunteers',
            })
        );

        await createDropdownTable(queryRunner, 'CallTypes', 'callTypeId');
        await createDropdownTable(queryRunner, 'ProblemTypes', 'problemTypeId');
        await createDropdownTable(queryRunner, 'SuicideRisks', 'suicideRiskId');
        await createDropdownTable(
            queryRunner,
            'SuicideFactors',
            'suicideFactorId'
        );
        await createDropdownTable(
            queryRunner,
            'PostCallStates',
            'postCallStateId'
        );
        await createDropdownTable(queryRunner, 'Genders', 'genderId');
        await createDropdownTable(
            queryRunner,
            'MaritalStatuses',
            'maritalStatusId'
        );
        await createDropdownTable(
            queryRunner,
            'CallOrdinalities',
            'callOrdinalityId'
        );

        callTypes.forEach(async (callType, index) => {
            const entity = new CallType();
            entity.id = index + 1;
            entity.name = callType;
            await entity.save();
        });
        problemTypes.forEach(async (problemType, index) => {
            const entity = new ProblemType();
            entity.id = index + 1;
            entity.name = problemType;
            await entity.save();
        });
        suicideRisks.forEach(async (suicideRisk, index) => {
            const entity = new SuicideRisk();
            entity.id = index + 1;
            entity.name = suicideRisk;
            await entity.save();
        });
        suicideFactors.forEach(async (suicideFactor, index) => {
            const entity = new SuicideFactor();
            entity.id = index + 1;
            entity.name = suicideFactor;
            await entity.save();
        });
        postCallStates.forEach(async (postCallState, index) => {
            const entity = new PostCallState();
            entity.id = index + 1;
            entity.name = postCallState;
            await entity.save();
        });
        genders.forEach(async (gender, index) => {
            const entity = new Gender();
            entity.id = index + 1;
            entity.name = gender;
            await entity.save();
        });
        maritalStatuses.forEach(async (maritalStatus, index) => {
            const entity = new MaritalStatus();
            entity.id = index + 1;
            entity.name = maritalStatus;
            await entity.save();
        });
        callOrdinalities.forEach(async (callOrdinality, index) => {
            const entity = new CallOrdinality();
            entity.id = index + 1;
            entity.name = callOrdinality;
            await entity.save();
        });
    }
    async down(queryRunner: QueryRunner): Promise<void> {
        throw new Error('Method not implemented.');
    }
}

const appDir = path.dirname(app.getAppPath());

let mainWindow: BrowserWindow;
const run = async () => {
    try {
        await app.whenReady();
        mainWindow = new BrowserWindow({
            webPreferences: {
                nodeIntegration: true,
            },
        });

        ipcMain.on('getCalls', async () => {
            const calls = await getCalls();
            mainWindow.webContents.send('callsSent', calls);
        });

        ipcMain.on('getFormData', async () => {
            const formData = await getFormData();
            mainWindow.webContents.send('formDataSent', formData);
        });

        ipcMain.on('getVolunteers', async () => {
            const volunteers = await getVolunteers();
            mainWindow.webContents.send('volunteersSent', volunteers);
        });

        ipcMain.on('insertCall', async (_, call) => {
            const insertedCall = await insertCall(call);
            mainWindow.webContents.send('callInserted', insertedCall);
        });

        ipcMain.on('insertVolunteer', async (_, { name }) => {
            const volunteer = new Volunteer();
            volunteer.name = name;
            await volunteer.save();
            mainWindow.webContents.send('volunteerInserted', volunteer);
        });

        ipcMain.on('get_version_string', event => {
            event.sender.send('get_version_string', app.getVersion());
        });

        ipcMain.on('update', () => {
            autoUpdater.quitAndInstall();
        });

        mainWindow.loadURL(
            isDev
                ? 'http://localhost:3000/'
                : url.format({
                      pathname: path.join(__dirname, '../index.html'),
                      protocol: 'file:',
                      slashes: true,
                  })
        );
        const connection = await createConnection({
            type: 'sqlite',
            database: path.join(appDir, 'srce.db'),
            entities: [
                Volunteer,
                Call,
                CallType,
                ProblemType,
                SuicideRisk,
                SuicideFactor,
                PostCallState,
                Gender,
                MaritalStatus,
                CallOrdinality,
            ],
            migrations: [CreateVolunteer1582466752001],
            migrationsTableName: 'Migrations',
        });
        await connection.runMigrations();
        const testVolunteer = new Volunteer();
        testVolunteer.name = 'EXAMPLE';
        testVolunteer.save();

        mainWindow.once('ready-to-show', () => {
            autoUpdater.checkForUpdatesAndNotify();
        });
    } catch (error) {
        fs.writeFileSync(path.join(appDir, 'error.log'), error);
        process.exit(1);
    }
};

autoUpdater.on('update_available', () => {
    mainWindow.webContents.send('update_available');
});

autoUpdater.on('update_downloaded', () => {
    mainWindow.webContents.send('update_downloaded');
});

run();
