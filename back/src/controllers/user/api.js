const express = require('express');
const api = express();
const serviceUser = require('./services');
const auth = require('../auth/services').authentication;

api.get('/', auth, serviceUser.listUser);
api.get('/me', auth, serviceUser.getMe);
api.get('/:userId', auth, serviceUser.getUser);
api.patch('/me', auth, serviceUser.editUser);
api.patch('/:userId', auth, serviceUser.changeAdmin);
api.post('/change_password', auth, serviceUser.changePassword);
api.post('/change_avatar', auth, serviceUser.changeAvatar);
api.delete('/:userId', auth, serviceUser.deleteUser);

module.exports = api;
