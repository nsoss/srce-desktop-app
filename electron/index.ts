import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import isDev from 'electron-is-dev';
import fs from 'fs';
import path from 'path';
import { createConnection, QueryRunner, Table, TableForeignKey } from 'typeorm';
import url from 'url';
import CreateVolunteer1595152988343 from './migrations/1595152988343-CreateVolunteer';
import CreateCall1595156477733 from './migrations/1595156477733-CreateCall';
import AddCallDataToCall1595157453390 from './migrations/1595157453390-AddCallDataToCall';
import AddBasicInfoToCall1595170680596 from './migrations/1595170680596-AddBasicInfoToCall';
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
import registerIpcListeners from './registerIpcListeners';

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

  ipcMain.on('getVolunteers', async function () {
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

  ipcMain.on('getCalls', async function () {
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

    ipcMain.on('get_version_string', (event) => {
      event.sender.send('get_version_string', app.getVersion());
    });

    registerIpcListeners();

    mainWindow.loadURL(
      isDev
        ? 'http://localhost:3000/'
        : url.format({
            pathname: path.join(__dirname, './index.html'),
            protocol: 'file:',
            slashes: true,
          })
    );
    const connection = await createConnection({
      type: 'sqlite',
      database: isDev ? 'srce.db' : path.join(appDir, 'srce.db'),
      entities: [
        Call,
        CallOrdinality,
        CallType,
        Gender,
        MaritalStatus,
        PostCallState,
        ProblemType,
        SuicideFactor,
        SuicideRisk,
        Volunteer,
      ],
      migrations: [
        CreateVolunteer1595152988343,
        CreateCall1595156477733,
        AddCallDataToCall1595157453390,
        AddBasicInfoToCall1595170680596,
      ],
      migrationsTableName: 'Migrations',
    });
    await connection.runMigrations();
    const testVolunteer = new Volunteer();
    testVolunteer.name = 'EXAMPLE';
    testVolunteer.createdAt = new Date();
    testVolunteer.save();
  } catch (error) {
    fs.writeFileSync(path.join(appDir, 'error.log'), error);
    process.exit(1);
  }
};

run();
