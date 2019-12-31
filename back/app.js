const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const logColor = require('./src/untils/logColor');
const configDB = require('./config/database');


/** Environment variables.*/
if(process.env.NODE_ENV==="DEV") require('custom-env').env('development',__dirname);

/** Init*/
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static('static'));

/** Router */
const router = require('./src/router');
app.use('/api/v1', router);

/** Database */
mongoose.connect(configDB.setting.url, configDB.options).then(
    () => {console.log('Successfully connected to '+logColor(`color:green${configDB.setting.url}`));},
    err => {console.error( Error(` Unable to connect to database \n${err}`) );}
);

/**Serial Port.*/
// require('./serial-port');

/**Init*/
let init = require('./bin/services/services');
init.newSeed().then().catch(e => console.log(e));

module.exports = app;