const mongoose = require('mongoose');

const SeedSchema = new mongoose.Schema({
    seed: {
        type: String,
        required: true,
        index: true
    },
    stage_1:{
        name: {type: String, required: true},
        stage_days: {type: Number, required: true},
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
    },
    stage_2:{
        name: {type: String, required: true},
        stage_days: {type: Number, required: true},
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
    },
    stage_3:{
        name: {type: String, required: true},
        stage_days: {type: Number, required: true},
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
    },
    stage_4:{
        name: {type: String, required: true},
        stage_days: {type: Number, required: true},
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
    }
},{ versionKey: false });

const Seed = mongoose.model("farm_seeds", SeedSchema);
module.exports = Seed;
