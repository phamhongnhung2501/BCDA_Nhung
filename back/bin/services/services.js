const lodash = require('lodash');

const seeds = require('../../config/seeds');
const Data = require('../../src/controllers/farm/data/models/data');
const Seed = require('../../src/controllers/farm/seeds/models/seeds');

/**----------------Init-----------------*/
/**Difference between 2 objects*/
function difference(oldObj, newObj) {
    return lodash.transform(oldObj, (result, value, key) => {
        if (!lodash.isEqual(value, newObj[key])) {
            result[key] = lodash.isObject(value) && lodash.isObject(newObj[key]) ? difference(value, newObj[key]) : newObj[key];
        }
    });
}

/**Checking seed's existence*/
/**Update seed according to the configuration file.*/
async function checkExist(newObj){
    try {
        let oldObj = await Seed.findOne({seed: newObj.seed},{_id:0}).lean();
        if(!oldObj) await Seed.create(newObj);
        else{
            let diff = difference(oldObj, newObj);
            if(!lodash.isEmpty(diff)) await Seed.findOneAndUpdate({seed:newObj.seed},newObj)
        }
    }catch (err) {
        throw err
    }
}

/**Create new seeds according to the configuration file. */
async function newSeed() {
    try{
        await checkExist(seeds.tomato);
        await checkExist(seeds.pakchoi);
        await checkExist(seeds.brassica);
        await checkExist(seeds.cucumber);
        await checkExist(seeds.cabbage);
    }catch (err) {
        throw err
    }
}

/** Save data sensor*/
async function saveData(obj){
    try{
        await Data.create(obj)
    }catch(err){
        throw err
    }
}

module.exports={
    saveData,
    newSeed
};


