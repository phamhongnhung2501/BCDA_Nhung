const mongoose = require('mongoose');

const SeedSchema = new mongoose.Schema({
    seed: {
        type: String,
        required: true,
        index: true
    },
    stage_1_days: {
        type: Number,
        required: true
    },
    stage_2_days: {
        type: Number
    },
    stage_3_days: {
        type: Number,
        required: true
    },
    stage_4_days: {
        type: Number,
        required: true
    },
    stage_1:{
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
        min_temp: Number,
        max_temp: Number,
        min_light: Number,
        max_light: Number,
        min_PH: Number,
        max_PH: Number,
        min_soil_moisture: Number,
        max_soil_moisture: Number,
        min_hum: Number,
        max_hum: Number
    },
    stage_3:{
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
