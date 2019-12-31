const response = require('../../base/response');
const Data = require('./models/data');

async function getSubData(req, res){
    try{
        let info = await Data.find({}).limit(5).sort({$natural:-1});
        return response.ok(res, info);
    }catch(err){
        console.log(err);
        return response.internal(res, err)
    }
}

async function getSubDataById(req, res) {
    try{
        if(!req.user.farms.includes(req.params.sub_id)) return response.forbidden(res, "Permission Denied!!!");
        let info = await Data.find({sub_id: req.params.sub_id}).limit(1).sort({$natural:-1}).lean();
        return response.ok(res, info);
    }catch(err){
        return response.internal(res, err)
    }
}

async function getSubDataByIdAndTime(req, res) {
    try{
        if(!req.user.farms.includes(req.params.sub_id)) return response.forbidden(res, "Permission Denied!!!");
        let time_start = new Date(req.body.start_date);
        let time_finish = new Date(req.body.end_date);
        let full_data=[];
        // console.log(time_start);
        // console.log(time_finish);
        let infos = await Data.find({sub_id: req.params.sub_id, time: {$gte: time_start, $lte: time_finish}}).lean();
        for(let i=0;i<infos.length;i++) {
            infos[i].time = infos[i].time.getTime();
            full_data.push(infos[i]);
        }
        return response.ok(res, full_data);
    }catch(err){
        console.log(err);
        return response.internal(res, err)
    }
}

module.exports={
    getSubData,
    getSubDataById,
    getSubDataByIdAndTime
};