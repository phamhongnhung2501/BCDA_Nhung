// const mongoose = require('mongoose');
const response = require('../../base/response');
const Information = require('../information/models/info');
const Seed = require('../seeds/models/seeds');
const gateway = require('../../../../config/seeds').gateway;
const validator = ["name","stage_days","min_temp","max_temp","min_light","max_light","min_PH","max_PH",
    "min_soil_moisture","max_soil_moisture","min_hum","max_hum"];
const validator_farm = ["name", "seed", "stage_1","stage_3","stage_4"];

async function getSeeds(req, res){
    try {
        let seeds = await Seed.find({},{seed:1});
        response.ok(res, seeds)
    }catch (err) {
        response.internal(res, err)
    }
}

async function newSeed(req, res){
    try{
        let {stage_1_days, stage_2_days, stage_3_days, stage_4_days}= req.body;
        if(!req.user.is_admin) return response.forbidden(res,"Permission Denied!!!");
        if(stage_1_days===0||stage_2_days===0||stage_3_days===0||stage_4_days===0) return response.badData(res, "Days >= 0!!!");
        let existed_seed = await Seed.findOne({seed: req.body.seed});
        if(existed_seed) return response.badData(res, "Seed is existed!!!");
        let seed = await Seed.create(req.body);
        response.ok(res, seed)
    }catch(err){
        response.internal(res, err)
    }
}

async function editSeed(req, res){
    try{
        let change_element = req.body;
        for(let i=1;i<5;i++) {
            checkInput(change_element, i)
        }
        let seed = await Seed.findByIdAndUpdate(req.params.seedId, change_element, {new:true});
        response.ok(res, seed);
    }catch (err) {
        response.internal(res, err)
    }
}

async function getSeed(req, res){
    try{
        let seed = await Seed.findById(req.params.seedId);
        response.ok(res, seed)
    }catch(err){
        response.internal(res, err)
    }
}

async function getSensor(req, res){
    try{
        let gate = gateway;
        let subs = await Information.find({}).distinct("sub_id");
        for(let i=0;i<subs.length;i++){
            gate = gate.filter(item => item !== subs[i])
        }
        response.ok(res, gate)
    }catch(err){
        response.internal(res, err)
    }
}

function checkInput(data, i){
    try {
        for(let j=0;j<validator.length;j++){
            if(!data["stage_"+i][validator[j]]) throw Error(`stage_${i}.${validator[j]} is required!!!`)
        }
        if(data["stage_"+i].stage_days<0) throw Error("Stage < 0");
        if(data["stage_"+i].min_temp >= data["stage_"+i].max_temp) throw Error(`stage_${i}.temperature: min>max`);
        if(data["stage_"+i].min_light >= data["stage_"+i].max_light) throw Error(`stage_${i}.light: min>max`);
        if(data["stage_"+i].min_PH >= data["stage_"+i].max_PH) throw Error(`stage_${i}.pH: min>max`);
        if(data["stage_"+i].min_soil_moisture >= data["stage_"+i].max_soil_moisture) throw Error(`stage_${i}.soil_moisture: min>max`);
        if(data["stage_"+i].min_hum >= data["stage_"+i].max_hum) throw Error(`stage_${i}.humidity: min>max`);
    }catch (err) {
        throw err
    }
}

module.exports={
    getSeeds,
    getSeed,
    getSensor,
    editSeed,
    newSeed
};