const express = require('express');
const api = express();
const auth = require('../../auth/services').authentication;
const serviceSeeds = require('./services');

api.get('/', auth, serviceSeeds.getSeeds);
api.get('/gateway', auth, serviceSeeds.getSensor);
api.get('/:seedId', auth, serviceSeeds.getSeed);
api.patch('/:seedId', auth, serviceSeeds.editSeed);
api.post('/', auth, serviceSeeds.newSeed);


module.exports = api;