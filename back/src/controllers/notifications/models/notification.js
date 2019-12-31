const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    event_type:{
        type: String,
        required: true,
    },
    data:{
        type: Object, // Mention user
        required: true
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId, // Mentioned user
        ref: 'User',
        required: true
    },
    created_date:{
        type:Date,
        default: Date.now
    },
    read:{
        type: Date,
        default: null
    }
}, { versionKey: false })

const Notification = mongoose.model('notifications', notificationSchema);

module.exports.Notification = Notification;
