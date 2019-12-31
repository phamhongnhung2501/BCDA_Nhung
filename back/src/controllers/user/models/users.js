const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address:{
        type: String,
        default: null
    },
    phone_number:{
        type: String,
        required: true
    },
    is_active:{
        type: Boolean,
        default: false
    },
    is_admin:{
        type: Boolean,
        default: false
    },
    photo: {
        type: String,
        default: 'avatar\\unknown.png'
    },
    gender:{
        type: String,
        enum:['male','female','unknown'],
        default: 'unknown'
    },
    farms:[{
        type: String
    }],
    date_joined: {
        type: Date,
        default: Date.now
    },
    code:{
        type: Date,
        default: Date.now
    },
    last_login: {
        type: Date,
        default: Date.now
    }
},{ versionKey: false });

UserSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('password')) {
        const user = this;
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    }
});

// Compare password
UserSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};
UserSchema.index({ email: 1 });
const User = mongoose.model("users", UserSchema);

module.exports = User;
