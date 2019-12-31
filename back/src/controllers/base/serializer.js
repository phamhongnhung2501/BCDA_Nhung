const network = require('../../../config/network');
const Seed = require('../farm/seeds/models/seeds');
const User = require('../user/models/users');
const moment = require('moment');

async function convertOutput(object) {
    if(object.toObject) object = object.toObject({getters: true});
    if(object.photo) object.photo = getPhoto(object.photo);
    if(object.owner_id) {
        object.manager = await getUser(object.owner_id);
        delete object.owner_id
    }
    if(object.id) delete object.id;
    if(object.password) delete object.password;
    if(object.started_plant && object.seed) {
        let {stage,seed} = await getStageSeed(object.seed, object.started_plant);
        object.stage = stage;
        object.seed_name = seed;
    }
    delete object.__v;
    return Object.entries(object).sort().reduce((obj, [k,v]) => ({...obj, [k]: v}), {});
}

function getPhoto(img_path){
    let splited_path = img_path.split('\\');
    let photo_url = splited_path.slice(0, splited_path.length).join('/');
    return `http://${network.hostname}:${network.port}/static/${photo_url}`;
}

async function getUser(user_id){
    try{
        return await User.findById(user_id, {full_name: 1, email: 1, phone_number: 1, _id: 0});
    }catch(err){
        throw err
    }
}

async function getStageSeed(seedId, time){
    try{
        let seed = await Seed.findById(seedId);
        // let days = moment(Date.now() - time).format("DD")-1;
        let days = Math.floor((new Date() - time)/(1000*60*60*24));
        // console.log(days);
        let stage_1_info = seed.stage_1;
        let stage_2_info = seed.stage_2;
        let stage_3_info = seed.stage_3;
        let stage_4_info = seed.stage_4;

        let stage = {};
        let stage_1_days = stage_1_info.stage_days;
        let stage_2_days = stage_1_days + stage_2_info.stage_days;
        let stage_3_days = stage_2_days + stage_3_info.stage_days;
        let stage_4_days = stage_3_days + stage_4_info.stage_days;
        // console.log(stage_1_days, stage_2_days, stage_3_days, stage_4_days);
        if(days<stage_1_days) stage = stage_1_info;
        else if(days>=stage_1_days&&days<stage_2_days) stage = stage_2_info;
        else if(days>=stage_2_days&&days<stage_3_days) stage = stage_3_info;
        else if(days>=stage_3_days) stage = stage_4_info;
        return {stage, seed: seed.seed}
    }catch(err){
        throw err
    }
}

module.exports = {
  convertOutput
};