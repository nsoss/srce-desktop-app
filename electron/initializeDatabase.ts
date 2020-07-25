import { app } from 'electron';
import isDev from 'electron-is-dev';
import path from 'path';
import { createConnection } from 'typeorm';
import migrations from './migrations';
import models from './models';

const name = 'srce.db';
const database = isDev ? name : path.join(path.dirname(app.getAppPath()), name);

export default async function initializeDatabase(): Promise<void> {
  const connection = await createConnection({
    type: 'sqlite',
    database,
    entities: models,
    migrations,
    migrationsTableName: 'Migrations',
  });

  await connection.runMigrations();
}
