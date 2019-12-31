const formidable = require('formidable');
const fs = require('fs');
const lodash = require('lodash');
const path = require('path');

const User = require('./models/users');
const Information = require('../farm/information/models/info');
const response = require('../base/response');
const serializer = require('../base/serializer');
let type_img = ["image/jpeg", "image/png"];

/** Get all users*/
async function listUser(req, res){
    try {
        let full_users = [];
        let users = await User.find({});
        for(let i=0;i<users.length;i++){
            full_users.push(await serializer.convertOutput(users[i]))
        }
        response.ok(res, full_users);
    } catch (err) {
        return response.notFound(res);
    }
}

/** Get your information*/
async function getMe(req, res){
    try {
        let user = await serializer.convertOutput(req.user);
        return response.ok(res, user);
    } catch (err) {
        return response.internal(res, err);
    }
}

/** Get user's information*/
async function getUser(req, res) {
    const user_id = req.params.userId;
    try {
        let user = await User.findById(user_id);
        if(!user) return response.notFound(res, "User doesn't exists!!!");
        let full_user = await serializer.convertOutput(user);
        return response.ok(res, full_user);
    }catch (err) {
        return response.internal(res, err);
    }
}

/** Edit your information*/
async function editUser(req, res) {
    try {
        let info = {
            full_name: req.body.full_name,
            gender: req.body.gender,
            address: req.body.address
        };
        let user = await User.findByIdAndUpdate(req.user._id, info, { new: true });
        let user_full = await serializer.convertOutput(user);
        return response.ok(res, user_full);
    } catch (err) {
        response.internal(res, err);
    }
}

/** Delete your user or not admin*/
async function deleteUser(req, res){
    try {
        let user = await User.findById(req.params.userId);
        if(!user) return response.notFound(res,"User doesn't exists!!!");
        if (user.is_admin) return response.forbidden(res, "Can't delete an admin user");
        if (req.user.is_admin || req.user._id.toString() === user._id.toString()) {
            await User.findByIdAndDelete(req.params.userId);
        }
        response.noContent(res)
    }catch (err) {
        response.internal(res, err);
    }
}

/** Change your password */
async function changePassword(req, res) {
    const { current_password, new_password } = req.body;
    try {
        let user = await User.findById(req.user._id);
        user.comparePassword(current_password, async (err, isMatch) => {
            if (!isMatch || err) return response.forbidden(res, "Wrong password.");
            user.password = new_password;
            await user.save();
            return response.noContent(res);
        });
    } catch (err) {
        response.internal(res, err);
    }
}

/** Change your avatar*/
function changeAvatar(req, res) {
    try{
        let url = path.join('.', 'static', 'media');
        let new_path;
        let form = new formidable.IncomingForm();
        form.parse(req, async function (err, fields, files) {
            let type = files.avatar.type;
            if(!type_img.includes(type)) return response.badData(res, "Type doesn't support!!!");
            let old_path = files.avatar.path;
            fs.existsSync(url) || fs.mkdirSync(url);
            new_path = path.join(url, files.avatar.name);
            fs.renameSync(old_path, new_path);
            new_path = new_path.slice(7);
            let user = await User.findByIdAndUpdate(req.user._id,{photo: new_path},{new:true});
            let full_user = await serializer.convertOutput(user);
            console.log(full_user)
            return response.ok(res, full_user);
        });
    }catch (err) {
        response.internal(res, err)
    }
}

/** Change user to admin user*/
async function changeAdmin(req, res){
    try {
        if (!req.user.is_admin) return response.forbidden(res, "Permission Denied!!!");
        let user = await User.findById(req.params.userId);
        if (!user) return response.notFound(res, "User doesn't exist!!!");
        if (user.is_admin === true) return response.badData(res, "User is already an admin user!!!");
        let farms = await Information.find({}, {sub_id: 1, _id: 0});
        let sub = [];
        for (let i = 0; i < farms.length; i++) {
            sub.push(farms[i].sub_id)
        }
        let compare = lodash.difference(sub, user.farms);
        user.is_admin = req.body.is_admin;
        await User.findOneAndUpdate({_id: req.params.userId}, {is_admin: true}, {new: true});
        for (let i = 0; i < compare.length; i++) {
            user.farms.push(compare[i]);
            await User.findOneAndUpdate({_id: req.params.userId}, {$push: {"farms": compare[i]}}, {new: true});
        }
        let full_user = await serializer.convertOutput(user);
        // send notification
        await notification.createNotifications(req.user, req.params.userId);
        return response.ok(res, full_user);
    }catch (err) {
        response.internal(res, err)
    }
}

module.exports = {
    listUser,
    getMe,
    getUser,
    editUser,
    changePassword,
    changeAvatar,
    changeAdmin,
    deleteUser
};