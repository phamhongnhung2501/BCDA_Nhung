const config_api = require("../../../config/config").config_api;
const utils = require("../../../utils/utils");
const axios = require("axios");

function getData(callback) {
    axios({
        url: config_api.data + "/" + utils.getStationInfo().sub_id,
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + utils.getAuthToken(),
        },
        data: {},
    })
        .then(result => {
            console.log(result);

            return callback(false, result.data);
        })
        .catch(error => {
            console.log(error);

            if (error.response) {
                return callback(error.response);
            } else if (error.request) {
                return callback("Please check your internet connection to server");
            } else {
                return callback(error.message);
            }
        });
}

module.exports = {
    getData: getData,
};
