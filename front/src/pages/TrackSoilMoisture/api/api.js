const config_api =  require("../../../config/config").config_api;
const utils = require("../../../utils/utils");
const axios = require('axios');

function getData(callback) {
    axios({
        url: config_api.data +  "/" + utils.getStationInfo().sub_id,
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + utils.getAuthToken()
        },
        data: {}
    })
    .then(result => {
        console.log(result);
        
        return callback(false,  result.data)
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

function getDataReport(start_date, end_date, callback) {
    axios({
        url: config_api.data + "/" + utils.getStationInfo().sub_id,
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + utils.getAuthToken()
        },
        data: {
            start_date: start_date,
            end_date: end_date
        }
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
module.exports = {
    getData: getData,
    getDataReport: getDataReport,
};