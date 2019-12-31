const mongoose = require('mongoose');
const response = require('../../base/response');
const Information = require('./models/info');
const User = require('../../user/models/users');
const Seed = require('../seeds/models/seeds');
const serializer = require('../../base/serializer');
const lodash = require('lodash');
const gateway = require('../../../../config/seeds').gateway;

/** Get some info of farms*/
async function getSubstation(req, res) {
    try{
        let full_infos = [];
        let farms = req.user.farms;
        for(let i=0;i<farms.length;i++){
            let info = await Information.findOne({sub_id: farms[i]});
            if(info) full_infos.push(await serializer.convertOutput(info))
        }
        response.ok(res, full_infos);
    }catch(err){
        return response.internal(res, err)
    }
}

/** Get information of farm*/
async function getSubById(req, res) {
    try{
        let info = await Information.findOne({sub_id: req.params.sub_id});
        if(!info) return response.notFound(res, "Farm doesn't exists!!!");
        if(!req.user.farms.includes(req.params.sub_id)) return response.forbidden(res, "Permission Denied!!!");
        let full_info = await serializer.convertOutput(info);
        return response.ok(res, full_info);
    }catch(err){
        return response.internal(res, err)
    }
}


async function newSubstation(req, res) {
    try{
        let data = req.body;
        if(!req.user.is_admin) return response.forbidden(res,"Permission Denied!!!");//1
        if(!gateway.includes(data.sub_id)) return response.badData(res, "Sensor doesn't exist!!!");//2
        let check_sub = await Information.findOne({sub_id: data.sub_id});
        if(check_sub) return response.badRequest(res,"Sensor has already in use!!!");
        let check_seed = await Seed.findById(data.seed);
        if(!check_seed) return response.notFound(res,"Seed isn't existed!!!");

        let new_farm = {
            name: data.name,
            sub_id: data.sub_id,
            started_plant: data.started_plant,
            owner_id: req.user._id,
            seed: data.seed
        };
        let farm = await Information.create(new_farm);
        await User.updateMany({is_admin:true},{ $push: {"farms": farm.sub_id}});
        let full_info = await serializer.convertOutput(farm);
        return response.created(res, full_info)
    }catch(err){
        return response.internal(res, err)
    }
}

/** Edit information of farm*/
async function editSub(req, res){
    let change_element = req.body;
    try {
        if(!req.user.is_admin) return response.forbidden(res,"Permission Denied!!!");
        let old_farm = await Information.findOne({sub_id: req.params.sub_id});
        let data_seed={
            name: change_element.name ? change_element.name : old_farm.name,
            started_plant: change_element.started_plant ? change_element.started_plant : old_farm.started_plant,
            address: change_element.address ? change_element.address : old_farm.address
        };
        let farm = await Information.findOneAndUpdate({sub_id:req.params.sub_id}, data_seed, {new:true});
        let full_info = await serializer.convertOutput(farm);
        response.ok(res, full_info)
    }catch (err) {
        response.internal(res, err)
    }
}

/** Follow a substation*/
async function addSubToUser(req, res) {
    try{
        if(!req.user.is_admin) return response.forbidden(res,"Permission Denied!!!");
        // console.log(req.body)
        let check_user = await User.findById(req.body.user_id);
        if(!check_user) return response.notFound(res,"User doesn't exist!!!");

        if(check_user.farms.length > req.body.sub_id.length){
            let compare = lodash.difference(check_user.farms, req.body.sub_id);
            for(let i=0;i<compare.length;i++){
                let farm = await Information.findOne({sub_id: compare[i]},{_id:1});
                if(!farm) return response.notFound(res,"Farm doesn't exist!!!");
                await User.findOneAndUpdate({_id:req.body.user_id},{ $pull: {"farms": compare[i]}},{new:true});
            }
        }
        else{
            let compare = lodash.difference(req.body.sub_id, check_user.farms);
            for(let i=0;i<compare.length;i++){
                let farm = await Information.findOne({sub_id: compare[i]},{_id:1});
                if(!farm) return response.notFound(res,"Farm doesn't exist!!!");
                await User.findOneAndUpdate({_id:req.body.user_id},{ $push: {"farms": compare[i]}},{new:true});
            }
        }
        let user = await User.findById(req.body.user_id);
        return response.created(res, user)
    }catch(err){
        return response.internal(res, err)
    }
}

/** Delete substation*/
async function deleteSub(req, res){
    try {
        if (!req.user.is_admin) return response.forbidden("Permission Denied!!!");
        await Information.findOneAndDelete({sub_id: req.params.sub_id});
        await User.updateMany({},{ $pull: {"farms": req.params.sub_id}});
        response.noContent(res)
    }catch (err) {
        response.internal(res, err);
    }
}

/** Check input*/
// function checkInput(data, i){
//     try {
//         for(let j=0;j<validator.length;j++){
//             if(!data["stage_"+i][validator[j]]) throw Error(`stage_${i}.${validator[j]} is required!!!`)
//         }
//         if(parseInt(data["stage_"+i].stage_days)<0) throw Error("Stage < 0");
//         if(parseInt(data["stage_"+i].min_temp) >= parseInt(data["stage_"+i].max_temp)) throw Error(`stage_${i}.temperature: min>max`);
//         if(parseInt(data["stage_"+i].min_light) >= parseInt(data["stage_"+i].max_light)) throw Error(`stage_${i}.light: min>max`);
//         if(parseInt(data["stage_"+i].min_PH) >= parseInt(data["stage_"+i].max_PH)) throw Error(`stage_${i}.pH: min>max`);
//         if(parseInt(data["stage_"+i].min_soil_moisture) >= parseInt(data["stage_"+i].max_soil_moisture)) throw Error(`stage_${i}.soil_moisture: min>max`);
//         if(parseInt(data["stage_"+i].min_hum) >= parseInt(data["stage_"+i].max_hum)) throw Error(`stage_${i}.humidity: min>max`);
//     }catch (err) {
//         throw err
//     }
// }

module.exports={
    getSubstation,
    getSubById,
    newSubstation,
    editSub,
    addSubToUser,
    deleteSub
};