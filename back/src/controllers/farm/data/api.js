const express = require('express');
const api = express();
const serviceProject = require('./services');
const Auth = require('../../auth/services').authentication;

// api.get('/', serviceProject.getSubData);
api.get('/:sub_id', Auth, serviceProject.getSubDataById);
api.post('/:sub_id', Auth, serviceProject.getSubDataByIdAndTime);

module.exports = api;