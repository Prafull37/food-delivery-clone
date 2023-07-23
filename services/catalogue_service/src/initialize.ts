import createDBConnection , {setUpDatabase} from "./database/knex";
import * as dotEnv from 'dotenv';

import { Application } from "express";
import CatalogueRouter from "./route/catalogue";
import { Knex } from "knex";

dotEnv.config();


let knex:Knex;

const PORT = process.env.PORT || 5002;


async function initalize(app:Application){
    createDBConnection().then(async (pg)=>{
        knex=pg;

        setUpDatabase(knex).then((tableCreationStatus:string)=>{
            if(tableCreationStatus==="failed"){
                return new Error("Failed While creating table")
            }
        
            app.use('/catalogue',CatalogueRouter)

            app.listen(PORT,()=>{
                console.log(` Server is running at 🚝 : http://localhost:${PORT}/`)
            })
        })
     
    })
}



export  {knex,initalize as default};