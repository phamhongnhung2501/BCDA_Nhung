const config_api = require("../../../config/config").config_api;
const utils = require("../../../utils/utils");
const axios = require('axios');

function createProject(data, callback) {
    console.log(data);
    axios({
        url: config_api.project,
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + utils.getAuthToken()
        },
        data: {
            name: data.name,
            sub_id: data.sub_id,
            started_plant: data.started_plant,
            // owner_id: data.owner_id,
            seed: data.seed 
        }
    })
        .then(result => {
            return callback(false, result.data)
        })
        .catch(error => {
            if (error.response) {
                return callback(error.response)
            } else if (error.request) {
                return callback("Please check your internet connection to server");
            } else {
                return callback(error.message)
            }
        });
}

function getInfoProjectAll(callback) {
    axios({
        url: config_api.project,
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + utils.getAuthToken()
        },
        data: {}
    })
        .then(result => {
            // console.log(result);

            return callback(false, result.data)
        })
        .catch(error => {
            console.log(error);
            
            if (error.response) {
                return callback(error.response)
            } else if (error.request) {
                return callback("Please check your internet connection to server");
            } else {
                return callback(error.message)
            }
        });
}

function getInfoProject(id, callback) {
    console.log(id);
    
    /* Check valid input */
    let id_project;
    if (id === "this") {
        id_project = utils.getProjectId();
    } else {
        id_project = id;
    }

    axios({
        url: config_api.project + "/" + id_project,
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + utils.getAuthToken()
        },
        data: {}
    })
        .then(result => {
            // console.log(result.data);
            
            return callback(false, result.data)
        })
        .catch(error => {
            if (error.response) {
                return callback(error.response)
            } else if (error.request) {
                return callback("Please check your internet connection to server");
            } else {
                return callback(error.message)
            }
        });
}

function getListSeed(callback) {
    axios({
        url: config_api.seed ,
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + utils.getAuthToken()
        },
        data: {}
    })
        .then(result => {

            return callback(false, result.data)
        })
        .catch(error => {
            console.log(error);

            if (error.response) {
                return callback(error.response)
            } else if (error.request) {
                return callback("Please check your internet connection to server");
            } else {
                return callback(error.message)
            }
        });
}

function getListGateWay(callback) {
    axios({
        url: config_api.gateway ,
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + utils.getAuthToken()
        },
        data: {}
    })
        .then(result => {
            // console.log(result);

            return callback(false, result.data)
        })
        .catch(error => {
            console.log(error);

            if (error.response) {
                return callback(error.response)
            } else if (error.request) {
                return callback("Please check your internet connection to server");
            } else {
                return callback(error.message)
            }
        });
}

function getConfig(id,callback) {

    axios({
        url: config_api.seed+"/" + id,
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + utils.getAuthToken()
        },
        data: {}
    })
        .then(result => {
            console.log(result);
            return callback(false, result.data)
        })
        .catch(error => {
            console.log(error);

            if (error.response) {
                return callback(error.response)
            } else if (error.request) {
                return callback("Please check your internet connection to server");
            } else {
                return callback(error.message)
            }
        });
}

function modifyStation(id, dataConfig, callback) {
    // console.log(data);
    
    axios({
        url: config_api.seed + "/" + id,
        method: 'PATCH',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + utils.getAuthToken()
        },
        data: dataConfig
    })
        .then(result => {
            return callback(false, result.data)
        })
        .catch(error => {
            if (error.response) {
                return callback(error.response)
            } else if (error.request) {
                return callback("Please check your internet connection to server");
            } else {
                return callback(error.message)
            }
        });
}
module.exports = {
    getInfoProjectAll: getInfoProjectAll,
    getInfoProject: getInfoProject,
    createProject: createProject,
    getListSeed: getListSeed,
    getListGateWay: getListGateWay,
    getConfig: getConfig,
    modifyStation: modifyStation,
}