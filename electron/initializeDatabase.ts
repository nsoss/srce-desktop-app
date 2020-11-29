import { app } from 'electron';
import isDev from 'electron-is-dev';
import path from 'path';
import { createConnection } from 'typeorm';
import CreateVolunteer1595152988343 from './migrations/1595152988343-CreateVolunteer';
import CreateCall1595156477733 from './migrations/1595156477733-CreateCall';
import AddCallDataToCall1595157453390 from './migrations/1595157453390-AddCallDataToCall';
import AddBasicInfoToCall1595170680596 from './migrations/1595170680596-AddBasicInfoToCall';
import entities from './models';

const name = 'srce.db';
const database = isDev ? name : path.join(path.dirname(app.getAppPath()), name);
const migrations = [
  CreateVolunteer1595152988343,
  CreateCall1595156477733,
  AddCallDataToCall1595157453390,
  AddBasicInfoToCall1595170680596,
];

export default async function initializeDatabase(): Promise<void> {
  const connection = await createConnection({
    type: 'sqlite',
    database,
    entities,
    migrations,
    migrationsTableName: 'Migrations',
  });

  await connection.runMigrations();
}
