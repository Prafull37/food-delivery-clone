import express from 'express';

import * as dotenv from 'dotenv';

import { __DIRNAME__ } from './staticfilepath.constants.js';

import ProductRoute from './routes/food.routes.js'
import { createConnection } from './database/pg.js';
import { errorLogger, errorResponder, failSafeError } from './middleware/error.js';

dotenv.config();

const port = process.env.PORT || 5001;
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/foods',ProductRoute);

app.use(errorLogger);
app.use(failSafeError)
app.use(errorResponder);





app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
    createConnection();
});