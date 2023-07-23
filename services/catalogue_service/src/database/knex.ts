import KNEX_CONFIG from '../config/knex.config';
import knex,{Knex} from 'knex';


import { CATEGORY_STATUS } from '../constants/categoryStatus.constants';


async function createDBConnection(){
   const t = await knex(KNEX_CONFIG);
   return t;
}


export async function setUpDatabase(knex:Knex){
    const schema:string = process.env.DATABASE_SCHEMA || "catalogueSchema";
    const table:string = process.env.DATABASE_TABLE ||"catalogue_table";
    try{        
        await knex.raw(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await knex.raw(`CREATE SCHEMA IF NOT EXISTS "catalogueSchema"`);
        const hasTable = await knex.schema.withSchema(schema).hasTable(table);
        if(hasTable) return "success"
        return knex.schema.withSchema(schema).createTable(table,(table)=>{
            table.uuid("id").primary().notNullable().unique().defaultTo(knex.raw(`uuid_generate_v4()`));
            table.string("categoryName",256).notNullable();
            table.enum("categoryStatus",Object.keys(CATEGORY_STATUS),{useNative:false,enumName:'CATEGORY_STATUS'});
            table.string("createdBy",256).notNullable();
            table.timestamp("createdOn").notNullable();
            table.timestamp("updatedOn");
            table.string("restaurantId").notNullable();
            table.string("restaurantOwnerId").notNullable();
        }).then(()=>{
         return "success"
        })
        .catch((err)=>{
            console.log(err)
            return "failed"
        })
    }catch(e){
        console.log("error",e);
        return "failed"
    }
}

export default createDBConnection;