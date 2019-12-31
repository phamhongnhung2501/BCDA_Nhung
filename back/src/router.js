const express = require('express');
const router = express();

const auth = require('./controllers/auth/api');
router.use('/auth', auth);

const data = require('./controllers/farm/data/api');
router.use('/data', data);

const information = require('./controllers/farm/information/api');
router.use('/information', information);

const notification = require('./controllers/notifications/api');
router.use('/notification', notification);

const user = require('./controllers/user/api');
router.use('/users', user);

const seed = require('./controllers/farm/seeds/api');
router.use('/seeds', seed);

module.exports = router;