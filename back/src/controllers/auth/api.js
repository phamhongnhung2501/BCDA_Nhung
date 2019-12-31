const express = require('express');
const api = express();
const serviceAuth = require('./services');

api.post('/', serviceAuth.login);
api.post('/register', serviceAuth.register);
api.post('/verify', serviceAuth.verifyOtp);
api.post('/refresh', serviceAuth.refreshOTP);

module.exports = api;
