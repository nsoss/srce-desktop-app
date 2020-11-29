import { app } from 'electron';
import isDev from 'electron-is-dev';
import path from 'path';
import { createConnection } from 'typeorm';
import CallOrdinalityEntity from './entities/CallOrdinalityEntity';
import CallTypeEntity from './entities/CallTypeEntity';
import EntryEntity from './entities/EntryEntity';
import GenderEntity from './entities/GenderEntity';
import MaritalStatusEntity from './entities/MaritalStatusEntity';
import PostCallStateEntity from './entities/PostCallStateEntity';
import ProblemTypeEntity from './entities/ProblemTypeEntity';
import SuicideFactorEntity from './entities/SuicideFactorEntity';
import SuicideRiskEntity from './entities/SuicideRiskEntity';
import VolunteerEntity from './entities/VolunteerEntity';
import { CreateVolunteer1606658907521 } from './migrations/1606658907521-CreateVolunteer';
import { CreateEntry1606658928872 } from './migrations/1606658928872-CreateEntry';

const name = 'srce.db';
const database = isDev ? name : path.join(path.dirname(app.getAppPath()), name);
const entities = [
  CallOrdinalityEntity,
  CallTypeEntity,
  EntryEntity,
  GenderEntity,
  MaritalStatusEntity,
  PostCallStateEntity,
  ProblemTypeEntity,
  SuicideFactorEntity,
  SuicideRiskEntity,
  VolunteerEntity,
];
const migrations = [CreateVolunteer1606658907521, CreateEntry1606658928872];

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
