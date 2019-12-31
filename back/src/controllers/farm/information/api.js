const express = require('express');
const api = express();
const serviceInfo = require('./services');
const auth = require('../../auth/services').authentication;

api.get('/', auth, serviceInfo.getSubstation);
api.get('/:sub_id', auth, serviceInfo.getSubById);
api.post('/', auth, serviceInfo.newSubstation);
api.post('/add_substation', auth, serviceInfo.addSubToUser);
api.patch('/:sub_id', auth, serviceInfo.editSub);
api.delete('/:sub_id', auth, serviceInfo.deleteSub);

module.exports = api;