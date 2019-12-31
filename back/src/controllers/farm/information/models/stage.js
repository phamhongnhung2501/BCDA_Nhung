const mongoose = require('mongoose');

const StageSchema = new mongoose.Schema({
    name: {type: String, required: true},
    stage_days: {
        type: Number,
        required: true
    },
    min_temp: {type: Number, required: true},
    max_temp: {type: Number, required: true},
    min_light: {type: Number, required: true},
    max_light: {type: Number, required: true},
    min_PH: {type: Number, required: true},
    max_PH: {type: Number, required: true},
    min_soil_moisture: {type: Number, required: true},
    max_soil_moisture: {type: Number, required: true},
    min_hum: {type: Number, required: true},
    max_hum: {type: Number, required: true}
},{ versionKey: false });

const Stage = mongoose.model("development_stages", StageSchema);
module.exports = Stage;
