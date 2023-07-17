import express from 'express';
import * as dotEnv from 'dotenv';

import initalize from './initialize';

dotEnv.config();



const app = express();    

app.use(express.json());
app.use(express.urlencoded({extended:true}));

function startServer(){
    initalize(app)

}

startServer();

process.on('exit',()=>{
    startServer();
})







