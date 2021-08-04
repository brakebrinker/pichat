import DbConfig from './database.config';
import * as dotenv from 'dotenv';
import { ConnectionOptions } from "typeorm";

dotenv.config();

const typeormConfig = DbConfig() as ConnectionOptions;

export default typeormConfig;