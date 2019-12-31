// const mongoose = require('mongoose');
//
// const SubstationSchema = new mongoose.Schema({
//     sub_id: {type: String, require: true},
//     T1: {type: Number, require: true},
//     T2: {type: Number, require: true},
//     T3: {type: Number, require: true},
//     T4: {type: Number, require: true},
//     H1: {type: Number, require: true},
//     H2: {type: Number, require: true},
//     H3: {type: Number, require: true},
//     H4: {type: Number, require: true},
//     L1: {type: Number, require: true},
//     L2: {type: Number, require: true},
//     L3: {type: Number, require: true},
//     L4: {type: Number, require: true},
//     PH1: {type: Number, require: true},
//     PH2: {type: Number, require: true},
//     PH3: {type: Number, require: true},
//     PH4: {type: Number, require: true},
//     SM1: {type: Number, require: true},
//     SM2: {type: Number, require: true},
//     SM3: {type: Number, require: true},
//     SM4: {type: Number, require: true},
//     RL1_status: {type: Number, require: true},
//     RL2_status: {type: Number, require: true},
//     time: Date,
//     created_date: {
//         type: Date,
//         default: Date.now()
//     }
// },{ versionKey: false });
//
// const Data = mongoose.model("farm_data", SubstationSchema);
// module.exports = Data;

const mongoose = require('mongoose');

const SubstationSchema = new mongoose.Schema({
    sub_id: {
        type: String,
        required: true
    },
    sensor_1: {
        id: String,
        name: String,
        RF_signal: String,
    },
    sensor_2:{
        RF_signal: String,
        id: String,
        name: String,
        EOC: Number,
        value: Number,
        battery: Number
    },
    sensor_3:{
        RF_signal: String,
        id: String,
        name: String,
        EOC: Number,
        value: Number,
        battery: Number
    },
    T1: {type: Number, require: true},
    T2: {type: Number, require: true},
    T3: {type: Number, require: true},
    T4: {type: Number, require: true},
    H1: {type: Number, require: true},
    H2: {type: Number, require: true},
    H3: {type: Number, require: true},
    H4: {type: Number, require: true},
    L1: {type: Number, require: true},
    L2: {type: Number, require: true},
    L3: {type: Number, require: true},
    L4: {type: Number, require: true},
    PH1: {type: Number, require: true},
    PH2: {type: Number, require: true},
    PH3: {type: Number, require: true},
    PH4: {type: Number, require: true},
    SM1: {type: Number, require: true},
    SM2: {type: Number, require: true},
    SM3: {type: Number, require: true},
    SM4: {type: Number, require: true},
    time: Date,
    created_date: {
        type: Date,
        default: Date.now()
    }
},{ versionKey: false });

const Data = mongoose.model("farm_data", SubstationSchema);
module.exports = Data;
