import {config} from '../config/database/product.database.config.js';

import pg from 'pg';

const {Pool} = pg;

const pool = new Pool(config)

let client;

export const createConnection=async ()=>{
    client = await pool.connect()
}


export const query=async (queryString,queryParams=[])=>{
   const res= await client.query(queryString,queryParams);
    const rows = res.rows;
    return rows.length >1 ? rows[0]:rows
};


pool.on('connect',()=>{
    console.log("Connection With Postgres is success");
})

pool.on('error',()=>{
    console.log("Failed to connect");
    process.exit(1);
})

export const getValuesStringInPostgresQuery=(columns)=>{
    return columns.map((_,index)=>`$${index+1}`)
 }

export const getValueForUpdateInPostgressQuery=(columns,lastLength=null)=>{
    const columnToIterate  = Array.isArray(columns)?columns:Object.keys(columns);
    return columnToIterate.map((columnName,index)=>`${columnName}=$${(lastLength ||index)+(lastLength ? index+1:1)}`)
 }
 
export const getColumnsKeysAndValues=(columns)=>{
     return Object.keys(columns).reduce((acc,columnKey)=>{
         const value =columns[columnKey];
         if(!!value){
             return {columns:[...(acc?.columns || []),columnKey],values:[...(acc?.values ||[]),value]}
         }
         return acc;
     },{columns:[],values:[]})
}


export  function expand(rowCount, columnCount, startAt=1){
    var index = startAt
    return Array(rowCount).fill(0).map(v => `(${Array(columnCount).fill(0).map(v => `$${index++}`).join(", ")})`).join(", ")
  }
  
