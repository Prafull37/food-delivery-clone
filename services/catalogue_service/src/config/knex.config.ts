import {Knex} from 'knex';
import * as dotEnv from 'dotenv';

dotEnv.config();


const KNEX_CONFIG:Knex.Config={
    client:'pg',
    connection:{
     connectionString:process.env.DATABASE_URL
    }
}

export default KNEX_CONFIG