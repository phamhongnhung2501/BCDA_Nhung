/**
 * @version 1.1.14
 */

const express = require('express');
const notificationService = require('./services');
const api = express();
const auth = require('../auth/services').authentication;

api.get('/', auth, notificationService.listNotification);
api.post('/set-as-read', auth, notificationService.setAsRead);
api.post('/:notificationId/set-as-read', auth, notificationService.setAsReadById);

module.exports = api;
