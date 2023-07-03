import express from 'express';

import * as dotenv from 'dotenv';

import { __DIRNAME__ } from './staticfilepath.constants.js';

import { createConnection } from './database/pg.js';
import { errorLogger, errorResponder, failSafeError } from './middleware/error.js';
//routes;
import ProductRoute from './routes/food.routes.js'
import ReviewRouter from './routes/review.routes.js';

dotenv.config();

const port = process.env.PORT || 5001;
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/foods',ProductRoute);
app.use('/reviews',ReviewRouter)

app.use(errorLogger);
app.use(failSafeError)
app.use(errorResponder);





app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
    createConnection();
});